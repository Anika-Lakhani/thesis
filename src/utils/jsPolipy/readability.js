export class ReadabilityAnalyzer {
    calculateReadability(text) {
        const words = text.split(/\s+/).length;
        const sentences = text.split(/[.!?]+/).length;
        const syllables = this.countSyllables(text);
        
        // Flesch Reading Ease score
        const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
        
        return {
            score: Math.round(score * 10) / 10,
            level: this.getReadabilityLevel(score),
            stats: {
                words,
                sentences,
                syllables,
                averageWordsPerSentence: words / sentences
            }
        };
    }

    countSyllables(text) {
        return text.toLowerCase()
            .replace(/[^a-z]/g, '')
            .replace(/[^aeiouy]*[aeiouy]+/g, 'a')
            .length;
    }

    getReadabilityLevel(score) {
        if (score >= 90) return 'Very Easy';
        if (score >= 80) return 'Easy';
        if (score >= 70) return 'Fairly Easy';
        if (score >= 60) return 'Standard';
        if (score >= 50) return 'Fairly Difficult';
        if (score >= 30) return 'Difficult';
        return 'Very Difficult';
    }
}