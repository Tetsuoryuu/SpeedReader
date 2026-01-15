import React from 'react';

export default function ExplainerModal({ onClose }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                background: 'var(--color-surface)',
                width: '90%',
                maxWidth: '500px',
                padding: '2.5rem',
                borderRadius: '16px',
                border: '1px solid #333',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                textAlign: 'center',
                position: 'relative'
            }}>
                <h2 style={{
                    marginTop: 0,
                    marginBottom: '1.5rem',
                    fontSize: '1.8rem',
                    color: 'var(--color-primary)'
                }}>Why Speed Read?</h2>

                <p style={{ lineHeight: '1.7', opacity: 0.9, marginBottom: '1.5rem', textAlign: 'left' }}>
                    Traditional reading is slow because your eyes have to physically move across the page.
                </p>

                <p style={{ lineHeight: '1.7', opacity: 0.9, marginBottom: '2.5rem', textAlign: 'left' }}>
                    This app uses <a href="https://en.wikipedia.org/wiki/Rapid_serial_visual_presentation" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}><strong>RSVP</strong></a> (Rapid Serial Visual Presentation) to display words in a fixed location. By aligning the "focus point" of every word (the <span style={{ color: 'var(--color-pivot)' }}>red</span> letter), we eliminate eye movement, allowing you to absorb text as fast as your brain can think.
                </p>

                <button
                    onClick={onClose}
                    style={{
                        background: 'var(--color-primary)',
                        border: 'none',
                        padding: '1rem 2.5rem',
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: '50px',
                        cursor: 'pointer',
                        transition: 'transform 0.1s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    Got it!
                </button>
            </div>
        </div>
    );
}
