export const funds = [
  {
    id: 1,
    name: 'HDFC Blue Chip Fund',
    description: 'A low-risk fund focused on large-cap companies with stable growth and consistent dividend history',
    risk: 'low',
    nav: 875.50,
    returns: {
      '1y': 12.5,
      '3y': 45.8,
      '5y': 85.5
    },
    minInvestment: 5000,
    category: 'Large Cap'
  },
  {
    id: 2,
    name: 'ICICI Prudential Balanced Advantage',
    description: 'A medium-risk fund balancing growth and stability through a dynamic mix of equity and debt instruments',
    risk: 'medium',
    nav: 1245.75,
    returns: {
      '1y': 15.7,
      '3y': 52.4,
      '5y': 92.1
    },
    minInvestment: 10000,
    category: 'Hybrid'
  },
  {
    id: 3,
    name: 'SBI Small Cap Fund',
    description: 'A high-risk fund targeting aggressive growth through investments in emerging small-cap companies',
    risk: 'high',
    nav: 2430.30,
    returns: {
      '1y': 22.4,
      '3y': 85.2,
      '5y': 158.9
    },
    minInvestment: 15000,
    category: 'Small Cap'
  },
  {
    id: 4,
    name: 'Axis Technology ETF',
    description: 'A high-risk fund focused on Indian IT and technology sector growth stocks',
    risk: 'high',
    nav: 3520.20,
    returns: {
      '1y': 25.8,
      '3y': 92.4,
      '5y': 185.7
    },
    minInvestment: 25000,
    category: 'Sectoral'
  },
  {
    id: 5,
    name: 'Kotak Debt Hybrid Fund',
    description: 'A low-risk fund focused on regular income through government securities and high-grade corporate bonds',
    risk: 'low',
    nav: 950.15,
    returns: {
      '1y': 8.8,
      '3y': 28.2,
      '5y': 45.1
    },
    minInvestment: 5000,
    category: 'Debt'
  }
]

export const getFundsByRisk = (riskType) => {
  return funds.filter(fund => fund.risk === riskType.toLowerCase())
}

export const getFundById = (id) => {
  return funds.find(fund => fund.id === id)
}

export const getRiskDescription = (riskType) => {
  const descriptions = {
    low: 'Conservative funds suitable for investors seeking capital preservation with steady returns',
    medium: 'Balanced funds ideal for moderate risk-takers looking for both growth and stability',
    high: 'Aggressive funds designed for investors comfortable with market volatility for higher returns'
  }
  return descriptions[riskType.toLowerCase()] || descriptions.medium
}