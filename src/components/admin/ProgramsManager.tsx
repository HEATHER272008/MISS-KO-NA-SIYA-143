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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Program {
  id: string;
  title: string;
  description: string | null;
  details: string | null;
  icon: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const ProgramsManager = () => {
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
    icon: "",
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch programs",
        variant: "destructive",
      });
    } else {
      setPrograms(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", details: "", icon: "" });
    setEditingId(null);
  };

  const handleEdit = (program: Program) => {
    setFormData({
      title: program.title,
      description: program.description || "",
      details: program.details || "",
      icon: program.icon || "",
    });
    setEditingId(program.id);
    setDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description || null,
      details: formData.details || null,
      icon: formData.icon || null,
      display_order: editingId ? undefined : programs.length + 1,
    };

    if (editingId) {
      const { error } = await supabase
        .from("programs")
        .update(payload)
        .eq("id", editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update program",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Program updated" });
        fetchPrograms();
        setDialogOpen(false);
        resetForm();
      }
    } else {
      const { error } = await supabase.from("programs").insert(payload);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add program",
          variant: "destructive",
        });
      } else {
        toast({ title: "Success", description: "Program added" });
        fetchPrograms();
        setDialogOpen(false);
        resetForm();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;

    const { error } = await supabase.from("programs").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete program",
        variant: "destructive",
      });
    } else {
      toast({ title: "Success", description: "Program deleted" });
      fetchPrograms();
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean | null) => {
    const { error } = await supabase
      .from("programs")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (!error) {
      fetchPrograms();
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Programs Management</h2>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Program" : "Add New Program"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., STEM, ABM, HUMSS"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon (Lucide icon name)</label>
                <Input
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="e.g., Microscope, Calculator, BookOpen"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Brief description of the program..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Details / Specialized Subjects
                </label>
                <Textarea
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  placeholder="List of specialized subjects or additional details..."
                  rows={4}
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
                  {editingId ? "Update" : "Add"} Program
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
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No programs added yet. Click "Add Program" to get started.
                  </TableCell>
                </TableRow>
              ) : (
                programs.map((program, index) => (
                  <TableRow key={program.id}>
                    <TableCell className="text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell className="font-medium">{program.title}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {program.description || "-"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleActive(program.id, program.is_active)}
                        className={
                          program.is_active !== false
                            ? "text-green-600"
                            : "text-muted-foreground"
                        }
                      >
                        {program.is_active !== false ? "Active" : "Inactive"}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(program)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(program.id)}
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

export default ProgramsManager;
