import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import placeholderPerson from "@/assets/placeholder-person.jpg";

interface HistoricalPersonnel {
  id: string;
  name: string;
  position: string;
  years: string | null;
  photo_url: string | null;
  category: string;
}

interface AboutContent {
  history: string | null;
  mission_new: string | null;
  vision_new: string | null;
  core_values: { name: string; description: string }[] | null;
  campus_map_url: string | null;
}

const About = () => {
  const [directors, setDirectors] = useState<HistoricalPersonnel[]>([]);
  const [shsPrincipals, setShsPrincipals] = useState<HistoricalPersonnel[]>([]);
  const [jhsPrincipals, setJhsPrincipals] = useState<HistoricalPersonnel[]>([]);
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch historical personnel
    const { data: personnelData } = await supabase
      .from("historical_personnel")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (personnelData) {
      setDirectors(personnelData.filter((p) => p.category === "director"));
      setShsPrincipals(personnelData.filter((p) => p.category === "shs_principal"));
      setJhsPrincipals(personnelData.filter((p) => p.category === "jhs_principal"));
    }

    // Fetch about content
    const { data: aboutData } = await supabase
      .from("about_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (aboutData) {
      setContent({
        history: aboutData.history,
        mission_new: aboutData.mission_new,
        vision_new: aboutData.vision_new,
        core_values: aboutData.core_values as { name: string; description: string }[] | null,
        campus_map_url: aboutData.campus_map_url,
      });
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

  const defaultHistory = `Binmaley Catholic School, Inc. was founded with a vision to provide quality Catholic
    education to the youth of Binmaley and surrounding communities. Since our establishment,
    we have remained committed to our founding principles of academic excellence, moral
    integrity, and spiritual growth.`;

  const defaultMission = `To provide quality Catholic education that nurtures the spiritual, intellectual,
    and social development of every student, empowering them to become responsible
    citizens and effective leaders guided by Christian values.`;

  const defaultVision = `To be a premier Catholic educational institution recognized for academic excellence,
    strong moral foundation, and producing graduates who are competent, compassionate,
    and committed to serving God and community.`;

  const defaultCoreValues = [
    { name: "Solidarity ", description: "As part of the 16 Catholic Schools of the Archdiocese that are unique in various and varied ways, BCSI commits to ONE ALDCS, fostering Unity in Diversity! The school acknowledge individual differences, and celebrate “Communio” in forming Christian stewards through Holistic Catholic Education and Formation. s" },
    { name: "Discipleship ", description: "As a member school of ALDCS, BCSI nurture the spirituality of stewardship, that is, to be Christian Catholic disciples of the earth and of one another. We believe that we are called by God to be his collaborators in the work of creation, salvation, and sanctification. As Christian stewards, we receive God’s graces gratefully and cultivate them. As brothers and sisters under the Fatherhood of God, we share our time, talents, and treasures for His greater glory. As followers of Christ, we make others see Jesus in our lives and make others feel His selfless love for all through us, ushering in the kingdom of God. " },
    { name: "Character", description: "In forming Christian Stewards, ALDCS hones young men and women to be living witnesses of the Word made flesh with the integration of the Gospel values in faith and life. We join hands in our noble task of producing alter “Christus” as reflected in our vision – mission statement. In addition, we provide quality education in the pursuit of academic excellence among our Learners in order to produce morally upright thinking, feeling, praying, and doing members of the church and society" },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="About BCSI"
        subtitle="Our History, Mission, and Vision"
      />

      <div className="container mx-auto px-4 py-16">
        {/* History */}
        <section className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our History</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="whitespace-pre-line">{content?.history || defaultHistory}</p>
          </div>
        </section>

        {/* Former School Directors */}
        {directors.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Former School Directors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {directors.map((director) => (
                <Card key={director.id} className="border-0 shadow-md text-center">
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <img
                        src={director.photo_url || placeholderPerson}
                        alt={director.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary"
                      />
                    </div>
                    <h4 className="font-semibold text-foreground text-sm">{director.name}</h4>
                    <p className="text-xs text-muted-foreground">{director.years}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Former Principals */}
        {(shsPrincipals.length > 0 || jhsPrincipals.length > 0) && (
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">Former Principals</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* SHS Principals */}
              {shsPrincipals.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif font-semibold text-primary mb-4">Senior High School</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {shsPrincipals.map((principal) => (
                      <Card key={principal.id} className="border-0 shadow-md text-center">
                        <CardContent className="p-4">
                          <div className="mb-3">
                            <img
                              src={principal.photo_url || placeholderPerson}
                              alt={principal.name}
                              className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-primary"
                            />
                          </div>
                          <h4 className="font-semibold text-foreground text-sm">{principal.name}</h4>
                          <p className="text-xs text-muted-foreground">{principal.years}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* JHS Principals */}
              {jhsPrincipals.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif font-semibold text-primary mb-4">Junior High School</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {jhsPrincipals.map((principal) => (
                      <Card key={principal.id} className="border-0 shadow-md text-center">
                        <CardContent className="p-4">
                          <div className="mb-3">
                            <img
                              src={principal.photo_url || placeholderPerson}
                              alt={principal.name}
                              className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-primary"
                            />
                          </div>
                          <h4 className="font-semibold text-foreground text-sm">{principal.name}</h4>
                          <p className="text-xs text-muted-foreground">{principal.years}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Mission, Vision, Core Values */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Mission</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {content?.mission_new || defaultMission}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Vision</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {content?.vision_new || defaultVision}
                </p>
              </CardContent>
            </Card>

            
          </div>
        </section>

        {/* Campus Map */}
        <section>
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Campus Map</h2>
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              {content?.campus_map_url ? (
                content.campus_map_url.includes("<iframe") ? (
                  <div dangerouslySetInnerHTML={{ __html: content.campus_map_url }} className="w-full h-96" />
                ) : (
                  <img src={content.campus_map_url} alt="Campus Map" className="w-full h-96 object-cover" />
                )
              ) : (
                <div className="bg-secondary h-96 flex items-center justify-center">
                  <p className="text-muted-foreground text-lg">
                    Campus map coming soon
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Our campus features modern classrooms, a well-equipped library, science laboratories,
            computer rooms, chapel, sports facilities, and spacious grounds for student activities.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
