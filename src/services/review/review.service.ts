import { prisma } from "../../lib/prisma.js";


export const createReview = (data: {
  rating: number;
  comment?: string;
  productId: string;
  userId: string;
}) => {
  return prisma.review.create({ data });
};

export const getAllReviews = (productId?: string) => {
  return prisma.review.findMany({
    where: {
      isDeleted: false,
      ...(productId && { productId }),
    },
    include: {
      user: { select: { id: true, name: true } },
      product: { select: { id: true, title: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getReviewById = (id: string) => {
  return prisma.review.findFirst({
    where: { id, isDeleted: false },
    include: {
      user: { select: { id: true, name: true } },
      product: { select: { id: true, title: true } },
    },
  });
};

export const updateReview = (
  id: string,
  data: Partial<{ rating: number; comment: string }>
) => {
  return prisma.review.update({ where: { id }, data });
};

export const softDeleteReview = (id: string) => {
  return prisma.review.update({
    where: { id },
    data: { isDeleted: true },
  });
};