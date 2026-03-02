import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Rule = Tables<"availability_rules">;

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const AdminSettings = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const { toast } = useToast();

  const fetchRules = async () => {
    const { data } = await supabase.from("availability_rules").select("*").order("day_of_week");
    setRules(data || []);
  };

  useEffect(() => { fetchRules(); }, []);

  const addRule = async () => {
    const { error } = await supabase.from("availability_rules").insert({
      day_of_week: 1, start_time: "09:00", end_time: "17:00",
      slot_duration_minutes: 30, buffer_minutes: 10, consultation_type: "business",
    } as any);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchRules();
  };

  const updateRule = async (id: string, updates: Partial<Rule>) => {
    await supabase.from("availability_rules").update(updates).eq("id", id);
    fetchRules();
  };

  const deleteRule = async (id: string) => {
    await supabase.from("availability_rules").delete().eq("id", id);
    toast({ title: "Rule Deleted" }); fetchRules();
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold text-primary mb-1">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage availability rules and booking settings.</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg font-semibold text-primary">Availability Rules</h2>
          <Button onClick={addRule} className="bg-gold text-navy hover:bg-gold/90 font-semibold" size="sm">
            <Plus className="w-4 h-4 mr-1" /> Add Rule
          </Button>
        </div>
        <div className="space-y-3">
          {rules.map((r) => (
            <div key={r.id} className="bg-card border border-border rounded-xl p-4 flex flex-wrap items-center gap-3">
              <Select value={String(r.day_of_week)} onValueChange={(v) => updateRule(r.id, { day_of_week: parseInt(v) })}>
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent>{days.map((d, i) => <SelectItem key={i} value={String(i)}>{d}</SelectItem>)}</SelectContent>
              </Select>
              <Input type="time" value={r.start_time || ""} onChange={(e) => updateRule(r.id, { start_time: e.target.value } as any)} className="w-[120px]" />
              <span className="text-sm text-muted-foreground">to</span>
              <Input type="time" value={r.end_time || ""} onChange={(e) => updateRule(r.id, { end_time: e.target.value } as any)} className="w-[120px]" />
              <Input type="number" value={r.slot_duration_minutes} onChange={(e) => updateRule(r.id, { slot_duration_minutes: parseInt(e.target.value) })} className="w-[80px]" placeholder="Duration" />
              <span className="text-xs text-muted-foreground">min</span>
              <Select value={r.consultation_type} onValueChange={(v) => updateRule(r.id, { consultation_type: v as any })}>
                <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <Switch checked={r.is_active} onCheckedChange={(v) => updateRule(r.id, { is_active: v })} />
                <span className="text-xs">{r.is_active ? "Active" : "Inactive"}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={() => deleteRule(r.id)} className="text-destructive ml-auto"><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
          {rules.length === 0 && <p className="text-muted-foreground text-sm text-center py-8">No availability rules. Add one to get started.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
