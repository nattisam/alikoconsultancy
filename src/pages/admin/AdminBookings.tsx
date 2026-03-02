import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Booking = Tables<"bookings">;

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const { toast } = useToast();

  const fetchBookings = async () => {
    let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") query = query.eq("status", statusFilter as any);
    const { data } = await query;
    setBookings(data || []);
  };

  useEffect(() => { fetchBookings(); }, [statusFilter]);

  const updateBooking = async () => {
    if (!selected) return;
    const updates: any = {};
    if (newStatus) updates.status = newStatus;
    if (adminNotes !== (selected.admin_notes || "")) updates.admin_notes = adminNotes;
    
    const { error } = await supabase.from("bookings").update(updates).eq("id", selected.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Booking Updated" });
      setSelected(null);
      fetchBookings();
    }
  };

  const filtered = bookings.filter((b) =>
    b.full_name.toLowerCase().includes(search.toLowerCase()) ||
    b.booking_code.toLowerCase().includes(search.toLowerCase()) ||
    b.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-primary mb-1">Bookings</h1>
        <p className="text-muted-foreground text-sm">Manage consultation bookings.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name, code, or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="no_show">No Show</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium text-muted-foreground">Code</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Time</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-t border-border hover:bg-muted/20">
                  <td className="p-3 font-mono text-xs">{b.booking_code}</td>
                  <td className="p-3">{b.full_name}</td>
                  <td className="p-3 capitalize">{b.consultation_type}</td>
                  <td className="p-3">{b.booking_date}</td>
                  <td className="p-3">{b.start_time}</td>
                  <td className="p-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      b.status === "confirmed" ? "bg-green-100 text-green-700" :
                      b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      b.status === "cancelled" ? "bg-red-100 text-red-700" :
                      "bg-muted text-muted-foreground"
                    }`}>{b.status}</span>
                  </td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => { setSelected(b); setAdminNotes(b.admin_notes || ""); setNewStatus(b.status); }}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No bookings found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Booking Details</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Code:</span> <span className="font-mono">{selected.booking_code}</span></div>
                <div><span className="text-muted-foreground">Name:</span> {selected.full_name}</div>
                <div><span className="text-muted-foreground">Email:</span> {selected.email}</div>
                <div><span className="text-muted-foreground">Phone:</span> {selected.phone || "N/A"}</div>
                <div><span className="text-muted-foreground">Type:</span> <span className="capitalize">{selected.consultation_type}</span></div>
                <div><span className="text-muted-foreground">Date:</span> {selected.booking_date}</div>
                <div><span className="text-muted-foreground">Time:</span> {selected.start_time} - {selected.end_time}</div>
              </div>
              {selected.notes && (
                <div><span className="text-sm text-muted-foreground">Client Notes:</span><p className="text-sm mt-1">{selected.notes}</p></div>
              )}
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger><SelectValue placeholder="Update status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="no_show">No Show</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Admin notes..." value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} />
              <Button onClick={updateBooking} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookings;
