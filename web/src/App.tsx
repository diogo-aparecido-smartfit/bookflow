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
          {/* Rota de login só acessível se não estiver autenticado */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          {/* Rota de registro só acessível se não estiver autenticado */}
          <Route
            path="/register"
            element={
              <PublicRoute>
                <div className="container mx-auto p-4">
                  <h1>Register Page</h1>
                </div>
              </PublicRoute>
            }
          />

          {/* Rotas protegidas */}
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

          {/* Rota pública da página inicial */}
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<HomePage />} />

          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
