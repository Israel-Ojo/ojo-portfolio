"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  ExternalLink, 
  Music, 
  Code2, 
  Terminal, 
  Sun, 
  Moon, 
  Menu, 
  LayoutGrid, 
  User, 
  Briefcase, 
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Send
} from "lucide-react";

// Animation Variants
const pageVariants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } }
};

const hoverScale = {
  hover: { scale: 1.03, y: -3, transition: { type: "spring", stiffness: 300, damping: 18 } },
  tap: { scale: 0.97 }
};

const pulseGlow = {
  scale: [1, 1.025, 1],
  boxShadow: [
    "0 0 0 rgba(16,185,129,0)",
    "0 0 24px rgba(16,185,129,0.16)",
    "0 0 0 rgba(16,185,129,0)"
  ]
};

const useTypewriter = (text: string, speed = 80, pause = 1400, deleteSpeed = 45) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      if (!deleting) {
        index += 1;
        setDisplayText(text.slice(0, index));
        if (index >= text.length) {
          deleting = true;
          timer = setTimeout(type, pause);
          return;
        }
        timer = setTimeout(type, speed);
        return;
      }

      index -= 1;
      setDisplayText(text.slice(0, index));
      if (index <= 0) {
        deleting = false;
        timer = setTimeout(type, 500);
        return;
      }
      timer = setTimeout(type, deleteSpeed);
    };

    timer = setTimeout(type, 350);
    return () => clearTimeout(timer);
  }, [text, speed, pause, deleteSpeed]);

  return displayText;
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "projects" | "contact">("overview");
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const heroTitle = useTypewriter("Hello, Check This Out!", 90, 1800, 50);
  const heroCode = useTypewriter("<div> I code React.js & Next.js </div>", 65, 1800, 35);

  useEffect(() => {
    if (window.localStorage.getItem("ojo-portfolio-theme") === "light") {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("ojo-portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText("israelojo899@gmail.com");
      } else {
        const input = document.createElement("textarea");
        input.value = "israelojo899@gmail.com";
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.focus();
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const goToTab = (tab: "overview" | "skills" | "projects" | "contact") => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    const subject = encodeURIComponent("Portfolio Project Inquiry");
    const body = encodeURIComponent(cleanMessage);
    window.location.href = `mailto:israelojo899@gmail.com?subject=${subject}&body=${body}`;

    setFormSubmitted(true);
    setMessage("");
    window.setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className={`min-h-screen font-sans p-3 sm:p-6 transition-colors duration-500 ${darkMode ? "bg-[#0c0d10] text-neutral-200" : "bg-neutral-100 text-neutral-800"}`}>
      
      {/* Outer App Shell Grid */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 relative">
        
        {/* ========================================================= */}
        {/* LEFT SIDEBAR: PROFILE & QUICK INFO                        */}
        {/* ========================================================= */}
        <motion.aside 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`lg:w-80 shrink-0 rounded-2xl p-5 flex flex-col justify-between border shadow-xl ${
            darkMode ? "bg-[#121318] border-neutral-800/80" : "bg-white border-neutral-200"
          }`}
        >
          <div>
            {/* Profile Avatar */}
            <div className="text-center pb-5 border-b border-neutral-800/40">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 mb-3 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <div className={`w-full h-full rounded-full flex items-center justify-center font-bold text-2xl ${darkMode ? "bg-[#0c0d10] text-white" : "bg-white text-neutral-900"}`}>
                  OI
                </div>
              </motion.div>
              <h2 className={`text-lg font-bold ${darkMode ? "text-white" : "text-neutral-900"}`}>Ojo Israel</h2>
              <p className="text-xs text-emerald-400 font-medium mt-0.5">Frontend Developer</p>
              <p className="text-[11px] text-neutral-500 mt-1">React.js & Next.js Specialist</p>
            </div>

            {/* Quick Details */}
            <div className="py-4 border-b border-neutral-800/40 text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-neutral-500">Specialty:</span>
                <span className={darkMode ? "text-neutral-300" : "text-neutral-700"}>Web Applications</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Frameworks:</span>
                <span className="text-emerald-400 font-medium">React / Next.js</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Status:</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <motion.span animate={{ scale: [1, 1.5, 1], opacity: [1, 0.45, 1] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-2 h-2 rounded-full bg-emerald-500"></motion.span>
                  Available for Hire
                </span>
              </div>
            </div>

            {/* Musical Skills Overview */}
            <div className="py-5 border-b border-neutral-800/40 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-emerald-400" /> Musical Talents
              </h3>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Drumming</span>
                  <span className="text-emerald-400 font-bold">64%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "64%" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-emerald-400 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Piano</span>
                  <span className="text-teal-400 font-bold">32%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "32%" }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-teal-400 rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Direct Interactive Actions */}
            <div className="pt-5 space-y-2.5 text-xs">
              <button 
                onClick={copyEmail}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-neutral-800/60 hover:border-emerald-500/50 bg-neutral-900/40 hover:bg-emerald-500/10 text-neutral-300 transition-all text-left"
              >
                <span className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> israelojo899@gmail.com
                </span>
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-500" />}
              </button>

              <a 
                href="tel:09052168730" 
                className="w-full flex items-center gap-2 p-2.5 rounded-xl border border-neutral-800/60 hover:border-emerald-500/50 bg-neutral-900/40 hover:bg-emerald-500/10 text-neutral-300 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 09052168730
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-5 mt-5 border-t border-neutral-800/40 flex justify-center gap-5 text-neutral-400">
            <motion.a 
              whileHover={{ y: -3, color: "#10b981" }}
              href="https://github.com/israel-ojo" 
              target="_blank" 
              rel="noreferrer" 
              title="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </motion.a>
            <motion.a 
              whileHover={{ y: -3, color: "#10b981" }}
              href="mailto:israelojo899@gmail.com" 
              title="Send Direct Email"
            >
              <Mail className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.aside>

        {/* ========================================================= */}
        {/* CENTER MAIN CONTENT ROUTER WITH ANIMATIONS                 */}
        {/* ========================================================= */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            
            {/* PAGE 1: OVERVIEW PAGE */}
            {activeTab === "overview" && (
              <motion.div 
                key="overview"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-5"
              >
                {/* Hero Banner */}
                <div className={`rounded-2xl p-6 sm:p-8 relative overflow-hidden border shadow-xl ${
                  darkMode ? "bg-[#121318] border-neutral-800/80" : "bg-white border-neutral-200"
                }`}>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" 
                  />
                  <motion.div
                    animate={{ x: [0, -35, 0], y: [0, 20, 0], opacity: [0.04, 0.12, 0.04] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-24 -left-16 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none"
                  />

                  <div className="relative z-10 max-w-xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                      <motion.span animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.12, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                        <Sparkles className="w-3.5 h-3.5" />
                      </motion.span> Frontend Developer
                    </span>

                    <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 leading-tight min-h-[2.5rem] sm:min-h-[3rem] ${darkMode ? "text-white" : "text-neutral-900"}`}>
                      {heroTitle}<span className="inline-block w-[2px] h-[0.9em] ml-1 bg-emerald-400 align-middle animate-pulse" />
                    </h1>

                    <div className="font-mono text-sm text-emerald-400 mb-5 min-h-6 flex items-center">
                      <span>{heroCode}</span><span className="inline-block w-[2px] h-4 ml-1 bg-emerald-400 animate-pulse" />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <motion.button 
                        variants={hoverScale}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => goToTab("projects")}
                        className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                      >
                        Explore Projects <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      <motion.button 
                        variants={hoverScale}
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => goToTab("contact")}
                        className={`font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border ${
                          darkMode ? "border-neutral-800 hover:bg-neutral-800 text-neutral-300" : "border-neutral-300 hover:bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        Contact Me
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Section: Core Skills Quick View */}
                <div className={`p-5 rounded-2xl border shadow-xl ${darkMode ? "bg-[#121318] border-neutral-800/80" : "bg-white border-neutral-200"}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className={`text-base font-bold ${darkMode ? "text-white" : "text-neutral-900"}`}>Core Expertise</h2>
                    <button onClick={() => goToTab("skills")} className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
                      View all skills <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/60">
                      <h3 className="text-sm font-bold text-emerald-400 mb-1">React.js Engine</h3>
                      <p className="text-xs text-neutral-400">Interactive hooks, custom components, & dynamic UI flow.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/60">
                      <h3 className="text-sm font-bold text-emerald-400 mb-1">Next.js Framework</h3>
                      <p className="text-xs text-neutral-400">Server rendering, file-based App Router, & performance.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/60">
                      <h3 className="text-sm font-bold text-emerald-400 mb-1">Modern Styling</h3>
                      <p className="text-xs text-neutral-400">Tailwind CSS utility classes with Framer Motion transitions.</p>
                    </div>
                  </div>
                </div>

                {/* Code Terminal Box */}
                <div className={`p-5 rounded-2xl border shadow-xl ${darkMode ? "bg-[#121318] border-neutral-800/80" : "bg-white border-neutral-200"}`}>
                  <h3 className={`text-xs font-bold mb-3 flex items-center gap-2 ${darkMode ? "text-white" : "text-neutral-900"}`}>
                    <Terminal className="w-4 h-4 text-emerald-400" /> Active Developer Profile
                  </h3>
                  <div className="bg-[#08090b] text-neutral-300 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-neutral-800/80">
                    <p className="text-neutral-500">// Next.js App Router Setup</p>
                    <p className="text-emerald-400 mt-1">const <span className="text-white">ojoIsrael</span> = &#123;</p>
                    <p className="ml-4">role: <span className="text-amber-300">"Frontend Developer"</span>,</p>
                    <p className="ml-4">technologies: [<span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Next.js"</span>],</p>
                    <p className="ml-4">passions: [<span className="text-amber-300">"Coding"</span>, <span className="text-amber-300">"Drumming (64%)"</span>, <span className="text-amber-300">"Piano (32%)"</span>]</p>
                    <p className="text-emerald-400">&#125;; <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>▋</motion.span></p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PAGE 2: SKILLS PAGE */}
            {activeTab === "skills" && (
              <motion.div 
                key="skills"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-5"
              >
                <div className={`p-6 rounded-2xl border shadow-xl ${darkMode ? "bg-[#121318] border-neutral-800/80" : "bg-white border-neutral-200"}`}>
                  <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-neutral-900"}`}>Technical & Musical Skills</h2>
                  <p className="text-xs text-neutral-400 mb-6">Detailed competency percentages for programming and music.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tech Stack Circles */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                        <Code2 className="w-4 h-4" /> Web Development Stack
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>React.js Framework</span>
                            <span className="text-emerald-400 font-bold">95%</span>
                          </div>
                          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "95%" }} transition={{ duration: 1 }} className="h-full bg-emerald-400 relative overflow-hidden">
                              <motion.span animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }} className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12" />
                            </motion.div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Next.js App Router</span>
                            <span className="text-emerald-400 font-bold">88%</span>
                          </div>
                          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "88%" }} transition={{ duration: 1, delay: 0.1 }} className="h-full bg-emerald-400 relative overflow-hidden">
                              <motion.span animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }} className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12" />
                            </motion.div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Tailwind CSS & Animations</span>
                            <span className="text-emerald-400 font-bold">90%</span>
                          </div>
                          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "90%" }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-emerald-400 relative overflow-hidden">
                              <motion.span animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }} className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Musical Talents */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-teal-400 flex items-center gap-2">
                        <Music className="w-4 h-4" /> Music Competencies
                      </h3>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
                          <div className="flex justify-between text-xs font-semibold mb-2">
                            <span>Drumming Technique</span>
                            <span className="text-emerald-400">64% Mastery</span>
                          </div>
                          <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "64%" }} transition={{ duration: 1.2 }} className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 relative overflow-hidden">
                              <motion.span animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }} className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12" />
                            </motion.div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800">
                          <div className="flex justify-between text-xs font-semibold mb-2">
                            <span>Piano Chords & Harmonies</span>
                            <span className="text-teal-400">32% Mastery</span>
                          </div>
                          <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "32%" }} transition={{ duration: 1.2, delay: 0.2 }} className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 relative overflow-hidden">
                              <motion.span animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.3 }} className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PAGE 3: PROJECTS PAGE */}
            {activeTab === "projects" && (
              <motion.div 
                key="projects"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-5"
              >
                <div className={`p-6 rounded-2xl border shadow-xl ${darkMode ? "bg-[#121318] border-neutral-800/80" : "bg-white border-neutral-200"}`}>
                  <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-neutral-900"}`}>Live Projects</h2>
                  <p className="text-xs text-neutral-400 mb-6">Click any card to launch the live application in a new browser tab.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Project 1 */}
                    <motion.a 
                      variants={hoverScale}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                      whileHover="hover"
                      whileTap="tap"
                      href="http://faith-xtra.kesug.com" 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`p-5 rounded-2xl border flex flex-col justify-between group transition-all ${
                        darkMode ? "bg-[#16171d] border-neutral-800 hover:border-emerald-500/60" : "bg-neutral-50 border-neutral-200"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className={`font-bold text-sm group-hover:text-emerald-400 transition-colors ${darkMode ? "text-white" : "text-neutral-900"}`}>
                            Faith Xtra
                          </h3>
                          <ExternalLink className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Full-featured dynamic platform built with custom frontend rendering and user interface elements.
                        </p>
                      </div>
                      <div className="mt-5 pt-3 border-t border-neutral-800/40 flex justify-between items-center text-[10px] text-emerald-400 font-mono">
                        <span>Live Site</span>
                        <span>faith-xtra.kesug.com</span>
                      </div>
                    </motion.a>

                    {/* Project 2 */}
                    <motion.a 
                      variants={hoverScale}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                      whileHover="hover"
                      whileTap="tap"
                      href="https://israel-ojo.github.io/Da-legend/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`p-5 rounded-2xl border flex flex-col justify-between group transition-all ${
                        darkMode ? "bg-[#16171d] border-neutral-800 hover:border-emerald-500/60" : "bg-neutral-50 border-neutral-200"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className={`font-bold text-sm group-hover:text-emerald-400 transition-colors ${darkMode ? "text-white" : "text-neutral-900"}`}>
                            Da Legend
                          </h3>
                          <ExternalLink className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Interactive web application featuring responsive styling and smooth layout components.
                        </p>
                      </div>
                      <div className="mt-5 pt-3 border-t border-neutral-800/40 flex justify-between items-center text-[10px] text-emerald-400 font-mono">
                        <span>GitHub Pages</span>
                        <span>/Da-legend</span>
                      </div>
                    </motion.a>

                    {/* Project 3 */}
                    <motion.a 
                      variants={hoverScale}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                      whileHover="hover"
                      whileTap="tap"
                      href="https://israel-ojo.github.io/Authentic-Solar/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className={`p-5 rounded-2xl border flex flex-col justify-between group transition-all ${
                        darkMode ? "bg-[#16171d] border-neutral-800 hover:border-emerald-500/60" : "bg-neutral-50 border-neutral-200"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className={`font-bold text-sm group-hover:text-emerald-400 transition-colors ${darkMode ? "text-white" : "text-neutral-900"}`}>
                            Authentic Solar
                          </h3>
                          <ExternalLink className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Clean commercial site built for renewable energy service presentation and client contact.
                        </p>
                      </div>
                      <div className="mt-5 pt-3 border-t border-neutral-800/40 flex justify-between items-center text-[10px] text-emerald-400 font-mono">
                        <span>GitHub Pages</span>
                        <span>/Authentic-Solar</span>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PAGE 4: CONTACT PAGE */}
            {activeTab === "contact" && (
              <motion.div 
                key="contact"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-5"
              >
                <div className={`p-6 rounded-2xl border shadow-xl ${darkMode ? "bg-[#121318] border-neutral-800/80" : "bg-white border-neutral-200"}`}>
                  <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-neutral-900"}`}>Get In Touch</h2>
                  <p className="text-xs text-neutral-400 mb-6">Send a direct message or use my contact information below.</p>

                  <form onSubmit={handleSendMessage} className="space-y-4 max-w-xl">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 text-neutral-400">Your Message</label>
                      <textarea 
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder="Write your message or project inquiry here..."
                        className={`w-full p-3 rounded-xl text-xs border focus:outline-none focus:border-emerald-500 transition-colors ${
                          darkMode ? "bg-[#08090b] border-neutral-800 text-white" : "bg-neutral-50 border-neutral-300 text-neutral-900"
                        }`}
                      />
                    </div>

                    <motion.button 
                      animate={pulseGlow}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" /> Send Message
                    </motion.button>

                    {formSubmitted && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" /> Your email app is opening with the message ready to send.
                      </motion.div>
                    )}
                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* ========================================================= */}
        {/* ========================================================= */}
        {/* RIGHT NAVIGATION SIDEBAR (TAB SWITCHER)                    */}
        {/* ========================================================= */}
        <motion.aside
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className={`relative w-full lg:w-16 shrink-0 rounded-2xl p-3 border shadow-xl ${
            darkMode ? "bg-[#121318] border-neutral-800/80" : "bg-white border-neutral-200"
          }`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between lg:hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Navigation</span>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2.5 rounded-xl transition-colors ${
                  darkMode ? "bg-neutral-800 text-amber-400 hover:bg-neutral-700" : "bg-neutral-200 text-indigo-600 hover:bg-neutral-300"
                }`}
                title="Toggle Light / Dark Theme"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                title="Toggle Menu"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence initial={false}>
            {mobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden lg:hidden"
              >
                <div className="grid grid-cols-2 gap-2 pt-3">
                  {[
                    ["overview", "Overview", LayoutGrid],
                    ["skills", "Skills", User],
                    ["projects", "Projects", Briefcase],
                    ["contact", "Contact", MessageSquare],
                  ].map(([id, label, Icon], index) => (
                    <motion.button
                      key={id as string}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => goToTab(id as "overview" | "skills" | "projects" | "contact")}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-semibold transition-colors ${
                        activeTab === id
                          ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                          : darkMode
                            ? "bg-neutral-900/60 text-neutral-300 hover:bg-neutral-800"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label as string}
                    </motion.button>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-col items-center gap-3 my-auto text-neutral-400 min-h-[260px] justify-center">
            <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => goToTab("overview")} className={`p-2.5 rounded-xl transition-all ${activeTab === "overview" ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30" : "hover:text-emerald-400"}`} title="Overview Page">
              <LayoutGrid className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => goToTab("skills")} className={`p-2.5 rounded-xl transition-all ${activeTab === "skills" ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30" : "hover:text-emerald-400"}`} title="Skills & Competencies">
              <User className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => goToTab("projects")} className={`p-2.5 rounded-xl transition-all ${activeTab === "projects" ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30" : "hover:text-emerald-400"}`} title="Projects Portfolio">
              <Briefcase className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => goToTab("contact")} className={`p-2.5 rounded-xl transition-all ${activeTab === "contact" ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30" : "hover:text-emerald-400"}`} title="Contact Form">
              <MessageSquare className="w-4 h-4" />
            </motion.button>
            <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={() => setDarkMode(!darkMode)} className={`p-2.5 rounded-xl transition-colors ${darkMode ? "bg-neutral-800 text-amber-400 hover:bg-neutral-700" : "bg-neutral-200 text-indigo-600 hover:bg-neutral-300"}`} title="Toggle Light / Dark Theme">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>
        </motion.aside>

      </div>
    </div>
  );
}