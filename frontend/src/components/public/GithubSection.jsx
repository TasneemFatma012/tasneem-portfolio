import React, { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink } from "lucide-react";
import Section from "../common/Section";
import Card from "../common/Card";
import { apiFetch } from "../../api/apiFetch";
import { c, display, mono } from "../../utils/constants";

function useGithub(username) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    setStatus("loading");
    Promise.all([
      apiFetch("/api/github/stats", { params: { username } }).catch(() => null),
      apiFetch("/api/github/repos", { params: { username, per_page: 6 } }).catch(() => []),
    ]).then(([u, r]) => {
      if (cancelled) return;
      setUser(u); setRepos(Array.isArray(r) ? r : []); setStatus("done");
    }).catch(() => !cancelled && setStatus("error"));
    return () => { cancelled = true; };
  }, [username]);

  return { user, repos, status };
}

export default function GithubSection({ username }) {
  const { user, repos, status } = useGithub(username);

  return (
    <>
      <Section id="github" label="GitHub Repositories">
        {status === "loading" && <p style={{ ...mono, color: c.muted, fontSize: 14 }}>fetching repositories…</p>}
        {status === "error" && <p style={{ color: c.muted, fontSize: 14 }}>Couldn't reach GitHub right now.</p>}
        {status === "done" && repos.length === 0 && (
          <p style={{ color: c.muted, fontSize: 14 }}>No public repositories found for "{username}".</p>
        )}
        <div className="grid sm:grid-cols-2 gap-4">
          {repos.map((r) => (
            <Card key={r.url}>
              <div className="flex items-start justify-between gap-3">
                <a href={r.url} target="_blank" rel="noreferrer" style={{ ...display, color: c.textBright, fontWeight: 600, textDecoration: "none" }}>
                  {r.name}
                </a>
                <ExternalLink size={14} color={c.muted} style={{ flexShrink: 0, marginTop: 4 }} />
              </div>
              <p style={{ fontSize: 14, color: c.muted, marginTop: 8 }}>{r.description || "No description provided."}</p>
              <div style={{ ...mono, display: "flex", alignItems: "center", gap: 16, marginTop: 16, fontSize: 12, color: c.muted }}>
                {r.language && (
                  <span className="flex items-center gap-1">
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: c.blue, display: "inline-block" }} />
                    {r.language}
                  </span>
                )}
                <span className="flex items-center gap-1"><Star size={12} />{r.stars}</span>
                <span className="flex items-center gap-1"><GitFork size={12} />{r.forks}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="stats" label="GitHub Stats">
        {user ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["Repositories", user.publicRepos], ["Followers", user.followers], ["Following", user.following], ["Public Gists", user.publicGists]].map(([label, val]) => (
              <Card key={label} style={{ textAlign: "center" }}>
                <div style={{ ...display, fontSize: 30, fontWeight: 700, color: c.textBright }}>{val ?? "—"}</div>
                <div style={{ fontSize: 12, color: c.muted, marginTop: 4 }}>{label}</div>
              </Card>
            ))}
          </div>
        ) : (
          <p style={{ ...mono, color: c.muted, fontSize: 14 }}>stats unavailable</p>
        )}
      </Section>
    </>
  );
}