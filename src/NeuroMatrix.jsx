import { useState, useEffect } from "react";

const chemicals = {
  oxytocin: { label: "Feeling connected", color: "#f472b6", glow: "#f472b680", icon: "◈", desc: "Warmth, trust & belonging", science: "Oxytocin" },
  serotonin: { label: "Inner calm & stability", color: "#34d399", glow: "#34d39980", icon: "◉", desc: "Contentment & emotional steadiness", science: "Serotonin" },
  dopamine: { label: "Drive & motivation", color: "#60a5fa", glow: "#60a5fa80", icon: "◆", desc: "Focus, momentum & reward", science: "Dopamine" },
  endorphin: { label: "Joy & natural high", color: "#fbbf24", glow: "#fbbf2480", icon: "◇", desc: "Euphoria, play & relief", science: "Endorphins" },
  gaba: { label: "Less anxiety & worry", color: "#a78bfa", glow: "#a78bfa80", icon: "○", desc: "Quiet mind & nervous system ease", science: "GABA" },
  cortisol: { label: "Less stress & tension", color: "#f87171", glow: "#f8717180", icon: "⊗", desc: "Lower reactivity & physical calm", science: "↓ Cortisol" },
  focus: { label: "Better focus", color: "#38bdf8", glow: "#38bdf880", icon: "◎", desc: "Clarity, attention & flow", science: "Acetylcholine" },
};

const interventions = [
  {
    id: "deep_breathing",
    name: "Deep / Box Breathing",
    category: "Mind",
    icon: "🌬️",
    time: "5 min",
    effort: "Low",
    chemicals: { oxytocin: 1, serotonin: 2, gaba: 3, cortisol: 3, dopamine: 1, focus: 2 },
    tags: ["anxious", "stressed", "overwhelmed", "work"],
    description: "Activates the parasympathetic nervous system, rapidly lowering cortisol and flooding the brain with calming GABA.",
  },
  {
    id: "cold_exposure",
    name: "Cold Shower / Plunge",
    category: "Body",
    icon: "🧊",
    time: "3–10 min",
    effort: "High",
    chemicals: { dopamine: 3, endorphin: 3, serotonin: 2, cortisol: 2, focus: 3 },
    tags: ["low energy", "depressed", "sluggish", "morning"],
    description: "Triggers a 250–300% dopamine spike that lasts hours, plus endorphin rush. One of the most reliable mood-lifters known.",
  },
  {
    id: "sunlight",
    name: "Morning Sunlight",
    category: "Body",
    icon: "☀️",
    time: "10–20 min",
    effort: "Low",
    chemicals: { serotonin: 3, dopamine: 2, cortisol: 1, focus: 2 },
    tags: ["depressed", "low energy", "morning", "sleep issues"],
    description: "Sets circadian rhythm, triggers serotonin synthesis, and calibrates cortisol to peak at the right time so you feel awake, not anxious.",
  },
  {
    id: "exercise",
    name: "Aerobic Exercise",
    category: "Body",
    icon: "🏃",
    time: "20–45 min",
    effort: "High",
    chemicals: { endorphin: 3, dopamine: 3, serotonin: 3, cortisol: 2, gaba: 2, focus: 3 },
    tags: ["depressed", "anxious", "low energy", "work"],
    description: "The most comprehensive neurochemical intervention. Triggers BDNF (brain fertilizer), all four mood chemicals, and reduces chronic cortisol.",
  },
  {
    id: "physical_touch",
    name: "Hug / Physical Touch",
    category: "With Others",
    icon: "🤗",
    time: "20+ sec",
    effort: "Low",
    chemicals: { oxytocin: 3, serotonin: 2, cortisol: 3, gaba: 2 },
    tags: ["lonely", "anxious", "stressed", "grief"],
    description: "A 20+ second hug triggers a significant oxytocin release, measurably lowering blood pressure and cortisol within minutes.",
  },
  {
    id: "meditation",
    name: "Mindfulness Meditation",
    category: "Mind",
    icon: "🧘",
    time: "10–20 min",
    effort: "Medium",
    chemicals: { serotonin: 3, gaba: 3, dopamine: 2, cortisol: 3, oxytocin: 1, focus: 3 },
    tags: ["anxious", "stressed", "overwhelmed", "scattered"],
    description: "Regular practice literally thickens the prefrontal cortex, reducing amygdala reactivity and chronically lowering baseline cortisol.",
  },
  {
    id: "music",
    name: "Music You Love",
    category: "Mind",
    icon: "🎵",
    time: "Any",
    effort: "Low",
    chemicals: { dopamine: 3, endorphin: 2, serotonin: 2, oxytocin: 1 },
    tags: ["low energy", "depressed", "work", "morning"],
    description: "Music activates the nucleus accumbens (pleasure center). Anticipation of a favorite song triggers dopamine before it even plays.",
  },
  {
    id: "social_connection",
    name: "Meaningful Conversation",
    category: "With Others",
    icon: "💬",
    time: "20+ min",
    effort: "Medium",
    chemicals: { oxytocin: 3, serotonin: 2, dopamine: 2, cortisol: 2 },
    tags: ["lonely", "depressed", "grief", "disconnected"],
    description: "Deep conversation activates shared neural states. Laughter releases endorphins; eye contact releases oxytocin.",
  },
  {
    id: "sleep",
    name: "Quality Sleep",
    category: "Body",
    icon: "😴",
    time: "7–9 hrs",
    effort: "Low",
    chemicals: { serotonin: 3, gaba: 3, dopamine: 2, cortisol: 3, focus: 3 },
    tags: ["depressed", "anxious", "low energy", "sleep issues"],
    description: "Sleep is when your brain clears cortisol, consolidates dopamine receptors, and produces the serotonin precursors needed for the next day.",
  },
  {
    id: "gratitude",
    name: "Gratitude Practice",
    category: "Mind",
    icon: "✨",
    time: "5 min",
    effort: "Low",
    chemicals: { serotonin: 3, dopamine: 2, oxytocin: 2, cortisol: 2, focus: 1 },
    tags: ["depressed", "morning", "grief", "scattered"],
    description: "Writing 3 specific gratitudes activates the medial prefrontal cortex and measurably raises serotonin — similar to exercise in studies.",
  },
  {
    id: "nature",
    name: "Time in Nature",
    category: "Body",
    icon: "🌿",
    time: "20+ min",
    effort: "Low",
    chemicals: { serotonin: 3, cortisol: 3, gaba: 2, endorphin: 1, focus: 2 },
    tags: ["stressed", "overwhelmed", "anxious", "scattered"],
    description: "Exposure to natural environments lowers cortisol by 15–20%, reduces rumination, and raises serotonin through sunlight and negative ions.",
  },
  {
    id: "creative_flow",
    name: "Creative Flow State",
    category: "Mind",
    icon: "🎨",
    time: "30+ min",
    effort: "Medium",
    chemicals: { dopamine: 3, endorphin: 2, serotonin: 2, gaba: 1, focus: 3 },
    tags: ["scattered", "work", "low energy", "morning"],
    description: "Flow releases a cascade of neurochemicals including norepinephrine, dopamine, and endorphins. Time distortion is the signal you're in it.",
  },
  {
    id: "laughter",
    name: "Laughter & Play",
    category: "With Others",
    icon: "😂",
    time: "Any",
    effort: "Low",
    chemicals: { endorphin: 3, dopamine: 2, oxytocin: 2, cortisol: 2 },
    tags: ["stressed", "depressed", "lonely", "overwhelmed"],
    description: "Genuine laughter releases endorphins and reduces cortisol within 15 minutes. Social laughter is 30x more common than solo laughter — connection amplifies the effect.",
  },
  {
    id: "journaling",
    name: "Expressive Journaling",
    category: "Mind",
    icon: "📓",
    time: "15 min",
    effort: "Low",
    chemicals: { cortisol: 3, gaba: 2, serotonin: 2, dopamine: 1, focus: 2 },
    tags: ["anxious", "grief", "overwhelmed", "stressed"],
    description: "Writing about difficult emotions (not just logging) reduces cortisol and activates the ventral prefrontal cortex, dampening amygdala reactivity.",
  },
  {
    id: "nutrition",
    name: "Gut-Supporting Foods",
    category: "Body",
    icon: "🥗",
    time: "Ongoing",
    effort: "Medium",
    chemicals: { serotonin: 3, gaba: 2, cortisol: 2, dopamine: 2, focus: 2 },
    tags: ["depressed", "anxious", "low energy", "sleep issues"],
    description: "90% of serotonin is made in the gut. Fermented foods, omega-3s, and fiber feed the microbiome that regulates mood, cortisol response, and sleep.",
  },
];

