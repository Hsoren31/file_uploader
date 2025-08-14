const db = require("../db/queries");
const fs = require("fs");
const http = require("http");
const cloudinary = require("cloudinary").v2;

//config cloud storage
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function newGet(req, res) {
  res.render("newFile");
}

async function newPost(req, res, next) {
  try {
    const fileUrl = await cloudinary.uploader
      .upload(req.file.path, {
        transformation: [
          {
            quality: "auto",
            fetch_format: "auto",
          },
          {
            width: 1200,
            height: 1200,
            crop: "fill",
            gravity: "auto",
          },
        ],
      })
      .then((result) => {
        return result.url;
      })
      .catch((error) => console.error(error));
    const userId = res.locals.currentUser.id;
    await db.createFile(userId, fileUrl);
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
