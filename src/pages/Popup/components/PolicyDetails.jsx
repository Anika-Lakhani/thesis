import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

const PolicyDetails = ({ analysis }) => {
  const { theme } = useAccessibility();
  const format = document.documentElement.getAttribute('data-explanation-format') || 'default';

  // Function to determine actual risk based on instances and base risk
  const getEffectiveRisk = (categoryData) => {
    if (categoryData.findings.length === 0) {
      return 'low';  // If no instances found, risk is low
    }
    return categoryData.risk;  // Otherwise use the category's defined risk
  };

  // Function to format category name from camelCase to Title Case
  const formatCategoryName = (camelCase) => {
    // First split by capital letters and join with spaces
    const withSpaces = camelCase.replace(/([A-Z])/g, ' $1').trim();
    // Capitalize first letter and return
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  // Function to get format-specific text for a category
  const getFormatText = (category, findings) => {
    const effectiveRisk = getEffectiveRisk(findings);
    const count = findings.findings.length;
    const formattedCategory = formatCategoryName(category);
    
    switch (format) {
      case 'girlypop':
        return `${formattedCategory} is giving ${effectiveRisk} vibes (found ${count} instances) 💅`;
      case 'sports announcer':
        return `BREAKING: ${formattedCategory.toUpperCase()} shows ${effectiveRisk.toUpperCase()} RISK LEVEL! ${count} INSTANCES FOUND!`;
      default:
        return `${formattedCategory} shows ${effectiveRisk} risk level (${count} instances found)`;
    }
  };

  // Sort categories by importance
  const sortedCategories = Object.entries(analysis).sort((a, b) => {
    const importanceOrder = { high: 3, medium: 2, low: 1 };
    return importanceOrder[b[1].importance] - importanceOrder[a[1].importance];
  });

  const getIcon = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high': return '👎';
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
      {sortedCategories.map(([category, categoryData]) => {
        const effectiveRisk = getEffectiveRisk(categoryData);
        return (
          <div
            key={category}
            className={`details-row ${effectiveRisk.toLowerCase()}`}
          >
            <div className="details-icon">
              {getIcon(effectiveRisk)}
            </div>
            <div className="details-content">
              <p className="details-text">
                {getFormatText(category, categoryData)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PolicyDetails; 