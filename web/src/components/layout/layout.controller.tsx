import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/api/auth.service";

export function useLayout() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = authService.getCurrentUser();
  const isAuthenticated = authService.isAuthenticated();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return {
    user,
    isAuthenticated,
    isMenuOpen,
    toggleMenu,
    closeMenu,
    handleLogout,
  };
}
