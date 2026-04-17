require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

const userRouter = require("./routers/userRouter");
const folderRouter = require("./routers/folderRouter");
const fileRouter = require("./routers/fileRouter");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(
  session({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/user", userRouter);
app.use("/folders", folderRouter);
app.use("/file", fileRouter);
app.get("/", async (req, res) => {
  let folders = [];
  let files = [];
  if (res.locals.currentUser) {
    folders = await prisma.folder.findMany({
      where: {
        userId: res.locals.currentUser.id,
      },
      orderBy: {
        id: "asc",
      },
    });
    files = await prisma.file.findMany({
      where: {
        userId: res.locals.currentUser.id,
      },
      orderBy: {
        id: "asc",
      },
    });
  }
  res.render("index", { folders, files });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}`);
});
