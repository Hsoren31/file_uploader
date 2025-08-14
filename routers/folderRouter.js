const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

folderRouter.post("/new", folderController.createFolder);
folderRouter.get("/:id", folderController.getFolder);
folderRouter.post("/:folderId/update", folderController.updateFolder);
folderRouter.post("/:folderId/delete", folderController.deleteFolder);
folderRouter.post("/add/:fileId", folderController.addToFolder);

module.exports = folderRouter;
