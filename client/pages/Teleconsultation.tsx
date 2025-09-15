import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useLang";
import React, { useMemo, useState } from "react";

interface Patient {
  name: string;
  reason: string;
  level: "safe" | "caution" | "urgent";
  minutes: number; // estimated remaining per patient ahead
}

const SAMPLE: Patient[] = [
  { name: "Rani Devi", reason: "Cough", level: "safe", minutes: 6 },
  { name: "Suresh", reason: "Fever", level: "caution", minutes: 8 },
  { name: "Aman", reason: "Breathlessness", level: "urgent", minutes: 12 },
  { name: "Meena", reason: "Diabetes", level: "safe", minutes: 7 },
];

const ROOMS = [
  { condition: "Cough", people: 12, wait: 3 },
  { condition: "Fever", people: 8, wait: 2 },
  { condition: "Back Pain", people: 15, wait: 4 },
];

export default function Teleconsultation() {
  const { t } = useLang();
  const [queue] = useState<Patient[]>(SAMPLE);
  const avg = 8; // min per consult

  const position = 3; // user's place in queue (mock)
  const estUserWait = useMemo(
    () => queue.slice(0, position).reduce((s, p) => s + p.minutes, 0),
    [queue, position],
  );

  return (
    <Layout>
      <div className="space-y-5">
        <section className="rounded-2xl border p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm opacity-70">{t("doctorAppointed")}</div>
              <div className="text-lg font-bold">Dr. Sharma (MBBS)</div>
              <div className="text-sm opacity-70">
                {t("waitingTime")}: ~{estUserWait} min · {t("queuePosition")}:{" "}
                {position + 1}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-40">
              <Button
                className="rounded-full w-full"
                variant="secondary"
                onClick={() => alert("Starting audio call...")}
              >
                {t("audioCall")}
              </Button>
              <Button
                className="rounded-full w-full"
                onClick={() => alert("Starting video call...")}
              >
                {t("videoCall")}
              </Button>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">{t("groupRooms")}</div>
              <div className="text-sm opacity-70">{t("byCondition")}</div>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {ROOMS.length === 0 ? (
              <div className="text-sm opacity-70">{t("noRooms")}</div>
            ) : (
              ROOMS.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border p-3"
                >
                  <div>
                    <div className="font-semibold">{r.condition}</div>
                    <div className="text-xs opacity-70">
                      {r.people} people · {t("estWait")}: ~{r.wait} min
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="rounded-full"
                    onClick={() => alert(`Joining group room: ${r.condition}`)}
                  >
                    {t("joinGroup")}
                  </Button>
                </div>
              ))
            )}
          </div>
        </section>

        <div className="text-xs opacity-60">
          Avg consult ~{avg} min. Poor network? Call switches to audio
          automatically.
        </div>
      </div>
    </Layout>
  );
}
