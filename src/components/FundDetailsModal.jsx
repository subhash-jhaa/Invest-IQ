import { useEffect, useState } from "react";
import { FiX, FiInfo, FiTrendingUp, FiCalendar } from "react-icons/fi";
import { formatCurrency, formatPercentage } from "../utils/formatters";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function FundDetailsModal({ fund, onClose, onExplain }) {
  const [navHistory, setNavHistory] = useState([]);
  const [historicalData, setHistoricalData] = useState({
    maxNav: 0,
    minNav: Infinity,
    avgNav: 0,
  });

  useEffect(() => {
    const calculateNavHistory = () => {
      const data = [];
      let currentNav = fund.nav;
      let sumNav = currentNav;
      let maxNav = currentNav;
      let minNav = currentNav;

      // Get monthly returns with some randomization for realistic variation
      const getMonthlyReturn = (yearlyReturn) => {
        const baseMonthly = Math.pow(1 + yearlyReturn / 100, 1 / 12) - 1;
        const variation = (Math.random() - 0.5) * 0.002; // Add ±0.2% random variation
        return baseMonthly + variation;
      };

      // Generate 60 months (5 years) of historical data
      for (let i = 0; i < 60; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);

        // Determine which return to use based on the period
        let yearlyReturn;
        if (i < 12)
          yearlyReturn = fund.returns["1y"] || fund.returns.oneYear || 10;
        else if (i < 36)
          yearlyReturn = fund.returns["3y"] || fund.returns.threeYear || 8;
        else yearlyReturn = fund.returns["5y"] || fund.returns.fiveYear || 12;

        // Calculate NAV with realistic variations
        currentNav = currentNav / (1 + getMonthlyReturn(yearlyReturn));

        // Add some market volatility simulation
        const volatility = Math.sin(i / 3) * (currentNav * 0.02); // 2% volatility
        currentNav += volatility;

        // Track min/max
        maxNav = Math.max(maxNav, currentNav);
        minNav = Math.min(minNav, currentNav);
        sumNav += currentNav;

        data.unshift({
          date: date.toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          }),
          nav: parseFloat(currentNav.toFixed(2)),
          trend: parseFloat((currentNav * (1 + yearlyReturn / 100)).toFixed(2)),
        });
      }

      setHistoricalData({
        maxNav,
        minNav,
        avgNav: sumNav / (data.length + 1),
      });
      setNavHistory(data);
    };

    calculateNavHistory();
  }, [fund]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div
              key={index}
              className={`text-sm ${
                entry.name === "nav" ? "text-emerald-600" : "text-blue-600"
              }`}
            >
              <span className="font-medium">
                {entry.name === "nav" ? "NAV: " : "Trend: "}
              </span>
              {formatCurrency(entry.value)}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/20  backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{fund.name}</h3>
          <p className="text-gray-600">{fund.description}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">NAV History</h4>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Range: </span>
                {formatCurrency(historicalData.minNav)} -{" "}
                {formatCurrency(historicalData.maxNav)}
              </div>
              <button
                onClick={() => onExplain("NAV History Graph")}
                className="text-sm bg-white px-3 py-1 rounded-lg shadow-sm"
              >
                🧠 Learn
              </button>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={navHistory}>
                <defs>
                  <linearGradient id="navGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickMargin={10}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  tickFormatter={(value) => `₹${value}`}
                  domain={["auto", "auto"]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="nav"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#navGradient)"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="trend"
                  stroke="#3B82F6"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Legend />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Current NAV</div>
            <div className="text-xl font-bold text-emerald-600">
              {formatCurrency(fund.nav)}
            </div>
          </div>
          {Object.entries(fund.returns).map(([period, value]) => (
            <div key={period} className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">
                {period.toUpperCase()} Returns
              </div>
              <div className="text-xl font-bold text-blue-600">
                {formatPercentage(value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
