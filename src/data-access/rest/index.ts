import { getCurrentUser } from '@/lib/session';
import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const createApi = (token?: string): AxiosInstance => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return axios.create({
    baseURL: API_BASE_URL,
    headers,
  });
};

