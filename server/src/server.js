
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GreenCity AI API is running",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.use("/api/admin", adminRoutes);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};


startServer();
