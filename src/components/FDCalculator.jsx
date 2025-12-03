import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiInfo, FiTrendingUp, FiDollarSign, FiClock } from 'react-icons/fi';

export const FDCalculator = () => {
  const [investment, setInvestment] = useState(5000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [timePeriod, setTimePeriod] = useState(5);
  const [timeUnit, setTimeUnit] = useState('Years');
  const [returns, setReturns] = useState(0);

  useEffect(() => {
    const period = timeUnit === 'Months' ? timePeriod / 12 : timePeriod;
    const maturity = investment * Math.pow(1 + interestRate / 100, period);
    const estimatedReturn = maturity - investment;
    setReturns(estimatedReturn);
  }, [investment, interestRate, timePeriod, timeUnit]);

  const chartData = [
    { name: 'Total investment', value: investment },
    { name: 'Total returns', value: returns },
  ];

  const formatCurrency = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
    return `₹${Math.round(value).toLocaleString()}`;
  };

  const COLORS = ['#059669', '#6366F1'];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-full">
      <div className="p-4 sm:p-6 border-b">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Fixed Deposit Calculator</h2>
        <p className="text-sm sm:text-base text-gray-600">Calculate your FD returns instantly</p>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side - Input controls */}
        <div className="space-y-6">
          {/* Investment input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <FiDollarSign className="text-emerald-500" />
                Total Investment
              </label>
              <div className="bg-emerald-50 text-emerald-600 font-medium px-3 py-1 rounded-md">
                {formatCurrency(investment)}
              </div>
            </div>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="500"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹1,000</span>
              <span>₹10,00,000</span>
            </div>
          </div>

          {/* Interest Rate input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <FiTrendingUp className="text-indigo-500" />
                Interest Rate (p.a)
              </label>
              <div className="bg-indigo-50 text-indigo-600 font-medium px-3 py-1 rounded-md">
                {interestRate}%
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Time Period input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <FiClock className="text-amber-500" />
                Time Period
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-20 bg-amber-50 text-amber-600 font-medium px-3 py-1 rounded-md text-center"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="bg-amber-50 text-amber-600 font-medium px-3 py-1 rounded-md"
                >
                  <option value="Years">Years</option>
                  <option value="Months">Months</option>
                </select>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max={timeUnit === 'Years' ? 20 : 240}
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 {timeUnit}</span>
              <span>{timeUnit === 'Years' ? '20' : '240'} {timeUnit}</span>
            </div>
          </div>

          {/* Summary Box */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Invested amount:</span>
              <span className="font-medium text-emerald-600">{formatCurrency(investment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Est. returns:</span>
              <span className="font-medium text-indigo-600">{formatCurrency(returns)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-900 font-bold">Maturity value:</span>
              <span className="font-bold text-gray-900">{formatCurrency(investment + returns)}</span>
            </div>
          </div>
        </div>

        {/* Right side - Charts */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4 min-h-[300px]">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Investment Breakdown</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={({ viewBox: { width, height } }) => Math.min(width, height) * 0.35}
                    innerRadius={({ viewBox: { width, height } }) => Math.min(width, height) * 0.25}
                    animationDuration={1000}
                    labelLine={false}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      padding: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    iconSize={10}
                    formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 rounded-lg shadow p-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Summary</h3>
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm text-gray-600">Maturity Amount:</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  {formatCurrency(investment + returns)}
                </span>
              </div>
              <div className="flex gap-4 sm:gap-8">
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-gray-600">Returns:</div>
                  <div className="text-base sm:text-lg font-semibold text-indigo-600">
                    {formatCurrency(returns)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-gray-600">Interest Rate:</div>
                  <div className="text-base sm:text-lg font-semibold text-amber-600">
                    {interestRate}%
                  </div>
                </div>
              </div>
              <div className="flex items-center text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-4">
                <FiInfo className="mr-1 sm:mr-2 flex-shrink-0" />
                Returns are subject to market risks. Numbers displayed are only projections.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


