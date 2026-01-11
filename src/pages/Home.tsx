import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Heart, Users, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroImageFallback from "@/assets/school-building.jpg";
import studentsImage from "@/assets/1768133665098.jpg";

interface HomeContent {
  hero_title: string;
  hero_subtitle: string | null;
  hero_image_url: string | null;
  why_choose_title: string;
}

const Home = () => {
  const [content, setContent] = useState<HomeContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("home_content")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (data) {
        setContent(data);
      }
    };

    fetchContent();
  }, []);

  const highlights = [
    {
      icon: GraduationCap,
      title: "Academic Excellence",
      description: "Comprehensive Junior and Senior High School programs with proven track record.",
    },
    {
      icon: Heart,
      title: "Catholic Values",
      description: "Faith-centered education that nurtures spiritual growth and moral development.",
    },
    {
      icon: Users,
      title: "Active Community",
      description: "Vibrant student organizations and extracurricular activities for holistic development.",
    },
    {
      icon: BookOpen,
      title: "Scholarship Programs",
      description: "Financial assistance opportunities to make quality education accessible to all.",
    },
  ];

  const heroTitle = content?.hero_title || "Welcome to Binmaley Catholic School";
  const heroSubtitle = content?.hero_subtitle || "Nurturing minds, hearts, and souls through excellence in Catholic education.";
  const heroImage = content?.hero_image_url || heroImageFallback;
  const whyChooseTitle = content?.why_choose_title || "Why Choose BCSI?";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="BCSI Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-primary-foreground">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              {heroTitle}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/enrollment">
                <Button size="lg" variant="secondary" className="text-lg">
                  Enroll Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="text-lg bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">
                Excellence in Catholic Education
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Binmaley Catholic School, Inc. (BCSI) is a leading Catholic educational institution
                committed to providing quality education grounded in Christian values. Our mission
                is to develop well-rounded individuals who excel academically, spiritually, and socially.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                With a rich history of academic excellence and a dedicated community of educators,
                we prepare our students for success in higher education and life beyond the classroom.
              </p>
              <Link to="/about">
                <Button variant="default">Discover Our Story</Button>
              </Link>
            </div>
            <div>
              <img
                src={studentsImage}
                alt="Students at BCSI"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold text-primary text-center mb-12">
            {whyChooseTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                    <highlight.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3 text-primary">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Join the BCSI Family Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Start your journey towards academic excellence and spiritual growth. Enrollment for the
            upcoming school year is now open.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/enrollment">
              <Button size="lg" variant="secondary" className="text-lg">
                View Enrollment Process
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
