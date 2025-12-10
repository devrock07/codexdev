'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/snippets')
      .then(res => res.json())
      .then(data => {
        if (data.snippets) {
          setSnippets(data.snippets.slice(0, 6)); // Show only 6 latest
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch codes:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Modern Navbar */}
      <nav className="glass-card-static" style={{
        margin: '1rem',
        borderRadius: 'var(--radius-full)',
        padding: '1rem 1.5rem',
        position: 'sticky',
        top: '1rem',
        zIndex: 1000,
        animation: 'slideDown 0.6s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-display)',
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Codex
          </Link>

          {/* Desktop Menu */}
          <div className="mobile-hidden" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'var(--text-primary)', fontWeight: 500, transition: 'color var(--transition-fast)' }}>
              Home
            </Link>
            <Link href="/browse" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color var(--transition-fast)' }}>
              Browse
            </Link>
            <Link href="/docs" style={{ color: 'var(--text-secondary)', fontWeight: 500, transition: 'color var(--transition-fast)' }}>
              Docs
            </Link>
            <Link href="/login" className="btn btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.9rem' }}>
              Staff Login
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="desktop-hidden btn-icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ padding: '0.5rem' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="desktop-hidden" style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--card-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            animation: 'slideDown 0.3s ease-out'
          }}>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontWeight: 500,
                background: 'var(--card-bg)',
                transition: 'all var(--transition-fast)'
              }}
            >
              Home
            </Link>
            <Link
              href="/browse"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                transition: 'all var(--transition-fast)'
              }}
            >
              Browse
            </Link>
            <Link
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                transition: 'all var(--transition-fast)'
              }}
            >
              Docs
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1rem', fontSize: '0.9rem', textAlign: 'center' }}
            >
              Staff Login
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container animate-fadeIn" style={{
        textAlign: 'center',
        padding: '4rem 0 3rem',
        flex: 1
      }}>
        <div style={{
          display: 'inline-block',
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          background: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--accent-primary)',
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          ✨ Premium Code Library
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
          marginBottom: '1.5rem',
          lineHeight: 1.1,
          fontFamily: 'var(--font-display)',
          fontWeight: 800
        }}>
          Codex Dev <br />
          <span className="gradient-text">average coders.</span>
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          maxWidth: '600px',
          margin: '0 auto 2.5rem',
          lineHeight: 1.6
        }}>
          Your premium gateway to legendary source code.
          Search, explore and just pure value.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link href="/browse" className="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            Browse Library
          </Link>
          <Link href="/docs" className="btn btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Documentation
          </Link>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="container" style={{ paddingBottom: '4rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700
          }}>
            Latest Projects
          </h2>
          <Link href="/browse" className="btn btn-ghost">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-3" style={{ gap: 'var(--spacing-lg)' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="glass-card-static" style={{ padding: '1.5rem' }}>
                <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '1rem' }}></div>
                <div className="skeleton" style={{ height: '16px', width: '100%', marginBottom: '0.5rem' }}></div>
                <div className="skeleton" style={{ height: '16px', width: '80%', marginBottom: '1rem' }}></div>
                <div className="skeleton" style={{ height: '36px', width: '120px' }}></div>
              </div>
            ))}
          </div>
        ) : snippets.length === 0 ? (
          <div className="glass-card" style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--card-bg)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              No Projects Yet
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Staff, please login to upload your first project.
            </p>
            <Link href="/login" className="btn btn-primary">
              Staff Login
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 animate-slideUp">
            {snippets.map((snip: any, index: number) => (
              <div
                key={snip._id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)'
                  }}>
                    {new Date(snip.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.3
                }}>
                  {snip.title}
                </h3>

                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  marginBottom: '1.5rem',
                  lineHeight: 1.6,
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {snip.description}
                </p>

                {snip.tags && snip.tags.length > 0 && (
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    marginBottom: '1rem'
                  }}>
                    {snip.tags.slice(0, 3).map((tag: string, i: number) => (
                      <span key={i} className="badge" style={{ fontSize: '0.7rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}


                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link
                    href={`/project/${snip._id}`}
                    className="btn btn-ghost"
                    style={{
                      padding: '0.625rem 1rem',
                      fontSize: '0.875rem',
                      flex: 1,
                      justifyContent: 'center'
                    }}
                  >
                    View Project
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                  {snip.downloadUrl && (
                    <a
                      href={snip.downloadUrl}
                      download
                      className="btn btn-secondary"
                      style={{
                        padding: '0.625rem 1rem',
                        fontSize: '0.875rem'
                      }}
                      title="Download ZIP"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--card-border)',
        padding: '2rem 0',
        marginTop: 'auto'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.25rem',
                marginBottom: '1rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                background: 'var(--accent-gradient)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Codex
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Premium gateway to legendary source code.
              </p>
            </div>

            <div>
              <h4 style={{
                fontSize: '0.875rem',
                marginBottom: '1rem',
                color: 'var(--text-primary)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link href="/browse" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Browse
                </Link>
                <Link href="/docs" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Documentation
                </Link>
                <Link href="/login" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Staff Login
                </Link>
              </div>
            </div>
          </div>

          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--card-border)',
            textAlign: 'center',
            color: 'var(--text-tertiary)',
            fontSize: '0.875rem'
          }}>
            © {new Date().getFullYear()} Codex. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
