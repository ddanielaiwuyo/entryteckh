import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }

        html, body {
          height: 100%;
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          background: #f8f9fa;
        }

        html.dark, html.dark body { background: #0a0a0a; }

        .thankyou-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          background: var(--bg-primary, #f8f9fa);
          text-align: center;
        }

        html.dark .thankyou-page { background: #0a0a0a; }

        .thankyou-icon {
          font-size: 72px;
          margin-bottom: 32px;
          animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes pop {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        .thankyou-heading {
          font-size: 52px;
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #0a0a0a;
          margin-bottom: 16px;
          line-height: 1.1;
        }

        html.dark .thankyou-heading { color: #fafafa; }

        .thankyou-sub {
          font-size: 20px;
          color: #525252;
          margin-bottom: 48px;
          line-height: 1.6;
        }

        html.dark .thankyou-sub { color: #a3a3a3; }

        .back-btn {
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          border: none;
          background: #ea580c;
          color: white;
          transition: all 0.2s;
          font-family: inherit;
        }

        html.dark .back-btn { background: #fb923c; }

        .back-btn:hover {
          background: #c2410c;
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(234, 88, 12, 0.25);
        }

        html.dark .back-btn:hover { background: #f97316; }
      `}</style>

      <div className="thankyou-page">
        <div className="thankyou-icon">🎉</div>
        <h1 className="thankyou-heading">Gracias amigos!</h1>
        <p className="thankyou-sub">We'll be in contact shortly.</p>
        <button className="back-btn" onClick={() => navigate('/')}>
          Back to home
        </button>
      </div>
    </div>
  );
}
