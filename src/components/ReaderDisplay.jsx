import React from 'react';
import { processWord } from '../utils/orp';

export default function ReaderDisplay({ word, font }) {
    const { left, pivot, right } = processWord(word);

    return (
        <div className="reader-display" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
            width: '100%',
            maxWidth: '800px',
            position: 'relative',
            background: '#000', // slight contrast or transparent
            marginTop: '2rem',
            borderRadius: '8px',
            padding: '2rem 1rem'
        }}>
            {/* Focal Point Markers - Notches */}
            <div style={{
                position: 'absolute',
                top: '10%',
                bottom: '10%',
                left: '50%',
                width: '2px',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: 0.2,
                pointerEvents: 'none'
            }}>
                <div style={{ width: '2px', height: '15px', background: 'var(--color-pivot)' }}></div>
                <div style={{ width: '2px', height: '15px', background: 'var(--color-pivot)' }}></div>
            </div>

            {/* Word Container */}
            <div style={{
                display: 'flex',
                alignItems: 'baseline',
                width: '100%',
                fontSize: 'clamp(2rem, 10vw, 4.5rem)',
                fontFamily: font,
                lineHeight: 1
            }}>
                <div style={{ flex: 1, textAlign: 'right', whiteSpace: 'pre' }}>{left}</div>
                <div className="pivot-char-highlight" style={{ fontWeight: 700 }}>{pivot}</div>
                <div style={{ flex: 1, textAlign: 'left', whiteSpace: 'pre' }}>{right}</div>
            </div>
        </div>
    );
}
