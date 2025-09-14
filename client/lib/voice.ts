export function speak(texts: string[], lang = "en-IN") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  const utterances = texts.map((t) => {
    const u = new SpeechSynthesisUtterance(t);
    u.lang = lang;
    u.rate = 1;
    u.pitch = 1;
    return u;
  });
  utterances.forEach((u) => window.speechSynthesis.speak(u));
  return true;
}

export type RecognitionResult = { transcript: string };

export function recognize(
  onResult: (r: RecognitionResult) => void,
  opts?: { lang?: string }
) {
  const SpeechRecognition: any =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const recognition = new SpeechRecognition();
  recognition.lang = opts?.lang || "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript as string;
    onResult({ transcript });
  };
  recognition.start();
  return recognition;
}
