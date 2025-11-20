import express from "express";
import converterRouter from "./routers/convert.route";
import rateLimit from "express-rate-limit";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rate limiter middleware 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);


app.use("/convert", converterRouter);


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
