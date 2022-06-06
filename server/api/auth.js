const express = require("express");
const app = express()
app.use(express.json())
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");

const asyncMiddleware = require("../middlewares/async");
const auth = require("../middlewares/auth");
const User = require("../models/User");
const { verifyToken } = require("../middlewares/auth");

router.post(
  "/",
  asyncMiddleware(async (req, res) => {
    const { error } = validateEmailPassword(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email or Password!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid Email or Password!");

    const token = user.generateAuthToken(); // this is an instance method of user schema, refer to models/User module.

    res.send({ token });
  })
);

router.get(
  "/sendConfirmationEmail",
  auth,
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user.id);
    await user.sendConfirmationEmail(req.hostname); // this is an instance method of user schema, refer to models/User module.
    res.send("Confirmation email has been sent to you.");
  })
);

router.get(
  "/emailConfirmation/:token",
  asyncMiddleware(async (req, res) => {
    const user = verifyToken(req.params.token);
    if (!user) return res.status(400).send("Link expired or invalid link.");

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        isVerified: true,
      },
      { new: true }
    );

    const token = updatedUser.generateAuthToken();

    res.send({ token, message: "Email Verified Successfully!" });
  })
);

router.get(
  "/forgotPassword/:email",
  asyncMiddleware(async (req, res) => {
    const { error } = validateEmail(req.params);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.params.email });
    if (!user)
      return res
        .status(400)
        .send("Sorry, This Email Address does not match our records");

    res.send("Link for reseting password has been emailed to you.");

    await user.sendResetPasswordEmail(req.hostname); // this is an instance method of user schema, refer to models/User module.
  })
);

router.post(
  "/resetPassword",
  asyncMiddleware(async (req, res) => {
    const { token, password } = req.body;

    const user = verifyToken(token);
    if (!user) return res.status(400).send("Link expired or invalid link.");

    if (!password) return res.status(400).send("Password is required");

    if (password.length < 6)
      return res
        .status(400)
        .send("Password must contain atleast six characters");

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(user.id, {
      password: hashedPasword,
    });

    res.send("Password updated successfully.");
  })
);

module.exports = router;

function validateEmailPassword(body) {
  const schema = Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(255).required(),
  });

  return schema.validate(body);
}

function validateEmail(email) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .message("Invalid email address!")
      .max(255)
      .required(),
  });

  return schema.validate(email);
}
