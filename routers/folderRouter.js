const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

folderRouter.post("/new", folderController.createFolder);
folderRouter.post("/:folderId/update", folderController.updateFolder);
folderRouter.post("/:folderId/delete", folderController.deleteFolder);

module.exports = folderRouter;
