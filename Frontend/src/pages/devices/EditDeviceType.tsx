
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const EditDeviceType = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API using the id
  const [deviceType, setDeviceType] = useState({
    id: id,
    name: "ada2",
    description: "asdsadsadas",
    referenceCalibrator: "kütle seti",
    category: "Ölçü Aletleri",
    standards: "ISO 9001, TS EN ISO/IEC 17025"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    toast.success("Cihaz türü başarıyla güncellendi!");
    navigate("/cihaz-turu-listesi");
  };

  const handleInputChange = (field: string, value: string) => {
    setDeviceType(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cihaz Türü Düzenle</h1>
        <Button asChild variant="outline">
          <Link to="/cihaz-turu-listesi">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cihaz Türü Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Cihaz Türü Adı *</Label>
                <Input
                  id="name"
                  value={deviceType.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referenceCalibrator">Referans Kalibratör *</Label>
                <Input
                  id="referenceCalibrator"
                  value={deviceType.referenceCalibrator}
                  onChange={(e) => handleInputChange("referenceCalibrator", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  value={deviceType.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="standards">Standartlar</Label>
                <Input
                  id="standards"
                  value={deviceType.standards}
                  onChange={(e) => handleInputChange("standards", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama *</Label>
              <Textarea
                id="description"
                value={deviceType.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Güncelle
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/cihaz-turu-listesi")}>
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditDeviceType;
