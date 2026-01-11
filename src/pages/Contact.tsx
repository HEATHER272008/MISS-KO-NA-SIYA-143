import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContactInfo {
  address: string | null;
  phone: string | null;
  email: string | null;
  office_hours: string | null;
  google_maps_embed: string | null;
}

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const { data } = await supabase
        .from("contact_info")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (data) {
        setContactInfo(data);
      }
      setLoading(false);
    };

    fetchContactInfo();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("This is a placeholder form. In production, this would send your message.");
  };

  // Default values if no data from database
  const address = contactInfo?.address || "Barangay Poblacion, Binmaley, Pangasinan, Philippines\nBinmaley, Pangasinan\nPhilippines 2417";
  const phone = contactInfo?.phone || "(075) 540-0145\nMobile: +63 910 088 9436";
  const email = contactInfo?.email || "binmaleycs@yahoo.com";
  const officeHours = contactInfo?.office_hours || "Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 8:00 AM - 12:00 PM\nSunday: Closed";
  const googleMapsEmbed = contactInfo?.google_maps_embed;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Contact Us"
        subtitle="Get in Touch with BCSI"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-8">
              Contact Information
            </h2>

            <div className="space-y-6 mb-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-primary mb-2">Address</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-primary mb-2">Phone</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {phone}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-primary mb-2">Email</h3>
                      <p className="text-muted-foreground">
                        {email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-primary mb-2">Office Hours</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {officeHours}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full flex-shrink-0">
                      <Facebook className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-primary mb-2">Social Media</h3>
                      <a href="#" className="text-primary hover:text-accent transition-colors">
                        Facebook: Binmaley Catholic School
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary mb-8">
              Send Us a Message
            </h2>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+63 917 123 4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Enter your message here..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * This is a placeholder form. For immediate assistance, please call or email us directly.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16">
          <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
            Visit Our Campus
          </h2>
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              {googleMapsEmbed ? (
                <div 
                  className="h-96 w-full"
                  dangerouslySetInnerHTML={{ __html: googleMapsEmbed }}
                />
              ) : (
                <div className="bg-secondary h-96 flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg mb-2">
                      [Google Maps Embed Placeholder]
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Add a Google Maps embed code in the admin panel to show the school location
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
