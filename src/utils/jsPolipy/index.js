import { categories } from './patterns';
import { ReadabilityAnalyzer } from './readability';
import { Summarizer } from './summarizer';

export default class JsPolipy {
    constructor() {
        this.readabilityAnalyzer = new ReadabilityAnalyzer();
        this.summarizer = new Summarizer();
    }

    async analyzePolicy(text) {
        const analysis = {};
        
        // Analyze each category
        Object.entries(categories).forEach(([name, category]) => {
            analysis[name] = {
                findings: this.findMatches(text, category.patterns),
                risk: category.risk,
                importance: category.importance
            };
        });

        // Add readability analysis
        const readability = this.readabilityAnalyzer.calculateReadability(text);
        
        // Generate summary
        const summary = this.summarizer.generateSummary(analysis);

        return {
            success: true,
            analysis,
            readability,
            summary
        };
    }

    findMatches(text, patterns) {
        const matches = [];
        patterns.forEach(pattern => {
            const found = text.match(pattern);
            if (found) {
                matches.push({
                    pattern: pattern.toString(),
                    match: found[0]
                });
            }
        });
        return matches;
    }
}