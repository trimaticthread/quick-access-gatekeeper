
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CertificatesTable from "./components/CertificatesTable";
import QRCodeDialog from "./components/QRCodeDialog";
import { useCertificateData } from "./hooks/useCertificateData";

/**
 * AllCertificates component displays a list of all certificates with filtering options
 * and action buttons for each certificate
 */
const AllCertificates = () => {
  const {
    certificates,
    searchTerm,
    setSearchTerm,
    entriesCount,
    setEntriesCount,
    isQRDialogOpen,
    setIsQRDialogOpen,
    currentQRCode,
    handleGenerateQR
  } = useCertificateData();

  return (
    <div className="space-y-6">
      {/* Header with title and back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Son Kalibrasyon Sertifikaları</h1>
        
        <Button
          asChild
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
        >
          <Link to="/musteri-listesi">
            <ArrowLeft className="h-4 w-4" />
            Müşteri Listesine Dön
          </Link>
        </Button>
      </div>
      
      {/* Table controls - entries count and search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Show</span>
          <Select value={entriesCount} onValueChange={setEntriesCount}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm">Entries</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">Search:</span>
          <Input 
            type="search" 
            placeholder="Ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[250px]"
          />
        </div>
      </div>
      
      {/* Table with certificates */}
      <CertificatesTable 
        certificates={certificates}
        onGenerateQR={handleGenerateQR}
      />
      
      {/* QR Code Dialog */}
      <QRCodeDialog 
        isOpen={isQRDialogOpen}
        onOpenChange={setIsQRDialogOpen}
        qrCodeData={currentQRCode}
      />
    </div>
  );
};

export default AllCertificates;
