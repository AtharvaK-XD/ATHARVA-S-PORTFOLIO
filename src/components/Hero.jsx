import React from 'react';

export default function Hero({ mode, data, glitchActive }) {
  const { title, subtitle, description, cta, stats } = data;
  const isHacker = mode === 'hacker';

  return (
    <section id="hero" className="section hero reveal show">
      <div className="container hero-grid">
        <div className="hero-copy terminal-window">
          <div className="terminal-top">
            <span></span><span></span><span></span>
            <p className="font-mono">{isHacker ? "root@atharva:~$" : "atharva-profile.exe"}</p>
          </div>
          <p 
            className="eyebrow" 
            data-hacker-label={isHacker ? "[ intrusion dossier ]" : "[ public profile ]"}
          >
            {isHacker ? "Dossier" : "Welcome"}
          </p>
          
          <h1 
            className={`glitch-text ${glitchActive ? 'glitch-jitter' : ''}`} 
            data-text={title}
            style={{
              fontFamily: isHacker ? 'var(--mono)' : 'inherit',
              textShadow: isHacker ? '0 0 13px rgba(0, 255, 65, 0.45)' : 'none'
            }}
          >
            {title}
          </h1>
          
          <p 
            className="subtitle"
            style={{
              fontFamily: isHacker ? 'var(--mono)' : 'inherit'
            }}
          >
            {subtitle}
          </p>
          
          <p className="intro">
            {description}
          </p>
          
          <div className="cta-row">
            {cta.map((button) => (
              <a 
                key={button.label} 
                className="btn btn-secondary" 
                href={button.href}
                style={{
                  fontFamily: isHacker ? 'var(--mono)' : 'inherit'
                }}
              >
                {button.label}
              </a>
            ))}
          </div>
        </div>

        <aside className="hero-panel terminal-window" aria-label="Quick profile stats">
          <div className="terminal-top">
            <span></span><span></span><span></span>
            <p className="font-mono">system-metrics.log</p>
          </div>
          <p 
            className="panel-title"
            style={{
              fontFamily: isHacker ? 'var(--mono)' : 'inherit'
            }}
          >
            Snapshot
          </p>
          <div className="stat-grid">
            {stats.map((stat) => (
              <article key={stat.label}>
                <p 
                  className="stat-value text-xl font-extrabold"
                  style={{
                    color: 'var(--accent)',
                    fontFamily: isHacker ? 'var(--mono)' : 'inherit'
                  }}
                >
                  {stat.value}
                </p>
                <p className="stat-label text-xs mt-1">
                  {stat.label}
                </p>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
