import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { AuthenticationError } from "@/app/utils";
import { authOptions } from "./auth-options";


export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions); // Get the session from NextAuth

  if (!session || !session.user) {
    return undefined;
  }

  // Return the user object including the accessToken if available
  return {
    ...session.user,
    accessToken: session.accessToken, // Ensure accessToken is included
    refreshToken: session.refreshToken, // Ensure refreshToken
  };
};

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new AuthenticationError();
  }

  return user;
};

export async function setSession(userId : any) {
  const sessionCookie = cookies().get("next-auth.session-token"); 

  if (!sessionCookie) {
    throw new AuthenticationError();
  }

  cookies().set("next-auth.session-token", sessionCookie.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
