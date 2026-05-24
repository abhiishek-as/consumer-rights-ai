"use client";
import { useState } from "react";

const categories = [
  "E-commerce (Amazon, Flipkart, Meesho)",
  "Banking & Finance",
  "Insurance",
  "Real Estate / Builder",
  "Healthcare / Hospital",
  "Telecom (Jio, Airtel, BSNL)",
  "Food & Restaurant",
  "Education / Coaching",
  "Employment / Salary",
  "Government Service",
  "Other",
];

export default function Home() {
  const [problem, setProblem] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!problem || !category) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem, category }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError("Something went wrong. Try again.");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #f0f4f8;
          min-height: 100vh;
        }

        .navbar {
          background: #0a1628;
          padding: 0 2rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #1e3a5f;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-logo {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #1a6fc4, #2dd4bf);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .nav-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: -0.3px;
        }

        .nav-tagline {
          font-size: 12px;
          color: #6b8cae;
          font-weight: 300;
          letter-spacing: 0.5px;
        }

        .nav-badge {
          font-size: 11px;
          background: rgba(45, 212, 191, 0.15);
          color: #2dd4bf;
          border: 1px solid rgba(45, 212, 191, 0.3);
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 500;
        }

        .hero {
          background: linear-gradient(135deg, #0a1628 0%, #0d2347 60%, #0a3d62 100%);
          padding: 4rem 2rem 5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at 60% 40%, rgba(26,111,196,0.15) 0%, transparent 60%);
          pointer-events: none;
        }

        .hero-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          color: #2dd4bf;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          color: #ffffff;
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 1.25rem;
          letter-spacing: -1px;
        }

        .hero-title span {
          color: #2dd4bf;
        }

        .hero-sub {
          font-size: 16px;
          color: #8aadc4;
          font-weight: 300;
          max-width: 520px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .stat {
          text-align: center;
        }

        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          color: #ffffff;
          font-weight: 700;
        }

        .stat-label {
          font-size: 11px;
          color: #6b8cae;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 2px;
        }

        .main {
          max-width: 720px;
          margin: -2rem auto 4rem;
          padding: 0 1.5rem;
          position: relative;
          z-index: 10;
        }

        .card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #dde6f0;
          padding: 2rem;
          box-shadow: 0 4px 24px rgba(10,22,40,0.08);
          margin-bottom: 1.5rem;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          color: #0a1628;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #3d5a78;
          margin-bottom: 6px;
          letter-spacing: 0.3px;
        }

        select, textarea {
          width: 100%;
          border: 1.5px solid #d0dce8;
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #0a1628;
          background: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          margin-bottom: 1.25rem;
        }

        select:focus, textarea:focus {
          border-color: #1a6fc4;
          box-shadow: 0 0 0 3px rgba(26,111,196,0.1);
          background: #ffffff;
        }

        textarea { resize: none; line-height: 1.6; }

        .error {
          color: #c0392b;
          font-size: 13px;
          margin-bottom: 1rem;
          padding: 10px 14px;
          background: #fdf2f2;
          border-radius: 8px;
          border: 1px solid #f5c6c6;
        }

        .btn {
          width: 100%;
          background: linear-gradient(135deg, #0d2347, #1a6fc4);
          color: #ffffff;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-size: 15px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: opacity 0.2s, transform 0.1s;
          position: relative;
          overflow: hidden;
        }

        .btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
        .btn:active:not(:disabled) { transform: translateY(0); }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .loading-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 3px;
          background: rgba(255,255,255,0.4);
          animation: loadbar 1.5s ease-in-out infinite;
          border-radius: 2px;
        }

        @keyframes loadbar {
          0% { width: 0; left: 0; }
          50% { width: 60%; left: 20%; }
          100% { width: 0; left: 100%; }
        }

        .result-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eef2f7;
        }

        .severity-badge {
          font-size: 12px;
          font-weight: 500;
          padding: 5px 14px;
          border-radius: 20px;
        }

        .severity-high { background: #fef2f2; color: #c0392b; border: 1px solid #fecaca; }
        .severity-medium { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
        .severity-low { background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; }

        .field-label {
          font-size: 11px;
          font-weight: 500;
          color: #6b8cae;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 6px;
        }

        .field-value {
          font-size: 14px;
          color: #0a1628;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .divider {
          height: 1px;
          background: #eef2f7;
          margin: 1.25rem 0;
        }

        .steps-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 1.25rem;
        }

        .step-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .step-num {
          min-width: 24px;
          height: 24px;
          background: #0d2347;
          color: #ffffff;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .step-text {
          font-size: 14px;
          color: #2d4a6b;
          line-height: 1.6;
        }

        .portal-box {
          background: linear-gradient(135deg, #f0f7ff, #e8f4fd);
          border: 1px solid #b8d9f5;
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.25rem;
        }

        .portal-name {
          font-size: 15px;
          font-weight: 500;
          color: #0a1628;
          margin-bottom: 4px;
        }

        .portal-url {
          font-size: 13px;
          color: #1a6fc4;
          margin-bottom: 6px;
          word-break: break-all;
        }

        .portal-timeline {
          font-size: 12px;
          color: #6b8cae;
        }

        .letter-box {
          background: #f8fafc;
          border: 1px solid #dde6f0;
          border-radius: 12px;
          padding: 1.25rem;
          font-size: 13px;
          color: #2d4a6b;
          white-space: pre-wrap;
          line-height: 1.8;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 0.75rem;
        }

        .copy-btn {
          background: none;
          border: 1.5px solid #1a6fc4;
          color: #1a6fc4;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .copy-btn:hover {
          background: #1a6fc4;
          color: #ffffff;
        }

        .footer {
          text-align: center;
          padding: 2rem;
          font-size: 12px;
          color: #8aadc4;
        }

        .disclaimer {
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 10px;
          padding: 12px 16px;
          font-size: 12px;
          color: #92400e;
          margin-bottom: 1.25rem;
          line-height: 1.6;
        }
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-logo">⚖️</div>
          <div>
            <div className="nav-name">FairStand</div>
            <div className="nav-tagline">Your Consumer Rights Companion</div>
          </div>
        </div>
        <div className="nav-badge">Free to Use</div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="hero-eyebrow">Know Your Rights</div>
        <h1 className="hero-title">
          Did You Get <span>Cheated?</span>
        </h1>
        <p className="hero-sub">
          Describe what happened. We identify your legal rights, the exact authority to approach, and generate a ready-to-send complaint letter — instantly.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">11+</div>
            <div className="stat-label">Categories Covered</div>
          </div>
          <div className="stat">
            <div className="stat-num">2019</div>
            <div className="stat-label">Consumer Protection Act</div>
          </div>
          <div className="stat">
            <div className="stat-num">Free</div>
            <div className="stat-label">Always</div>
          </div>
        </div>
      </div>
      {/* How it works */}
<div style={{background: '#ffffff', padding: '3rem 2rem', borderBottom: '1px solid #dde6f0'}}>
  <div style={{maxWidth: '720px', margin: '0 auto', textAlign: 'center'}}>
    <div className="hero-eyebrow" style={{color: '#1a6fc4', marginBottom: '0.5rem'}}>Simple Process</div>
    <h2 style={{fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#0a1628', marginBottom: '2.5rem', fontWeight: 600}}>How FairStand Works</h2>
    <div style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '-2rem'}}>
      <div style={{flex: 1, minWidth: '180px', maxWidth: '200px'}}>
        <div style={{fontSize: '20px', fontWeight: 700, color: '#1a6fc4', fontFamily: 'Playfair Display, serif', margin: '0 auto 1rem'}}>1. Describe</div>
        
        <div style={{fontSize: '13px', color: '#6b8cae', lineHeight: 1.6}}>Tell us what happened in plain language. No legal knowledge needed.</div>
      </div>
      <div style={{flex: 1, minWidth: '180px', maxWidth: '200px'}}>
        <div style={{fontSize: '20px', fontWeight: 700, color: '#1a6fc4', fontFamily: 'Playfair Display, serif', margin: '0 auto 1rem'}}>2. Analyze</div>
        
        <div style={{fontSize: '13px', color: '#6b8cae', lineHeight: 1.6}}>AI identifies the violation, the law that protects you, and severity of your case.</div>
      </div>
      <div style={{flex: 1, minWidth: '180px', maxWidth: '200px'}}>
        <div style={{fontSize: '20px', fontWeight: 700, color: '#1a6fc4', fontFamily: 'Playfair Display, serif', margin: '0 auto 1rem'}}>3. Act</div>
        
        <div style={{fontSize: '13px', color: '#6b8cae', lineHeight: 1.6}}>Get exact steps, the right portal to complain on, and a ready-to-send letter.</div>
      </div>
    </div>
  </div>
</div>

      {/* Main */}
      <div className="main">

        {/* Form Card */}
        <div className="card">
          <div className="card-title">Analyze Your Case</div>

          <label>What category is your problem?</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category...</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label>Describe what happened</label>
          <textarea
            rows={5}
            placeholder="e.g. I ordered a phone on Flipkart for 18,000 rupees. It arrived damaged and they refused to accept the return..."
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />

          {error && <div className="error">{error}</div>}

          <button className="btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                Analyzing your case...
                <div className="loading-bar" />
              </>
            ) : (
              "Analyze My Case →"
            )}
          </button>
        </div>

        {/* Result Card */}
        {result && (
          <div className="card">
            <div className="result-header">
              <div className="card-title" style={{margin:0}}>Your Case Analysis</div>
              <span className={`severity-badge ${
                result.severity === "High" ? "severity-high" :
                result.severity === "Medium" ? "severity-medium" :
                "severity-low"
              }`}>
                {result.severity} Severity
              </span>
            </div>

            <div className="disclaimer">
              This analysis is for informational purposes only and does not constitute legal advice. Consult a qualified lawyer for serious matters.
            </div>

            <div className="field-label">Violation Identified</div>
            <div className="field-value" style={{fontWeight: 500}}>{result.violation}</div>

            <div className="divider" />

            <div className="field-label">Law That Protects You</div>
            <div className="field-value">{result.law}</div>

            <div className="divider" />

            <div className="field-label">Immediate Steps to Take</div>
            <ul className="steps-list">
              {result.immediate_steps.map((step, i) => (
                <li key={i} className="step-item">
                  <div className="step-num">{i + 1}</div>
                  <div className="step-text">{step}</div>
                </li>
              ))}
            </ul>

            <div className="divider" />

            <div className="field-label">Where to File Your Complaint</div>
            <div className="portal-box">
              <div className="portal-name">{result.portal.name}</div>
              <a className="portal-url" href={result.portal.url} target="_blank" rel="noopener noreferrer">{result.portal.url}</a>
              <div className="portal-timeline">Expected resolution: {result.portal.timeline}</div>
            </div>

            <div className="field-label">Ready-to-Send Complaint Letter</div>
            <div className="letter-box">{result.complaint_letter}</div>
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(result.complaint_letter)}
            >
              Copy Letter
            </button>
            <button
              className="copy-btn"
              style={{marginLeft: '10px'}}
              onClick={() => {
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`
                  <html>
                    <head>
                      <title>FairStand Case Analysis</title>
                      <style>
                        body { font-family: Georgia, serif; max-width: 700px; margin: 40px auto; color: #1a1a2e; line-height: 1.7; }
                        h1 { font-size: 24px; color: #0d2347; border-bottom: 2px solid #1a6fc4; padding-bottom: 10px; }
                        h2 { font-size: 14px; color: #1a6fc4; text-transform: uppercase; letter-spacing: 1.5px; margin-top: 24px; margin-bottom: 6px; }
                        p { font-size: 14px; margin: 0 0 8px; }
                        .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; background: #fef2f2; color: #c0392b; }
                        .steps { padding-left: 20px; }
                        .steps li { font-size: 14px; margin-bottom: 6px; }
                        .letter { background: #f8fafc; border: 1px solid #dde6f0; border-radius: 8px; padding: 20px; font-size: 13px; white-space: pre-wrap; margin-top: 8px; }
                        .footer { margin-top: 40px; font-size: 11px; color: #8aadc4; text-align: center; border-top: 1px solid #eef2f7; padding-top: 12px; }
                      </style>
                    </head>
                    <body>
                      <h1>FairStand — Consumer Rights Case Analysis</h1>
                      <h2>Violation Identified</h2>
                      <p>${result.violation}</p>
                      <h2>Law That Protects You</h2>
                      <p>${result.law}</p>
                      <h2>Severity</h2>
                      <p><span class="badge">${result.severity} Severity</span></p>
                      <h2>Immediate Steps to Take</h2>
                      <ol class="steps">
                        ${result.immediate_steps.map(step => `<li>${step}</li>`).join('')}
                      </ol>
                      <h2>Where to File Your Complaint</h2>
                      <p><strong>${result.portal.name}</strong><br/>${result.portal.url}<br/>Expected resolution: ${result.portal.timeline}</p>
                      <h2>Ready-to-Send Complaint Letter</h2>
                      <div class="letter">${result.complaint_letter}</div>
                      <div class="footer">Generated by FairStand — https://consumer-rights-ai-846w.vercel.app</div>
                    </body>
                  </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
              }}
            >
              Download Full Report
            </button>

          </div>
        )}

      </div>

      <div className="footer">
        Built with Next.js and Groq AI — FairStand helps every Indian know their rights.
      </div>
    </>
  );
}