import { jwtDecode } from "jwt-decode";

export const AUTHENTICATION_ERROR_MESSAGE =
  "You must be logged in to view this content";

export const PRIVATE_GROUP_ERROR_MESSAGE =
  "You do not have permission to view this group";

export const AuthenticationError = class AuthenticationError extends Error {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = "AuthenticationError";
  }
};

export const PrivateGroupAccessError = class PrivateGroupAccessError extends Error {
  constructor() {
    super(PRIVATE_GROUP_ERROR_MESSAGE);
    this.name = "PrivateGroupAccessError";
  }
};

export const NotFoundError = class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
};

export const isTokenExpired = (token: string) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);  
    return decoded.exp! <= now;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};
