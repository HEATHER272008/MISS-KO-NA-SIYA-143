import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Globe, GraduationCap, Briefcase, Calendar, CheckCircle, Lightbulb, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Programs = () => {
  const juniorHighHighlights = [
    {
      icon: BookOpen,
      title: "Simplified Core Subjects",
      description: "Streamlined subjects focusing on essential competencies: English, Filipino, Math, Science, and Araling Panlipunan.",
    },
    {
      icon: Lightbulb,
      title: "Integrated Learning",
      description: "Connected learning experiences across subjects with emphasis on 21st-century skills.",
    },
    {
      icon: Users,
      title: "Values Formation",
      description: "Strong focus on character development through Edukasyon sa Pagpapakatao (EsP) and community engagement.",
    },
    {
      icon: Briefcase,
      title: "Exploratory Subjects",
      description: "Technology and Livelihood Education (TLE) and MAPEH to discover interests and talents.",
    },
  ];

  const keyHighlights = [
    {
      icon: BookOpen,
      title: "Simplified Core Subjects",
      description: "Only 5 main subjects for the full year, focusing on communication, math, science, life skills, and Philippine history.",
    },
    {
      icon: Lightbulb,
      title: "Flexible Tracks & Electives",
      description: "Two main tracks—Academic and Technical-Professional—with electives students can choose across clusters.",
    },
    {
      icon: Briefcase,
      title: "Enhanced Work Immersion",
      description: "Expanded real-world training opportunities, starting as early as Grade 11.",
    },
    {
      icon: CheckCircle,
      title: "Less Congested, More Relevant",
      description: "Fewer subjects, more time for mastery, and skills that align with the workforce and higher education.",
    },
  ];

  const tracks = [
    {
      icon: GraduationCap,
      name: "Academic Track",
      description: "For students planning to pursue higher education. Includes strands like STEM, ABM, HUMSS, and GAS with specialized subjects preparing students for college.",
    },
    {
      icon: Users,
      name: "Technical-Professional Track",
      description: "For students who want to develop job-ready skills. Includes strands in Arts & Design, Sports, and Technical-Vocational-Livelihood (TVL).",
    },
  ];

  const timeline = [
    {
      year: "SY 2025–2026",
      description: "Pilot in selected schools",
    },
    {
      year: "SY 2026–2028",
      description: "Gradual nationwide rollout",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Academic Programs"
        subtitle="Junior High School and Senior High School Programs"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Junior High School - Strengthened Curriculum */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1">
              📢 New Curriculum
            </Badge>
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              Strengthened JHS Curriculum
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The Department of Education (DepEd) has updated the Junior High School curriculum with 
              streamlined subjects and enhanced focus on essential competencies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {juniorHighHighlights.map((highlight, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardHeader className="pb-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3 mx-auto">
                    <highlight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Senior High School - Strengthened Curriculum */}
        <section>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1">
              📢 New Curriculum
            </Badge>
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              Strengthened SHS Curriculum
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The Department of Education (DepEd) has updated the Senior High School curriculum to better 
              prepare students for college, careers, and life skills.
            </p>
          </div>

          {/* Key Highlights */}
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-semibold text-center mb-8">Key Highlights</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyHighlights.map((highlight, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <CardHeader className="pb-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3 mx-auto">
                      <highlight.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tracks */}
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-semibold text-center mb-8">Two Main Tracks</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {tracks.map((track, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-full mb-4">
                      <track.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-2xl font-serif">{track.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{track.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Implementation Timeline */}
          <div className="bg-muted/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Calendar className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-serif font-semibold">Implementation Timeline</h3>
            </div>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-background rounded-lg p-4 shadow-sm">
                  <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-primary">{item.year}:</span>
                    <span className="ml-2 text-muted-foreground">{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center mt-6 text-muted-foreground italic">
              The strengthened curriculum ensures students are better prepared, more flexible, and future-ready.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Programs;
