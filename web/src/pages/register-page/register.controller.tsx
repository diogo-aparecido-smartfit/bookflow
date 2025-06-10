import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/api/auth.service";

interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export function useRegister() {
  const navigate = useNavigate();
  const [user, setUser] = useState<RegisterUser>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await authService.register(user);
      navigate("/login?registered=true");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    error,
    loading,
    handleChange,
    handleSubmit,
  };
}
