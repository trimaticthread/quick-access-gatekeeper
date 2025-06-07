
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart3, Users, FileText, Settings, Plus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ardalar Kalibrasyon Yönetim Sistemi
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Kalibrasyon süreçlerinizi kolayca yönetin ve takip edin
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link to="/dashboard">
              Sisteme Giriş Yap
            </Link>
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Genel istatistikler ve önemli metrikleri görüntüleyin
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Müşteri Yönetimi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Müşteri bilgilerini yönetin ve takip edin
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Sertifika Yönetimi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Kalibrasyon sertifikalarını oluşturun ve yönetin
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Settings className="h-12 w-12 text-orange-600 mx-auto mb-2" />
              <CardTitle>Cihaz Yönetimi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Cihaz türlerini ve referans cihazları yönetin
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Hızlı İşlemler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="h-16">
              <Link to="/yeni-musteri-ekle" className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Yeni Müşteri Ekle
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-16">
              <Link to="/yeni-sertifika-ekle" className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Yeni Sertifika Ekle
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-16">
              <Link to="/yeni-cihaz-turu-ekle" className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Yeni Cihaz Türü Ekle
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
