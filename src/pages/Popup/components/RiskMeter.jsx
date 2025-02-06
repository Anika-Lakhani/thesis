import React from 'react';

const RiskMeter = ({ riskLevel }) => {
  const getRiskAngle = () => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return -60;
      case 'medium': return 0;
      case 'high': return 60;
      default: return 0;
    }
  };

  const getRiskColor = () => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return '#34A853';
      case 'medium': return '#FBBC05';
      case 'high': return '#EA4335';
      default: return '#FBBC05';
    }
  };

  return (
    <div className="risk-assessment">
      <h2 className="risk-title">Risk Level: {riskLevel}</h2>
      <div className="risk-meter">
        <svg viewBox="0 0 200 120">
          <path
            d="M20 100 A 60 60 0 0 1 180 100"
            className="risk-meter-path risk-meter-background"
          />
          <path
            d="M20 100 A 60 60 0 0 1 180 100"
            className="risk-meter-path risk-meter-value"
            style={{ stroke: getRiskColor() }}
          />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="50"
            stroke="#333"
            strokeWidth="2"
            className="risk-meter-needle"
            style={{ transform: `rotate(${getRiskAngle()}deg)` }}
          />
          <circle cx="100" cy="100" r="5" fill="#333" />
        </svg>
      </div>
    </div>
  );
};

export default RiskMeter; 