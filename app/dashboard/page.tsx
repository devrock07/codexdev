'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [snippets, setSnippets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/snippets')
            .then(res => res.json())
            .then(data => {
                if (data.snippets) {
                    setSnippets(data.snippets);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch snippets:', err);
                setLoading(false);
            });
    }, []);

    const totalProjects = snippets.length;
    const recentProjects = snippets.slice(0, 5);

    return (
        <main className="container" style={{ padding: '2rem 1.5rem', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        marginBottom: '0.5rem'
                    }}>
                        Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Manage your code projects
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link href="/" className="btn btn-ghost">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        View Site
                    </Link>
                    <Link href="/dashboard/cdn" className="btn btn-secondary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        CDN Files
                    </Link>
                    <Link href="/dashboard/new" className="btn btn-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        New Project
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: '2rem'
            }}>
                <div className="glass-card-static" style={{
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(56, 189, 248, 0.05))',
                    borderColor: 'rgba(56, 189, 248, 0.2)'
                }}>
                    <div style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Total Projects
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: 'var(--accent-primary)',
                        fontFamily: 'var(--font-display)'
                    }}>
                        {totalProjects}
                    </div>
                </div>

                <div className="glass-card-static" style={{
                    background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.1), rgba(192, 132, 252, 0.05))',
                    borderColor: 'rgba(192, 132, 252, 0.2)'
                }}>
                    <div style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Recent
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: 'var(--accent-secondary)',
                        fontFamily: 'var(--font-display)'
                    }}>
                        {recentProjects.length}
                    </div>
                </div>

                <div className="glass-card-static" style={{
                    background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(74, 222, 128, 0.05))',
                    borderColor: 'rgba(74, 222, 128, 0.2)'
                }}>
                    <div style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.5rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Status
                    </div>
                    <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'var(--accent-success)',
                        fontFamily: 'var(--font-display)'
                    }}>
                        Active
                    </div>
                </div>
            </div>

            {/* Projects Table/Cards */}
            <div className="glass-card-static" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{
                    padding: 'var(--spacing-lg)',
                    borderBottom: '1px solid var(--card-border)'
                }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-display)'
                    }}>
                        All Projects
                    </h2>
                </div>

                {snippets.length === 0 ? (
                    <div style={{
                        padding: '4rem 2rem',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                            No Projects Yet
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                            Create your first project to get started
                        </p>
                        <Link href="/dashboard/new" className="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Create Project
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="mobile-hidden" style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <tr>
                                        <th style={{
                                            padding: '1rem 1.5rem',
                                            textAlign: 'left',
                                            color: 'var(--text-secondary)',
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        }}>
                                            Title
                                        </th>

                                        <th style={{
                                            padding: '1rem 1.5rem',
                                            textAlign: 'left',
                                            color: 'var(--text-secondary)',
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        }}>
                                            Date
                                        </th>
                                        <th style={{
                                            padding: '1rem 1.5rem',
                                            textAlign: 'right',
                                            color: 'var(--text-secondary)',
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em'
                                        }}>
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {snippets.map((snip: any) => (
                                        <tr
                                            key={snip._id}
                                            style={{
                                                borderBottom: '1px solid var(--card-border)',
                                                transition: 'background var(--transition-fast)'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                                                    {snip.title}
                                                </div>
                                                <div style={{
                                                    fontSize: '0.875rem',
                                                    color: 'var(--text-secondary)',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}>
                                                    {snip.description}
                                                </div>
                                            </td>
                                            <td style={{
                                                padding: '1rem 1.5rem',
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.875rem'
                                            }}>
                                                {new Date(snip.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                    <Link
                                                        href={`/project/${snip._id}`}
                                                        className="btn-icon"
                                                        title="View"
                                                        style={{ padding: '0.5rem' }}
                                                    >
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                            <circle cx="12" cy="12" r="3"></circle>
                                                        </svg>
                                                    </Link>
                                                    <Link
                                                        href={`/dashboard/edit/${snip._id}`}
                                                        className="btn-icon"
                                                        title="Edit"
                                                        style={{ padding: '0.5rem' }}
                                                    >
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="desktop-hidden" style={{ padding: 'var(--spacing-md)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                                {snippets.map((snip: any) => (
                                    <div
                                        key={snip._id}
                                        className="glass-card-static"
                                        style={{ padding: 'var(--spacing-md)' }}
                                    >
                                        <div style={{ marginBottom: '0.75rem' }}>
                                            <h3 style={{
                                                fontSize: '1.125rem',
                                                fontWeight: 600,
                                                marginBottom: '0.5rem'
                                            }}>
                                                {snip.title}
                                            </h3>
                                            <p style={{
                                                fontSize: '0.875rem',
                                                color: 'var(--text-secondary)',
                                                marginBottom: '0.75rem',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {snip.description}
                                            </p>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: 'var(--text-tertiary)',
                                                marginBottom: '0.75rem'
                                            }}>
                                                {new Date(snip.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <Link
                                                href={`/project/${snip._id}`}
                                                className="btn btn-ghost"
                                                style={{ flex: 1, fontSize: '0.875rem', padding: '0.625rem' }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                                View
                                            </Link>
                                            <Link
                                                href={`/dashboard/edit/${snip._id}`}
                                                className="btn btn-secondary"
                                                style={{ flex: 1, fontSize: '0.875rem', padding: '0.625rem' }}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
