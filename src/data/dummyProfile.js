export function calculateRiskProfile(answers) {
  const { age, investmentPeriod, riskTolerance, investmentGoal } = answers
  
  let riskScore = 0
  
  // Age scoring
  if (age < 30) riskScore += 3
  else if (age < 45) riskScore += 2
  else riskScore += 1
  
  // Investment period scoring
  if (investmentPeriod > 10) riskScore += 3
  else if (investmentPeriod > 5) riskScore += 2
  else riskScore += 1
  
  // Direct risk tolerance scoring
  riskScore += parseInt(riskTolerance)
  
  // Goal-based adjustment
  if (investmentGoal === 'aggressive-growth') riskScore += 2
  else if (investmentGoal === 'balanced-growth') riskScore += 1
  
  // Calculate final risk type
  if (riskScore >= 8) return 'high'
  if (riskScore >= 5) return 'medium'
  return 'low'
}