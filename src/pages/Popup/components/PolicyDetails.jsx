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
    const baseMessage = getCategoryMessage(category, findings.findings);
    
    switch (format) {
      case "girlypop":
        return `${baseMessage} (${effectiveRisk} vibes)`;
      case "sports announcer":
        return `Wow, Joe! ${baseMessage}! The stakes of this play are ${effectiveRisk.toUpperCase()}! 🎯`;
      default:
        return `${baseMessage} (${effectiveRisk} risk)`;
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
      dataCollection: `Data collected: ${findings.map(f => 
        f.match.replace(/collect[s]?\s+|your\s+|we\s+/gi, "")
      )[0]}`,
      thirdPartySharing: "Data shared with third parties",
      dataSecurity: findings.some(f => /encrypt/i.test(f.pattern)) 
        ? "Data is encrypted in transit"
        : "Security measures in place",
      userRights: "User controls available for data management",
      dataRetention: "Data retention policies specified",
      cookies: "Uses cookies and tracking technologies"
    };
    return messages[category] || `${category} policies detected`;
  };

  const getRiskClass = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'risk-high';
      case 'medium': return 'risk-medium';
      case 'low': return 'risk-low';
      default: return '';
    }
  };

  return (
    <div className="policy-details">
      {sortedCategories.map(([category, categoryData]) => {
        const effectiveRisk = getEffectiveRisk(categoryData);
        const emoji = getIcon(effectiveRisk);
        const text = getFormatText(category, categoryData);
        return (
          <div className={`details-row ${getRiskClass(effectiveRisk)}`}>
            <span className="details-row-emoji">{emoji}&nbsp;</span>
            <span className="details-row-text">{text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default PolicyDetails; 