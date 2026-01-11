import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

interface HistoricalPersonnel {
  id: string;
  name: string;
  position: string;
  years: string | null;
  photo_url: string | null;
  category: string;
  display_order: number | null;
  is_active: boolean | null;
}

const CATEGORIES = [
  { value: "director", label: "Former Director" },
  { value: "shs_principal", label: "Former SHS Principal" },
  { value: "jhs_principal", label: "Former JHS Principal" },
];

const HistoricalPersonnelManager = () => {
  const { toast } = useToast();
  const [personnel, setPersonnel] = useState<HistoricalPersonnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<HistoricalPersonnel | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    years: "",
    photo_url: "",
    category: "director",
    display_order: 0,
  });

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    const { data, error } = await supabase
      .from("historical_personnel")
      .select("*")
      .order("category")
      .order("display_order");

    if (error) {
      toast({ title: "Error", description: "Failed to fetch data", variant: "destructive" });
    } else {
      setPersonnel(data || []);
    }
    setLoading(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `historical/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("personnel-photos")
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "Error", description: "Failed to upload photo", variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("personnel-photos")
      .getPublicUrl(filePath);

    setFormData({ ...formData, photo_url: urlData.publicUrl });
    setUploading(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      years: "",
      photo_url: "",
      category: "director",
      display_order: 0,
    });
    setEditing(null);
  };

  const handleEdit = (person: HistoricalPersonnel) => {
    setEditing(person);
    setFormData({
      name: person.name,
      position: person.position,
      years: person.years || "",
      photo_url: person.photo_url || "",
      category: person.category,
      display_order: person.display_order || 0,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.category) {
      toast({ title: "Error", description: "Name and category are required", variant: "destructive" });
      return;
    }

    const payload = {
      ...formData,
      years: formData.years || null,
      photo_url: formData.photo_url || null,
    };

    if (editing) {
      const { error } = await supabase
        .from("historical_personnel")
        .update(payload)
        .eq("id", editing.id);

      if (error) {
        toast({ title: "Error", description: "Failed to update", variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Personnel updated" });
    } else {
      const { error } = await supabase.from("historical_personnel").insert(payload);

      if (error) {
        toast({ title: "Error", description: "Failed to add", variant: "destructive" });
        return;
      }
      toast({ title: "Success", description: "Personnel added" });
    }

    setDialogOpen(false);
    resetForm();
    fetchPersonnel();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    const { error } = await supabase.from("historical_personnel").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete", variant: "destructive" });
      return;
    }
    toast({ title: "Success", description: "Personnel deleted" });
    fetchPersonnel();
  };

  const toggleActive = async (person: HistoricalPersonnel) => {
    const { error } = await supabase
      .from("historical_personnel")
      .update({ is_active: !person.is_active })
      .eq("id", person.id);

    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
      return;
    }
    fetchPersonnel();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Former Directors & Principals</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Entry</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Entry" : "Add New Entry"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category *</label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Position/Title</label>
                <Input
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="e.g., School Director"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Years of Service</label>
                <Input
                  value={formData.years}
                  onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                  placeholder="e.g., 2010 - 2015"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Photo</label>
                <div className="flex gap-2">
                  <Input
                    value={formData.photo_url}
                    onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    placeholder="Photo URL or upload"
                    className="flex-1"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  </Button>
                </div>
                {formData.photo_url && (
                  <img src={formData.photo_url} alt="Preview" className="w-20 h-20 rounded-full object-cover mt-2" />
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Order</label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editing ? "Update" : "Add"} Entry
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {CATEGORIES.map((cat) => {
        const categoryPersonnel = personnel.filter((p) => p.category === cat.value);
        if (categoryPersonnel.length === 0) return null;

        return (
          <Card key={cat.value}>
            <CardHeader>
              <CardTitle className="text-lg">{cat.label}s</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Years</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryPersonnel.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell>
                        {person.photo_url ? (
                          <img src={person.photo_url} alt={person.name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-secondary" />
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell>{person.years || "-"}</TableCell>
                      <TableCell>
                        <Switch
                          checked={person.is_active ?? true}
                          onCheckedChange={() => toggleActive(person)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(person)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(person.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}

      {personnel.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No entries yet. Click "Add Entry" to add former directors and principals.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HistoricalPersonnelManager;
