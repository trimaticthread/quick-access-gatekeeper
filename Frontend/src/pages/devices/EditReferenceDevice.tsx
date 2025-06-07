
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const EditReferenceDevice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API using the id
  const [device, setDevice] = useState({
    id: id,
    name: "kütle seti",
    serialNumber: "32131213",
    type: "B TİPİ",
    status: "active" as "active" | "inactive",
    lastCalibrationDate: "2025-03-20",
    nextCalibrationDate: "2025-03-30",
    manufacturer: "ABC Üretici",
    model: "KS-2000",
    accuracy: "±0.001g"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    toast.success("Referans cihaz başarıyla güncellendi!");
    navigate("/referans-cihaz-listesi");
  };

  const handleInputChange = (field: string, value: string) => {
    setDevice(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Referans Cihaz Düzenle</h1>
        <Button asChild variant="outline">
          <Link to="/referans-cihaz-listesi">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Referans Cihaz Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Cihaz Adı *</Label>
                <Input
                  id="name"
                  value={device.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="serialNumber">Seri No *</Label>
                <Input
                  id="serialNumber"
                  value={device.serialNumber}
                  onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tip *</Label>
                <Input
                  id="type"
                  value={device.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Durum *</Label>
                <Select value={device.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Pasif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturer">Üretici</Label>
                <Input
                  id="manufacturer"
                  value={device.manufacturer}
                  onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={device.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accuracy">Doğruluk</Label>
                <Input
                  id="accuracy"
                  value={device.accuracy}
                  onChange={(e) => handleInputChange("accuracy", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastCalibrationDate">Son Kalibrasyon Tarihi *</Label>
                <Input
                  id="lastCalibrationDate"
                  type="date"
                  value={device.lastCalibrationDate}
                  onChange={(e) => handleInputChange("lastCalibrationDate", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextCalibrationDate">Sonraki Kalibrasyon Tarihi *</Label>
                <Input
                  id="nextCalibrationDate"
                  type="date"
                  value={device.nextCalibrationDate}
                  onChange={(e) => handleInputChange("nextCalibrationDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Güncelle
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/referans-cihaz-listesi")}>
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditReferenceDevice;
