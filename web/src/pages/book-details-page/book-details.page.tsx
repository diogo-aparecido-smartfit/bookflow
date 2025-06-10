import { Link } from "react-router-dom";
import { useBookDetail } from "./book-details.controller";

export function BookDetailPage() {
  const {
    book,
    loading,
    error,
    deleteConfirm,
    handleDelete,
    toggleDeleteConfirm,
    navigate,
    statusBadge,
  } = useBookDetail();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-50 text-red-800 p-4 rounded-md">
          <h3 className="text-lg font-medium">Erro</h3>
          <p>{error}</p>
          <button
            onClick={() => navigate("/books")}
            className="mt-3 text-red-600 hover:text-red-800"
          >
            Voltar para Livros
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md">
          <h3 className="text-lg font-medium">Livro não encontrado</h3>
          <p>O livro que você está procurando não existe ou foi removido.</p>
          <button
            onClick={() => navigate("/books")}
            className="mt-3 text-yellow-600 hover:text-yellow-800"
          >
            Voltar para Livros
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-200">
            {book.cover_url ? (
              <img
                src={book.cover_url}
                alt={`Capa de ${book.title}`}
                className="w-full h-full object-cover min-h-[300px]"
              />
            ) : (
              <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gray-100 text-gray-400">
                Sem capa disponível
              </div>
            )}
          </div>

          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {book.title}
              </h1>
              {statusBadge && (
                <span
                  className={`text-sm px-2 py-1 rounded ${statusBadge.className}`}
                >
                  {statusBadge.text === "Available"
                    ? "Disponível"
                    : statusBadge.text === "Borrowed"
                    ? "Emprestado"
                    : "Perdido"}
                </span>
              )}
            </div>

            <p className="text-gray-600 text-lg mb-4">por {book.author}</p>

            {book.isbn && (
              <p className="text-gray-500 mb-4">ISBN: {book.isbn}</p>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Descrição
              </h3>
              <p className="text-gray-600 whitespace-pre-line">
                {book.description || "Nenhuma descrição disponível."}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={`/books/${book.id}/edit`}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Editar Livro
              </Link>

              {!deleteConfirm ? (
                <button
                  onClick={toggleDeleteConfirm}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Excluir Livro
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Confirmar Exclusão
                  </button>
                  <button
                    onClick={toggleDeleteConfirm}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                </div>
              )}

              <Link
                to="/books"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Voltar para Livros
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
