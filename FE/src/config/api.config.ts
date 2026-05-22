export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || "https://portofy-be-482363896451.asia-southeast2.run.app/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "authToken",
} as const;