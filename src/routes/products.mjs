import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  if (req.cookies.hello && req.cookies.hello === "world")
    return res.send([{ id: 123, name: "Tomato", price: 345 }]);
  return res.send({ msg: "sorry need the correct cookies" });
});

export default router;
