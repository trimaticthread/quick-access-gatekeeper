import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trash, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const DeleteCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API using the id
  const customer = {
    id: id,
    name: "ABC Teknoloji Ltd. Şti.",
    type: "corporate" as const,
    taxNumber: "1234567890",
    phone: "0212 123 45 67",
    email: "info@abcteknoloji.com"
  };

  const handleDelete = () => {
    // Here you would typically send a delete request to your API
    toast.success("Müşteri başarıyla silindi!");
    navigate("/musteri-listesi");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Müşteri Sil</h1>
        <Button asChild variant="outline">
          <Link to="/musteri-listesi">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Müşteriyi Sil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium mb-2">
              Uyarı: Bu işlem geri alınamaz!
            </p>
            <p className="text-sm text-muted-foreground">
              Bu müşteriyi sildiğinizde, müşteriye ait tüm veriler kalıcı olarak silinecektir.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Silinecek Müşteri Bilgileri:</h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p><strong>Ad:</strong> {customer.name}</p>
              <p><strong>Tip:</strong> {customer.type === "corporate" ? "Kurumsal" : "Bireysel"}</p>
              {customer.taxNumber && <p><strong>Vergi No:</strong> {customer.taxNumber}</p>}
              <p><strong>Telefon:</strong> {customer.phone}</p>
              {customer.email && <p><strong>E-posta:</strong> {customer.email}</p>}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash className="h-4 w-4" />
              Müşteriyi Sil
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/musteri-listesi")}
            >
              İptal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteCustomer;
