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

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Componente para rotas públicas (só acessíveis se NÃO estiver autenticado)
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
          {/* Rotas públicas */}
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

          {/* Rotas protegidas */}
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
                <div className="container mx-auto p-4">
                  <h1>Add New Book</h1>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="container mx-auto p-4">
                  <h1>User Profile</h1>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Rota 404 - redireciona para login se não autenticado ou para home se autenticado */}
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
