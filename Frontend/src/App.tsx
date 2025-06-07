import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";

// Ana Sayfa ve Ana Bileşenler
import Dashboard from "./pages/Dashboard";
import Login from "./pages/account/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";

// Account (Hesap) Bileşenleri
import TurkAkSettings from "./pages/auth/TurkAkSettings";
import UserManagement from "./pages/account/UserManagement";
import AddUser from "./pages/account/AddUser";
import EditUser from "./pages/account/EditUser";
import ProfileEdit from "./pages/account/ProfileEdit";

// Certificate (Sertifika) Bileşenleri
import AllCertificates from "./pages/certificates/AllCertificates";
import AddCertificate from "./pages/certificates/AddCertificate";
import CertificateDetail from "./pages/certificates/CertificateDetail";
import EditCertificate from "./pages/certificates/EditCertificate";
import DeleteCertificate from "./pages/certificates/DeleteCertificate";

// Customer (Müşteri) Bileşenleri
import CustomerList from "./pages/customers/CustomerList";
import AddCustomer from "./pages/customers/AddCustomer";
import CustomerDetail from "./pages/customers/CustomerDetail";
import EditCustomer from "./pages/customers/EditCustomer";
import DeleteCustomer from "./pages/customers/DeleteCustomer";
import RecentTurkAkCustomers from "./pages/customers/RecentTurkAkCustomers";

// Device (Cihaz) Bileşenleri
import DeviceTypeList from "./pages/devices/DeviceTypeList";
import AddDeviceType from "./pages/devices/AddDeviceType";
import EditDeviceType from "./pages/devices/EditDeviceType";
import DeleteDeviceType from "./pages/devices/DeleteDeviceType";
import ReferenceDeviceList from "./pages/devices/ReferenceDeviceList";
import AddReferenceDevice from "./pages/devices/AddReferenceDevice";
import EditReferenceDevice from "./pages/devices/EditReferenceDevice";
import DeleteReferenceDevice from "./pages/devices/DeleteReferenceDevice";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Giriş Sayfası - Ana sayfa olarak ayarlandı */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                
                {/* Korumalı Rotalar */}
                <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                  {/* Dashboard - Ana sayfa */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  
                  {/* Account (Hesap) Rotaları */}
                  <Route path="/kullanici-yonetimi" element={<UserManagement />} />
                  <Route path="/yeni-kullanici-ekle" element={<AddUser />} />
                  <Route path="/edit-user/:id" element={<EditUser />} />
                  <Route path="/turkak-ayarlari" element={<TurkAkSettings />} />
                  <Route path="/profil-duzenle" element={<ProfileEdit />} />
                  
                  {/* Customer (Müşteri) Rotaları */}
                  <Route path="/musteri-ekle" element={<AddCustomer />} />
                  <Route path="/musteri-listesi" element={<CustomerList />} />
                  <Route path="/musteri-detay/:id" element={<CustomerDetail />} />
                  <Route path="/musteri-duzenle/:id" element={<EditCustomer />} />
                  <Route path="/musteri-sil/:id" element={<DeleteCustomer />} />
                  <Route path="/turkak-son-musteriler" element={<RecentTurkAkCustomers />} />
                  
                  {/* Certificate (Sertifika) Rotaları */}
                  <Route path="/tum-sertifikalar" element={<AllCertificates />} />
                  <Route path="/sertifika-detay/:id" element={<CertificateDetail />} />
                  <Route path="/sertifika-duzenle/:id" element={<EditCertificate />} />
                  <Route path="/sertifika-sil/:id" element={<DeleteCertificate />} />
                  <Route path="/yeni-sertifika-ekle" element={<AddCertificate />} />
                  
                  {/* Device (Cihaz) Rotaları */}
                  <Route path="/cihaz-turu-listesi" element={<DeviceTypeList />} />
                  <Route path="/cihaz-turu-duzenle/:id" element={<EditDeviceType />} />
                  <Route path="/cihaz-turu-sil/:id" element={<DeleteDeviceType />} />
                  <Route path="/yeni-cihaz-turu-ekle" element={<AddDeviceType />} />
                  <Route path="/referans-cihaz-listesi" element={<ReferenceDeviceList />} />
                  <Route path="/referans-cihaz-duzenle/:id" element={<EditReferenceDevice />} />
                  <Route path="/referans-cihaz-sil/:id" element={<DeleteReferenceDevice />} />
                  <Route path="/yeni-referans-cihaz-ekle" element={<AddReferenceDevice />} />
                </Route>
                
                {/* 404 Sayfası */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
