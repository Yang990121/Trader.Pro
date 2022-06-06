const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");

const balanceSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    newCashBalance: {
        type: Number,
        required: true,
    },
});

const validateBalance = function (balance) {
    const schema = Joi.object({
        userId: Joi.string().required(),
        newCashBalance: Joi.number().min(0).required(),
    });
    return schema.validate(balance);
}


module.exports = mongoose.model("balanceData", balanceSchema);
module.exports.validateBalance = validateBalance;