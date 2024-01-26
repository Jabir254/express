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

export default router;
