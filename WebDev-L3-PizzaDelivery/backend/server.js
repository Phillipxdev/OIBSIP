const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Pizza Delivery API is running 🍕"
    });
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully ✅");
    })
    .catch((error) => {
        console.error("MongoDB connection failed ❌");
        console.error(error.message);
    });

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});