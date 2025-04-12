const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");

const randomBoolean = () => Math.random() >= 0.7;

router.post("/", async (req, res) => {
    const { amount, idempotencyKey } = req.body;

    if (!idempotencyKey) {
        return res.status(400).json({ message: "Idempotency key is required." });
    }

    try {
        //Check if this idempotency key was already used
        const existingPayment = await Payment.findOne({ idempotencyKey });

        if (existingPayment) {
            return res.status(200).json({
                message: "Payment already processed",
                status: existingPayment.status,
                data: existingPayment,
            });
        }

        // Create a new payment
        const newTransaction = new Payment({
            amount,
            createdAt: Date.now(),
            status: randomBoolean(),
            idempotencyKey,
        });

        await newTransaction.save();
        res.status(201).json({ message: "Payment processed", data: newTransaction });
    } catch (err) {
        res.status(500).json({ error: "Failed to process payment", details: err.message });
    }
});

module.exports = router;
