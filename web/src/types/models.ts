export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  coverUrl: string;
  status: "available" | "borrowed" | "lost";
  createdAt: string;
  updatedAt: string;
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
