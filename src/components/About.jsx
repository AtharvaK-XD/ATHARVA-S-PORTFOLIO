import React from 'react';
import profileImg from '../assets/profile.jpg';
import profileDevImg from '../assets/profile_dev.png';
import profileHackerImg from '../assets/profile_hacker.png';

export default function About({ mode, text, contact }) {
  const isHacker = mode === 'hacker';
  const { email, github, linkedin, tryhackme } = contact;

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
          <div className="profile-panel terminal-window zoom-card">
            <div className="terminal-top">
              <span></span><span></span><span></span>
              <p className="font-mono">{isHacker ? "face_scan.bin" : "profile.jpg"}</p>
            </div>
            <p className="profile-hint">
              {isHacker ? "hover_it_too_see" : "hover it too see"}
            </p>
            <div className="profile-img-wrap">
              <img 
                src={profileImg} 
                alt="Atharva Kulkarni" 
                className="profile-img profile-img-hover" 
              />
              <img 
                src={isHacker ? profileHackerImg : profileDevImg} 
                alt="Atharva Kulkarni Matrix" 
                className="profile-img profile-img-default" 
              />
            </div>
          </div>

          <p className="about-text text-[var(--muted)] leading-relaxed zoom-card">
            {text}
          </p>

          <aside className="info-panel terminal-window zoom-card">
            <div className="terminal-top">
              <span></span><span></span><span></span>
              <p className="font-mono">identity-dossier.sec</p>
            </div>
            <p className="panel-title">Contact / Identity Panel</p>
            
            <div className="flex flex-col gap-2 mt-3">
              <a 
                className="btn btn-secondary text-sm w-full" 
                href={`mailto:${email}`}
                style={{ fontFamily: isHacker ? 'var(--mono)' : 'inherit' }}
              >
                Email Me
              </a>
              
              <a 
                className="btn btn-secondary text-sm w-full" 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontFamily: isHacker ? 'var(--mono)' : 'inherit' }}
              >
                GitHub
              </a>
              
              <a 
                className="btn btn-secondary text-sm w-full" 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ fontFamily: isHacker ? 'var(--mono)' : 'inherit' }}
              >
                LinkedIn
              </a>
              {tryhackme && (
                <a 
                  className="btn btn-secondary text-sm w-full" 
                  href={tryhackme} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ fontFamily: isHacker ? 'var(--mono)' : 'inherit' }}
                >
                  TryHackMe
                </a>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
