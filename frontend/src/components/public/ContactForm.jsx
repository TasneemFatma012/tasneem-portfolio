import React, { useState } from "react";
import { Send } from "lucide-react";
import Card from "../common/Card";
import { c, inputStyle, btnPrimary, mono } from "../../utils/constants";

export default function ContactForm({ email }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [emailReady, setEmailReady] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const subject = form.subject || `Portfolio message from ${form.name}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setEmailReady(true);
  };

  return (
    <Card>
      <form onSubmit={submit}>
        <div className="grid sm:grid-cols-2 gap-3">
          <input value={form.name} onChange={set("name")} placeholder="Name" aria-label="Name" autoComplete="name" required style={inputStyle} />
          <input value={form.email} onChange={set("email")} placeholder="Email" aria-label="Email" autoComplete="email" type="email" required style={inputStyle} />
        </div>
        <input value={form.subject} onChange={set("subject")} placeholder="Subject" aria-label="Subject" style={{ ...inputStyle, marginTop: 12 }} />
        <textarea value={form.message} onChange={set("message")} placeholder="Message" aria-label="Message" rows={4} required style={{ ...inputStyle, marginTop: 12, resize: "none" }} />
        <button type="submit" style={{ ...btnPrimary, marginTop: 16 }}><Send size={14} /> Send message</button>
      </form>
      {emailReady && <p role="status" style={{ ...mono, color: c.teal, fontSize: 12, marginTop: 8 }}>Your email app should open to finish sending your message.</p>}
    </Card>
  );
}