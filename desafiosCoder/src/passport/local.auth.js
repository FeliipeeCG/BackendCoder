import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/Users.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await User.findById(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallbacks: true,
    },
    async (req, email, password, done) => {
      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPass(password);
      await user.save();
      done(null, user);
    }
  )
);
