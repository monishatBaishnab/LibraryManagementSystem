const sanitizeQueries = <T extends Record<string, unknown>, k extends keyof T>(
  object: T,
  keys: k[]
): Partial<T> => {
  const finalObject: Partial<T> = {};

  keys.forEach((key) => {
    if (object && Object.hasOwnProperty.call(object, key)) {
      finalObject[key] = object[key];
    }
  });

  return finalObject;
};

export default sanitizeQueries;
