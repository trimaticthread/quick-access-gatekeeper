
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Download, QrCode } from "lucide-react";

const CertificateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch from API using the id
  const certificate = {
    id: id,
    tbdsNo: "TBDS-2024-001234",
    certificateNo: "KAL-2024-ABC-001",
    customerId: "C001",
    customerName: "ABC Teknoloji Ltd. Şti.",
    state: "Onaylı" as const,
    issueDate: "15.03.2024",
    validityDate: "15.03.2025",
    deviceInfo: "Hassas Terazi - Model: XYZ-2000",
    calibrationResults: "Tüm ölçümler tolerans değerleri içerisinde",
    notes: "Kalibrasyon başarıyla tamamlanmıştır."
  };

  if (!certificate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Sertifika Bulunamadı</h1>
          <Button asChild variant="outline">
            <Link to="/tum-sertifikalar">
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
        <h1 className="text-2xl font-bold">Sertifika Detayları</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to={`/sertifika-duzenle/${id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/tum-sertifikalar">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{certificate.certificateNo}</span>
            <span className={`status ${certificate.state.toLowerCase()}`}>
              {certificate.state}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">TBDS No</label>
              <p className="text-sm font-mono">{certificate.tbdsNo}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Sertifika No</label>
              <p className="text-sm font-mono">{certificate.certificateNo}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Müşteri ID</label>
              <p className="text-sm font-mono">{certificate.customerId}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Müşteri Adı</label>
              <p className="text-sm">{certificate.customerName}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Düzenleme Tarihi</label>
              <p className="text-sm">{certificate.issueDate}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Geçerlilik Tarihi</label>
              <p className="text-sm">{certificate.validityDate}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Cihaz Bilgileri</label>
            <p className="text-sm">{certificate.deviceInfo}</p>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">Kalibrasyon Sonuçları</label>
            <p className="text-sm">{certificate.calibrationResults}</p>
          </div>
          
          {certificate.notes && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">Notlar</label>
              <p className="text-sm">{certificate.notes}</p>
            </div>
          )}

          {certificate.state === "Onaylı" && (
            <div className="flex gap-2 pt-4 border-t">
              <Button className="flex items-center gap-2 bg-green-500 hover:bg-green-600">
                <Download className="h-4 w-4" />
                PDF İndir
              </Button>
              <Button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600">
                <QrCode className="h-4 w-4" />
                QR Kod Oluştur
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateDetail;
