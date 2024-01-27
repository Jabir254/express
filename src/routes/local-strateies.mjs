import passport from "passport";
import { Strategy, strategies } from "passport-local";
import mockUsers from "../utils/constants.mjs";

passport.use(
  new Strategy((username, password, done) => {
    try {
      const findUser = mockUsers.find((user) => user.username == username);
      if (!findUser) throw new Error("user not found");
      if (findUser.password !== password)
        throw new Error("password not match invalid crediatials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  }),
);
