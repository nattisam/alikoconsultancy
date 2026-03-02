import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, Eye, Download } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Application = Tables<"applications">;

const AdminApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [statusLog, setStatusLog] = useState<any[]>([]);
  const [adminNotes, setAdminNotes] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const { toast } = useToast();

  const fetchApplications = async () => {
    let query = supabase.from("applications").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") query = query.eq("status", statusFilter as any);
    const { data } = await query;
    setApplications(data || []);
  };

  useEffect(() => { fetchApplications(); }, [statusFilter]);

  const openDetail = async (app: Application) => {
    setSelected(app);
    setAdminNotes(app.admin_notes || "");
    setNewStatus(app.status);
    const [docs, logs] = await Promise.all([
      supabase.from("application_documents").select("*").eq("application_id", app.id),
      supabase.from("application_status_log").select("*").eq("application_id", app.id).order("created_at", { ascending: false }),
    ]);
    setDocuments(docs.data || []);
    setStatusLog(logs.data || []);
  };

  const updateApplication = async () => {
    if (!selected) return;
    const updates: any = { admin_notes: adminNotes };
    if (newStatus !== selected.status) updates.status = newStatus;

    const { error } = await supabase.from("applications").update(updates).eq("id", selected.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Application Updated" });
      setSelected(null);
      fetchApplications();
    }
  };

  const filtered = applications.filter((a) =>
    a.full_name.toLowerCase().includes(search.toLowerCase()) ||
    a.application_code.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-primary mb-1">Applications</h1>
        <p className="text-muted-foreground text-sm">Review and manage applications.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="waitlisted">Waitlisted</SelectItem>
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
                <th className="text-left p-3 font-medium text-muted-foreground">Email</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Type</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-3 font-medium text-muted-foreground">Date</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-t border-border hover:bg-muted/20">
                  <td className="p-3 font-mono text-xs">{a.application_code}</td>
                  <td className="p-3">{a.full_name}</td>
                  <td className="p-3">{a.email}</td>
                  <td className="p-3 capitalize">{a.consultation_type}</td>
                  <td className="p-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      a.status === "approved" ? "bg-green-100 text-green-700" :
                      a.status === "submitted" ? "bg-blue-100 text-blue-700" :
                      a.status === "under_review" ? "bg-yellow-100 text-yellow-700" :
                      a.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-muted text-muted-foreground"
                    }`}>{a.status}</span>
                  </td>
                  <td className="p-3 text-xs">{new Date(a.created_at).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => openDetail(a)}><Eye className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Application Details</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Code:</span> <span className="font-mono">{selected.application_code}</span></div>
                <div><span className="text-muted-foreground">Name:</span> {selected.full_name}</div>
                <div><span className="text-muted-foreground">Email:</span> {selected.email}</div>
                <div><span className="text-muted-foreground">Phone:</span> {selected.phone || "N/A"}</div>
                <div><span className="text-muted-foreground">Type:</span> <span className="capitalize">{selected.consultation_type}</span></div>
                <div><span className="text-muted-foreground">Submitted:</span> {new Date(selected.created_at).toLocaleDateString()}</div>
              </div>

              {selected.form_data && Object.keys(selected.form_data as object).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Form Data</h3>
                  <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                    {Object.entries(selected.form_data as Record<string, string>).map(([key, value]) => (
                      <div key={key}><span className="text-muted-foreground capitalize">{key.replace(/_/g, " ")}:</span> {value}</div>
                    ))}
                  </div>
                </div>
              )}

              {documents.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Documents ({documents.length})</h3>
                  <div className="space-y-2">
                    {documents.map((d) => (
                      <div key={d.id} className="flex items-center justify-between bg-muted/30 rounded-lg p-2 text-sm">
                        <span>{d.file_name}</span>
                        <Button size="sm" variant="ghost"><Download className="w-4 h-4" /></Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {statusLog.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2">Status History</h3>
                  <div className="space-y-2">
                    {statusLog.map((log) => (
                      <div key={log.id} className="flex items-center gap-3 text-xs">
                        <span className="text-muted-foreground">{new Date(log.created_at).toLocaleString()}</span>
                        <span>{log.old_status || "new"} → {log.new_status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger><SelectValue placeholder="Update status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="waitlisted">Waitlisted</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Admin notes..." value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} />
              <Button onClick={updateApplication} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminApplications;
