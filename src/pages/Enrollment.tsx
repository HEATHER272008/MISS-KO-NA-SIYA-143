import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ClipboardList, IdCard, Palette, Compass, BookOpen, Shirt, Building, Gift, Sparkles, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Enrollment = () => {
  const enrollmentSteps = [
    {
      step: 1,
      icon: FileText,
      title: "Secure and Fill Out Enrollment Form",
      description: "Get your enrollment form from the Registrar's Office or from the SHS listing representatives.",
      note: "Don't forget to bring your enrollment requirements: SF 9 or Progress Report Card in Grade 10, photocopy of your PSA birth certificate, and photocopy of your baptismal certificate.",
    },
    {
      step: 2,
      icon: ClipboardList,
      title: "Proceed to the Encoding Section",
      description: "Have your information encoded into the system.",
    },
    {
      step: 3,
      icon: IdCard,
      title: "Claim Your Registration ID",
      description: "Proceed to the registration ID section to claim your registration ID number.",
      note: "Issuance of registration ID will be announced in the official group chat of the Grade 11 students.",
    },
    {
      step: 4,
      icon: Palette,
      title: "Visit the Electives' Gallery",
      description: "Explore the learning areas you may take in preparation for your career.",
    },
    {
      step: 5,
      icon: Compass,
      title: "Career Guidance Section",
      description: "Accomplish your career map and study plan with guidance from faculty members based on your career preference.",
    },
    {
      step: 6,
      icon: BookOpen,
      title: "Finalize Your Electives",
      description: "Fill out the elective form and accomplish your class cards for your chosen electives.",
    },
    {
      step: 7,
      icon: Shirt,
      title: "Uniform Section",
      description: "Proceed to the uniform section for the listing of sizes for your free set of uniform.",
    },
    {
      step: 8,
      icon: Building,
      title: "Visit Other School Offices",
      description: "You may visit other school offices for other purposes (e.g. library for book rentals and treasurer's office for accounts inquiries).",
    },
  ];

  const careerGuidanceFaculty = [
    { area: "Social Science", faculty: "Ma'am Lovely T. Arenas" },
    { area: "Humanities", faculty: "Ma'am Cindy B. Ugaban" },
    { area: "Mathematics", faculty: "Sir Alexis M. De Guzman" },
    { area: "Science", faculty: "Ma'am Mary Elizabeth M. Cruz" },
    { area: "Business and Accountancy", faculty: "Ma'am Merlita A. Liwanag" },
    { area: "Technical Professional", faculty: "Sir Marvin G. Cayabyab" },
    { area: "Sports", faculty: "Ma'am Divine Anna Mae De Guzman" },
  ];

  const offers = [
    {
      icon: Gift,
      title: "Incoming Grade 11 from Public Schools",
      benefits: "Free registration, tuition and other fees",
    },
    {
      icon: Gift,
      title: "Incoming Grade 11 from Private Schools",
      benefits: "Free registration and other fees",
    },
    {
      icon: Shirt,
      title: "All Incoming Grade 11 Students",
      benefits: "Free Uniform",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        title="How to Enroll?"
        subtitle="Your Step-by-Step Guide to Joining BCSI Senior High School"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Enrollment Steps */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Enrollment Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to complete your enrollment at BCSI Senior High School.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {enrollmentSteps.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-stretch">
                    <div className="bg-primary text-primary-foreground flex items-center justify-center px-6 py-8 min-w-[80px]">
                      <span className="text-3xl font-bold">{item.step}</span>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <item.icon className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-serif font-bold text-primary">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">{item.description}</p>
                      {item.note && (
                        <div className="mt-3 flex items-start gap-2 bg-muted/50 rounded-lg p-3">
                          <AlertCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground italic">{item.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Career Guidance Faculty */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1">
              Step 5 Details
            </Badge>
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Career Guidance Faculty
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kindly look for the following faculty members to assist you based on your career preference:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {careerGuidanceFaculty.map((item, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <p className="font-semibold text-primary mb-1">{item.area}</p>
                  <p className="text-sm text-muted-foreground">{item.faculty}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground">
            <div className="text-center mb-8">
              <Sparkles className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-serif font-bold mb-2">
                Enroll Now and Avail Our Offers!
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {offers.map((offer, index) => (
                <div key={index} className="bg-primary-foreground/10 backdrop-blur rounded-xl p-6 text-center">
                  <offer.icon className="h-10 w-10 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{offer.title}</h3>
                  <p className="text-sm opacity-90">{offer.benefits}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Welcome Message */}
        <section className="text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">
              Experience It First, In BCSI!
            </h2>
            <p className="text-xl text-muted-foreground">
              Welcome to BCSI Senior High, Gleaming in Competence and Excellence!
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <div className="mt-16 bg-secondary rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">
            Need Assistance?
          </h3>
          <p className="text-muted-foreground mb-2">
            For inquiries and assistance with enrollment, please contact:
          </p>
          <p className="text-primary font-medium">
            Registrar's Office
          </p>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
