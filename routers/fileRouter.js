const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG files are allowed"), false);
    }
  },
});

fileRouter.get("/new", fileController.newGet);
fileRouter.post("/new", upload.single("file"), fileController.uploadFile);

fileRouter.get("/:id", fileController.fileByIdGet);
fileRouter.get("/:filename/download", fileController.downloadPost);

module.exports = fileRouter;
