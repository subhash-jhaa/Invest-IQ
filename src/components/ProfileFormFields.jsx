import { FiCalendar, FiDollarSign, FiTarget } from 'react-icons/fi'

export default function ProfileFormFields({ formData, handleChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Age
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiCalendar className="text-gray-400" />
          </div>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter your age"
            min="18"
            max="100"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Investment Period (Years)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiCalendar className="text-gray-400" />
          </div>
          <input
            type="number"
            name="investmentPeriod"
            value={formData.investmentPeriod}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="How long do you plan to invest?"
            min="1"
            max="30"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Initial Investment Amount ($)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiDollarSign className="text-gray-400" />
          </div>
          <input
            type="number"
            name="initialInvestment"
            value={formData.initialInvestment}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter amount in USD"
            min="100"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Risk Tolerance
        </label>
        <select
          name="riskTolerance"
          value={formData.riskTolerance}
          onChange={handleChange}
          className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          required
        >
          <option value="">Select your risk tolerance</option>
          <option value="1">Very Conservative</option>
          <option value="2">Conservative</option>
          <option value="3">Moderate</option>
          <option value="4">Aggressive</option>
          <option value="5">Very Aggressive</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Investment Goal
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiTarget className="text-gray-400" />
          </div>
          <select
            name="investmentGoal"
            value={formData.investmentGoal}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            <option value="">Select your primary goal</option>
            <option value="capital-preservation">Capital Preservation</option>
            <option value="balanced-growth">Balanced Growth</option>
            <option value="aggressive-growth">Aggressive Growth</option>
          </select>
        </div>
      </div>
    </div>
  )
}