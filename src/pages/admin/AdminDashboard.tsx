import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, FileText, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  bookings: number;
  applications: number;
  contacts: number;
  pendingBookings: number;
  pendingApplications: number;
  unreadContacts: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ bookings: 0, applications: 0, contacts: 0, pendingBookings: 0, pendingApplications: 0, unreadContacts: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentApplications, setRecentApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [bookings, applications, contacts, pendingB, pendingA, unread] = await Promise.all([
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("applications").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("bookings").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("applications").select("id", { count: "exact", head: true }).eq("status", "submitted"),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
      ]);
      setStats({
        bookings: bookings.count || 0,
        applications: applications.count || 0,
        contacts: contacts.count || 0,
        pendingBookings: pendingB.count || 0,
        pendingApplications: pendingA.count || 0,
        unreadContacts: unread.count || 0,
      });
    };

    const fetchRecent = async () => {
      const [b, a] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("applications").select("*").order("created_at", { ascending: false }).limit(5),
      ]);
      setRecentBookings(b.data || []);
      setRecentApplications(a.data || []);
    };

    fetchStats();
    fetchRecent();
  }, []);

  const cards = [
    { title: "Total Bookings", value: stats.bookings, pending: stats.pendingBookings, icon: CalendarDays, href: "/admin/bookings", color: "text-blue-500" },
    { title: "Applications", value: stats.applications, pending: stats.pendingApplications, icon: FileText, href: "/admin/applications", color: "text-green-500" },
    { title: "Contact Messages", value: stats.contacts, pending: stats.unreadContacts, icon: MessageSquare, href: "/admin/contacts", color: "text-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-primary mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Overview of your consultancy operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link key={c.title} to={c.href} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <c.icon className={`w-8 h-8 ${c.color}`} />
              {c.pending > 0 && (
                <span className="bg-accent/15 text-accent text-xs font-semibold px-2 py-1 rounded-full">
                  {c.pending} pending
                </span>
              )}
            </div>
            <p className="font-serif text-3xl font-bold text-primary">{c.value}</p>
            <p className="text-muted-foreground text-sm">{c.title}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-serif text-lg font-semibold text-primary mb-4">Recent Bookings</h2>
          {recentBookings.length === 0 ? (
            <p className="text-muted-foreground text-sm">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div key={b.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-primary">{b.full_name}</p>
                    <p className="text-xs text-muted-foreground">{b.booking_code} - {b.consultation_type}</p>
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

        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-serif text-lg font-semibold text-primary mb-4">Recent Applications</h2>
          {recentApplications.length === 0 ? (
            <p className="text-muted-foreground text-sm">No applications yet.</p>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-primary">{a.full_name}</p>
                    <p className="text-xs text-muted-foreground">{a.application_code} - {a.consultation_type}</p>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
