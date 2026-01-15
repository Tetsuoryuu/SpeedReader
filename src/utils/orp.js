/**
 * Determines the Optimal Recognition Point (Red Letter) index.
 * Logic:
 * Length 1: Index 0
 * Length 2-5: Index 1
 * Length 6-9: Index 2
 * Length 10-13: Index 3
 * Length 14+: Index 4
 */
export function getPivotIndex(wordLength) {
    if (wordLength <= 1) return 0;
    if (wordLength <= 5) return 1;
    if (wordLength <= 9) return 2;
    if (wordLength <= 13) return 3;
    return 4;
}

/**
 * Splits a word into left, pivot, and right parts.
 */
export function processWord(word) {
    if (!word) return { left: '', pivot: '', right: '' };
    const index = getPivotIndex(word.length);
    // Ensure index is within bounds (e.g. for very short words if logic had edge cases, though 1->0 is safe)
    const safeIndex = Math.min(index, word.length - 1);

    return {
        left: word.slice(0, safeIndex),
        pivot: word[safeIndex],
        right: word.slice(safeIndex + 1)
    };
}
