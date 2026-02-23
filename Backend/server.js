require('dotenv').config(); // env file 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');


const app = express();
app.use(cors());
app.use(express.json());

// AI with API key from env file
const { GoogleGenerativeAI } = require('@google/generative-ai'); 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 

// connect the database with credentials from env file
const db = mysql.createConnection({ 
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database and log any errors
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to database');
});

// Helper function to perform SQL queries with promises
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('SQL Error:', err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Create HTTP server and initialize Socket.IO with CORS settings
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// post route for signup
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" }); // Check for missing fields for user signup and return error if any are missing
    }
    // Insert new user into database after signup
    const sql = "INSERT INTO user (UserName, UserEmail, UserPassword) VALUES (?, ?, ?)";
    db.query(sql, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ message: err.sqlMessage || "Database error" });
        return res.status(201).json({ message: "User created successfully" });
    });
});

// post route for login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" }); // Check for missing fields for user login and return error if any are missing
    }

    const sql = "SELECT * FROM user WHERE UserEmail = ? AND UserPassword = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ message: err.sqlMessage || "Database error" });
        if (result.length === 0) return res.status(401).json({ message: "Invalid email or password" }); // Check if user exists with provided email and password, and return error if not found

        return res.status(200).json({ message: "Login successful", user: result[0] });
    });
});

