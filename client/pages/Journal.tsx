import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VoiceInput } from "@/components/VoiceInput";
import { useLang } from "@/hooks/useLang";
import { useMemo, useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis } from "recharts";

export default function Journal() {
  const { t } = useLang();
  const [bp, setBp] = useState("120/80");
  const [sugar, setSugar] = useState("98");
  const [weight, setWeight] = useState("62");
  const [symptom, setSymptom] = useState("");

  const data = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
        sugar: 80 + Math.round(Math.random() * 50),
        bp: 110 + Math.round(Math.random() * 30),
        weight: 60 + (i % 2 === 0 ? 0 : 1),
      })),
    [],
  );

  return (
    <Layout>
      <div className="space-y-4">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">BP</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold">{bp}</div>
            <VoiceInput value={bp} onChange={setBp} placeholder={t("logBP")} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Sugar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold">{sugar} mg/dL</div>
            <VoiceInput value={sugar} onChange={setSugar} placeholder={t("logSugar")} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Weight</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-2xl font-bold">{weight} kg</div>
            <VoiceInput value={weight} onChange={setWeight} placeholder={t("logWeight")} />
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Symptoms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <VoiceInput value={symptom} onChange={setSymptom} placeholder={t("addSymptom")} />
          </CardContent>
        </Card>

        <div className="rounded-2xl border">
          <div className="px-4 pt-4 font-semibold">{t("graph7d")}</div>
          <div className="p-2">
            <ChartContainer
              config={{
                sugar: { label: "Sugar", color: "hsl(var(--accent))" },
                bp: { label: "BP", color: "hsl(var(--primary))" },
                weight: { label: "Weight", color: "hsl(var(--muted-foreground))" },
              }}
              className="h-48"
            >
              <LineChart data={data}>
                <XAxis dataKey="day" hide/>
                <YAxis hide/>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line dataKey="sugar" stroke="var(--color-sugar)" strokeWidth={3} dot={false} />
                <Line dataKey="bp" stroke="var(--color-bp)" strokeWidth={3} dot={false} />
                <Line dataKey="weight" stroke="var(--color-weight)" strokeWidth={3} dot={false} />
              </LineChart>
            </ChartContainer>
          </div>
        </div>

        <Button className="w-full rounded-full text-base py-6">{t("sendJournal")}</Button>
      </div>
    </Layout>
  );
}
