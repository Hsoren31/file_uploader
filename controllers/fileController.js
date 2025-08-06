const db = require("../db/queries");
const path = require("node:path");

async function newGet(req, res) {
  res.render("newFile");
}

async function newPost(req, res, next) {
  try {
    console.log(req.file);
    const userId = res.locals.currentUser.id;
    const file = req.file;
    await db.createFile(userId, file);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

async function fileByIdGet(req, res) {
  const { id } = req.params;
  const file = await db.findFileById(id);
  res.render("singleFile", { file });
}

async function downloadPost(req, res) {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error("File download failed:", err);
      res.status(500).send("Error downloading file.");
    } else {
      console.log("File downloaded successfully.");
    }
  });
}

module.exports = {
  newGet,
  newPost,
  fileByIdGet,
  downloadPost,
};
