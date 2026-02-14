import { useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../context/ProfileContext";
import RiskTag from "../components/RiskTag";
import {
  FiEdit,
  FiTrendingUp,
  FiCalendar,
  FiTarget,
  FiPieChart,
  FiActivity,
  FiLoader,
  FiInfo,
  FiX,
} from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { formatToRupees, formatNumber } from "../utils/formatters";
import { useAuth } from "../context/AuthContext";
import { explainLike18 } from "../services/gemini";

export default function Dashboard() {
  const { profile, loading } = useProfile();
  const { user } = useAuth();
  const [explanation, setExplanation] = useState("");
  const [explainedTerm, setExplainedTerm] = useState("");
  const [explainLoading, setExplainLoading] = useState(false);

  const handleExplain = async (term) => {
    setExplainLoading(true);
    setExplainedTerm(term);
    try {
      const result = await explainLike18(term);
      if (result.success) {
        setExplanation(result.explanation);
      } else {
        setExplanation(`Sorry, I couldn't explain ${term} right now.`);
      }
    } catch (error) {
      console.error("Error getting explanation:", error);
      setExplanation(`Sorry, I couldn't explain ${term} right now.`);
    } finally {
      setExplainLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FiLoader className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to InvestIQ!
        </h2>
        <p className="text-gray-600 mb-6">
          Let's start by setting up your investment profile
        </p>
        <Link
          to="/profile-form"
          className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400"
        >
          <FiEdit className="mr-2" />
          Create Profile
        </Link>
      </div>
    );
  }

  const getRiskDisplayText = (riskValue) => {
    const riskMap = {
      low: "Conservative",
      medium: "Moderate",
      high: "Aggressive",
    };

    if (!riskValue) return "Moderate";
    return riskMap[riskValue.toLowerCase()] || riskValue;
  };

  const summaryCards = [
    {
      icon: <BiRupee className="w-6 h-6" />,
      label: "Monthly Investment",
      value: formatToRupees(profile.capital || 0),
      subtext: "Regular Investment",
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      label: "Investment Goal",
      value: profile.goal || "Wealth Creation",
      subtext: `${profile.goalYears || 0} years target`,
    },
    {
      icon: <FiPieChart className="w-6 h-6" />,
      label: "Risk Profile",
      value: (
        <div className="flex items-center gap-2">
          <RiskTag risk={profile.riskAppetite} />
          <button
            onClick={() =>
              handleExplain(profile.riskProfile || "Investment Risk Profile")
            }
            className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded flex items-center"
          >
            🧠 Explain
          </button>
        </div>
      ),
      subtext: "Investment Strategy",
    },
  ];

  const investmentMetrics = [
    {
      label: "Age",
      value: `${profile.age || 0} Years`,
      icon: <FiCalendar className="w-5 h-5" />,
    },
    {
      label: "Goal Period",
      value: `${profile.goalYears || 0} Years`,
      icon: <FiTarget className="w-5 h-5" />,
    },
    {
      label: "Risk Level",
      value: <RiskTag risk={profile.riskAppetite} />,
      icon: <FiActivity className="w-5 h-5" />,
    },
  ];

  // Calculate portfolio allocation based on risk appetite
  const getAllocation = () => {
    // Normalize risk appetite to lowercase for consistent comparison
    const riskLevel = profile.riskAppetite
      ? profile.riskAppetite.toLowerCase()
      : "medium";

    switch (riskLevel) {
      case "high":
        return { equity: 75, debt: 15, gold: 10 };
      case "medium":
      case "moderate":
        return { equity: 60, debt: 30, gold: 10 };
      case "low":
      case "conservative":
        return { equity: 40, debt: 50, gold: 10 };
      default:
        return { equity: 60, debt: 30, gold: 10 };
    }
  };

  const allocation = getAllocation();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-lg p-6 mb-8 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome, {user?.name || "Investor"}!
            </h1>
          </div>
          <Link
            to="/profile-form"
            className="inline-flex items-center px-3 py-2 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20 backdrop-blur-sm transition-colors"
          >
            <FiEdit className="mr-2" />
            Update Profile
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-white">{card.icon}</div>
                <h3 className="text-sm font-medium text-emerald-50">
                  {card.label}
                </h3>
              </div>
              <div className="text-2xl font-bold mb-1">{card.value}</div>
              <p className="text-sm text-emerald-100">{card.subtext}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Investment Metrics
          </h2>
          <div className="space-y-4">
            {investmentMetrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="text-emerald-500">{metric.icon}</div>
                  <span className="text-gray-600">{metric.label}</span>
                </div>
                <span className="font-semibold text-gray-800">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Portfolio Strategy
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Based on your{" "}
              {profile.riskProfile || getRiskDisplayText(profile.riskAppetite)}{" "}
              risk profile, we recommend:
            </p>
            <div className="space-y-4">
              {Object.entries(allocation).map(([type, percentage]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-gray-600 capitalize">
                    {type}
                    <button
                      onClick={() => handleExplain(type)}
                      className="ml-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded inline-flex items-center"
                    >
                      🧠 Explain
                    </button>
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          type === "equity"
                            ? "bg-emerald-500"
                            : type === "debt"
                            ? "bg-emerald-500"
                            : "bg-yellow-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-medium w-12 text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {profile.investmentType && profile.investmentType.length > 0 && (
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  AI-Recommended Investment Types
                  <button
                    onClick={() => handleExplain("Investment Types")}
                    className="ml-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded inline-flex items-center"
                  >
                    🧠 Explain
                  </button>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.investmentType.map((type, index) => (
                    <div
                      key={index}
                      className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {type}
                      <button
                        onClick={() => handleExplain(type)}
                        className="ml-1 bg-emerald-100 hover:bg-emerald-200 rounded-full w-5 h-5 inline-flex items-center justify-center"
                      >
                        🎓
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/fund-suggestions"
            className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 mt-6 transition-colors"
          >
            <FiTrendingUp className="mr-2" />
            View Recommended Funds
          </Link>
        </div>
      </div>

      {/* Explanation Modal */}
      {explanation && (
        <div className="fixed inset-0 backdrop-blur-xl  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setExplanation("")}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                <FiInfo className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-medium text-gray-800">
                Understanding {explainedTerm}
              </h3>
            </div>
            {explainLoading ? (
              <div className="text-center py-6">
                <FiLoader className="w-6 h-6 text-emerald-500 mx-auto mb-2 animate-spin" />
                <p className="text-gray-500">Getting explanation...</p>
              </div>
            ) : (
              <div className="text-gray-700 leading-relaxed">{explanation}</div>
            )}
            <div className="mt-6 text-right">
              <button
                onClick={() => setExplanation("")}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
