
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  PieChart,
  Wallet,
  Calendar,
  Settings,
  Mail,
  LogOut,
  Moon,
  Sun,
  FilePlus,
  FileText,
  Plus,
  List,
  BarChart,
  User,
  FileSpreadsheet,
  LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (!user) {
    return null;
  }

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-sidebar border-r border-sidebar-border ${
        open ? "w-64" : "w-16"
      }`}
    >
      <div className="h-full flex flex-col text-sidebar-foreground">
        {/* Sidebar Header - User info */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-primary/10 text-primary">
              <span className="font-medium">{user.fullName?.charAt(0) || user.username.charAt(0) || "U"}</span>
            </Avatar>
            
            <div className={`flex flex-col ${!open && "hidden"}`}>
              <h3 className="font-medium">{user.fullName || user.username || "Kullanıcı"}</h3>
              <span className="text-xs text-sidebar-foreground/70">{user.role}</span>
            </div>
          </div>
        </div>

        {/* Navigation sections */}
        <div className="flex-1 py-5 px-3 space-y-8 overflow-y-auto">
          {/* Müşteri İşlemleri */}
          <div>
            <h3 className={`text-xs font-medium px-3 mb-3 ${!open && "hidden"}`}>
              Müşteri İşlemleri
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/musteri-ekle"
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? "active" : ""} ${!open ? "justify-center px-0" : ""}`
                  }
                >
                  <Plus className="h-5 w-5 min-w-[20px]" />
                  <span className={!open ? "hidden" : ""}>Yeni Müşteri Ekle</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/musteri-listesi"
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? "active" : ""} ${!open ? "justify-center px-0" : ""}`
                  }
                >
                  <List className="h-5 w-5 min-w-[20px]" />
                  <span className={!open ? "hidden" : ""}>Müşteri Listesi</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/turkak-son-musteriler"
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? "active" : ""} ${!open ? "justify-center px-0" : ""}`
                  }
                >
                  <Calendar className="h-5 w-5 min-w-[20px]" />
                  <span className={!open ? "hidden" : ""}>TürkAK Son Müşteriler</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Sertifika İşlemleri */}
          <div>
            <h3 className={`text-xs font-medium px-3 mb-3 ${!open && "hidden"}`}>
              Sertifika İşlemleri
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/yeni-sertifika-ekle"
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? "active" : ""} ${!open ? "justify-center px-0" : ""}`
                  }
                >
                  <FilePlus className="h-5 w-5 min-w-[20px]" />
                  <span className={!open ? "hidden" : ""}>Yeni Sertifika Ekle</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/tum-sertifikalar"
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? "active" : ""} ${!open ? "justify-center px-0" : ""}`
                  }
                >
                  <FileText className="h-5 w-5 min-w-[20px]" />
                  <span className={!open ? "hidden" : ""}>Tüm Sertifikalar</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Referans Cihaz İşlemleri */}
          <div>
            <h3 className={`text-xs font-medium px-3 mb-3 ${!open && "hidden"}`}>
              Referans Cihaz İşlemleri
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/yeni-referans-cihaz-ekle"
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? "active" : ""} ${!open ? "justify-center px-0" : ""}`
                  }
                >
                  <Plus className="h-5 w-5 min-w-[20px]" />
                  <span className={!open ? "hidden" : ""}>Yeni Referans Cihaz Ekle</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/referans-cihaz-listesi"
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? "active" : ""} ${!open ? "justify-center px-0" : ""}`
                  }
                >
                  <List className="h-5 w-5 min-w-[20px]" />
                  <span className={!open ? "hidden" : ""}>Referans Cihaz Listesi</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Cihaz İşlemleri */}
          <div>
            <h3 className={`text-xs font-medium px-3 mb-3 ${!open && "hidden"}`}>
              Cihaz İşlemleri
            </h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/yeni-cihaz-turu-ekle"
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? "active" : ""} ${!open ? "justify-center px-0" : ""}`
                  }
                >
                  <Plus className="h-5 w-5 min-w-[20px]" />
                  <span className={!open ? "hidden" : ""}>Yeni Cihaz Türü Ekle</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cihaz-turu-listesi"
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? "active" : ""} ${!open ? "justify-center px-0" : ""}`
                  }
                >
                  <List className="h-5 w-5 min-w-[20px]" />
                  <span className={!open ? "hidden" : ""}>Cihaz Türü Listesi</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 mr-2" />
            ) : (
              <Moon className="h-5 w-5 mr-2" />
            )}
            <span className={!open ? "hidden" : ""}>Tema Değiştir</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => logout()}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span className={!open ? "hidden" : ""}>Çıkış Yap</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
