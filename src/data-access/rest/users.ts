// src/services/userService.ts
import api from ".";
import { privateClient } from "@/lib/graphqlClient";
import { UPDATE_USER_MUTATION } from "@/data-access/graphql/users";

export interface CreateUserData {
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN';
}

const userService = {
  createAndVerify: async (userData: CreateUserData) => {
    const response = await api.post('/user/create-and-verify', userData);
    return response.data;
  },

  generateVerificationToken: async (userId: string) => {
    const response = await api.post('/user/generate-verification-token', { userId });
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await api.post('/user/verify-email', { token });
    return response.data;
  },

  updateName: async (firstname: string, lastname: string) => {
    const response = await api.put('/user/update-name', { firstname, lastname });
    return response.data;
  },

  updateImage: async (image: string) => {
    const response = await api.put('/user/update-image', { image });
    return response
  },


  updateUser: async (token: string, userId: string, userData: UpdateUserInput) => {
    const client = privateClient(token);
    const response = await client.request<UpdateUserResponse>(UPDATE_USER_MUTATION, {
      userId,
      data: userData,
    });
    return response.updateUser;
  },

};

export default userService;