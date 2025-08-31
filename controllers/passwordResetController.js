// controllers/authController.js
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { user, PasswordReset } = require("../models");
const sendMail = require("../config/mailer");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const foundUser = await user.findOne({ where: { email } });
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hr

    await PasswordReset.create({
      user_id: foundUser.id,
      token,
      expires_at: expiresAt,
    });

    
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await sendMail(
      foundUser.email,
      "Password Reset",
      `<p>You requested a password reset.</p>
       <p>Click here to reset: <a href="${resetLink}">${resetLink}</a></p>`
    );

    res.json({ message: "Password reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const resetEntry = await PasswordReset.findOne({ where: { token } });
    if (!resetEntry) return res.status(400).json({ message: "Invalid token" });

    if (new Date(resetEntry.expires_at) < new Date()) {
      return res.status(400).json({ message: "Token expired" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await user.update(
      { password: hashed },
      { where: { id: resetEntry.user_id } }
    );

    await resetEntry.destroy();

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { forgotPassword, resetPassword };
