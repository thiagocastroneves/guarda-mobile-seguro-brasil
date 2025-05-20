
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-blue mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Página não encontrada</p>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          A página que você está procurando pode ter sido removida ou está temporariamente indisponível.
        </p>
        <Button asChild>
          <Link to="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
