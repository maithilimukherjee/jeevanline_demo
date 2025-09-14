import Layout from "@/components/Layout";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useLang";
import React, { useMemo, useState } from "react";
import { speak } from "@/lib/voice";

const sketches = [
  "🤧", // cough
  "🤒", // fever
  "🤕", // swelling/rash
];

export default function SymptomChecker() {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ q: number; v: number }[]>([]);
  const total = 3;
  const pct = Math.round(((step) / total) * 100);

  const next = (v: number) => {
    const a = [...answers.filter((x) => x.q !== step), { q: step, v }];
    setAnswers(a);
    if (step + 1 < total) setStep(step + 1);
    else setStep(total);
  };

  const results = useMemo(() => {
    const score = answers.reduce((s, x) => s + x.v, 0);
    return [
      { name: "Common Cold", conf: Math.min(95, 50 + score * 10), level: "safe" as const },
      { name: "Viral Fever", conf: 30 + score * 12, level: "caution" as const },
      { name: "Pneumonia", conf: 10 + score * 8, level: "urgent" as const },
    ].sort((a, b) => b.conf - a.conf);
  }, [answers]);

  const onRemedies = () => {
    const read = results.map((r) => `${r.name} ${Math.round(r.conf)} percent`);
    speak(["Home Remedies:", ...read]);
    alert("Home remedies will be read aloud if voice is enabled.");
  };

  return (
    <Layout>
      <div className="space-y-4">
        <div className="pt-2">
          <Progress value={pct} className="h-3 rounded-full" />
          <div className="mt-2 text-sm opacity-70">{t("stepOf", { x: Math.min(step + 1, total), y: total })}</div>
        </div>

        {step < total ? (
          <Question step={step} onAnswer={next} />
        ) : (
          <div className="space-y-3">
            <h2 className="text-xl font-bold">{t("probable")}</h2>
            <div className="space-y-3">
              {results.slice(0, 3).map((r, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-sm opacity-70">Confidence: {Math.round(r.conf)}%</div>
                  </div>
                  <span className={badgeClass(r.level)}>
                    {r.level === "safe" ? "✅ " + t("preventive") : r.level === "caution" ? "⚠ " + t("moderate") : "🚨 " + t("urgent")}
                  </span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3 pt-2">
              <Button className="w-full rounded-full py-6" onClick={onRemedies}>{t("homeRemedies")}</Button>
              <Button className="w-full rounded-full py-6" variant="secondary" asChild>
                <a href="/doctor">{t("bookDoctor")}</a>
              </Button>
              <Button className="w-full rounded-full py-6" variant="outline">{t("sendLogCHW")}</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function Question({ step, onAnswer }: { step: number; onAnswer: (v: number) => void }) {
  const { t } = useLang();
  const q = [
    { text: "Do you have cough?", kind: "yesno" as const },
    { text: "Do you have fever?", kind: "yesno" as const },
    { text: t("intensity"), kind: "slider" as const },
  ][step];

  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-center gap-4">
        <div className="text-5xl" aria-hidden>{sketches[step]}</div>
        <div className="text-lg font-semibold">{q.text}</div>
      </div>
      {q.kind === "yesno" ? (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button className="rounded-xl py-6 text-base" onClick={() => onAnswer(1)}>✅ {t("yes")}</Button>
          <Button className="rounded-xl py-6 text-base" variant="secondary" onClick={() => onAnswer(0)}>❌ {t("no")}</Button>
        </div>
      ) : (
        <SliderInput onAnswer={onAnswer} />
      )}
    </div>
  );
}

function SliderInput({ onAnswer }: { onAnswer: (v: number) => void }) {
  const [val, setVal] = useState(5);
  return (
    <div className="mt-6">
      <input type="range" min={0} max={10} value={val} onChange={(e) => setVal(Number(e.target.value))} className="w-full" />
      <div className="flex items-center justify-between mt-2 text-sm">
        <span>Low</span>
        <span className="font-semibold">{val}</span>
        <span>High</span>
      </div>
      <Button className="w-full rounded-full mt-4 py-6" onClick={() => onAnswer(val)}>Continue</Button>
    </div>
  );
}

function badgeClass(level: "safe" | "caution" | "urgent") {
  return (
    "px-3 py-1 rounded-full text-xs font-semibold " +
    (level === "safe"
      ? "bg-safe text-safe-foreground"
      : level === "caution"
      ? "bg-caution text-caution-foreground"
      : "bg-urgent text-urgent-foreground")
  );
}
