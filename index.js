const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());  
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error" , (err)=>{
    console.log("MongoDB connection error:", err);
});



 app.use("/api/users", require("./routes/userRoutes"));
 app.use("/api/products", require("./routes/productsRoutes"));
 app.use("/api/category", require("./routes/categoryRoutes"));
 app.use("/api/order", require("./routes/orderRoutes"));
 app.use("/api/notifications", require("./routes/notificationRoutes"));

 
 
 app.get("/health", (_req, res) => {
  res.send({ message: "server healthy" });
});
const PORT = process.env.PORT || 5600;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exitCode = 1;
  }
}

startServer();