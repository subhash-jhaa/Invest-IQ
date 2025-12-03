import { FiClock } from "react-icons/fi";
import { formatCurrency } from "../utils/formatters";
import FundCard from "./FundCard";
import { goldFunds } from "../data/goldFunds";

export default function GoldCard({ goldData, onExplain }) {
  if (!goldData) return null;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">
              Live Gold Price (22K)
            </span>
            {goldData.isCache && (
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Cached
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            <FiClock className="inline mr-1" />
            {new Date(goldData.timestamp * 1000).toLocaleTimeString()}
          </span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {formatCurrency(goldData.price_gram_24k)}
          <span className="text-sm text-gray-500 ml-1">per gram</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          Recommended Gold Funds
          <button
            onClick={() => onExplain("Gold Mutual Funds and ETFs")}
            className="ml-2 text-xs bg-yellow-100 hover:bg-yellow-200 px-2 py-1 rounded"
          >
            🧠 Learn
          </button>
        </h3>
        <div className="grid gap-4">
          {goldFunds.map((fund) => (
            <FundCard key={fund.code} fund={fund} onExplain={onExplain} />
          ))}
        </div>
      </div>
    </div>
  );
}
