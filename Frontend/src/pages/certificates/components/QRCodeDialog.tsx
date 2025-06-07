
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { QRCodeData } from "../types/certificate.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface QRCodeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  qrCodeData: QRCodeData;
}

const QRCodeDialog = ({ isOpen, onOpenChange, qrCodeData }: QRCodeDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sertifika QR Kodu</DialogTitle>
          <DialogDescription>
            Bu QR kodu tarayarak sertifika detaylarına ulaşabilirsiniz.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center p-4">
          {qrCodeData.qrImageUrl ? (
            <img 
              src={qrCodeData.qrImageUrl} 
              alt="QR Code" 
              className="border border-border rounded-md"
            />
          ) : (
            <div className="w-[200px] h-[200px] bg-muted flex items-center justify-center rounded-md">
              <p className="text-muted-foreground">QR kod yükleniyor...</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-4">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => onOpenChange(false)}
          >
            Kapat
          </Button>
          
          <Button 
            className="flex items-center gap-2"
            onClick={() => {
              if (qrCodeData.qrImageUrl) {
                window.open(qrCodeData.qrImageUrl, '_blank');
                toast.success("QR kod indirildi!");
              }
            }}
          >
            <Download className="h-4 w-4" />
            İndir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
