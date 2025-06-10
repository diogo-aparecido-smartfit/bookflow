/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookService } from "@/api/book.service";
import type { Book } from "@/types/models";

interface BookFormData {
  title: string;
  author: string;
  description: string;
  isbn: string;
  cover_url: string;
  status: Book["status"];
}

export function useBookCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [book, setBook] = useState<BookFormData>({
    title: "",
    author: "",
    description: "",
    isbn: "",
    cover_url: "",
    status: "available",
  });

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setBook((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        setLoading(true);
        setError("");

        const response = await bookService.create({
          ...book,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        navigate(`/books/${response.id}`);
      } catch (error: any) {
        setError(
          error.response?.data?.error ||
            "Failed to create book. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [book, navigate]
  );

  const handleCancel = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    book,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleCancel,
  };
}
