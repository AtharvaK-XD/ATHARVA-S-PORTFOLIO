import React from 'react';

function ProjectCard({ project, mode }) {
  const isHacker = mode === 'hacker';
  
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Tilt calculations
    const rotateY = ((x / rect.width) * 2 - 1) * 4;
    const rotateX = -(((y / rect.height) * 2 - 1) * 4);
    
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = '';
  };

  return (
    <a 
      className="project-card"
      href={project.url}
      target={project.url === '#' ? undefined : "_blank"}
      rel={project.url === '#' ? undefined : "noopener noreferrer"}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: isHacker ? 'inset 0 0 0 1px rgba(0, 255, 65, 0.2), 0 0 26px rgba(0, 255, 65, 0.14)' : 'var(--shadow)',
      }}
    >
      <p 
        className="node-state"
        style={{
          color: 'var(--accent-2)',
          borderColor: 'var(--border)'
        }}
      >
        {project.status}
      </p>
      <p className="project-tag">Project {project.id}</p>
      <h3 className="font-bold text-lg" style={{ textShadow: isHacker ? '0 0 10px rgba(0, 255, 65, 0.35)' : 'none' }}>
        {project.title}
      </h3>
      <p className="text-sm leading-relaxed mt-2.5">{project.description}</p>
      <span className="card-btn">Open Project</span>
    </a>
  );
}

export default function Projects({ mode, projects }) {
  const isHacker = mode === 'hacker';

  return (
    <section id="projects" className="section reveal show">
      <div className="container">
        <p 
          className="eyebrow" 
          data-hacker-label={isHacker ? "[ mission archives ]" : "[ build history ]"}
        >
          {isHacker ? "Archives" : "Projects"}
        </p>
        <h2 style={{ textShadow: isHacker ? '0 0 13px rgba(0, 255, 65, 0.45)' : 'none' }}>
          {isHacker ? "Secured Systems" : "Featured Projects"}
        </h2>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} mode={mode} />
          ))}
        </div>
      </div>
    </section>
  );
}
