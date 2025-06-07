
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Form şeması
const profileFormSchema = z.object({
  fullName: z.string().min(3, {
    message: "İsim en az 3 karakter olmalıdır",
  }),
  email: z.string().email({
    message: "Geçerli bir e-posta adresi giriniz",
  }),
  phone: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine(data => {
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: "Yeni şifre belirlemek için mevcut şifreyi girmelisiniz",
  path: ["currentPassword"],
}).refine(data => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileEdit = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Form tanımlama - varsayılan değerleri kullanıcı bilgileriyle doldur
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: "kullanici@ornek.com", // Demo veri
      phone: "+90 555 123 4567", // Demo veri
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Form gönderim işlemi
  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Profil verileri:", data);
      
      // API çağrısını simüle etmek için bekletelim
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Profil başarıyla güncellendi", {
        description: "Bilgileriniz kaydedildi",
      });
    } catch (error) {
      console.error("Profil güncelleme hatası:", error);
      toast.error("Profil güncellenirken bir hata oluştu", {
        description: "Lütfen tüm alanları kontrol edip tekrar deneyin",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Profil resmi değişikliği
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Profil Düzenle</h1>
        <p className="text-muted-foreground mt-1">Hesap bilgilerinizi ve tercihlerinizi buradan güncelleyebilirsiniz.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil Resmi Kartı */}
        <Card>
          <CardHeader>
            <CardTitle>Profil Resmi</CardTitle>
            <CardDescription>Profil resminizi güncelleyebilirsiniz</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={avatarPreview || undefined} />
              <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                {user?.fullName?.charAt(0) || user?.username?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="w-full">
              <label htmlFor="avatar-upload" className="block">
                <Button variant="outline" className="w-full" asChild>
                  <span className="cursor-pointer">Fotoğraf Yükle</span>
                </Button>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground text-center">
            <p>PNG, JPG veya GIF. Maksimum 1MB.</p>
          </CardFooter>
        </Card>

        {/* Profil Bilgileri Kartı */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
            <CardDescription>Temel bilgilerinizi ve şifrenizi güncelleyebilirsiniz</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ad Soyad */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad Soyad</FormLabel>
                        <FormControl>
                          <Input placeholder="Ad ve soyadınızı giriniz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* E-posta */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta</FormLabel>
                        <FormControl>
                          <Input placeholder="E-posta adresinizi giriniz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Telefon */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon</FormLabel>
                        <FormControl>
                          <Input placeholder="Telefon numaranızı giriniz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="border-t border-border pt-6 mt-6">
                  <h3 className="font-medium mb-4">Şifre Değiştir</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mevcut Şifre */}
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mevcut Şifre</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Mevcut şifrenizi giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Tam genişlikte boşluk bırakalım */}
                    <div></div>

                    {/* Yeni Şifre */}
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yeni Şifre</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Yeni şifrenizi giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Şifre Tekrarı */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yeni Şifre Tekrarı</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Yeni şifrenizi tekrar giriniz" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Form Butonları */}
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    İptal
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileEdit;
