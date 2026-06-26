"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

/* ─────────────── DATA ─────────────── */

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Events", href: "#events" },
  { label: "Impact", href: "#impact" },
  { label: "Join", href: "#join" },
];

const programs = [
  {
    icon: Moon,
    title: "Qiyam Nights",
    description: "Late night prayers, dhikr, and spiritual reflections that deepen your connection with Allah.",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
  },
  {
    icon: Flame,
    title: "Bonfire Socials",
    description: "Build brotherhood and sisterhood around the fire with food, games, and meaningful conversations.",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  {
    icon: BookOpen,
    title: "Educational Programs",
    description: "Weekly halaqas, workshops, and guest speakers covering faith, leadership, and personal growth.",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: HandHeart,
    title: "Community Service",
    description: "Feed the hungry, clean the streets, and serve our community through regular volunteer initiatives.",
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/20",
  },
  {
    icon: Trophy,
    title: "Youth Leadership",
    description: "Develop leadership skills through mentorship, project management, and organizing events.",
    color: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    icon: Sparkles,
    title: "Sisterhood & Brotherhood",
    description: "Create lifelong bonds through sports tournaments, game nights, and group outings.",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
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
    color: "bg-indigo-500",
  },
  {
    title: "Youth Bonfire Night",
    date: "Jan 10, 2026",
    time: "6:00 PM - 10:00 PM",
    location: "Rochester Hills Park",
    description: "Food, games, and deep conversations around the fire. Bring a friend!",
    category: "Social",
    color: "bg-orange-500",
  },
  {
    title: "Community Cleanup",
    date: "Jan 18, 2026",
    time: "9:00 AM - 12:00 PM",
    location: "Downtown Detroit",
    description: "Join us in serving our community. Gloves and supplies provided.",
    category: "Service",
    color: "bg-emerald-500",
  },
  {
    title: "Leadership Workshop",
    date: "Feb 1, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "IAGD Conference Room",
    description: "Learn project management and event planning from experienced mentors.",
    category: "Education",
    color: "bg-amber-500",
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
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-6 text-slate-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-xl font-black">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight">MYGD</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href.replace("#", ""))}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <a
                href="#join"
                onClick={(e) => { e.preventDefault(); scrollTo("join"); }}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-sm font-bold hover:scale-105 transition-transform"
              >
                Join MYGD
              </a>
            </div>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
              className="md:hidden bg-slate-900 border-b border-white/10 px-4 py-4 space-y-2 overflow-hidden"
            >
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href.replace("#", ""))}
                  className="block w-full text-left text-slate-300 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="#join"
                onClick={(e) => { e.preventDefault(); scrollTo("join"); }}
                className="block text-center px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-sm font-bold mt-2"
              >
                Join MYGD
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-950 to-slate-950" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Building the Next Generation of Muslim Leaders
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
              Muslim Youth
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Greater Detroit
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              A vibrant community where faith meets friendship. 
              Grow spiritually, serve passionately, and lead boldly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#join"
                onClick={(e) => { e.preventDefault(); scrollTo("join"); }}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-emerald-500/25"
              >
                Join the Movement
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="#programs"
                onClick={(e) => { e.preventDefault(); scrollTo("programs"); }}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-lg font-bold hover:bg-white/10 transition-colors"
              >
                Explore Programs
              </a>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-emerald-400">
                  <CountUp target={stat.number} />
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-6 h-6 text-slate-600" />
        </motion.div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                Who We Are
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                More Than a Youth Group —{" "}
                <span className="text-emerald-400">A Movement</span>
              </h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                MYGD is a vibrant community of young Muslims rooted at the Islamic Association of Greater Detroit. 
                We create spaces where youth can grow in faith, build lasting friendships, and develop leadership 
                skills that shape their futures.
              </p>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                From qiyams and bonfires to educational programs and community service, we're committed to 
                empowering the next generation with purpose and belonging.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Faith & Spirituality", "Community Service", "Youth Leadership", "Brotherhood & Sisterhood"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border border-emerald-500/20 flex items-center justify-center">
                    <Users className="w-12 h-12 text-emerald-500/40" />
                  </div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-teal-600/20 to-teal-800/20 border border-teal-500/20 flex items-center justify-center">
                    <Heart className="w-12 h-12 text-teal-500/40" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 border border-cyan-500/20 flex items-center justify-center">
                    <Star className="w-12 h-12 text-cyan-500/40" />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-emerald-600/20 to-teal-800/20 border border-emerald-500/20 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-emerald-500/40" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section id="programs" className="py-24 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              What We Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Programs Built for <span className="text-emerald-400">You</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Whether you want to deepen your faith, make friends, or give back — we've got something for everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative p-8 rounded-2xl ${program.bgColor} border ${program.borderColor} hover:border-opacity-50 transition-all hover:scale-[1.02]`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <program.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                <p className="text-slate-400 leading-relaxed">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ── */}
      <section id="events" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              Coming Up
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Upcoming <span className="text-emerald-400">Events</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Mark your calendar. These events fill up fast!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl ${event.color} flex flex-col items-center justify-center text-white font-bold shrink-0`}>
                    <span className="text-xs uppercase">{event.date.split(" ")[0]}</span>
                    <span className="text-lg">{event.date.split(" ")[1].replace(",", "")}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${event.color}/20 text-white`}>
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
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

          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              View All Events
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section id="impact" className="py-24 px-4 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              Real Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              What Our Youth <span className="text-emerald-400">Say</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-slate-900/50 border border-white/5 relative"
              >
                <div className="absolute top-6 right-6 text-6xl text-emerald-500/10 font-serif">"</div>
                <p className="text-slate-300 leading-relaxed mb-6 relative z-10">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-slate-500">{t.age} years old · {t.program}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Got <span className="text-emerald-400">Questions?</span>
            </h2>
            <p className="text-lg text-slate-400">
              Everything you need to know about joining MYGD.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section id="join" className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-950 to-teal-900/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Ready to <span className="text-emerald-400">Join?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Be part of something bigger. Join hundreds of Muslim youth who are growing in faith, 
              building friendships, and making a difference.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="#"
                className="flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-xl font-bold hover:scale-105 transition-transform shadow-xl shadow-emerald-500/25"
              >
                Join MYGD Now
                <ChevronRight className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com/mygd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-10 py-5 rounded-full bg-white/5 border border-white/10 text-xl font-bold hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Follow Us
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Rochester Hills, MI
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                info@mygd.org
              </span>
              <span className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Join our GroupMe
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-sm font-black">M</span>
              </div>
              <span className="font-bold">MYGD</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>© 2026 Muslim Youth Greater Detroit</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Rooted at IAGD</span>
            </div>

            <div className="flex items-center gap-4">
              <a href="https://instagram.com/mygd" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="text-slate-500 hover:text-emerald-400 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="mailto:info@mygd.org" className="text-slate-500 hover:text-emerald-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Scroll to Top ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:scale-110 transition-transform"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}