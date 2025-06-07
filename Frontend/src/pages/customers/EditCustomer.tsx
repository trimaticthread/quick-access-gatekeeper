import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API using the id
  const [customer, setCustomer] = useState({
    id: id,
    name: "ABC Teknoloji Ltd. Şti.",
    type: "corporate" as "corporate" | "individual",
    taxNumber: "1234567890",
    phone: "0212 123 45 67",
    email: "info@abcteknoloji.com",
    status: "active" as "active" | "inactive",
    address: "İstanbul, Türkiye"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    toast.success("Müşteri başarıyla güncellendi!");
    navigate("/musteri-listesi");
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Müşteri Düzenle</h1>
        <Button asChild variant="outline">
          <Link to="/musteri-listesi">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Müşteri Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Müşteri Adı *</Label>
                <Input
                  id="name"
                  value={customer.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Müşteri Tipi *</Label>
                <Select value={customer.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Kurumsal</SelectItem>
                    <SelectItem value="individual">Bireysel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {customer.type === "corporate" && (
                <div className="space-y-2">
                  <Label htmlFor="taxNumber">Vergi No</Label>
                  <Input
                    id="taxNumber"
                    value={customer.taxNumber}
                    onChange={(e) => handleInputChange("taxNumber", e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="phone">Telefon *</Label>
                <Input
                  id="phone"
                  value={customer.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Durum *</Label>
                <Select value={customer.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Pasif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adres</Label>
              <Input
                id="address"
                value={customer.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Güncelle
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/musteri-listesi")}>
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCustomer;
