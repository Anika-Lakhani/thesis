import React from 'react';

const RiskMeter = ({ riskLevel }) => {
  // Get the current explanation format
  const format = document.documentElement.getAttribute('data-explanation-format') || 'default';

  // Get risk description based on format and level
  const getRiskDescription = (level) => {
    switch (format) {
      case 'girlypop':
        switch (level.toLowerCase()) {
          case 'low':
            return "We Gucci 💅 I like her, she's safe";
          case 'medium':
            return "Gonna be honest... she's a little sketch 💁‍♀️";
          case 'high':
            return "RED FLAG fs 🚩 Don't say I didn't warn you.";
          default:
            return "She's a little mysterious 🤔 tbh can't tell";
        }
      case 'sports announcer':
        switch (level.toLowerCase()) {
          case 'low':
            return "Folks, we're looking at a clean game here!";
          case 'medium':
            return "This could go either way! Excited to watch the play!";
          case 'high':
            return "RED CARD! I REPEAT, RED CARD!";
          default:
            return "The judges are still reviewing the play!";
        }
      default:
        // Keep default text unchanged
        return `This privacy policy shows a ${level} level of risk.`;
    }
  };

  // Keep needle calculations the same
  const getNeedleValue = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 0.25;
      case 'medium': return 0.5;
      case 'high': return 0.8;
      default: return 0.5;
    }
  };

  // Adjust arc value calculations for better positioning
  const getArcValue = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 0.3;  // 30% of the arc
      case 'medium': return 0.65;  // Increased to show exactly half of visible arc
      case 'high': return 0.8;  // 80% of the arc
      default: return 0.5;
    }
  };

  const needleValue = getNeedleValue(riskLevel);
  const arcValue = getArcValue(riskLevel);
  
  // Needle angle calculation
  const needleAngle = -90 + (180 * needleValue);
  
  // Arc calculations
  const arcLength = 188.5;
  const dashOffset = 0;  // Reset offset to start from left side

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
      <p className="risk-description">{getRiskDescription(riskLevel)}</p>
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
              strokeDasharray: `${arcLength * arcValue} ${arcLength}`
            }}
          />
          
          {/* Only show masking arc for low risk */}
          {riskLevel.toLowerCase() === 'low' && (
            <path
              d="M20 100 A 60 60 0 0 1 180 100"
              className="risk-meter-path"
              style={{
                stroke: '#e0e0e0',
                strokeWidth: 20,
                strokeDasharray: `${arcLength / 2} ${arcLength}`,
                strokeDashoffset: arcLength / 2
              }}
            />
          )}
          
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