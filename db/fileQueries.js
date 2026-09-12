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

module.exports = {
  createFile,
};
