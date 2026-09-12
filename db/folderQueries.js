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

async function readFolderById(id) {
  const folder = await prisma.folder.findFirst({
    where: {
      id,
    },
    include: {
      File: true,
    },
  });

  return folder;
}

// update folder
async function updateFolder(id, title) {
  try {
    return await prisma.folder.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// delete folder
async function deleteFolder(id) {
  try {
    await prisma.folder.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// add to folder

// remove from folder

module.exports = {
  createFolder,
  readUsersFolders,
  readFolderById,
  updateFolder,
  deleteFolder,
};
