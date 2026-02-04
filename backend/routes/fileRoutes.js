const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.delete("/:filename", async (req, res) => {
  try {
    const file = await File.findOneAndDelete({
      filename: req.params.filename,
    });

    if (!file) return res.status(404).json({ message: "File not found" });

    fs.unlinkSync(path.join(__dirname, "..", file.path));
    res.json({ message: "File deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});
