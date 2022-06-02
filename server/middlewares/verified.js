module.exports = function (req, res, next) {
  if (!req.user.isVerified) {
    return res
      .status(401)
      .send("Access denied. Please confirm your email first.");
  }
  next();
};
