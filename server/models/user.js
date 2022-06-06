const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const sendEmail = require("../utils/sendMail");
const {
  confirmationEmailTemplate,
  resetPasswordEmailTemplate,
} = require("../utils/emailTemplates");

const { jwtPrivateKey, tokenKey } = process.env;
const isProduction = process.env.NODE_ENV === "production";


const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  cashBalance: {
    type: Number,
    default: 100000,
    required: false,
  },
  portfolioBalance: {
    type: Number,
    default: 0,
    required: false,
  },
});

userSchema.methods.generateAuthToken = function (secretKey = jwtPrivateKey) {
  const token = jwt.sign(
    {
      id: this._id,
      name: this.userName,
      isVerified: this.isVerified,
      cashBalance: this.cashBalance,
    },
    secretKey,
    {
      expiresIn: "1d",
    }
  );
  return token;
};

userSchema.methods.sendConfirmationEmail = async function (hostname) {
  const token = this.generateAuthToken(tokenKey);
  let url = `https://${hostname}/confirmEmail/${token}`;
  if (!isProduction) url = `http://localhost:3000/confirmEmail/${token}`;
  const template = confirmationEmailTemplate(url);

  await sendEmail(this.email, "Confirm Email", template);
};

userSchema.methods.sendResetPasswordEmail = async function (hostname) {
  const token = this.generateAuthToken(tokenKey);
  let url = `https://${hostname}/resetPassword/${token}`;
  if (!isProduction) url = `http://localhost:3000/resetPassword/${token}`;
  const template = resetPasswordEmailTemplate(url);

  await sendEmail(this.email, "Reset Password", template);
};

const validateUser = function (user) {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(255).required(),
    
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user);
};

module.exports = mongoose.model("User", userSchema);
module.exports.validateUser = validateUser;
