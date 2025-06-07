import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import { ArrowLeft, Edit, Plus, Search, Trash2, Users } from "lucide-react";

interface Employee {
  id: string;
  fullName: string;
  username: string;
  role: string;
  active: boolean;
  lastLogin: string;
}

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - gerçek bir uygulamada bu veriler API'den gelecek
  const [employees] = useState<Employee[]>([
    {
      id: "1",
      fullName: "Admin User",
      username: "admin",
      role: "yetkili",
      active: true,
      lastLogin: "2024-01-15 09:30",
    },
    {
      id: "2",
      fullName: "Personel User",
      username: "personel",
      role: "personel",
      active: true,
      lastLogin: "2024-01-14 14:22",
    },
    {
      id: "3",
      fullName: "Inactive User",
      username: "inactive",
      role: "personel",
      active: false,
      lastLogin: "2024-01-10 11:15",
    },
  ]);

  const handleDeleteUser = (userId: string, userName: string) => {
    // Gerçek bir uygulamada burada silme işlemi yapılacak
    console.log(`Deleting user: ${userId}`);
    toast.success(`${userName} kullanıcısı silindi`);
  };

  const handleToggleStatus = (userId: string, currentStatus: boolean) => {
    // Gerçek bir uygulamada burada durum güncelleme işlemi yapılacak
    console.log(`Toggling status for user: ${userId} to ${!currentStatus}`);
    toast.success(`Kullanıcı durumu ${!currentStatus ? "aktif" : "pasif"} olarak güncellendi`);
  };

  // Filtreleme
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = 
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === "all" || employee.role === filterRole;
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "active" && employee.active) ||
      (filterStatus === "inactive" && !employee.active);

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Geri
        </Button>
        <h1 className="text-2xl font-bold">Yetkili/Personel Yönetimi</h1>
      </div>

      {/* Arama ve Filtreler */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Kullanıcı Listesi
          </CardTitle>
          <CardDescription>
            Sistemdeki tüm yetkili ve personel kullanıcılarını buradan yönetebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Arama</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="İsim veya kullanıcı adı ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <Label htmlFor="role-filter">Yetki Filtresi</Label>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Yetki seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="yetkili">Yetkili</SelectItem>
                  <SelectItem value="personel">Personel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="sm:w-48">
              <Label htmlFor="status-filter">Durum Filtresi</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Pasif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={() => navigate("/yeni-kullanici-ekle")}>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Kullanıcı Ekle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kullanıcı Tablosu */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İsim Soyisim</TableHead>
                <TableHead>Kullanıcı Adı</TableHead>
                <TableHead>Yetki</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Son Giriş</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">Kullanıcı bulunamadı</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      {employee.fullName}
                    </TableCell>
                    <TableCell>{employee.username}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={employee.role === "yetkili" ? "default" : "secondary"}
                      >
                        {employee.role === "yetkili" ? "Yetkili" : "Personel"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={employee.active ? "default" : "destructive"}
                        className={employee.active ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {employee.active ? "Aktif" : "Pasif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {employee.lastLogin}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/edit-user/${employee.id}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(employee.id, employee.active)}
                        >
                          {employee.active ? "Pasifleştir" : "Aktifleştir"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(employee.id, employee.fullName)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
