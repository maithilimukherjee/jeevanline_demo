import Layout from "@/components/Layout";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useLang";
import { speak } from "@/lib/voice";

const cards = [
  { title: "How to check BP", text: "Use a cuff on upper arm. Sit relaxed.", emoji: "🩺" },
  { title: "Sugar testing", text: "Use glucometer and clean finger.", emoji: "🩸" },
  { title: "Seasonal flu care", text: "Stay hydrated and rest.", emoji: "🤒" },
];

export default function LearningHub() {
  const { t } = useLang();

  const read = (text: string) => {
    speak([text]);
  };

  return (
    <Layout>
      <div className="space-y-4">
        <h2 className="text-xl font-bold">{t("seasonalAlerts")}</h2>
        <Carousel>
          <CarouselContent className="h-48">
            {cards.map((c, i) => (
              <CarouselItem key={i} className="rounded-2xl border p-4 flex items-center gap-3">
                <div className="text-4xl">{c.emoji}</div>
                <div>
                  <div className="font-semibold">{c.title}</div>
                  <div className="text-sm opacity-70">{c.text}</div>
                </div>
                <div className="ml-auto">
                  <Button size="sm" variant="secondary" onClick={() => read(c.text)}>🔊</Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <h3 className="text-lg font-semibold">{t("tutorials")}</h3>
        <div className="space-y-2">
          {cards.map((c, i) => (
            <div key={i} className="rounded-2xl border p-4 flex items-center gap-3">
              <div className="text-2xl">{c.emoji}</div>
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm opacity-70">{c.text}</div>
              </div>
              <div className="ml-auto">
                <Button size="sm" variant="secondary" onClick={() => read(c.text)}>🔊</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
