import { Link } from "react-router-dom";
import { useLayout } from "./layout.controller";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const {
    user,
    isAuthenticated,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    handleLogout,
  } = useLayout();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              BookFlow
            </Link>

            {isAuthenticated && (
              <div className="hidden md:flex space-x-6 items-center w-full justify-end">
                <span className="text-gray-800 ">Olá, {user?.name} 🔥</span>
                <Link to="/" className="text-gray-600 hover:text-indigo-600">
                  Início
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Sair
                </button>
              </div>
            )}

            {isAuthenticated && (
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            )}
          </div>

          {isAuthenticated && isMenuOpen && (
            <div className="md:hidden mt-4 space-y-3">
              <Link
                to="/"
                className="block text-gray-600 hover:text-indigo-600"
                onClick={closeMenu}
              >
                Início
              </Link>
              <Link
                to="/books"
                className="block text-gray-600 hover:text-indigo-600"
                onClick={closeMenu}
              >
                Meus Livros
              </Link>
              <Link
                to="/profile"
                className="block text-gray-600 hover:text-indigo-600"
                onClick={closeMenu}
              >
                Perfil
              </Link>
              <button
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                className="block text-gray-600 hover:text-indigo-600"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white py-6 border-t border-gray-300">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BookFlow. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
