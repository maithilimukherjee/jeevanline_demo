import Layout from "@/components/Layout";
import { useLang } from "@/hooks/useLang";
import { VoiceInput } from "@/components/VoiceInput";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function PharmacyFinder() {
  const { t } = useLang();
  const [med, setMed] = useState("");
  const [sent, setSent] = useState(false);
  const [results, setResults] = useState<{ name: string; km: number; stock: boolean }[]>([]);

  const send = () => {
    setSent(true);
    const list = Array.from({ length: 8 }).map((_, i) => ({
      name: `Pharmacy ${i + 1}`,
      km: 1 + i,
      stock: Math.random() > 0.3,
    }));
    list.sort((a, b) => a.km - b.km);
    setResults(list);
  };

  return (
    <Layout>
      <div className="space-y-4">
        <VoiceInput value={med} onChange={setMed} placeholder={t("medName")} />
        <Button className="w-full rounded-full py-6" onClick={send}>{t("sendToPharmacies")}</Button>
        {sent && (
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm opacity-70">{r.km} km</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={r.stock ? "text-safe font-semibold" : "text-urgent font-semibold"}>
                    {r.stock ? `✔ ${t("inStock")}` : `❌ ${t("outStock")}`}
                  </span>
                  {!r.stock && (
                    <Button size="sm" variant="secondary">{t("suggestAlt")}</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
