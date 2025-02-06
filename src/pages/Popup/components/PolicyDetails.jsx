import React from 'react';

const PolicyDetails = ({ analysis }) => {
  // Sort categories by importance
  const sortedCategories = Object.entries(analysis).sort((a, b) => {
    const importanceOrder = { high: 3, medium: 2, low: 1 };
    return importanceOrder[b[1].importance] - importanceOrder[a[1].importance];
  });

  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high': return '#ffebee'; // Light red background
      case 'medium': return '#fff3e0'; // Light yellow background
      case 'low': return '#e8f5e9'; // Light green background
      default: return '#f5f5f5';
    }
  };

  const getIcon = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high': return '👎'; // You can replace with FontAwesome icons
      case 'medium': return '⚠️';
      case 'low': return '👍';
      default: return '❔';
    }
  };

  const getCategoryMessage = (category, findings) => {
    const messages = {
      dataCollection: 'Data collected: ' + findings.map(f => 
        f.match.replace(/collect[s]?\s+|your\s+|we\s+/gi, '')
      )[0],
      thirdPartySharing: 'Data shared with third parties',
      dataSecurity: findings.some(f => /encrypt/i.test(f.pattern)) 
        ? 'Data is encrypted in transit'
        : 'Security measures in place',
      userRights: 'User controls available for data management',
      dataRetention: 'Data retention policies specified',
      cookies: 'Uses cookies and tracking technologies'
    };
    return messages[category] || `${category} policies detected`;
  };

  return (
    <div className="policy-details">
      {sortedCategories.map(([category, data]) => (
        data.findings.length > 0 && (
          <div 
            key={category}
            className="detail-row"
            style={{ backgroundColor: getRiskColor(data.risk) }}
          >
            <span className="detail-icon">{getIcon(data.risk)}</span>
            <span className="detail-text">
              {getCategoryMessage(category, data.findings)}
            </span>
          </div>
        )
      ))}
    </div>
  );
};

export default PolicyDetails; 