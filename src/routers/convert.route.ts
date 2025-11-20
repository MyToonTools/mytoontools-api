import { JsonConverter } from "@/converters/json/json.converter";
import { Router } from "express";



const converterRouter = Router();

converterRouter.post("/", async (req, res) => {
  const { from, to, content } = req.body;

  const jsonConverter = new JsonConverter();

  if (from === "json" && to === "toon") {
    const output = await jsonConverter.toToon(content);
    return res.json({ output });
  }

  if (from === "toon" && to === "json") {
    const output = await jsonConverter.fromToon(content);
    return res.json({ output });
  }

  res.status(400).json({ error: "Unsupported conversion" });
});
export default converterRouter;