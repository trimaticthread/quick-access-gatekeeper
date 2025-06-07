
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Form şeması
const certificateFormSchema = z.object({
  customerId: z.string({
    required_error: "Lütfen müşteri seçiniz",
  }),
  deviceTypeId: z.string({
    required_error: "Lütfen cihaz türü seçiniz",
  }),
  deviceSerialNo: z.string().min(1, {
    message: "Cihaz seri numarası girilmelidir",
  }),
  referenceDeviceId: z.string({
    required_error: "Lütfen referans kalibratör seçiniz",
  }),
  referenceDeviceSerialNo: z.string().min(1, {
    message: "Referans kalibratör seri numarası girilmelidir",
  }),
  calibrationPersonnelId: z.string({
    required_error: "Lütfen kalibrasyon personeli seçiniz",
  }),
  calibrationLocation: z.string({
    required_error: "Lütfen kalibrasyon yeri seçiniz",
  }),
  calibrationDate: z.date({
    required_error: "Lütfen kalibrasyon tarihi seçiniz",
  }),
  issueDate: z.date({
    required_error: "Lütfen ilk yayın tarihi seçiniz",
  }),
  revisionDate: z.date().optional(),
  revisionNotes: z.string().optional(),
});

type CertificateFormValues = z.infer<typeof certificateFormSchema>;

// Demo verileri
const customers = [
  { id: "1", name: "ABC Şirketi" },
  { id: "2", name: "XYZ Kurumu" },
  { id: "3", name: "123 Fabrika" },
];

const deviceTypes = [
  { id: "1", name: "Terazi" },
  { id: "2", name: "Termometre" },
  { id: "3", name: "Manometre" },
];

const referenceDevices = [
  { id: "1", name: "Kütle seti" },
  { id: "2", name: "Kalibrasyon termometresi" },
  { id: "3", name: "Basınç kalibratörü" },
];

const personnel = [
  { id: "1", name: "Ahmet Yılmaz" },
  { id: "2", name: "Mehmet Kaya" },
  { id: "3", name: "Ayşe Demir" },
];

const locations = [
  { id: "lab", name: "Laboratuvar" },
  { id: "field", name: "Saha" },
  { id: "customer", name: "Müşteri Lokasyonu" },
];

const AddCertificate = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form tanımlama
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      revisionNotes: "",
    },
  });

  // Form gönderim işlemi
  const onSubmit = async (data: CertificateFormValues) => {
    setIsSubmitting(true);
    
    // Burada normalde bir API çağrısı yapılacaktır
    try {
      console.log("Sertifika verisi:", data);
      
      // API çağrısını simüle etmek için bekletelim
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Sertifika başarıyla oluşturuldu", {
        description: "Sertifika kaydedildi ve ilgili kişilere bildirim gönderildi",
      });
      
      // Başarılı işlemden sonra sertifikalar sayfasına yönlendir
      navigate("/tum-sertifikalar");
    } catch (error) {
      console.error("Sertifika ekleme hatası:", error);
      toast.error("Sertifika eklenirken bir hata oluştu", {
        description: "Lütfen tüm alanları kontrol edip tekrar deneyin",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Taslak olarak kaydetme işlemi
  const handleSaveAsDraft = async () => {
    const values = form.getValues();
    console.log("Taslak olarak kaydedilen veriler:", values);
    
    toast.success("Sertifika taslak olarak kaydedildi", {
      description: "Sertifika taslağınız daha sonra düzenlemek üzere kaydedildi",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Yeni Sertifika Ekle</h1>
        <p className="text-muted-foreground mt-1">Lütfen aşağıdaki formu doldurun.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Müşteri Seçimi */}
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Müşteri <span className="text-destructive">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Müşteri Seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />

            {/* Cihaz Türü */}
            <FormField
              control={form.control}
              name="deviceTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cihaz Türü <span className="text-destructive">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Cihaz türü seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {deviceTypes.map((deviceType) => (
                        <SelectItem key={deviceType.id} value={deviceType.id}>
                          {deviceType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />

            {/* Cihaz Seri No */}
            <FormField
              control={form.control}
              name="deviceSerialNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cihaz Seri No <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Cihaz seri numarası girin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Referans Kalibratör */}
            <FormField
              control={form.control}
              name="referenceDeviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referans Kalibratör <span className="text-destructive">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Önce cihaz türü seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {referenceDevices.map((device) => (
                        <SelectItem key={device.id} value={device.id}>
                          {device.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <FormMessage />
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Seçilen cihaz türü için kullanılabilecek kalibratörler
                  </p>
                </FormItem>
              )}
            />

            {/* Referans Kalibratör Seri No */}
            <FormField
              control={form.control}
              name="referenceDeviceSerialNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referans Kalibratör Seri No <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Referans kalibratör seri numarası girin" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kalibrasyon Personeli */}
            <FormField
              control={form.control}
              name="calibrationPersonnelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kalibrasyon Personeli <span className="text-destructive">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Personel Seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {personnel.map((person) => (
                        <SelectItem key={person.id} value={person.id}>
                          {person.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />

            {/* Kalibrasyon Yeri */}
            <FormField
              control={form.control}
              name="calibrationLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kalibrasyon Yeri <span className="text-destructive">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />

            {/* Kalibrasyon Tarihi */}
            <FormField
              control={form.control}
              name="calibrationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Kalibrasyon Tarihi <span className="text-destructive">*</span></FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd.MM.yyyy")
                          ) : (
                            <span>GG.AA.YYYY</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2000-01-01")
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* İlk Yayın Tarihi */}
            <FormField
              control={form.control}
              name="issueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>İlk Yayın Tarihi <span className="text-destructive">*</span></FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd.MM.yyyy")
                          ) : (
                            <span>GG.AA.YYYY</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2000-01-01")
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Revizyon Tarihi (Opsiyonel) */}
            <FormField
              control={form.control}
              name="revisionDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Revizyon Tarihi</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd.MM.yyyy")
                          ) : (
                            <span>GG.AA.YYYY</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2000-01-01")
                        }
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Revizyon Notu (Opsiyonel, tam genişlikte) */}
          <FormField
            control={form.control}
            name="revisionNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Revizyon Notu</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Revizyon notu giriniz" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Butonları */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveAsDraft}
              disabled={isSubmitting}
            >
              Sertifika Taslak Kaydet
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Kaydediliyor..." : "Sertifika Gönder"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCertificate;
