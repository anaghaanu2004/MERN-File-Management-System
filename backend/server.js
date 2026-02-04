const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// uploads folder serve panna
app.use("/uploads", express.static("uploads"));

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 👉 UPLOAD ROUTE
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ filename: req.file.filename });
});

// 👉 GET FILES ROUTE
app.get("/files", (req, res) => {
  const dir = "uploads";
  const files = fs.readdirSync(dir).map(file => ({
    filename: file,
  }));
  res.json(files);
});

// 👉 DELETE ROUTE
app.delete("/files/:name", (req, res) => {
  const filePath = path.join("uploads", req.params.name);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ message: "File deleted" });
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});


