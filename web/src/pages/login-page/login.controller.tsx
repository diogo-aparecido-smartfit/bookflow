import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "@/api/auth.service";
import type { LoginCredentials } from "@/types/models";

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate("/");
    }

    const justRegistered = new URLSearchParams(location.search).get(
      "registered"
    );
    if (justRegistered === "true") {
      setSuccess("Account created successfully! Please sign in.");
    }
  }, [navigate, location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await authService.login(credentials);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(
        error.response?.data?.error || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    credentials,
    error,
    success,
    loading,
    handleChange,
    handleSubmit,
  };
}
