import express from "express";
import mongoosePkg from "mongoose";
import bodyParserPkg from "body-parser";
import apiRoutes from "./routes/api.js";

const { json } = bodyParserPkg;
const { connect, connection } = mongoosePkg;
const app = express();
const PORT = 3000;

// Middleware
app.use(json());

// MongoDB connection
connect("mongodb://127.0.0.1:27017/billing-software").catch((error) =>
  console.log(error)
);

const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// API Routes
app.use("/api", apiRoutes);

app.get("/", async (req, res) => {
  res.send("Server works!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
