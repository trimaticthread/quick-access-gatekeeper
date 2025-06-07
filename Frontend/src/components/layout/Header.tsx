import { Bell, Home, ChevronDown, Menu, Database, UserCog } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header = ({ toggleSidebar, sidebarOpen }: HeaderProps) => {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "Referans cihaz kalibrasyonu yaklaşıyor: Kütle seti" },
    { id: 2, message: "Müşteri sertifikası onay bekliyor" },
    { id: 3, message: "Sistem güncellemesi mevcut" }
  ]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showDropdown) setShowDropdown(false);
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:block"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Anasayfa</span>
            </Link>

            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="flex items-center justify-center text-foreground hover:text-primary transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{notifications.length}</span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute top-full left-0 mt-1 w-72 md:w-80 bg-popover rounded-md border border-border shadow-md z-50 overflow-hidden">
                  <div className="p-2 border-b border-border">
                    <h3 className="font-medium text-sm">Bildirimler</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <ul>
                        {notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className="p-3 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
                          >
                            <p className="text-sm">{notification.message}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        Bildirim bulunmadı
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Profil Düzenle Butonu */}
          <Link
            to="/profil-duzenle"
            className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
          >
            <UserCog className="h-5 w-5" />
            <span className="font-medium">Profil Düzenle</span>
          </Link>

          {user?.role === "yetkili" && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
              >
                <Database className="h-5 w-5" />
                <span className="font-medium">Panel</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showDropdown && (
                <div className="absolute top-full right-0 mt-1 w-60 bg-popover rounded-md border border-border shadow-md z-50 overflow-hidden">
                  <div className="py-2">
                    <Link
                      to="/kullanici-yonetimi"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span>Kullanıcı Yönetimi</span>
                    </Link>
                    <Link
                      to="/turkak-ayarlari"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <span>TÜRKAK Ayarları</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
