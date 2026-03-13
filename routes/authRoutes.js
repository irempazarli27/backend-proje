const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const {register, login} = require("../controllers/authController");
const validateRegister = require("../middleware/validateRegister");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message:{
        success: false,
        message: "To many login attempts. Try again later."
    }
});

router.post("/register", validateRegister, register);
router.post("/login", loginLimiter, login);

module.exports = router;