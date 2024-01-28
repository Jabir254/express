import express, { response } from "express";
import routers from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strateies.mjs";

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

app.use(passport.initialize());
app.use(passport.session());

app.use(routers);

//authenticate
app.post("/api/auth/1", passport.authenticate("local"), (req, res) => {});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
