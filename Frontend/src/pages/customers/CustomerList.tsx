
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Plus, Search, Eye, Edit, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Customer {
  id: string;
  name: string;
  type: "corporate" | "individual";
  taxNumber?: string;
  phone: string;
  email?: string;
  status: "active" | "inactive";
}

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesCount, setEntriesCount] = useState("10");
  const [customerType, setCustomerType] = useState<"all" | "corporate" | "individual">("all");

  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "ABC Teknoloji Ltd. Şti.",
      type: "corporate",
      taxNumber: "1234567890",
      phone: "0212 123 45 67",
      email: "info@abcteknoloji.com",
      status: "active",
    },
    {
      id: "2",
      name: "XYZ Mühendislik A.Ş.",
      type: "corporate",
      taxNumber: "9876543210",
      phone: "0216 987 65 43",
      email: "info@xyzengineering.com",
      status: "active",
    },
    {
      id: "3",
      name: "Ahmet Yılmaz",
      type: "individual",
      phone: "0555 123 45 67",
      email: "ahmet.yilmaz@example.com",
      status: "active",
    },
    {
      id: "4",
      name: "DEF Elektrik San. Tic. Ltd. Şti.",
      type: "corporate",
      taxNumber: "1357924680",
      phone: "0312 246 80 13",
      email: "info@defelektrik.com",
      status: "inactive",
    },
  ]);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.phone.includes(searchTerm) ||
      (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (customer.taxNumber && customer.taxNumber.includes(searchTerm));
    
    const matchesType = customerType === "all" || customer.type === customerType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Müşteri Listesi</h1>
        
        <Button
          asChild
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
        >
          <Link to="/musteri-ekle">
            <Plus className="h-4 w-4" />
            Yeni Müşteri Ekle
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm">Show</span>
            <Select value={entriesCount} onValueChange={setEntriesCount}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">Entries</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm">Tip:</span>
            <Select value={customerType} onValueChange={(value) => setCustomerType(value as any)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tüm Müşteriler" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Müşteriler</SelectItem>
                <SelectItem value="corporate">Kurumsal</SelectItem>
                <SelectItem value="individual">Bireysel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Müşteri ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>
      
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Müşteri Adı</TableHead>
              <TableHead>Müşteri Tipi</TableHead>
              <TableHead>Vergi / TC No</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    {customer.type === "corporate" ? "Kurumsal" : "Bireysel"}
                  </TableCell>
                  <TableCell>{customer.taxNumber || "-"}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.email || "-"}</TableCell>
                  <TableCell>
                    <span className={`status ${customer.status}`}>
                      {customer.status === "active" ? "Aktif" : "Pasif"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        asChild
                      >
                        <Link to={`/musteri-detay/${customer.id}`}>
                          <span className="sr-only">Görüntüle</span>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        asChild
                      >
                        <Link to={`/musteri-duzenle/${customer.id}`}>
                          <span className="sr-only">Düzenle</span>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        asChild
                      >
                        <Link to={`/musteri-sil/${customer.id}`}>
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
                <TableCell colSpan={7} className="h-24 text-center">
                  Müşteri bulunamadı.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerList;
