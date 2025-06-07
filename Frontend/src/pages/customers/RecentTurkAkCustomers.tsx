
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RecentTurkAkCustomers = () => {
  const [entriesCount, setEntriesCount] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [customers] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <h1 className="text-2xl font-bold">TürkAK Son Müşteriler</h1>
        
        <Button
          asChild
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <Link to="/musteri-ekle">
            <Plus className="mr-2 h-4 w-4" />
            Yeni Müşteri Ekle
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <span>Show</span>
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
          <span>Entries</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>Search:</span>
          <Input 
            type="search" 
            placeholder="Ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-[250px]"
          />
        </div>
      </div>
      
      <div className="min-h-[300px] flex flex-col items-center justify-center p-6 border border-border rounded-lg">
        <p className="text-muted-foreground">Müşteri bulunamadı.</p>
      </div>
    </div>
  );
};

export default RecentTurkAkCustomers;
