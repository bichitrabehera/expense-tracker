import { sql } from "../config/db.js";

export async function getTransactionByUserId(req,res) {
  try {
    const { userId } = req.params;

    const transactions =
      await sql`SELECT *FROM transaction WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createTransaction(req, res) {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [transaction] = await sql`
        INSERT INTO transaction (user_id, title, amount, category)
        VALUES (${user_id}, ${title}, ${amount}, ${category})
        RETURNING *
        `;

    res.status(201).json(transaction);
    console.log(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const result = await sql`
    DELETE FROM transaction WHERE id = ${id} RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).json({ message: "Deleted successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function showSummary(req, res) {
  try {
    const { userId } = req.params;

    const balanceResult = await sql`
    SELECT COALESCE(SUM(amount),0) as balance FROM transaction WHERE user_id = ${userId}
    `;

    const incomeResult = await sql`
    SELECT COALESCE(SUM(amount),0) as income FROM transaction WHERE user_id = ${userId} AND amount>0
    `;

    const expenseResult = await sql`
    SELECT COALESCE(SUM(amount),0) as expense FROM transaction WHERE user_id = ${userId} AND amount < 0
    `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.log("Error getting summary", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
