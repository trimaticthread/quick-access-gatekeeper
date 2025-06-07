
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { ArrowLeft, UserPlus } from "lucide-react";

const AddUser = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    active: true,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.username || !formData.password) {
      toast.error("İsim Soyisim, Kullanıcı Adı ve Şifre alanları zorunludur");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Şifreler eşleşmiyor");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır");
      return;
    }
    
    if (!formData.role) {
      toast.error("Lütfen bir yetki seçin");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you would send this to an API
      console.log("New user data:", formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Kullanıcı başarıyla oluşturuldu");
      navigate("/kullanici-yonetimi");
    } catch (error) {
      toast.error("Kullanıcı oluşturulurken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };
  
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
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UserPlus className="h-6 w-6" />
          Yeni Kullanıcı Ekle
        </h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Kullanıcı Bilgileri</CardTitle>
            <CardDescription>
              Yeni kullanıcı oluşturmak için aşağıdaki formu doldurun. Tüm zorunlu alanları doldurmanız gerekmektedir.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">İsim Soyisim *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Örn: Ahmet Yılmaz"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı *</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Örn: ahmet.yilmaz"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Yetki *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleSelectChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kullanıcı yetkisi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Yetki Türü</SelectLabel>
                    <SelectItem value="yetkili">Yetkili - Tüm yetkilere sahip</SelectItem>
                    <SelectItem value="personel">Personel - Sınırlı yetkiler</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Şifre *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="En az 6 karakter"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Şifre Tekrar *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Şifrenizi tekrar girin"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="active">Durum</Label>
              <Select
                value={formData.active.toString()}
                onValueChange={(value) => handleSelectChange("active", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kullanıcı durumu seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kullanıcı Durumu</SelectLabel>
                    <SelectItem value="true">Aktif - Sisteme giriş yapabilir</SelectItem>
                    <SelectItem value="false">Pasif - Sisteme giriş yapamaz</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Yetki Açıklamaları:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><strong>Yetkili:</strong> Tüm modüllere erişim, kullanıcı yönetimi yapabilir</li>
                <li><strong>Personel:</strong> Sınırlı erişim, sadece atanan görevleri yapabilir</li>
              </ul>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/kullanici-yonetimi")}
              disabled={isLoading}
            >
              İptal
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? "Oluşturuluyor..." : "Kullanıcı Oluştur"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
