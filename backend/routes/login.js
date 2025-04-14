const express = require("express");
const{ login, logout, sendResetOtp, resetPassword } = require("../controllers/login");

const router = express.Router();
router.post("/login", login)
.post("/logout", logout)
.post("/send-reset-otp", sendResetOtp)
.post("/reset-password", resetPassword)


module.exports = router;