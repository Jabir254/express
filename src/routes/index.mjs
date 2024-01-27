import { Router } from "express";

import userRouter from "./users.mjs";
import productsRouter from "./products.mjs";
import auth from "./auth.mjs";
import cart from "./carts.mjs";

const router = Router();

router.use(userRouter);
router.use(productsRouter);
router.use(auth);
router.use(cart);

router.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world");
  res.status(201).send({ msg: "Hello world" });
});



export default router;
