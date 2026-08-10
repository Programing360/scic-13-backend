
import type { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

export const createProduct = (data: {
  title: string;
  price: number;
  stock?: number;
  categoryId: string;
}) => {
  return prisma.product.create({ data });
};

export const getAllProducts = (query: {
  categoryId?: string;
  search?: string;
}) => {
  const where: Prisma.ProductWhereInput = {
    isDeleted: false,
    ...(query.categoryId && { categoryId: query.categoryId }),
    ...(query.search && {
      title: { contains: query.search, mode: "insensitive" },
    }),
  };

  return prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getProductById = (id: string) => {
  return prisma.product.findFirst({
    where: { id, isDeleted: false },
    include: { category: true, reviews: true },
  });
};

export const updateProduct = (
  id: string,
  data: Partial<{
    title: string;
    price: number;
    stock: number;
    categoryId: string;
    status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  }>,
) => {
  return prisma.product.update({ where: { id }, data });
};

export const softDeleteProduct = (id: string) => {
  return prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });
};
