import { Router } from "express";
import { query, validationResult } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";

const router = Router();
router.get("/", (req, res) => {
  res.send("welcome home jajaga");
});

router.get(
  "/api/users",
  query("filter").isString().notEmpty().isLength(),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req;

    if (filter && value)
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    return res.send(mockUsers);
  },
);

export default router;
