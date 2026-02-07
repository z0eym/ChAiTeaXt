const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost", 
    user: "root",
    password: "Password!",
    database: "seniorprojectdb"
})

app.get('/user', (req, res) => {
    const sql = `
        SELECT
            UserID AS userid,
            UserName AS username,
            UserEmail AS email
        FROM seniorprojectdb.user
    `;

    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/', (req, res) => {
    return res.json("From Backend Side");
})

app.listen(8081, () => {
    console.log("listening");
})

app.use(express.json());

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const sql = "INSERT INTO user (UserName, UserEmail, UserPassword) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {
        if (err) return res.status(500).json({ message: err.sqlMessage || "Database error" });
        return res.status(201).json({ message: "User created successfully" });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const sql = "SELECT * FROM user WHERE UserEmail = ? AND UserPassword = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ message: err.sqlMessage || "Database error" });
        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        return res.status(200).json({ message: "Login successful", user: result[0] });
    });
});
