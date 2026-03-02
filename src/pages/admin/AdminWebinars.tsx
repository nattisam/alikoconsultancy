import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Webinar = Tables<"webinars">;

const AdminWebinars = () => {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [editing, setEditing] = useState<Partial<Webinar> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("webinars").select("*").order("created_at", { ascending: false });
    setWebinars(data || []);
  };

  useEffect(() => { fetch(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      title: editing.title!, slug: editing.slug!, description: editing.description || "",
      webinar_url: editing.webinar_url || null, scheduled_at: editing.scheduled_at || null,
      duration_minutes: editing.duration_minutes || null, is_published: editing.is_published || false,
      is_free: editing.is_free ?? true,
    };
    const { error } = isNew
      ? await supabase.from("webinars").insert(payload as any)
      : await supabase.from("webinars").update(payload).eq("id", editing.id!);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: isNew ? "Webinar Created" : "Webinar Updated" }); setEditing(null); fetch(); }
  };

  const remove = async (id: string) => {
    await supabase.from("webinars").delete().eq("id", id);
    toast({ title: "Webinar Deleted" }); fetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary mb-1">Webinars</h1>
          <p className="text-muted-foreground text-sm">Manage webinar listings.</p>
        </div>
        <Button onClick={() => { setEditing({ title: "", slug: "", is_published: false, is_free: true }); setIsNew(true); }} className="bg-gold text-navy hover:bg-gold/90 font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Add Webinar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {webinars.map((w) => (
          <div key={w.id} className="bg-card border border-border rounded-xl p-5">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${w.is_published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
              {w.is_published ? "Published" : "Draft"}
            </span>
            <h3 className="font-semibold text-primary mt-3 mb-1">{w.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{w.description}</p>
            {w.scheduled_at && <p className="text-xs text-muted-foreground">Scheduled: {new Date(w.scheduled_at).toLocaleDateString()}</p>}
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" onClick={() => { setEditing(w); setIsNew(false); }}><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => remove(w.id)} className="text-destructive"><Trash2 className="w-3 h-3" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{isNew ? "New Webinar" : "Edit Webinar"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <Input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} />
              <Input placeholder="Slug" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              <Textarea placeholder="Description" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              <Input placeholder="Webinar URL" value={editing.webinar_url || ""} onChange={(e) => setEditing({ ...editing, webinar_url: e.target.value })} />
              <Input type="datetime-local" value={editing.scheduled_at ? new Date(editing.scheduled_at).toISOString().slice(0, 16) : ""} onChange={(e) => setEditing({ ...editing, scheduled_at: e.target.value })} />
              <Input type="number" placeholder="Duration (minutes)" value={editing.duration_minutes || ""} onChange={(e) => setEditing({ ...editing, duration_minutes: parseInt(e.target.value) || null })} />
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2"><Switch checked={editing.is_published || false} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} /><span className="text-sm">Published</span></div>
                <div className="flex items-center gap-2"><Switch checked={editing.is_free ?? true} onCheckedChange={(v) => setEditing({ ...editing, is_free: v })} /><span className="text-sm">Free</span></div>
              </div>
              <Button onClick={save} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">Save</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminWebinars;
