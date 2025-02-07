import React from 'react';

const RiskMeter = ({ riskLevel }) => {
  // Keep needle calculations the same
  const getNeedleValue = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 0.2;
      case 'medium': return 0.5;
      case 'high': return 0.8;
      default: return 0.5;
    }
  };

  const getArcValue = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 0.2;
      case 'medium': return 0.65;
      case 'high': return 0.8;
      default: return 0.5;
    }
  };

  const needleValue = getNeedleValue(riskLevel);
  const arcValue = getArcValue(riskLevel);
  
  // Needle angle calculation
  const needleAngle = -90 + (180 * needleValue);
  
  // Arc calculations
  const arcLength = 188.5;
  const dashOffset = arcLength * (1 - arcValue);

  // Get color based on risk level
  const getColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return '#188038';
      case 'medium': return '#fbbc05';
      case 'high': return '#d93025';
      default: return '#fbbc05';
    }
  };

  return (
    <div className="risk-assessment">
      <h2 className="risk-title">Risk Level: {riskLevel}</h2>
      <div className="risk-meter">
        <svg viewBox="0 0 200 120">
          {/* Background arc */}
          <path
            d="M20 100 A 60 60 0 0 1 180 100"
            className="risk-meter-path risk-meter-background"
          />
          
          {/* Colored arc */}
          <path
            d="M20 100 A 60 60 0 0 1 180 100"
            className="risk-meter-path risk-meter-value"
            style={{
              stroke: getColor(riskLevel),
              strokeDasharray: arcLength,
              strokeDashoffset: dashOffset
            }}
          />
          
          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="50"
            stroke="#333"
            strokeWidth="2"
            className="risk-meter-needle"
            style={{
              transform: `rotate(${needleAngle}deg)`
            }}
          />
          
          <circle cx="100" cy="100" r="5" fill="#333" />
        </svg>
      </div>
    </div>
  );
};

export default RiskMeter; 