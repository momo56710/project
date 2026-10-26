const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const app = express();
app.use(express.json());  
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI, );
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
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exitCode = 1;
  }
}

startServer();