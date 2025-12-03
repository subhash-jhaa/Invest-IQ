export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount)
}

export const formatToRupees = (value) => {
  if (!value) return '₹0'
  const amount = typeof value === 'string' ? value.replace(/[^0-9]/g, '') : value
  return `₹${Number(amount).toLocaleString('en-IN')}`
}

export const formatPercentage = (value) => {
  if (!value) return '0%'
  return `${Number(value).toFixed(2)}%`
}

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-IN').format(value)
}