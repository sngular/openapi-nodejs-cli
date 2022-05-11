export const capitalize = (str: string): string => {
  const lowercase = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lowercase.slice(1);
};
