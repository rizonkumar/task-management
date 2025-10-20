import React, { useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Bell,
  Moon,
  Globe,
  Shield,
  HelpCircle,
  LogOut,
  Camera,
  Save,
  X,
} from "lucide-react";
import { useStore } from "../store/useStore";

const SettingsPage = () => {
  const { user, setCurrentView } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: "rizon@example.com",
    avatar: user.avatar,
  });

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
    emailNotifications: true,
    pushNotifications: false,
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setCurrentView("home");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-0">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView("home")}
            className="md:hidden w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Settings
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your account and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Profile</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-red-500 hover:text-red-600 font-medium text-sm"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user?.name || "",
                      email: user?.email || "",
                      avatar: user?.avatar || "",
                    });
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group">
                <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {formData.avatar}
                </div>
                {isEditing && (
                  <button className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="text-white" />
                  </button>
                )}
              </div>
              <span className="text-sm text-gray-500">Profile Picture</span>
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              {isEditing && (
                <button className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center gap-2">
                  <Lock size={16} />
                  Change Password
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Preferences</h2>
          <div className="space-y-4">
            {/* Notifications */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive app notifications
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    notifications: !settings.notifications,
                  })
                }
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  settings.notifications ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.notifications ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Moon size={20} className="text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-500">Toggle dark theme</p>
                </div>
              </div>
              <button
                onClick={() =>
                  setSettings({ ...settings, darkMode: !settings.darkMode })
                }
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  settings.darkMode ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.darkMode ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Language</p>
                  <p className="text-sm text-gray-500">English (US)</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <ArrowLeft size={20} className="rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Notification Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Get updates via email</p>
              </div>
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    emailNotifications: !settings.emailNotifications,
                  })
                }
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  settings.emailNotifications ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.emailNotifications ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Browser notifications</p>
              </div>
              <button
                onClick={() =>
                  setSettings({
                    ...settings,
                    pushNotifications: !settings.pushNotifications,
                  })
                }
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  settings.pushNotifications ? "bg-red-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.pushNotifications ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Support & About */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Support & About
          </h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left">
              <HelpCircle size={20} className="text-gray-600" />
              <span className="font-medium text-gray-900">Help Center</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left">
              <Shield size={20} className="text-gray-600" />
              <span className="font-medium text-gray-900">Privacy Policy</span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-100">
          <h2 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-red-50 rounded-xl transition-colors text-left group"
            >
              <LogOut
                size={20}
                className="text-gray-600 group-hover:text-red-500"
              />
              <span className="font-medium text-gray-900 group-hover:text-red-600">
                Logout
              </span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-left">
              <X size={20} className="text-red-500" />
              <span className="font-medium text-red-600">Delete Account</span>
            </button>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center text-sm text-gray-400 py-4">
          Task Manager v1.0.0
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
