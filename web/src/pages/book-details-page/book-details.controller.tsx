/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookService } from "@/api/book.service";
import type { Book } from "@/types/models";
import { STATUS_BADGE_MAP } from "@/utils/utils";

export function useBookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!id) return;

        setLoading(true);
        const data = await bookService.getById(id);
        setBook(data);
      } catch (error: any) {
        setError(error.response?.data?.error || "Failed to load book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleDelete = useCallback(async () => {
    try {
      if (!id) return;

      await bookService.delete(id);
      navigate("/books");
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to delete book");
    }
  }, [id, navigate]);

  const toggleDeleteConfirm = () => {
    setDeleteConfirm((prev) => !prev);
  };

  const statusBadge = book?.status ? STATUS_BADGE_MAP[book?.status] : null;

  return {
    book,
    loading,
    error,
    deleteConfirm,
    handleDelete,
    toggleDeleteConfirm,
    navigate,
    statusBadge,
  };
}
