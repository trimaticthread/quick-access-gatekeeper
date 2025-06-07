
import { useState } from "react";
import { toast } from "sonner";
import { Certificate, QRCodeData } from "../types/certificate.types";

export const useCertificateData = () => {
  // Sample certificate data - would typically come from an API
  const [certificates] = useState<Certificate[]>([
    {
      id: "15958687-BBF5-4257-3126-08DD53F3D056",
      tbdsNo: "15958687-BBF5-4257-3126-08DD53F3D056",
      certificateNo: "DERİL KİMYA LABORATUAR MALZEMELERİ VE DIŞ TİCARET LİMİTED ŞİRKETİ",
      customerId: "2603ec30-3eb22-4341-314f-08dd53f3d056",
      customerName: "SİNA TOPRAK GÜLEÇ DÜNYANIN EN MÜKEMMEL YAZILIM GELİŞTİRME ŞİRKETİ LTD ŞTİ",
      state: "Onaylı",
    },
    {
      id: "837E60F7-AE0D-4F6F-E51C-08DD55CC468F",
      tbdsNo: "837E60F7-AE0D-4F6F-E51C-08DD55CC468F",
      certificateNo: "DERİL KİMYA LABORATUAR MALZEMELERİ VE DIŞ TİCARET LİMİTED ŞİRKETİ",
      customerId: "2603ec30-3eb22-4341-314f-08dd53f3d056",
      customerName: "SİNA TOPRAK GÜLEÇ DÜNYANIN EN MÜKEMMEL YAZILIM GELİŞTİRME ŞİRKETİ LTD ŞTİ",
      state: "Taslak",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesCount, setEntriesCount] = useState("10");
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [currentQRCode, setCurrentQRCode] = useState<QRCodeData>({ 
    certificateId: "", 
    qrImageUrl: null 
  });

  const filteredCertificates = certificates.filter(cert =>
    cert.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.certificateNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.tbdsNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateQR = (certificateId: string) => {
    // In a real application, this would be an API call to generate the QR code
    const mockApiCall = () => {
      // This simulates an API delay
      setTimeout(() => {
        // Generate a sample QR code (in a real app, this would come from your backend)
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${certificateId}`;
        
        setCurrentQRCode({
          certificateId,
          qrImageUrl
        });
        
        setIsQRDialogOpen(true);
      }, 500);
    };
    
    toast.promise(
      new Promise((resolve) => {
        mockApiCall();
        setTimeout(resolve, 500);
      }),
      {
        loading: "QR kod oluşturuluyor...",
        success: "QR kod oluşturuldu!",
        error: "QR kod oluşturulurken hata oluştu!"
      }
    );
  };

  return {
    certificates: filteredCertificates,
    searchTerm,
    setSearchTerm,
    entriesCount,
    setEntriesCount,
    isQRDialogOpen,
    setIsQRDialogOpen,
    currentQRCode,
    handleGenerateQR
  };
};
