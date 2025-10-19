import React from "react";
import { Calendar, Target, Folder, Settings, Plus } from "lucide-react";
import { useStore } from "../../store/useStore";

const Sidebar = () => {
  const { currentView, setCurrentView, user } = useStore();

  const navItems = [
    { icon: Calendar, label: "Tasks", view: "home" },
    { icon: Target, label: "Goals", view: "goals" },
    { icon: Folder, label: "Logs", view: "logs" },
    { icon: Settings, label: "Settings", view: "settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {user.avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">Let's get it done 💪</p>
          </div>
        </div>
        <button
          onClick={() => setCurrentView("task-form")}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;

            return (
              <li key={item.view}>
                <button
                  onClick={() => setCurrentView(item.view)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-red-50 text-red-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">Task Manager v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
