import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import placeholderPerson from "@/assets/placeholder-person.jpg";

interface Personnel {
  id: string;
  name: string;
  position: string;
  department: string | null;
  description: string | null;
  photo_url: string | null;
  display_order: number | null;
}

const Personnel = () => {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    const { data } = await supabase
      .from("personnel")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (data) {
      setPersonnel(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Group personnel by department
  const administration = personnel.filter(
    (p) => p.department === "Administration" || p.position?.toLowerCase().includes("director") || p.position?.toLowerCase().includes("principal")
  );
  const teachingStaff = personnel.filter(
    (p) => p.department && !["Administration", "Support Staff"].includes(p.department) && !administration.includes(p)
  );
  const supportStaff = personnel.filter((p) => p.department === "Support Staff");

  // Group teaching staff by department
  const departments = teachingStaff.reduce((acc, person) => {
    const dept = person.department || "Other";
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(person);
    return acc;
  }, {} as Record<string, Personnel[]>);

  // Find the director (highest position)
  const director = administration.find(
    (p) => p.position?.toLowerCase().includes("director")
  );
  const otherAdmins = administration.filter((p) => p !== director);

  return (
    <div className="min-h-screen">
      <PageHeader
        title="School Personnel"
        subtitle="Meet Our Dedicated Faculty and Staff"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Administration */}
        {administration.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
              Administration
            </h2>
            
            {/* School Director - Featured at top center */}
            {director && (
              <div className="flex justify-center mb-10">
                <Card className="border-0 shadow-xl text-center max-w-sm bg-gradient-to-b from-primary/5 to-background">
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <img
                        src={director.photo_url || placeholderPerson}
                        alt={director.name}
                        className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-primary shadow-lg"
                      />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary mb-1">
                      {director.name}
                    </h3>
                    <p className="text-base font-semibold text-accent mb-3">{director.position}</p>
                    <p className="text-sm text-muted-foreground">{director.description}</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Other Administrators */}
            {otherAdmins.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {otherAdmins.map((person) => (
                  <Card key={person.id} className="border-0 shadow-lg text-center">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <img
                          src={person.photo_url || placeholderPerson}
                          alt={person.name}
                          className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary"
                        />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-primary mb-1">
                        {person.name}
                      </h3>
                      <p className="text-sm font-medium text-accent mb-3">{person.position}</p>
                      <p className="text-sm text-muted-foreground">{person.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Teaching Faculty */}
{Object.keys(departments).length > 0 && (
  <section className="mb-16">
    <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
      Teaching Faculty
    </h2>

    {Object.entries(departments).map(([deptName, teachers]) => (
      <div key={deptName} className="mb-12">
        <h3 className="text-xl font-serif font-bold text-primary mb-6 text-center">
          {deptName}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="border-0 shadow-md text-center">
              <CardContent className="p-5">
                <div className="mb-3">
                  <img
                    src={teacher.photo_url || placeholderPerson}
                    alt={teacher.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-primary"
                  />
                </div>

                <h4 className="text-sm font-serif font-bold text-primary leading-tight">
                  {teacher.name}
                </h4>

                {/* Position just like admin (gold text) */}
                <p className="text-xs font-semibold text-accent mb-1">
                  {teacher.position}
                </p>

                {/* Optional description, same style but smaller */}
                {teacher.description && (
                  <p className="text-[11px] text-muted-foreground">
                    {teacher.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    ))}
  </section>
)}


        {/* Support Staff */}
        {supportStaff.length > 0 && (
          <section>
            <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
              Support Staff
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportStaff.map((person) => (
                <Card key={person.id} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <img
                        src={person.photo_url || placeholderPerson}
                        alt={person.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary"
                      />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-primary mb-1">
                      {person.name}
                    </h3>
                    <p className="text-sm font-medium text-accent mb-2">{person.position}</p>
                    <p className="text-xs text-muted-foreground">{person.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* No personnel message */}
        {personnel.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Personnel information coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Personnel;
