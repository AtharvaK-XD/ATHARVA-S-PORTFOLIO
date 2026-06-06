import React from 'react';

function ProjectCard({ project, mode }) {
  const isHacker = mode === 'hacker';
  
  return (
    <a 
      className="project-card-wrapper"
      href={project.url}
      target={project.url === '#' ? undefined : "_blank"}
      rel={project.url === '#' ? undefined : "noopener noreferrer"}
    >
      <div className="project-card-inner">
        {/* FRONT FACE */}
        <div 
          className="project-card-front"
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
          
          {project.image && (
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-[var(--border)] mb-4 mt-2 bg-[var(--surface-strong)]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>
          )}

          <h3 className="font-bold text-lg" style={{ textShadow: isHacker ? '0 0 10px rgba(0, 255, 65, 0.35)' : 'none' }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed mt-2.5 flex-grow">{project.description}</p>
          
          <div className="mt-auto pt-4">
            <span className="card-btn">Open Project</span>
          </div>
        </div>

        {/* BACK FACE */}
        <div 
          className="project-card-back"
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
          <p className="project-tag">Project {project.id} / Details</p>

          <h3 className="font-bold text-lg mt-4" style={{ textShadow: isHacker ? '0 0 10px rgba(0, 255, 65, 0.35)' : 'none' }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed mt-4 flex-grow text-[var(--muted)]">
            {project.detailedDescription || project.description}
          </p>
          
          <div className="mt-auto pt-4">
            <span className="card-btn">Open Project</span>
          </div>
        </div>
      </div>
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
