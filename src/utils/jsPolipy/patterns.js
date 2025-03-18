export const categories = {
    dataCollection: {
        patterns: [
            /collect[s]?\s+(?:your|personal|user)\s+(?:data|information)/i,
            /information\s+we\s+collect/i,
            /gather[s]?\s+(?:your|personal|user)\s+(?:data|information)/i,
            /provide[s]?\s+(?:your|personal|user)\s+(?:data|information)/i
        ],
        risk: 'medium',
        importance: 'high'
    },
    thirdPartySharing: {
        patterns: [
            /share[s]?\s+(?:with|to)\s+third\s+parties/i,
            /disclose\s+to\s+partners/i,
            /transfer[s]?\s+to\s+third\s+parties/i,
            /provide[s]?\s+to\s+third\s+parties/i
        ],
        risk: 'high',
        importance: 'high'
    },
    dataSecurity: {
        patterns: [
            /encrypt(ion|ed)?/i,
            /security\s+measures/i,
            /protect[s]?\s+your\s+(?:data|information)/i,
            /safeguard[s]?/i
        ],
        risk: 'low',
        importance: 'medium'
    },
    userRights: {
        patterns: [
            /right\s+to\s+(?:access|delete|modify)/i,
            /opt[\s-]out/i,
            /request\s+(?:deletion|removal)/i,
            /control\s+(?:over|of)\s+your\s+data/i
        ],
        risk: 'low',
        importance: 'medium'
    },
    dataRetention: {
        patterns: [
            /retain|store|keep.*for/i,
            /retention\s+period/i,
            /store[s]?\s+(?:your|personal|user)\s+(?:data|information)/i,
            /keep[s]?\s+(?:your|personal|user)\s+(?:data|information)/i
        ],
        risk: 'medium',
        importance: 'medium'
    },
    cookies: {
        patterns: [
            /cookie[s]?\s+(?:use|policy|track)/i,
            /tracking\s+technologies/i,
            /web\s+beacons/i,
            /similar\s+tracking\s+technologies/i
        ],
        risk: 'medium',
        importance: 'high'
    },
    dataUsagePurpose: {
        patterns: [
            // High-risk patterns
            /profil(?:e|ing)\s+(?:your|user)\s+(?:data|behavior)/i,
            /track(?:ing)?\s+(?:your|user)\s+(?:behavior|activity)/i,
            /behavior(?:al)?\s+(?:analysis|tracking)/i,
            /location\s+(?:track(?:ing)?|monitor(?:ing)?)/i,
            /automat(?:ic|ed)\s+decision[s]?\s+making/i,
            /target(?:ed)?\s+(?:advertis(?:ing|ements)|market(?:ing)?)/i,
            /sell(?:ing)?\s+(?:your|user)?\s+(?:data|information)/i,

            // Medium-risk patterns
            /use[ds]?\s+(?:your|the)\s+(?:data|information)\s+for\s+marketing/i,
            /personalize[d]?\s+(?:content|experience|service)/i,
            /improve\s+(?:our|the)\s+(?:service|product|platform)/i,
            /research\s+(?:and)?\s+(?:development|analytics)/i,
            /aggregate[d]?\s+(?:statistics|analytics)/i,

            // Low-risk patterns
            /provide\s+(?:the|our)\s+(?:service|product)/i,
            /process(?:ing)?\s+(?:your)?\s+(?:order|payment)/i,
            /customer\s+(?:service|support)/i,
            /security\s+purposes?/i,
            /prevent(?:ing)?\s+fraud/i,
            /legal\s+(?:obligations?|requirements?)/i
        ],
        risk: 'medium', // Base risk level
        importance: 'high',
        // Additional risk assessment logic
        assessRisk: (matches) => {
            // High-risk patterns are 0-6
            const highRiskMatches = matches.slice(0, 7).some(m => m);
            // Medium-risk patterns are 7-11
            const mediumRiskMatches = matches.slice(7, 12).some(m => m);
            // Low-risk patterns are 12-17
            const lowRiskMatches = matches.slice(12).some(m => m);

            if (highRiskMatches) return 'high';
            if (mediumRiskMatches) return 'medium';
            if (lowRiskMatches) return 'low';
            return 'medium'; // Default risk level
        }
    }
}