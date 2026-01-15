export function processText(text) {
    if (!text) return [];

    // Match:
    // 1. The word (non-whitespace chars)
    // 2. The following whitespace (including newlines)
    const regex = /([^\s]+)(\s*)/g;
    const words = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        const wordContent = match[1];
        const trailingSpace = match[2];

        let multiplier = 1.0;

        // Check punctuation (comma, semicolon, colon)
        if (/[;:,]$/.test(wordContent)) {
            multiplier = 1.5;
        }
        // Check sentence end (. ? ! and optional quotes/parentheses)
        else if (/[.?!][)"']?$/.test(wordContent)) {
            multiplier = 2.0;
        }

        // Check paragraph end (if trailing space contains newline)
        // Overrides sentence end if clearer pause needed, or cumulative?
        // Request says "Paragraph end: Base delay * 3.0".
        // Usually paragraph ends also have periods. So we should max it.
        if (trailingSpace.includes('\n') || trailingSpace.includes('\r')) {
            multiplier = Math.max(multiplier, 3.0);
        }

        words.push({
            word: wordContent,
            multiplier
        });
    }
    return words;
}
