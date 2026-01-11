import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Home Content Editor
export const HomeContentEditor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    hero_title: "",
    hero_subtitle: "",
    hero_image_url: "",
    why_choose_title: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase
      .from("home_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (data) {
      setFormData({
        hero_title: data.hero_title || "",
        hero_subtitle: data.hero_subtitle || "",
        hero_image_url: data.hero_image_url || "",
        why_choose_title: data.why_choose_title || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { data: existing } = await supabase
      .from("home_content")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("home_content")
        .update(formData)
        .eq("id", existing.id);
    } else {
      await supabase.from("home_content").insert(formData);
    }

    toast({ title: "Success", description: "Home content saved" });
    setSaving(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Home Page Content</h2>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Hero Title</label>
            <Input
              value={formData.hero_title}
              onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
              placeholder="Welcome to BCSI"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Hero Subtitle</label>
            <Textarea
              value={formData.hero_subtitle}
              onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
              placeholder="Subtitle text..."
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Hero Background Image URL</label>
            <Input
              value={formData.hero_image_url}
              onChange={(e) => setFormData({ ...formData, hero_image_url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">"Why Choose BCSI" Section Title</label>
            <Input
              value={formData.why_choose_title}
              onChange={(e) => setFormData({ ...formData, why_choose_title: e.target.value })}
              placeholder="Why Choose BCSI?"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// About Content Editor
export const AboutContentEditor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    history: "",
    jhs_principal_history: "",
    shs_principal_history: "",
    mission_old: "",
    mission_new: "",
    vision_old: "",
    vision_new: "",
    campus_map_url: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase
      .from("about_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (data) {
      setFormData({
        history: data.history || "",
        jhs_principal_history: data.jhs_principal_history || "",
        shs_principal_history: data.shs_principal_history || "",
        mission_old: data.mission_old || "",
        mission_new: data.mission_new || "",
        vision_old: data.vision_old || "",
        vision_new: data.vision_new || "",
        campus_map_url: data.campus_map_url || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { data: existing } = await supabase
      .from("about_content")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existing) {
      await supabase.from("about_content").update(formData).eq("id", existing.id);
    } else {
      await supabase.from("about_content").insert(formData);
    }

    toast({ title: "Success", description: "About content saved" });
    setSaving(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">About Page Content</h2>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      
      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="mission">Mission & Vision</TabsTrigger>
          <TabsTrigger value="campus">Campus Map</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>School History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">General History</label>
                <Textarea
                  value={formData.history}
                  onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                  placeholder="History of BCSI..."
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">JHS Principal History</label>
                <Textarea
                  value={formData.jhs_principal_history}
                  onChange={(e) => setFormData({ ...formData, jhs_principal_history: e.target.value })}
                  placeholder="History of JHS principals..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SHS Principal History</label>
                <Textarea
                  value={formData.shs_principal_history}
                  onChange={(e) => setFormData({ ...formData, shs_principal_history: e.target.value })}
                  placeholder="History of SHS principals..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="mission" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mission & Vision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Old Mission</label>
                  <Textarea
                    value={formData.mission_old}
                    onChange={(e) => setFormData({ ...formData, mission_old: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Mission</label>
                  <Textarea
                    value={formData.mission_new}
                    onChange={(e) => setFormData({ ...formData, mission_new: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Old Vision</label>
                  <Textarea
                    value={formData.vision_old}
                    onChange={(e) => setFormData({ ...formData, vision_old: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Vision</label>
                  <Textarea
                    value={formData.vision_new}
                    onChange={(e) => setFormData({ ...formData, vision_new: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="campus" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Campus Map</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Campus Map Image URL or Embed Code</label>
                <Textarea
                  value={formData.campus_map_url}
                  onChange={(e) => setFormData({ ...formData, campus_map_url: e.target.value })}
                  placeholder="Image URL or Google Maps embed code..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Enrollment Content Editor
export const EnrollmentContentEditor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    enrollment_dates: "",
    start_of_classes: "",
    entrance_exam_schedule: "",
    contact_number: "",
    notes: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase
      .from("enrollment_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (data) {
      setFormData({
        enrollment_dates: data.enrollment_dates || "",
        start_of_classes: data.start_of_classes || "",
        entrance_exam_schedule: data.entrance_exam_schedule || "",
        contact_number: data.contact_number || "",
        notes: data.notes || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { data: existing } = await supabase
      .from("enrollment_content")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existing) {
      await supabase.from("enrollment_content").update(formData).eq("id", existing.id);
    } else {
      await supabase.from("enrollment_content").insert(formData);
    }

    toast({ title: "Success", description: "Enrollment content saved" });
    setSaving(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Enrollment Information</h2>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Enrollment Dates</label>
              <Input
                value={formData.enrollment_dates}
                onChange={(e) => setFormData({ ...formData, enrollment_dates: e.target.value })}
                placeholder="e.g., April 1 - May 31, 2025"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Start of Classes</label>
              <Input
                value={formData.start_of_classes}
                onChange={(e) => setFormData({ ...formData, start_of_classes: e.target.value })}
                placeholder="e.g., August 5, 2025"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Entrance Exam Schedule</label>
              <Input
                value={formData.entrance_exam_schedule}
                onChange={(e) => setFormData({ ...formData, entrance_exam_schedule: e.target.value })}
                placeholder="e.g., Every Saturday, 8:00 AM"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Number</label>
              <Input
                value={formData.contact_number}
                onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                placeholder="+63..."
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes / Disclaimer</label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Dates are subject to change..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Contact Info Editor
export const ContactInfoEditor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    email: "",
    office_hours: "",
    google_maps_embed: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase
      .from("contact_info")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (data) {
      setFormData({
        address: data.address || "",
        phone: data.phone || "",
        email: data.email || "",
        office_hours: data.office_hours || "",
        google_maps_embed: data.google_maps_embed || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { data: existing } = await supabase
      .from("contact_info")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (existing) {
      await supabase.from("contact_info").update(formData).eq("id", existing.id);
    } else {
      await supabase.from("contact_info").insert(formData);
    }

    toast({ title: "Success", description: "Contact info saved" });
    setSaving(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="School address..."
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+63..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Office Hours</label>
            <Input
              value={formData.office_hours}
              onChange={(e) => setFormData({ ...formData, office_hours: e.target.value })}
              placeholder="Mon-Fri: 8AM-5PM"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Google Maps Embed Code</label>
            <Textarea
              value={formData.google_maps_embed}
              onChange={(e) => setFormData({ ...formData, google_maps_embed: e.target.value })}
              placeholder='<iframe src="https://www.google.com/maps/embed?..." ...'
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
