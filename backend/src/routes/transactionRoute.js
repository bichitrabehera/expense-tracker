import express from "express";
import { createTransaction, deleteTransaction, getTransactionByUserId, showSummary } from "../controllers/transactionController.js";

const router = express.Router();

router.get("/:userId",getTransactionByUserId);
router.post("/",createTransaction);
router.delete("/:id",deleteTransaction);
router.get("/summary/:userId",showSummary);

export default router;
