import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import './PolicyDetails.css';

// Define tooltips for each privacy policy component
const PRIVACY_TOOLTIPS = {
  dataCollection: {
    title: "Data Collection",
    description: "Information about what personal data the website collects from users, including but not limited to email addresses, names, location data, and browsing behavior."
  },
  thirdPartySharing: {
    title: "Third Party Sharing",
    description: "Details about how and with whom your personal information might be shared, including partners, advertisers, or service providers."
  },
  dataSecurity: {
    title: "Data Security",
    description: "Measures and practices used to protect your personal information from unauthorized access, breaches, or misuse."
  },
  userRights: {
    title: "User Rights",
    description: "Your rights regarding your personal data, including access, correction, deletion, and data portability options."
  },
  dataRetention: {
    title: "Data Retention",
    description: "How long your personal information is kept and the criteria used to determine the retention period."
  },
  cookies: {
    title: "Cookies & Tracking",
    description: "Information about how the website uses cookies and other tracking technologies to collect and store data."
  },
  dataProcessing: {
    title: "Data Processing",
    description: "How your personal information is used, processed, and for what purposes."
  },
  legalBasis: {
    title: "Legal Basis",
    description: "The legal grounds for collecting and processing your personal data."
  }
};

const PolicyDetails = ({ analysis }) => {
  const { theme } = useAccessibility();
  const format = document.documentElement.getAttribute('data-explanation-format') || 'default';

  // Function to determine effective risk based on instances and base/standard risk
  const getEffectiveRisk = (categoryData) => {
    if (categoryData.findings.length === 0) {
      return "low";  // If no instances found, risk is low
    }
    return categoryData.risk;  // Otherwise use the category's defined standard risk
  };

  // New function to convert effective risk to format-specific risk name
  const getFormattedRiskLevel = (effectiveRisk) => {
    switch (format) {
      case "girlypop":
        switch (effectiveRisk.toLowerCase()) {
          case "high": return "super sus😬";
          case "medium": return "mid😕";
          case "low": return "perf🥰";
          default: return "idek sorry";
        }
      case "sports announcer":
        switch (effectiveRisk.toLowerCase()) {
          case "high": return "DANGER: 2-MIN WARNING";
          case "medium": return "CAUTION: INTERCEPTION POSSIBLE";
          case "low": return "CLEAR: FAST BREAK AND SCORE!";
          default: return "UNKNOWN";
        }
      default:
        return effectiveRisk.toLowerCase();
    }
  };

  // Function to format category name from camelCase to Title Case
  const formatCategoryName = (camelCase) => {
    // First split by capital letters and join with spaces
    const withSpaces = camelCase.replace(/([A-Z])/g, ' $1').trim();
    // Capitalize first letter and return
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  };

  const getFormatText = (category, findings) => {
    const effectiveRisk = getEffectiveRisk(findings);
    const formattedRisk = getFormattedRiskLevel(effectiveRisk);
    const baseMessage = getCategoryMessage(category, findings.findings);
    
    switch (format) {
      case "girlypop":
        return `${baseMessage} (${formattedRisk})`;
      case "sports announcer":
        return `Wow, Joe! ${baseMessage}! The stakes of this play are ${formattedRisk}! 📋`;
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
    const riskLevel = risk.toLowerCase();
    
    switch (format) {
      case "girlypop":
        switch (riskLevel) {
          case "high": return "🤮";
          case "medium": return "🤨";
          case "low": return "🤤";
          default: return "🤷‍♀️";
        }
      
      case "sports announcer":
        switch (riskLevel) {
          case "high": return "🔴";
          case "medium": return "🟡";
          case "low": return "🟢";
          default: return "❔";
        }
      
      default:
        // Original emoji set
        switch (riskLevel) {
          case "high": return "👎";
          case "medium": return "⚠️";
          case "low": return "👍";
          default: return "❔";
        }
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

  const renderTooltip = (category) => {
    const tooltip = PRIVACY_TOOLTIPS[category];
    if (!tooltip) return null;

    return (
      <div className="tooltip-content">
        <h4>{tooltip.title}</h4>
        <p>{tooltip.description}</p>
      </div>
    );
  };

  const renderDetailsRow = (category, data, level = "medium") => {
    if (!data || Object.keys(data).length === 0) return null;

    const effectiveRisk = getEffectiveRisk(data);
    const formattedRisk = getFormattedRiskLevel(effectiveRisk);
    const icon = getIcon(effectiveRisk);

    return (
      <div className={`details-row ${getRiskClass(effectiveRisk)}`} key={category}>
        <div className="tooltip-container">
          <div className="detail-content">
            <h3>
              {icon} {PRIVACY_TOOLTIPS[category]?.title || formatCategoryName(category)}
            </h3>
            <div className="risk-indicator">
              Risk Level: {formattedRisk}
            </div>
          </div>
          {renderTooltip(category)}
        </div>
      </div>
    );
  };

  return (
    <div className="policy-details">
      {sortedCategories.map(([category, data]) => 
        renderDetailsRow(category, data, data.risk)
      )}
    </div>
  );
};

export default PolicyDetails; 