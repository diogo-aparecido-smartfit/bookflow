import { authService } from "@/api/auth.service";
import { Link } from "react-router-dom";

export function Navbar() {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          BookFlow
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/books" className="hover:text-indigo-200">
            Books
          </Link>

          {isAuthenticated ? (
            <>
              <span className="text-indigo-200">Hi, {currentUser?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-indigo-700 px-3 py-1 rounded hover:bg-indigo-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-indigo-700 px-3 py-1 rounded hover:bg-indigo-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
