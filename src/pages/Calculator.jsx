import React from "react";
import { useNavigate } from "react-router-dom";
import CalculatorCard from "../components/CalculatorCard";
import { motion } from "framer-motion";

// React Icons (Material Design)
import {
  MdSavings,
  MdAccountBalance,
  MdPayment,
  MdSwapHoriz,
  MdTrendingUp,
} from "react-icons/md";

const calculators = [
  {
    title: "SIP Calculator",
    description: "Calculate how much your systematic investment plan will grow over time",
    icon: MdSavings,
    route: "/calculator/sip",
    color: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
    iconBg: "bg-blue-500",
  },
  {
    title: "Fixed Deposit",
    description: "Check expected returns on your fixed deposits with different interest rates",
    icon: MdAccountBalance,
    route: "/calculator/fd",
    color: "from-green-50 to-green-100",
    borderColor: "border-green-200",
    iconBg: "bg-green-500",
  },
  {
    title: "EMI Calculator",
    description: "Plan your loan repayments by calculating EMIs for various loan types",
    icon: MdPayment,
    route: "/calculator/emi",
    color: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
    iconBg: "bg-purple-500",
  },
  {
    title: "SWP Calculator",
    description: "Estimate withdrawals from your investments using systematic withdrawal plans",
    icon: MdSwapHoriz,
    route: "/calculator/swp",
    color: "from-amber-50 to-amber-100",
    borderColor: "border-amber-200",
    iconBg: "bg-amber-500",
  },
  {
    title: "Mutual Fund Returns",
    description: "Project your mutual fund returns with different investment scenarios",
    icon: MdTrendingUp,
    route: "/calculator/mf",
    color: "from-rose-50 to-rose-100",
    borderColor: "border-rose-200",
    iconBg: "bg-rose-500",
  },
];

export const Calculator = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Financial Calculators
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Make informed financial decisions using our comprehensive suite of calculators
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {calculators.map((calc, index) => (
          <CalculatorCard
            key={calc.title}
            title={calc.title}
            description={calc.description}
            Icon={calc.icon}
            onClick={() => handleNavigation(calc.route)}
            color={calc.color}
            borderColor={calc.borderColor}
            iconBg={calc.iconBg}
            delay={index * 0.1}
          />
        ))}
      </motion.div>

      <motion.div
        className="mt-16 p-6 bg-emerald-50 rounded-2xl shadow-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-emerald-800 mb-2">Need financial advice?</h3>
        <p className="text-emerald-700 mb-4">
          Our calculators are just the beginning. Discover personalized investment recommendations.
        </p>
        <button
          onClick={() => navigate("/profile-form")}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
};
