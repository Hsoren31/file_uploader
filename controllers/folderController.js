const db = require("../db/queries");

async function createFolder(req, res, next) {
  try {
    const userId = res.locals.currentUser.id;
    const { title } = req.body;
    await db.createFolder(userId, title);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

async function updateFolder(req, res, next) {
  try {
    const { folderId } = req.params;
    const { title } = req.body;
    await db.updateFolder(Number(folderId), title);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

async function deleteFolder(req, res, next) {
  try {
    const { folderId } = req.params;
    await db.deleteFolder(Number(folderId));
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

async function getFolder(req, res) {
  try {
    const { id } = req.params;
    const folder = await db.getFolder(id);
    res.render("viewFolder", { folder });
  } catch (err) {
    console.error(err);
  }
}

async function addToFolder(req, res) {
  try {
    const { fileId } = req.params;
    const { folders } = req.body;
    if (Array.isArray(folders)) {
      folders.forEach(async (folder) => {
        await db.insertFile(Number(fileId), Number(folder));
      });
    } else {
      await db.insertFile(Number(fileId), Number(folders));
    }
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolder,
  addToFolder,
};
