import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

/* ─── THEME ─── */
const T = {
  light: {
    bg: "#F4F6FB", surface: "#FFFFFF", surfaceAlt: "#F0F3FA",
    border: "rgba(99,102,241,0.12)", borderStrong: "rgba(99,102,241,0.25)",
    text: "#0D1117", textMuted: "#6B7280", textFaint: "#9CA3AF",
    blue: "#4F46E5", blueLight: "#818CF8", blueBg: "#EEF2FF",
    green: "#059669", greenBg: "#D1FAE5", greenLight: "#34D399",
    red: "#DC2626", redBg: "#FEE2E2", redLight: "#F87171",
    amber: "#D97706", amberBg: "#FEF3C7", amberLight: "#FCD34D",
    cyan: "#0891B2", cyanBg: "#CFFAFE",
    purple: "#7C3AED", purpleBg: "#EDE9FE",
    glass: "rgba(255,255,255,0.7)",
    glassBorder: "rgba(255,255,255,0.5)",
    shadow: "0 4px 24px rgba(79,70,229,0.08)",
    shadowLg: "0 12px 48px rgba(79,70,229,0.14)",
  },
  dark: {
    bg: "#0A0E1A", surface: "#111827", surfaceAlt: "#1A2235",
    border: "rgba(99,102,241,0.18)", borderStrong: "rgba(99,102,241,0.35)",
    text: "#F1F5F9", textMuted: "#94A3B8", textFaint: "#64748B",
    blue: "#818CF8", blueLight: "#C7D2FE", blueBg: "rgba(79,70,229,0.2)",
    green: "#34D399", greenBg: "rgba(5,150,105,0.2)", greenLight: "#6EE7B7",
    red: "#F87171", redBg: "rgba(220,38,38,0.2)", redLight: "#FCA5A5",
    amber: "#FCD34D", amberBg: "rgba(217,119,6,0.2)", amberLight: "#FDE68A",
    cyan: "#22D3EE", cyanBg: "rgba(8,145,178,0.2)",
    purple: "#A78BFA", purpleBg: "rgba(124,58,237,0.2)",
    glass: "rgba(17,24,39,0.7)",
    glassBorder: "rgba(99,102,241,0.2)",
    shadow: "0 4px 24px rgba(0,0,0,0.4)",
    shadowLg: "0 12px 48px rgba(0,0,0,0.5)",
  }
};

const CATS = ["Food & Dining","Shopping","Bills & Utilities","Entertainment","Travel","Healthcare","Education","Investments","Salary","Freelance","Business","Other Income","Other"];
const CAT_COLORS = {"Food & Dining":"#F59E0B","Shopping":"#6366F1","Bills & Utilities":"#06B6D4","Entertainment":"#EC4899","Travel":"#8B5CF6","Healthcare":"#EF4444","Education":"#3B82F6","Investments":"#10B981","Salary":"#059669","Freelance":"#14B8A6","Business":"#F97316","Other Income":"#22C55E","Other":"#94A3B8"};
const INCOME_CATS = ["Salary","Freelance","Business","Other Income"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const fmt = (n, abs=true) => {
  const v = abs ? Math.abs(n) : n;
  if (Math.abs(v) >= 100000) return "₹" + (v/100000).toFixed(2) + "L";
  if (Math.abs(v) >= 1000) return "₹" + (v/1000).toFixed(1) + "K";
  return "₹" + v.toLocaleString("en-IN");
};
const fmtFull = (n) => "₹" + Math.abs(n).toLocaleString("en-IN");
const today = () => new Date().toISOString().slice(0,10);

function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  const set = useCallback((v) => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(typeof v === "function" ? v(val) : v)); }
    catch {}
  }, [key, val]);
  return [val, set];
}

/* ─── COMPONENTS ─── */
function Card({ children, style={}, className="" }) {
  const { c } = useContext(ThemeCtx);
  return (
    <div style={{ background: c.surface, borderRadius: 16, border: `1px solid ${c.border}`, boxShadow: c.shadow, overflow: "hidden", ...style }}>
      {children}
    </div>
  );
}

function GlassCard({ children, style={} }) {
  const { c } = useContext(ThemeCtx);
  return (
    <div style={{ background: c.glass, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRadius: 20, border: `1px solid ${c.glassBorder}`, boxShadow: c.shadowLg, ...style }}>
      {children}
    </div>
  );
}

function Badge({ children, color="blue" }) {
  const { c } = useContext(ThemeCtx);
  const bg = { blue: c.blueBg, green: c.greenBg, red: c.redBg, amber: c.amberBg, purple: c.purpleBg, cyan: c.cyanBg };
  const tx = { blue: c.blue, green: c.green, red: c.red, amber: c.amber, purple: c.purple, cyan: c.cyan };
  return <span style={{ background: bg[color], color: tx[color], borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}>{children}</span>;
}

function Btn({ children, onClick, variant="primary", style={}, disabled=false }) {
  const { c } = useContext(ThemeCtx);
  const styles = {
    primary: { background: `linear-gradient(135deg, ${c.blue}, ${c.purple})`, color: "#fff", border: "none" },
    ghost: { background: "transparent", color: c.textMuted, border: `1px solid ${c.border}` },
    danger: { background: `linear-gradient(135deg, ${c.red}, #F97316)`, color: "#fff", border: "none" },
    success: { background: `linear-gradient(135deg, ${c.green}, ${c.cyan})`, color: "#fff", border: "none" },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ padding: "9px 18px", borderRadius: 10, fontSize: 13.5, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1, transition: "all 0.2s", fontFamily: "inherit", ...styles[variant], ...style }}>
      {children}
    </button>
  );
}

function Input({ label, ...props }) {
  const { c } = useContext(ThemeCtx);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: c.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>}
      <input {...props} style={{ width: "100%", padding: "10px 13px", borderRadius: 10, border: `1.5px solid ${c.border}`, background: c.surfaceAlt, color: c.text, fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s", ...props.style }}
        onFocus={e => e.target.style.borderColor = c.blue}
        onBlur={e => e.target.style.borderColor = c.border} />
    </div>
  );
}

function Select({ label, options, ...props }) {
  const { c } = useContext(ThemeCtx);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: c.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>}
      <select {...props} style={{ width: "100%", padding: "10px 13px", borderRadius: 10, border: `1.5px solid ${c.border}`, background: c.surfaceAlt, color: c.text, fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}>
        {options.map(o => <option key={typeof o === "object" ? o.value : o} value={typeof o === "object" ? o.value : o}>{typeof o === "object" ? o.label : o}</option>)}
      </select>
    </div>
  );
}

