import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  res.send([{ id: 123, name: "Tomato", price: 345 }]);
});

export default router;
