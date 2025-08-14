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

async function getFolder(id) {
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

async function createFile(userId, fileUrl) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      File: {
        create: {
          fileUrl,
        },
      },
    },
  });
}

async function findFileById(id) {
  try {
    const file = await prisma.file.findFirst({
      where: {
        id,
      },
    });
    return file;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  createFolder,
  updateFolder,
  deleteFolder,
  getFolder,
  insertFile,
  createFile,
  findFileById,
};
