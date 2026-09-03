import React from "react";

export default function Field({ label, ...props }) {
  return (
    <label className="field-label">
      {label}
      <input {...props} className="input auth-input" style={{ marginTop: 4, fontFamily: "Inter, sans-serif" }} />
    </label>
  );
}