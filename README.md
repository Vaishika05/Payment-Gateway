# Payment Gateway API

A simple backend payment processing API using Node.js, Express, and MongoDB. It mimics basic transaction handling like a lightweight version of a payment gateway (e.g., GPay, Razorpay), focusing on **data integrity** and **fault tolerance** mechanisms.

---

## Features Implemented

-   🔐 **Idempotency support**
    -   Prevents duplicate transactions using a unique key per request.
    -   Ensures safe retry of payment calls without duplicating records.
-   🗃️ **MongoDB integration** with Mongoose
-   🧪 **Basic payment route** (`POST /api/payment`)
    -   Accepts amount and idempotencyKey
    -   Randomly sets `status` (success/failure)
    -   Saves transaction to database

---

## 🛠 Features Planned

Retry Logic Done Adds fault tolerance for failed payments
Queue for Logging Planned Improves scalability and monitoring  
 Payment History Planned Retrieve list of past transactions  
 Authentication Planned Protects payment endpoints with JWT  
 Frontend Dashboard Planned Visual display of transaction status  
 Dockerization Planned Containerized deployment  
 Email/SMS Notify Planned Alert user of transaction success/failure

## 🔄 API Example

### `POST /api/payment`

**Request Body**

```json
{
    "amount": "100",
    "idempotencyKey": "unique-id-123"
}
```
