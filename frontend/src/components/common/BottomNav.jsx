import React from "react";
import { NavLink } from "react-router-dom";
import { Calendar, Target, Folder, Settings } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { icon: Calendar, label: "Tasks", path: "/" },
    { icon: Target, label: "Goals", path: "/goals" },
    { icon: Folder, label: "Logs", path: "/logs" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 safe-area-bottom shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => 
                `flex flex-col items-center p-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50" 
                    : "hover:bg-gray-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={24}
                    className={`transition-all ${
                      isActive 
                        ? "text-blue-600 scale-110" 
                        : "text-gray-500"
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className={`text-xs mt-1 font-medium transition-colors ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
