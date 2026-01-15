import { useState, useEffect, useRef } from 'react';
import { processText } from '../utils/textProcessor';

export function useRSVP(rawText, initialWpm = 300) {
    const [words, setWords] = useState([]);
    const [index, setIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(initialWpm);

    const timerRef = useRef(null);

    // Initialize words when text changes
    useEffect(() => {
        if (rawText) {
            setWords(processText(rawText));
            setIndex(0);
            setIsPlaying(false);
        } else {
            setWords([]);
        }
    }, [rawText]);

    // Timer loop
    useEffect(() => {
        if (!isPlaying || !words.length) {
            clearTimeout(timerRef.current);
            return;
        }

        if (index >= words.length) {
            setIsPlaying(false);
            setIndex(0); // Optional: reset to start or stay at end
            return;
        }

        const currentWord = words[index];
        const baseDelay = 60000 / wpm;
        // Ensure minimum delay to avoid freezing if WPM is insane
        const delay = Math.max(baseDelay * currentWord.multiplier, 10);

        timerRef.current = setTimeout(() => {
            setIndex(prev => prev + 1);
        }, delay);

        return () => clearTimeout(timerRef.current);
    }, [isPlaying, index, wpm, words]);

    const togglePlay = () => setIsPlaying(p => !p);
    const seek = (newIndex) => {
        let safeIndex = Math.max(0, Math.min(newIndex, words.length - 1));
        setIndex(safeIndex);
    };

    const rewind = (seconds) => {
        // Estimate words to go back: wpm / 60 * seconds
        const wordsToRewind = Math.ceil((wpm / 60) * seconds);
        seek(index - wordsToRewind);
    };

    return {
        currentWord: words[index]?.word || '',
        currentIndex: index,
        totalWords: words.length,
        progress: words.length ? (index / words.length) * 100 : 0,
        isPlaying,
        wpm,
        setWpm,
        togglePlay,
        setIsPlaying,
        seek,
        rewind
    };
}
