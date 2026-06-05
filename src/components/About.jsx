import React from 'react';

export default function About({ mode, text, contact }) {
  const isHacker = mode === 'hacker';
  const { email, github, linkedin } = contact;

  return (
    <section id="about" className="section reveal show">
      <div className="container">
        <p 
          className="eyebrow" 
          data-hacker-label={isHacker ? "[ operator credentials ]" : "[ operator briefing ]"}
        >
          {isHacker ? "Credentials" : "About"}
        </p>
        <h2 style={{ textShadow: isHacker ? '0 0 13px rgba(0, 255, 65, 0.45)' : 'none' }}>
          About Me
        </h2>
        <div className="about-grid">
          <p className="about-text text-[var(--muted)] leading-relaxed">
            {text}
          </p>
          <aside className="info-panel terminal-window">
            <div class="terminal-top">
              <span></span><span></span><span></span>
              <p className="font-mono">identity-dossier.sec</p>
            </div>
            <p className="panel-title">Contact / Identity Panel</p>
            
            <a className="info-link text-sm" href={`mailto:${email}`}>
              Email: {email}
            </a>
            
            <a 
              className="info-link text-sm" 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub: AtharvaK-XD
            </a>
            
            <a 
              className="info-link text-sm" 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              LinkedIn: atharva-kulkarni-a16a5a3b9
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
