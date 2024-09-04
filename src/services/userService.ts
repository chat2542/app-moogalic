import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUsers() {
  return await prisma.user.findMany();
}

export async function getUserById(id: number) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function createUser(data: { email: string; firstName: string; lastName: string }) {
    const {email,firstName,lastName} = data;

    return await prisma.user.create({
      data: {
        email,
        firstName,
        lastName
      },
    });
}  

export async function updateUser(id: number, data: { email?: string; firstName?: string; lastName?: string }) {
  return await prisma.user.update({
    where: { id },
    data: {
      ...(data.email && { email: data.email }),
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
    },
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: { id },
  });
}
