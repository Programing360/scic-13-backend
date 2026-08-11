import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";
import { generateToken } from "../../lib/jwt.js";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const existingUser = await prisma.user.findFirst({
    where: { email: data.email, isDeleted: false },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  const token = generateToken({ id: user.id, role: user.role });
  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

export const loginUser = async (data: { email: string; password: string }) => {
  const user = await prisma.user.findFirst({
    where: { email: data.email, isDeleted: false },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({ id: user.id, role: user.role });

  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};
