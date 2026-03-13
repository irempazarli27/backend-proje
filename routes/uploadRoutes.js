const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

router.post("/upload", upload.single("image"), (req, res) => {

    res.json({
        message: "File uploaded",
        file: req.file
    });
});

module.exports = router;