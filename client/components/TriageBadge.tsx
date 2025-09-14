import React from "react";
import { cn } from "@/lib/utils";

export function TriageBadge({ level }: { level: "safe" | "caution" | "urgent" }) {
  const map = {
    safe: { label: "✅", cls: "bg-safe text-safe-foreground" },
    caution: { label: "⚠", cls: "bg-caution text-caution-foreground" },
    urgent: { label: "🚨", cls: "bg-urgent text-urgent-foreground" },
  } as const;
  const { label, cls } = map[level];
  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1", cls)}>
      <span aria-hidden>{label}</span>
      <span className="capitalize">{level}</span>
    </span>
  );
}
