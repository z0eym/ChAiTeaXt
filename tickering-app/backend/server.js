const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const mysql = require('mysql2/promise');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini with the 2026 stable alias
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: (process.env.DB_HOST || 'db'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'rootpassword',
  database: process.env.MYSQL_DATABASE || 'ticketing_db',
};

// Global pool variable
let pool;

async function initDB() {
  let connected = false;
  let attempts = 0;

  while (!connected && attempts < 10) {
    try {
      // Initialize the pool inside the loop
      pool = mysql.createPool(dbConfig);
      
      // Test the connection
      await pool.query('SELECT 1'); 
      console.log('✅ Connected to MySQL database');
      connected = true;

      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          UserID INT AUTO_INCREMENT PRIMARY KEY,
          UserName VARCHAR(255) NOT NULL,
          UserEmail VARCHAR(255) UNIQUE NOT NULL,
          UserPassword VARCHAR(255) NOT NULL,
          CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS chat_messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          ticket_id VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL,
          message TEXT NOT NULL,
          metadata JSON DEFAULT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          INDEX (ticket_id)
        )
      `);
      console.log('✅ MySQL tables verified');
    } catch (err) {
      attempts++;
      console.log(`❌ Connection failed (Attempt ${attempts}/10): ${err.message}`);
      if (!connected) {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
}

initDB();

const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

io.on('connection', (socket) => {
  // Matches your new frontend: socket.emit('joinChat', ...)
  socket.on('joinChat', async (data) => {
    const { ticketID, UserID } = data;
    socket.join(ticketID);
    try {
      const [results] = await pool.query(
        "SELECT * FROM chat_messages WHERE ticket_id = ? ORDER BY created_at ASC", 
        [ticketID]
      );
      // Matches your new frontend: socket.on('chatHistory', ...)
      socket.emit('chatHistory', results);
    } catch (err) {
      console.error('Error loading history:', err);
    }
  });

  // Matches your new frontend: socket.emit('sendMessage', ...)
socket.on('sendMessage', async (data) => {
  const { ticketID, UserID, role, message, metadata } = data;
  
  try {
    const metaObj = typeof metadata === 'string' ? JSON.parse(metadata) : metadata;

    // 1. Save User message to DB
    const [result] = await pool.query(
      "INSERT INTO chat_messages (ticket_id, role, message, metadata) VALUES (?, ?, ?, ?)", 
      [ticketID, role, message, metadata ? JSON.stringify(metadata) : null]
    );
    
    // 2. Echo the user's message back to the UI
    io.to(ticketID).emit('newMessage', {
      id: result.insertId,
      ticketID, 
      role, 
      message, 
      metadata,
      timestamp: new Date().toISOString()
    });

    // 3. TRIGGER GEMINI (The missing piece)
    if (role === 'user' && metaObj?.type === 'category') {
      // Get all previous messages for this ticket to give Gemini context
      const [history] = await pool.query(
        "SELECT role, message FROM chat_messages WHERE ticket_id = ? ORDER BY created_at ASC",
        [ticketID]
      );

      // Initialize the model
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      
      // Format the prompt for Gemini
      const chatContext = history.map(m => `${m.role}: ${m.message}`).join("\n");
      const prompt = `You are a helpful IT Support Assistant. 
      The user has provided the following ticket details:\n${chatContext}\n
      Based on this information, provide a professional first response to help troubleshoot their issue.`;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      // 4. Save Gemini's response to the DB
      const [aiDbResult] = await pool.query(
        "INSERT INTO chat_messages (ticket_id, role, message) VALUES (?, ?, ?)", 
        [ticketID, 'assistant', aiResponse]
      );

      // 5. Send Gemini's response to the Frontend
      io.to(ticketID).emit('newMessage', {
        id: aiDbResult.insertId,
        ticketID,
        role: 'assistant',
        message: aiResponse,
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (err) {
    console.error('❌ Error in sendMessage:', err);
  }
});

});

// LOGIN & SIGNUP ENDPOINTS
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE UserEmail = ? AND UserPassword = ?", [email, password]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });
    res.status(200).json({ message: "Login successful", user: rows[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await pool.query("INSERT INTO users (UserName, UserEmail, UserPassword) VALUES (?, ?, ?)", [name, email, password]);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

server.listen(8000, '0.0.0.0', () => {
  console.log("✅ Backend running on port 8000");
});