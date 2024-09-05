// src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { GraphQLClient, gql } from 'graphql-request';
import { isTokenExpired } from "@/app/utils";
import { updateToken } from "@/data-access/graphql/users";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const client = new GraphQLClient(`${API_URL}/graphql`); // Your GraphQL endpoint

// Define the shape of the response from the login mutation
interface LoginResponse {
  login: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      email: string;
      firstname: string;
      lastname: string;
      image: string;
      role: string;
    };
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const LOGIN_MUTATION = gql`
          mutation Login($email: String!, $password: String!) {
            login(data: { email: $email, password: $password }) {
              accessToken
              refreshToken
              user {
                id
                email
                firstname
                lastname
                image
                role
              }
            }
          }
        `;

        try {
          const response = await client.request<LoginResponse>(LOGIN_MUTATION, {
            email: credentials?.email || '',
            password: credentials?.password || '',
          });

          const user = response.login.user;
          if (user) {
            return {
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              image: user.image,
              accessToken: response.login.accessToken,
              refreshToken: response.login.refreshToken,
              role: user.role,
            } as User;
          }

          return null;
        } catch (error: any) {
          const errorMessage = error.response?.errors[0]?.message;

          if (errorMessage.includes('No user found')) {
            throw new Error('No account found with that email.');
          } else if (errorMessage.includes('Invalid password')) {
            throw new Error('Incorrect password. Please try again.');
          } else if (errorMessage.includes('Email not verified')) {
            throw new Error('Please verify your email before logging in.');
          } else {
            throw new Error('An unknown error occurred.');
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.image = user.image;
        token.role = user.role;     
      }

      

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.user.email = token.email as string;
        session.user.firstname = token.firstname as string;
        session.user.lastname = token.lastname as string;
        session.user.image = token.image as string;
        session.user.role = token.role as string;   
        
        if(isTokenExpired(session.accessToken)){
          const newToken = await updateToken(session.refreshToken);
          if(newToken){
            session.accessToken = newToken.accessToken;
            // session.refreshToken = newToken.refreshToken;
          }
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
