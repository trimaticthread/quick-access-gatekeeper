import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const AddDeviceType = () => {
  const navigate = useNavigate();
  const [deviceTypeForm, setDeviceTypeForm] = useState({
    name: "",
    description: "",
    referenceCalibrators: ""
  });

  const [availableCalibrators] = useState([
    { id: "1", name: "Kütle seti" },
    { id: "2", name: "Terazi" },
    { id: "3", name: "Sıcaklık kalibratörü" },
    { id: "4", name: "Basınç kalibratörü" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDeviceTypeForm({
      ...deviceTypeForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setDeviceTypeForm({
      ...deviceTypeForm,
      referenceCalibrators: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cihaz türü başarıyla eklendi!");
    navigate("/cihaz-turu-listesi");
  };

  const handleCancel = () => {
    navigate("/cihaz-turu-listesi");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Yeni Cihaz Türü Ekle</h1>
      <p className="text-muted-foreground">Lütfen cihaz türü bilgilerini giriniz.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-6 p-6 border border-border rounded-lg bg-card">
          <div className="space-y-2">
            <Label htmlFor="deviceTypeName">
              Cihaz Türü Adı
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="deviceTypeName"
              name="name"
              value={deviceTypeForm.name}
              onChange={handleChange}
              placeholder="Cihaz Türü Adı"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deviceTypeDescription">
              Açıklama
            </Label>
            <Textarea
              id="deviceTypeDescription"
              name="description"
              value={deviceTypeForm.description}
              onChange={handleChange}
              placeholder="Açıklama giriniz"
              rows={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="referenceCalibrators">
              Referans Kalibratörler
            </Label>
            <Select value={deviceTypeForm.referenceCalibrators} onValueChange={handleSelectChange}>
              <SelectTrigger id="referenceCalibrators" className="w-full">
                <SelectValue placeholder="Referans Kalibratör Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                {availableCalibrators.map((calibrator) => (
                  <SelectItem key={calibrator.id} value={calibrator.id}>
                    {calibrator.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Bu cihaz türü için kullanılabilecek referans kalibratörleri seçiniz.
            </p>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              className="bg-gray-500 text-white hover:bg-gray-600 border-0"
            >
              İptal
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Kaydet
            </Button>
          </div>
        </form>
        
        <div className="space-y-6">
          <div className="p-6 border border-border rounded-lg bg-card">
            <h2 className="text-xl font-semibold mb-4">Bilgi</h2>
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                Cihaz türü ekleyerek, bu türdeki cihazlar için kalibrasyon işlemlerini daha kolay yönetebilirsiniz.
              </p>
              <p className="text-muted-foreground">
                Her cihaz türü için uyumlu referans kalibratörleri seçmeniz gerekmektedir.
              </p>
              <p className="text-muted-foreground">
                Cihaz türü eklendikten sonra, bu türdeki cihazlar için sertifikalar oluşturabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDeviceType;
