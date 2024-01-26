import express, { response } from "express";
import routers from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import mockUsers from "./utils/constants.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "jabirtag",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  }),
);

app.use(routers);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world");
  res.status(201).send({ msg: "Hello world" });
});

app.post("/api/auth", (req, res) => {
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

app.get("/api/auth/status", (req, res) => {
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "not authenticated" });
});
app.post("/api/cart", (req, res) => {
  if (!req.session.user) return response.sendStatus(401);
  const { bosy: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(201).send(item);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
