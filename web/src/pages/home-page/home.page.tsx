import { Link } from "react-router-dom";
import { BookCard } from "@/components/book-card/book-card.component";
import { useHome } from "./home.controller";

export function HomePage() {
  const { books, loading, error } = useHome();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          <h3 className="text-lg font-medium">Erro</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Biblioteca BookFlow
        </h1>
        <Link
          to="/books/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Adicionar novo livro
        </Link>
      </div>

      {books.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md">
          <h3 className="text-lg font-medium">Sem livros em estoque</h3>
          <p>
            Sua biblioteca está vazia. Adicione seu primeiro livro para começar!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
