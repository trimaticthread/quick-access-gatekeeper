import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trash, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const DeleteCertificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API using the id
  const certificate = {
    id: id,
    tbdsNo: "TBDS-2024-001",
    certificateNo: "KS-2024-ABC-001",
    customerId: "1",
    customerName: "ABC Teknoloji Ltd. Şti.",
    state: "Onaylı" as const
  };

  const handleDelete = () => {
    // Here you would typically send a delete request to your API
    toast.success("Sertifika başarıyla silindi!");
    navigate("/tum-sertifikalar");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sertifika Sil</h1>
        <Button asChild variant="outline">
          <Link to="/tum-sertifikalar">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Sertifikayı Sil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium mb-2">
              Uyarı: Bu işlem geri alınamaz!
            </p>
            <p className="text-sm text-muted-foreground">
              Bu sertifikayı sildiğinizde, sertifikaya ait tüm veriler kalıcı olarak silinecektir.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Silinecek Sertifika Bilgileri:</h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p><strong>TBDS No:</strong> {certificate.tbdsNo}</p>
              <p><strong>Sertifika No:</strong> {certificate.certificateNo}</p>
              <p><strong>Müşteri ID:</strong> {certificate.customerId}</p>
              <p><strong>Müşteri Adı:</strong> {certificate.customerName}</p>
              <p><strong>Durum:</strong> {certificate.state}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash className="h-4 w-4" />
              Sertifikayı Sil
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/tum-sertifikalar")}
            >
              İptal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteCertificate;
