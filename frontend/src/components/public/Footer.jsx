import React from "react";
import { c, mono } from "../../utils/constants";

export default function Footer({ name }) {
  return (
    <footer style={{ ...mono, textAlign: "center", padding: "40px 0", fontSize: 12, color: c.mutedSoft, borderTop: `1px solid ${c.lineSoft}` }}>
      © {new Date().getFullYear()} {name} — Built, deployed & continuously improved.
    </footer>
  );
}