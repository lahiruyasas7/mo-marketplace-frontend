import type { LoginRequest, LoginResponse } from '../types/auth.types';
import { api } from './axios';

export const refreshToken = async () => {
  const { data } = await api.post('/auth/refresh');
  return data;
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};
