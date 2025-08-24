const crypto = require('crypto');
const transporter = require('../config/mailer');
const { user: User } = require('../models');

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    foundUser.resetToken = resetToken;
    foundUser.resetTokenExpires = Date.now() + 3600000;
    await foundUser.save();

    await transporter.sendMail({
      from: `"Support Team" "siddharth"`,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`
    });

    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending email', error: err.message });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const foundUser = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpires: { [Op.gt]: Date.now() }
      }
    });

    if (!foundUser) return res.status(400).json({ message: 'Invalid or expired token' });

    foundUser.password = newPassword; // hash via hook
    foundUser.resetToken = null;
    foundUser.resetTokenExpires = null;
    await foundUser.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password', error: err.message });
  }
};

