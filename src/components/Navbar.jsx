import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiPieChart,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { GiCash } from "react-icons/gi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout, loading } = useAuth();
  const { profile } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const showFullNav =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Get first initial for avatar
  const getInitial = () => {
    if (user && user.name) {
      return user.name[0].toUpperCase();
    }
    if (profile?.name) {
      return profile.name[0].toUpperCase();
    }
    return <FiUser />;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/20 bg-white/60 backdrop-blur-xl">
      <div className={`px-4 ${showFullNav ? "lg:pl-72" : ""}`}>
        <div className="max-w-7xl mx-auto h-16 flex justify-between items-center">
          <div
            className={`flex items-center ${
              showFullNav ? "lg:fixed lg:left-6 z-50" : ""
            }`}
          >
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 100,
                }}
                className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center"
              >
                <GiCash className="text-2xl text-white" />
              </motion.div>

              <motion.span
                className="text-2xl font-bold text-gray-800"
                initial={{ x: -15, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                InvestIQ
              </motion.span>
            </Link>
          </div>

          {showFullNav && <div className="w-36" />}

          <div className="flex items-center ml-auto">
            {!loading && isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    {getInitial()}
                  </div>
                  <span className="hidden sm:block text-gray-700">
                    {user?.name || profile?.name || "User"}
                  </span>
                  <FiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || profile?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        Risk:{" "}
                        {profile?.riskProfile
                          ? profile.riskProfile.charAt(0).toUpperCase() +
                            profile.riskProfile.slice(1)
                          : "Loading..."}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/fund-suggestions"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <FiPieChart className="text-gray-400" />
                        My Investments
                      </Link>
                      <Link
                        to="/profile-form"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <FiUser className="text-gray-400" />
                        Update Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <FiSettings className="text-gray-400" />
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 py-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <FiLogOut className="text-red-400" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : !loading ? (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-600 hover:text-emerald-500 transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="ml-6 px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
