const db = require("../db/queries");
const uploadToCloudinary = "../middleware/upload.js".uploadToCloudinary;
async function newGet(req, res) {
  res.render("newFile");
}

async function newPost(req, res, next) {
  try {
    const result = await uploadToCloudinary(req.file.buffer);
    const userId = res.locals.currentUser.id;
    await db.createFile(userId, fileUrl.secure_url);
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
