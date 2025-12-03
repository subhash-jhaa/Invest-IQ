import { useEffect, useState } from "react";
import { useProfile } from "../context/ProfileContext";
import { getFundsByRisk, mapRiskToleranceToProfile } from "../data/fundData";
import FundCard from "../components/FundCard";
import RiskTag from "../components/RiskTag";
import { FiAlertCircle, FiLoader, FiInfo, FiX, FiFilter, FiGrid, FiList } from "react-icons/fi";
import { BiRupee } from "react-icons/bi";
import { formatToRupees } from "../utils/formatters";
import { explainLike18 } from "../services/gemini";
import { fetchGoldPrice } from "../services/goldService";
import GoldCard from "../components/GoldCard";

export default function FundSuggestions() {
  const { profile, loading } = useProfile();
  const [recommendedFunds, setRecommendedFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [explanation, setExplanation] = useState("");
  const [explainedTerm, setExplainedTerm] = useState("");
  const [explainLoading, setExplainLoading] = useState(false);
  const [goldData, setGoldData] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilter, setActiveFilter] = useState('all');

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

  useEffect(() => {
    if (profile) {
      try {
        // First, try to use AI-suggested risk profile if available
        let riskProfile;

        if (profile.riskProfile) {
          // Convert AI-generated risk profile to match our system's risk profile format
          const aiRiskProfile = profile.riskProfile.toLowerCase().trim();
          if (aiRiskProfile === "conservative" || aiRiskProfile === "low") {
            riskProfile = "conservative";
          } else if (
            aiRiskProfile === "aggressive" ||
            aiRiskProfile === "high"
          ) {
            riskProfile = "aggressive";
          } else {
            riskProfile = "moderate";
          }
        } else {
          // Fallback to using the risk appetite
          riskProfile = mapRiskToleranceToProfile(profile.riskAppetite);
        }

        console.log("Using risk profile:", riskProfile);
        let funds = getFundsByRisk(riskProfile);

        // If still no funds found, show some default funds
        if (funds.length === 0) {
          console.log(
            "No funds found for risk profile, using moderate as fallback"
          );
          funds = getFundsByRisk("moderate");
        }

        // Filter funds by investment types if AI has provided them
        if (
          profile.investmentType &&
          profile.investmentType.length > 0 &&
          funds.length > 0
        ) {
          // Create a normalized array of investment types (lowercase for comparison)
          const normalizedTypes = profile.investmentType.map((type) =>
            type.toLowerCase()
          );

          // Filter funds that match at least one of the investment types
          const filteredFunds = funds.filter((fund) => {
            // Safely check if fund.type exists before calling toLowerCase()
            const fundType = fund.type || fund.category || "";

            // Compare fund type (lowercase) with our normalized investment types
            return normalizedTypes.some((type) => {
              return (
                fundType.toLowerCase().includes(type.toLowerCase()) ||
                type.includes(fundType.toLowerCase())
              );
            });
          });

          // Only use filtered funds if we found matches, otherwise keep all funds for the risk profile
          if (filteredFunds.length > 0) {
            funds = filteredFunds;
          } else {
            console.log(
              "No funds match investment types, showing all funds for risk profile"
            );
          }
        }

        console.log("Final filtered funds:", funds);
        setRecommendedFunds(funds);
      } catch (error) {
        console.error("Error fetching recommended funds:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    const fetchGoldData = async () => {
      try {
        const data = await fetchGoldPrice();
        setGoldData(data);
      } catch (error) {
        console.error("Error fetching gold data:", error);
      }
    };

    fetchGoldData();
    // Refresh gold price every 5 minutes
    const interval = setInterval(fetchGoldData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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
        <FiAlertCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Profile Required
        </h2>
        <p className="text-gray-600">
          Please complete your investment profile first.
        </p>
      </div>
    );
  }

  // Calculate portfolio allocation based on risk appetite
  const getAllocation = () => {
    // Get normalized risk profile
    const riskProfile = mapRiskToleranceToProfile(profile.riskAppetite);

    switch (riskProfile) {
      case "aggressive":
        return { equity: 75, debt: 15, gold: 10 };
      case "moderate":
        return { equity: 60, debt: 30, gold: 10 };
      case "conservative":
        return { equity: 40, debt: 50, gold: 10 };
      default:
        return { equity: 60, debt: 30, gold: 10 };
    }
  };

  const allocation = getAllocation();

  // Group funds by category
  const groupedFunds = recommendedFunds.reduce((acc, fund) => {
    const category = fund.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(fund);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Smart Investment Recommendations
          </h1>
          <p className="text-emerald-50 text-sm sm:text-base mb-6">
            Personalized investment suggestions powered by AI, tailored to your risk profile
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <RiskTag risk={profile.riskAppetite} className="scale-110" />
            <button
              onClick={() => handleExplain(profile.riskProfile || "Investment Risk Profile")}
              className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              🧠 <span className="hidden sm:inline">Understand</span> Risk Profile
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gold Section */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 sm:p-6">
            <GoldCard goldData={goldData} onExplain={handleExplain} />
          </div>

          {/* Fixed Funds Section */}
          <div className="bg-white rounded-xl shadow-md">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    AI-Recommended Funds
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Personalized recommendations based on your {profile.riskProfile || 'risk profile'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${
                        viewMode === 'grid' 
                          ? 'bg-white shadow text-emerald-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <FiGrid />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${
                        viewMode === 'list' 
                          ? 'bg-white shadow text-emerald-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <FiList />
                    </button>
                  </div>
                  <button
                    onClick={() => handleExplain("Recommended Funds")}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors"
                  >
                    🧠 <span className="hidden sm:inline">Learn</span>
                  </button>
                </div>
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeFilter === 'all'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Funds
                </button>
                {Object.keys(groupedFunds).map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeFilter === category
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {isLoading ? (
                <div className="text-center py-12">
                  <FiLoader className="w-8 h-8 text-emerald-500 mx-auto mb-3 animate-spin" />
                  <p className="text-gray-500">Finding the best funds for you...</p>
                </div>
              ) : recommendedFunds.length > 0 ? (
                <div className="space-y-6">
                  {activeFilter === 'all' ? (
                    Object.entries(groupedFunds).map(([category, funds]) => (
                      <div key={category}>
                        <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                          {category}
                          <button
                            onClick={() => handleExplain(category)}
                            className="ml-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                          >
                            🧠
                          </button>
                        </h3>
                        <div className={`grid gap-4 sm:gap-6 ${
                          viewMode === 'grid' ? 'sm:grid-cols-2' : 'grid-cols-1'
                        }`}>
                          {funds.map((fund) => (
                            <FundCard
                              key={fund.code}
                              fund={fund}
                              onExplain={handleExplain}
                            />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={`grid gap-4 sm:gap-6 ${
                      viewMode === 'grid' ? 'sm:grid-cols-2' : 'grid-cols-1'
                    }`}>
                      {groupedFunds[activeFilter]?.map((fund) => (
                        <FundCard
                          key={fund.code}
                          fund={fund}
                          onExplain={handleExplain}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 bg-yellow-50 rounded-lg">
                  <FiAlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-gray-700">
                    No funds match your AI-generated risk profile. Please update
                    your profile.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Investment Summary Card */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Investment Summary
            </h2>
            <div className="space-y-4">
              <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Monthly Investment</p>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
                  {formatToRupees(profile.capital)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Goal</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {profile.goal}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Timeline</p>
                  <p className="text-lg font-semibold text-purple-600">
                    {profile.goalYears} Years
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Asset Allocation Card */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Asset Allocation
              </h2>
              <button
                onClick={() => handleExplain("Asset Allocation")}
                className="text-sm bg-gray-50 hover:bg-gray-100 px-3 py-1 rounded-lg"
              >
                🧠 Learn
              </button>
            </div>
            
            <div className="space-y-4">
              {Object.entries(allocation).map(([type, percentage]) => (
                <div key={type} className="group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600 capitalize flex items-center gap-2">
                      {type}
                      <button
                        onClick={() => handleExplain(type)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                      >
                        🧠
                      </button>
                    </span>
                    <span className="text-gray-900 font-medium">
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        type === "equity"
                          ? "bg-emerald-500"
                          : type === "debt"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Strategy Card */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              AI-Suggested Investment Strategy
              <button
                onClick={() => handleExplain("Investment Strategy")}
                className="ml-2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded inline-flex items-center"
              >
                🧠 Explain
              </button>
            </h3>
            {profile.investmentType && profile.investmentType.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.investmentType.map((type, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {type}
                    <button
                      onClick={() => handleExplain(type)}
                      className="ml-1 bg-blue-100 hover:bg-blue-200 rounded-full w-5 h-5 inline-flex items-center justify-center"
                    >
                      🎓
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Update your profile to get AI-powered investment strategies
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Explanation Modal */}
      {explanation && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative animate-fadeIn">
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
