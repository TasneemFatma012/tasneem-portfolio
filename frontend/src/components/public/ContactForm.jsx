import React, { useState } from "react";
import { Send } from "lucide-react";
import Card from "../common/Card";
import { c, inputStyle, btnPrimary, mono } from "../../utils/constants";

export default function ContactForm({ onSend }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    await onSend(form);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <Card>
      <div className="grid sm:grid-cols-2 gap-3">
        <input value={form.name} onChange={set("name")} placeholder="Name" style={inputStyle} />
        <input value={form.email} onChange={set("email")} placeholder="Email" style={inputStyle} />
      </div>
      <input value={form.subject} onChange={set("subject")} placeholder="Subject" style={{ ...inputStyle, marginTop: 12 }} />
      <textarea value={form.message} onChange={set("message")} placeholder="Message" rows={4} style={{ ...inputStyle, marginTop: 12, resize: "none" }} />
      <button onClick={submit} style={{ ...btnPrimary, marginTop: 16 }}><Send size={14} /> Send message</button>
      {sent && <p style={{ ...mono, color: c.teal, fontSize: 12, marginTop: 8 }}>✓ message sent</p>}
    </Card>
  );
}