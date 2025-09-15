import Layout from "@/components/Layout";
import { VoiceInput } from "@/components/VoiceInput";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useLang";
import React, { useEffect, useMemo, useState } from "react";

interface Entry {
  id: string;
  dateISO: string;
  medicine: string;
  dosage: string;
  duration: string;
  notes: string;
}

const STORE_KEY = "prescription-passbook";

export default function PrescriptionPassbook() {
  const { t } = useLang();
  const [items, setItems] = useState<Entry[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (e: Entry) => setItems((prev) => [e, ...prev]);
  const remove = (id: string) =>
    setItems((prev) => prev.filter((x) => x.id !== id));

  return (
    <Layout>
      <div className="space-y-5">
        <h1 className="text-xl font-bold">{t("prescriptionPassbook")}</h1>
        <AddForm onAdd={add} />
        <div className="space-y-2">
          <h2 className="font-semibold">{t("yourPrescriptions")}</h2>
          {items.length === 0 ? (
            <div className="text-sm opacity-70">
              No prescriptions saved yet.
            </div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{it.medicine}</div>
                  <div className="text-xs opacity-70">
                    {new Date(it.dateISO).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  {t("dosage")}: {it.dosage}
                </div>
                <div className="text-sm">
                  {t("duration")}: {it.duration}
                </div>
                {it.notes && (
                  <div className="text-sm opacity-80 mt-1">
                    {t("notes")}: {it.notes}
                  </div>
                )}
                <div className="pt-2 text-right">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => remove(it.id)}
                  >
                    {t("delete")}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}

function AddForm({ onAdd }: { onAdd: (e: Entry) => void }) {
  const { t } = useLang();
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const canSave = medicine.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    const entry: Entry = {
      id: crypto.randomUUID(),
      dateISO: new Date().toISOString(),
      medicine: medicine.trim(),
      dosage: dosage.trim(),
      duration: duration.trim(),
      notes: notes.trim(),
    };
    onAdd(entry);
    setMedicine("");
    setDosage("");
    setDuration("");
    setNotes("");
  };

  return (
    <div className="rounded-2xl border p-4 space-y-3">
      <div className="font-semibold">{t("addPrescription")}</div>
      <VoiceInput
        value={medicine}
        onChange={setMedicine}
        placeholder={t("medicine")}
      />
      <VoiceInput
        value={dosage}
        onChange={setDosage}
        placeholder={t("dosage")}
      />
      <VoiceInput
        value={duration}
        onChange={setDuration}
        placeholder={t("duration")}
      />
      <VoiceInput value={notes} onChange={setNotes} placeholder={t("notes")} />
      <Button
        className="w-full rounded-full py-6"
        onClick={save}
        disabled={!canSave}
      >
        {t("save")}
      </Button>
    </div>
  );
}
