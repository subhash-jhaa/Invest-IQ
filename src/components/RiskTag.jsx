import React from 'react';

const riskColorMap = {
  low: 'bg-green-100 text-green-800',
  conservative: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  moderate: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
  aggressive: 'bg-red-100 text-red-800',
  'very high': 'bg-purple-100 text-purple-800',
  default: 'bg-gray-100 text-gray-800'
};

const riskDisplayMap = {
  low: 'Low',
  conservative: 'Conservative',
  medium: 'Medium',
  moderate: 'Moderate',
  high: 'High',
  aggressive: 'Aggressive',
  'very high': 'Very High'
};

const RiskTag = ({ risk }) => {
  // Handle undefined, null, or invalid risk values
  if (!risk) {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskColorMap.default}`}>
        Moderate
      </span>
    );
  }
  
  // Normalize risk string
  const normalizedRisk = typeof risk === 'string' ? risk.toLowerCase().trim() : '';
  
  // Get color class or default if not found
  const colorClass = riskColorMap[normalizedRisk] || riskColorMap.default;
  
  // Get display text or capitalized version of risk
  const displayText = riskDisplayMap[normalizedRisk] || 
    (typeof risk === 'string' ? risk.charAt(0).toUpperCase() + risk.slice(1) : 'Moderate');
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {displayText}
    </span>
  );
};

export default RiskTag;