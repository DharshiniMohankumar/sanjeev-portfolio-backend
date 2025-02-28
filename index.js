require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Supabase PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Test Database Connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database Connection Error:", err);
  } else {
    console.log("✅ Connected to Supabase PostgreSQL:", res.rows[0].now);
  }
});

// Sample API Route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running with Supabase PostgreSQL!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
