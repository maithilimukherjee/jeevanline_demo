import React, { useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import { recognize } from "@/lib/voice";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function VoiceInput({
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
  lang = "en-IN",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  lang?: string;
}) {
  const recRef = useRef<any>(null);
  const [listening, setListening] = useState(false);

  const toggle = () => {
    if (listening) {
      try {
        recRef.current?.stop?.();
      } catch {}
      setListening(false);
      return;
    }
    const rec = recognize(({ transcript }) => {
      onChange(transcript);
      setListening(false);
    }, { lang });
    if (rec) {
      recRef.current = rec;
      setListening(true);
    } else {
      alert("Speech recognition not supported on this device.");
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex-1 rounded-xl border px-4 py-3 text-base outline-none focus:ring-2 focus:ring-primary",
          inputClassName,
        )}
      />
      <Button
        type="button"
        onClick={toggle}
        variant={listening ? "secondary" : "default"}
        className={cn(
          "rounded-full w-12 h-12 p-0 text-white",
          listening ? "bg-accent" : "bg-primary",
        )}
        aria-label="Mic"
      >
        {listening ? <MicOff /> : <Mic />}
      </Button>
    </div>
  );
}
