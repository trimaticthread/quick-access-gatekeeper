
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AddReferenceDevice = () => {
  const [deviceForm, setDeviceForm] = useState({
    name: "",
    serialNumber: "",
    description: "",
    deviceType: "",
    status: "active",
    lastCalibrationDate: null as Date | null,
    nextCalibrationDate: null as Date | null
  });

  const [deviceTypes] = useState([
    { id: "1", name: "Terazi" },
    { id: "2", name: "Sıcaklık Ölçer" },
    { id: "3", name: "Basınç Ölçer" },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDeviceForm({
      ...deviceForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setDeviceForm({
      ...deviceForm,
      [field]: value
    });
  };

  const handleDateChange = (field: "lastCalibrationDate" | "nextCalibrationDate", date: Date | null) => {
    setDeviceForm({
      ...deviceForm,
      [field]: date
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Referans cihaz başarıyla eklendi!");
    // Reset form or redirect
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Yeni Referans Cihaz Ekle</h1>
      <p className="text-muted-foreground">Lütfen referans cihaz bilgilerini giriniz.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6 border border-border rounded-lg p-6 bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="deviceName">
              Referans Cihaz Adı
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="deviceName"
              name="name"
              value={deviceForm.name}
              onChange={handleInputChange}
              placeholder="Cihaz Adı"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="serialNumber">
              Seri Numarası
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="serialNumber"
              name="serialNumber"
              value={deviceForm.serialNumber}
              onChange={handleInputChange}
              placeholder="Seri Numarası"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              name="description"
              value={deviceForm.description}
              onChange={handleInputChange}
              placeholder="Açıklama giriniz"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deviceType">
              Cihaz Tipi
            </Label>
            <Select 
              value={deviceForm.deviceType} 
              onValueChange={(value) => handleSelectChange("deviceType", value)}
            >
              <SelectTrigger id="deviceType">
                <SelectValue placeholder="Cihaz Tipi" />
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Durum</Label>
            <Select 
              value={deviceForm.status} 
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Son Kalibrasyon Tarihi</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="lastCalibrationDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !deviceForm.lastCalibrationDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deviceForm.lastCalibrationDate ? (
                    format(deviceForm.lastCalibrationDate, "dd.MM.yyyy")
                  ) : (
                    <span>Tarih seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deviceForm.lastCalibrationDate || undefined}
                  onSelect={(date) => handleDateChange("lastCalibrationDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Sonraki Kalibrasyon Tarihi</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="nextCalibrationDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !deviceForm.nextCalibrationDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deviceForm.nextCalibrationDate ? (
                    format(deviceForm.nextCalibrationDate, "dd.MM.yyyy")
                  ) : (
                    <span>Tarih seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deviceForm.nextCalibrationDate || undefined}
                  onSelect={(date) => handleDateChange("nextCalibrationDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline"
            className="bg-gray-500 text-white hover:bg-gray-600 border-0"
          >
            İptal
          </Button>
          <Button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-600"
          >
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddReferenceDevice;
