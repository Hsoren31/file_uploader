const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function createFile(userId, title, file) {
  try {
    await prisma.file.create({
      data: {
        name: title,
        fileUrl: file.secure_url,
        size: String(file.bytes),
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

async function createFileToFolder(userId, title, file, folderId) {
  try {
    await prisma.file.create({
      data: {
        name: title,
        fileUrl: file.secure_url,
        size: String(file.bytes),
        user: {
          connect: {
            id: userId,
          },
        },
        folder: {
          connect: {
            id: folderId,
          },
        },
      },
    });
  } catch (err) {
    throw err;
  }
}

async function readFileById(id) {
  try {
    const file = await prisma.file.findFirstOrThrow({
      where: {
        id,
      },
    });
    return file;
  } catch (err) {
    console.error(err);
    throw new Error("Couldn't find file");
  }
}

async function readUsersFiles(userId) {
  try {
    const files = await prisma.file.findMany({
      where: {
        userId,
      },
    });
    return files;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteFile(id) {
  try {
    await prisma.file.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  createFile,
  createFileToFolder,
  readFileById,
  readUsersFiles,
  deleteFile,
};
