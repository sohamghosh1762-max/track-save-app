import { useState, useEffect, useRef } from "react";

const COLORS = {
  navy: "#050E1D",
  navyMid: "#0A1628",
  navyCard: "#0F1E35",
  blue: "#1A73E8",
  blueLight: "#4A9EFF",
  emerald: "#10B981",
  cyan: "#06B6D4",
  indigo: "#6366F1",
  amber: "#F59E0B",
  white: "#FFFFFF",
  textMuted: "#94A3B8",
  border: "rgba(255,255,255,0.08)",
};

const FEATURES = [
  { icon: "🧠", title: "AI-Powered Insights", desc: "Claude AI analyzes your spending patterns and delivers personalized recommendations to optimize your finances every month.", tag: "SMART AI" },
  { icon: "📊", title: "Real-Time Analytics", desc: "Interactive charts and dashboards give you a crystal-clear view of your income, expenses, savings and net worth.", tag: "ANALYTICS" },
  { icon: "🎯", title: "Savings Goals", desc: "Create and track multiple financial goals — from emergency funds to dream vacations — with deadline forecasting.", tag: "GOALS" },
  { icon: "💳", title: "Expense Tracking", desc: "Categorize every transaction automatically, upload receipts, and monitor where every rupee goes in real time.", tag: "TRACKING" },
  { icon: "📅", title: "Budget Planner", desc: "Set monthly category budgets, receive overspend alerts, and stay in control with visual progress tracking.", tag: "BUDGETS" },
  { icon: "📤", title: "Export Reports", desc: "Generate PDF, CSV or Excel financial reports — monthly, quarterly or annual — with one click.", tag: "REPORTS" },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Software Engineer, Bengaluru", avatar: "PS", quote: "Track & Save completely changed how I manage money. The AI insights helped me cut food delivery spend by 40% and hit my emergency fund goal 2 months early!", stars: 5 },
  { name: "Arjun Mehta", role: "Freelancer, Mumbai", avatar: "AM", quote: "As a freelancer with irregular income, this tool is a lifesaver. The income tracking and budget planner give me clarity I've never had before.", stars: 5 },
  { name: "Deepika Nair", role: "Product Manager, Hyderabad", avatar: "DN", quote: "The dashboard is stunning and the AI assistant actually understands my financial situation. It's like having a personal CFO for free.", stars: 5 },
  { name: "Rohan Gupta", role: "Startup Founder, Delhi", avatar: "RG", quote: "I recommended Track & Save to my entire team. The analytics and export features are genuinely enterprise-grade. Absolutely incredible product.", stars: 5 },
];

const PRICING = [
  {
    name: "Starter", price: "Free", period: "", color: COLORS.textMuted, featured: false,
    features: ["Up to 50 transactions/month", "Basic expense tracking", "3 savings goals", "Standard reports", "Email support"],
    cta: "Get started free",
  },
  {
    name: "Premium", price: "₹299", period: "/month", color: COLORS.blue, featured: true,
    features: ["Unlimited transactions", "AI-powered insights", "Unlimited savings goals", "Advanced analytics", "PDF & Excel exports", "Priority support", "Receipt uploads"],
    cta: "Start 14-day free trial",
  },
  {
    name: "Business", price: "₹799", period: "/month", color: COLORS.emerald, featured: false,
    features: ["Everything in Premium", "Multi-user accounts", "Admin panel", "Team analytics", "API access", "Dedicated account manager", "Custom integrations"],
    cta: "Contact sales",
  },
];

const FAQS = [
  { q: "Is my financial data secure?", a: "Yes. We use bank-grade AES-256 encryption, JWT authentication, and never store raw passwords. Your data is yours alone." },
  { q: "Can I import data from other apps?", a: "Yes — you can import CSV files from most banking apps, or connect via our API for automated sync." },
  { q: "Does the AI access my actual bank account?", a: "No. The AI works with data you manually enter or import. We never request direct bank access." },
  { q: "Can I export my data anytime?", a: "Absolutely. You can export all your data as PDF, CSV or Excel at any time, even if you cancel." },
  { q: "Is there a mobile app?", a: "A fully responsive mobile web app is available now. Native iOS and Android apps are coming Q3 2025." },
];