function Modal({ title, onClose, children, width=440 }) {
  const { c } = useContext(ThemeCtx);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: 28, width, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto", boxShadow: c.shadowLg, border: `1px solid ${c.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: c.text }}>{title}</h3>
          <button onClick={onClose} style={{ border: "none", background: c.surfaceAlt, borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 15, color: c.textMuted }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Progress({ value, color, height=8 }) {
  const { c } = useContext(ThemeCtx);
  const pct = Math.min(Math.max(value, 0), 100);
  const barColor = value > 90 ? c.red : color;
  return (
    <div style={{ height, background: c.surfaceAlt, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: 99, transition: "width 0.8s ease" }} />
    </div>
  );
}

const ThemeCtx = React.createContext({ dark: false, c: T.light, toggle: ()=>{} });


/* ─── AI CHAT ─── */
function AIChat({ transactions, goals, budgets }) {
  const { c } = useContext(ThemeCtx);
  const [msgs, setMsgs] = useState([
    { role: "assistant", content: "Hi! I'm your AI financial advisor. Ask me anything about your spending habits, savings goals, budget optimization, or financial health." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const totalIncome = transactions.filter(t => INCOME_CATS.includes(t.category)).reduce((s,t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => !INCOME_CATS.includes(t.category)).reduce((s,t) => s + t.amount, 0);

  const systemPrompt = `You are an expert AI financial advisor for Track & Save, a premium fintech platform. Speak in a warm, professional, concise manner. Use Indian currency (₹).

User's live financial data:
- Total Income: ₹${totalIncome.toLocaleString("en-IN")}
- Total Expenses: ₹${totalExpenses.toLocaleString("en-IN")}
- Net Balance: ₹${(totalIncome - totalExpenses).toLocaleString("en-IN")}
- Savings Rate: ${totalIncome > 0 ? ((1 - totalExpenses/totalIncome)*100).toFixed(1) : 0}%
- Transactions: ${transactions.length} total
- Categories: ${[...new Set(transactions.map(t=>t.category))].join(", ")}
- Active goals: ${goals.map(g => `${g.name} (${Math.round(g.current/g.target*100)}%)`).join(", ") || "None"}
- Budget items: ${budgets.length}

Give concise, actionable advice in 2-4 sentences. Reference their actual data when relevant. Be encouraging but honest about areas of improvement.`;

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const history = [...msgs, userMsg];
    setMsgs(history);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: history.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "Sorry, I couldn't process that. Try again.";
      setMsgs(prev => [...prev, { role: "assistant", content: text }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting. Please try again." }]);
    }
    setLoading(false);
  }

  const suggestions = ["Analyze my spending habits", "How to improve my savings rate?", "Which category am I overspending on?", "Give me a budget recommendation"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {msgs.length === 1 && (
        <div style={{ padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: 8 }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => setInput(s)} style={{ padding: "7px 14px", borderRadius: 20, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.textMuted, fontSize: 12, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>{s}</button>
          ))}
        </div>
      )}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12, maxHeight: 400 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "assistant" && (
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${c.blue}, ${c.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginRight: 8, flexShrink: 0, marginTop: 2 }}>✨</div>
            )}
            <div style={{ maxWidth: "78%", padding: "10px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? `linear-gradient(135deg, ${c.blue}, ${c.purple})` : c.surfaceAlt, border: m.role === "assistant" ? `1px solid ${c.border}` : "none", color: m.role === "user" ? "#fff" : c.text, fontSize: 13.5, lineHeight: 1.65 }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${c.blue}, ${c.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✨</div>
            <div style={{ padding: "10px 14px", background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: "16px 16px 16px 4px", display: "flex", gap: 5 }}>
              {[0,0.2,0.4].map((d,i) => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c.blue, animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${d}s` }} />)}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${c.border}`, display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask about your finances..." style={{ flex: 1, padding: "10px 14px", borderRadius: 24, border: `1.5px solid ${c.border}`, background: c.surfaceAlt, color: c.text, fontSize: 13.5, outline: "none", fontFamily: "inherit" }} />
        <Btn onClick={send} disabled={loading || !input.trim()} style={{ borderRadius: 24, padding: "10px 20px" }}>Send</Btn>
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "transactions", label: "Transactions", icon: "💳" },
  { id: "budgets", label: "Budgets", icon: "📊" },
  { id: "goals", label: "Goals", icon: "🎯" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "ai", label: "AI Advisor", icon: "✨" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export default function TrackAndSave() {
  const [dark, setDark] = useLocalStorage("ts_dark", false);
  const c = dark ? T.dark : T.light;

  const [tab, setTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [transactions, setTransactions] = useLocalStorage("ts_txs", []);
  const [goals, setGoals] = useLocalStorage("ts_goals", []);
  const [budgets, setBudgets] = useLocalStorage("ts_budgets", []);
  const [profile, setProfile] = useLocalStorage("ts_profile", { name: "Your Name", currency: "INR" });
  const [notifications, setNotifications] = useLocalStorage("ts_notifs", []);

  const [showTxModal, setShowTxModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editTx, setEditTx] = useState(null);
  const [editGoal, setEditGoal] = useState(null);
  const [editBudget, setEditBudget] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterType, setFilterType] = useState("All");

  const [txForm, setTxForm] = useState({ title: "", amount: "", category: "Food & Dining", date: today(), notes: "", recurring: false, recurringFreq: "monthly" });
  const [goalForm, setGoalForm] = useState({ name: "", target: "", current: "0", deadline: "", icon: "🎯", color: "#4F46E5" });
  const [budgetForm, setBudgetForm] = useState({ category: "Food & Dining", limit: "", period: "monthly" });

  /* ─── COMPUTED ─── */
  const income = transactions.filter(t => INCOME_CATS.includes(t.category)).reduce((s,t) => s+t.amount, 0);
  const expenses = transactions.filter(t => !INCOME_CATS.includes(t.category)).reduce((s,t) => s+t.amount, 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;

  const catTotals = {};
  transactions.filter(t => !INCOME_CATS.includes(t.category)).forEach(t => {
    catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
  });

  const monthlyData = (() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      const m = d.getMonth(), y = d.getFullYear();
      const inc = transactions.filter(t => { const td = new Date(t.date); return td.getMonth()===m && td.getFullYear()===y && INCOME_CATS.includes(t.category); }).reduce((s,t)=>s+t.amount,0);
      const exp = transactions.filter(t => { const td = new Date(t.date); return td.getMonth()===m && td.getFullYear()===y && !INCOME_CATS.includes(t.category); }).reduce((s,t)=>s+t.amount,0);
      return { month: MONTHS[m], income: inc, expenses: exp, net: inc - exp };
    });
  })();

  const filteredTx = transactions.filter(t => {
    const q = t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const fc = filterCat === "All" || t.category === filterCat;
    const ft = filterType === "All" || (filterType === "Income" && INCOME_CATS.includes(t.category)) || (filterType === "Expense" && !INCOME_CATS.includes(t.category));
    return q && fc && ft;
  }).sort((a,b) => new Date(b.date) - new Date(a.date));

  /* ─── ACTIONS ─── */
  function saveTx() {
    if (!txForm.title || !txForm.amount) return;
    const amt = parseFloat(txForm.amount);
    if (isNaN(amt) || amt <= 0) return;
    if (editTx) {
      setTransactions(prev => prev.map(t => t.id === editTx ? { ...t, ...txForm, amount: amt } : t));
      setEditTx(null);
    } else {
      const tx = { ...txForm, amount: amt, id: Date.now() };
      setTransactions(prev => [tx, ...prev]);
      if (tx.recurring) {
        addNotif({ title: "Recurring Added", desc: `${tx.title} set as ${tx.recurringFreq} transaction`, type: "info" });
      }
    }
    setTxForm({ title: "", amount: "", category: "Food & Dining", date: today(), notes: "", recurring: false, recurringFreq: "monthly" });
    setShowTxModal(false);
  }

  function deleteTx(id) {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }

  function startEditTx(tx) {
    setTxForm({ title: tx.title, amount: String(tx.amount), category: tx.category, date: tx.date, notes: tx.notes || "", recurring: tx.recurring || false, recurringFreq: tx.recurringFreq || "monthly" });
    setEditTx(tx.id);
    setShowTxModal(true);
  }

  function saveGoal() {
    if (!goalForm.name || !goalForm.target) return;
    if (editGoal) {
      setGoals(prev => prev.map(g => g.id === editGoal ? { ...g, ...goalForm, target: parseFloat(goalForm.target), current: parseFloat(goalForm.current || 0) } : g));
      setEditGoal(null);
    } else {
      setGoals(prev => [...prev, { ...goalForm, id: Date.now(), target: parseFloat(goalForm.target), current: parseFloat(goalForm.current || 0) }]);
    }
    setGoalForm({ name: "", target: "", current: "0", deadline: "", icon: "🎯", color: "#4F46E5" });
    setShowGoalModal(false);
  }

  function deleteGoal(id) { setGoals(prev => prev.filter(g => g.id !== id)); }

  function addToGoal(id, amount) {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, current: Math.min(g.current + amount, g.target) } : g));
  }

  function saveBudget() {
    if (!budgetForm.category || !budgetForm.limit) return;
    if (editBudget) {
      setBudgets(prev => prev.map(b => b.id === editBudget ? { ...b, ...budgetForm, limit: parseFloat(budgetForm.limit) } : b));
      setEditBudget(null);
    } else {
      setBudgets(prev => [...prev, { ...budgetForm, id: Date.now(), limit: parseFloat(budgetForm.limit) }]);
    }
    setBudgetForm({ category: "Food & Dining", limit: "", period: "monthly" });
    setShowBudgetModal(false);
  }

  function deleteBudget(id) { setBudgets(prev => prev.filter(b => b.id !== id)); }

  function addNotif(n) {
    setNotifications(prev => [{ ...n, id: Date.now(), time: "Just now", read: false }, ...prev].slice(0, 50));
  }

  const unread = notifications.filter(n => !n.read).length;

  /* ─── BUDGET ALERTS ─── */
  useEffect(() => {
    budgets.forEach(b => {
      const spent = catTotals[b.category] || 0;
      const pct = (spent / b.limit) * 100;
      if (pct >= 90 && pct < 100) {
        const exists = notifications.find(n => n.desc.includes(b.category) && n.desc.includes("90%"));
        if (!exists) addNotif({ title: "Budget Alert", desc: `${b.category} budget is 90% utilized`, type: "warning" });
      }
      if (pct >= 100) {
        const exists = notifications.find(n => n.desc.includes(b.category) && n.desc.includes("exceeded"));
        if (!exists) addNotif({ title: "Budget Exceeded!", desc: `${b.category} budget has been exceeded`, type: "error" });
      }
    });
    goals.forEach(g => {
      const pct = (g.current / g.target) * 100;
      if (pct >= 100) {
        const exists = notifications.find(n => n.desc.includes(g.name) && n.desc.includes("achieved"));
        if (!exists) addNotif({ title: "Goal Achieved! 🎉", desc: `${g.name} savings goal has been achieved!`, type: "success" });
      }
    });
  }, [transactions, budgets, goals]);

  /* ─── PDF EXPORT ─── */
  function exportPDF() {
    const content = `
TRACK & SAVE — FINANCIAL REPORT
Generated: ${new Date().toLocaleDateString("en-IN")}

SUMMARY
-------
Total Income:   ${fmtFull(income)}
Total Expenses: ${fmtFull(expenses)}
Net Balance:    ${fmtFull(balance)}
Savings Rate:   ${savingsRate}%

CATEGORY BREAKDOWN
------------------
${Object.entries(catTotals).map(([k,v]) => `${k.padEnd(20)} ${fmtFull(v)}`).join("\n")}

RECENT TRANSACTIONS
-------------------
${transactions.slice(0,20).map(t => `${t.date}  ${t.title.padEnd(30)} ${INCOME_CATS.includes(t.category)?"+":"−"}${fmtFull(t.amount)}`).join("\n")}

SAVINGS GOALS
-------------
${goals.map(g => `${g.name.padEnd(25)} ${Math.round(g.current/g.target*100)}% (${fmtFull(g.current)} / ${fmtFull(g.target)})`).join("\n")}

BUDGETS
-------
${budgets.map(b => `${b.category.padEnd(25)} Spent: ${fmtFull(catTotals[b.category]||0)} / Limit: ${fmtFull(b.limit)}`).join("\n")}
    `;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `track-save-report-${today()}.txt`; a.click();
    URL.revokeObjectURL(url);
    addNotif({ title: "Report Downloaded", desc: "Your financial report has been exported", type: "success" });
  }

  const ctx = { dark, c, toggle: () => setDark(!dark) };

  return (
    <ThemeCtx.Provider value={ctx}>
      <div style={{ display: "flex", height: "100vh", fontFamily: "'DM Sans', 'Outfit', system-ui, sans-serif", background: c.bg, overflow: "hidden", transition: "background 0.3s ease, color 0.3s ease" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;600;700;800&display=swap');
          @keyframes pulse { 0%,100%{opacity:.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }
          @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
          .nav-btn:hover { background: ${c.blueBg} !important; color: ${c.blue} !important; }
          .tx-row:hover { background: ${c.surfaceAlt} !important; }
          .action-btn:hover { opacity: 0.8; }
          * { scrollbar-width: thin; scrollbar-color: ${c.border} transparent; box-sizing: border-box; }
          input, select, textarea { color: ${c.text} !important; }
        `}</style>

        {/* SIDEBAR */}
        <div style={{ width: sidebarOpen ? 230 : 64, background: c.surface, borderRight: `1px solid ${c.border}`, display: "flex", flexDirection: "column", transition: "width 0.3s ease", flexShrink: 0, zIndex: 20, position: "relative" }}>
          <div style={{ padding: "18px 14px", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${c.blue}, ${c.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>💎</div>
            {sidebarOpen && <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: c.text, letterSpacing: -0.3 }}>Track & Save</div>
              <div style={{ fontSize: 9.5, color: c.textMuted, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Finance Platform</div>
            </div>}
          </div>

          {sidebarOpen && (
            <div style={{ padding: "12px 10px 4px" }}>
              <div style={{ background: c.blueBg, borderRadius: 12, padding: "11px 13px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setShowProfileModal(true)}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${c.blue}, ${c.purple})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                  {profile.name.split(" ").map(n=>n[0]).join("").slice(0,2).toUpperCase()}
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: c.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{profile.name}</div>
                  <div style={{ fontSize: 10.5, color: c.blue, fontWeight: 600 }}>✦ Premium Plan</div>
                </div>
              </div>
            </div>
          )}

          <nav style={{ flex: 1, padding: "8px", overflowY: "auto" }}>
            {NAV.map(item => (
              <div key={item.id} className="nav-btn" onClick={() => setTab(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 11px", borderRadius: 10, cursor: "pointer", marginBottom: 2, transition: "all 0.15s", background: tab === item.id ? c.blueBg : "transparent", color: tab === item.id ? c.blue : c.textMuted, fontWeight: tab === item.id ? 700 : 500, fontSize: 13.5, borderLeft: tab === item.id ? `3px solid ${c.blue}` : "3px solid transparent" }}>
                <span style={{ fontSize: 17, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
                {item.id === "ai" && sidebarOpen && <Badge color="blue" style={{ marginLeft: "auto", fontSize: 9 }}>AI</Badge>}
              </div>
            ))}
          </nav>

          <div style={{ padding: "12px 8px", borderTop: `1px solid ${c.border}` }}>
            <div className="nav-btn" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", borderRadius: 10, cursor: "pointer", color: c.textMuted, fontSize: 13, fontWeight: 500, transition: "all 0.15s" }}>
              <span style={{ fontSize: 16 }}>{sidebarOpen ? "◀" : "▶"}</span>
              {sidebarOpen && <span>Collapse</span>}
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* TOPBAR */}
          <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: "0 22px", height: 60, display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: c.surfaceAlt, border: `1px solid ${c.border}`, borderRadius: 10, padding: "8px 13px", maxWidth: 320 }}>
              <span style={{ fontSize: 14, color: c.textMuted }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions..."
                style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, fontFamily: "inherit", width: "100%", color: c.text }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={exportPDF} style={{ padding: "7px 14px", borderRadius: 8, border: `1px solid ${c.border}`, background: "transparent", color: c.textMuted, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>📄 Export</button>
              <div onClick={() => setTab("notifications")} style={{ position: "relative", cursor: "pointer", padding: 8, borderRadius: 10, background: c.surfaceAlt, border: `1px solid ${c.border}` }}>
                <span style={{ fontSize: 16 }}>🔔</span>
                {unread > 0 && <div style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: "50%", background: c.red, border: "2px solid " + c.surface }} />}
              </div>
              <button onClick={() => setDark(!dark)} style={{ padding: 8, borderRadius: 10, border: `1px solid ${c.border}`, background: c.surfaceAlt, cursor: "pointer", fontSize: 15, transition: "all 0.2s" }}>{dark ? "☀️" : "🌙"}</button>
            </div>
          </div>

          {/* PAGE */}
          <div style={{ flex: 1, overflowY: "auto", padding: 22, animation: "slideUp 0.3s ease" }}>

            {/* ─── DASHBOARD ─── */}
            {tab === "dashboard" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: c.text, letterSpacing: -0.5 }}>Welcome back, {profile.name.split(" ")[0]} 👋</h2>
                    <p style={{ margin: "3px 0 0", fontSize: 13, color: c.textMuted }}>{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Btn onClick={() => { setShowTxModal(true); setTxForm(f => ({ ...f, category: "Salary" })); }} variant="success">+ Add Income</Btn>
                    <Btn onClick={() => setShowTxModal(true)}>+ Add Expense</Btn>
                  </div>
                </div>

                {/* HERO BALANCE CARD */}
                <div style={{ background: `linear-gradient(135deg, ${c.blue} 0%, ${c.purple} 50%, #EC4899 100%)`, borderRadius: 20, padding: 28, color: "#fff", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                  <div style={{ position: "absolute", bottom: -50, right: 60, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                  <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.8, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Total Net Balance</div>
                  <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.5, marginBottom: 20 }}>{fmtFull(balance)}</div>
                  <div style={{ display: "flex", gap: 32 }}>
                    <div>
                      <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>Total Income</div>
                      <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}>+{fmt(income)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>Total Expenses</div>
                      <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}>−{fmt(expenses)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>Savings Rate</div>
                      <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}>{savingsRate}%</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                  {[
                    { label: "Transactions", value: transactions.length, icon: "🔄", color: c.blue, bg: c.blueBg },
                    { label: "Active Goals", value: goals.length, icon: "🎯", color: c.green, bg: c.greenBg },
                    { label: "Budget Items", value: budgets.length, icon: "📊", color: c.purple, bg: c.purpleBg },
                  ].map(s => (
                    <Card key={s.label} style={{ padding: 18 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                        <div>
                          <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                          <div style={{ fontSize: 26, fontWeight: 800, color: s.color, letterSpacing: -0.5 }}>{s.value}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
                  <Card style={{ padding: 20 }}>
                    <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: c.text }}>Income vs Expenses (6 months)</h3>
                    {monthlyData.some(d => d.income > 0 || d.expenses > 0) ? (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={monthlyData} barGap={3}>
                          <CartesianGrid strokeDasharray="3 3" stroke={c.border} />
                          <XAxis dataKey="month" tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 10, fill: c.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v)} />
                          <Tooltip formatter={(v, n) => [fmtFull(v), n]} contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
                          <Bar dataKey="income" fill={c.green} radius={[4,4,0,0]} name="Income" />
                          <Bar dataKey="expenses" fill={c.red} radius={[4,4,0,0]} name="Expenses" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: c.textFaint, flexDirection: "column", gap: 8 }}>
                        <div style={{ fontSize: 32 }}>📊</div>
                        <div style={{ fontSize: 13 }}>Add transactions to see your chart</div>
                      </div>
                    )}
                  </Card>

                  <Card style={{ padding: 20 }}>
                    <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: c.text }}>Spending by Category</h3>
                    {Object.keys(catTotals).length > 0 ? (
                      <>
                        <ResponsiveContainer width="100%" height={160}>
                          <PieChart>
                            <Pie data={Object.entries(catTotals).map(([name,value])=>({name,value}))} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                              {Object.entries(catTotals).map(([name], i) => <Cell key={i} fill={CAT_COLORS[name] || "#94A3B8"} />)}
                            </Pie>
                            <Tooltip formatter={v => fmtFull(v)} contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 8 }}>
                          {Object.entries(catTotals).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([name,val]) => (
                            <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div style={{ width: 8, height: 8, borderRadius: 2, background: CAT_COLORS[name] || "#94A3B8", flexShrink: 0 }} />
                              <span style={{ fontSize: 11.5, color: c.textMuted, flex: 1 }}>{name}</span>
                              <span style={{ fontSize: 11.5, fontWeight: 700, color: c.text }}>{fmt(val)}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: c.textFaint, flexDirection: "column", gap: 8 }}>
                        <div style={{ fontSize: 32 }}>🥧</div>
                        <div style={{ fontSize: 13 }}>No expense data yet</div>
                      </div>
                    )}
                  </Card>
                </div>

                {/* RECENT TXS */}
                <Card style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: c.text }}>Recent Transactions</h3>
                    <button onClick={() => setTab("transactions")} style={{ background: "none", border: "none", color: c.blue, fontSize: 12.5, cursor: "pointer", fontWeight: 600 }}>View all →</button>
                  </div>
                  {transactions.length === 0 ? (
                    <div style={{ padding: "30px 0", textAlign: "center", color: c.textFaint }}>
                      <div style={{ fontSize: 36, marginBottom: 8 }}>💳</div>
                      <div style={{ fontSize: 13 }}>No transactions yet. Add your first one!</div>
                      <Btn onClick={() => setShowTxModal(true)} style={{ marginTop: 12 }}>+ Add Transaction</Btn>
                    </div>
                  ) : transactions.slice(0,6).map(tx => (
                    <div key={tx.id} className="tx-row" style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 6px", borderRadius: 8, transition: "background 0.15s", borderBottom: `1px solid ${c.border}` }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: INCOME_CATS.includes(tx.category) ? c.greenBg : c.redBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                        {INCOME_CATS.includes(tx.category) ? "💰" : "💳"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: c.text }}>{tx.title}</div>
                        <div style={{ fontSize: 11.5, color: c.textMuted }}>{tx.category} · {tx.date}</div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: INCOME_CATS.includes(tx.category) ? c.green : c.red }}>
                        {INCOME_CATS.includes(tx.category) ? "+" : "−"}{fmtFull(tx.amount)}
                      </div>
                    </div>
                  ))}
                </Card>

                {/* GOALS QUICK VIEW */}
                {goals.length > 0 && (
                  <Card style={{ padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: c.text }}>Savings Goals</h3>
                      <button onClick={() => setTab("goals")} style={{ background: "none", border: "none", color: c.blue, fontSize: 12.5, cursor: "pointer", fontWeight: 600 }}>Manage →</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 12 }}>
                      {goals.slice(0,4).map(g => {
                        const pct = Math.min((g.current / g.target) * 100, 100);
                        return (
                          <div key={g.id} style={{ padding: 14, background: c.surfaceAlt, borderRadius: 12, border: `1px solid ${c.border}` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                              <span style={{ fontSize: 20 }}>{g.icon}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 12.5, fontWeight: 700, color: c.text }}>{g.name}</div>
                                <div style={{ fontSize: 10.5, color: c.textMuted }}>{g.deadline}</div>
                              </div>
                              <div style={{ fontSize: 14, fontWeight: 800, color: g.color }}>{Math.round(pct)}%</div>
                            </div>
                            <Progress value={pct} color={g.color} height={6} />
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10.5, color: c.textMuted }}>
                              <span>{fmt(g.current)}</span>
                              <span>{fmt(g.target)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* ─── TRANSACTIONS ─── */}
            {tab === "transactions" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.text }}>Transactions</h2>
                    <p style={{ margin: "3px 0 0", fontSize: 13, color: c.textMuted }}>{transactions.length} total transactions</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Btn onClick={() => { setTxForm(f => ({...f, category:"Salary"})); setShowTxModal(true); }} variant="success">+ Income</Btn>
                    <Btn onClick={() => { setTxForm(f => ({...f, category:"Food & Dining"})); setShowTxModal(true); }}>+ Expense</Btn>
                  </div>
                </div>

                <Card style={{ padding: 20 }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                    {["All","Income","Expense"].map(f => (
                      <button key={f} onClick={() => setFilterType(f)} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${filterType===f ? c.blue : c.border}`, background: filterType===f ? c.blue : "transparent", color: filterType===f ? "#fff" : c.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>{f}</button>
                    ))}
                    <div style={{ width: 1, background: c.border, margin: "0 4px" }} />
                    {["All", ...CATS.slice(0,6)].map(f => (
                      <button key={f} onClick={() => setFilterCat(f)} style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${filterCat===f ? c.purple : c.border}`, background: filterCat===f ? c.purpleBg : "transparent", color: filterCat===f ? c.purple : c.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>{f}</button>
                    ))}
                  </div>

                  {filteredTx.length === 0 ? (
                    <div style={{ padding: "40px 0", textAlign: "center", color: c.textFaint }}>
                      <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
                      <div>{transactions.length === 0 ? "No transactions yet." : "No transactions match your filter."}</div>
                    </div>
                  ) : filteredTx.map(tx => (
                    <div key={tx.id} className="tx-row" style={{ display: "flex", alignItems: "center", gap: 13, padding: "11px 8px", borderRadius: 10, transition: "background 0.15s", borderBottom: `1px solid ${c.border}` }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: INCOME_CATS.includes(tx.category) ? c.greenBg : c.redBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>
                        {INCOME_CATS.includes(tx.category) ? "💰" : "💳"}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: c.text, display: "flex", alignItems: "center", gap: 6 }}>
                          {tx.title}
                          {tx.recurring && <span style={{ fontSize: 10, background: c.cyanBg, color: c.cyan, padding: "1px 6px", borderRadius: 10, fontWeight: 700 }}>🔁 {tx.recurringFreq}</span>}
                        </div>
                        <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2 }}>{tx.category} · {tx.date}{tx.notes ? ` · ${tx.notes}` : ""}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: 15, color: INCOME_CATS.includes(tx.category) ? c.green : c.red }}>
                          {INCOME_CATS.includes(tx.category) ? "+" : "−"}{fmtFull(tx.amount)}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                        <button className="action-btn" onClick={() => startEditTx(tx)} style={{ padding: "5px 8px", borderRadius: 7, border: `1px solid ${c.border}`, background: "transparent", cursor: "pointer", fontSize: 12, color: c.blue, fontFamily: "inherit" }}>✏️</button>
                        <button className="action-btn" onClick={() => deleteTx(tx.id)} style={{ padding: "5px 8px", borderRadius: 7, border: `1px solid ${c.border}`, background: "transparent", cursor: "pointer", fontSize: 12, color: c.red, fontFamily: "inherit" }}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            )}

            {/* ─── BUDGETS ─── */}
            {tab === "budgets" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.text }}>Budget Planner</h2>
                    <p style={{ margin: "3px 0 0", fontSize: 13, color: c.textMuted }}>Set and monitor your spending limits</p>
                  </div>
                  <Btn onClick={() => setShowBudgetModal(true)}>+ Add Budget</Btn>
                </div>

                {budgets.length === 0 ? (
                  <Card style={{ padding: 40, textAlign: "center" }}>
                    <div style={{ fontSize: 40, marginBottom: 10 }}>📊</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 6 }}>No budgets set</div>
                    <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 16 }}>Create budget limits to control your spending</div>
                    <Btn onClick={() => setShowBudgetModal(true)}>Create First Budget</Btn>
                  </Card>
                ) : (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                      {[
                        { label: "Total Budget", value: budgets.reduce((s,b)=>s+b.limit,0), color: c.blue },
                        { label: "Total Spent", value: budgets.reduce((s,b)=>s+(catTotals[b.category]||0),0), color: c.amber },
                        { label: "Remaining", value: budgets.reduce((s,b)=>s+(b.limit-(catTotals[b.category]||0)),0), color: c.green },
                      ].map(s => (
                        <Card key={s.label} style={{ padding: 16, textAlign: "center" }}>
                          <div style={{ fontSize: 10.5, color: c.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{s.label}</div>
                          <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{fmt(s.value)}</div>
                        </Card>
                      ))}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      {budgets.map(b => {
                        const spent = catTotals[b.category] || 0;
                        const pct = Math.min((spent / b.limit) * 100, 100);
                        const over = spent > b.limit;
                        return (
                          <Card key={b.id} style={{ padding: 18 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                              <div>
                                <div style={{ fontWeight: 700, fontSize: 14, color: c.text }}>{b.category}</div>
                                <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{fmtFull(spent)} of {fmtFull(b.limit)} · {b.period}</div>
                              </div>
                              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                                <div style={{ fontWeight: 800, fontSize: 18, color: over ? c.red : c.text }}>{Math.round(pct)}%</div>
                                <button className="action-btn" onClick={() => deleteBudget(b.id)} style={{ padding: "3px 6px", borderRadius: 6, border: `1px solid ${c.border}`, background: "transparent", cursor: "pointer", fontSize: 11, color: c.red }}>🗑️</button>
                              </div>
                            </div>
                            <Progress value={pct} color={CAT_COLORS[b.category] || c.blue} />
                            <div style={{ marginTop: 8, fontSize: 11.5, color: over ? c.red : c.green, fontWeight: 600 }}>
                              {over ? `⚠️ Over by ${fmtFull(spent - b.limit)}` : `✓ ${fmtFull(b.limit - spent)} remaining`}
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ─── GOALS ─── */}
            {tab === "goals" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.text }}>Savings Goals</h2>
                    <p style={{ margin: "3px 0 0", fontSize: 13, color: c.textMuted }}>Track your financial milestones</p>
                  </div>
                  <Btn onClick={() => setShowGoalModal(true)} variant="success">+ New Goal</Btn>
                </div>

                {goals.length === 0 ? (
                  <Card style={{ padding: 40, textAlign: "center" }}>
                    <div style={{ fontSize: 40, marginBottom: 10 }}>🎯</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 6 }}>No savings goals</div>
                    <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 16 }}>Set goals to stay motivated and track progress</div>
                    <Btn onClick={() => setShowGoalModal(true)} variant="success">Create First Goal</Btn>
                  </Card>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {goals.map(g => {
                      const pct = Math.min((g.current / g.target) * 100, 100);
                      return (
                        <Card key={g.id} style={{ padding: 20, position: "relative", overflow: "hidden" }}>
                          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: g.color }} />
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, background: g.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{g.icon}</div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 700, fontSize: 15, color: c.text }}>{g.name}</div>
                              {g.deadline && <div style={{ fontSize: 11.5, color: c.textMuted, marginTop: 2 }}>Target: {g.deadline}</div>}
                            </div>
                            <div style={{ fontWeight: 800, fontSize: 22, color: g.color }}>{Math.round(pct)}%</div>
                          </div>
                          <Progress value={pct} color={g.color} height={8} />
                          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12 }}>
                            <span style={{ color: c.textMuted }}>Saved: <strong style={{ color: c.text }}>{fmtFull(g.current)}</strong></span>
                            <span style={{ color: c.textMuted }}>Target: <strong style={{ color: c.text }}>{fmtFull(g.target)}</strong></span>
                          </div>
                          {pct >= 100 && <div style={{ marginTop: 10, padding: "7px 12px", background: c.greenBg, borderRadius: 8, fontSize: 12, fontWeight: 700, color: c.green, textAlign: "center" }}>🎉 Goal Achieved!</div>}
                          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                            <input type="number" placeholder="Add amount" id={`add-${g.id}`} style={{ flex: 1, padding: "7px 10px", borderRadius: 8, border: `1px solid ${c.border}`, background: c.surfaceAlt, color: c.text, fontSize: 12, fontFamily: "inherit", outline: "none" }} />
                            <button onClick={() => { const el = document.getElementById(`add-${g.id}`); const amt = parseFloat(el.value); if (amt > 0) { addToGoal(g.id, amt); el.value = ""; } }}
                              style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: g.color, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Add</button>
                            <button className="action-btn" onClick={() => deleteGoal(g.id)} style={{ padding: "7px 10px", borderRadius: 8, border: `1px solid ${c.border}`, background: "transparent", color: c.red, cursor: "pointer", fontSize: 12 }}>🗑️</button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ─── ANALYTICS ─── */}
            {tab === "analytics" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.text }}>Analytics & Reports</h2>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                  {[
                    { label: "Savings Rate", value: `${savingsRate}%`, icon: "📈", color: c.green },
                    { label: "Avg Monthly Exp", value: fmt(expenses / Math.max(monthlyData.filter(m=>m.expenses>0).length,1)), icon: "💸", color: c.amber },
                    { label: "Highest Income", value: fmt(Math.max(...monthlyData.map(m=>m.income),0)), icon: "🔝", color: c.blue },
                    { label: "Net This Period", value: fmt(balance,false), icon: "💰", color: balance >= 0 ? c.green : c.red },
                  ].map(s => (
                    <Card key={s.label} style={{ padding: 16, textAlign: "center" }}>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: c.textMuted, fontWeight: 600, marginTop: 3 }}>{s.label}</div>
                    </Card>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Card style={{ padding: 20 }}>
                    <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: c.text }}>Income Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={monthlyData}>
                        <defs>
                          <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={c.green} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={c.green} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={c.border} />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: c.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v)} />
                        <Tooltip formatter={v => fmtFull(v)} contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
                        <Area type="monotone" dataKey="income" stroke={c.green} fill="url(#incGrad)" strokeWidth={2.5} name="Income" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>
                  <Card style={{ padding: 20 }}>
                    <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: c.text }}>Expense Trend</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={monthlyData}>
                        <defs>
                          <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={c.red} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={c.red} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={c.border} />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: c.textMuted }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: c.textMuted }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v)} />
                        <Tooltip formatter={v => fmtFull(v)} contentStyle={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, fontSize: 12 }} />
                        <Area type="monotone" dataKey="expenses" stroke={c.red} fill="url(#expGrad)" strokeWidth={2.5} name="Expenses" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>
                </div>

                <Card style={{ padding: 20 }}>
                  <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: c.text }}>Category Breakdown</h3>
                  {Object.keys(catTotals).length === 0 ? (
                    <div style={{ padding: "30px 0", textAlign: "center", color: c.textFaint }}>No expense data yet</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {Object.entries(catTotals).sort((a,b)=>b[1]-a[1]).map(([name,val]) => {
                        const pct = expenses > 0 ? (val/expenses*100).toFixed(1) : 0;
                        return (
                          <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CAT_COLORS[name]||"#94A3B8", flexShrink: 0 }} />
                            <div style={{ width: 130, fontSize: 13, fontWeight: 600, color: c.text }}>{name}</div>
                            <div style={{ flex: 1, height: 10, background: c.surfaceAlt, borderRadius: 99, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${pct}%`, background: CAT_COLORS[name]||"#94A3B8", borderRadius: 99, transition: "width 0.8s ease" }} />
                            </div>
                            <div style={{ width: 80, textAlign: "right", fontSize: 13, fontWeight: 700, color: c.text }}>{fmtFull(val)}</div>
                            <div style={{ width: 40, textAlign: "right", fontSize: 11.5, color: c.textMuted, fontWeight: 600 }}>{pct}%</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* ─── AI ADVISOR ─── */}
            {tab === "ai" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg, ${c.blue}, ${c.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>✨</div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.text }}>AI Financial Advisor</h2>
                    <p style={{ margin: 0, fontSize: 13, color: c.textMuted }}>Powered by Claude · Personalized to your data</p>
                  </div>
                  <Badge color="blue">Live Data</Badge>
                </div>
                <Card style={{ minHeight: 540, display: "flex", flexDirection: "column", padding: 0 }}>
                  <div style={{ padding: "14px 18px", borderBottom: `1px solid ${c.border}`, background: c.blueBg, display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${c.blue}, ${c.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✨</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13.5, color: c.text }}>Track & Save AI</div>
                      <div style={{ fontSize: 11, color: c.green, fontWeight: 600 }}>● Online · Analyzing your {transactions.length} transactions</div>
                    </div>
                  </div>
                  <AIChat transactions={transactions} goals={goals} budgets={budgets} />
                </Card>
              </div>
            )}

            {/* ─── SETTINGS ─── */}
            {tab === "settings" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.text }}>Settings</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Card style={{ padding: 24 }}>
                    <h3 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700, color: c.text }}>Profile</h3>
                    <Input label="Display Name" value={profile.name} onChange={e => setProfile(p => ({...p, name: e.target.value}))} />
                    <div style={{ fontSize: 12, color: c.textMuted, marginTop: 4 }}>This name appears throughout the dashboard.</div>
                  </Card>
                  <Card style={{ padding: 24 }}>
                    <h3 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700, color: c.text }}>Appearance</h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${c.border}` }}>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: c.text }}>Dark Mode</div>
                        <div style={{ fontSize: 11.5, color: c.textMuted }}>Switch between light and dark theme</div>
                      </div>
                      <button onClick={() => setDark(!dark)} style={{ width: 48, height: 26, borderRadius: 13, background: dark ? c.blue : c.border, border: "none", cursor: "pointer", position: "relative", transition: "background 0.3s" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: dark ? 25 : 3, transition: "left 0.3s" }} />
                      </button>
                    </div>
                  </Card>
                  <Card style={{ padding: 24 }}>
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: c.text }}>Data Management</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <Btn onClick={exportPDF} variant="ghost" style={{ justifyContent: "flex-start" }}>📄 Export Financial Report</Btn>
                      <Btn onClick={() => { if (confirm("Clear all transactions? This cannot be undone.")) { setTransactions([]); } }} variant="ghost" style={{ justifyContent: "flex-start", color: c.red }}>🗑️ Clear All Transactions</Btn>
                      <Btn onClick={() => { if (confirm("Reset all data? This cannot be undone.")) { setTransactions([]); setGoals([]); setBudgets([]); setNotifications([]); } }} variant="ghost" style={{ justifyContent: "flex-start", color: c.red }}>⚠️ Reset All Data</Btn>
                    </div>
                  </Card>
                  <Card style={{ padding: 24 }}>
                    <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: c.text }}>Summary</h3>
                    {[
                      { label: "Transactions", value: transactions.length },
                      { label: "Savings Goals", value: goals.length },
                      { label: "Budget Items", value: budgets.length },
                      { label: "Notifications", value: notifications.length },
                    ].map(s => (
                      <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${c.border}` }}>
                        <span style={{ fontSize: 13, color: c.textMuted }}>{s.label}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{s.value}</span>
                      </div>
                    ))}
                  </Card>
                </div>
              </div>
            )}

            {/* ─── NOTIFICATIONS ─── */}
            {tab === "notifications" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: c.text }}>Notifications {unread > 0 && <Badge color="red">{unread} new</Badge>}</h2>
                  <Btn onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))} variant="ghost">Mark all read</Btn>
                </div>
                <Card style={{ padding: 4 }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: "40px 0", textAlign: "center", color: c.textFaint }}>
                      <div style={{ fontSize: 36, marginBottom: 8 }}>🔔</div>
                      <div>No notifications yet</div>
                    </div>
                  ) : notifications.map(n => {
                    const colors = { warning: c.amber, error: c.red, success: c.green, info: c.blue };
                    const bgs = { warning: c.amberBg, error: c.redBg, success: c.greenBg, info: c.blueBg };
                    const icons = { warning: "⚠️", error: "🚨", success: "✅", info: "ℹ️" };
                    return (
                      <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id===n.id ? {...x, read:true} : x))}
                        style={{ display: "flex", gap: 13, padding: "13px 16px", cursor: "pointer", background: n.read ? "transparent" : c.blueBg, borderRadius: 10, marginBottom: 2, transition: "background 0.15s" }}>
                        <div style={{ width: 38, height: 38, borderRadius: "50%", background: bgs[n.type] || c.blueBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{icons[n.type] || "🔔"}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: n.read ? 600 : 700, fontSize: 13.5, color: c.text }}>{n.title}</div>
                          <div style={{ fontSize: 12.5, color: c.textMuted, marginTop: 3 }}>{n.desc}</div>
                          <div style={{ fontSize: 11, color: c.textFaint, marginTop: 4 }}>{n.time}</div>
                        </div>
                        {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.blue, marginTop: 5, flexShrink: 0 }} />}
                      </div>
                    );
                  })}
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* ─── MODALS ─── */}
        {showTxModal && (
          <Modal title={editTx ? "Edit Transaction" : "Add Transaction"} onClose={() => { setShowTxModal(false); setEditTx(null); setTxForm({ title: "", amount: "", category: "Food & Dining", date: today(), notes: "", recurring: false, recurringFreq: "monthly" }); }}>
            <Input label="Title" placeholder="e.g. Salary, Dinner, Netflix..." value={txForm.title} onChange={e => setTxForm(f=>({...f,title:e.target.value}))} />
            <Input label="Amount (₹)" type="number" placeholder="0" value={txForm.amount} onChange={e => setTxForm(f=>({...f,amount:e.target.value}))} />
            <Select label="Category" options={CATS} value={txForm.category} onChange={e => setTxForm(f=>({...f,category:e.target.value}))} />
            <Input label="Date" type="date" value={txForm.date} onChange={e => setTxForm(f=>({...f,date:e.target.value}))} />
            <Input label="Notes (optional)" placeholder="Add a note..." value={txForm.notes} onChange={e => setTxForm(f=>({...f,notes:e.target.value}))} />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={txForm.recurring} onChange={e => setTxForm(f=>({...f,recurring:e.target.checked}))} />
                <span style={{ fontSize: 13, color: c.text, fontWeight: 600 }}>Recurring transaction</span>
              </label>
              {txForm.recurring && (
                <Select options={["daily","weekly","monthly","yearly"]} value={txForm.recurringFreq} onChange={e => setTxForm(f=>({...f,recurringFreq:e.target.value}))} style={{ marginTop: 8 }} />
              )}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={() => { setShowTxModal(false); setEditTx(null); }} variant="ghost" style={{ flex: 1 }}>Cancel</Btn>
              <Btn onClick={saveTx} style={{ flex: 2 }}>{editTx ? "Update" : INCOME_CATS.includes(txForm.category) ? "Add Income" : "Add Expense"}</Btn>
            </div>
          </Modal>
        )}

        {showGoalModal && (
          <Modal title={editGoal ? "Edit Goal" : "New Savings Goal"} onClose={() => { setShowGoalModal(false); setEditGoal(null); }}>
            <Input label="Goal Name" placeholder="e.g. Emergency Fund, New MacBook..." value={goalForm.name} onChange={e => setGoalForm(f=>({...f,name:e.target.value}))} />
            <Input label="Target Amount (₹)" type="number" placeholder="100000" value={goalForm.target} onChange={e => setGoalForm(f=>({...f,target:e.target.value}))} />
            <Input label="Current Savings (₹)" type="number" placeholder="0" value={goalForm.current} onChange={e => setGoalForm(f=>({...f,current:e.target.value}))} />
            <Input label="Target Date" type="date" value={goalForm.deadline} onChange={e => setGoalForm(f=>({...f,deadline:e.target.value}))} />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: c.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Icon</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["🎯","🏠","🚗","✈️","💻","📱","🏖️","🛡️","💰","📚","💍","🏋️"].map(icon => (
                  <button key={icon} onClick={() => setGoalForm(f=>({...f,icon}))} style={{ width: 36, height: 36, borderRadius: 8, border: `2px solid ${goalForm.icon===icon ? c.blue : c.border}`, background: goalForm.icon===icon ? c.blueBg : "transparent", cursor: "pointer", fontSize: 18 }}>{icon}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: c.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>Color</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["#4F46E5","#059669","#DC2626","#D97706","#7C3AED","#0891B2","#EC4899"].map(col => (
                  <button key={col} onClick={() => setGoalForm(f=>({...f,color:col}))} style={{ width: 28, height: 28, borderRadius: "50%", background: col, border: `3px solid ${goalForm.color===col ? c.text : "transparent"}`, cursor: "pointer" }} />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={() => setShowGoalModal(false)} variant="ghost" style={{ flex: 1 }}>Cancel</Btn>
              <Btn onClick={saveGoal} variant="success" style={{ flex: 2 }}>Save Goal</Btn>
            </div>
          </Modal>
        )}

        {showBudgetModal && (
          <Modal title="Set Budget Limit" onClose={() => setShowBudgetModal(false)}>
            <Select label="Category" options={CATS.filter(c => !INCOME_CATS.includes(c))} value={budgetForm.category} onChange={e => setBudgetForm(f=>({...f,category:e.target.value}))} />
            <Input label="Monthly Limit (₹)" type="number" placeholder="10000" value={budgetForm.limit} onChange={e => setBudgetForm(f=>({...f,limit:e.target.value}))} />
            <Select label="Period" options={["monthly","weekly","yearly"]} value={budgetForm.period} onChange={e => setBudgetForm(f=>({...f,period:e.target.value}))} />
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={() => setShowBudgetModal(false)} variant="ghost" style={{ flex: 1 }}>Cancel</Btn>
              <Btn onClick={saveBudget} style={{ flex: 2 }}>Save Budget</Btn>
            </div>
          </Modal>
        )}
      </div>
    </ThemeCtx.Provider>
  );
}