const mindBodyInterventions = [
  {
    id: "mantra_movement",
    name: "Mantra-Based Repetitive Movement",
    category: "Mind-Body",
    icon: "🔄",
    time: "10–20 min",
    effort: "Low",
    chemicals: { dopamine: 3, serotonin: 3, gaba: 3, cortisol: 3, oxytocin: 2, focus: 3 },
    tags: ["anxious", "scattered", "overwhelmed", "depressed", "low energy", "stressed"],
    description: "Rhythmic movement paired with repeated intention or phrase creates a dual-channel reset: the body's motor loop quiets the thinking mind while the mantra anchors a new emotional state. This is one of the fastest known pathways to shifting neurochemical baseline — rhythm regulates dopamine, repetition calms the amygdala, and intentional language activates the prefrontal cortex simultaneously.",
  },
  {
    id: "power_posing",
    name: "Power Posing & Embodied Presence",
    category: "Mind-Body",
    icon: "🦁",
    time: "5–10 min",
    effort: "Low",
    chemicals: { dopamine: 3, cortisol: 3, serotonin: 2, endorphin: 2, gaba: 1, focus: 2 },
    tags: ["low energy", "depressed", "work", "scattered", "anxious", "morning"],
    description: "Expansive body postures signal safety and confidence to the nervous system — shifting physiology before the mind catches up. Holding an open, grounded stance for 2 minutes measurably lowers cortisol and raises the sense of agency and calm. Paired with intention, it's a fast-acting tool for entering high-stakes moments from a regulated state.",
  },
  {
    id: "somatic_shaking",
    name: "Somatic Release & Shaking",
    category: "Mind-Body",
    icon: "🌊",
    time: "5–15 min",
    effort: "Low",
    chemicals: { cortisol: 3, gaba: 3, endorphin: 2, serotonin: 2 },
    tags: ["stressed", "anxious", "overwhelmed", "grief", "scattered"],
    description: "Animals shake after threat to discharge adrenaline and cortisol from the body — humans can do the same intentionally. Gentle full-body trembling or shaking activates the parasympathetic system, releases stored tension in the fascia, and allows the nervous system to complete its stress cycle rather than holding it chronically.",
  },
  {
    id: "breathwork_movement",
    name: "Breathwork with Movement",
    category: "Mind-Body",
    icon: "💨",
    time: "10–15 min",
    effort: "Medium",
    chemicals: { gaba: 3, serotonin: 3, cortisol: 3, endorphin: 2, dopamine: 2, focus: 2 },
    tags: ["anxious", "depressed", "overwhelmed", "grief", "low energy"],
    description: "Coordinating breath cycles with intentional physical movement — flowing arm sweeps, gentle spinal waves, rhythmic stepping — synchronizes the vagus nerve, respiratory system, and motor cortex. This produces a full-body calm that pure stillness meditation often can't reach for people who feel too activated to sit.",
  },
  {
    id: "dance_embodiment",
    name: "Free Dance & Embodiment",
    category: "Mind-Body",
    icon: "💃",
    time: "10–20 min",
    effort: "Medium",
    chemicals: { dopamine: 3, endorphin: 3, serotonin: 2, oxytocin: 2, cortisol: 2 },
    tags: ["depressed", "low energy", "disconnected", "lonely", "stressed"],
    description: "Unstructured movement to music bypasses the analytical mind and drops directly into the body's pleasure and reward systems. Dance simultaneously activates dopamine (music + movement), endorphins (rhythmic exertion), oxytocin (if with others), and serotonin (felt self-expression). Even alone, 10 minutes can shift a mood state entirely.",
  },
];

const allInterventions = [...interventions, ...mindBodyInterventions];

const situations = ["anxious", "stressed", "overwhelmed", "depressed", "low energy", "lonely", "grief", "scattered", "morning", "work", "sleep issues", "disconnected"];
const goals = Object.keys(chemicals);
const efforts = ["Low", "Medium", "High"];
const categories = ["Body", "Mind", "With Others", "Mind-Body"];

