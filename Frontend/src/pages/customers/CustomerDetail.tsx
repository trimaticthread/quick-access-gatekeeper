
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash } from "lucide-react";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API using the id
  const customer = {
    id: id,
    name: "ABC Teknoloji Ltd. Şti.",
    type: "corporate" as const,
    taxNumber: "1234567890",
    phone: "0212 123 45 67",
    email: "info@abcteknoloji.com",
    status: "active" as const,
    address: "İstanbul, Türkiye",
    createdDate: "15.01.2024"
  };

  if (!customer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Müşteri Bulunamadı</h1>
          <Button asChild variant="outline">
            <Link to="/musteri-listesi">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Müşteri Detayları</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to={`/musteri-duzenle/${id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/musteri-listesi">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{customer.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Müşteri Tipi</label>
              <p className="text-sm">{customer.type === "corporate" ? "Kurumsal" : "Bireysel"}</p>
            </div>
            
            {customer.taxNumber && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Vergi No</label>
                <p className="text-sm">{customer.taxNumber}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Telefon</label>
              <p className="text-sm">{customer.phone}</p>
            </div>
            
            {customer.email && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">E-posta</label>
                <p className="text-sm">{customer.email}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Durum</label>
              <p className="text-sm">
                <span className={`status ${customer.status}`}>
                  {customer.status === "active" ? "Aktif" : "Pasif"}
                </span>
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Kayıt Tarihi</label>
              <p className="text-sm">{customer.createdDate}</p>
            </div>
          </div>
          
          {customer.address && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Adres</label>
              <p className="text-sm">{customer.address}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetail;
