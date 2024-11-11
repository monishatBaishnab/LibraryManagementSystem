import sanitizeQueries from "./sanitizeFilters";

// Define the function response type
type TResponseOptions = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};

// List of keys that can be part of the query options
export const optionKeys = ["page", "limit", "sortBy", "sortOrder"];

const calculatePaginate = (query: Record<string, unknown>): TResponseOptions => {
  // Sanitize and extract the options from the query based on the allowed keys
  const options = sanitizeQueries(query, optionKeys);

  const page: number = Number(options?.page || 1);
  const limit: number = Number(options?.limit || 10);
  const skip: number = (page - 1) * limit;
  const sortBy: string = (options?.sortBy as string);
  const sortOrder: string = (options?.sortOrder as string) || "asc";

  return { page, limit, skip, sortBy, sortOrder };
};

export default calculatePaginate;
