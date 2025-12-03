// src/components/CalculatorCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const CalculatorCard = ({
  title,
  description,
  Icon,
  onClick,
  color = "from-emerald-50 to-emerald-100",
  borderColor = "border-emerald-200",
  iconBg = "bg-emerald-500",
  delay = 0
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`cursor-pointer rounded-xl border ${borderColor} bg-gradient-to-br ${color} hover:shadow-xl transition-all duration-300 overflow-hidden h-full`}
      whileHover={{
        scale: 1.03,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`${iconBg} w-12 h-12 rounded-lg flex items-center justify-center shadow-md text-white`}
          >
            <Icon size={24} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 flex-grow mb-4">{description}</p>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Calculate Now</span>
          <motion.div
            className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center"
            whileHover={{ x: 5, backgroundColor: "#f0fdf4" }}
          >
            <FiArrowRight className="text-gray-700" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CalculatorCard;
