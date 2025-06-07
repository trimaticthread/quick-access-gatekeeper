
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, Edit, QrCode, FileText, Download, Mail, Printer, Trash } from "lucide-react";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Certificate } from "../types/certificate.types";

interface CertificateActionsProps {
  certificate: Certificate;
  onGenerateQR: (certificateId: string) => void;
}

const CertificateActions = ({ certificate, onGenerateQR }: CertificateActionsProps) => {
  const navigate = useNavigate();

  const handleViewCertificate = (certificateId: string) => {
    navigate(`/sertifika-detay/${certificateId}`);
    toast.success("Sertifika görüntüleniyor...");
  };

  const handleEditCertificate = (certificateId: string) => {
    navigate(`/sertifika-duzenle/${certificateId}`);
    toast.success("Sertifika düzenleniyor...");
  };

  const handleDeleteCertificate = (certificateId: string) => {
    navigate(`/sertifika-sil/${certificateId}`);
  };

  const handleDocumentAction = (certificateId: string, action: string) => {
    switch(action) {
      case 'download':
        toast.success("Belge indiriliyor...");
        window.open(`https://example.com/api/certificates/${certificateId}/download`, '_blank');
        break;
      case 'email':
        toast.success("Belge e-posta ile gönderildi!");
        break;
      case 'fax':
        toast.success("Belge faks ile gönderildi!");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {/* View button */}
      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-1 bg-cyan-500 hover:bg-cyan-600 text-white border-none"
        onClick={() => handleViewCertificate(certificate.id)}
      >
        <Eye className="h-3.5 w-3.5" />
        <span>Görüntüle</span>
      </Button>
      
      {/* Edit button */}
      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white border-none"
        onClick={() => handleEditCertificate(certificate.id)}
      >
        <Edit className="h-3.5 w-3.5" />
        <span>Düzenle</span>
      </Button>
      
      {/* Delete button */}
      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white border-none"
        onClick={() => handleDeleteCertificate(certificate.id)}
      >
        <Trash className="h-3.5 w-3.5" />
        <span>Sil</span>
      </Button>
      
      {/* QR Code button - only for approved certificates */}
      {certificate.state === "Onaylı" && (
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1 bg-purple-500 hover:bg-purple-600 text-white border-none"
          onClick={() => onGenerateQR(certificate.id)}
        >
          <QrCode className="h-3.5 w-3.5" />
          <span>QR Belge</span>
        </Button>
      )}
      
      {/* Document actions dropdown - only for approved certificates */}
      {certificate.state === "Onaylı" && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white border-none"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Belge Oluştur</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleDocumentAction(certificate.id, 'download')}>
              <Download className="h-4 w-4 mr-2" />
              <span>İndir</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDocumentAction(certificate.id, 'email')}>
              <Mail className="h-4 w-4 mr-2" />
              <span>E-posta Gönder</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDocumentAction(certificate.id, 'fax')}>
              <Printer className="h-4 w-4 mr-2" />
              <span>Faks Gönder</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default CertificateActions;
