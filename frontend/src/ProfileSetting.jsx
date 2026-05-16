import { useState, useRef } from "react";

export function ProfileSettings({ theme, toggleTheme }) {
  const isDark = theme === "dark";
  const C = {
    bg: isDark ? "#050E1D" : "#F0F4F8",
    card: isDark ? "#0F1E35" : "#FFFFFF",
    border: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0",
    text: isDark ? "#F1F5F9" : "#0F172A",
    textMuted: isDark ? "#94A3B8" : "#64748B",
    input: isDark ? "rgba(255,255,255,0.05)" : "#F8FAFC",
    inputBorder: isDark ? "rgba(255,255,255,0.12)" : "#E2E8F0",
    blue: "#1A73E8", emerald: "#10B981", red: "#EF4444",
  };

  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ name: "Rajesh Kumar", email: "rajesh.kumar@gmail.com", phone: "+91 98765 43210", dob: "1992-04-15", occupation: "Software Engineer", currency: "INR", timezone: "Asia/Kolkata" });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [notifPrefs, setNotifPrefs] = useState({ budgetAlerts: true, goalMilestones: true, billReminders: true, weeklySummary: true, emailNotifs: false, pushNotifs: true });
  const [avatar, setAvatar] = useState(null);
  const [saved, setSaved] = useState("");
  const fileRef = useRef(null);

  const set = k => e => setProfile(p => ({ ...p, [k]: e.target.value }));
  const setP = k => e => setPasswords(p => ({ ...p, [k]: e.target.value }));

  function saveProfile() {
    setSaved("profile");
    setTimeout(() => setSaved(""), 2500);
  }

  function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  }

  const TABS = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
    { id: "danger", label: "Danger Zone", icon: "⚠️" },
  ];

  const Card = ({ children, style = {} }) => (
    <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 24, marginBottom: 20, ...style }}>{children}</div>
  );

  const Field = ({ label, children }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.textMuted, marginBottom: 7, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
      {children}
    </div>
  );

  const Input = ({ value, onChange, type = "text", placeholder }) => (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.inputBorder}`, background: C.input, color: C.text, fontSize: 14, fontFamily: "inherit", transition: "border 0.2s", outline: "none", boxSizing: "border-box" }}
      onFocus={e => e.target.style.borderColor = "#1A73E8"}
      onBlur={e => e.target.style.borderColor = C.inputBorder}
    />
  );

  const Toggle = ({ checked, onChange }) => (
    <div onClick={() => onChange(!checked)} style={{ width: 44, height: 24, borderRadius: 12, background: checked ? C.blue : C.inputBorder, cursor: "pointer", position: "relative", transition: "background 0.3s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 2, left: checked ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.3s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100%", fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        .settings-tab:hover { opacity: 1 !important; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: 28 }}>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>Profile Settings</h2>
          <p style={{ margin: "4px 0 0", fontSize: 13.5, color: C.textMuted }}>Manage your account, security, and preferences</p>
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {/* Sidebar */}
          <div style={{ width: 200, flexShrink: 0 }}>
            <Card style={{ padding: 8 }}>
              {TABS.map(tab => (
                <div key={tab.id} className="settings-tab"
                  onClick={() => setActiveTab(tab.id)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, cursor: "pointer", marginBottom: 2, background: activeTab === tab.id ? (isDark ? "rgba(26,115,232,0.15)" : "#EEF2FF") : "transparent", color: activeTab === tab.id ? C.blue : C.textMuted, fontWeight: activeTab === tab.id ? 700 : 500, fontSize: 13.5, transition: "all 0.15s", opacity: 1 }}>
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              ))}
            </Card>
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <>
                <Card>
                  <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: C.text }}>Profile Photo</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ width: 80, height: 80, borderRadius: "50%", background: avatar ? `url(${avatar}) center/cover` : "linear-gradient(135deg, #1A73E8, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, color: "#fff", overflow: "hidden" }}>
                        {!avatar && "RK"}
                      </div>
                    </div>
                    <div>
                      <button onClick={() => fileRef.current?.click()} style={{ padding: "9px 18px", borderRadius: 10, border: `1.5px solid ${C.blue}`, background: "transparent", color: C.blue, fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginRight: 10 }}>Upload Photo</button>
                      {avatar && <button onClick={() => setAvatar(null)} style={{ padding: "9px 18px", borderRadius: 10, border: `1.5px solid ${C.border}`, background: "transparent", color: C.textMuted, fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Remove</button>}
                      <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarUpload} />
                      <p style={{ fontSize: 12, color: C.textMuted, margin: "8px 0 0" }}>JPG, PNG or GIF. Max 5MB.</p>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: C.text }}>Personal Information</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                    <Field label="Full Name"><Input value={profile.name} onChange={set("name")} placeholder="Your full name" /></Field>
                    <Field label="Email Address"><Input type="email" value={profile.email} onChange={set("email")} placeholder="your@email.com" /></Field>
                    <Field label="Phone Number"><Input value={profile.phone} onChange={set("phone")} placeholder="+91 XXXXX XXXXX" /></Field>
                    <Field label="Date of Birth"><Input type="date" value={profile.dob} onChange={set("dob")} /></Field>
                    <Field label="Occupation"><Input value={profile.occupation} onChange={set("occupation")} placeholder="Your role" /></Field>
                    <Field label="Currency">
                      <select value={profile.currency} onChange={set("currency")} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.inputBorder}`, background: C.input, color: C.text, fontSize: 14, fontFamily: "inherit" }}>
                        {["INR", "USD", "EUR", "GBP", "AED", "SGD"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                  </div>

                  {saved === "profile" && (
                    <div style={{ padding: "10px 16px", background: "#D1FAE5", borderRadius: 10, fontSize: 13.5, fontWeight: 600, color: "#065F46", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                      ✓ Profile saved successfully!
                    </div>
                  )}

                  <button onClick={saveProfile} style={{ padding: "11px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #1A73E8, #6366F1)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    Save Changes
                  </button>
                </Card>
              </>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <>
                <Card>
                  <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: C.text }}>Change Password</h3>
                  <Field label="Current Password">
                    <input type="password" value={passwords.current} onChange={setP("current")} placeholder="Enter current password"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.inputBorder}`, background: C.input, color: C.text, fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }} />
                  </Field>
                  <Field label="New Password">
                    <input type="password" value={passwords.new} onChange={setP("new")} placeholder="Enter new password"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.inputBorder}`, background: C.input, color: C.text, fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }} />
                  </Field>
                  <Field label="Confirm New Password">
                    <input type="password" value={passwords.confirm} onChange={setP("confirm")} placeholder="Repeat new password"
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.inputBorder}`, background: C.input, color: C.text, fontSize: 14, fontFamily: "inherit", boxSizing: "border-box" }} />
                  </Field>
                  <button style={{ padding: "11px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #1A73E8, #6366F1)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                    Update Password
                  </button>
                </Card>

                <Card>
                  <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: C.text }}>Two-Factor Authentication</h3>
                  <p style={{ margin: "0 0 16px", fontSize: 13.5, color: C.textMuted }}>Add an extra layer of security to your account.</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: isDark ? "rgba(255,255,255,0.03)" : "#F8FAFC", borderRadius: 12, border: `1px solid ${C.border}` }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>Authenticator App</div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>Use Google Authenticator or Authy</div>
                    </div>
                    <button style={{ padding: "8px 16px", borderRadius: 8, border: `1.5px solid ${C.blue}`, background: "transparent", color: C.blue, fontSize: 12.5, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Enable</button>
                  </div>
                </Card>

                <Card>
                  <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.text }}>Active Sessions</h3>
                  {[
                    { device: "Chrome on Windows", location: "Bengaluru, India", time: "Now", current: true },
                    { device: "Safari on iPhone", location: "Mumbai, India", time: "2 hrs ago", current: false },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 1 ? `1px solid ${C.border}` : "none" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{s.device}</div>
                        <div style={{ fontSize: 12, color: C.textMuted }}>{s.location} · {s.time}</div>
                      </div>
                      {s.current
                        ? <span style={{ fontSize: 11, fontWeight: 700, color: C.emerald, padding: "4px 10px", borderRadius: 20, background: "#D1FAE5" }}>Current</span>
                        : <button style={{ fontSize: 12, color: C.red, fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>Revoke</button>
                      }
                    </div>
                  ))}
                </Card>
              </>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === "notifications" && (
              <Card>
                <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: C.text }}>Notification Preferences</h3>
                {[
                  { key: "budgetAlerts", label: "Budget Alerts", desc: "Get notified when you exceed category budgets" },
                  { key: "goalMilestones", label: "Goal Milestones", desc: "Celebrate when you hit savings goal checkpoints" },
                  { key: "billReminders", label: "Bill Reminders", desc: "Reminders 3 days before bills are due" },
                  { key: "weeklySummary", label: "Weekly Summary", desc: "A recap of your week's financial activity" },
                  { key: "emailNotifs", label: "Email Notifications", desc: "Receive important updates via email" },
                  { key: "pushNotifs", label: "Push Notifications", desc: "Real-time alerts in your browser" },
                ].map(n => (
                  <div key={n.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{n.label}</div>
                      <div style={{ fontSize: 12.5, color: C.textMuted, marginTop: 2 }}>{n.desc}</div>
                    </div>
                    <Toggle checked={notifPrefs[n.key]} onChange={v => setNotifPrefs(p => ({ ...p, [n.key]: v }))} />
                  </div>
                ))}
              </Card>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === "preferences" && (
              <>
                <Card>
                  <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: C.text }}>Appearance</h3>
                  <div style={{ display: "flex", gap: 12 }}>
                    {[
                      { id: "light", label: "Light Mode", icon: "☀️" },
                      { id: "dark", label: "Dark Mode", icon: "🌙" },
                      { id: "system", label: "System", icon: "💻" },
                    ].map(t => (
                      <div key={t.id} onClick={() => t.id !== "system" && toggleTheme?.()}
                        style={{ flex: 1, padding: "16px 12px", borderRadius: 12, border: `1.5px solid ${theme === t.id ? C.blue : C.border}`, background: theme === t.id ? (isDark ? "rgba(26,115,232,0.15)" : "#EEF2FF") : "transparent", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: theme === t.id ? C.blue : C.textMuted }}>{t.label}</div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: C.text }}>Regional Settings</h3>
                  <Field label="Default Currency">
                    <select style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.inputBorder}`, background: C.input, color: C.text, fontSize: 14, fontFamily: "inherit" }}>
                      <option>INR – Indian Rupee (₹)</option>
                      <option>USD – US Dollar ($)</option>
                      <option>EUR – Euro (€)</option>
                    </select>
                  </Field>
                  <Field label="Timezone">
                    <select style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.inputBorder}`, background: C.input, color: C.text, fontSize: 14, fontFamily: "inherit" }}>
                      <option>Asia/Kolkata (IST, UTC+5:30)</option>
                      <option>America/New_York (EST, UTC-5)</option>
                      <option>Europe/London (GMT, UTC+0)</option>
                    </select>
                  </Field>
                  <Field label="Date Format">
                    <select style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: `1.5px solid ${C.inputBorder}`, background: C.input, color: C.text, fontSize: 14, fontFamily: "inherit" }}>
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </Field>
                  <button style={{ padding: "11px 28px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #1A73E8, #6366F1)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Save Preferences</button>
                </Card>
              </>
            )}

            {/* DANGER ZONE */}
            {activeTab === "danger" && (
              <Card style={{ border: "1.5px solid rgba(239,68,68,0.3)", background: isDark ? "rgba(239,68,68,0.05)" : "#FFF5F5" }}>
                <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: C.red }}>⚠️ Danger Zone</h3>
                <p style={{ margin: "0 0 24px", fontSize: 13.5, color: C.textMuted }}>Irreversible actions. Please proceed with caution.</p>

                {[
                  { title: "Export All Data", desc: "Download a full copy of your financial data as JSON.", btn: "Export Data", color: C.blue },
                  { title: "Reset Account", desc: "Delete all your transactions, goals, and budgets. This cannot be undone.", btn: "Reset Account", color: "#F59E0B" },
                  { title: "Delete Account", desc: "Permanently delete your account and all associated data. This action is irreversible.", btn: "Delete Account", color: C.red },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: i < 2 ? `1px solid rgba(239,68,68,0.15)` : "none" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{item.title}</div>
                      <div style={{ fontSize: 12.5, color: C.textMuted, marginTop: 3, maxWidth: 400 }}>{item.desc}</div>
                    </div>
                    <button style={{ padding: "9px 18px", borderRadius: 10, border: `1.5px solid ${item.color}`, background: "transparent", color: item.color, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>{item.btn}</button>
                  </div>
                ))}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}