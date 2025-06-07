
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

interface DeviceType {
  id: string;
  name: string;
  description: string;
  referenceCalibrator: string;
}

const DeviceTypeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [deviceTypes] = useState<DeviceType[]>([
    {
      id: "1",
      name: "ada2",
      description: "asdsadsadas",
      referenceCalibrator: "kütle seti"
    }
  ]);

  const filteredDeviceTypes = deviceTypes.filter(
    (deviceType) =>
      deviceType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deviceType.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deviceType.referenceCalibrator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cihaz Türleri</h1>
        
        <Button
          asChild
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
        >
          <Link to="/yeni-cihaz-turu-ekle">
            <Plus className="h-4 w-4" />
            Yeni Cihaz Türü Ekle
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
              <TableHead>Cihaz Türü</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead>Referans Kalibratör</TableHead>
              <TableHead className="text-center">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDeviceTypes.length > 0 ? (
              filteredDeviceTypes.map((deviceType) => (
                <TableRow key={deviceType.id}>
                  <TableCell>{deviceType.name}</TableCell>
                  <TableCell>{deviceType.description}</TableCell>
                  <TableCell>{deviceType.referenceCalibrator}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600 text-white border-none"
                        asChild
                      >
                        <Link to={`/cihaz-turu-duzenle/${deviceType.id}`}>
                          <span className="sr-only">Düzenle</span>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 bg-red-500 hover:bg-red-600 text-white border-none"
                        asChild
                      >
                        <Link to={`/cihaz-turu-sil/${deviceType.id}`}>
                          <span className="sr-only">Sil</span>
                          <Trash className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Cihaz türü bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeviceTypeList;
