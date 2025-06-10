import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "@/types/models";
import { bookService } from "@/api/book.service";

export function useEditBook(bookId: string) {
  const [book, setBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({
    title: "",
    author: "",
    isbn: "",
    description: "",
    cover_url: "",
    status: "available",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBook() {
      try {
        setIsLoading(true);
        const bookData = await bookService.getById(bookId);
        setBook(bookData);
        setFormData({
          title: bookData.title,
          author: bookData.author,
          isbn: bookData.isbn || "",
          description: bookData.description || "",
          cover_url: bookData.cover_url || "",
          status: bookData.status,
        });
      } catch (error) {
        console.error("Error fetching book:", error);
        setErrorMessage(
          "Não foi possível carregar os dados do livro. Tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchBook();
  }, [bookId]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setErrorMessage("");

      if (!formData.title || !formData.author) {
        setErrorMessage("Título e autor são campos obrigatórios.");
        return;
      }

      await bookService.update(bookId, formData as Book);
      navigate(`/books/${bookId}`);
    } catch (error) {
      console.error("Error updating book:", error);
      setErrorMessage(
        "Erro ao salvar as alterações. Por favor, tente novamente."
      );
    }
  };

  return {
    book,
    formData,
    isLoading,
    errorMessage,
    handleInputChange,
    handleSubmit,
  };
}
