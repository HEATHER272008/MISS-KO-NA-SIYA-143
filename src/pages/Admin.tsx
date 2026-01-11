import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import PersonnelManager from "@/components/admin/PersonnelManager";
import ProgramsManager from "@/components/admin/ProgramsManager";
import ScholarshipsManager from "@/components/admin/ScholarshipsManager";
import OrganizationsManager from "@/components/admin/OrganizationsManager";
import AnnouncementsManager from "@/components/admin/AnnouncementsManager";
import HistoricalPersonnelManager from "@/components/admin/HistoricalPersonnelManager";
import { HomeContentEditor, AboutContentEditor, EnrollmentContentEditor, ContactInfoEditor } from "@/components/admin/ContentEditors";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async (userId: string) => {
      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }

      return !!roleData;
    };

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session) {
          setIsAdmin(false);
          setLoading(false);
          navigate("/login");
          return;
        }

        // Defer the admin check to avoid Supabase deadlock
        setTimeout(async () => {
          const hasAdminRole = await checkAdminRole(session.user.id);
          
          if (!hasAdminRole) {
            toast({
              title: "Access Denied",
              description: "You do not have admin privileges.",
              variant: "destructive",
            });
            setIsAdmin(false);
            setLoading(false);
            navigate("/");
            return;
          }

          setIsAdmin(true);
          setLoading(false);
        }, 0);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        setLoading(false);
        navigate("/login");
        return;
      }

      const hasAdminRole = await checkAdminRole(session.user.id);
      
      if (!hasAdminRole) {
        toast({
          title: "Access Denied",
          description: "You do not have admin privileges.",
          variant: "destructive",
        });
        setIsAdmin(false);
        setLoading(false);
        navigate("/");
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out", description: "You have been logged out successfully." });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold text-primary">BCSI Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-10 gap-2 h-auto">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="personnel">Personnel</TabsTrigger>
            <TabsTrigger value="historical">Former Leaders</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-6"><HomeContentEditor /></TabsContent>
          <TabsContent value="about" className="mt-6"><AboutContentEditor /></TabsContent>
          <TabsContent value="programs" className="mt-6"><ProgramsManager /></TabsContent>
          <TabsContent value="scholarships" className="mt-6"><ScholarshipsManager /></TabsContent>
          <TabsContent value="personnel" className="mt-6"><PersonnelManager /></TabsContent>
          <TabsContent value="historical" className="mt-6"><HistoricalPersonnelManager /></TabsContent>
          <TabsContent value="organizations" className="mt-6"><OrganizationsManager /></TabsContent>
          <TabsContent value="enrollment" className="mt-6"><EnrollmentContentEditor /></TabsContent>
          <TabsContent value="announcements" className="mt-6"><AnnouncementsManager /></TabsContent>
          <TabsContent value="contact" className="mt-6"><ContactInfoEditor /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
