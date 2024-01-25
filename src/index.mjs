import express from "express";
import routers from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

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
  res.cookie("hello", "world");
  res.status(201).send({ msg: "Hello world" });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
