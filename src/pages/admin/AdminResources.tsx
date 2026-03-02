import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Resource = Tables<"resources">;

const emptyResource = { title: "", slug: "", description: "", resource_type: "article" as const, consultation_type: "" as any, is_published: false, thumbnail_url: "" };

const AdminResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [editing, setEditing] = useState<Partial<Resource> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const fetchResources = async () => {
    const { data } = await supabase.from("resources").select("*").order("created_at", { ascending: false });
    setResources(data || []);
  };

  useEffect(() => { fetchResources(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      title: editing.title!,
      slug: editing.slug!,
      description: editing.description || "",
      resource_type: editing.resource_type!,
      consultation_type: editing.consultation_type || null,
      is_published: editing.is_published || false,
      thumbnail_url: editing.thumbnail_url || null,
    };

    const { error } = isNew
      ? await supabase.from("resources").insert(payload as any)
      : await supabase.from("resources").update(payload).eq("id", editing.id!);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isNew ? "Resource Created" : "Resource Updated" });
      setEditing(null);
      fetchResources();
    }
  };

  const remove = async (id: string) => {
    await supabase.from("resources").delete().eq("id", id);
    toast({ title: "Resource Deleted" });
    fetchResources();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary mb-1">Resources</h1>
          <p className="text-muted-foreground text-sm">Manage articles, guides, checklists, and templates.</p>
        </div>
        <Button onClick={() => { setEditing(emptyResource); setIsNew(true); }} className="bg-gold text-navy hover:bg-gold/90 font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Add Resource
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r) => (
          <div key={r.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${r.is_published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                {r.is_published ? "Published" : "Draft"}
              </span>
              <span className="text-xs text-muted-foreground capitalize">{r.resource_type}</span>
            </div>
            <h3 className="font-semibold text-primary mb-1">{r.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{r.description}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => { setEditing(r); setIsNew(false); }}><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => remove(r.id)} className="text-destructive"><Trash2 className="w-3 h-3" /></Button>
            </div>
          </div>
        ))}
        {resources.length === 0 && <p className="text-muted-foreground col-span-full text-center py-12">No resources yet.</p>}
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{isNew ? "New Resource" : "Edit Resource"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <Input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} />
              <Input placeholder="Slug" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              <Textarea placeholder="Description" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
              <Select value={editing.resource_type || "article"} onValueChange={(v) => setEditing({ ...editing, resource_type: v as any })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                  <SelectItem value="checklist">Checklist</SelectItem>
                  <SelectItem value="template">Template</SelectItem>
                </SelectContent>
              </Select>
              <Select value={editing.consultation_type || ""} onValueChange={(v) => setEditing({ ...editing, consultation_type: v as any })}>
                <SelectTrigger><SelectValue placeholder="Category (optional)" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-3">
                <Switch checked={editing.is_published || false} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} />
                <span className="text-sm">Published</span>
              </div>
              <Button onClick={save} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">Save</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminResources;
