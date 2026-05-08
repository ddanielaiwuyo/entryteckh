import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Portfolio() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        navigate('/thank-you');
      } else {
        setFormError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
      }
    } catch {
      setFormError('Could not reach the server. Please try again later.');
      setSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          transition: background 0.3s ease, color 0.3s ease;
        }

        body {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 32px; }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 0;
          border-bottom: 1px solid var(--border);
        }

        .nav-left { display: flex; gap: 48px; align-items: center; }

        .logo { font-size: 17px; font-weight: 700; letter-spacing: -0.02em; color: var(--text-primary); }

        .nav-links { display: flex; gap: 32px; }

        .nav-link {
          font-size: 15px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
          font-weight: 500;
        }
        .nav-link:hover { color: var(--text-primary); }

        .theme-toggle {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 10px 18px;
          font-size: 14px;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }
        .theme-toggle:hover { background: var(--bg-secondary); }

        .hero { padding: 140px 0 100px; max-width: 900px; }

        h1 {
          font-size: 64px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin-bottom: 28px;
          color: var(--text-primary);
        }

        .subtitle {
          font-size: 22px;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 48px;
          font-weight: 400;
        }

        .cta-group { display: flex; gap: 16px; flex-wrap: wrap; }

        .btn {
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
          border: none;
        }

        .btn-primary { background: var(--accent); color: white; }
        .btn-primary:hover {
          background: var(--accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(234, 88, 12, 0.2);
        }
        .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        .btn-secondary {
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }
        .btn-secondary:hover { background: var(--bg-tertiary); transform: translateY(-2px); }

        .stats {
          padding: 60px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 48px;
        }

        .stat-item { text-align: center; }

        .stat-number {
          font-size: 48px;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .stat-label { font-size: 16px; color: var(--text-secondary); font-weight: 500; }

        .services { padding: 120px 0; }

        .section-header { margin-bottom: 64px; }

        .section-tag {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent);
          margin-bottom: 16px;
          font-weight: 700;
        }

        .section-title {
          font-size: 42px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }

        .section-description {
          font-size: 19px;
          color: var(--text-secondary);
          max-width: 700px;
          line-height: 1.6;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
        }

        .service-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 40px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--accent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .service-card:hover::before { transform: scaleX(1); }
        .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px var(--shadow); }

        .service-icon { font-size: 40px; margin-bottom: 24px; display: block; }

        .service-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .service-description {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .service-features { list-style: none; padding: 0; }
        .service-features li {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
        }
        .service-features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-weight: 700;
        }

        .process { padding: 100px 0; background: var(--bg-tertiary); }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-top: 48px;
        }

        .step-number {
          font-size: 14px;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }

        .step-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .step-description { font-size: 15px; color: var(--text-secondary); line-height: 1.6; }

        .contact { padding: 120px 0; }

        .contact-wrapper {
          max-width: 700px;
          margin: 0 auto;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 64px;
          box-shadow: 0 20px 60px var(--shadow);
        }

        .contact h2 {
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .contact-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .form-group { margin-bottom: 28px; }

        label {
          display: block;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--text-primary);
        }

        input, textarea {
          width: 100%;
          padding: 16px 18px;
          font-size: 16px;
          font-family: inherit;
          background: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: all 0.2s;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.1);
        }

        html.dark input:focus, html.dark textarea:focus {
          box-shadow: 0 0 0 4px rgba(251, 146, 60, 0.1);
        }

        textarea { resize: vertical; min-height: 140px; }

        .form-status {
          margin-top: 20px;
          padding: 16px;
          background: #10b981;
          color: white;
          border-radius: 12px;
          font-size: 15px;
          text-align: center;
          font-weight: 600;
        }

        .form-error {
          margin-top: 20px;
          padding: 16px;
          background: #ef4444;
          color: white;
          border-radius: 12px;
          font-size: 15px;
          text-align: center;
          font-weight: 600;
        }

        footer {
          padding: 60px 0;
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .footer-content { max-width: 600px; margin: 0 auto; }

        .footer-text { color: var(--text-tertiary); font-size: 15px; margin-bottom: 24px; }

        .footer-links {
          display: flex;
          gap: 32px;
          justify-content: center;
          margin-bottom: 24px;
        }

        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--text-primary); }

        .copyright { color: var(--text-tertiary); font-size: 14px; }

        @media (max-width: 768px) {
          .container { padding: 0 20px; }
          h1 { font-size: 42px; }
          .subtitle { font-size: 18px; }
          .hero { padding: 100px 0 80px; }
          .service-grid { grid-template-columns: 1fr; }
          .contact-wrapper { padding: 40px 28px; }
          .nav-links { display: none; }
          .section-title { font-size: 32px; }
          .stats-grid { gap: 32px; }
        }
      `}</style>

      <div className="container">
        <nav>
          <div className="nav-left">
            <div className="logo">Daniels Micheal</div>
            <div className="nav-links">
              <Link to="/experience" className="nav-link">Experience</Link>
              <span className="nav-link" onClick={() => scrollToSection('services')}>Services</span>
              <span className="nav-link" onClick={() => scrollToSection('process')}>Process</span>
              <span className="nav-link" onClick={() => scrollToSection('contact')}>Contact</span>
            </div>
          </div>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>

        <section className="hero">
          <h1>Building digital presence that drives business growth</h1>
          <p className="subtitle">
            I partner with businesses to create professional websites, develop internal tools, and provide strategic consulting that transforms their online presence into a competitive advantage.
          </p>
          <div className="cta-group">
            <button className="btn btn-primary" onClick={() => scrollToSection('contact')}>Start a conversation</button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('services')}>Explore services</button>
          </div>
        </section>

        <section className="stats">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Client satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Fast</div>
              <div className="stat-label">Project delivery</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support available</div>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-header">
            <div className="section-tag">What I Offer</div>
            <h2 className="section-title">Services designed for your success</h2>
            <p className="section-description">
              From initial concept to launch and beyond, I provide comprehensive solutions tailored to your business needs.
            </p>
          </div>

          <div className="service-grid">
            <div className="service-card">
              <span className="service-icon">🌐</span>
              <h3 className="service-title">Website Development</h3>
              <p className="service-description">
                Custom-built websites that represent your brand professionally and convert visitors into customers.
              </p>
              <ul className="service-features">
                <li>Responsive design for all devices</li>
                <li>SEO optimization</li>
                <li>Fast loading speeds</li>
                <li>Modern, clean aesthetics</li>
              </ul>
            </div>

            <div className="service-card">
              <span className="service-icon">⚙️</span>
              <h3 className="service-title">Business Tools</h3>
              <p className="service-description">
                Custom internal systems that automate workflows, manage clients, and boost operational efficiency.
              </p>
              <ul className="service-features">
                <li>CRM and client management</li>
                <li>Workflow automation</li>
                <li>Data analytics dashboards</li>
                <li>Integration with existing tools</li>
              </ul>
            </div>

            <div className="service-card">
              <span className="service-icon">💡</span>
              <h3 className="service-title">Digital Consulting</h3>
              <p className="service-description">
                Strategic guidance to help you make informed decisions about your online presence and technology stack.
              </p>
              <ul className="service-features">
                <li>Digital strategy planning</li>
                <li>Technology recommendations</li>
                <li>Competitive analysis</li>
                <li>Growth optimization</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="process" id="process">
          <div className="container">
            <div className="section-header">
              <div className="section-tag">How It Works</div>
              <h2 className="section-title">A streamlined process</h2>
              <p className="section-description">
                From first contact to final delivery, I ensure every project runs smoothly and exceeds expectations.
              </p>
            </div>

            <div className="process-grid">
              <div className="process-step">
                <div className="step-number">STEP 01</div>
                <h3 className="step-title">Discovery</h3>
                <p className="step-description">We discuss your goals, challenges, and vision to understand exactly what you need.</p>
              </div>
              <div className="process-step">
                <div className="step-number">STEP 02</div>
                <h3 className="step-title">Strategy</h3>
                <p className="step-description">I create a detailed plan outlining the approach, timeline, and deliverables.</p>
              </div>
              <div className="process-step">
                <div className="step-number">STEP 03</div>
                <h3 className="step-title">Development</h3>
                <p className="step-description">Your project comes to life with regular updates and opportunities for feedback.</p>
              </div>
              <div className="process-step">
                <div className="step-number">STEP 04</div>
                <h3 className="step-title">Launch</h3>
                <p className="step-description">We deploy your solution and I provide training and ongoing support as needed.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-wrapper">
            <h2>Let's work together</h2>
            <p className="contact-subtitle">
              Ready to take your business online? Get in touch and let's discuss how I can help you achieve your goals.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
                {submitting ? 'Sending...' : 'Send message'}
              </button>

              {formError && <div className="form-error">{formError}</div>}
            </form>
          </div>
        </section>

        <footer>
          <div className="footer-content">
            <p className="footer-text">Building the future, one project at a time</p>
            <div className="footer-links">
              <a href="#services" className="footer-link">Services</a>
              <a href="#process" className="footer-link">Process</a>
              <a href="#contact" className="footer-link">Contact</a>
            </div>
            <p className="copyright">© 2025 Daniels Micheal. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
