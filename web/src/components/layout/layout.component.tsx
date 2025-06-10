import { Navbar } from "../navbar/navbar.component";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow">{children}</main>

      <footer className="bg-white border-t border-gray-300 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} BookFlow - A Simple Book Management
          System
        </div>
      </footer>
    </div>
  );
}
