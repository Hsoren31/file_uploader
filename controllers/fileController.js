const db = require("../db/fileQueries");
const uploadToCloudinary =
  require("../middleware/upload.js").uploadToCloudinary;

async function newGet(req, res) {
  res.render("newFile");
}

async function uploadFile(req, res, next) {
  try {
    const result = await uploadToCloudinary(req.file.buffer);
    const userId = res.locals.currentUser.id;
    await db.createFile(userId, result.secure_url);
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
  uploadFile,
  fileByIdGet,
  deleteFile,
  downloadPost,
};
