import React, { useState, useEffect } from 'react';
import PreReaderInput from './components/PreReaderInput';
import ReaderDisplay from './components/ReaderDisplay';
import Controls from './components/Controls';
import ExplainerModal from './components/ExplainerModal';
import Footer from './components/Footer';
import { useRSVP } from './hooks/useRSVP';

function App() {
  const [sourceText, setSourceText] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);
  const [readerFont, setReaderFont] = useState(() => {
    return localStorage.getItem('readerFont') || "'Roboto Mono', monospace";
  });

  useEffect(() => {
    localStorage.setItem('readerFont', readerFont);
  }, [readerFont]);

  const {
    currentWord,
    currentIndex,
    totalWords,
    isPlaying,
    wpm,
    setWpm,
    togglePlay,
    seek,
    rewind,
    setIsPlaying
  } = useRSVP(isReading ? sourceText : null, 300);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenExplainer');
    if (!hasSeen) {
      setShowExplainer(true);
    }
  }, []);

  const closeExplainer = () => {
    localStorage.setItem('hasSeenExplainer', 'true');
    setShowExplainer(false);
  };

  const handleStart = (text) => {
    if (!text.trim()) return;
    setSourceText(text);
    setIsReading(true);
  };

  const handleBack = () => {
    setIsReading(false);
    setIsPlaying(false);
  };

  // Keyboard support for spacebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isReading) return;
      if (e.code === 'Space') {
        e.preventDefault(); // prevent scroll
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReading, togglePlay]);

  return (
    <div className="app-container" style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      boxSizing: 'border-box',
      position: 'relative' // For modal context
    }}>
      {showExplainer && <ExplainerModal onClose={closeExplainer} />}

      <header style={{
        marginBottom: '2rem',
        textAlign: 'center',
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="RSVP Logo"
            style={{ width: '40px', height: '40px', borderRadius: '8px' }}
          />
          <h1 style={{ margin: 0, letterSpacing: '-1px', fontSize: '1.8rem' }}>
            SPEED<span style={{ color: 'var(--color-pivot)' }}>R</span>EADER
          </h1>
        </div>
        <button
          onClick={() => setShowExplainer(true)}
          style={{
            position: 'absolute',
            right: 0,
            background: 'transparent',
            border: '1px solid #444',
            color: '#888',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}
          title="What is Speed Reading?"
        >
          ?
        </button>
      </header>

      {!isReading ? (
        <PreReaderInput onStart={handleStart} />
      ) : (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ReaderDisplay word={currentWord} font={readerFont} />

          <Controls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            wpm={wpm}
            setWpm={setWpm}
            currentIndex={currentIndex}
            totalWords={totalWords}
            seek={seek}
            rewind={rewind}
            onBack={handleBack}
            font={readerFont}
            setFont={setReaderFont}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
