import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useLang } from "@/hooks/useLang";
import { speak } from "@/lib/voice";

export default function Index() {
  const { t } = useLang();

  useEffect(() => {
    const voiceOn = localStorage.getItem("voiceOn") === "1";
    if (voiceOn) {
      const items = [
        t("symptomChecker"),
        t("healthJournal"),
        t("prescriptionPassbook"),
        t("pharmacyFinder"),
        t("emergencyHelp"),
        t("learningHub"),
      ];
      speak([`Welcome to JeevanLine`, ...items]);
    }
  }, [t]);

  return (
    <Layout>
      <div className="space-y-4">
        <div className="rounded-2xl bg-secondary p-4 flex items-center gap-3">
          <div className="text-2xl">👋</div>
          <div>
            <p className="font-bold">{t("welcome")}</p>
            <p className="text-sm opacity-70">
              Voice-first. Tap speaker in header to enable.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <AppTile
            to="/symptom"
            emoji="🤖"
            label={t("symptomChecker")}
            color="bg-emerald-600"
          />
          <AppTile
            to="/journal"
            emoji="📒"
            label={t("healthJournal")}
            color="bg-sky-600"
          />
          <AppTile
            to="/passbook"
            emoji="📔"
            label={t("prescriptionPassbook")}
            color="bg-green-700"
          />
          <AppTile
            to="/pharmacy"
            emoji="💊"
            label={t("pharmacyFinder")}
            color="bg-indigo-600"
          />
          <AppTile
            to="/emergency"
            emoji="🚨"
            label={t("emergencyHelp")}
            color="bg-red-600"
            urgent
          />
          <AppTile
            to="/learning"
            emoji="📚"
            label={t("learningHub")}
            color="bg-amber-500"
          />
        </div>
      </div>
    </Layout>
  );
}

function AppTile({
  to,
  emoji,
  label,
  color,
  urgent,
}: {
  to: string;
  emoji: string;
  label: string;
  color: string;
  urgent?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group rounded-2xl ${color} text-white p-5 aspect-[1.2] flex flex-col items-start justify-between shadow-md active:scale-[.99]`}
    >
      <div className="text-4xl" aria-hidden>
        {emoji}
      </div>
      <div className="text-lg font-bold leading-tight">{label}</div>
      {urgent && (
        <div
          className="absolute right-3 top-3 animate-pulse-glow h-3 w-3 rounded-full bg-white/90"
          aria-hidden
        />
      )}
    </Link>
  );
}
