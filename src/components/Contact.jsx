import React from 'react';

export default function Contact({ mode, contact }) {
  const isHacker = mode === 'hacker';
  const { heading, subtext, email, github, linkedin } = contact;

  return (
    <section id="contact" className="section reveal show">
      <div className="container">
        <p 
          className="eyebrow" 
          data-hacker-label={isHacker ? "[ network handshake ]" : "[ connect handshake ]"}
        >
          Contact
        </p>
        <h2 
          className="glitch-text" 
          data-text={heading}
          style={{ textShadow: isHacker ? '0 0 13px rgba(0, 255, 65, 0.45)' : 'none' }}
        >
          {heading}
        </h2>
        <p className="contact-copy mt-2.5 text-[var(--muted)]">
          {subtext}
        </p>
        <div className="contact-links mt-5">
          <a 
            className="btn btn-secondary" 
            href={`mailto:${email}`}
            style={{ fontFamily: isHacker ? 'var(--mono)' : 'inherit' }}
          >
            Email Me
          </a>
          <a 
            className="btn btn-secondary" 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontFamily: isHacker ? 'var(--mono)' : 'inherit' }}
          >
            GitHub
          </a>
          <a 
            className="btn btn-secondary" 
            href={linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontFamily: isHacker ? 'var(--mono)' : 'inherit' }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
