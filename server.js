const express = require("express");
const mongoose = require("mongoose");

const paymentRoute = require("./routes/payment");

const app = express();
app.use(express.json());

// Routes
app.use("/api/payment", paymentRoute);

// MongoDB Connection
mongoose
    .connect(
        "mongodb+srv://agrawalvaishika05:Vaishu@cluster0.vfkmnib.mongodb.net/PaymentGatewayDB?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ DB Connection Error:", err));

// Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
