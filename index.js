import express from "express";
import mongoosePkg from "mongoose";
import bodyParserPkg from "body-parser";
import apiRoutes from "./routes/api.js";
import swaggerDocs from "./swagger.js";

const { json } = bodyParserPkg;
const { connect, connection } = mongoosePkg;
const app = express();
const PORT = 3000;

// Middleware
app.use(json());

// API Routes
app.use("/api", apiRoutes);

app.get("/", async (req, res) => {
  res.redirect("/docs/");
});

// MongoDB connection
// Start server only when we have valid connection
connect("mongodb://127.0.0.1:27017/billing-software")
  .then(() => {
    try {
      // Start server
      app.listen(PORT, () => {
        console.log(`Server connected to http://localhost:${PORT}`);
      });
      swaggerDocs(app, PORT);
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  });
