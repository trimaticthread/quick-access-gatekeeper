import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface ReferenceDevice {
  id: string;
  name: string;
  serialNumber: string;
  type: string;
  status: "active" | "inactive";
  lastCalibrationDate: string;
  nextCalibrationDate: string;
}

const ReferenceDeviceList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [devices] = useState<ReferenceDevice[]>([
    {
      id: "1",
      name: "kütle seti",
      serialNumber: "32131213",
      type: "B TİPİ",
      status: "active",
      lastCalibrationDate: "20.03.2025",
      nextCalibrationDate: "30.03.2025"
    },
    {
      id: "2",
      name: "kütle seti",
      serialNumber: "2370137931",
      type: "B TİPİ",
      status: "active",
      lastCalibrationDate: "21.03.2025",
      nextCalibrationDate: "26.03.2025"
    },
    {
      id: "3",
      name: "dasdasdad",
      serialNumber: "312321312",
      type: "bozukbaşlıcore",
      status: "active",
      lastCalibrationDate: "21.03.2025",
      nextCalibrationDate: "28.03.2025"
    }
  ]);

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Referans Cihaz Listesi</h1>
        
        <Button
          asChild
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
        >
          <Link to="/yeni-referans-cihaz-ekle">
            <Plus className="h-4 w-4" />
            Yeni Referans Cihaz Ekle
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-1/3">
          <Input
            type="search"
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cihaz Adı</TableHead>
              <TableHead>Seri No</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Son Kalibrasyon</TableHead>
              <TableHead>Sonraki Kalibrasyon</TableHead>
              <TableHead className="text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.name}</TableCell>
                  <TableCell>{device.serialNumber}</TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>
                    <span className={`status ${device.status}`}>
                      {device.status === "active" ? "Aktif" : "Pasif"}
                    </span>
                  </TableCell>
                  <TableCell>{device.lastCalibrationDate}</TableCell>
                  <TableCell>{device.nextCalibrationDate}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 p-2 bg-blue-500 hover:bg-blue-600 text-white border-none"
                        asChild
                      >
                        <Link to={`/referans-cihaz-duzenle/${device.id}`}>
                          <span>Düzenle</span>
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 p-2 bg-red-500 hover:bg-red-600 text-white border-none"
                        asChild
                      >
                        <Link to={`/referans-cihaz-sil/${device.id}`}>
                          <span>Sil</span>
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Referans cihaz bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReferenceDeviceList;
