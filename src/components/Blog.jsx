import React from 'react';

export default function Blog({ mode, blogs, emptyState }) {
  const isHacker = mode === 'hacker';

  return (
    <section id="blog" className="section reveal show">
      <div className="container">
        <p 
          className="eyebrow" 
          data-hacker-label={isHacker ? "[ decrypted intelligence ]" : "[ logs repository ]"}
        >
          {isHacker ? "Write-ups" : "Blog"}
        </p>
        <h2 style={{ textShadow: isHacker ? '0 0 13px rgba(0, 255, 65, 0.45)' : 'none' }}>
          {isHacker ? "Security Write-ups" : "Recent Publications"}
        </h2>

        {!isHacker || blogs.length === 0 ? (
          // Dev Mode / Empty State (Coming Soon Card)
          <div className="mt-8 max-w-xl mx-auto">
            <div 
              className="project-card flex flex-col justify-center items-center py-12 px-6 text-center border border-[var(--border)] opacity-80"
              style={{
                boxShadow: 'var(--shadow)',
                background: 'var(--surface)'
              }}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center border border-[var(--border)] mb-4 text-lg font-mono"
                style={{
                  background: 'color-mix(in srgb, var(--surface-strong) 80%, transparent)',
                  color: 'var(--accent)'
                }}
              >
                !
              </div>
              <h3 className="text-xl font-bold font-mono tracking-tight text-[var(--text)]">
                {emptyState.title}
              </h3>
              <p className="text-sm mt-2 max-w-sm text-[var(--muted)] leading-relaxed">
                {emptyState.subtitle}
              </p>
            </div>
          </div>
        ) : (
          // Hacker Mode / Write-ups Grid
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {blogs.map((blog) => (
              <a
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card block text-left transition-all duration-300 hover:scale-[1.01]"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(0, 255, 65, 0.1), 0 0 20px rgba(0, 255, 65, 0.1)',
                  background: 'var(--surface)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 0 26px rgba(0, 255, 65, 0.28)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'inset 0 0 0 1px rgba(0, 255, 65, 0.1), 0 0 20px rgba(0, 255, 65, 0.1)';
                }}
              >
                <div className="flex justify-between items-start gap-4">
                  <span 
                    className="inline-block text-[9px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[var(--border)]"
                    style={{
                      background: 'color-mix(in srgb, var(--surface-strong) 85%, transparent)',
                      color: 'var(--accent-2)'
                    }}
                  >
                    {blog.tag}
                  </span>
                  <span className="text-xs text-[var(--muted)] font-mono">
                    #{blog.id}
                  </span>
                </div>

                <h3 className="text-xl font-bold mt-4 leading-snug text-[var(--text)] transition-colors duration-200">
                  {blog.title}
                </h3>
                
                <p className="text-sm text-[var(--muted)] leading-relaxed mt-2.5 line-clamp-3">
                  {blog.description}
                </p>
                
                <div className="flex items-center justify-between mt-6 text-xs text-[var(--muted)] font-mono border-t border-[var(--border)] pt-4">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-[var(--accent)] font-semibold font-mono tracking-wider uppercase">
                  <span>Open Blog</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
