import { prisma } from "../../lib/prisma.js";

export const createCategory = (data: {
  name: string;
  description?: string;
}) => {
  return prisma.category.create({ data });
};

export const getAllCategories = () => {
  return prisma.category.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
  });
};

export const getCategoryById = (id: string) => {
  return prisma.category.findFirst({
    where: { id, isDeleted: false },
    include: { products: true },
  });
};

export const updateCategory = (
  id: string,
  data: Partial<{ name: string; description: string }>,
) => {
  return prisma.category.update({ where: { id }, data });
};

export const softDeleteCategory = (id: string) => {
  return prisma.category.update({
    where: { id },
    data: { isDeleted: true },
  });
};
