import type { Book } from "@/types/models";
import { Link } from "react-router-dom";
import { useBookCard } from "./book-card.controller";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { statusBadge } = useBookCard(book);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-60 max-h-60 bg-gray-200">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={`Capa de ${book.title}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            Sem Capa
          </div>
        )}
      </div>

      <div className="flex flex-col h-full p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{book.title}</h3>
          {statusBadge && (
            <span className={statusBadge.className}>{statusBadge.text}</span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3">por {book.author}</p>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {book.description || "Nenhuma descrição disponível."}
        </p>

        <Link
          to={`/books/${book.id}`}
          className="text-indigo-600 text-sm font-medium hover:text-indigo-800 mt-auto"
        >
          Ver Detalhes →
        </Link>
      </div>
    </div>
  );
}
