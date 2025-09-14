import Layout from "@/components/Layout";
import { useLang } from "@/hooks/useLang";
import { TriageBadge } from "@/components/TriageBadge";
import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";

const sample = [
  { name: "Rani Devi", reason: "Cough", level: "safe" as const },
  { name: "Suresh", reason: "Fever", level: "caution" as const },
  { name: "Aman", reason: "Breathlessness", level: "urgent" as const },
  { name: "Meena", reason: "Diabetes", level: "safe" as const },
];

export default function DoctorConnect() {
  const { t } = useLang();
  const [filter, setFilter] = useState<"new" | "follow" | "chw">("new");
  const filtered = useMemo(() => sample, [filter]);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FilterPill active={filter === "new"} onClick={() => setFilter("new")}>{t("newCases")}</FilterPill>
          <FilterPill active={filter === "follow"} onClick={() => setFilter("follow")}>{t("followUps")}</FilterPill>
          <FilterPill active={filter === "chw"} onClick={() => setFilter("chw")}>{t("chwRef")}</FilterPill>
        </div>
        <div className="space-y-2">
          {filtered.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm opacity-70">{p.reason}</div>
              </div>
              <div className="flex items-center gap-2">
                <TriageBadge level={p.level} />
                <Button className="rounded-full">Call</Button>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full rounded-full py-6" variant="secondary">{t("communityRoom")}</Button>
      </div>
    </Layout>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1 rounded-full text-sm font-semibold border " +
        (active ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-secondary-foreground border-transparent")
      }
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
