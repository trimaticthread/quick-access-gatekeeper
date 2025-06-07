
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * AddCustomer component for adding new customers (individual or corporate)
 * Form UI is based on the provided design mockup
 */
const AddCustomer = () => {
  // State to track which form is active (basic info is always shown)
  const [activeForm, setActiveForm] = useState<"basic" | "individual" | "corporate">("basic");
  
  // Basic info form state
  const [basicForm, setBasicForm] = useState({
    country: "",
    city: "",
    file: ""
  });

  // Corporate form state
  const [corporateForm, setCorporateForm] = useState({
    taxNumber: "",
    title: "",
    useTaxNumberForTitle: false,
    brandInfo: "",
    address: "",
    phone: "",
    email: "",
    website: ""
  });

  // Individual form state
  const [individualForm, setIndividualForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    website: ""
  });

  /**
   * Handle changes in the basic form
   */
  const handleBasicFormChange = (field: string, value: string) => {
    setBasicForm({
      ...basicForm,
      [field]: value
    });
  };

  /**
   * Handle changes in the corporate form
   */
  const handleCorporateChange = (field: string, value: string | boolean) => {
    setCorporateForm({
      ...corporateForm,
      [field]: value
    });
  };

  /**
   * Handle changes in the individual form
   */
  const handleIndividualChange = (field: string, value: string) => {
    setIndividualForm({
      ...individualForm,
      [field]: value
    });
  };

  /**
   * Activate the corporate customer form
   */
  const showCorporateForm = () => {
    setActiveForm("corporate");
  };

  /**
   * Activate the individual customer form
   */
  const showIndividualForm = () => {
    setActiveForm("individual");
  };

  /**
   * Handle submission of the corporate form
   */
  const handleCorporateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit would typically send data to an API endpoint
    console.log("Corporate form submitted", { ...basicForm, ...corporateForm });
    toast.success("Kurumsal müşteri başarıyla eklendi!");
  };

  /**
   * Handle submission of the individual form
   */
  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit would typically send data to an API endpoint
    console.log("Individual form submitted", { ...basicForm, ...individualForm });
    toast.success("Bireysel müşteri başarıyla eklendi!");
  };

  /**
   * Go back to basic form
   */
  const handleGoBack = () => {
    setActiveForm("basic");
  };

  // List of countries for the dropdown
  const countries = ["Türkiye", "Afganistan", "Almanya", "Amerika", "İngiltere"];
  
  // List of cities for the dropdown
  const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Yeni Müşteri Ekle</h1>
        <p className="text-muted-foreground">Lütfen aşağıdaki formu doldurun.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information Card - Always visible */}
        <Card className="border border-border">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Temel Bilgiler</h2>
            
            <div className="space-y-4">
              {/* Country Selection */}
              <div className="space-y-2">
                <Label htmlFor="country">Ülke</Label>
                <Select 
                  value={basicForm.country} 
                  onValueChange={(value) => handleBasicFormChange("country", value)}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Ülke seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country.toLowerCase()}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* City Selection */}
              <div className="space-y-2">
                <Label htmlFor="city">Şehir</Label>
                <Select 
                  value={basicForm.city} 
                  onValueChange={(value) => handleBasicFormChange("city", value)}
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Şehir seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* File Input */}
              <div className="space-y-2">
                <Label htmlFor="file">Dosya (manuel giriş)</Label>
                <Input
                  id="file"
                  placeholder="Dosya bilgisini girin"
                  value={basicForm.file}
                  onChange={(e) => handleBasicFormChange("file", e.target.value)}
                />
              </div>
              
              {/* Customer Type Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  onClick={showCorporateForm}
                  className={`flex-1 ${activeForm === "corporate" ? "bg-green-500 hover:bg-green-600" : "bg-neutral-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"}`}
                >
                  Kurumsal
                </Button>
                <Button 
                  type="button" 
                  onClick={showIndividualForm}
                  className={`flex-1 ${activeForm === "individual" ? "bg-blue-500 hover:bg-blue-600" : "bg-neutral-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"}`}
                >
                  Bireysel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Corporate Customer Form */}
        {activeForm === "corporate" && (
          <Card className="border border-border">
            <CardContent className="p-6">
              <ScrollArea className="h-[500px] pr-4">
                <h2 className="text-xl font-semibold mb-4">Kurumsal Müşteri Bilgileri</h2>
                
                <form onSubmit={handleCorporateSubmit} className="space-y-4">
                  {/* Tax Number */}
                  <div className="space-y-2">
                    <Label htmlFor="taxNumber">Vergi Numarası</Label>
                    <Input
                      id="taxNumber"
                      placeholder="Vergi numarası girin"
                      value={corporateForm.taxNumber}
                      onChange={(e) => handleCorporateChange("taxNumber", e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Ünvan</Label>
                    <Input
                      id="title"
                      placeholder="Şirket ünvanı girin"
                      value={corporateForm.title}
                      onChange={(e) => handleCorporateChange("title", e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Use Tax Number for Title */}
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="useTaxNumberForTitle" 
                      checked={corporateForm.useTaxNumberForTitle}
                      onCheckedChange={(checked) => handleCorporateChange("useTaxNumberForTitle", checked === true)}
                    />
                    <Label htmlFor="useTaxNumberForTitle">Vergi numarasından unvan kullan</Label>
                  </div>
                  
                  {/* Brand Info */}
                  <div className="space-y-2">
                    <Label htmlFor="brandInfo">Marka Bilgisi</Label>
                    <Input
                      id="brandInfo"
                      placeholder="Marka bilgisi girin"
                      value={corporateForm.brandInfo}
                      onChange={(e) => handleCorporateChange("brandInfo", e.target.value)}
                    />
                  </div>
                  
                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Textarea
                      id="address"
                      placeholder="Şirket adresi girin"
                      value={corporateForm.address}
                      onChange={(e) => handleCorporateChange("address", e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      placeholder="+90 xxx xxx xxxx"
                      value={corporateForm.phone}
                      onChange={(e) => handleCorporateChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@example.com"
                      value={corporateForm.email}
                      onChange={(e) => handleCorporateChange("email", e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Website */}
                  <div className="space-y-2">
                    <Label htmlFor="website">Web Sayfası</Label>
                    <Input
                      id="website"
                      placeholder="www.example.com"
                      value={corporateForm.website}
                      onChange={(e) => handleCorporateChange("website", e.target.value)}
                    />
                  </div>
                  
                  {/* Form Buttons */}
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={handleGoBack}>
                      Geri Dön
                    </Button>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                      Müşteri Ekle
                    </Button>
                  </div>
                </form>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
        
        {/* Individual Customer Form */}
        {activeForm === "individual" && (
          <Card className="border border-border">
            <CardContent className="p-6">
              <ScrollArea className="h-[500px] pr-4">
                <h2 className="text-xl font-semibold mb-4">Bireysel Müşteri Bilgileri</h2>
                
                <form onSubmit={handleIndividualSubmit} className="space-y-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ad</Label>
                    <Input
                      id="firstName"
                      placeholder="Adınızı girin"
                      value={individualForm.firstName}
                      onChange={(e) => handleIndividualChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input
                      id="lastName"
                      placeholder="Soyadınızı girin"
                      value={individualForm.lastName}
                      onChange={(e) => handleIndividualChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Adres</Label>
                    <Textarea
                      id="address"
                      placeholder="Adresinizi girin"
                      value={individualForm.address}
                      onChange={(e) => handleIndividualChange("address", e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      placeholder="+90 xxx xxx xxxx"
                      value={individualForm.phone}
                      onChange={(e) => handleIndividualChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@example.com"
                      value={individualForm.email}
                      onChange={(e) => handleIndividualChange("email", e.target.value)}
                    />
                  </div>
                  
                  {/* Website */}
                  <div className="space-y-2">
                    <Label htmlFor="website">Web Sayfası</Label>
                    <Input
                      id="website"
                      placeholder="www.example.com"
                      value={individualForm.website}
                      onChange={(e) => handleIndividualChange("website", e.target.value)}
                    />
                  </div>
                  
                  {/* Form Buttons */}
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={handleGoBack}>
                      Geri Dön
                    </Button>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                      Müşteri Ekle
                    </Button>
                  </div>
                </form>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Help Content - Only shown when in the initial (basic) state */}
        {activeForm === "basic" && (
          <div className="space-y-6">
            <Card className="border border-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Müşteri Ekle Yardım</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium mb-1">Kurumsal Müşteri Bilgileri</h3>
                    <p className="text-muted-foreground">
                      Kurumsal müşteriler için şirket unvanı, vergi numarası ve iletişim bilgileri gereklidir.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Bireysel Müşteri Bilgileri</h3>
                    <p className="text-muted-foreground">
                      Bireysel müşteriler için ad, soyad ve iletişim bilgileri gereklidir.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Dikkat Edilmesi Gerekenler</h3>
                    <ul className="list-disc list-inside text-muted-foreground">
                      <li>Tüm zorunlu alanları doldurduğunuzdan emin olun.</li>
                      <li>Telefon numaraları sadece rakam içermelidir.</li>
                      <li>E-posta adresleri geçerli formatta olmalıdır.</li>
                      <li>Vergi numarası doğru formatta girilmelidir.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Son Eklenen Müşteriler</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <div>
                      <h3 className="font-medium">ABC Teknoloji Ltd. Şti.</h3>
                      <p className="text-sm text-muted-foreground">22.05.2025</p>
                    </div>
                    <span className="status active">Aktif</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <div>
                      <h3 className="font-medium">XYZ Mühendislik A.Ş.</h3>
                      <p className="text-sm text-muted-foreground">21.05.2025</p>
                    </div>
                    <span className="status active">Aktif</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <div>
                      <h3 className="font-medium">Ahmet Yılmaz</h3>
                      <p className="text-sm text-muted-foreground">20.05.2025</p>
                    </div>
                    <span className="status active">Aktif</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCustomer;
