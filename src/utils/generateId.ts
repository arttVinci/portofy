export const generateId = (): string => {
  return `${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
};

export const generateUserId = (username: string): string => {
  const cleanUser = username
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 15);

  const randomHash = Math.random().toString(36).substring(2, 7);

  return `usr_${cleanUser}_${randomHash}`;
};
