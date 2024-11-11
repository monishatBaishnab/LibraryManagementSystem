import { Member, Prisma } from "@prisma/client";
import prisma from "../../utils/prismaClient";
import { filterKeys, searchFields } from "./member.constants";
import calculatePaginate from "../../utils/calculatePaginate";
import whereConditionsBuilder from "../../utils/whereConditionsBuilder";

// Function for fetch all members data from database
const findAllFromDB = async (query: Record<string, unknown>) => {
  const { limit, skip, sortBy, sortOrder } = calculatePaginate(query);
  const whereConditions = whereConditionsBuilder(query, searchFields, filterKeys);

  const members = await prisma.member.findMany({
    where: {
      AND: whereConditions,
    },
    skip: skip,
    take: limit,
    orderBy: { [sortBy ?? 'name']: sortOrder },
  });

  return members;
};

// Function for fetch single member data from db using member id
const findByIdFromDB = async (id: string) => {
  const member = await prisma.member.findUniqueOrThrow({
    where: { memberId: id },
  });

  return member;
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
