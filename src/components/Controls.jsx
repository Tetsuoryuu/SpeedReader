import React from 'react';

export default function Controls({
    isPlaying,
    togglePlay,
    wpm,
    setWpm,
    currentIndex,
    totalWords,
    seek,
    rewind,
    onBack,
    font,
    setFont
}) {

    const handleSeek = (e) => {
        seek(Number(e.target.value));
    };

    // Format progress
    const progressPercent = totalWords > 0 ? ((currentIndex / totalWords) * 100).toFixed(1) : 0;

    const fontOptions = [
        { label: 'Roboto Mono', value: "'Roboto Mono', monospace" },
        { label: 'Menlo', value: "'Menlo', monospace" },
        { label: 'Courier New', value: "'Courier New', Courier, monospace" },
        { label: 'Monospace', value: "monospace" }
    ];

    return (
        <div className="controls" style={{
            width: '100%',
            maxWidth: '800px',
            marginTop: '3rem',
            background: 'var(--color-surface)',
            padding: '1.5rem',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        }}>
            {/* Progress Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.7, minWidth: '40px' }}>{progressPercent}%</span>
                <input
                    type="range"
                    min="0"
                    max={totalWords - 1}
                    value={currentIndex}
                    onChange={handleSeek}
                    style={{ flex: 1, cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.8rem', opacity: 0.7, minWidth: '60px', textAlign: 'right' }}>
                    {currentIndex} / {totalWords}
                </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>

                {/* Main Transport */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={onBack} style={{ background: 'transparent', border: '1px solid #444' }}>
                        &larr; Back
                    </button>
                    <button onClick={() => rewind(10)} title="Rewind 10s">
                        &#8634; 10s
                    </button>
                    <button
                        className="primary-btn"
                        onClick={togglePlay}
                        style={{
                            background: isPlaying ? '#e74c3c' : 'var(--color-primary)',
                            minWidth: '80px'
                        }}
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                </div>

                {/* Settings Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {/* WPM Control */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <label style={{ fontWeight: 600 }}>WPM: {wpm}</label>
                        <input
                            type="range"
                            min="60"
                            max="1000"
                            step="10"
                            value={wpm}
                            onChange={(e) => setWpm(Number(e.target.value))}
                            style={{ width: '150px' }}
                        />
                    </div>

                    {/* Font Selection */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <label style={{ fontWeight: 600 }}>Font:</label>
                        <select
                            value={font}
                            onChange={(e) => setFont(e.target.value)}
                            style={{
                                background: '#111',
                                border: '1px solid #444',
                                color: 'white',
                                padding: '0.4rem',
                                borderRadius: '4px',
                                outline: 'none'
                            }}
                        >
                            {fontOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.8rem' }}>
                <span style={{ opacity: 0.5 }}>Press </span>
                <span style={{ border: '1px solid #fff', color: '#fff', padding: '0 4px', borderRadius: '4px', fontWeight: 600 }}>Space</span>
                <span style={{ opacity: 0.5 }}> to Play/Pause</span>
            </div>
        </div>
    );
}
