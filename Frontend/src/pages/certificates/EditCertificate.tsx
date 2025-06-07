import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const EditCertificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API using the id
  const [certificate, setCertificate] = useState({
    id: id,
    tbdsNo: "TBDS-2024-001234",
    certificateNo: "KAL-2024-ABC-001",
    customerId: "C001",
    customerName: "ABC Teknoloji Ltd. Şti.",
    state: "Onaylı" as "Onaylı" | "Taslak",
    issueDate: "2024-03-15",
    validityDate: "2025-03-15",
    deviceInfo: "Hassas Terazi - Model: XYZ-2000",
    calibrationResults: "Tüm ölçümler tolerans değerleri içerisinde",
    notes: "Kalibrasyon başarıyla tamamlanmıştır."
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    toast.success("Sertifika başarıyla güncellendi!");
    navigate("/tum-sertifikalar");
  };

  const handleInputChange = (field: string, value: string) => {
    setCertificate(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sertifika Düzenle</h1>
        <Button asChild variant="outline">
          <Link to="/tum-sertifikalar">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri Dön
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sertifika Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tbdsNo">TBDS No *</Label>
                <Input
                  id="tbdsNo"
                  value={certificate.tbdsNo}
                  onChange={(e) => handleInputChange("tbdsNo", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="certificateNo">Sertifika No *</Label>
                <Input
                  id="certificateNo"
                  value={certificate.certificateNo}
                  onChange={(e) => handleInputChange("certificateNo", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerId">Müşteri ID *</Label>
                <Input
                  id="customerId"
                  value={certificate.customerId}
                  onChange={(e) => handleInputChange("customerId", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerName">Müşteri Adı *</Label>
                <Input
                  id="customerName"
                  value={certificate.customerName}
                  onChange={(e) => handleInputChange("customerName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Durum *</Label>
                <Select value={certificate.state} onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Taslak">Taslak</SelectItem>
                    <SelectItem value="Onaylı">Onaylı</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueDate">Düzenleme Tarihi *</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={certificate.issueDate}
                  onChange={(e) => handleInputChange("issueDate", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="validityDate">Geçerlilik Tarihi *</Label>
                <Input
                  id="validityDate"
                  type="date"
                  value={certificate.validityDate}
                  onChange={(e) => handleInputChange("validityDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deviceInfo">Cihaz Bilgileri *</Label>
              <Input
                id="deviceInfo"
                value={certificate.deviceInfo}
                onChange={(e) => handleInputChange("deviceInfo", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calibrationResults">Kalibrasyon Sonuçları *</Label>
              <Textarea
                id="calibrationResults"
                value={certificate.calibrationResults}
                onChange={(e) => handleInputChange("calibrationResults", e.target.value)}
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notlar</Label>
              <Textarea
                id="notes"
                value={certificate.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Güncelle
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/tum-sertifikalar")}>
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCertificate;
