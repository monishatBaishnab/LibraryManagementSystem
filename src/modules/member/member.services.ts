import { Member } from "@prisma/client";
import prisma from "../../utils/prismaClient";

// Function for fetch all members data from database
const findAllFromDB = async () => {
  const members = await prisma.member.findMany();

  return members;
};

// Function for fetch single member data from db using member id
const findByIdFromDB = async (id: string) => {
  const members = await prisma.member.findUniqueOrThrow({
    where: { memberId: id },
  });

  return members;
};

// Function for create new member in database
const createIntoDB = async (payload: Member) => {
  const createdMember = await prisma.member.create({
    data: payload,
  });

  return createdMember;
};

// Function for update existing member information
const updateFromDB = async (id: string, payload: Partial<Member>) => {
  // Check member is exists or not. if not the throw an error.
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: id,
    },
  });

  const updatedMember = await prisma.member.update({
    data: payload,
    where: { memberId: id },
  });

  return updatedMember;
};

// Function for delete member information
const deleteFromDB = async (id: string) => {
  // Check member is exists or not. if not the throw an error.
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: id,
    },
  });

  await prisma.member.delete({
    where: { memberId: id },
  });
};

export const MemberServices = {
  findAllFromDB,
  findByIdFromDB,
  createIntoDB,
  updateFromDB,
  deleteFromDB,
};
