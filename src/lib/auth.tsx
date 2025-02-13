import { configureAuth } from "react-query-auth";
import { Navigate, useLocation } from "react-router-dom";
import { z } from "zod";

import { AuthResponse, User } from "@/types/api";

import { api } from './api-client';

const getUser = async () : Promise<User> => {
  const response = await api.get<AuthResponse>('/auth/me');
  return response.data.user;
}

const logout = (): Promise<void> => {
  return api.post('/auth/logout');
}

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email("Invalid email address"),
  password: z.string().min(5, "Required (at least 5 characters)")
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/login', data);
};

export const registerInputSchema = z.object({
  email: z.string().min(1, 'Required').email("Invalid email address"),
});