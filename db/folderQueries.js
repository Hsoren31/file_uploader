const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

//create Folder
async function createFolder(userId, title) {
  try {
    await prisma.folder.create({
      data: {
        title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//read folder
async function readUsersFolders(userId) {
  const folders = await prisma.folder.findMany({
    where: {
      userId,
    },
  });
  return folders;
}

// update folder

// delete folder

// add to folder

// remove from folder

module.exports = {
  createFolder,
  readUsersFolders,
};