async function getAIResponse(description, deviceInfo, category, userMessage) { /// new change here -zoey
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
        You are a professional IT help desk assistant.
        Ticket Information:
        Problem: ${description}
        Device: ${deviceInfo}
        Category: ${category}
        User message:
        ${userMessage}
        Provide clear step-by-step troubleshooting.
        If unsure, ask clarifying questions.
        `;
    const result = await model.generateContent(prompt);
    return result.response.text();
}
// to here

// Socket.io handling
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Handle joining a chat room for a specific ticket
    socket.on('joinChat', async ({ ticketID, UserID }) => {
        try {
            socket.join(ticketID); // Join the Socket.IO room for this ticket
            console.log(`User ${UserID} joined ticket ${ticketID}`); // Log the user joining the ticket room
            
            const existingTicket = await query( // Check if the ticket already exists in the database
                "SELECT * FROM tickets WHERE ticketID = ?", [ticketID]);
            
            const chatHistory = await query( // Retrieve chat history for this ticket from the database
                "SELECT * FROM chatmessages WHERE ticketID = ? ORDER BY createdAt ASC", [ticketID]);

            if (chatHistory.length === 0 && existingTicket.length > 0) {  // ADDED CHANGE HERE - ZOEY!!!!!!!!!!!!
                const welcomeMessage = "Hello, what is the problem you are facing today?";
                await query(
                    "INSERT INTO chatmessages (ticketID, role, chatMessages, UserID, createdAt) VALUES (?, 'assistant', ?, ?, NOW())", 
                    [ticketID, welcomeMessage, UserID || null]
                );
                
                chatHistory.push({ // Add welcome message to chat history array
                    ticketID: ticketID,
                    role: 'assistant',
                    chatMessages: welcomeMessage,
                    createdAt: new Date().toISOString()
                });
            }

            socket.emit('chatHistory', chatHistory); // Send the chat history back to the client that just joined the ticket room

        } catch (err) {
            console.error('Error in joinChat:', err.message);
        }
    });

    // Handle receiving a new message from the client
    socket.on('sendMessage', async (data) => {
        const { ticketID, UserID, message } = data;
        
        try {
            console.log(`User message for ticketID: ${ticketID} - ${message}`);

            const ticket = await query("SELECT * FROM tickets WHERE ticketID = ?", [ticketID]);
            let aiResponse = "";
            let description = ticket[0]?.description || "";
            let deviceInfo = ticket[0]?.deviceInfo || "";
            let category = ticket[0]?.category || "";
            let status = ticket[0]?.status || "inprogress";

            if (!ticket.length) { // ADDED CHANGE HERE -ZOEY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // First message - create new ticket
                description = message; // First message becomes description
                aiResponse = "Before we move forward, what device or system are you having issues with? (If unsure, say 'Unsure')";

                // Insert new ticket without ticketID (MySQL will auto-generate ticketID)
                const ticketResult = await query(
                    `INSERT INTO tickets (UserID, description, deviceInfo, category, status, createdAt, updatedAt)
                    VALUES (?, ?, ?, '', 'inprogress', NOW(), NOW())`,
                    [UserID, description, "", ""]
                );

                const newTicketID = ticketResult.insertId;
                console.log("New ticket created with ID:", newTicketID);
                socket.emit("ticketCreated", { ticketID: newTicketID});

                // Insert AI welcome message with the new ticketID
                await query( 
                    "INSERT INTO chatmessages (ticketID, role, chatMessages, UserID, createdAt) VALUES (?, 'assistant', ?, NULL, NOW())",
                    [newTicketID, aiResponse]  // Ensure correct ticketID
                );

                // Emit the first assistant message
                socket.emit('newMessage', { 
                    ticketID: newTicketID, 
                    role: 'assistant', 
                    message: aiResponse, 
                    timestamp: new Date().toISOString() 
                });

                return; // Exit early after creating ticket and sending AI response
            } else {
                // Ticket exists, continue with the conversation
                if (!description || description.length === 0) {
                    description = message;
                    aiResponse = "Before we move forward, what device or system are you having issues with? (If unsure, say 'Unsure')";
                } else if (!deviceInfo || deviceInfo.length === 0) {
                    deviceInfo = message;
                    aiResponse = "Do you know if this is a hardware or software issue? (If unsure, say 'Unsure')";
                } else if (!category || category.length === 0) {
                    category = message;
                    aiResponse = "Thank you for providing this information. Now I can help you better. Please describe your issue in more detail.";
                    status = "open"; // Change status to open when all questions are answered
                } else {
                    aiResponse = await getAIResponse(description, deviceInfo, category, message);
                    status = "open"; // Mark status as open after questions
                }

                // Update the ticket with new data
                await query(
                    `UPDATE tickets SET 
                        description = ?, 
                        deviceInfo = ?, 
                        category = ?, 
                        status = ?, 
                        updatedAt = NOW()
                    WHERE ticketID = ?`,
                    [description, deviceInfo, category, status, ticketID]
                );

                // Save user message
                await query(
                    "INSERT INTO chatmessages (ticketID, role, chatMessages, UserID, createdAt) VALUES (?, 'user', ?, ?, NOW())",
                    [ticketID, message, UserID]
                );

                // Save AI response
                await query(
                    "INSERT INTO chatmessages (ticketID, role, chatMessages, UserID, createdAt) VALUES (?, 'assistant', ?, NULL, NOW())",
                    [ticketID, aiResponse]
                );

                // Emit user and assistant messages
                socket.emit('newMessage', { ticketID, role: 'user', UserID, message, timestamp: new Date().toISOString() });
                setTimeout(() => {
                    socket.emit('newMessage', { ticketID, role: 'assistant', message: aiResponse, timestamp: new Date().toISOString() });
                    socket.emit('ticketUpdated', { ticketID, description, deviceInfo, category, status });
                }, 500);
            }
        } catch (err) {
            console.error("Error in sendMessage:", err.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// API endpoints
app.get('/api/tickets/:ticketID', async (req, res) => {
    const { ticketID } = req.params;
    
    try {
        const tickets = await query(
            "SELECT * FROM tickets WHERE ticketID = ?",
            [ticketID]
        );
        
        if (tickets.length === 0) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }
        
        const messages = await query(
            "SELECT * FROM chatmessages WHERE ticketID = ? ORDER BY createdAt ASC",
            [ticketID]
        );
        
        res.json({ 
            success: true, 
            ticket: tickets[0], 
            messages 
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/tickets', async (req, res) => {
    try {
        const tickets = await query("SELECT * FROM tickets ORDER BY createdAt DESC");
        res.json({ success: true, tickets });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/health', (req, res) => {
    db.ping((err) => {
        if (err) {
            return res.status(500).json({ 
                status: 'error', 
                message: 'Database connection failed',
                error: err.message 
            });
        }
        res.json({ 
            status: 'ok', 
            message: 'Server running',
            time: new Date().toISOString()
        });
    });
});


//  change starts here -zoey!!!!!!!!
// Update user profile
app.put('/api/user/:UserID', async (req, res) => {
    const { UserID } = req.params;
    const { name, email, oldPassword, password } = req.body;
    if (!name && !email && !password) {
        return res.status(400).json({ message: "Nothing to update" });
    }
    try {
        const fields = [];
        const values = [];
        if (name) {
            fields.push("UserName = ?");
            values.push(name);
        }
        if (email) {
            fields.push("UserEmail = ?");
            values.push(email);
        }
        if (password) {
            if (!oldPassword) {
                return res.status(400).json({ message: "Old password required" });
            }
            const user = await query(
                "SELECT UserPassword FROM user WHERE UserID = ?",
                [UserID]
            );
            if (user.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            if (user[0].UserPassword !== oldPassword) {
                return res.status(401).json({ message: "Old password incorrect" });
            }
            fields.push("UserPassword = ?");
            values.push(password);
        }
        values.push(UserID);
        await query(
            `UPDATE user SET ${fields.join(", ")} WHERE UserID = ?`,
            values
        );
        res.json({ success: true, message: "Profile updated" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put("/api/tickets/:ticketID/close", async (req, res) => {
  const { ticketID } = req.params;
  const { UserID } = req.body;
  try {
    await query(
      "UPDATE tickets SET status = 'closed' WHERE ticketID = ? AND UserID = ?",
      [ticketID, UserID]
    );
    res.json({ success: true, message: "Ticket closed" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/tickets/user/:UserID', async (req, res) => {
    const { UserID } = req.params;
    try {
        const tickets = await query(
            "SELECT * FROM tickets WHERE UserID = ? ORDER BY createdAt DESC",
            [UserID]
        );
        res.json({ success: true, tickets });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put("/api/tickets/:ticketID/reopen", async (req, res) => {
  const { ticketID } = req.params;
  const { UserID } = req.body;
  try {
    await query(
      "UPDATE tickets SET status = 'open' WHERE ticketID = ? AND UserID = ?",
      [ticketID, UserID]);
    res.json({ success: true, message: "Ticket reopened" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
// end change!!!!!!!!!!!!!!!!!

server.listen(8081, () => {
    console.log("Server listening on http://localhost:8081");
});