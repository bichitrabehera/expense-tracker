import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { initDB } from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";
import transaction from "./src/routes/transactionRoute.js"
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use(cors())
app.use(cors({
  origin: "https://expense-tracker-app-production-90fb.up.railway.app/",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use((req, res, next) => {
  console.log("We hit a req", req.method);
  next();
});


app.use('/api/transactions/',transaction)

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
