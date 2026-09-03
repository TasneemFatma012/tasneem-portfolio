import React from "react";
import ListEditor from "./ListEditor";
import Field from "../common/Field";
import { c, mono, inputStyle } from "../../utils/constants";

export default function ExperienceEditor({ items, onSaveItem, onRemoveItem }) {
  return (
    <ListEditor
      title="Experience"
      items={items}
      onSaveItem={onSaveItem}
      onRemoveItem={onRemoveItem}
      empty={() => ({ id: null, company: "", position: "", duration: "", responsibilities: "" })}
      renderForm={(f, setF) => (
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Company" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} />
          <Field label="Position" value={f.position} onChange={(e) => setF({ ...f, position: e.target.value })} />
          <Field label="Duration" value={f.duration} onChange={(e) => setF({ ...f, duration: e.target.value })} />
          <label style={{ gridColumn: "1 / -1", display: "block", ...mono, fontSize: 12, color: c.muted }}>
            Responsibilities
            <textarea value={f.responsibilities} onChange={(e) => setF({ ...f, responsibilities: e.target.value })} rows={2} style={{ ...inputStyle, marginTop: 4, fontFamily: "Inter, sans-serif", resize: "none" }} />
          </label>
        </div>
      )}
      renderRow={(x) => (
        <div><span style={{ fontWeight: 500, color: c.text }}>{x.position}</span> <span style={{ fontSize: 12, color: c.muted, marginLeft: 8 }}>{x.company} · {x.duration}</span></div>
      )}
    />
  );
}