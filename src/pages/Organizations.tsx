import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Music, Palette, BookOpen, Heart, Trophy, ChevronRight, Loader2 } from "lucide-react";

interface Organization {
  id: string;
  name: string;
  type: string;
  description: string | null;
  teacher_in_charge: string | null;
  is_active: boolean | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Music,
  Palette,
  BookOpen,
  Heart,
  Trophy,
};

const getIconForOrg = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("government") || lowerName.includes("ssc") || lowerName.includes("pgo")) return Users;
  if (lowerName.includes("music") || lowerName.includes("choir") || lowerName.includes("band")) return Music;
  if (lowerName.includes("art") || lowerName.includes("culture")) return Palette;
  if (lowerName.includes("science") || lowerName.includes("math") || lowerName.includes("english") || lowerName.includes("literary")) return BookOpen;
  if (lowerName.includes("christ") || lowerName.includes("environment") || lowerName.includes("heart")) return Heart;
  if (lowerName.includes("sport") || lowerName.includes("athletic")) return Trophy;
  return Users;
};

const Organizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (!error && data) {
      setOrganizations(data);
    }
    setLoading(false);
  };

  // Group organizations by type
  const groupedOrgs = organizations.reduce((acc, org) => {
    const type = org.type || "Other";
    if (!acc[type]) acc[type] = [];
    acc[type].push(org);
    return acc;
  }, {} as Record<string, Organization[]>);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Student Organizations"
        subtitle="Join Our Vibrant School Community"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-lg text-muted-foreground">
            BCSI offers a wide range of student organizations that provide opportunities for leadership
            development, skill enhancement, and personal growth. Click on any organization to learn more
            about its members and activities.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : organizations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No organizations available at the moment.</p>
            <p className="text-sm mt-2">Check back later for updates.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedOrgs).map(([type, orgs]) => (
              <div key={type}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">{type}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {orgs.map((org) => {
                    const Icon = getIconForOrg(org.name);
                    return (
                      <Link key={org.id} to={`/organizations/${org.id}`}>
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group h-full">
                          <CardHeader>
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full group-hover:scale-110 transition-transform">
                                  <Icon className="h-6 w-6 text-primary-foreground" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <CardTitle className="text-xl font-serif flex items-center justify-between">
                                  {org.name}
                                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </CardTitle>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground line-clamp-2">
                              {org.description || "Click to learn more about this organization."}
                            </p>
                            {org.teacher_in_charge && (
                              <p className="text-sm text-primary mt-3 font-medium">
                                Adviser: {org.teacher_in_charge}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-secondary rounded-lg p-8">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4 text-center">
            How to Join
          </h3>
          <div className="max-w-3xl mx-auto text-center text-muted-foreground">
            <p className="mb-4">
              Students can join organizations during the enrollment period or at the beginning of each
              school year. Each organization holds recruitment drives and orientation sessions to welcome
              new members.
            </p>
            <p>
              For more information about specific organizations, please contact the Student Affairs Office
              or the respective organization moderators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organizations;
