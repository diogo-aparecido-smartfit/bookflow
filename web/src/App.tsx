import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { authService } from "./api/auth.service";
import { Layout } from "./components/layout/layout.component";
import { HomePage } from "./pages/home-page/home.page";
import { LoginPage } from "./pages/login-page/login.page";
import { RegisterPage } from "./pages/register-page/register.page";
import { BookDetailPage } from "./pages/book-details-page/book-details.page";
import { BookCreatePage } from "./pages/book-create-page/book-create.page";
import { EditBookPage } from "./pages/edit-book-page/edit-book.page";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books/new"
            element={
              <ProtectedRoute>
                <BookCreatePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/books/:id"
            element={
              <ProtectedRoute>
                <BookDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/:id/edit"
            element={
              <ProtectedRoute>
                <EditBookPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              authService.isAuthenticated() ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
