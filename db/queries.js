const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function createFolder(userId, title) {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        Folder: {
          create: {
            title,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
}

async function updateFolder(folderId, title) {
  try {
    await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        title,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

async function deleteFolder(folderId) {
  try {
    await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createFolder,
  updateFolder,
  deleteFolder,
};
