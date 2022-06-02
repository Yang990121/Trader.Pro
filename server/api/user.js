const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const auth = require("../middlewares/auth");
const asyncMiddleware = require("../middlewares/async");

const User = require("../models/User");
const { validateUser } = require("../models/User");

router.get(
  "/me",
  [auth],
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user.id).select("-_id");
    res.send(user);
  })
);

router.post(
  "/add",
  asyncMiddleware(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered!");

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPasword,
    };

    user = new User(newUser);
    await user.save();

    user.sendConfirmationEmail(req.hostname).catch((err) => {});

    res.send(
      "Account created Successfully. Confirmation email has been sent to you. "
    );
    console.log("Account created Successfully");
  })
);

module.exports = router;
