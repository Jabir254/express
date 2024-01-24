import { Router } from "express";

const router = Router();

app.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "Tomato", price: 345 }]);
});

export default router;
