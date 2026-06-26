"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  Calendar,
  Users,
  Heart,
  BookOpen,
  Star,
  ArrowUp,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  Sparkles,
  Moon,
  Flame,
  HandHeart,
  Trophy,
  Navigation,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";

/* ─────────────── DATA ─────────────── */

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Events", href: "#events" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

const programs = [
  {
    icon: Moon,
    title: "Qiyam Nights",
    description: "Late night prayers, dhikr, and spiritual reflections that deepen your connection with Allah.",
  },
  {
    icon: Flame,
    title: "Bonfire Socials",
    description: "Build brotherhood and sisterhood around the fire with food, games, and meaningful conversations.",
  },
  {
    icon: BookOpen,
    title: "Educational Programs",
    description: "Weekly halaqas, workshops, and guest speakers covering faith, leadership, and personal growth.",
  },
  {
    icon: HandHeart,
    title: "Community Service",
    description: "Feed the hungry, clean the streets, and serve our community through regular volunteer initiatives.",
  },
  {
    icon: Trophy,
    title: "Youth Leadership",
    description: "Develop leadership skills through mentorship, project management, and organizing events.",
  },
  {
    icon: Sparkles,
    title: "Sisterhood & Brotherhood",
    description: "Create lifelong bonds through sports tournaments, game nights, and group outings.",
  },
];

const upcomingEvents = [
  {
    title: "Winter Qiyam",
    date: "Dec 20, 2025",
    time: "11:00 PM - 4:00 AM",
    location: "IAGD Main Hall",
    description: "An all-night spiritual experience with tahajjud, dua, and reflection.",
    category: "Spirituality",
  },
  {
    title: "Youth Bonfire Night",
    date: "Jan 10, 2026",
    time: "6:00 PM - 10:00 PM",
    location: "Rochester Hills Park",
    description: "Food, games, and deep conversations around the fire. Bring a friend!",
    category: "Social",
  },
  {
    title: "Community Cleanup",
    date: "Jan 18, 2026",
    time: "9:00 AM - 12:00 PM",
    location: "Downtown Detroit",
    description: "Join us in serving our community. Gloves and supplies provided.",
    category: "Service",
  },
  {
    title: "Leadership Workshop",
    date: "Feb 1, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "IAGD Conference Room",
    description: "Learn project management and event planning from experienced mentors.",
    category: "Education",
  },
];

const stats = [
  { number: "500+", label: "Active Members" },
  { number: "50+", label: "Events Per Year" },
  { number: "15+", label: "Years of Service" },
  { number: "10K+", label: "Lives Impacted" },
];

const testimonials = [
  {
    name: "Ahmad K.",
    age: 19,
    text: "MYGD changed my life. I went from feeling lost to having a community that genuinely cares about my growth in faith and as a person.",
    program: "Youth Leadership",
  },
  {
    name: "Fatima S.",
    age: 21,
    text: "The sisterhood here is unmatched. These girls have become my family. We pray together, laugh together, and support each other through everything.",
    program: "Sisterhood",
  },
  {
    name: "Omar R.",
    age: 17,
    text: "The qiyams hit different. There's something about praying tahajjud with 100+ brothers that makes you feel connected to something bigger.",
    program: "Qiyam Nights",
  },
];

const faqs = [
  {
    question: "Who can join MYGD?",
    answer: "MYGD is open to all Muslim youth ages 13-25 in the Greater Detroit area. Whether you're just starting to explore your faith or deeply practicing, there's a place for you here.",
  },
  {
    question: "How much does it cost?",
    answer: "Most MYGD events are completely free! Some special programs or retreats may have a small fee to cover costs, but we never want finances to be a barrier. Scholarships are always available.",
  },
  {
    question: "Do I need to be a member of IAGD?",
    answer: "Nope! While we're rooted at IAGD, youth from all masjids and backgrounds are welcome. Our community is diverse and inclusive.",
  },
  {
    question: "How do I get involved?",
    answer: "Just show up! Follow us on Instagram for event announcements, fill out the join form on this site, or stop by any of our weekly programs. We'd love to meet you.",
  },
];

/* ─────────────── ANIMATED BACKGROUND ─────────────── */

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#c9a962]/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, -20, 20, -10, 0],
            x: [null, 10, -10, 5, 0],
            opacity: [0.2, 0.5, 0.3, 0.6, 0.2],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 5,
          }}
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────── COMPONENTS ─────────────── */

