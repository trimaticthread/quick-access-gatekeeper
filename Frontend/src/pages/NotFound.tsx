
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Log error to console for debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      window.location.pathname
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold mt-4 mb-6">Oops! Sayfa Bulunamadı</p>
        <p className="text-muted-foreground mb-8 max-w-md">
          Aradığınız sayfa mevcut değil veya başka bir hatadan dolayı erişilemiyor.
        </p>
        <Button 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Ana Sayfaya Dön
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
