import React from 'react';
import './App.css';
import { useStore } from './store/useStore';
import HomePage from './pages/HomePage';
import TaskDetailPage from './pages/TaskDetailPage';
import TaskFormPage from './pages/TaskFormPage';
import LogsPage from './pages/LogsPage';
import SettingsPage from './pages/SettingsPage';
import BottomNav from './components/common/BottomNav';
import Sidebar from './components/common/Sidebar';

function App() {
  const currentView = useStore((state) => state.currentView);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="md:hidden pb-20">
        <main className="max-w-md mx-auto">
          {currentView === 'home' && <HomePage />}
          {currentView === 'task-detail' && <TaskDetailPage />}
          {currentView === 'task-form' && <TaskFormPage />}
          {currentView === 'logs' && <LogsPage />}
          {currentView === 'settings' && <SettingsPage />}
        </main>
        <BottomNav />
      </div>

      <div className="hidden md:flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {currentView === 'home' && <HomePage />}
            {currentView === 'task-detail' && <TaskDetailPage />}
            {currentView === 'task-form' && <TaskFormPage />}
            {currentView === 'logs' && <LogsPage />}
            {currentView === 'settings' && <SettingsPage />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
