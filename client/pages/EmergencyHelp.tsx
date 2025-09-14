import Layout from "@/components/Layout";
import { useLang } from "@/hooks/useLang";
import { Button } from "@/components/ui/button";

export default function EmergencyHelp() {
  const { t } = useLang();

  const call = () => {
    alert("CHW alerted. Stay calm. Help is on the way.");
  };

  const transport = () => {
    alert("Transport request sent to local network.");
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 items-center justify-center py-10">
        <button
          onClick={call}
          className="w-full rounded-3xl bg-urgent text-urgent-foreground text-2xl font-extrabold py-10 shadow-lg active:scale-[.99]"
        >
          🚨 {t("callHelp")}
        </button>
        <Button className="w-full rounded-full py-6" variant="secondary" onClick={transport}>
          {t("requestTransport")}
        </Button>
      </div>
    </Layout>
  );
}
