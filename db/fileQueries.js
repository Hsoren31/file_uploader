const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function createFile(userId, fileUrl) {
  try {
    await prisma.file.create({
      data: {
        fileUrl,
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

module.exports = {
  createFile,
  readFileById,
};
