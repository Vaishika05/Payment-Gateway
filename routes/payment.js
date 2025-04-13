const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");

const randomBoolean = () => Math.random() >= 0.7;

router.post("/", async (req, res) => {
    const { amount, idempotencyKey } = req.body;

    if (!idempotencyKey) {
        return res.status(400).json({ message: "Idempotency key is required." });
    }

    const retryTries = 3;
    let currentAttempt = 0;
    let delay = 1000;
    const simulateFailure = () => {
        throw new Error("Simulated DB error");
    };

    while (currentAttempt < retryTries) {
        try {
            // Check if this idempotency key was already used
            const existingPayment = await Payment.findOne({ idempotencyKey });

            if (existingPayment) {
                return res.status(200).json({
                    message: "Payment already processed",
                    status: existingPayment.status,
                    data: existingPayment,
                });
            }
            simulateFailure();
            const newTransaction = new Payment({
                amount,
                createdAt: Date.now(),
                status: randomBoolean(),
                idempotencyKey,
            });

            await newTransaction.save();

            return res.status(201).json({ message: "Payment processed", data: newTransaction });
        } catch (error) {
            currentAttempt++;
            console.error(`Attempt ${currentAttempt} failed. Error: ${error.message}`);

            if (currentAttempt >= retryTries) {
                return res.status(500).json({ message: "Max retries reached. Request failed." });
            }

            await new Promise((resolve) => setTimeout(resolve, delay));

            delay *= 2;
        }
    }
});

module.exports = router;
