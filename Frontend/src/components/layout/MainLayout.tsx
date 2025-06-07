
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

/**
 * Ana Düzen Bileşeni
 * 
 * Bu bileşen, uygulamanın temel düzenini oluşturur:
 * - Kenar çubuğu (sidebar)
 * - Başlık (header)
 * - Ana içerik alanı
 * - Alt bilgi (footer)
 */
const MainLayout = () => {
  // Kenar çubuğunun açık/kapalı durumunu tutan state
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Kullanıcı tercihini localStorage'dan alalım (varsayılan: true/açık)
    const savedState = localStorage.getItem('sidebarOpen');
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  // Kenar çubuğu durumu değiştiğinde localStorage'a kaydedelim
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  // Kenar çubuğunu açma/kapama fonksiyonu
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      {/* Kenar Çubuğu */}
      <Sidebar open={sidebarOpen} />
      
      {/* Ana İçerik Alanı */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
        {/* Başlık */}
        <Header 
          toggleSidebar={toggleSidebar} 
          sidebarOpen={sidebarOpen}
        />
        
        {/* Sayfa İçeriği */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Alt Bilgi */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
