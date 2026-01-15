import React, { useState } from 'react';
import { parseFile } from '../utils/fileParser';

export default function PreReaderInput({ onStart }) {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsLoading(true);
        setError(null);
        try {
            const content = await parseFile(file);
            setText(content);
        } catch (err) {
            console.error(err);
            setError('Failed to read file. Please ensure it is a valid .txt or .pdf.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="input-section" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '800px',
            background: 'var(--color-surface)',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 500 }}>Source Text</h2>
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here or open a PDF/TXT file..."
                style={{
                    width: '100%',
                    minHeight: '300px',
                    padding: '1rem',
                    background: '#111',
                    color: 'var(--color-text)',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    resize: 'vertical',
                    fontFamily: 'var(--font-mono)',
                    lineHeight: '1.5',
                    boxSizing: 'border-box'
                }}
            />

            {error && <div style={{ color: '#e74c3c', fontSize: '0.9rem' }}>{error}</div>}

            <div className="controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <label className="file-upload-btn" style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem 1.2rem',
                    background: '#222',
                    border: '1px solid #444',
                    borderRadius: '6px',
                    transition: 'all 0.2s',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: '#ccc'
                }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#333'; e.currentTarget.style.borderColor = '#666'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = '#222'; e.currentTarget.style.borderColor = '#444'; }}
                >
                    <input
                        type="file"
                        accept=".txt,.pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>Open PDF/TXT File</span>
                </label>

                <button
                    className="primary-btn"
                    onClick={() => onStart(text)}
                    disabled={!text.trim() || isLoading}
                    style={{
                        background: text.trim() ? 'var(--color-primary)' : '#444',
                        cursor: text.trim() ? 'pointer' : 'not-allowed',
                        padding: '0.8rem 2rem',
                        fontSize: '1rem',
                        fontWeight: 600
                    }}
                >
                    {isLoading ? 'Processing...' : 'Start Reading'}
                </button>
            </div>


        </div >
    );
}
