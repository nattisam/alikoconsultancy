import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, FileText, MessageSquare, BookOpen, Video, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  bookings: number;
  applications: number;
  contacts: number;
  resources: number;
  webinars: number;
  testimonials: number;
  pendingBookings: number;
  pendingApplications: number;
  unreadContacts: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ bookings: 0, applications: 0, contacts: 0, resources: 0, webinars: 0, testimonials: 0, pendingBookings: 0, pendingApplications: 0, unreadContacts: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [bookings, applications, contacts, resources, webinars, testimonials, pendingB, pendingA, unread] = await Promise.all([
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("applications").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("resources").select("id", { count: "exact", head: true }),
        supabase.from("webinars").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("applications").select("id", { count: "exact", head: true }).eq("status", "submitted"),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
      ]);
      setStats({
        bookings: bookings.count || 0,
        applications: applications.count || 0,
        contacts: contacts.count || 0,
        resources: resources.count || 0,
        webinars: webinars.count || 0,
        testimonials: testimonials.count || 0,
        pendingBookings: pendingB.count || 0,
        pendingApplications: pendingA.count || 0,
        unreadContacts: unread.count || 0,
      });

      const [b, a, c] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("applications").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(5),
      ]);
      setRecentBookings(b.data || []);
      setRecentApplications(a.data || []);
      setRecentContacts(c.data || []);
    };
    fetchAll();
  }, []);

  const cards = [
    { title: "Total Bookings", value: stats.bookings, pending: stats.pendingBookings, label: "pending", icon: CalendarDays, href: "/admin/bookings", color: "text-secondary" },
    { title: "Applications", value: stats.applications, pending: stats.pendingApplications, label: "new", icon: FileText, href: "/admin/applications", color: "text-accent" },
    { title: "Messages", value: stats.contacts, pending: stats.unreadContacts, label: "unread", icon: MessageSquare, href: "/admin/contacts", color: "text-destructive" },
    { title: "Resources", value: stats.resources, pending: 0, label: "", icon: BookOpen, href: "/admin/resources", color: "text-primary" },
    { title: "Webinars", value: stats.webinars, pending: 0, label: "", icon: Video, href: "/admin/webinars", color: "text-secondary" },
    { title: "Testimonials", value: stats.testimonials, pending: 0, label: "", icon: Star, href: "/admin/testimonials", color: "text-accent" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-primary mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of your consultancy operations.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((c) => (
          <Link key={c.title} to={c.href} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <c.icon className={`w-6 h-6 ${c.color}`} />
              {c.pending > 0 && (
                <span className="bg-accent/15 text-accent text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                  {c.pending} {c.label}
                </span>
              )}
            </div>
            <p className="font-serif text-2xl font-bold text-primary">{c.value}</p>
            <p className="text-muted-foreground text-xs">{c.title}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold text-primary">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-xs text-accent hover:underline">View all</Link>
          </div>
          {recentBookings.length === 0 ? (
            <p className="text-muted-foreground text-sm">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div key={b.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-primary">{b.full_name}</p>
                    <p className="text-xs text-muted-foreground">{b.booking_code} · {b.consultation_type}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    b.status === "confirmed" ? "bg-green-100 text-green-700" :
                    b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    "bg-muted text-muted-foreground"
                  }`}>{b.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Applications */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold text-primary">Recent Applications</h2>
            <Link to="/admin/applications" className="text-xs text-accent hover:underline">View all</Link>
          </div>
          {recentApplications.length === 0 ? (
            <p className="text-muted-foreground text-sm">No applications yet.</p>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-primary">{a.full_name}</p>
                    <p className="text-xs text-muted-foreground">{a.application_code} · {a.consultation_type}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    a.status === "approved" ? "bg-green-100 text-green-700" :
                    a.status === "submitted" ? "bg-blue-100 text-blue-700" :
                    a.status === "under_review" ? "bg-yellow-100 text-yellow-700" :
                    a.status === "rejected" ? "bg-red-100 text-red-700" :
                    "bg-muted text-muted-foreground"
                  }`}>{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold text-primary">Recent Messages</h2>
            <Link to="/admin/contacts" className="text-xs text-accent hover:underline">View all</Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    {!c.is_read && <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />}
                    <div>
                      <p className="text-sm font-medium text-primary">{c.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">{c.subject}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
