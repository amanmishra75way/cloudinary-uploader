import express from "express";
import multer from "multer";
import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
import File from "../models/File.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const file = new File({
      name: req.file.originalname,
      url: result.secure_url,
      public_id: result.public_id,
    });

    await file.save();

    fs.unlinkSync(req.file.path); // delete local file

    res.status(200).json({
      message: "File uploaded successfully",
      data: file,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
