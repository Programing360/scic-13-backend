import { prisma } from "../../lib/prisma.js";

export const getAllUsers = () => {
  return prisma.user.findMany({
    where: { isDeleted: false },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getUserById = (id: string) => {
  return prisma.user.findFirst({
    where: { id, isDeleted: false },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const updateUser = (
  id: string,
  data: Partial<{ name: string; email: string }>,
) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      updatedAt: true,
    },
  });
};

export const softDeleteUser = (id: string) => {
  return prisma.user.update({
    where: { id },
    data: { isDeleted: true },
  });
};
