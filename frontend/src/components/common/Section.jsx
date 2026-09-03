import React from "react";
import Rail from "./Rail";

export default function Section({ id, label, commit, children }) {
  return (
    <section id={id} className="section">
      <Rail />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 mb-8 flex-wrap">
          <h2 className="section-title">{label}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}