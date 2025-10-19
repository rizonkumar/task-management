import React from "react";
import { Calendar, Target, Folder, Settings } from "lucide-react";
import { useStore } from "../../store/useStore";

const BottomNav = () => {
  const { currentView, setCurrentView } = useStore();

  const navItems = [
    { icon: Calendar, label: "Tasks", view: "home" },
    { icon: Target, label: "Goals", view: "goals" },
    { icon: Folder, label: "Logs", view: "logs" },
    { icon: Settings, label: "Settings", view: "settings" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around py-3 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;

          return (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className="flex flex-col items-center p-2"
            >
              <Icon
                size={26}
                className={isActive ? "text-red-500" : "text-gray-400"}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
