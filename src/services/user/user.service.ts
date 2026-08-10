import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";

export const registerUser = async (data: {name: string; email:string; password: string}) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
        data:{...data, password: hashedPassword}
    })
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({ where: { email, isDeleted: false } });
  if (!user) throw new Error("User not found");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  return user;
};