import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { useAuth } from "../context/AuthContext";
import {
  FiHome,
  FiPieChart,
  FiSettings,
  FiUser,
  FiMenu,
  FiX,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import { FaBloggerB } from "react-icons/fa";

import { IoIosCalculator } from "react-icons/io";
import { motion } from "framer-motion";
import { GiCash } from "react-icons/gi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { profile } = useProfile();
  const { user } = useAuth();

  const navigationItems = [
    {
      path: "/dashboard",
      icon: <FiHome className="w-5 h-5" />,
      label: "Overview",
      description: "Your investment dashboard",
    },
    {
      path: "/fund-suggestions",
      icon: <FiPieChart className="w-5 h-5" />,
      label: "Investments",
      description: "View recommended funds",
    },
    {
      path: "/profile-form",
      icon: <FiTarget className="w-5 h-5" />,
      label: "Risk Profile",
      description: "Update investment goals",
    },
    {
      path: "/calculator",
      icon: <IoIosCalculator className="w-5 h-5" />,
      label: "Calculator",
      description: "Calculate returns",
    },
    {
      path: "/blog",
      icon: <FaBloggerB className="w-5 h-5" />,
      label: "Blogs",
      description: "Read our latest blogs",
    },
    {
      path: "/settings",
      icon: <FiSettings className="w-5 h-5" />,
      label: "Settings",
      description: "Manage your account",
    },
  ];

  const isActivePath = (path) => location.pathname === path;

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest(".sidebar")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-400 transition-colors"
        aria-label="Toggle Menu"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.div>
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-40 transition-transform duration-300 ease-in-out w-72 pt-16 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Profile Summary */}
          {(profile || user) && (
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  {user?.name || profile?.name ? (
                    (user?.name || profile?.name)[0].toUpperCase()
                  ) : (
                    <FiUser />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {user?.name || profile?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <p className="text-xs text-gray-500">
                    Risk:{" "}
                    {profile?.riskProfile
                      ? profile.riskProfile.charAt(0).toUpperCase() +
                        profile.riskProfile.slice(1)
                      : "Loading..."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {navigationItems.map(({ path, icon, label, description }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-start gap-3 p-3 rounded-xl transition-colors
                    ${
                      isActivePath(path)
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {icon}
                  <div>
                    <span className="block font-medium">{label}</span>
                    <span className="text-xs text-gray-500">{description}</span>
                  </div>
                </Link>
              ))}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-gray-100">
            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiTrendingUp className="text-emerald-500" />
                <span className="text-sm font-medium text-gray-800">
                  Investment Tips
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Regular investments through SIP can help reduce market timing
                risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
