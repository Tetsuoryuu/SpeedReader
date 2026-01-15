import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';
// Set worker to local public file
GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export const parseFile = async (file) => {
    if (file.type === 'text/plain') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsText(file);
        });
    } else if (file.type === 'application/pdf') {
        try {
            const arrayBuffer = await file.arrayBuffer();

            // Use local CMaps from public folder
            const loadingTask = getDocument({
                data: arrayBuffer,
                cMapUrl: '/cmaps/',
                cMapPacked: true,
            });

            const pdf = await loadingTask.promise;
            console.log("PDF Loaded. Pages:", pdf.numPages);
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                // Try to get text content including marked content (layers)
                const textContent = await page.getTextContent({ includeMarkedContent: true });
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + ' ';
            }

            if (fullText.trim().length === 0) {
                throw new Error("No text found in PDF. This document appears to be a scanned image or contains no selectable text.");
            }

            return fullText;
        } catch (e) {
            console.error("PDF Parsing Error Details:", e);
            throw e;
        }
    }
    throw new Error(`Unsupported file type: ${file.type}`);
};
