import { useState } from "react";

const COLORS = {
  navy: "#050E1D", navyMid: "#0A1628", navyCard: "#0F1E35",
  blue: "#1A73E8", blueLight: "#4A9EFF", emerald: "#10B981",
  indigo: "#6366F1", white: "#FFFFFF", textMuted: "#94A3B8",
  border: "rgba(255,255,255,0.1)", red: "#EF4444",
};

function AuthLayout({ children, title, subtitle, illustration }) {
  return (
    <div style={{ minHeight: "100vh", background: COLORS.navy, display: "flex", fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .input-field:focus { border-color: #1A73E8 !important; outline: none; box-shadow: 0 0 0 3px rgba(26,115,232,0.15); }
        .input-field::placeholder { color: #475569; }
        .submit-btn:hover { opacity: 0.92; transform: translateY(-1px); }
        .social-btn:hover { background: rgba(255,255,255,0.06) !important; }
        .link-btn:hover { color: #4A9EFF !important; }
        * { box-sizing: border-box; }
        .grid-bg {
          background-image: linear-gradient(rgba(26,115,232,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,115,232,0.05) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      {/* LEFT PANEL */}
      <div className="grid-bg" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "60px 40px", position: "relative", overflow: "hidden", background: COLORS.navyMid, borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,115,232,0.15) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 420, animation: "fadeUp 0.8s ease" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #1A73E8, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💎</div>
            <span style={{ fontWeight: 900, fontSize: 20, color: "#fff", letterSpacing: -0.5 }}>Track & Save</span>
          </div>

          {/* Illustration: animated dashboard cards */}
          <div style={{ animation: "float 4s ease-in-out infinite", marginBottom: 48 }}>
            <div style={{ background: COLORS.navyCard, borderRadius: 20, padding: 20, border: "1px solid rgba(255,255,255,0.08)", marginBottom: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                {[
                  { l: "Balance", v: "₹2.84L", c: "#4A9EFF" },
                  { l: "Savings", v: "₹52.4K", c: "#10B981" },
                  { l: "Income", v: "₹1.25L", c: "#06B6D4" },
                  { l: "Score", v: "847", c: "#6366F1" },
                ].map(c => (
                  <div key={c.l} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 10 }}>
                    <div style={{ fontSize: 10, color: COLORS.textMuted, fontWeight: 600 }}>{c.l}</div>
                    <div style={{ fontSize: 17, fontWeight: 800, color: c.c }}>{c.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 10, marginBottom: 8, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "72%", background: "linear-gradient(90deg, #1A73E8, #6366F1)", borderRadius: 10 }} />
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>Monthly budget: 72% utilized</div>
            </div>

            <div style={{ background: "linear-gradient(135deg, rgba(26,115,232,0.15), rgba(99,102,241,0.1))", borderRadius: 16, padding: 16, border: "1px solid rgba(26,115,232,0.25)", display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #1A73E8, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✨</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>AI Insight</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>You could save ₹4,200 by reducing food delivery 3x/week</div>
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: -0.8, margin: "0 0 12px", lineHeight: 1.2 }}>{title}</h2>
          <p style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.7, margin: 0 }}>{subtitle}</p>

          <div style={{ display: "flex", gap: 20, marginTop: 32 }}>
            {["2.4L+ users", "₹840Cr+ tracked", "4.9★ rating"].map(s => (
              <div key={s} style={{ fontSize: 12.5, color: COLORS.textMuted, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: COLORS.emerald }}>●</span> {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex: "0 0 480px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 48px", overflow: "auto" }}>
        {children}
      </div>
    </div>
  );
}

function Input({ label, type = "text", placeholder, value, onChange, icon, action }) {
  const [show, setShow] = useState(false);
  const inputType = type === "password" ? (show ? "text" : "password") : type;
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: COLORS.textMuted, marginBottom: 7, letterSpacing: 0.4 }}>{label.toUpperCase()}</label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {icon && <span style={{ position: "absolute", left: 14, fontSize: 17, pointerEvents: "none" }}>{icon}</span>}
        <input
          className="input-field"
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: `12px ${type === "password" ? 44 : 14}px 12px ${icon ? 42 : 14}px`,
            background: "rgba(255,255,255,0.04)",
            border: "1.5px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            color: "#fff",
            fontSize: 14.5,
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        />
        {type === "password" && (
          <button onClick={() => setShow(!show)} style={{ position: "absolute", right: 14, background: "none", border: "none", cursor: "pointer", color: COLORS.textMuted, fontSize: 16, padding: 0 }}>
            {show ? "🙈" : "👁️"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ──────────────── SIGN IN ──────────────── */
export function SignIn({ onNavigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  async function handleLogin() {
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    // In real app: POST /api/auth/login → get JWT → store → redirect
    onNavigate?.("dashboard");
  }

  return (
    <AuthLayout
      title="Smart Finance Management for Modern Users"
      subtitle="Join 2,40,000+ professionals who track, plan and grow their wealth with AI-powered insights."
    >
      <div style={{ animation: "fadeUp 0.6s ease" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: -0.8, margin: "0 0 8px" }}>Welcome back</h1>
          <p style={{ fontSize: 14.5, color: COLORS.textMuted, margin: 0 }}>Sign in to your Track & Save account</p>
        </div>

        {/* Google */}
        <button className="social-btn" style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 14.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 24, transition: "all 0.2s" }}>
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        {error && <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, fontSize: 13.5, color: "#FCA5A5", marginBottom: 16 }}>⚠️ {error}</div>}

        <Input label="Email Address" type="email" placeholder="you@example.com" icon="✉️" value={form.email} onChange={set("email")} />
        <Input label="Password" type="password" placeholder="Enter your password" value={form.password} onChange={set("password")} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: COLORS.blue }} />
            <span style={{ fontSize: 13.5, color: COLORS.textMuted }}>Remember me</span>
          </label>
          <button className="link-btn" onClick={() => onNavigate?.("forgot")} style={{ background: "none", border: "none", color: COLORS.blueLight, fontSize: 13.5, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, transition: "color 0.2s" }}>
            Forgot password?
          </button>
        </div>

        <button className="submit-btn" onClick={handleLogin} disabled={loading}
          style={{ width: "100%", padding: "14px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #1A73E8, #6366F1)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: loading ? "wait" : "pointer", fontFamily: "inherit", transition: "all 0.2s", opacity: loading ? 0.8 : 1 }}>
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        <p style={{ textAlign: "center", fontSize: 13.5, color: COLORS.textMuted, marginTop: 24 }}>
          Don't have an account?{" "}
          <button className="link-btn" onClick={() => onNavigate?.("signup")} style={{ background: "none", border: "none", color: COLORS.blueLight, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13.5, transition: "color 0.2s" }}>
            Sign up free
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}

/* ──────────────── SIGN UP ──────────────── */
export function SignUp({ onNavigate }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const strength = (() => {
    const p = form.password;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#EF4444", "#F59E0B", "#06B6D4", "#10B981"];

  async function handleSignUp() {
    if (!form.name || !form.email || !form.password || !form.confirm) { setError("Please fill in all fields."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (!agreed) { setError("Please accept the terms to continue."); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    onNavigate?.("dashboard");
  }

  return (
    <AuthLayout
      title="Start your journey to financial freedom"
      subtitle="Track & Save gives you the tools, insights and AI-powered guidance to build real wealth."
    >
      <div style={{ animation: "fadeUp 0.6s ease" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: -0.8, margin: "0 0 8px" }}>Create your account</h1>
          <p style={{ fontSize: 14, color: COLORS.textMuted, margin: 0 }}>Free forever. No credit card required.</p>
        </div>

        <button className="social-btn" style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 22, transition: "all 0.2s" }}>
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>

        {error && <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 10, fontSize: 13, color: "#FCA5A5", marginBottom: 14 }}>⚠️ {error}</div>}

        <Input label="Full Name" placeholder="Rajesh Kumar" icon="👤" value={form.name} onChange={set("name")} />
        <Input label="Email Address" type="email" placeholder="you@example.com" icon="✉️" value={form.email} onChange={set("email")} />
        <Input label="Password" type="password" placeholder="Create a strong password" value={form.password} onChange={set("password")} />

        {form.password.length > 0 && (
          <div style={{ marginTop: -10, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 4, marginBottom: 5 }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ flex: 1, height: 3, borderRadius: 10, background: i <= strength ? strengthColor[strength] : "rgba(255,255,255,0.08)", transition: "background 0.3s" }} />
              ))}
            </div>
            <span style={{ fontSize: 11.5, color: strengthColor[strength], fontWeight: 600 }}>{strengthLabel[strength]} password</span>
          </div>
        )}

        <Input label="Confirm Password" type="password" placeholder="Repeat your password" value={form.confirm} onChange={set("confirm")} />

        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", marginBottom: 22 }}>
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} style={{ accentColor: COLORS.blue, marginTop: 2 }} />
          <span style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>
            I agree to the{" "}
            <span style={{ color: COLORS.blueLight, fontWeight: 600 }}>Terms of Service</span> and{" "}
            <span style={{ color: COLORS.blueLight, fontWeight: 600 }}>Privacy Policy</span>
          </span>
        </label>

        <button className="submit-btn" onClick={handleSignUp} disabled={loading}
          style={{ width: "100%", padding: "14px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #10B981, #1A73E8)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: loading ? "wait" : "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
          {loading ? "Creating account..." : "Create Free Account →"}
        </button>

        <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textMuted, marginTop: 20 }}>
          Already have an account?{" "}
          <button className="link-btn" onClick={() => onNavigate?.("signin")} style={{ background: "none", border: "none", color: COLORS.blueLight, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13, transition: "color 0.2s" }}>
            Sign in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
}

/* ──────────────── FORGOT PASSWORD ──────────────── */
export function ForgotPassword({ onNavigate }) {
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=reset, 4=done
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [passwords, setPasswords] = useState({ new: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const submit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    if (step < 4) setStep(s => s + 1);
    if (step === 2) {
      let t = 60;
      const iv = setInterval(() => { t--; setTimer(t); if (t <= 0) clearInterval(iv); }, 1000);
    }
  };

  return (
    <AuthLayout
      title="Account recovery made simple"
      subtitle="We'll help you get back into your account securely in just a few steps."
    >
      <div style={{ animation: "fadeUp 0.5s ease" }}>
        {/* Steps indicator */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
          {["Email", "OTP", "Reset", "Done"].map((s, i) => (
            <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: i + 1 <= step ? "linear-gradient(135deg, #1A73E8, #6366F1)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, transition: "all 0.3s" }}>
                {i + 1 < step ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 10, color: i + 1 <= step ? COLORS.blueLight : COLORS.textMuted, fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>Forgot your password?</h2>
            <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 28, lineHeight: 1.6 }}>Enter the email address linked to your account. We'll send a 6-digit OTP.</p>
            <Input label="Email Address" type="email" placeholder="you@example.com" icon="✉️" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={submit} disabled={loading || !email} style={{ width: "100%", padding: "14px", borderRadius: 14, border: "none", background: email ? "linear-gradient(135deg, #1A73E8, #6366F1)" : "rgba(255,255,255,0.1)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: email ? "pointer" : "not-allowed", fontFamily: "inherit", marginTop: 8 }}>
              {loading ? "Sending..." : "Send OTP →"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>Check your email</h2>
            <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 28, lineHeight: 1.6 }}>We sent a 6-digit code to <strong style={{ color: COLORS.blueLight }}>{email}</strong>. Enter it below.</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
              {otp.map((v, i) => (
                <input key={i} maxLength={1} value={v}
                  onChange={e => { const n = [...otp]; n[i] = e.target.value; setOtp(n); if (e.target.value && i < 5) document.querySelectorAll(".otp-input")[i + 1]?.focus(); }}
                  className="otp-input input-field"
                  style={{ width: 48, height: 52, textAlign: "center", background: "rgba(255,255,255,0.05)", border: v ? "1.5px solid #1A73E8" : "1.5px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff", fontSize: 22, fontWeight: 800, fontFamily: "inherit" }}
                />
              ))}
            </div>
            <button onClick={submit} style={{ width: "100%", padding: "14px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #1A73E8, #6366F1)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
              {loading ? "Verifying..." : "Verify OTP →"}
            </button>
            <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textMuted, marginTop: 16 }}>
              {timer > 0 ? `Resend in ${timer}s` : <span style={{ color: COLORS.blueLight, cursor: "pointer" }}>Resend OTP</span>}
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>Set new password</h2>
            <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 28, lineHeight: 1.6 }}>Choose a strong password you haven't used before.</p>
            <Input label="New Password" type="password" placeholder="Enter new password" value={passwords.new} onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))} />
            <Input label="Confirm Password" type="password" placeholder="Repeat new password" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} />
            <button onClick={submit} style={{ width: "100%", padding: "14px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #10B981, #1A73E8)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginTop: 8 }}>
              {loading ? "Resetting..." : "Reset Password →"}
            </button>
          </>
        )}

        {step === 4 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(16,185,129,0.15)", border: "2px solid #10B981", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 24px" }}>✓</div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 12px" }}>Password reset!</h2>
            <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 32, lineHeight: 1.7 }}>Your password has been successfully reset. You can now sign in with your new credentials.</p>
            <button onClick={() => onNavigate?.("signin")} style={{ padding: "14px 36px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #1A73E8, #6366F1)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
              Sign In →
            </button>
          </div>
        )}

        {step < 4 && (
          <p style={{ textAlign: "center", fontSize: 13, color: COLORS.textMuted, marginTop: 24 }}>
            Remember your password?{" "}
            <button className="link-btn" onClick={() => onNavigate?.("signin")} style={{ background: "none", border: "none", color: COLORS.blueLight, cursor: "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 13 }}>
              Back to Sign In
            </button>
          </p>
        )}
      </div>
    </AuthLayout>
  );
}

/* Default export: Auth Router */
export default function AuthSystem({ initialPage = "signin", onSuccess }) {
  const [page, setPage] = useState(initialPage);
  const navigate = p => { if (p === "dashboard") onSuccess?.(); else setPage(p); };
  if (page === "signup") return <SignUp onNavigate={navigate} />;
  if (page === "forgot") return <ForgotPassword onNavigate={navigate} />;
  return <SignIn onNavigate={navigate} />;
}