import express from "express";
import { JsonConverter } from "./converters/json/json.converter";
import converterRouter from "./routers/convert.route";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/convert", converterRouter);


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
