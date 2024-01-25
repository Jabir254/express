import express from "express";
import routers from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(routers);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge: 60000 * 60 * 2 });
  res.status(201).send({ msg: "Hello world" });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
