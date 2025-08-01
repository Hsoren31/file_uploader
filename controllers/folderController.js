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

module.exports = {
  createFolder,
  updateFolder,
  deleteFolder,
};
