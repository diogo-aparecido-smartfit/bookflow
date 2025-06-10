import type { Book } from "@/types/models";
import { Link } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const getStatusBadge = () => {
    switch (book.status) {
      case "available":
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            Available
          </span>
        );
      case "borrowed":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Borrowed
          </span>
        );
      case "lost":
        return (
          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
            Lost
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-40 bg-gray-200">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Cover
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{book.title}</h3>
          {getStatusBadge()}
        </div>

        <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {book.description || "No description available."}
        </p>

        <Link
          to={`/books/${book.id}`}
          className="text-indigo-600 text-sm font-medium hover:text-indigo-800"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
