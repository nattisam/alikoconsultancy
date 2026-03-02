import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload, FileText, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Tables } from "@/integrations/supabase/types";

type Resource = Tables<"resources"> & { file_url?: string | null };

const emptyResource = { title: "", slug: "", description: "", resource_type: "article" as const, consultation_type: "" as any, is_published: false, thumbnail_url: "", file_url: "" };

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.webp,.svg,.txt,.csv,.zip,.rar";

const AdminResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [editing, setEditing] = useState<Partial<Resource> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchResources = async () => {
    const { data } = await supabase.from("resources").select("*").order("created_at", { ascending: false });
    setResources((data as Resource[]) || []);
  };

  useEffect(() => { fetchResources(); }, []);

  const uploadFile = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    setUploading(true);
    setUploadProgress(30);

    const { error } = await supabase.storage.from("resource-files").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

    setUploadProgress(80);

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      setUploadProgress(0);
      return null;
    }

    const { data: urlData } = supabase.storage.from("resource-files").getPublicUrl(filePath);
    setUploadProgress(100);
    setTimeout(() => { setUploading(false); setUploadProgress(0); }, 500);
    return urlData.publicUrl;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;

    if (file.size > 50 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 50MB.", variant: "destructive" });
      return;
    }

    const url = await uploadFile(file);
    if (url) {
      setEditing({ ...editing, file_url: url });
      toast({ title: "File uploaded successfully" });
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
      file_url: editing.file_url || null,
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

  const getFileName = (url: string) => {
    try {
      const parts = url.split("/");
      const name = parts[parts.length - 1];
      // Remove the timestamp prefix
      return name.replace(/^\d+-[a-z0-9]+\./, "file.");
    } catch {
      return "Attached file";
    }
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
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{r.description}</p>
            {r.file_url && (
              <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-accent hover:underline mb-3">
                <FileText className="w-3 h-3" /> File attached
              </a>
            )}
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

              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Attach File (PDF, Word, Image, etc.)</label>
                {editing.file_url ? (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <FileText className="w-4 h-4 text-accent shrink-0" />
                    <a href={editing.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline truncate flex-1">
                      {getFileName(editing.file_url)}
                    </a>
                    <Button type="button" size="sm" variant="ghost" onClick={() => setEditing({ ...editing, file_url: "" })} className="text-destructive shrink-0">
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-accent/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload a file</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, Word, Excel, Images, ZIP — up to 50MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_TYPES}
                  className="hidden"
                  onChange={handleFileChange}
                />
                {uploading && <Progress value={uploadProgress} className="h-2" />}
              </div>

              <div className="flex items-center gap-3">
                <Switch checked={editing.is_published || false} onCheckedChange={(v) => setEditing({ ...editing, is_published: v })} />
                <span className="text-sm">Published</span>
              </div>
              <Button onClick={save} disabled={uploading} className="w-full bg-gold text-navy hover:bg-gold/90 font-semibold">Save</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminResources;
