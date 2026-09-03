import React, { useState } from "react";
import { Check } from "lucide-react";
import Field from "../common/Field";
import { c, display, mono, inputStyle, btnPrimary } from "../../utils/constants";

export default function ProfileEditor({ profile, onSave }) {
  const [f, setF] = useState(profile);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));

  return (
    <div>
      <h2 style={{ ...display, fontSize: 20, fontWeight: 600, color: c.text, marginBottom: 24 }}>Profile</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" value={f.name} onChange={set("name")} />
        <Field label="Title" value={f.title} onChange={set("title")} />
        <Field label="GitHub username" value={f.github} onChange={set("github")} />
        <Field label="Email" value={f.email} onChange={set("email")} />
        <Field label="Phone (optional)" value={f.phone} onChange={set("phone")} />
        <Field label="Location (optional)" value={f.location} onChange={set("location")} />
        <Field label="Resume URL" value={f.resumeUrl} onChange={set("resumeUrl")} />
        <Field label="LinkedIn URL" value={f.linkedin} onChange={set("linkedin")} />
      </div>
      <label style={{ display: "block", ...mono, fontSize: 12, color: c.muted, marginTop: 16, marginBottom: 4 }}>
        Tagline
        <textarea value={f.tagline} onChange={set("tagline")} rows={2} style={{ ...inputStyle, marginTop: 4, fontFamily: "Inter, sans-serif", resize: "none" }} />
      </label>
      <label style={{ display: "block", ...mono, fontSize: 12, color: c.muted, marginTop: 16, marginBottom: 4 }}>
        About
        <textarea value={f.about} onChange={set("about")} rows={4} style={{ ...inputStyle, marginTop: 4, fontFamily: "Inter, sans-serif", resize: "none" }} />
      </label>
      <button onClick={() => onSave(f)} style={{ ...btnPrimary, marginTop: 20 }}><Check size={15} />Save profile</button>
    </div>
  );
}