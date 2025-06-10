import { useBookCreate } from "./book-create.controller";

export function BookCreatePage() {
  const { book, loading, error, handleChange, handleSubmit, handleCancel } =
    useBookCreate();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Adicionar Novo Livro
        </h1>

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Título *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={book.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Autor *
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                value={book.author}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={book.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="isbn"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ISBN
              </label>
              <input
                id="isbn"
                name="isbn"
                type="text"
                value={book.isbn}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="cover_url"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                URL da Capa
              </label>
              <input
                id="cover_url"
                name="cover_url"
                type="url"
                value={book.cover_url}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={book.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="available">Disponível</option>
                <option value="borrowed">Emprestado</option>
                <option value="lost">Perdido</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Criando..." : "Criar Livro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
