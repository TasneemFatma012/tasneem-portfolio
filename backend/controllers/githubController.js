const GITHUB_API = "https://api.github.com";

function authHeaders() {
  const headers = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

// GET /api/github/stats
async function getStats(req, res, next) {
  try {
    const username = req.query.username || process.env.GITHUB_USERNAME;
    if (!username) return res.status(400).json({ error: "No GitHub username configured." });

    const r = await fetch(`${GITHUB_API}/users/${username}`, { headers: authHeaders() });
    if (!r.ok) return res.status(r.status).json({ error: "GitHub user lookup failed." });
    const user = await r.json();

    res.json({
      login: user.login,
      avatarUrl: user.avatar_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      publicGists: user.public_gists,
      profileUrl: user.html_url,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/github/repos
async function getRepos(req, res, next) {
  try {
    const username = req.query.username || process.env.GITHUB_USERNAME;
    if (!username) return res.status(400).json({ error: "No GitHub username configured." });

    const perPage = Math.min(Number(req.query.per_page) || 6, 30);
    const r = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=${perPage}`,
      { headers: authHeaders() }
    );
    if (!r.ok) return res.status(r.status).json({ error: "GitHub repo lookup failed." });
    const repos = await r.json();

    res.json(
      repos.map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
      }))
    );
  } catch (err) {
    next(err);
  }
}

module.exports = { getStats, getRepos };
