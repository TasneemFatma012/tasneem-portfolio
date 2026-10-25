import React, { useEffect } from "react";
import PublicSite from "./pages/PublicSite";
import { DEFAULTS, FONT_LINK } from "./utils/constants";

export default function App() {
  useEffect(() => {
    if (!document.getElementById("pf-fonts")) {
      const l = document.createElement("link");
      l.id = "pf-fonts"; l.rel = "stylesheet"; l.href = FONT_LINK;
      document.head.appendChild(l);
    }
  }, []);

  return <PublicSite data={DEFAULTS} />;
}