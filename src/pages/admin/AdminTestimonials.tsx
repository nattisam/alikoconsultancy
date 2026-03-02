import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Testimonial = Tables<"testimonials">;

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("display_order");
    setTestimonials(data || []);
  };

  useEffect(() => { fetch(); }, []);

  const save = async () => {
    if (!editing) return;
    const payload = {
      author_name: editing.author_name!, quote: editing.quote!, author_role: editing.author_role || null,
      consultation_type: editing.consultation_type || null, rating: editing.rating || null,
      is_published: editing.is_published || false, display_order: editing.display_order || 0,
    };
    const { error } = isNew
      ? await supabase.from("testimonials").insert(payload as any)
      : await supabase.from("testimonials").update(payload).eq("id", editing.id!);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: isNew ? "Testimonial Created" : "Testimonial Updated" }); setEditing(null); fetch(); }
  };

  const remove = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    toast({ title: "Testimonial Deleted" }); fetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary mb-1">Testimonials</h1>
          <p className="text-muted-foreground text-sm">Manage client testimonials.</p>
        </div>
        <Button onClick={() => { setEditing({ author_name: "", quote: "", is_published: false, display_order: 0 }); setIsNew(true); }} className="bg-gold text-navy hover:bg-gold/90 font-semibold">
          <Plus className="w-4 h-4 mr-2" /> Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.is_published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                {t.is_published ? "Published" : "Draft"}
              </span>
              {t.rating && <div className="flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}</div>}
            </div>
            <p className="text-sm italic text-foreground mb-3">"{t.quote}"</p>
            <p className="text-sm font-semibold">{t.author_name}</p>
            <p className="text-xs text-muted-foreground">{t.author_role}</p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline" onClick={() => { setEditing(t); setIsNew(false); }}><Pencil className="w-3 h-3 mr-1" /> Edit</Button>
              <Button size="sm" variant="ghost" onClick={() => remove(t.id)} className="text-destructive"><Trash2 className="w-3 h-3" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{isNew ? "New Testimonial" : "Edit Testimonial"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <Input placeholder="Author Name" value={editing.author_name || ""} onChange={(e) => setEditing({ ...editing, author_name: e.target.value })} />
              <Input placeholder="Author Role (e.g. Startup Founder)" value={editing.author_role || ""} onChange={(e) => setEditing({ ...editing, author_role: e.target.value })} />
              <Textarea placeholder="Quote" value={editing.quote || ""} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} rows={4} />
              <Select value={editing.consultation_type || ""} onValueChange={(v) => setEditing({ ...editing, consultation_type: v as any })}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" min={1} max={5} placeholder="Rating (1-5)" value={editing.rating || ""} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) || null })} />
              <Input type="number" placeholder="Display Order" value={editing.display_order || 0} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} />
              <div className="flex items-center gap-3"><Switch checked={editing.is_published || false} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} /><span className="text-sm">Published</span></div>
              <Button onClick={save} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">Save</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
