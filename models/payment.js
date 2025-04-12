const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema({
    amount: String,
    status: Boolean,
    createdAt: Date,
    idempotencyKey: {
        type: String,
        unique: true,
        required: true,
    },
});

module.exports = mongoose.model("Payment", paymentSchema);
