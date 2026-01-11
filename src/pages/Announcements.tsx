import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Bell, AlertCircle, Megaphone, Pin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: string | null;
  is_active: boolean | null;
}

interface ImportantDate {
  id: string;
  event: string;
  date: string;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch announcements
      const { data: announcementsData } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_active", true)
        .order("date", { ascending: false });

      if (announcementsData) {
        setAnnouncements(announcementsData);
      }

      // Fetch important dates
      const { data: datesData } = await supabase
        .from("important_dates")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (datesData) {
        setImportantDates(datesData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "important":
        return <AlertCircle className="h-5 w-5" />;
      case "event":
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "important":
        return {
          badge: "bg-destructive/10 text-destructive border-destructive/20",
          icon: "bg-destructive text-destructive-foreground",
          border: "border-l-destructive",
        };
      case "event":
        return {
          badge: "bg-accent/20 text-accent-foreground border-accent/30",
          icon: "bg-accent text-accent-foreground",
          border: "border-l-accent",
        };
      default:
        return {
          badge: "bg-primary/10 text-primary border-primary/20",
          icon: "bg-primary text-primary-foreground",
          border: "border-l-primary",
        };
    }
  };

  const getTypeLabel = (type: string | null) => {
    switch (type) {
      case "important":
        return "Important";
      case "event":
        return "Event";
      case "academic":
        return "Academic";
      case "general":
        return "General";
      default:
        return "Announcement";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <PageHeader
          title="Announcements"
          subtitle="Stay Updated with School News and Events"
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Announcements"
        subtitle="Stay Updated with School News and Events"
      />

      <div className="container mx-auto px-4 py-16">
        {announcements.length === 0 && importantDates.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Announcements Yet</h3>
            <p className="text-muted-foreground">Check back later for updates and news.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Announcements */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Recent Updates
              </h3>
              {announcements.length === 0 ? (
                <Card className="border-0 shadow-md">
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No announcements at this time.</p>
                  </CardContent>
                </Card>
              ) : (
                announcements.map((announcement, index) => {
                  const styles = getTypeStyles(announcement.type || "general");
                  return (
                    <Card
                      key={announcement.id}
                      className={`border-0 shadow-md hover:shadow-lg transition-shadow border-l-4 ${styles.border} animate-fade-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div
                            className={`hidden sm:flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 ${styles.icon}`}
                          >
                            {getIcon(announcement.type || "general")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge
                                variant="outline"
                                className={`${styles.badge} text-xs font-medium`}
                              >
                                {getTypeLabel(announcement.type)}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {announcement.date}
                              </span>
                            </div>
                            <h4 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                              {announcement.title}
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {announcement.content}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>

            {/* Important Dates Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg sticky top-24 overflow-hidden">
                <div className="bg-primary p-4">
                  <h3 className="text-xl font-serif font-bold text-primary-foreground flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Important Dates
                  </h3>
                </div>
                <CardContent className="p-0">
                  {importantDates.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      No important dates at this time.
                    </div>
                  ) : (
                    <ul className="divide-y divide-border">
                      {importantDates.map((item) => (
                        <li
                          key={item.id}
                          className="p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Calendar className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground text-sm">
                                {item.event}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.date}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
