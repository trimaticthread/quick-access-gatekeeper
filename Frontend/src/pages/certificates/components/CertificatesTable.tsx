
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Certificate } from "../types/certificate.types";
import CertificateActions from "./CertificateActions";

interface CertificatesTableProps {
  certificates: Certificate[];
  onGenerateQR: (certificateId: string) => void;
}

const CertificatesTable = ({ certificates, onGenerateQR }: CertificatesTableProps) => {
  return (
    <ScrollArea className="border border-border rounded-lg">
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">TBDS No</TableHead>
              <TableHead>Sertifika No</TableHead>
              <TableHead>Müşteri ID</TableHead>
              <TableHead>Müşteri Adı</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell className="font-mono text-xs">{cert.tbdsNo}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={cert.certificateNo}>
                    {cert.certificateNo}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{cert.customerId}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={cert.customerName}>
                    {cert.customerName}
                  </TableCell>
                  <TableCell>
                    <span className={`status ${cert.state.toLowerCase()}`}>
                      {cert.state}
                    </span>
                  </TableCell>
                  <TableCell>
                    <CertificateActions 
                      certificate={cert} 
                      onGenerateQR={onGenerateQR}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Sertifika bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </ScrollArea>
  );
};

export default CertificatesTable;
