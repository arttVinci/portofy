export const generateUserId = (username: string): string => {
  const cleanUser = username
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 15);

  const randomHash = Math.random().toString(36).substring(2, 7);

  return `usr_${cleanUser}_${randomHash}`;
};
