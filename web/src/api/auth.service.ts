import apiClient from "./client";
import type { AuthResponse, LoginCredentials, User } from "../types/models";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<AuthResponse>("/login", credentials);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete apiClient.defaults.headers.common["Authorization"];
  },

  register: async (
    user: Omit<User, "id" | "createdAt" | "updatedAt"> & { password: string }
  ) => {
    const response = await apiClient.post("/register", user);
    return response.data;
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },
};
