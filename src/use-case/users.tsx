import { UPDATE_USER_MUTATION } from "@/data-access/graphql/users";
import { privateClient } from "@/lib/graphqlClient";

const updateUser = async (token : any, userData : any) => {
    try {
      const client = privateClient(token);
      const response = await client.request(UPDATE_USER_MUTATION, {
        data: userData,
      });
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };