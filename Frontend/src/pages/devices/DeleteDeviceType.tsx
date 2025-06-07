import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trash, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const DeleteDeviceType = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API using the id
  const deviceType = {
    id: id,
    name: "ada2",
    description: "asdsadsadas",
    referenceCalibrator: "kütle seti"
  };

  const handleDelete = () => {
    // Here you would typically send a delete request to your API
    toast.success("Cihaz türü başarıyla silindi!");
    navigate("/cihaz-turu-listesi");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cihaz Türü Sil</h1>
        <Button asChild variant="outline">
          <Link to="/cihaz-turu-listesi">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Cihaz Türünü Sil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium mb-2">
              Uyarı: Bu işlem geri alınamaz!
            </p>
            <p className="text-sm text-muted-foreground">
              Bu cihaz türünü sildiğinizde, cihaz türüne ait tüm veriler kalıcı olarak silinecektir.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Silinecek Cihaz Türü Bilgileri:</h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p><strong>Cihaz Türü:</strong> {deviceType.name}</p>
              <p><strong>Açıklama:</strong> {deviceType.description}</p>
              <p><strong>Referans Kalibratör:</strong> {deviceType.referenceCalibrator}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash className="h-4 w-4" />
              Cihaz Türünü Sil
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/cihaz-turu-listesi")}
            >
              İptal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteDeviceType;
