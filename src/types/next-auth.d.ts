// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
    email?: string;
    lastname?: string;
    firstname?: string;
    image?: string;
    role: string;
  }

  interface Session {
    user: User; // Referencing the extended User interface
    accessToken: string;
    refreshToken: string;
    tokenExpires: number;
  }
}
