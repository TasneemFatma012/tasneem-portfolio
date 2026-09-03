import React from "react";
import ListEditor from "./ListEditor";
import Field from "../common/Field";
import { c, mono } from "../../utils/constants";

export default function EducationEditor({ items, onSaveItem, onRemoveItem }) {
  return (
    <ListEditor
      title="Education"
      items={items}
      onSaveItem={onSaveItem}
      onRemoveItem={onRemoveItem}
      empty={() => ({ id: null, years: "", degree: "", school: "" })}
      renderForm={(f, setF) => (
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="Years" value={f.years} onChange={(e) => setF({ ...f, years: e.target.value })} />
          <Field label="Degree" value={f.degree} onChange={(e) => setF({ ...f, degree: e.target.value })} />
          <Field label="School" value={f.school} onChange={(e) => setF({ ...f, school: e.target.value })} />
        </div>
      )}
      renderRow={(e) => (
        <div>
          <span style={{ ...mono, fontSize: 12, color: c.teal }}>{e.years}</span>{" "}
          <span style={{ fontWeight: 500, color: c.text, marginLeft: 8 }}>{e.degree}</span>{" "}
          <span style={{ fontSize: 12, color: c.muted, marginLeft: 8 }}>{e.school}</span>
        </div>
      )}
    />
  );
}