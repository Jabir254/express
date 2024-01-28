import passport from "passport";
import { Strategy } from "passport-local";
import mockUsers from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
  console.log(`inside serializeUser`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`inside deserializeUser`);
  console.log(`deserialing user ID ${id}`);
  try {
    const findUser = mockUsers.find((user) => user.id === id);
    if (!findUser) throw new Error("user not found");
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
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
