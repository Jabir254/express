import { Router } from "express";
import mockUsers from "../utils/constants.mjs";
const router = Router();

router.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser) return res.status(401).send({ msg: "bad credentials" });

  if (findUser.password !== password)
    return res.status(401).send({ msg: "bad credentials" });

  req.session.user = findUser;

  return res.status(200).send(findUser);
});

router.get("/api/auth/status", (req, res) => {
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "not authenticated" });
});

router.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.send(200);
  });
});

export default router;