const STATS = [
  { value: "2.4L+", label: "Active Users" },
  { value: "₹840Cr+", label: "Money Tracked" },
  { value: "98.7%", label: "Uptime SLA" },
  { value: "4.9★", label: "App Rating" },
];

function CountUp({ target, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const end = parseFloat(target);
        const timer = setInterval(() => {
          start += end / 40;
          if (start >= end) { setCount(end); clearInterval(timer); } else setCount(start);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{typeof count === "number" && count % 1 !== 0 ? count.toFixed(1) : Math.floor(count)}{suffix}</span>;
}

export default function LandingPage({ onNavigate }) {
  const [faqOpen, setFaqOpen] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navbarBg = scrollY > 60 ? "rgba(5,14,29,0.95)" : "transparent";

  const Btn = ({ children, variant = "primary", onClick, style = {} }) => (
    <button onClick={onClick} style={{
      padding: variant === "primary" ? "14px 28px" : "13px 27px",
      borderRadius: 12,
      border: variant === "outline" ? "1.5px solid rgba(255,255,255,0.25)" : "none",
      background: variant === "primary" ? "linear-gradient(135deg, #1A73E8, #6366F1)" : variant === "emerald" ? "linear-gradient(135deg, #10B981, #06B6D4)" : "transparent",
      color: "#fff",
      fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
      transition: "all 0.2s", letterSpacing: 0.2,
      ...style,
    }}>{children}</button>
  );

  return (
    <div style={{ background: COLORS.navy, color: COLORS.white, fontFamily: "'Manrope', 'Inter', system-ui, sans-serif", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(26,115,232,0.35); }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(26,115,232,0.4) !important; }
        .faq-item:hover { background: rgba(255,255,255,0.04) !important; }
        .nav-link:hover { color: #fff !important; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #050E1D; } ::-webkit-scrollbar-thumb { background: #1A73E8; border-radius: 3px; }
        .gradient-text {
          background: linear-gradient(135deg, #4A9EFF 0%, #6366F1 50%, #10B981 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .grid-bg {
          background-image: linear-gradient(rgba(26,115,232,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,115,232,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 40px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", background: navbarBg, backdropFilter: scrollY > 60 ? "blur(20px)" : "none", borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #1A73E8, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💎</div>
          <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: -0.5 }}>Track & Save</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Features", "Pricing", "FAQ"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ color: COLORS.textMuted, textDecoration: "none", fontSize: 14, fontWeight: 600, transition: "color 0.2s" }}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => onNavigate?.("signin")} style={{ padding: "9px 20px", borderRadius: 10, border: "1.5px solid rgba(255,255,255,0.15)", background: "transparent", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Sign In</button>
          <button onClick={() => onNavigate?.("signup")} className="btn-hover" style={{ padding: "9px 20px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #1A73E8, #6366F1)", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>Get Started Free</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
        {/* Glows */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,115,232,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "50%", width: 600, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)", pointerEvents: "none", transform: "translateX(-50%)" }} />

        <div style={{ animation: "fadeUp 0.8s ease both" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 30, border: "1px solid rgba(26,115,232,0.4)", background: "rgba(26,115,232,0.08)", marginBottom: 28 }}>
            <span style={{ animation: "pulse 2s infinite", color: COLORS.emerald, fontSize: 10 }}>●</span>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.blueLight, letterSpacing: 0.5 }}>AI-POWERED FINANCE PLATFORM</span>
          </div>

          <h1 style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.08, margin: "0 0 24px", maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
            Smart Finance Management<br />
            <span className="gradient-text">for Modern India</span>
          </h1>

          <p style={{ fontSize: 19, color: COLORS.textMuted, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 40px", fontWeight: 500 }}>
            Track expenses, plan budgets, achieve savings goals and get AI-powered insights — all in one premium platform designed for the modern professional.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => onNavigate?.("signup")} className="btn-hover" style={{ padding: "16px 36px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #1A73E8, #6366F1)", color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
              Start Free — No Card Required →
            </button>
            <button onClick={() => onNavigate?.("signin")} style={{ padding: "16px 36px", borderRadius: 14, border: "1.5px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              View Demo Dashboard
            </button>
          </div>

          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
            {["✓ Free forever plan", "✓ No credit card needed", "✓ Setup in 2 minutes"].map(t => (
              <span key={t} style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Dashboard preview mockup */}
        <div style={{ marginTop: 70, maxWidth: 880, width: "100%", animation: "fadeUp 1s 0.3s ease both" }}>
          <div style={{ background: "linear-gradient(180deg, rgba(26,115,232,0.15) 0%, transparent 100%)", borderRadius: 24, padding: 2, border: "1px solid rgba(26,115,232,0.25)" }}>
            <div style={{ background: COLORS.navyCard, borderRadius: 22, overflow: "hidden" }}>
              {/* Mock topbar */}
              <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#EF4444" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#F59E0B" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10B981" }} />
                <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: COLORS.textMuted }}>track-and-save.app/dashboard</div>
              </div>
              {/* Mock dashboard */}
              <div style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[
                  { label: "Balance", val: "₹2.84L", color: "#4A9EFF", up: "↑8.2%" },
                  { label: "Income", val: "₹1.25L", color: "#10B981", up: "↑5.9%" },
                  { label: "Expenses", val: "₹48.3K", color: "#EF4444", up: "↑3.1%" },
                  { label: "Savings", val: "₹52.4K", color: "#06B6D4", up: "↑61.3%" },
                ].map(c => (
                  <div key={c.label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600, marginBottom: 6 }}>{c.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: c.color }}>{c.val}</div>
                    <div style={{ fontSize: 11, color: c.color, fontWeight: 600, marginTop: 4 }}>{c.up}</div>
                  </div>
                ))}
              </div>
              {/* Mock chart area */}
              <div style={{ padding: "0 20px 20px" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>Financial Overview</span>
                    <span style={{ fontSize: 11, color: COLORS.textMuted }}>May 2025</span>
                  </div>
                  <svg width="100%" height="80" viewBox="0 0 800 80">
                    <defs>
                      <linearGradient id="heroGrad1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1A73E8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#1A73E8" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="heroGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,60 C80,50 160,20 240,30 C320,40 400,15 480,25 C560,35 640,10 800,5 L800,80 L0,80 Z" fill="url(#heroGrad1)" />
                    <path d="M0,60 C80,50 160,20 240,30 C320,40 400,15 480,25 C560,35 640,10 800,5" fill="none" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M0,72 C80,68 160,55 240,58 C320,61 400,48 480,52 C560,56 640,42 800,38 L800,80 L0,80 Z" fill="url(#heroGrad2)" />
                    <path d="M0,72 C80,68 160,55 240,58 C320,61 400,48 480,52 C560,56 640,42 800,38" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "60px 40px", background: "rgba(26,115,232,0.05)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40, textAlign: "center" }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1.5, color: COLORS.white }}>{s.value}</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted, fontWeight: 600, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-block", fontSize: 12, fontWeight: 800, color: COLORS.blue, letterSpacing: 2, marginBottom: 14, padding: "5px 14px", borderRadius: 20, border: "1px solid rgba(26,115,232,0.3)", background: "rgba(26,115,232,0.06)" }}>FEATURES</div>
          <h2 style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1.5, margin: "0 0 16px" }}>Everything you need to master<br /><span className="gradient-text">your finances</span></h2>
          <p style={{ fontSize: 17, color: COLORS.textMuted, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>A complete financial operating system — not just another expense tracker.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="card-hover" style={{ background: COLORS.navyCard, borderRadius: 20, padding: 28, border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.3s", cursor: "default" }}>
              <div style={{ display: "inline-block", fontSize: 11, fontWeight: 800, color: COLORS.blue, letterSpacing: 1.5, marginBottom: 16, padding: "4px 10px", borderRadius: 8, background: "rgba(26,115,232,0.12)" }}>{f.tag}</div>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 10px", letterSpacing: -0.3 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 40px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.emerald, letterSpacing: 2, marginBottom: 14, padding: "5px 14px", borderRadius: 20, border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.06)", display: "inline-block" }}>HOW IT WORKS</div>
          <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1.5, margin: "0 0 60px" }}>Up and running in <span className="gradient-text">3 minutes</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {[
              { step: "01", title: "Create your account", desc: "Sign up free in 60 seconds. No credit card, no hassle." },
              { step: "02", title: "Add your finances", desc: "Log income, expenses and savings goals — or import from CSV." },
              { step: "03", title: "Let AI guide you", desc: "Receive personalized insights and watch your wealth grow." },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #1A73E8, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 900, margin: "0 auto 20px", letterSpacing: -0.5 }}>{s.step}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 10px" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.indigo, letterSpacing: 2, marginBottom: 14, padding: "5px 14px", borderRadius: 20, border: "1px solid rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.06)", display: "inline-block" }}>TESTIMONIALS</div>
          <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1.5, margin: 0 }}>Loved by <span className="gradient-text">2,40,000+ users</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card-hover" style={{ background: COLORS.navyCard, borderRadius: 20, padding: 28, border: "1px solid rgba(255,255,255,0.07)", transition: "all 0.3s" }}>
              <div style={{ fontSize: 20, marginBottom: 14, letterSpacing: 2 }}>{"⭐".repeat(t.stars)}</div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.75, margin: "0 0 20px", fontStyle: "italic" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #1A73E8, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 40px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.amber, letterSpacing: 2, marginBottom: 14, padding: "5px 14px", borderRadius: 20, border: "1px solid rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.06)", display: "inline-block" }}>PRICING</div>
            <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1.5, margin: "0 0 16px" }}>Simple, transparent <span className="gradient-text">pricing</span></h2>
            <p style={{ fontSize: 16, color: COLORS.textMuted }}>Start free, upgrade when you're ready.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "stretch" }}>
            {PRICING.map((p, i) => (
              <div key={i} style={{
                background: p.featured ? "linear-gradient(180deg, rgba(26,115,232,0.12) 0%, rgba(99,102,241,0.08) 100%)" : COLORS.navyCard,
                borderRadius: 22, padding: "32px 28px", border: p.featured ? "1.5px solid rgba(26,115,232,0.5)" : "1px solid rgba(255,255,255,0.07)",
                position: "relative", display: "flex", flexDirection: "column",
              }}>
                {p.featured && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #1A73E8, #6366F1)", padding: "5px 18px", borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: 1 }}>MOST POPULAR</div>}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: p.color, marginBottom: 8 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1.5 }}>{p.price}</span>
                    <span style={{ fontSize: 14, color: COLORS.textMuted }}>{p.period}</span>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: COLORS.emerald, fontWeight: 800, fontSize: 14, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate?.("signup")} style={{ width: "100%", padding: "13px", borderRadius: 12, border: p.featured ? "none" : "1.5px solid rgba(255,255,255,0.2)", background: p.featured ? "linear-gradient(135deg, #1A73E8, #6366F1)" : "transparent", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 40px", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: COLORS.cyan, letterSpacing: 2, marginBottom: 14, padding: "5px 14px", borderRadius: 20, border: "1px solid rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.06)", display: "inline-block" }}>FAQ</div>
          <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1.5, margin: 0 }}>Common <span className="gradient-text">questions</span></h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((f, i) => (
            <div key={i} className="faq-item" onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              style={{ background: COLORS.navyCard, borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", padding: "18px 22px", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{f.q}</span>
                <span style={{ fontSize: 20, color: COLORS.textMuted, transform: faqOpen === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </div>
              {faqOpen === i && <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.75, margin: "12px 0 0" }}>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", background: "linear-gradient(135deg, rgba(26,115,232,0.12), rgba(99,102,241,0.08))", borderRadius: 28, padding: "60px 40px", border: "1px solid rgba(26,115,232,0.25)" }}>
          <h2 style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1.5, margin: "0 0 16px" }}>Ready to take control of<br /><span className="gradient-text">your financial future?</span></h2>
          <p style={{ fontSize: 16, color: COLORS.textMuted, marginBottom: 36, lineHeight: 1.7 }}>Join 2,40,000+ users already building wealth smarter with Track & Save.</p>
          <button onClick={() => onNavigate?.("signup")} className="btn-hover" style={{ padding: "16px 44px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #1A73E8, #6366F1)", color: "#fff", fontSize: 17, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
            Create Free Account →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "40px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg, #1A73E8, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>💎</div>
          <span style={{ fontWeight: 800, fontSize: 15 }}>Track & Save</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Security", "Contact"].map(l => (
            <a key={l} href="#" style={{ color: COLORS.textMuted, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>{l}</a>
          ))}
        </div>
        <div style={{ fontSize: 13, color: COLORS.textMuted }}>© 2025 Track & Save. All rights reserved.</div>
      </footer>
    </div>
  );
}