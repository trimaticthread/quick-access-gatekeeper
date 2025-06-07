import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Moon, Sun } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    if (!username || !password) {
      setErrors(["Kullanıcı adı ve şifre gereklidir."]);
      return;
    }

    setIsLoading(true);
    try {
      await login(username, password);
      toast.success("Giriş başarılı", {
        description: "Hoş geldiniz!",
      });
      navigate("/dashboard");
    } catch (error) {
      setErrors([(error as Error).message]);
      toast.error("Giriş başarısız", {
        description: "Kullanıcı adı veya şifre hatalı",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Theme Toggle Button - Moved to top right with better styling */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {theme === 'dark' ? 'Koyu' : 'Açık'} Tema
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"}
          className="rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-lg shadow-md">
        <div className="text-center flex flex-col items-center">
          <img 
            src="/lovable-uploads/6ef256e8-1574-4740-b582-6826c6975c1a.png" 
            alt="TURKAK Logo" 
            className="h-16 w-16 object-contain"
          />
          <h2 className="mt-4 text-3xl font-bold text-foreground">TURKAK Belge Doğrulama ve Takip Sistemi</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="block">Kullanıcı Adı</Label>
              <div className="mt-1">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Kullanıcı adınızı girin"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="block">Şifre</Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifrenizi girin"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3">
              <ul className="text-sm text-destructive list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            <p>Demo hesapları: admin/admin veya personel/personel</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
