import React from 'react';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    name: 'jkvs',
    url: 'https://github.com/persona-mp3/jkvs',
    desc: 'A distributed key-value store built in Java — storage engine, replication, and client protocol from scratch.',
    lang: 'Java',
  },
  {
    name: 'mapreduce',
    url: 'https://github.com/persona-mp3/mapreduce',
    desc: 'MapReduce implementation — distributed batch processing from the ground up.',
    lang: 'Rust',
  },
  {
    name: 'wsl-prt',
    url: 'https://github.com/persona-mp3/wsl-prt',
    desc: 'Custom TCP protocol for sending files across virtual environments.',
    lang: 'Python',
  },
];

export default function Experience() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --bg-primary: #f8f9fa;
          --bg-secondary: #ffffff;
          --bg-tertiary: #f0f1f3;
          --text-primary: #0a0a0a;
          --text-secondary: #525252;
          --text-tertiary: #737373;
          --border: #e5e7eb;
          --accent: #ea580c;
          --accent-hover: #c2410c;
          --shadow: rgba(0, 0, 0, 0.04);
        }

        html.dark {
          --bg-primary: #0a0a0a;
          --bg-secondary: #171717;
          --bg-tertiary: #262626;
          --text-primary: #fafafa;
          --text-secondary: #a3a3a3;
          --text-tertiary: #737373;
          --border: #404040;
          --accent: #fb923c;
          --accent-hover: #f97316;
          --shadow: rgba(255, 255, 255, 0.03);
        }

        html, body {
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .exp-page { min-height: 100vh; }

        .exp-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 32px;
          border-bottom: 1px solid var(--border);
          max-width: 1200px;
          margin: 0 auto;
        }

        .exp-logo {
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          text-decoration: none;
        }

        .back-link {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }

        .back-link:hover { color: var(--text-primary); }

        .exp-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 32px 120px;
        }

        .exp-tag {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent);
          margin-bottom: 16px;
          font-weight: 700;
        }

        .exp-heading {
          font-size: 52px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          margin-bottom: 16px;
          line-height: 1.1;
        }

        .exp-sub {
          font-size: 19px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 72px;
          max-width: 640px;
        }

        .exp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        .role-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px;
        }

        .role-badge {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
          background: rgba(234, 88, 12, 0.08);
          border: 1px solid rgba(234, 88, 12, 0.2);
          border-radius: 20px;
          padding: 4px 12px;
          margin-bottom: 24px;
        }

        html.dark .role-badge {
          background: rgba(251, 146, 60, 0.1);
          border-color: rgba(251, 146, 60, 0.2);
        }

        .role-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .role-org {
          font-size: 16px;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 4px;
        }

        .role-location {
          font-size: 14px;
          color: var(--text-tertiary);
          margin-bottom: 24px;
        }

        .role-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 24px;
        }

        .role-desc {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .gh-side {}

        .gh-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .gh-label {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .gh-profile-link {
          font-size: 14px;
          font-weight: 600;
          color: var(--accent);
          text-decoration: none;
          transition: color 0.2s;
        }

        .gh-profile-link:hover { color: var(--accent-hover); }

        .gh-list { display: flex; flex-direction: column; gap: 12px; }

        .gh-card {
          display: block;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px 24px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .gh-card:hover {
          border-color: var(--accent);
          transform: translateX(4px);
        }

        .gh-card-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .gh-card-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 14px;
        }

        .gh-lang {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .gh-lang::before {
          content: '';
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .exp-nav { padding: 24px 20px; }
          .exp-body { padding: 60px 20px 80px; }
          .exp-heading { font-size: 36px; }
          .exp-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="exp-page">
        <nav className="exp-nav">
          <Link to="/" className="exp-logo">Daniels Micheal</Link>
          <Link to="/" className="back-link">← Back to home</Link>
        </nav>

        <div className="exp-body">
          <div className="exp-tag">Background</div>
          <h1 className="exp-heading">Experience & work</h1>
          <p className="exp-sub">
            Full-time engineer in the public sector, with a personal interest in distributed systems and low-level programming.
          </p>

          <div className="exp-grid">
            <div className="role-card">
              <div className="role-badge">Current role</div>
              <div className="role-title">Software Engineer</div>
              <div className="role-org">Government Agency</div>
              <div className="role-location">United Kingdom</div>
              <div className="role-divider" />
              <p className="role-desc">
                Building and maintaining software systems that serve the public sector. Work spans backend services, internal tooling, and systems reliability — with a focus on correctness and long-term maintainability.
              </p>
            </div>

            <div className="gh-side">
              <div className="gh-header">
                <span className="gh-label">Open source & projects</span>
                <a
                  href="https://github.com/persona-mp3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gh-profile-link"
                >
                  github.com/persona-mp3 →
                </a>
              </div>

              <div className="gh-list">
                {PROJECTS.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gh-card"
                  >
                    <div className="gh-card-name">{p.name}</div>
                    <div className="gh-card-desc">{p.desc}</div>
                    <div className="gh-lang">{p.lang}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
