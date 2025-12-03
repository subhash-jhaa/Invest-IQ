import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProfile } from "../context/ProfileContext";
import { FiLogOut, FiShield, FiBell, FiUser, FiLoader } from "react-icons/fi";
import Toast from "../components/Toast";
import { formatToRupees } from "../utils/formatters";

export default function Settings() {
  const { logout } = useAuth();
  const { user, updateName } = useAuth();
  const { profile, loading } = useProfile();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const [notifications, setNotifications] = useState({
    portfolio: true,
    market: false,
    news: true,
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FiLoader className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const settingsSections = [
    {
      id: "personal",
      title: "Personal Information",
      icon: <FiUser className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Editable Name Section with Avatar */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Name</p>
              {isEditingName ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value.slice(0, 50))}
                    maxLength={50}
                    className="border p-2 rounded-lg text-sm"
                    placeholder="Enter your name"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={async () => {
                        if (!newName.trim()) return;
                        setUpdating(true);
                        const result = await updateName(newName);
                        setUpdating(false);
                        if (result.success) {
                          setMessage("Name updated successfully!");
                          setIsEditingName(false);
                          setShowToast(true);
                          setToastMessage("Name updated successfully!");
                        } else {
                          setMessage(result.error || "Failed to update name.");
                        }
                      }}
                      disabled={updating}
                      className="px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-400 disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setNewName(user?.name || "");
                        setMessage("");
                      }}
                      className="px-3 py-1 text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>
                  {message && (
                    <p className="text-sm text-green-600">{message}</p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-semibold text-md">
                      {user?.name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {user?.name || "Not Set"}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* Email (read-only) */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-800">
                {user?.email || "Not Set"}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "profile",
      title: "Investment Profile",
      icon: <FiUser className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Risk Profile</p>
              <p className="text-lg font-semibold text-emerald-600">
                {profile?.riskAppetite || "Not Set"}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Monthly Investment</p>
              <p className="text-lg font-semibold text-blue-600">
                {profile ? formatToRupees(profile.capital) : "₹0"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Goal</p>
              <p className="text-lg font-semibold text-purple-600">
                {profile?.goal || "Not Set"}
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Timeline</p>
              <p className="text-lg font-semibold text-yellow-600">
                {profile ? `${profile.goalYears} Years` : "Not Set"}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/profile-form")}
            className="w-full px-4 py-2 text-emerald-500 border border-emerald-500 rounded-lg hover:bg-emerald-50"
          >
            Update Profile
          </button>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <FiBell className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div>
                  <p className="text-gray-900 font-medium capitalize">
                    {key} Updates
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive updates about your {key} activities
                  </p>
                </div>
              </label>
              <button
                onClick={() =>
                  setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enabled ? "bg-emerald-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-emerald-50">
          Manage your preferences and account details
        </p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-emerald-500">{section.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800">
                {section.title}
              </h2>
            </div>
            {section.content}
          </div>
        ))}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <FiShield className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-semibold text-gray-800">Security</h2>
          </div>
          <div className="space-y-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              <FiLogOut />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type="info"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
