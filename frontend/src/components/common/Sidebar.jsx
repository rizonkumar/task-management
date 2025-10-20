import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Calendar, Target, Folder, Settings, Plus, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { icon: Calendar, label: "Tasks", path: "/" },
    { icon: Target, label: "Goals", path: "/goals" },
    { icon: Folder, label: "Logs", path: "/logs" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out shadow-lg`}>
      {/* Header with Toggle */}
      <div className={`${isCollapsed ? 'p-4' : 'p-6'} border-b border-gray-200`}>
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                {user?.avatar || user?.name?.[0] || "U"}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">
                  {user?.name || "User"}
                </p>
                <p className="text-sm text-gray-500 font-medium">Let's get it done 💪</p>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 mx-auto mb-2">
              {user?.avatar || user?.name?.[0] || "U"}
            </div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all hover:scale-105"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>
        
        {!isCollapsed && (
          <button
            onClick={() => navigate("/task-form")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105"
          >
            <Plus size={20} />
            New Task
          </button>
        )}
        
        {isCollapsed && (
          <button
            onClick={() => navigate("/task-form")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold p-3 rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105"
            title="New Task"
          >
            <Plus size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-xl transition-all group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 font-semibold shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                  title={isCollapsed ? item.label : ""}
                >
                  {({ isActive }) => (
                    <>
                      <Icon 
                        size={22} 
                        strokeWidth={isActive ? 2.5 : 2} 
                        className={isCollapsed ? "" : "flex-shrink-0"} 
                      />
                      {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-gray-200`}>
        {!isCollapsed && (
          <>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all group mb-3"
            >
              <LogOut size={20} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">Sign Out</span>
            </button>
            <p className="text-xs text-gray-400 text-center font-medium">Task Manager v1.0</p>
          </>
        )}
        
        {isCollapsed && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all group"
            title="Sign Out"
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
