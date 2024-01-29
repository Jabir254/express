import { Router } from "express";
import { query, validationResult, checkSchema } from "express-validator";
import mockUsers from "../utils/constants.mjs";
import createUserValidation from "../utils/validationSchemas.mjs";
import User from "../schemas/user.mjs";
const router = Router();

router.get(
  "/api/users",
  query("filter").isString().notEmpty().isLength(),
  (req, res) => {
    // const result = validationResult(req);
    // console.log(result);
    //
    console.log(req.session);
    console.log(req.session.id);
    const {
      query: { filter, value },
    } = req;

    if (filter && value)
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    return res.send(mockUsers);
  },
);

router.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);

  if (isNaN(parsedId)) return res.status(400).send({ msg: "bad request" });

  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

//post request
router.post(
  "/api/users",
  checkSchema(createUserValidation),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.send(result.array());
    const { body } = req;
    const newUser = new User(body);
    try {
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  },
);
/**
 * PUT request
 *
 */
router.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(200);
});
/**
 * PATCH req
 *
 */
router.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});
/**
 * Delete
 *
 */
router.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

export default router;
