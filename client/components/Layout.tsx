import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "@/hooks/useLang";
import SyncStatus from "@/components/SyncStatus";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX, Moon, Sun, ArrowLeft } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { lang, setLang } = useLang();
  const [voiceOn, setVoiceOn] = useState<boolean>(() => localStorage.getItem("voiceOn") === "1");
  const [dark, setDark] = useState<boolean>(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    localStorage.setItem("voiceOn", voiceOn ? "1" : "0");
  }, [voiceOn]);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-md px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HeaderLeft />
            <div className="font-extrabold text-xl tracking-tight"><span className="text-primary">Jeevan</span>Line</div>
          </div>
          <div className="flex items-center gap-2">
            <LangPill code="EN" active={lang === "EN"} onClick={() => setLang("EN")}>
              EN
            </LangPill>
            <LangPill code="HI" active={lang === "HI"} onClick={() => setLang("HI")}>
              HI
            </LangPill>
            <LangPill code="PA" active={lang === "PA"} onClick={() => setLang("PA")}>
              PA
            </LangPill>
            <button
              aria-label="Toggle voice"
              onClick={() => setVoiceOn((v) => !v)}
              className={cn(
                "ml-1 rounded-full p-2",
                voiceOn ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
              )}
            >
              {voiceOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              aria-label="Toggle contrast"
              onClick={() => setDark((v) => !v)}
              className={cn(
                "rounded-full p-2",
                dark ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground",
              )}
            >
              {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-md px-4 pb-20 pt-4">{children}</div>
      </main>
      <footer>
        <SyncStatus />
      </footer>
    </div>
  );
}

function LangPill({ code, active, onClick, children }: { code: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold border",
        active ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-secondary-foreground border-transparent",
      )}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function HeaderLeft() {
  const loc = useLocation();
  if (loc.pathname === "/") return null;
  return (
    <Link to="/" className="inline-flex items-center gap-2 rounded-full px-3 py-2 bg-secondary text-secondary-foreground">
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-semibold">Dashboard</span>
    </Link>
  );
}

export function useVoiceOn() {
  const [voiceOn, setVoiceOn] = useState<boolean>(() => localStorage.getItem("voiceOn") === "1");
  useEffect(() => { localStorage.setItem("voiceOn", voiceOn ? "1" : "0"); }, [voiceOn]);
  return { voiceOn, setVoiceOn };
}
