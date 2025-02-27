export class Summarizer {
    generateSummary(analysis) {
        const summary = {
            riskLevel: this.calculateOverallRisk(analysis),
            keyFindings: this.generateKeyFindings(analysis),
            recommendations: this.generateRecommendations(analysis)
        };

        return summary;
    }

    calculateOverallRisk(analysis) {
        const riskScores = {
            'high': 3,
            'medium': 2,
            'low': 1
        };

        let totalRisk = 0;
        let count = 0;

        Object.values(analysis).forEach(category => {
            if (category.findings.length > 0) {
                totalRisk += riskScores[category.risk];
                count++;
            }
        });

        const averageRisk = count > 0 ? totalRisk / count : 0;
        
        if (averageRisk >= 2.5) return 'High';
        if (averageRisk >= 1.5) return 'Medium';
        return 'Low';
    }

    generateKeyFindings(analysis) {
        const findings = [];

        Object.entries(analysis).forEach(([category, data]) => {
            if (data.findings.length > 0) {
                findings.push({
                    category,
                    count: data.findings.length,
                    importance: data.importance,
                    risk: data.risk
                });
            }
        });

        return findings;
    }

    generateRecommendations(analysis) {
        const recommendations = [];
        const format = document.documentElement.getAttribute('data-explanation-format') || 'default';

        Object.entries(analysis).forEach(([category, data]) => {
            if (data.findings.length > 0) {
                let text;
                switch (format) {
                    case 'girlypop':
                        text = `Bestie, you might wanna check out these ${data.findings.length} ${category} things 💁‍♀️`;
                        break;
                    case 'sports announcer':
                        text = `BREAKING NEWS: ${data.findings.length} ${category.toUpperCase()} POLICIES NEED REVIEW!`;
                        break;
                    default:
                        text = `Review ${data.findings.length} instances of ${category} policies`;
                }
                recommendations.push({ category, text });
            }
        });
        return recommendations;
    }
}