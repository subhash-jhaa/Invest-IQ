import React, { useState, useEffect, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiTrendingUp, FiDollarSign, FiClock } from 'react-icons/fi';

export const SipCalculator = () => {
  const [activeTab, setActiveTab] = useState('SIP');
  const [monthlyInvestment, setMonthlyInvestment] = useState(25000);
  const [lumpSumInvestment, setLumpSumInvestment] = useState(250000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);

  useEffect(() => {
    const n = timePeriod * 12;
    const r = expectedReturn / 100 / 12;
    if (activeTab === 'SIP') {
      const futureValue = monthlyInvestment * (((Math.pow(1 + r, n) - 1) * (1 + r)) / r);
      const totalInvested = monthlyInvestment * n;
      const returns = futureValue - totalInvested;
      setInvestedAmount(totalInvested);
      setEstimatedReturns(returns);
    } else {
      const futureValue = lumpSumInvestment * Math.pow(1 + r, n);
      const returns = futureValue - lumpSumInvestment;
      setInvestedAmount(lumpSumInvestment);
      setEstimatedReturns(returns);
    }
  }, [monthlyInvestment, lumpSumInvestment, expectedReturn, timePeriod, activeTab]);

  // Enhanced calculations to generate growth data for the line chart
  const growthData = useMemo(() => {
    const data = [];
    const monthlyRate = expectedReturn / 100 / 12;
    
    if (activeTab === 'SIP') {
      let totalInvested = 0;
      let currentValue = 0;
      
      for (let year = 0; year <= timePeriod; year++) {
        if (year === 0) {
          data.push({
            year,
            investedAmount: 0,
            estimatedValue: 0,
          });
          continue;
        }
        
        const monthsCompleted = year * 12;
        totalInvested = monthlyInvestment * monthsCompleted;
        currentValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, monthsCompleted) - 1) * (1 + monthlyRate)) / monthlyRate);
        
        data.push({
          year,
          investedAmount: totalInvested,
          estimatedValue: currentValue,
          estimatedReturns: currentValue - totalInvested
        });
      }
    } else {
      // Lumpsum calculation
      for (let year = 0; year <= timePeriod; year++) {
        const currentValue = lumpSumInvestment * Math.pow(1 + monthlyRate, year * 12);
        
        data.push({
          year,
          investedAmount: year === 0 ? 0 : lumpSumInvestment,
          estimatedValue: year === 0 ? 0 : currentValue,
          estimatedReturns: year === 0 ? 0 : currentValue - lumpSumInvestment
        });
      }
    }
    
    return data;
  }, [activeTab, monthlyInvestment, lumpSumInvestment, expectedReturn, timePeriod]);

  // Create chart data for pie chart
  const chartData = useMemo(() => [
    { name: 'Invested', value: investedAmount },
    { name: 'Returns', value: estimatedReturns }
  ], [investedAmount, estimatedReturns]);

  // Calculate total final value
  const totalValue = investedAmount + estimatedReturns;

  // Format currency
  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    } else {
      return `₹${Math.round(value).toLocaleString()}`;
    }
  };

  // Chart colors
  const COLORS = ['#059669', '#6366F1']; // Green and Indigo
  const GRADIENT_COLORS = {
    invested: ['#D1FAE5', '#059669'],
    returns: ['#E0E7FF', '#6366F1']
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-full">
      <div className="p-4 sm:p-6 border-b">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Investment Calculator</h2>
        <p className="text-sm sm:text-base text-gray-600">Plan your financial future with our calculator tools</p>
      </div>
      
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Left side - Input controls */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          <div className="relative w-fit mx-auto sm:mx-0 bg-gray-100 rounded-full p-1 flex items-center gap-1 mb-4 sm:mb-6">
            <motion.div
              className="absolute top-1 left-1 w-[100px] h-8 bg-white rounded-full shadow z-0"
              animate={{ translateX: activeTab === 'Lumpsum' ? 100 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setActiveTab('SIP')}
              className={`relative z-10 w-[100px] py-1 font-semibold text-sm rounded-full transition-colors ${
                activeTab === 'SIP' ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              SIP
            </button>
            <button
              onClick={() => setActiveTab('Lumpsum')}
              className={`relative z-10 w-[100px] py-1 font-semibold text-sm rounded-full transition-colors ${
                activeTab === 'Lumpsum' ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              Lumpsum
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {activeTab === 'SIP' ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-gray-700">
                      <FiDollarSign className="text-emerald-500" />
                      Monthly investment
                    </label>
                    <div className="bg-emerald-50 text-emerald-600 font-medium px-3 py-1 rounded-md">
                      ₹{monthlyInvestment.toLocaleString()}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹500</span>
                    <span>₹100,000</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-gray-700">
                      <FiDollarSign className="text-emerald-500" />
                      Lumpsum investment
                    </label>
                    <div className="bg-emerald-50 text-emerald-600 font-medium px-3 py-1 rounded-md">
                      {formatCurrency(lumpSumInvestment)}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={lumpSumInvestment}
                    onChange={(e) => setLumpSumInvestment(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹10,000</span>
                    <span>₹1 Cr</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <FiTrendingUp className="text-indigo-500" />
                Expected return rate (p.a)
              </label>
              <div className="bg-indigo-50 text-indigo-600 font-medium px-3 py-1 rounded-md">
                {expectedReturn}%
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <FiClock className="text-amber-500" />
                Time period (years)
              </label>
              <div className="bg-amber-50 text-amber-600 font-medium px-3 py-1 rounded-md">
                {timePeriod} years
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 year</span>
              <span>30 years</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Invested amount:</span>
              <span className="font-medium text-emerald-600">{formatCurrency(investedAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Est. returns:</span>
              <span className="font-medium text-indigo-600">{formatCurrency(estimatedReturns)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-gray-900 font-bold">Total value:</span>
              <span className="font-bold text-gray-900">{formatCurrency(totalValue)}</span>
            </div>
          </div>
        </div>

        {/* Right side - Charts */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg shadow p-3 sm:p-4 h-60 sm:h-72">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Growth Projection</h3>
            <div className="h-[calc(100%-2rem)]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={growthData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GRADIENT_COLORS.invested[0]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={GRADIENT_COLORS.invested[1]} stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={GRADIENT_COLORS.returns[0]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={GRADIENT_COLORS.returns[1]} stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                  <YAxis 
                    tickFormatter={(value) => {
                      if (value >= 10000000) return `${(value/10000000).toFixed(1)}Cr`;
                      if (value >= 100000) return `${(value/100000).toFixed(1)}L`;
                      return value;
                    }}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), ""]}
                    labelFormatter={(label) => `Year ${label}`}
                    contentStyle={{ borderRadius: '6px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="investedAmount" 
                    name="Invested" 
                    strokeWidth={2}
                    stroke={COLORS[0]} 
                    fill="url(#colorInvested)" 
                    stackId="1"
                    animationDuration={1000}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="estimatedReturns" 
                    name="Returns" 
                    strokeWidth={2}
                    stroke={COLORS[1]} 
                    fill="url(#colorReturns)" 
                    stackId="1"
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-white rounded-lg shadow p-3 sm:p-4 min-h-[300px]">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Final Breakdown</h3>
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
            <div className="flex-1 bg-gradient-to-br from-emerald-50 to-indigo-50 rounded-lg shadow p-4 h-auto sm:h-60">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">Summary</h3>
              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-gray-600">Final Amount:</span>
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</span>
                </div>
                <div className="flex gap-4 sm:gap-8">
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-gray-600">Returns:</div>
                    <div className="text-base sm:text-lg font-semibold text-indigo-600">{formatCurrency(estimatedReturns)}</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-gray-600">XIRR:</div>
                    <div className="text-base sm:text-lg font-semibold text-amber-600">{expectedReturn}%</div>
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
    </div>
  );
};