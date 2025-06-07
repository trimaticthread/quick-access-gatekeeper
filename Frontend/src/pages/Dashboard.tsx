
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { Award, Users, FileText, Settings, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { notifications } = useNotifications();

  // Mock data for dashboard
  const stats = {
    customerCount: 24,
    certificateCount: 87,
    deviceCount: 16,
    referenceDeviceCount: 9,
  };

  const recentCustomers = [
    { id: "1", name: "ABC Ltd.", date: "2025-05-20" },
    { id: "2", name: "XYZ Technology", date: "2025-05-18" },
    { id: "3", name: "MNO Industries", date: "2025-05-15" },
  ];

  const recentCertificates = [
    { id: "C001", customerName: "ABC Ltd.", deviceType: "Multimetre", date: "2025-05-20" },
    { id: "C002", customerName: "XYZ Technology", deviceType: "Basınç Sensörü", date: "2025-05-18" },
    { id: "C003", customerName: "MNO Industries", deviceType: "Sıcaklık Probu", date: "2025-05-15" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Hoş Geldiniz, {user?.fullName}</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Toplam Müşteri</p>
              <p className="text-3xl font-bold">{stats.customerCount}</p>
            </div>
            <div className="rounded-full p-3 bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Toplam Sertifika</p>
              <p className="text-3xl font-bold">{stats.certificateCount}</p>
            </div>
            <div className="rounded-full p-3 bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cihaz Türleri</p>
              <p className="text-3xl font-bold">{stats.deviceCount}</p>
            </div>
            <div className="rounded-full p-3 bg-primary/10">
              <Settings className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Referans Cihazlar</p>
              <p className="text-3xl font-bold">{stats.referenceDeviceCount}</p>
            </div>
            <div className="rounded-full p-3 bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Kalibrasyon Uyarıları
            </CardTitle>
            <CardDescription>
              Kalibrasyon süresi yaklaşan cihazlar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <ul className="space-y-3">
                {notifications.map((notification) => (
                  <li key={notification.id} className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                    <p className="font-medium">{notification.deviceName}</p>
                    <p className="text-sm text-muted-foreground">
                      {notification.message} ({notification.daysLeft} gün kaldı)
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center py-6 text-muted-foreground">
                Kalibrasyon uyarısı bulunmamaktadır.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <div className="space-y-6">
          {/* Recent Customers */}
          <Card>
            <CardHeader>
              <CardTitle>Son Eklenen Müşteriler</CardTitle>
              <CardDescription>
                Son 7 gün içinde eklenen müşteriler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recentCustomers.map((customer) => (
                  <li key={customer.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                    <span>{customer.name}</span>
                    <span className="text-sm text-muted-foreground">{customer.date}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <Link to="/musteri-listesi" className="text-sm text-primary hover:underline">
                  Tüm müşterileri görüntüle
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Certificates */}
          <Card>
            <CardHeader>
              <CardTitle>Son Sertifikalar</CardTitle>
              <CardDescription>
                Son oluşturulan kalibrasyon sertifikaları
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recentCertificates.map((cert) => (
                  <li key={cert.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                    <div>
                      <p>{cert.customerName}</p>
                      <p className="text-sm text-muted-foreground">{cert.deviceType}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{cert.date}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right">
                <Link to="/tum-sertifikalar" className="text-sm text-primary hover:underline">
                  Tüm sertifikaları görüntüle
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
