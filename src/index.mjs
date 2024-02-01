import express from "express";
import routers from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./strategies/local-strateies.mjs";

const app = express();

mongoose
  .connect("mongodb://localhost/express_tut")
  .then((ii) => console.log("connected to database"))
  .catch((err) => console.log(`Error ${err}`));

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
    store:MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routers);

//authenticate
app.post("/api/auth/1", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
