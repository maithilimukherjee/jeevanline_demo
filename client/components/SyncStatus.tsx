import React, { useEffect, useState } from "react";
import { Wifi, WifiOff, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/hooks/useLang";

export default function SyncStatus() {
  const { t } = useLang();
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <div
      className={cn(
        "sticky bottom-0 w-full py-2 px-3 flex items-center justify-center gap-2 text-sm font-medium",
        online ? "bg-safe text-safe-foreground" : "bg-urgent text-urgent-foreground",
      )}
      role="status"
      aria-live="polite"
    >
      {online ? (
        <>
          <CheckCircle className="w-4 h-4" />
          <span>✔ {t("synced")}</span>
          <Wifi className="w-4 h-4" />
        </>
      ) : (
        <>
          <XCircle className="w-4 h-4" />
          <span>❌ {t("offline")}</span>
          <WifiOff className="w-4 h-4" />
        </>
      )}
    </div>
  );
}
