const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");

const stockSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  latestPrice: {
    type: Number,
    required: true,
  }
});

const validateStock = function (stock) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    ticker: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    latestPrice: Joi.number().required(),
  });
  return schema.validate(stock);
}





module.exports = mongoose.model("StockData", stockSchema);
module.exports.validateStock = validateStock;