function CountUp({ target, duration = 2000 }: { target: string; duration?: number }) {
  const [count, setCount] = useState("0");
  const numericTarget = parseInt(target.replace(/\D/g, ""));
  const suffix = target.replace(/[0-9]/g, "");

  useEffect(() => {
    let start = 0;
    const increment = numericTarget / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) {
        setCount(numericTarget + suffix);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start) + suffix);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numericTarget, suffix, duration]);

  return <span>{count}</span>;
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#c9a962]/20 rounded-xl overflow-hidden bg-[#243447]/50 backdrop-blur-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#243447] transition-colors"
      >
        <span className="font-semibold text-lg text-white">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-[#c9a962]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-6 text-slate-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setFormState("success");
    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <AnimatePresence mode="wait">
        {formState === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <CheckCircle className="w-16 h-16 text-[#c9a962] mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-slate-400">We'll get back to you soon insha'Allah.</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a2332] border border-[#c9a962]/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#c9a962]/50 focus:ring-2 focus:ring-[#c9a962]/10 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#1a2332] border border-[#c9a962]/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#c9a962]/50 focus:ring-2 focus:ring-[#c9a962]/10 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#1a2332] border border-[#c9a962]/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#c9a962]/50 focus:ring-2 focus:ring-[#c9a962]/10 transition-all resize-none"
                placeholder="Tell us about yourself or ask a question..."
              />
            </div>
            <motion.button
              type="submit"
              disabled={formState === "submitting"}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a962] to-[#d4b978] text-[#1a2332] font-bold text-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {formState === "submitting" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#1a2332] text-white overflow-x-hidden">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a962] to-[#d4b978] origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a2332]/90 backdrop-blur-xl border-b border-[#c9a962]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="#"
              className="flex items-center gap-2"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a962] to-[#d4b978] flex items-center justify-center">
                <span className="text-xl font-black text-[#1a2332]">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">MYGD</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(link.href.replace("#", ""))}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-[#c9a962] transition-colors rounded-lg hover:bg-[#c9a962]/5"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c9a962] to-[#d4b978] text-sm font-bold text-[#1a2332]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join MYGD
              </motion.a>
            </div>

            <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#243447] border-b border-[#c9a962]/10 px-4 py-4 space-y-2 overflow-hidden"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.href.replace("#", ""))}
                  className="block w-full text-left text-slate-300 hover:text-[#c9a962] py-3 px-4 rounded-lg hover:bg-[#c9a962]/5"
                >
                  {link.label}
                </motion.button>
              ))}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                className="block text-center px-4 py-3 rounded-full bg-gradient-to-r from-[#c9a962] to-[#d4b978] text-sm font-bold text-[#1a2332] mt-2"
              >
                Join MYGD
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-16 pb-8 md:pb-0 overflow-hidden">
        {!isMobile && <FloatingParticles />}
        
        {/* Animated background */}
        <div className="absolute inset-0 bg-[#1a2332]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#243447] via-[#1a2332] to-[#1a2332]" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#c9a962]/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#c9a962]/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#c9a962]/10 border border-[#c9a962]/20 text-[#c9a962] text-xs md:text-sm font-medium mb-6 md:mb-8"
            >
              <Navigation className="w-3 h-3 md:w-4 md:h-4" />
              Rochester Hills, Michigan
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                WELCOME TO
              </motion.span>
              <motion.span
                className="block text-[#c9a962]"
                initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                MYGD
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-[#c9a962] max-w-3xl mx-auto mb-3 md:mb-4 font-semibold px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Sowing the Seeds of Tomorrow
            </motion.p>
            <motion.p
              className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Building community, faith, and leadership among Muslim youth across Greater Detroit through meaningful programs, events, and lasting connection.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.a
                href="#programs"
                onClick={(e) => { e.preventDefault(); scrollTo("programs"); }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-gradient-to-r from-[#c9a962] to-[#d4b978] text-base md:text-lg font-bold text-[#1a2332] shadow-lg shadow-[#c9a962]/25"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(201, 169, 98, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Programs
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-transparent border-2 border-[#c9a962]/30 text-base md:text-lg font-bold text-white"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(201, 169, 98, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto px-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-[#c9a962]">
                  <CountUp target={stat.number} />
                </div>
                <div className="text-xs md:text-sm text-slate-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-[#c9a962]/50" />
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-16 md:py-24 px-4 bg-[#243447]/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a962]/10 border border-[#c9a962]/20 text-[#c9a962] text-sm font-medium mb-6"
              >
                <Heart className="w-4 h-4" />
                Who We Are
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
                Muslim Youth{" "}
                <span className="text-[#c9a962]">Greater Detroit</span>
              </h2>
              <p className="text-base md:text-lg text-slate-400 mb-4 md:mb-6 leading-relaxed">
                MYGD is a vibrant community of young Muslims rooted at the Islamic Association of Greater Detroit. 
                We create spaces where youth can grow in faith, build lasting friendships, and develop leadership 
                skills that shape their futures.
              </p>
              <p className="text-base md:text-lg text-slate-400 mb-6 md:mb-8 leading-relaxed">
                From qiyams and bonfires to educational programs and community service, we're committed to 
                empowering the next generation with purpose and belonging.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {["Faith & Spirituality", "Community Service", "Youth Leadership", "Brotherhood & Sisterhood"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(201, 169, 98, 0.2)" }}
                    className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#c9a962]/10 border border-[#c9a962]/20 text-xs md:text-sm font-medium text-[#c9a962] cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#c9a962]/10 to-[#c9a962]/5 rounded-3xl blur-2xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { icon: Users, delay: 0 },
                  { icon: Heart, delay: 0.1 },
                  { icon: Star, delay: 0.2 },
                  { icon: BookOpen, delay: 0.3 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className={`${i % 2 === 0 ? "mt-8" : ""} aspect-square rounded-2xl bg-gradient-to-br from-[#c9a962]/20 to-[#c9a962]/10 border border-[#c9a962]/20 flex items-center justify-center cursor-pointer`}
                  >
                    <item.icon className="w-12 h-12 text-[#c9a962]/40" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section id="programs" className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a962]/10 border border-[#c9a962]/20 text-[#c9a962] text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              What We Offer
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              Our <span className="text-[#c9a962]">Programs</span>
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-4">
              Whether you want to deepen your faith, make friends, or give back — we've got something for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                whileHover={{ 
                  scale: isMobile ? 1 : 1.03, 
                  y: isMobile ? 0 : -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative p-6 md:p-8 rounded-2xl bg-[#243447]/30 border border-[#c9a962]/10 hover:border-[#c9a962]/30 transition-all cursor-pointer"
              >
                <motion.div 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#c9a962] to-[#d4b978] flex items-center justify-center mb-4 md:mb-6"
                  whileHover={{ rotate: isMobile ? 0 : 5, scale: isMobile ? 1 : 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <program.icon className="w-6 h-6 md:w-7 md:h-7 text-[#1a2332]" />
                </motion.div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white group-hover:text-[#c9a962] transition-colors">{program.title}</h3>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">{program.description}</p>
                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <ChevronRight className="w-5 h-5 text-[#c9a962]" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ── */}
      <section id="events" className="py-16 md:py-24 px-4 bg-[#243447]/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a962]/10 border border-[#c9a962]/20 text-[#c9a962] text-sm font-medium mb-6"
            >
              <Calendar className="w-4 h-4" />
              Coming Up
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              Upcoming <span className="text-[#c9a962]">Events</span>
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-4">
              Mark your calendar. These events fill up fast!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isMobile ? 0 : (i % 2 === 0 ? -30 : 30) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: isMobile ? 1 : 1.02, y: isMobile ? 0 : -3 }}
                className="group relative p-4 md:p-6 rounded-2xl bg-[#243447]/50 border border-[#c9a962]/10 hover:border-[#c9a962]/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <motion.div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#c9a962] to-[#d4b978] flex flex-col items-center justify-center text-[#1a2332] font-bold shrink-0"
                    whileHover={{ rotate: isMobile ? 0 : 5 }}
                  >
                    <span className="text-[10px] md:text-xs uppercase">{event.date.split(" ")[0]}</span>
                    <span className="text-base md:text-lg">{event.date.split(" ")[1].replace(",", "")}</span>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] md:text-xs font-medium px-2 py-1 rounded-full bg-[#c9a962]/20 text-[#c9a962]">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2 group-hover:text-[#c9a962] transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-400 text-xs md:text-sm mb-2 md:mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-2 md:gap-3 text-[10px] md:text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-[#c9a962] hover:text-[#d4b978] font-semibold transition-colors"
              whileHover={{ x: 5 }}
            >
              View All Events
              <ChevronRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section id="impact" className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a962]/10 border border-[#c9a962]/20 text-[#c9a962] text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4" />
              Real Stories
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              What Our Youth <span className="text-[#c9a962]">Say</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring" }}
                whileHover={{ y: isMobile ? 0 : -5, scale: isMobile ? 1 : 1.02 }}
                className="p-6 md:p-8 rounded-2xl bg-[#243447]/50 border border-[#c9a962]/10 relative"
              >
                <motion.div 
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-4xl md:text-6xl text-[#c9a962]/10 font-serif"
                  initial={{ opacity: 0, rotate: -20 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  &ldquo;
                </motion.div>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4 md:mb-6 relative z-10">{t.text}</p>
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#c9a962] to-[#d4b978] flex items-center justify-center text-xs md:text-sm font-bold text-[#1a2332]"
                    whileHover={{ scale: isMobile ? 1 : 1.2, rotate: isMobile ? 0 : 10 }}
                  >
                    {t.name[0]}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-white text-sm md:text-base">{t.name}</div>
                    <div className="text-xs md:text-sm text-slate-500">{t.age} years old · {t.program}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-24 px-4 bg-[#243447]/30">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              Got <span className="text-[#c9a962]">Questions?</span>
            </h2>
            <p className="text-base md:text-lg text-slate-400 px-4">
              Everything you need to know about joining MYGD.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a962]/10 via-[#1a2332] to-[#c9a962]/5" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a962]/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c9a962]/10 border border-[#c9a962]/20 text-[#c9a962] text-sm font-medium mb-6"
            >
              <Mail className="w-4 h-4" />
              Get In Touch
            </motion.div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
              Ready to <span className="text-[#c9a962]">Join?</span>
            </h2>
            <p className="text-base md:text-xl text-slate-400 mb-4 max-w-2xl mx-auto px-4">
              Be part of something bigger. Join hundreds of Muslim youth who are growing in faith, 
              building friendships, and making a difference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#243447]/50 backdrop-blur-sm border border-[#c9a962]/10 rounded-2xl p-6 md:p-12"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 md:mt-12 text-sm text-slate-500"
          >
            <motion.span className="flex items-center gap-2" whileHover={{ color: "#c9a962", scale: 1.05 }}>
              <MapPin className="w-4 h-4" />
              Rochester Hills, MI
            </motion.span>
            <motion.span className="flex items-center gap-2" whileHover={{ color: "#c9a962", scale: 1.05 }}>
              <Mail className="w-4 h-4" />
              info@mygd.org
            </motion.span>
            <motion.span className="flex items-center gap-2" whileHover={{ color: "#c9a962", scale: 1.05 }}>
              <MessageCircle className="w-4 h-4" />
              Join our GroupMe
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-4 border-t border-[#c9a962]/10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a962] to-[#d4b978] flex items-center justify-center">
                <span className="text-sm font-black text-[#1a2332]">M</span>
              </div>
              <span className="font-bold text-white">MYGD</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>© 2026 Muslim Youth Greater Detroit</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Rooted at IAGD</span>
            </div>

            <div className="flex items-center gap-4">
              <motion.a href="https://instagram.com/mygd" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-[#c9a962] transition-colors" whileHover={{ scale: 1.2, rotate: 5 }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </motion.a>
              <motion.a href="#" className="text-slate-500 hover:text-[#c9a962] transition-colors" whileHover={{ scale: 1.2, rotate: -5 }}>
                <MessageCircle className="w-5 h-5" />
              </motion.a>
              <motion.a href="mailto:info@mygd.org" className="text-slate-500 hover:text-[#c9a962] transition-colors" whileHover={{ scale: 1.2, rotate: 5 }}>
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* ── Scroll to Top ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-[#c9a962] to-[#d4b978] flex items-center justify-center shadow-lg shadow-[#c9a962]/25"
          >
            <ArrowUp className="w-5 h-5 text-[#1a2332]" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}