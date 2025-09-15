import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Lang = "EN" | "HI" | "PA";

type Dictionary = Record<string, { EN: string; HI: string; PA: string }>;

const dict: Dictionary = {
  appName: { EN: "JeevanLine", HI: "जीवनलाइन", PA: "ਜੀਵਨਲਾਈਨ" },
  welcome: {
    EN: "Welcome to JeevanLine",
    HI: "जीवनलाइन में आपका स्वागत है",
    PA: "ਜੀਵਨਲਾਈਨ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
  },
  symptomChecker: { EN: "Symptom Checker", HI: "लक्षण जांच", PA: "ਲੱਛਣ ਜਾਂਚ" },
  healthJournal: {
    EN: "Health Journal",
    HI: "स्���ास्थ्य डायरी",
    PA: "ਸਿਹਤ ਜਰਨਲ",
  },
  doctorConnect: {
    EN: "Doctor Connect",
    HI: "डॉक्टर से जुड़ें",
    PA: "ਡਾਕਟਰ ਨਾਲ ਜ��ੜੋ",
  },
  pharmacyFinder: {
    EN: "Pharmacy Finder",
    HI: "फार्मेसी खोजें",
    PA: "ਫਾਰਮੇਸੀ ਖੋਜੋ",
  },
  emergencyHelp: {
    EN: "Emergency Help",
    HI: "आपातकालीन सहायता",
    PA: "ਐਮਰਜੈਂਸੀ ਮਦਦ",
  },
  learningHub: { EN: "Learning Hub", HI: "सीखने का केंद्र", PA: "ਸਿੱਖਿਆ ਹੱਬ" },
  prescriptionPassbook: {
    EN: "Prescription Passbook",
    HI: "प्रिस्क्रिप्शन पासबुक",
    PA: "ਨੁਸਖਾ ਪਾਸਬੁੱਕ",
  },
  yourPrescriptions: {
    EN: "Your Prescriptions",
    HI: "आपके प्रिस्क्रिप्शन",
    PA: "ਤੁਹਾਡੇ ਨੁਸਖੇ",
  },
  addPrescription: {
    EN: "Add Prescription",
    HI: "प्रिस्क्रिप्शन जोड़ें",
    PA: "ਨੁਸਖਾ ਜੋੜੋ",
  },
  medicine: { EN: "Medicine", HI: "दवा", PA: "ਦਵਾਈ" },
  dosage: { EN: "Dosage", HI: "खुराक", PA: "ਖੁਰਾਕ" },
  duration: { EN: "Duration", HI: "अवधि", PA: "ਅਵਧੀ" },
  notes: { EN: "Notes", HI: "नोट्स", PA: "ਨੋਟਸ" },
  save: { EN: "Save", HI: "सहेजें", PA: "ਸੇਵ" },
  delete: { EN: "Delete", HI: "हटाएँ", PA: "ਹਟਾਓ" },
  synced: { EN: "Synced", HI: "सिंक हुआ", PA: "ਸਿੰਕ ਹੋਇਆ" },
  offline: { EN: "Offline", HI: "ऑफ़लाइन", PA: "ਆਫਲਾਈਨ" },
  voiceEnable: {
    EN: "Enable Voice",
    HI: "आवाज़ सक्षम करें",
    PA: "ਆਵਾਜ਼ ਐਨੇਬਲ ਕਰੋ",
  },
  logBP: { EN: "Log BP", HI: "बीपी दर्ज करें", PA: "ਬੀਪੀ ਲਾਗ ਕਰੋ" },
  logSugar: { EN: "Log Sugar", HI: "शुगर दर्ज करें", PA: "ਸ਼ੂਗਰ ਲਾਗ ਕਰੋ" },
  logWeight: { EN: "Log Weight", HI: "वज़न दर्ज करें", PA: "ਵਜ਼ਨ ਲਾਗ ਕਰੋ" },
  addSymptom: { EN: "Add Symptom", HI: "लक्षण जोड़ें", PA: "ਲੱਛਣ ਜੋੜੋ" },
  sendJournal: {
    EN: "Send Journal to CHW",
    HI: "सीएचडब्ल्���ू को जर्नल भेजें",
    PA: "CHW ਨੂੰ ਜਰਨਲ ਭੇਜੋ",
  },
  graph7d: { EN: "7-day Trend", HI: "7-दिन रुझान", PA: "7-ਦਿਨ ਰੁਝਾਨ" },
  quiz: { EN: "Symptom Quiz", HI: "लक्षण प्रश्नोत��तरी", PA: "ਲੱਛਣ ਪ੍ਰਸ਼ਨੋਤਰੀ" },
  yes: { EN: "Yes", HI: "हाँ", PA: "ਹਾਂ" },
  no: { EN: "No", HI: "नहीं", PA: "ਨਹੀਂ" },
  intensity: { EN: "Intensity", HI: "तीव्रता", PA: "ਤੀਬਰਤਾ" },
  stepOf: { EN: "Step {x} of {y}", HI: "कदम {x} / {y}", PA: "ਕਦਮ {x} / {y}" },
  probable: {
    EN: "Probable Conditions",
    HI: "संभावित स्थितियाँ",
    PA: "ਸੰਭਾਵਿਤ ਹਾਲਤਾਂ",
  },
  preventive: { EN: "Preventive", HI: "निवारक", PA: "ਰੋਕਥਾਮ" },
  moderate: { EN: "Moderate", HI: "मध्यम", PA: "ਦਰਮਿਆਨਾ" },
  urgent: { EN: "Urgent", HI: "तत्काल", PA: "ਤੁਰੰਤ" },
  homeRemedies: {
    EN: "Show Home Remedies",
    HI: "घरेलू उपचार दिखाएँ",
    PA: "ਘਰੇਲੂ ਇਲਾਜ ਦਿਖਾਓ",
  },
  bookDoctor: {
    EN: "Book Doctor",
    HI: "डॉक्टर बुक क���ें",
    PA: "ਡਾਕਟਰ ਬੁੱਕ ਕਰੋ",
  },
  sendLogCHW: {
    EN: "Send Log to CHW",
    HI: "सीएचडब्ल्यू को ल���ग भेजें",
    PA: "ਲਾਗ CHW ਨੂ��� ਭੇਜੋ",
  },
  queue: { EN: "Queue", HI: "कतार", PA: "ਕਤਾਰ" },
  filters: { EN: "Filters", HI: "फ़िल्टर", PA: "ਫਿਲਟਰ" },
  newCases: { EN: "New", HI: "नया", PA: "ਨਵਾਂ" },
  followUps: { EN: "Follow-ups", HI: "फॉलो-अप", PA: "ਫਾਲੋ-ਅੱਪ" },
  chwRef: { EN: "CHW Referrals", HI: "सीएचडब्ल्यू रेफरल", PA: "CHW ਰੈਫਰਲ" },
  communityRoom: {
    EN: "Join Community Room",
    HI: "कम्युनिटी रूम में जुड़ें",
    PA: "ਕਮਿਊਨਿਟੀ ਰੂਮ ਵਿਚ ਸ਼ਾਮਲ ਹੋਵੋ",
  },
  viewHistory: { EN: "View History", HI: "इतिहास देखें", PA: "ਇਤਿਹਾਸ ਵੇਖੋ" },
  sendRx: {
    EN: "Send Prescription",
    HI: "प्रिस्क्रिप्शन भेजें",
    PA: "ਨੁਸਖਾ ਭੇਜੋ",
  },
  medName: { EN: "Medicine name", HI: "दवा का नाम", PA: "ਦਵਾਈ ਦਾ ਨਾਮ" },
  sendToPharmacies: {
    EN: "Send to Pharmacies (20 nearby)",
    HI: "फार्मेसियों को भेजें (20 पास)",
    PA: "ਫਾਰਮੇਸੀਆਂ ਨੂੰ ਭੇਜੋ (20 ਨੇੜੇ)",
  },
  inStock: { EN: "In Stock", HI: "उपलब्ध", PA: "ਸਟਾਕ ਵਿੱਚ" },
  outStock: { EN: "Out of Stock", HI: "उपलब्ध नहीं", PA: "ਸਟਾਕ ਖਤਮ" },
  suggestAlt: {
    EN: "Suggest Alternative",
    HI: "विकल्प सुझाएँ",
    PA: "ਵਿਕਲਪ ਸੁਝਾਓ",
  },
  callHelp: { EN: "Call for Help", HI: "मदद के लिए कॉल", PA: "ਮਦਦ ਲਈ ਕਾਲ" },
  requestTransport: {
    EN: "Request Transport Aid",
    HI: "परिवहन सहायता का अनुरोध",
    PA: "ਆਵਾਜਾਈ ਸਹਾਇਤਾ ਦੀ ਬੇਨਤੀ",
  },
  seasonalAlerts: {
    EN: "Seasonal Alerts",
    HI: "मौसमी अलर्ट",
    PA: "ਮੌਸਮੀ ਚੇਤਾਵਨੀਆਂ",
  },
  tutorials: { EN: "Tutorials", HI: "ट्यूटोरियल", PA: "ਟਿਊਟੋਰਿਅਲ" },
  enableHighContrast: {
    EN: "High Contrast",
    HI: "उच्च कंट्रास्ट",
    PA: "ਉੱਚ ਕਾਂਟ੍ਰਾਸਟ",
  },
  teleconsult: { EN: "Teleconsultation", HI: "टेली कंसल्टेशन", PA: "ਟੈਲੀਕੰਸਲਟੇਸ਼ਨ" },
  startCall: { EN: "Start Call", HI: "कॉल शुरू करें", PA: "ਕਾਲ ਸ਼ੁਰੂ ਕਰੋ" },
  joinGroup: { EN: "Join Group Consultation", HI: "ग्रुप कंसल्टेशन में जुड़ें", PA: "ਗਰੁੱਪ ਕਨਸਲਟੇਸ਼ਨ ਵਿਚ ਸ਼ਾਮਲ ਹੋਵੋ" },
  estWait: { EN: "Estimated wait", HI: "अनुमानित प्रतीक्षा", PA: "ਅੰਦਾਜ਼ੇ ਦਾ ਇੰਤਜ਼ਾਰ" },
  queuePosition: { EN: "Queue position", HI: "कतार स्थान", PA: "ਕਤਾਰ ਸਥਾਨ" },
  groupRooms: { EN: "Community Rooms", HI: "कम्युनिटी रूम", PA: "ਕਮਿਊਨਿਟੀ ਰੂਮ" },
  byCondition: { EN: "by condition", HI: "स्थिति के अनुसार", PA: "ਹਾਲਤ ਅਨੁਸਾਰ" },
  noRooms: { EN: "No active rooms", HI: "कोई सक्रिय रूम नहीं", PA: "ਕੋਈ ਸਰਗਰਮ ਰੂਮ ਨਹੀਂ" },
  doctorAppointed: { EN: "Doctor appointed", HI: "डॉक्टर नियुक्त", PA: "ਡਾਕਟਰ ਨਿਯੁਕਤ" },
  waitingTime: { EN: "Waiting time", HI: "प्रतीक्षा समय", PA: "ਇੰਤਜ਼ਾਰ ਸਮਾਂ" },
  audioCall: { EN: "Audio Call", HI: "ऑडियो कॉल", PA: "ਆਡੀਓ ਕਾਲ" },
  videoCall: { EN: "Video Call", HI: "वीडियो कॉल", PA: "ਵੀਡੀਓ ਕਾਲ" },
};

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (
    key: keyof typeof dict,
    params?: Record<string, string | number>,
  ) => string;
} | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) || "EN",
  );

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const t = useMemo(() => {
    return (
      key: keyof typeof dict,
      params?: Record<string, string | number>,
    ) => {
      let text = dict[key][lang];
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    };
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
