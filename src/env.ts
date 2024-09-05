import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.string().optional(),
    DATABASE_URL: z.string().min(1),
    DB_AUTH_TOKEN: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    // GITHUB_CLIENT_SECRET: z.string().min(1),
    // GITHUB_CLIENT_ID: z.string().min(1),
    HOST_NAME: z.string().min(1),
    EMAIL_FROM: z.string().min(1),
    EMAIL_SERVER_HOST: z.string().min(1),
    EMAIL_SERVER_PORT: z.string().min(1),
    EMAIL_SERVER_USER: z.string().min(1),
    EMAIL_SERVER_PASSWORD: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    NESTJS_API_URL: z.string().min(1),
    JWT_ACCESS_SECRET: z.string().min(1),
    JWT_REFRESH_SECRET: z.string().min(1),
    API_URL: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    NODE_EMAIL_SERVER_HOST: z.string().min(1),
    NODE_EMAIL_SERVER_PORT: z.string().min(1),
    NODE_EMAIL_SERVER_SECURE: z.string().min(1),
    NODE_EMAIL_SERVER_USER: z.string().min(1),
    NODE_EMAIL_SERVER_PASSWORD: z.string().min(1),
    NODE_EMAIL_FROM: z.string().min(1),
    TIPTAP_PRO_TOKEN: z.string().min(1),

  },
  client: {
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1),
    NEXT_PUBLIC_API_URL: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
    NEXT_PUBLIC_UPLOAD_PRESET: z.string().min(1),
    NEXT_PUBLIC_HOST_NAME: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DB_AUTH_TOKEN: process.env.DB_AUTH_TOKEN,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    HOST_NAME: process.env.HOST_NAME,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_FROM: process.env.EMAIL_FROM,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    // GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    // GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NESTJS_API_URL: process.env.NESTJS_API_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_UPLOAD_PRESET: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NODE_EMAIL_SERVER_HOST: process.env.NODE_EMAIL_SERVER_HOST,
    NODE_EMAIL_SERVER_PORT: process.env.NODE_EMAIL_SERVER_PORT,
    NODE_EMAIL_SERVER_SECURE: process.env.NODE_EMAIL_SERVER_SECURE,
    NODE_EMAIL_SERVER_USER: process.env.NODE_EMAIL_SERVER_USER,
    NODE_EMAIL_SERVER_PASSWORD: process.env.NODE_EMAIL_SERVER_PASSWORD,
    NODE_EMAIL_FROM: process.env.NODE_EMAIL_FROM,
    TIPTAP_PRO_TOKEN: process.env.TIPTAP_PRO_TOKEN,
    NEXT_PUBLIC_HOST_NAME: process.env.NEXT_PUBLIC_HOST_NAME
  },
});
