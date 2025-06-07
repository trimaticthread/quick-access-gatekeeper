
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TurkAkSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error("Kullanıcı adı ve şifre alanları zorunludur");
      return;
    }
    
    console.log("Submitting TurkAk settings:", formData);
    toast.success("TurkAk ayarları başarıyla kaydedildi");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Geri
        </Button>
        <h1 className="text-2xl font-bold">TurkAk Ayarları</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>TurkAk Kullanıcı Kaydı</CardTitle>
            <CardDescription>
              TurkAk kullanıcı bilgilerinizi güncelleyebilirsiniz.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Kullanıcı adınızı girin"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Şifrenizi girin"
                required
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Kaydet
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default TurkAkSettings;
