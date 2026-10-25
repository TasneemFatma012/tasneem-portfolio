import React, { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Github, Code2, Users, UserRound, FileCode2 } from "lucide-react";
import Section from "../common/Section";
import Card from "../common/Card";

async function fetchGithub(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed (${response.status}).`);
  }

  return response.json();
}

function useGithub(username) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    setStatus("loading");
    Promise.all([
      fetchGithub(`/users/${encodeURIComponent(username)}`),
      fetchGithub(`/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`),
    ]).then(([u, r]) => {
      if (cancelled) return;
      setUser({
        login: u.login,
        avatarUrl: u.avatar_url,
        profileUrl: u.html_url,
        publicRepos: u.public_repos,
        followers: u.followers,
        following: u.following,
        publicGists: u.public_gists,
      });
      setRepos(Array.isArray(r) ? r
        .filter((repo) => !repo.name.toLowerCase().includes("trustpay"))
        .map((repo) => ({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        })) : []);
      setStatus("done");
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
        <div className="github-repo-intro">
          <div className="github-repo-intro-mark"><Github size={21} /></div>
          <div className="github-repo-intro-copy">
            <span>Open-source activity</span>
            <p>Explore recent work, experiments, and projects from GitHub.</p>
          </div>
          <a className="github-profile-link" href={`https://github.com/${encodeURIComponent(username)}`} target="_blank" rel="noreferrer">
            View profile <ExternalLink size={14} />
          </a>
        </div>

        {status === "loading" && (
          <p className="github-status-text" role="status">Fetching repositories…</p>
        )}
        {status === "error" && (
          <p className="github-status-text" role="status">Couldn't reach GitHub right now. Please try again later.</p>
        )}
        {status === "done" && repos.length === 0 && (
          <p className="github-status-text">No public repositories found for "{username}".</p>
        )}
        <div className="github-repo-grid">
          {repos.map((r) => (
            <Card key={r.url} className="github-repo-card">
              <div className="github-repo-card-top">
                <span className="github-repo-icon"><Code2 size={17} /></span>
                <a href={r.url} target="_blank" rel="noreferrer" className="github-repo-external" aria-label={`Open ${r.name} on GitHub`}>
                  <ExternalLink size={15} />
                </a>
              </div>
              <a href={r.url} target="_blank" rel="noreferrer" className="github-repo-name">{r.name}</a>
              <p className="github-repo-description">{r.description || "No description provided."}</p>
              <div className="github-repo-meta">
                {r.language && <span className="github-language"><span />{r.language}</span>}
                <span><Star size={13} />{r.stars}</span>
                <span><GitFork size={13} />{r.forks}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="stats" label="GitHub Stats">
        {user ? (
          <>
            <div className="github-stats-profile">
              <img src={user.avatarUrl} alt="" className="github-stats-avatar" />
              <div className="github-stats-user">
                <span>Developer profile</span>
                <strong>@{user.login}</strong>
              </div>
              <a className="github-profile-link" href={user.profileUrl} target="_blank" rel="noreferrer">
                GitHub profile <ExternalLink size={14} />
              </a>
            </div>
            <div className="stats-grid">
              {[
                { label: "Public repositories", value: user.publicRepos, Icon: Code2 },
                { label: "Followers", value: user.followers, Icon: Users },
                { label: "Following", value: user.following, Icon: UserRound },
                { label: "Public gists", value: user.publicGists, Icon: FileCode2 },
              ].map(({ label, value, Icon }) => (
              <Card key={label} className="github-stat-card">
                <span className="github-stat-icon"><Icon size={17} /></span>
                <div className="github-stat-value">{value ?? "—"}</div>
                <div className="github-stat-label">{label}</div>
              </Card>
            ))}
            </div>
          </>
        ) : (
          <p className="github-status-text" role={status === "loading" ? "status" : undefined}>
            {status === "loading" ? "Fetching GitHub stats…" : "GitHub stats are unavailable right now."}
          </p>
        )}
      </Section>
    </>
  );
}