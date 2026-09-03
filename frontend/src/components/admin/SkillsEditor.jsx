import React from "react";
import ListEditor from "./ListEditor";
import Field from "../common/Field";
import { c } from "../../utils/constants";

export default function SkillsEditor({ items, onSaveItem, onRemoveItem }) {
  return (
    <ListEditor
      title="Skills"
      items={items}
      onSaveItem={onSaveItem}
      onRemoveItem={onRemoveItem}
      empty={() => ({ id: null, group: "", items: [] })}
      renderForm={(f, setF) => (
        <div style={{ display: "grid", gap: 12 }}>
          <Field label="Group name" value={f.group} onChange={(e) => setF({ ...f, group: e.target.value })} />
          <Field
            label="Skills (comma separated)"
            value={f.items.join(", ")}
            onChange={(e) => setF({ ...f, items: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          />
        </div>
      )}
      renderRow={(g) => (
        <div><span style={{ fontWeight: 500, color: c.text }}>{g.group}</span> <span style={{ fontSize: 12, color: c.muted, marginLeft: 8 }}>{g.items.join(" · ")}</span></div>
      )}
    />
  );
}