const effortColors = { Low: "#34d399", Medium: "#fbbf24", High: "#f87171" };

export default function NeuroMatrix() {
  const [step, setStep] = useState(0); // 0=intro, 1=form, 2=results
  const [userNote, setUserNote] = useState("");
  const [selectedSituations, setSelectedSituations] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedEffort, setSelectedEffort] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [results, setResults] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [aiInsight, setAiInsight] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [viewMode, setViewMode] = useState("cards");
  const [savedPractices, setSavedPractices] = useState([]);
  const [dismissedPractices, setDismissedPractices] = useState([]);

  const toggleSave = (item) => {
    setSavedPractices(prev =>
      prev.find(s => s.id === item.id) ? prev.filter(s => s.id !== item.id) : [...prev, item]
    );
  };

  const toggleDismiss = (id) => {
    setDismissedPractices(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    setSavedPractices(prev => prev.filter(s => s.id !== id));
  };

  const visibleResults = results.slice(0, 9);

  const toggle = (list, setList, val) => {
    setList(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);
  };

  const score = (intervention) => {
    let s = 0;
    selectedSituations.forEach(sit => { if (intervention.tags.includes(sit)) s += 3; });
    selectedGoals.forEach(g => { s += (intervention.chemicals[g] || 0) * 2; });
    if (selectedEffort.length && selectedEffort.includes(intervention.effort)) s += 2;
    if (selectedCategories.length && selectedCategories.includes(intervention.category)) s += 2;
    return s;
  };

  const compute = async () => {
    const sorted = [...allInterventions].sort((a, b) => score(b) - score(a));
    setResults(sorted);
    setStep(2);
    setExpanded(null);

    if (userNote.trim() || selectedSituations.length) {
      setLoadingAI(true);
      setAiInsight("");
      try {
        const prompt = `You are a neuroscience-informed wellness coach. The user shared: "${userNote}". Their situation tags: ${selectedSituations.join(", ") || "none specified"}. Their goals: ${selectedGoals.map(g => chemicals[g]?.label).join(", ") || "general wellbeing"}. Their preferred effort level: ${selectedEffort.join(", ") || "any"}. Their preferred categories: ${selectedCategories.join(", ") || "any"}.

Write a warm, insightful 3-sentence personalized message that:
1. Acknowledges where they are
2. Names 1-2 of the most impactful neurochemical levers for their specific situation
3. Ends with a specific, encouraging first step they can take in the next 10 minutes

Keep it human, grounded, and science-backed — not generic. No bullet points. Just 3 sentences.`;

        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [{ role: "user", content: prompt }],
          }),
        });
        const data = await res.json();
        setAiInsight(data.content?.[0]?.text || "");
      } catch (e) {
        setAiInsight("");
      }
      setLoadingAI(false);
    }
  };

  const reset = () => {
    setStep(0); setUserNote(""); setSelectedSituations([]);
    setSelectedGoals([]); setSelectedEffort([]); setSelectedCategories([]);
    setResults([]); setAiInsight(""); setExpanded(null);
    setSavedPractices([]); setDismissedPractices([]);
  };

  

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 20% 20%, #0d1f2d 0%, #060d14 60%, #0a0f1a 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e2e8f0",
      padding: "0",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060d14; }
        ::-webkit-scrollbar-thumb { background: #1e3a4a; border-radius: 3px; }
        .fade-in { animation: fadeIn 0.6s ease forwards; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .pill { border-radius: 100px; border: 1px solid #1e3a4a; padding: 8px 16px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; transition: all 0.2s; background: transparent; color: #94a3b8; }
        .pill:hover { border-color: #34d399; color: #34d399; }
        .pill.active { background: #0d2a1f; border-color: #34d399; color: #34d399; }
        .pill.chem { }
        .btn-primary { background: linear-gradient(135deg, #0d4a3a, #1a6b52); border: 1px solid #34d399; color: #34d399; padding: 14px 32px; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 15px; cursor: pointer; transition: all 0.25s; }
        .btn-primary:hover { background: linear-gradient(135deg, #1a6b52, #0d4a3a); box-shadow: 0 0 24px #34d39940; }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
        .card { background: rgba(13,31,45,0.7); border: 1px solid #1e3a4a; border-radius: 16px; padding: 20px; transition: all 0.3s; cursor: pointer; }
        .card:hover { border-color: #2d5a6a; background: rgba(20,45,65,0.8); transform: translateY(-2px); }
        .card.open { border-color: #34d399; background: rgba(13,42,31,0.5); }
        .bar-wrap { height: 6px; background: #1e3a4a; border-radius: 3px; overflow: hidden; flex:1; }
        .bar { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
        textarea { background: rgba(13,31,45,0.8); border: 1px solid #1e3a4a; border-radius: 12px; color: #e2e8f0; font-family: 'DM Sans', sans-serif; font-size: 14px; padding: 14px 16px; width: 100%; resize: none; outline: none; transition: border-color 0.2s; }
        textarea:focus { border-color: #34d399; }
        textarea::placeholder { color: #4a6a7a; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", padding: "52px 24px 32px", borderBottom: "1px solid #1e3a4a10" }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.3em", color: "#34d399", textTransform: "uppercase", marginBottom: 12 }}>
          Neurochemistry Optimization
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 400, lineHeight: 1.15, color: "#f0fdf4", marginBottom: 10 }}>
          Your Inner<br /><em style={{ color: "#34d399" }}>Chemistry Lab</em>
        </h1>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#64748b", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
          Discover science-backed practices that raise your feel-good neurochemicals and lower stress hormones — personalized to exactly where you are right now.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* Step 0: Intro / chem legend */}
        {step === 0 && (
          <div className="fade-in">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, margin: "40px 0" }}>
              {Object.entries(chemicals).map(([k, c]) => (
                <div key={k} style={{ background: "rgba(13,31,45,0.7)", border: `1px solid ${c.color}30`, borderRadius: 12, padding: "16px 14px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, color: c.color, marginBottom: 6 }}>{c.icon}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 500, color: c.color, marginBottom: 4 }}>{c.label}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#64748b", marginBottom: 4 }}>{c.desc}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#2d4a5a", letterSpacing: "0.08em" }}>{c.science}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button className="btn-primary" onClick={() => setStep(1)}>Find My Protocol →</button>
            </div>
          </div>
        )}

        {/* Step 1: Form */}
        {step === 1 && (
          <div className="fade-in" style={{ paddingTop: 40 }}>

            <Section label="What's going on for you right now?" hint="Optional — helps personalize your insight">
              <textarea rows={3} placeholder="e.g. 'I've been feeling disconnected and my motivation is tanking. Work stress is real…'" value={userNote} onChange={e => setUserNote(e.target.value)} />
            </Section>

            <Section label="How are you feeling?" hint="Select all that apply">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {situations.map(s => (
                  <button key={s} className={`pill ${selectedSituations.includes(s) ? "active" : ""}`} onClick={() => toggle(selectedSituations, setSelectedSituations, s)}>
                    {s}
                  </button>
                ))}
              </div>
            </Section>

            <Section label="What do you want more of?" hint="Select everything that resonates">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {Object.entries(chemicals).map(([k, c]) => (
                  <button key={k} className={`pill ${selectedGoals.includes(k) ? "active" : ""}`}
                    style={selectedGoals.includes(k) ? { borderColor: c.color, color: c.color, background: c.color + "18" } : {}}
                    onClick={() => toggle(selectedGoals, setSelectedGoals, k)}>
                    {c.icon} {c.label}
                  </button>
                ))}
              </div>
            </Section>

            <Section label="Available effort right now?">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {efforts.map(e => (
                  <button key={e} className={`pill ${selectedEffort.includes(e) ? "active" : ""}`}
                    style={selectedEffort.includes(e) ? { borderColor: effortColors[e], color: effortColors[e], background: effortColors[e] + "18" } : {}}
                    onClick={() => toggle(selectedEffort, setSelectedEffort, e)}>
                    {e} effort
                  </button>
                ))}
              </div>
            </Section>

            <Section label="Preferred modality?">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {categories.map(c => (
                  <button key={c} className={`pill ${selectedCategories.includes(c) ? "active" : ""}`} onClick={() => toggle(selectedCategories, setSelectedCategories, c)}>
                    {c === "Body" ? "🏃" : c === "Mind" ? "🧠" : c === "With Others" ? "💬" : "🔀"} {c}
                  </button>
                ))}
              </div>
            </Section>

            <div style={{ textAlign: "center", marginTop: 32, display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="pill" onClick={() => setStep(0)} style={{ padding: "12px 24px" }}>← Back</button>
              <button className="btn-primary" onClick={compute} disabled={selectedSituations.length === 0 && selectedGoals.length === 0}>
                Generate My Protocol →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Results */}
        {step === 2 && (
          <div className="fade-in" style={{ paddingTop: 36 }}>

            {/* AI Insight */}
            {(loadingAI || aiInsight) && (
              <div style={{ background: "linear-gradient(135deg, #0d2a1f, #0a1f30)", border: "1px solid #34d39940", borderRadius: 16, padding: "24px 28px", marginBottom: 28 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.25em", color: "#34d399", textTransform: "uppercase", marginBottom: 12 }}>Your Personalized Insight</div>
                {loadingAI
                  ? <div style={{ color: "#4a7a5a", fontFamily: "'DM Sans'", fontSize: 14 }}>Analyzing your situation…</div>
                  : <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, lineHeight: 1.8, color: "#c8e6d4", fontStyle: "italic" }}>{aiInsight}</div>}
              </div>
            )}

            {/* Two-column layout */}
            <div style={{ display: "grid", gridTemplateColumns: savedPractices.length > 0 ? "1fr 300px" : "1fr", gap: 20, alignItems: "start" }}>

              {/* LEFT: Ranked cards */}
              <div>
                {/* View toggle */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#64748b" }}>
                    {visibleResults.length} practices ranked for you
                  </div>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["cards", "matrix"].map(m => (
                      <button key={m} className={`pill ${viewMode === m ? "active" : ""}`} style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => setViewMode(m)}>
                        {m === "cards" ? "Cards" : "Matrix"}
                      </button>
                    ))}
                  </div>
                </div>

                {viewMode === "cards" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {visibleResults.map((item, i) => (
                      <div key={item.id}
                        className={`card ${expanded === item.id ? "open" : ""}`}
                        style={{ opacity: dismissedPractices.includes(item.id) ? 0.3 : 1, transition: "opacity 0.3s" }}
                      >
                        {/* Top row */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ fontSize: 22, minWidth: 32, textAlign: "center" }}>{item.icon}</div>
                          <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                              <span style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 500, color: "#e2e8f0" }}>{item.name}</span>
                              {i < 3 && !dismissedPractices.includes(item.id) && (
                                <span style={{ fontFamily: "'DM Sans'", fontSize: 10, background: "#0d2a1f", border: "1px solid #34d399", color: "#34d399", borderRadius: 100, padding: "2px 8px" }}>Top pick</span>
                              )}
                            </div>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                              <Tag>{item.category}</Tag>
                              <Tag color={effortColors[item.effort]}>{item.effort} effort</Tag>
                              <Tag>⏱ {item.time}</Tag>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                            {/* Star / Save */}
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleSave(item); }}
                              title={savedPractices.find(s => s.id === item.id) ? "Remove from plan" : "Save to plan"}
                              style={{
                                background: savedPractices.find(s => s.id === item.id) ? "#1a3a1f" : "transparent",
                                border: `1px solid ${savedPractices.find(s => s.id === item.id) ? "#34d399" : "#2d4a5a"}`,
                                borderRadius: 8,
                                padding: "5px 8px",
                                cursor: "pointer",
                                fontSize: 15,
                                lineHeight: 1,
                                transition: "all 0.2s",
                              }}
                            >
                              {savedPractices.find(s => s.id === item.id) ? "★" : "☆"}
                            </button>
                            {/* Not for me */}
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleDismiss(item.id); }}
                              title="Not for me"
                              style={{
                                background: dismissedPractices.includes(item.id) ? "#2a1515" : "transparent",
                                border: `1px solid ${dismissedPractices.includes(item.id) ? "#f87171" : "#2d4a5a"}`,
                                borderRadius: 8,
                                padding: "5px 8px",
                                cursor: "pointer",
                                fontSize: 12,
                                color: dismissedPractices.includes(item.id) ? "#f87171" : "#4a6a7a",
                                fontFamily: "'DM Sans'",
                                transition: "all 0.2s",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {dismissedPractices.includes(item.id) ? "✕ skipped" : "✕ not for me"}
                            </button>
                            {/* Expand chevron */}
                            <div
                              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                              style={{ color: "#34d399", fontSize: 11, cursor: "pointer", padding: "4px", userSelect: "none" }}
                            >
                              {expanded === item.id ? "▲" : "▼"}
                            </div>
                          </div>
                        </div>

                        {/* Chemical bars */}
                        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px 16px" }}>
                          {Object.entries(item.chemicals).map(([k, v]) => v > 0 && (
                            <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: chemicals[k]?.color, minWidth: 78 }}>{chemicals[k]?.science}</span>
                              <div className="bar-wrap">
                                <div className="bar" style={{ width: `${(v / 3) * 100}%`, background: chemicals[k]?.color }} />
                              </div>
                            </div>
                          ))}
                        </div>

                        {expanded === item.id && (
                          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #1e3a4a", fontFamily: "'DM Sans'", fontSize: 13, color: "#94a3b8", lineHeight: 1.75 }}>
                            {item.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {viewMode === "matrix" && (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans'", fontSize: 12 }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 400, borderBottom: "1px solid #1e3a4a" }}>Practice</th>
                          {Object.entries(chemicals).map(([k, c]) => (
                            <th key={k} style={{ padding: "8px 8px", color: c.color, fontWeight: 400, borderBottom: "1px solid #1e3a4a", textAlign: "center" }}>
                              {c.icon}
                            </th>
                          ))}
                          <th style={{ padding: "8px 8px", borderBottom: "1px solid #1e3a4a" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {visibleResults.map((item, i) => (
                          <tr key={item.id} style={{ borderBottom: "1px solid #1e3a4a10", background: i % 2 === 0 ? "rgba(13,31,45,0.3)" : "transparent", opacity: dismissedPractices.includes(item.id) ? 0.3 : 1 }}>
                            <td style={{ padding: "10px 12px", color: "#e2e8f0" }}>
                              <span style={{ marginRight: 6 }}>{item.icon}</span>{item.name}
                            </td>
                            {Object.keys(chemicals).map(k => {
                              const v = item.chemicals[k] || 0;
                              return (
                                <td key={k} style={{ textAlign: "center", padding: "10px 8px" }}>
                                  {v > 0 ? (
                                    <div style={{ display: "flex", justifyContent: "center", gap: 2 }}>
                                      {[1, 2, 3].map(dot => (
                                        <div key={dot} style={{ width: 6, height: 6, borderRadius: "50%", background: dot <= v ? chemicals[k]?.color : "#1e3a4a" }} />
                                      ))}
                                    </div>
                                  ) : <span style={{ color: "#2d3748" }}>—</span>}
                                </td>
                              );
                            })}
                            <td style={{ padding: "10px 8px", textAlign: "right" }}>
                              <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                                <button onClick={() => toggleSave(item)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: savedPractices.find(s => s.id === item.id) ? "#34d399" : "#4a6a7a" }}>
                                  {savedPractices.find(s => s.id === item.id) ? "★" : "☆"}
                                </button>
                                <button onClick={() => toggleDismiss(item.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: dismissedPractices.includes(item.id) ? "#f87171" : "#4a6a7a", fontFamily: "'DM Sans'" }}>✕</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ marginTop: 12, display: "flex", gap: 16, fontFamily: "'DM Sans'", fontSize: 11, color: "#4a6a7a", flexWrap: "wrap" }}>
                      {Object.entries(chemicals).map(([k, c]) => (
                        <span key={k}>{c.icon} {c.label}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ textAlign: "center", marginTop: 28 }}>
                  <button className="pill" onClick={reset} style={{ padding: "10px 24px" }}>← Start Over</button>
                </div>
              </div>

              {/* RIGHT: Saved panel */}
              {savedPractices.length > 0 && (
                <div style={{ position: "sticky", top: 20 }}>
                  <div style={{ background: "linear-gradient(160deg, #0d2a1f 0%, #081520 100%)", border: "1px solid #34d39940", borderRadius: 16, padding: "20px 18px" }}>
                    <div style={{ fontFamily: "'DM Sans'", fontSize: 10, letterSpacing: "0.28em", color: "#34d399", textTransform: "uppercase", marginBottom: 14 }}>
                      My Practice Plan
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                      {savedPractices.map((item) => (
                        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(13,31,45,0.6)", border: "1px solid #1e3a4a", borderRadius: 10, padding: "10px 12px" }}>
                          <span style={{ fontSize: 16 }}>{item.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 500, color: "#e2e8f0", lineHeight: 1.3 }}>{item.name}</div>
                            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#4a6a7a", marginTop: 2 }}>⏱ {item.time}</div>
                          </div>
                          <button
                            onClick={() => toggleSave(item)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#f87171", fontSize: 14, lineHeight: 1, padding: 2 }}
                            title="Remove"
                          >✕</button>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: "1px solid #1e3a4a", paddingTop: 14, marginBottom: 14 }}>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#4a6a7a", marginBottom: 6 }}>
                        {savedPractices.length} practice{savedPractices.length > 1 ? "s" : ""} selected
                      </div>
                      {/* Mini chemical summary */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {Object.entries(chemicals).map(([k, c]) => {
                          const total = savedPractices.reduce((sum, p) => sum + (p.chemicals[k] || 0), 0);
                          if (total === 0) return null;
                          return (
                            <span key={k} style={{ fontFamily: "'DM Sans'", fontSize: 10, color: c.color, background: c.color + "15", border: `1px solid ${c.color}30`, borderRadius: 100, padding: "2px 7px" }}>
                              {c.science} ×{total}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      className="btn-primary"
                      style={{ width: "100%", textAlign: "center", padding: "12px 16px", fontSize: 13 }}
                      onClick={() => setStep(3)}
                    >
                      ✦ Generate My Activity Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Activity Plan */}
        {step === 3 && (
          <ActivityPlan
            savedPractices={savedPractices}
            userNote={userNote}
            selectedSituations={selectedSituations}
            selectedGoals={selectedGoals}
            onBack={() => setStep(2)}
            onReset={reset}
          />
        )}
      </div>
    </div>
  );
}

function ActivityPlan({ savedPractices, userNote, selectedSituations, selectedGoals, onBack, onReset }) {
  const [energyLevel, setEnergyLevel] = useState(null);
  const [creativeInterest, setCreativeInterest] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [energyToday, setEnergyToday] = useState(3); // 1-5 daily check-in
  const [completedBlocks, setCompletedBlocks] = useState({});

  const energyProfiles = {
    high: { label: "High Energy", desc: "I'm ready to go — full capacity today", icon: "⚡", color: "#fbbf24" },
    medium: { label: "Moderate Energy", desc: "Steady but not at full throttle", icon: "🌿", color: "#34d399" },
    low: { label: "Low / Depleted", desc: "Running on empty, need gentle support", icon: "🌙", color: "#a78bfa" },
  };

  const generate = async () => {
    setLoading(true);
    setPlanData(null);

    const practiceList = savedPractices.map(p => `${p.name} (${p.time}, ${p.effort} effort, category: ${p.category})`).join("; ");
    const creativeNote = creativeInterest === "yes" ? "The user enjoys creative work and wants it incorporated during high-dopamine states." : "The user does not have a specific creative focus.";

    const prompt = `You are a neuroscience-informed wellbeing coach creating a personalized daily activity plan.

User context: "${userNote || "No additional context provided."}"
Current feelings: ${selectedSituations.join(", ") || "not specified"}
Energy profile: ${energyLevel}
Creative preference: ${creativeNote}
Selected practices: ${practiceList}

Generate a structured daily activity plan. Respond with ONLY a valid JSON object — no explanation, no markdown fences, no extra text before or after.

The JSON must have exactly this shape:
{
  "title": "short evocative plan title",
  "tagline": "one sentence capturing the spirit of this plan",
  "energyNote": "2 sentences adapting this plan to their ${energyLevel} energy level and how to avoid burnout",
  "rewardZones": [
    {
      "id": "block_1",
      "time": "9:00 – 9:45 AM",
      "title": "name of this block",
      "type": "morning_activation",
      "practice": "which saved practice anchors this block",
      "why": "1-2 sentences on the neurochemical reason this block is placed here",
      "lowEnergySwap": "a gentler version for depleted days",
      "highEnergyBoost": "an amplified version for peak days",
      "acetylcholine": true
    }
  ],
  "burnoutGuard": "3 sentences on reading warning signs and adapting before burnout hits",
  "weeklyRhythm": "2 sentences on varying this plan across the week for neurochemical diversity"
}

Rules:
- type must be one of: morning_activation, reward_zone, recovery, social, creative_flow, wind_down
- acetylcholine must be true or false (no quotes)
- Create 5-7 rewardZones forming a coherent morning-to-evening arc
- Place creative/flow work in the mid-morning highest-dopamine window
- Include at least one recovery block
- Make it warm and genuinely personalized
- Return ONLY the JSON object, nothing else`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message || "API error");
      const text = data.content?.[0]?.text || "";
      const clean = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
      const parsed = JSON.parse(clean);
      setPlanData(parsed);
    } catch (e) {
      console.error("Plan generation error:", e);
      setPlanData({ error: `Couldn't generate plan: ${e.message}. Please try again.` });
    }
    setLoading(false);
  };

  const toggleBlock = (id) => {
    setCompletedBlocks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const exportPDF = () => {
    if (!planData || planData.error) return;
    const completedCount = Object.values(completedBlocks).filter(Boolean).length;
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${planData.title}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #fff; color: #1a2a1a; padding: 48px; max-width: 800px; margin: 0 auto; }
  .header { border-bottom: 2px solid #0d4a3a; padding-bottom: 24px; margin-bottom: 32px; }
  .badge { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #0d4a3a; margin-bottom: 8px; }
  h1 { font-family: 'Playfair Display', serif; font-size: 32px; color: #0a1f10; margin-bottom: 6px; }
  .tagline { font-size: 14px; color: #4a7a5a; font-style: italic; margin-bottom: 16px; }
  .energy-note { background: #f0fdf4; border-left: 3px solid #34d399; padding: 12px 16px; border-radius: 4px; font-size: 13px; color: #2d5a3a; line-height: 1.6; margin-bottom: 24px; }
  .section-title { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #0d4a3a; margin: 28px 0 14px; }
  .block { border: 1px solid #d1fae5; border-radius: 10px; padding: 16px 18px; margin-bottom: 12px; page-break-inside: avoid; }
  .block-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px; }
  .block-time { font-size: 11px; color: #6b9a7a; min-width: 110px; margin-top: 2px; }
  .block-title { font-size: 15px; font-weight: 600; color: #0a1f10; }
  .block-practice { font-size: 12px; color: #34d399; margin-bottom: 6px; font-weight: 500; }
  .block-why { font-size: 12px; color: #4a6a5a; line-height: 1.6; margin-bottom: 8px; }
  .block-swaps { display: flex; gap: 12px; }
  .swap { flex: 1; background: #f8fffe; border: 1px solid #d1fae5; border-radius: 6px; padding: 8px 10px; }
  .swap-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #6b9a7a; margin-bottom: 3px; }
  .swap-text { font-size: 11px; color: #2d5a3a; line-height: 1.5; }
  .rz-badge { display: inline-block; font-size: 10px; background: #d1fae5; color: #065f46; border-radius: 100px; padding: 2px 8px; margin-left: 8px; }
  .burnout { background: #fffbeb; border-left: 3px solid #f59e0b; padding: 14px 16px; border-radius: 4px; font-size: 13px; color: #78350f; line-height: 1.7; margin-bottom: 16px; }
  .weekly { background: #f0fdf4; border-left: 3px solid #34d399; padding: 14px 16px; border-radius: 4px; font-size: 13px; color: #2d5a3a; line-height: 1.7; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #d1fae5; font-size: 11px; color: #9ca3af; text-align: center; }
  .progress { font-size: 12px; color: #6b9a7a; margin-bottom: 24px; }
</style>
</head>
<body>
<div class="header">
  <div class="badge">✦ Neurochemistry Activity Plan</div>
  <h1>${planData.title}</h1>
  <div class="tagline">${planData.tagline}</div>
  <div class="progress">Energy profile: ${energyProfiles[energyLevel]?.icon} ${energyProfiles[energyLevel]?.label} &nbsp;|&nbsp; ${savedPractices.length} practices &nbsp;|&nbsp; ${completedCount}/${planData.rewardZones?.length || 0} blocks completed</div>
  <div class="energy-note">${planData.energyNote}</div>
</div>

<div class="section-title">Daily Reward Zones</div>
${(planData.rewardZones || []).map(block => `
<div class="block">
  <div class="block-header">
    <div class="block-time">${block.time}</div>
    <div>
      <div class="block-title">${block.title}${block.acetylcholine ? '<span class="rz-badge">⚡ Reward Zone</span>' : ''}</div>
      <div class="block-practice">↳ ${block.practice}</div>
    </div>
  </div>
  <div class="block-why">${block.why}</div>
  <div class="block-swaps">
    <div class="swap"><div class="swap-label">🌙 Low energy</div><div class="swap-text">${block.lowEnergySwap}</div></div>
    <div class="swap"><div class="swap-label">⚡ High energy</div><div class="swap-text">${block.highEnergyBoost}</div></div>
  </div>
</div>`).join("")}

<div class="section-title">Burnout Guard</div>
<div class="burnout">${planData.burnoutGuard}</div>

<div class="section-title">Weekly Rhythm</div>
<div class="weekly">${planData.weeklyRhythm}</div>

<div class="footer">Generated by Your Inner Chemistry Lab &nbsp;·&nbsp; ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
</body>
</html>`;

    const win = window.open("", "_blank");
    win.document.write(html);
    win.document.close();
    setTimeout(() => { win.print(); }, 600);
  };

  const blockTypeConfig = {
    morning_activation: { color: "#fbbf24", label: "Morning Activation", icon: "🌅" },
    reward_zone: { color: "#60a5fa", label: "Reward Zone", icon: "⚡" },
    recovery: { color: "#a78bfa", label: "Recovery", icon: "🌿" },
    social: { color: "#f472b6", label: "With Others", icon: "💬" },
    creative_flow: { color: "#34d399", label: "Creative Flow", icon: "🎨" },
    wind_down: { color: "#818cf8", label: "Wind Down", icon: "🌙" },
  };

  return (
    <div className="fade-in" style={{ paddingTop: 32 }}>
      <style>{`
        @media print { .no-print { display: none !important; } }
        .block-card { transition: all 0.25s; }
        .block-card:hover { transform: translateY(-1px); }
        .block-card.done { opacity: 0.55; }
        .check-btn { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #2d5a3a; background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 11px; transition: all 0.2s; flex-shrink: 0; }
        .check-btn.checked { background: #34d399; border-color: #34d399; color: #0a1f10; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 10, letterSpacing: "0.3em", color: "#34d399", textTransform: "uppercase", marginBottom: 8 }}>Step 3</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#f0fdf4", fontWeight: 400, marginBottom: 6 }}>Your Activity Plan</h2>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#4a6a7a", lineHeight: 1.6 }}>Built around your {savedPractices.length} saved practices — with Reward Zones, energy adaptations, and a burnout guard.</p>
      </div>

      {/* Energy + Creative setup (before generation) */}
      {!planData && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Energy profile */}
          <div style={{ background: "rgba(13,31,45,0.7)", border: "1px solid #1e3a4a", borderRadius: 16, padding: "22px 24px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#e2e8f0", marginBottom: 4 }}>What's your typical energy like?</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#4a6a7a", marginBottom: 16 }}>This shapes how demanding your plan will be and how recovery is built in.</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {Object.entries(energyProfiles).map(([k, v]) => (
                <button key={k} onClick={() => setEnergyLevel(k)}
                  style={{ background: energyLevel === k ? v.color + "20" : "rgba(13,31,45,0.5)", border: `1px solid ${energyLevel === k ? v.color : "#1e3a4a"}`, borderRadius: 12, padding: "14px 12px", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{v.icon}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, color: energyLevel === k ? v.color : "#e2e8f0", marginBottom: 3 }}>{v.label}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#4a6a7a", lineHeight: 1.4 }}>{v.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Creative interest */}
          <div style={{ background: "rgba(13,31,45,0.7)", border: "1px solid #1e3a4a", borderRadius: 16, padding: "22px 24px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#e2e8f0", marginBottom: 4 }}>Do you want creative work in your plan?</div>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#4a6a7a", marginBottom: 16 }}>Creative flow during peak dopamine states is one of the most powerful Reward Zones.</div>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ k: "yes", label: "Yes — I have creative work I enjoy", icon: "🎨" }, { k: "no", label: "Not right now", icon: "—" }].map(opt => (
                <button key={opt.k} onClick={() => setCreativeInterest(opt.k)}
                  style={{ flex: 1, background: creativeInterest === opt.k ? "#34d39920" : "rgba(13,31,45,0.5)", border: `1px solid ${creativeInterest === opt.k ? "#34d399" : "#1e3a4a"}`, borderRadius: 12, padding: "14px", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 18, marginBottom: 6 }}>{opt.icon}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: creativeInterest === opt.k ? "#34d399" : "#94a3b8" }}>{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Saved practices preview */}
          <div style={{ background: "rgba(13,31,45,0.5)", border: "1px solid #1e3a4a", borderRadius: 16, padding: "18px 20px" }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: "0.2em", color: "#4a6a7a", textTransform: "uppercase", marginBottom: 12 }}>Practices being woven in</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {savedPractices.map(p => (
                <span key={p.id} style={{ fontFamily: "'DM Sans'", fontSize: 12, background: "#0d2a1f", border: "1px solid #1e4a2a", color: "#34d399", borderRadius: 100, padding: "4px 12px" }}>
                  {p.icon} {p.name}
                </span>
              ))}
            </div>
          </div>

          <button className="btn-primary" disabled={!energyLevel || !creativeInterest} onClick={generate}
            style={{ alignSelf: "center", padding: "14px 40px", fontSize: 15 }}>
            ✦ Build My Plan
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#34d399", marginBottom: 12, fontStyle: "italic" }}>Mapping your day…</div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#4a6a7a" }}>Placing your Reward Zones, recovery windows & creative flow blocks</div>
        </div>
      )}

      {/* Error */}
      {planData?.error && (
        <div style={{ textAlign: "center", padding: 32, color: "#f87171", fontFamily: "'DM Sans'", fontSize: 14 }}>
          {planData.error}
          <br /><button className="btn-primary" onClick={generate} style={{ marginTop: 16 }}>Try Again</button>
        </div>
      )}

      {/* Plan output */}
      {planData && !planData.error && (
        <div>
          {/* Plan header */}
          <div style={{ background: "linear-gradient(135deg, #0d2a1f, #0a1f30)", border: "1px solid #34d39940", borderRadius: 18, padding: "28px 28px 22px", marginBottom: 24 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 10, letterSpacing: "0.3em", color: "#34d399", textTransform: "uppercase", marginBottom: 8 }}>✦ Your Neurochemistry Activity Plan</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#f0fdf4", marginBottom: 6 }}>{planData.title}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#6a9a7a", fontStyle: "italic", marginBottom: 18 }}>{planData.tagline}</div>
            <div style={{ background: "rgba(13,31,45,0.6)", border: "1px solid #1e4a2a", borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#34d399", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
                {energyProfiles[energyLevel]?.icon} {energyProfiles[energyLevel]?.label} Adaptation
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>{planData.energyNote}</div>
            </div>

            {/* Daily energy check-in */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#4a6a7a" }}>Today's energy check-in:</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setEnergyToday(n)}
                    style={{ width: 28, height: 28, borderRadius: "50%", border: `2px solid ${n <= energyToday ? "#34d399" : "#1e3a4a"}`, background: n <= energyToday ? "#34d39920" : "none", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 11, color: n <= energyToday ? "#34d399" : "#4a6a7a", transition: "all 0.15s" }}>
                    {n}
                  </button>
                ))}
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#4a6a7a" }}>
                {energyToday <= 2 ? "→ use Low Energy swaps today" : energyToday >= 5 ? "→ try the High Energy boosts!" : "→ follow the base plan"}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          {planData.rewardZones?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans'", fontSize: 11, color: "#4a6a7a", marginBottom: 6 }}>
                <span>Day progress</span>
                <span>{Object.values(completedBlocks).filter(Boolean).length} / {planData.rewardZones.length} blocks complete</span>
              </div>
              <div style={{ height: 6, background: "#1e3a4a", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "linear-gradient(90deg, #34d399, #60a5fa)", borderRadius: 3, width: `${(Object.values(completedBlocks).filter(Boolean).length / planData.rewardZones.length) * 100}%`, transition: "width 0.4s ease" }} />
              </div>
            </div>
          )}

          {/* Reward Zone blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {(planData.rewardZones || []).map((block) => {
              const typeConf = blockTypeConfig[block.type] || blockTypeConfig.reward_zone;
              const done = completedBlocks[block.id];
              return (
                <div key={block.id} className={`block-card ${done ? "done" : ""}`}
                  style={{ background: "rgba(13,31,45,0.7)", border: `1px solid ${done ? "#1e3a4a" : typeConf.color + "40"}`, borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    {/* Check button */}
                    <button className={`check-btn ${done ? "checked" : ""} no-print`} onClick={() => toggleBlock(block.id)}>
                      {done ? "✓" : ""}
                    </button>
                    <div style={{ flex: 1 }}>
                      {/* Block header */}
                      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: typeConf.color, background: typeConf.color + "18", border: `1px solid ${typeConf.color}40`, borderRadius: 100, padding: "2px 8px" }}>
                          {typeConf.icon} {typeConf.label}
                        </span>
                        {block.acetylcholine && (
                          <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#fbbf24", background: "#fbbf2415", border: "1px solid #fbbf2440", borderRadius: 100, padding: "2px 8px" }}>
                            ⚡ Reward Zone — Dopamine + Acetylcholine
                          </span>
                        )}
                        <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#4a6a7a", marginLeft: "auto" }}>{block.time}</span>
                      </div>

                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#e2e8f0", marginBottom: 4 }}>{block.title}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#34d399", marginBottom: 8 }}>↳ {block.practice}</div>
                      <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#64748b", lineHeight: 1.65, marginBottom: 12 }}>{block.why}</div>

                      {/* Energy swaps */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <div style={{ background: energyToday <= 2 ? "#1a0a2a" : "rgba(13,31,45,0.5)", border: `1px solid ${energyToday <= 2 ? "#a78bfa60" : "#1e3a4a"}`, borderRadius: 8, padding: "10px 12px", transition: "all 0.3s" }}>
                          <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#a78bfa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>🌙 Low energy swap</div>
                          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{block.lowEnergySwap}</div>
                        </div>
                        <div style={{ background: energyToday >= 5 ? "#0d2a10" : "rgba(13,31,45,0.5)", border: `1px solid ${energyToday >= 5 ? "#fbbf2460" : "#1e3a4a"}`, borderRadius: 8, padding: "10px 12px", transition: "all 0.3s" }}>
                          <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#fbbf24", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>⚡ High energy boost</div>
                          <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>{block.highEnergyBoost}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Burnout Guard + Weekly Rhythm */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
            <div style={{ background: "rgba(30,20,10,0.7)", border: "1px solid #f59e0b40", borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#f59e0b", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>🛡 Burnout Guard</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>{planData.burnoutGuard}</div>
            </div>
            <div style={{ background: "rgba(13,31,45,0.7)", border: "1px solid #34d39940", borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#34d399", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>📅 Weekly Rhythm</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>{planData.weeklyRhythm}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="no-print" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 12 }}>
            <button className="btn-primary" onClick={exportPDF} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              ↓ Export as PDF
            </button>
            <button className="pill" onClick={() => { setPlanData(null); setEnergyLevel(null); setCreativeInterest(null); setCompletedBlocks({}); }} style={{ padding: "12px 24px" }}>
              ↺ Regenerate Plan
            </button>
            <button className="pill" onClick={onBack} style={{ padding: "12px 24px" }}>← Back to Practices</button>
            <button className="pill" onClick={onReset} style={{ padding: "12px 24px" }}>Start Over</button>
          </div>
        </div>
      )}
    </div>
  );
}


function Section({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#e2e8f0", marginBottom: hint ? 4 : 12 }}>{label}</div>
      {hint && <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#4a6a7a", marginBottom: 12 }}>{hint}</div>}
      {children}
    </div>
  );
}

function Tag({ children, color }) {
  return (
    <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: color || "#4a6a7a", background: "#1e3a4a30", border: `1px solid ${color ? color + "40" : "#1e3a4a"}`, borderRadius: 100, padding: "2px 8px" }}>
      {children}
    </span>
  );
}
