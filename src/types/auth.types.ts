export interface LoginPayload {
  email: '';
  password: '';
}

export interface User {
  id: string;
  full_name: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user: User;
}

export type SignupPayload = {
  full_name: string;
  email: string;
  password: string;
};
