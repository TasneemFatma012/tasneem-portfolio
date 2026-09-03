import React, { useCallback, useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import PublicSite from "./pages/PublicSite";
import AdminGate from "./components/admin/AdminGate";
import AdminDashboard from "./components/admin/AdminDashboard";
import { fetchSiteData } from "./api/resourceApi";
import { postMessage } from "./api/messageApi";
import { getStoredUser, setToken, setStoredUser } from "./utils/storage";
import { uid } from "./utils/transformers";
import { DEFAULTS, FONT_LINK, c, mono } from "./utils/constants";

export default function App() {
  const [data, setData] = useState(null);
  const [view, setView] = useState("site");
  const [authUser, setAuthUser] = useState(getStoredUser());

  useEffect(() => {
    if (!document.getElementById("pf-fonts")) {
      const l = document.createElement("link");
      l.id = "pf-fonts"; l.rel = "stylesheet"; l.href = FONT_LINK;
      document.head.appendChild(l);
    }

    fetchSiteData()
      .then(setData)
      .catch((err) => {
        console.error(err);
        setData({ profile: DEFAULTS.profile, skills: [], projects: [], education: [], certificates: [], experience: [], messages: [] });
      });
  }, []);

  const addMessage = useCallback(async (msg) => {
    try {
      const created = await postMessage(msg);
      setData((d) => ({
        ...d,
        messages: [...d.messages, { id: created?.id || uid(), ...msg, at: new Date().toISOString() }],
      }));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleLogin = (user) => {
    setAuthUser(user);
    setView("admin");
  };

  const handleLogout = () => {
    setAuthUser(null);
    setToken(null);
    setStoredUser(null);
    setView("site");
  };

  if (!data) {
    return (
      <div className="app-loading-screen">
        <div className="app-loading-mark" aria-label="Loading" role="status">
          <div className="app-loading-ring app-loading-ring--outer" />
          <div className="app-loading-ring app-loading-ring--inner" />
          <div className="app-loading-core" />
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setView(view === "site" ? "gate" : "site")}
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 50, padding: "8px 14px", borderRadius: 999, background: c.surface, border: `1px solid ${c.line}`, color: c.muted, ...mono, fontSize: 12, display: "flex", alignItems: "center", gap: 6, cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
      >
        {view === "site" ? <><Sparkles size={13} />/admin</> : <><X size={13} />site</>}
      </button>
      {view === "site" && <PublicSite data={data} addMessage={addMessage} />}
      {view === "gate" && <AdminGate onEnter={handleLogin} onBack={() => setView("site")} />}
      {view === "admin" && <AdminDashboard data={data} setData={setData} logout={handleLogout} />}
    </div>
  );
}