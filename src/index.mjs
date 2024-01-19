import express, { response } from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "jabir", displayName: "Jabir" },
  { id: 2, username: "Kullow", displayName: "Kullow" },
  { id: 3, username: "fade", displayName: "Fathe" },
  { id: 4, username: "jason", displayName: "Jason" },
  { id: 5, username: "henry", displayName: "Henry" },
  { id: 6, username: "tina", displayName: "Tina" },
  { id: 7, username: "marilyn", displayName: "Marilyn" },
];

app.get("/", (req, res) => {
  res.send("<h3>Welcome home</h3>");
});
app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.send(mockUsers);
});

/**
 * GET
 * param: id
 * return: Users id
 */
app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);

  if (isNaN(parsedId)) return res.status(400).send({ msg: "bad request" });

  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "Tomato", price: 345 }]);
});

/**
 * post request
 */
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
