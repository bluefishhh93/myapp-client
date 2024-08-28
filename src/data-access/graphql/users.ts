import { gql } from 'graphql-request';
import { client, privateClient } from '@/lib/graphqlClient';
import { jwtDecode } from 'jwt-decode';
import { getCurrentUser } from '@/lib/session';
// Define the SIGNUP_MUTATION
export const SIGNUP_MUTATION = gql`
  mutation Signup($data: SignupInput!) {
    signup(data: $data) {
      accessToken
      refreshToken
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      email
      firstname
      lastname
      image
    }
  }
`;

export const REFRESH_ACCESS_TOKEN_MUTATION = gql`
  mutation RefreshToken($token: JWT!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`;

interface RefreshTokenResponse {
  refreshToken: {
    accessToken: string;
    refreshToken: string;
  };
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const updateToken = async (token: string): Promise<TokenResponse | null> => {
  try {
    const response = await client.request<RefreshTokenResponse>(REFRESH_ACCESS_TOKEN_MUTATION, {
      token
    });

    if (response.refreshToken) {
      const { accessToken, refreshToken } = response.refreshToken;
      return { accessToken, refreshToken };
    } else {
      throw new Error('Failed to refresh access token');
    }

  } catch (error) {
    console.error('Error ensuring valid token:', error);
    return null;
  }
};

interface MeResponse {
  me: User;
}

export const getProfile = async (accessToken: string): Promise<User | null> => {
  const CURRENT_USER_PROFILE = gql`
    query Me {
      me {
        id
        email
        firstname
        lastname
        role
        image
      }
    }
  `;

  try {
    const response: MeResponse = await privateClient(accessToken).request(CURRENT_USER_PROFILE);

    return response.me ? response.me : null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};