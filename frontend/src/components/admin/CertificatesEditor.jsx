import React from "react";
import ListEditor from "./ListEditor";
import Field from "../common/Field";
import { c } from "../../utils/constants";

export default function CertificatesEditor({ items, onSaveItem, onRemoveItem }) {
  return (
    <ListEditor
      title="Certificates"
      items={items}
      onSaveItem={onSaveItem}
      onRemoveItem={onRemoveItem}
      empty={() => ({ id: null, title: "", org: "", date: "", url: "" })}
      renderForm={(f, setF) => (
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
          <Field label="Organization" value={f.org} onChange={(e) => setF({ ...f, org: e.target.value })} />
          <Field label="Date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
          <Field label="Credential URL" value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} />
        </div>
      )}
      renderRow={(cert) => (
        <div><span style={{ fontWeight: 500, color: c.text }}>{cert.title}</span> <span style={{ fontSize: 12, color: c.muted, marginLeft: 8 }}>{cert.org} · {cert.date}</span></div>
      )}
    />
  );
}