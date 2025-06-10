import { useState, useEffect } from "react";
import { bookService } from "@/api/book.service";
import type { Book } from "@/types/models";

export function useHome() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await bookService.getAll();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return {
    books,
    loading,
    error,
  };
}
