export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  cover_url: string;
  status: "available" | "borrowed" | "lost";
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
