import { useParams, Link, useNavigate } from "react-router-dom";
import { useEditBook } from "./edit-book.controller";

export function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const {
    book,
    formData,
    isLoading,
    errorMessage,
    handleInputChange,
    handleSubmit,
  } = useEditBook(id as string);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (!book && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          <h3 className="text-lg font-medium">Livro não encontrado</h3>
          <p>O livro que você está tentando editar não existe.</p>
        </div>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Editar Livro</h1>
        <Link
          to={`/books/${id}`}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </Link>
      </div>

      {errorMessage && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          <p>{errorMessage}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-gray-700 font-medium mb-2"
            >
              Autor
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="isbn"
              className="block text-gray-700 font-medium mb-2"
            >
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="cover_url"
              className="block text-gray-700 font-medium mb-2"
            >
              URL da Capa
            </label>
            <input
              type="url"
              id="cover_url"
              name="cover_url"
              value={formData.cover_url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-gray-700 font-medium mb-2"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="available">Disponível</option>
              <option value="borrowed">Emprestado</option>
              <option value="lost">Perdido</option>
            </select>
          </div>

          <div className="col-span-2">
            {formData.cover_url && (
              <div className="mt-4">
                <p className="text-gray-700 font-medium mb-2">
                  Prévia da capa:
                </p>
                <img
                  src={formData.cover_url}
                  alt="Prévia da capa"
                  className="w-32 h-48 object-cover border border-gray-300 rounded-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder-book.png";
                    (e.target as HTMLImageElement).onerror = null;
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/books/${id}`)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
