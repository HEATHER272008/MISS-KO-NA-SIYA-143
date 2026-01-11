import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save } from "lucide-react";
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

interface Scholarship {
  id: string;
  name: string;
  type: string | null;
  description: string | null;
  discount_amount: string | null;
  eligibility: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const SCHOLARSHIP_TYPES = [
  "Band Discount",
  "Siblings Discount",
  "Athlete Discount",
  "Government Scholarship",
  "Academic Scholarship",
  "Other",
];

const ScholarshipsManager = () => {
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    discount_amount: "",
    eligibility: "",
  });

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    const { data, error } = await supabase
      .from("scholarships")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch scholarships",
        variant: "destructive",
      });
    } else {
      setScholarships(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      description: "",
      discount_amount: "",
      eligibility: "",
    });
    setEditingId(null);
  };

  const handleEdit = (scholarship: Scholarship) => {
    setFormData({
      name: scholarship.name,
      type: scholarship.type || "",
      description: scholarship.description || "",
      discount_amount: scholarship.discount_amount || "",
      eligibility: scholarship.eligibility || "",
    });
    setEditingId(scholarship.id);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      name: formData.name,
      type: formData.type || null,
      description: formData.description || null,
      discount_amount: formData.discount_amount || null,
      eligibility: formData.eligibility || null,
      display_order: editingId ? undefined : scholarships.length + 1,
    };

    if (editingId) {
      const { error } = await supabase
        .from("scholarships")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update scholarship",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Scholarship updated" });
        fetchScholarships();
        setDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from("scholarships").insert(payload);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add scholarship",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Scholarship added" });
        fetchScholarships();
        setDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this scholarship?")) return;

    const { error } = await supabase.from("scholarships").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete scholarship",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Scholarship deleted" });
      fetchScholarships();
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean | null) => {
    const { error } = await supabase
      .from("scholarships")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (!error) {
      fetchScholarships();
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Scholarships Management</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Scholarship
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Scholarship" : "Add New Scholarship"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Scholarship name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SCHOLARSHIP_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Discount Amount</label>
                <Input
                  value={formData.discount_amount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount_amount: e.target.value })
                  }
                  placeholder="e.g., 10% off tuition, Full scholarship"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Eligibility Requirements</label>
                <Textarea
                  value={formData.eligibility}
                  onChange={(e) =>
                    setFormData({ ...formData, eligibility: e.target.value })
                  }
                  placeholder="Who can apply for this scholarship..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  <Save className="mr-2 h-4 w-4" />
                  {editingId ? "Update" : "Add"} Scholarship
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scholarships.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No scholarships added yet. Click "Add Scholarship" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                scholarships.map((scholarship, index) => (
                  <TableRow key={scholarship.id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">{scholarship.name}</TableCell>
                    <TableCell>{scholarship.type || "-"}</TableCell>
                    <TableCell>{scholarship.discount_amount || "-"}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleActive(scholarship.id, scholarship.is_active)}
                        className={
                          scholarship.is_active !== false
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }
                      >
                        {scholarship.is_active !== false ? "Active" : "Inactive"}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(scholarship)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(scholarship.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default ScholarshipsManager;
