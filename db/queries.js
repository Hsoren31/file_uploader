const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function createUser(name, username, password) {
  try {
    await prisma.user.create({
      data: {
        name,
        username,
        password,
      },
    });
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function findUserByUsername(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
}

async function findUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

async function insertFile(fileId, folderId) {
  await prisma.folder.update({
    where: {
      id: folderId,
    },
    data: {
      File: {
        connect: {
          id: fileId,
        },
      },
    },
    include: {
      File: true,
    },
  });
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  insertFile,
};
