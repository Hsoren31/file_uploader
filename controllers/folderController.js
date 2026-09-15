const db = require("../db/folderQueries");

async function createFolder(req, res, next) {
  try {
    const userId = res.locals.currentUser.id;
    const { title } = req.body;

    if (title.trim() === "") {
      const folders = await db.readUsersFolders(userId);
      const untitledFolders = folders.filter((folder) =>
        folder.title.startsWith("Folder ")
      );
      const newTitle = `Folder ${untitledFolders.length + 1}`;

      await db.createFolder(userId, newTitle);
      res.redirect("/");
      return;
    }

    await db.createFolder(userId, title);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

async function getFolder(req, res) {
  try {
    const { id } = req.params;
    const folder = await db.readFolderById(Number(id));
    console.log(folder);
    res.render("viewFolder", { folder });
  } catch (err) {
    console.error(err);
  }
}

async function updateFolder(req, res, next) {
  try {
    const { id } = req.params;
    const { title } = req.body;
    await db.updateFolder(Number(id), title);
    res.redirect(`/folders/${id}`);
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

async function deleteFolder(req, res, next) {
  try {
    const { id } = req.params;
    await db.deleteFolder(Number(id));
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

async function addToFolder(req, res, next) {
  try {
    const { fileId } = req.params;
    const { folder } = req.body;
    await db.addFileToFolder(Number(folder), Number(fileId));
    res.redirect(`/folders/${folder}`);
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolder,
  addToFolder,
};
