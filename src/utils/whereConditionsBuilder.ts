import { Prisma } from "@prisma/client";
import sanitizeQueries from "./sanitizeFilters";

const whereConditionsBuilder = (
  query: Record<string, unknown>,
  searchFields: string[],
  filterKeys: string[]
) => {
  const { searchTerm } = query;
  const filters = sanitizeQueries(query, filterKeys);
  const whereConditions: Prisma.MemberWhereInput[] = [];

  if (searchTerm) {
    whereConditions.push({
      OR: searchFields.map((field) => ({
        [field]: { contains: searchTerm, mode: "insensitive" },
      })),
    });
  }

  if (filters) {
    whereConditions.push({
      AND: Object.keys(filters).map((key) => ({
        [key]: { equals: filters[key] },
      })),
    });
  }

  return whereConditions;
};

export default whereConditionsBuilder;
