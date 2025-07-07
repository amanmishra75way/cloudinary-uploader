import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import uploadRoute from "./routes/upload.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API Is working properly");
});
app.use("/upload", uploadRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB Error:", err));
