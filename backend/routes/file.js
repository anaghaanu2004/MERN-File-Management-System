const express = require("express");
const multer = require("multer");
const File = require("../models/File");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {
  const file = new File({
    filename: req.file.filename,
    path: req.file.path
  });
  router.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded" });
});

router.get("/files", (req, res) => {
});

router.delete("/files/:name", (req, res) => {
});

  await file.save();
  res.json(file);
});

router.get("/", async (req, res) => {
  const files = await File.find();
  res.json(files);
});

module.exports = router;

const fs = require("fs");
const path = require("path");

router.get("/files", (req, res) => {
  const uploadPath = path.join(__dirname, "../uploads");

  fs.readdir(uploadPath, (err, files) => {
    if (err) return res.status(500).json(err);
    res.json(files);
  });
});

router.delete("/files/:name", (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.params.name);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "File deleted" });
  });
});

