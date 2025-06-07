
/**
 * Certificate type definition
 */
export interface Certificate {
  id: string;
  tbdsNo: string;
  certificateNo: string;
  customerId: string;
  customerName: string;
  state: "Onaylı" | "Taslak";
}

export interface QRCodeData {
  certificateId: string;
  qrImageUrl: string | null;
}
