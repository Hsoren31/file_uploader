const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

const validateUser = [
  body("firstname")
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 10 })
    .withMessage("First name must be between 1 and 10 characters"),
  body("username")
    .trim()
    .notEmpty()
    .isLength({ min: 8, mex: 15 })
    .withMessage("Username must be between 8 and 15 characters"),
  body("password")
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be between 8 and 15 characters"),
  body("confirm-pass")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.findUserByUsername(username);
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

function getSignup(req, res) {
  res.render("signup");
}

postSignup = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        errors: errors.array(),
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const { firstname, username } = req.body;
      await db.createUser(firstname, username, hashedPassword);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

function logout(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  getSignup,
  postSignup,
  login,
  logout,
};
