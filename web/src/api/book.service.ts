import apiClient from "./client";
import type { Book } from "../types/models";

export const bookService = {
  getAll: async (page = 1, pageSize = 10) => {
    const response = await apiClient.get<Book[]>("/books", {
      params: { page, page_size: pageSize },
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Book>(`/books/${id}`);
    return response.data;
  },

  create: async (book: Omit<Book, "id" | "createdAt" | "updatedAt">) => {
    const response = await apiClient.post<Book>("/books", book);
    return response.data;
  },

  update: async (id: string, book: Partial<Book>) => {
    const response = await apiClient.put<Book>(`/books/${id}`, book);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/books/${id}`);
  },
};
