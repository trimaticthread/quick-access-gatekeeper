import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trash, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const DeleteReferenceDevice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API using the id
  const device = {
    id: id,
    name: "kütle seti",
    serialNumber: "32131213",
    type: "B TİPİ",
    status: "active" as const,
    lastCalibrationDate: "20.03.2025",
    nextCalibrationDate: "30.03.2025"
  };

  const handleDelete = () => {
    // Here you would typically send a delete request to your API
    toast.success("Referans cihaz başarıyla silindi!");
    navigate("/referans-cihaz-listesi");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Referans Cihaz Sil</h1>
        <Button asChild variant="outline">
          <Link to="/referans-cihaz-listesi">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Referans Cihazı Sil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium mb-2">
              Uyarı: Bu işlem geri alınamaz!
            </p>
            <p className="text-sm text-muted-foreground">
              Bu referans cihazı sildiğinizde, cihaza ait tüm veriler kalıcı olarak silinecektir.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Silinecek Referans Cihaz Bilgileri:</h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p><strong>Cihaz Adı:</strong> {device.name}</p>
              <p><strong>Seri No:</strong> {device.serialNumber}</p>
              <p><strong>Tip:</strong> {device.type}</p>
              <p><strong>Durum:</strong> {device.status === "active" ? "Aktif" : "Pasif"}</p>
              <p><strong>Son Kalibrasyon:</strong> {device.lastCalibrationDate}</p>
              <p><strong>Sonraki Kalibrasyon:</strong> {device.nextCalibrationDate}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash className="h-4 w-4" />
              Referans Cihazı Sil
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/referans-cihaz-listesi")}
            >
              İptal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeleteReferenceDevice;
