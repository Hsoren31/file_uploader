const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

fileRouter.get("/new", fileController.newGet);
fileRouter.post("/new", upload.single("file"), fileController.newPost);

fileRouter.get("/:id", fileController.fileByIdGet);
fileRouter.get("/:filename/download", fileController.downloadPost);

module.exports = fileRouter;
