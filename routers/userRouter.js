const { Router } = require("express");
const userRouter = new Router();
const userController = require("../controllers/userController");

userRouter.get("/signup", userController.getSignup);
userRouter.post("/signup", userController.postSignup);

userRouter.post("/log-in", userController.login);
userRouter.get("/log-out", userController.logout);

module.exports = userRouter;
