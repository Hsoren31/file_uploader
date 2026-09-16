const db = require("../db/fileQueries");
const uploadToCloudinary =
  require("../middleware/upload.js").uploadToCloudinary;
const Readable = require("stream").Readable;

async function newGet(req, res) {
  res.render("newFile");
}

async function uploadFile(req, res, next) {
  try {
    const { title } = req.body;
    const userId = res.locals.currentUser.id;
    const result = await uploadToCloudinary(req.file.buffer);
    if (title.trim() === "") {
      const files = await db.readUsersFiles(userId);
      const untitledFiles = files.filter((file) =>
        file.name.startsWith("Untitled ")
      );
      const newFile = `Untitled ${untitledFiles.length + 1}`;
      await db.createFile(userId, newFile, result);
      return res.redirect("/");
    }
    await db.createFile(userId, title, result);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

async function fileByIdGet(req, res, next) {
  try {
    const { id } = req.params;
    const file = await db.readFileById(Number(id));
    res.render("viewFile", { file });
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

async function deleteFile(req, res, next) {
  try {
    const { id } = req.params;
    await db.deleteFile(Number(id));
    res.redirect("/");
  } catch (err) {
    console.error(err);
    return next(err);
  }
}

async function downloadPost(req, res) {
  const { id } = req.params;
  const file = await db.readFileById(Number(id));
  if (!file) {
    res.status(404).send("Could not find file.");
    return;
  }

  const response = await fetch(file.fileUrl);
  if (!response.ok) return res.status(502).send("Failed to fetch file");

  res.setHeader("Content-Disposition", "attachment; filename=`file`");
  res.setHeader("Content-Type", response.headers.get("content-type"));

  Readable.fromWeb(response.body).pipe(res);
}

module.exports = {
  newGet,
  uploadFile,
  fileByIdGet,
  deleteFile,
  downloadPost,
};
