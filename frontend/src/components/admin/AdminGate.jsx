import React, { useState } from "react";
import { Lock } from "lucide-react";
import { loginAdmin } from "../../api/profileApi";
import { c, display, mono, btnPrimary, btnGhost } from "../../utils/constants";

export default function AdminGate({ onEnter, onBack }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setErr("");
    setLoading(true);
    try {
      const user = await loginAdmin(email, pw);
      onEnter(user);
    } catch (error) {
      setErr(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card auth-card--advanced">
        <div className="auth-badge-wrap">
          <div className="auth-badge-icon">
            <Lock size={16} />
          </div>
          <span className="auth-badge-label">Restricted access</span>
        </div>

        <div className="auth-header">
          <h1 className="auth-title">Admin sign-in</h1>
          <p className="auth-subtitle">Use admin credentials to access the dashboard.</p>
        </div>

        <div className="auth-field-group">
          <label className="auth-label">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input auth-input" />
        </div>

        <div className="auth-field-group">
          <label className="auth-label">Password</label>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} placeholder="••••••••" className="input auth-input" />
        </div>

        {err && <p className="error-text">{err}</p>}

        <div className="auth-actions">
          <button onClick={submit} disabled={loading} className="auth-button auth-button-primary">{loading ? "Signing in…" : "Enter"}</button>
          <button onClick={onBack} className="auth-button auth-button-secondary">Back</button>
        </div>
      </div>
    </div>
  );
}