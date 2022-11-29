import express from "express";
import { processPayment, sendStripeKey } from "../controllers/payment.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/payment/process", isAuthenticatedUser, processPayment);
router.get("/stripeapikey", isAuthenticatedUser, sendStripeKey);

export default router;
