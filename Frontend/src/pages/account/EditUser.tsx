
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface Employee {
  id: string;
  fullName: string;
  username: string;
  role: string;
  active: boolean;
}

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "",
    active: true,
  });
  
  // Mock data fetch
  useEffect(() => {
    const mockUsers: Record<string, Employee> = {
      "1": {
        id: "1",
        fullName: "Admin User",
        username: "admin",
        role: "yetkili",
        active: true,
      },
      "2": {
        id: "2",
        fullName: "Personel User",
        username: "personel",
        role: "personel",
        active: true,
      },
      "3": {
        id: "3",
        fullName: "Inactive User",
        username: "inactive",
        role: "personel",
        active: false,
      },
    };
    
    // Simulate API delay
    setTimeout(() => {
      const foundUser = mockUsers[id || ""];
      if (foundUser) {
        setUser(foundUser);
        setFormData({
          fullName: foundUser.fullName,
          username: foundUser.username,
          password: "",
          role: foundUser.role,
          active: foundUser.active,
        });
      }
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: field === "active" ? value === "true" : value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.username) {
      toast.error("İsim Soyisim ve Kullanıcı Adı alanları zorunludur");
      return;
    }
    
    // In a real app, you would send this to an API
    console.log("Updated user data:", formData);
    toast.success("Kullanıcı başarıyla güncellendi");
    navigate("/kullanici-yonetimi");
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-2">Kullanıcı bulunamadı</h2>
        <p className="text-muted-foreground mb-6">
          Aradığınız kullanıcı bulunamadı veya silinmiş olabilir.
        </p>
        <Button variant="outline" onClick={() => navigate("/kullanici-yonetimi")}>
          Kullanıcı Listesine Dön
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/kullanici-yonetimi")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Geri
        </Button>
        <h1 className="text-2xl font-bold">Yetkili/Personel Düzenle</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Kullanıcı Bilgileri</CardTitle>
            <CardDescription>
              Kullanıcı bilgilerini güncellemek için aşağıdaki formu doldurun.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">İsim Soyisim</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="İsim Soyisim"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Kullanıcı Adı"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Yetki Ver</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleSelectChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Yetki seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Yetki Türü</SelectLabel>
                    <SelectItem value="yetkili">Yetkili</SelectItem>
                    <SelectItem value="personel">Personel</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Yeni şifre (değiştirmek istemiyorsanız boş bırakın)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="active">Durum</Label>
              <Select
                value={formData.active.toString()}
                onValueChange={(value) => handleSelectChange("active", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kullanıcı Durumu</SelectLabel>
                    <SelectItem value="true">Aktif</SelectItem>
                    <SelectItem value="false">Pasif</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/kullanici-yonetimi")}
            >
              İptal
            </Button>
            <Button type="submit">Kaydet</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditUser;
