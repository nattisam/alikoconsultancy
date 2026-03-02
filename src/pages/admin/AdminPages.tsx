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

type Page = Tables<"pages">;

const AdminPages = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [editing, setEditing] = useState<Partial<Page> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("pages").select("*").order("created_at", { ascending: false });
    setPages(data || []);
  };

  useEffect(() => { fetch(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      title: editing.title!, slug: editing.slug!,
      meta_title: editing.meta_title || null, meta_description: editing.meta_description || null,
      is_published: editing.is_published || false,
    };
    const { error } = isNew
      ? await supabase.from("pages").insert(payload as any)
      : await supabase.from("pages").update(payload).eq("id", editing.id!);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: isNew ? "Page Created" : "Page Updated" }); setEditing(null); fetch(); }
  };

  const remove = async (id: string) => {
    await supabase.from("pages").delete().eq("id", id);
    toast({ title: "Page Deleted" }); fetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary mb-1">Pages</h1>
          <p className="text-muted-foreground text-sm">Manage CMS pages.</p>
        </div>
        <Button onClick={() => { setEditing({ title: "", slug: "", is_published: false }); setIsNew(true); }} className="bg-gold text-navy hover:bg-gold/90 font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Add Page
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-medium text-muted-foreground">Title</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Slug</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
              <th className="text-right p-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id} className="border-t border-border hover:bg-muted/20">
                <td className="p-3 font-medium">{p.title}</td>
                <td className="p-3 text-muted-foreground">/{p.slug}</td>
                <td className="p-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${p.is_published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                    {p.is_published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-3 text-right flex gap-1 justify-end">
                  <Button size="sm" variant="outline" onClick={() => { setEditing(p); setIsNew(false); }}><Pencil className="w-3 h-3" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(p.id)} className="text-destructive"><Trash2 className="w-3 h-3" /></Button>
                </td>
              </tr>
            ))}
            {pages.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No pages yet.</td></tr>}
          </tbody>
        </table>
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{isNew ? "New Page" : "Edit Page"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <Input placeholder="Title" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: isNew ? e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") : editing.slug })} />
              <Input placeholder="Slug" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
              <Input placeholder="Meta Title" value={editing.meta_title || ""} onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })} />
              <Textarea placeholder="Meta Description" value={editing.meta_description || ""} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} />
              <div className="flex items-center gap-3"><Switch checked={editing.is_published || false} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} /><span className="text-sm">Published</span></div>
              <Button onClick={save} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">Save</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPages;
