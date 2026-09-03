import React from "react";
import { Trash2 } from "lucide-react";
import Card from "../common/Card";
import { c, display, mono } from "../../utils/constants";

export default function MessagesView({ items, onDelete }) {
  const remove = async (id) => {
    if (onDelete) await onDelete(id);
  };

  return (
    <div>
      <h2 style={{ ...display, fontSize: 20, fontWeight: 600, color: c.text, marginBottom: 24 }}>Messages</h2>
      {items.length === 0 && <p style={{ color: c.muted, fontSize: 14 }}>No messages yet.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {[...items].reverse().map((m) => (
          <Card key={m.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 500, color: c.text }}>{m.name} <span style={{ fontSize: 12, color: c.muted }}>({m.email})</span></span>
              <button onClick={() => remove(m.id)} style={{ background: "transparent", border: "none", color: c.danger, cursor: "pointer" }}><Trash2 size={14} /></button>
            </div>
            {m.subject && <div style={{ ...mono, fontSize: 12, color: c.muted, marginTop: 4 }}>{m.subject}</div>}
            <p style={{ fontSize: 14, color: c.body, marginTop: 8 }}>{m.message}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}