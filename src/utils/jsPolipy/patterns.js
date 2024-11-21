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
    }
}