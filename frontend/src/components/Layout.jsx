import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useCallback, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Circle, Clock, TrendingUp, Zap } from "lucide-react";
import { API_BASE_URL } from '../config';

const Layout = ({ onLogout, user, sidebarOpen, onSidebarToggle, onSidebarClose }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        return;
      }
      const { data } = await axios.get(`${API_BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(data.tasks || []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.response?.data?.message || err.message || "Could not load tasks.");
      if (err.response?.status === 401) {
        onLogout?.();
      }
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [fetchTasks, user]);

  const stats = useMemo(() => {
    const completedTasks = tasks.filter(t => t.completed === true).length;
    const totalCount = tasks.length;
    const pendingTasks = totalCount - completedTasks;
    const completionPercentage = totalCount ? Math.round((completedTasks / totalCount) * 100) : 0;
    return {
      totalCount,
      completedTasks,
      pendingTasks,
      completionPercentage,
    };
  }, [tasks]);

  const StatCard = ({ title, value, icon }) => (
    <div className="p-2 sm:p-3 rounded-xl bg-white shadow-sm border border-purple-100 hover:shadow-md transition-all duration-300 hover:border-purple-100 group transform hover:-translate-y-1">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {value}
          </p>
          <p className="text-xs text-gray-500 font-semibold">{title}</p>
        </div>
      </div>
    </div>
  );

  if (loading && tasks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (error && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex items-center justify-center">
        <div className="bg-white text-red-600 p-6 rounded-2xl border border-red-100 max-w-md text-center shadow-lg">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <Zap className="w-8 h-8 text-red-500" />
          </div>
          <p className="font-semibold text-lg mb-2">Error loading tasks</p>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchTasks}
            className="py-2.5 px-6 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-all transform hover:scale-105 shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex">
      <Sidebar 
        user={user} 
        tasks={tasks} 
        isOpen={sidebarOpen} 
        onClose={onSidebarClose} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          user={user} 
          onLogout={onLogout} 
          onMenuToggle={onSidebarToggle} 
        />
        
        <main className="flex-1 pt-16 transition-all duration-300 ml-0 lg:ml-64">
          <div className="p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
              <div className="xl:col-span-2 space-y-3 sm:space-y-4 animate-slide-up">
                <Outlet context={{ tasks, refreshTasks: fetchTasks, loading, error }} />
              </div>
              <div className="xl:col-span-1 space-y-4 sm:space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-500 animate-pulse" />
                    Task Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <StatCard
                      title="Total Tasks"
                      value={stats.totalCount}
                      icon={<Circle className="w-4 h-4 text-purple-500" />}
                    />
                    <StatCard
                      title="Completed"
                      value={stats.completedTasks}
                      icon={<Circle className="w-4 h-4 text-green-500" />}
                    />
                    <StatCard
                      title="Pending"
                      value={stats.pendingTasks}
                      icon={<Circle className="w-4 h-4 text-amber-500" />}
                    />
                    <StatCard
                      title="Completion %"
                      value={`${stats.completionPercentage}%`}
                      icon={<Zap className="w-4 h-4 text-blue-500" />}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">Progress</span>
                      <span className="text-purple-600 font-semibold">
                        {stats.completedTasks}/{stats.totalCount}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200/60 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out shadow-md"
                        style={{ width: `${stats.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/20">
                  <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500 animate-bounce" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {tasks.slice(0, 3).map((task, index) => (
                      <div 
                        key={task._id} 
                        className="flex items-center justify-between p-3 hover:bg-purple-50/50 rounded-xl transition-all duration-300 border border-transparent hover:border-purple-100 transform hover:-translate-y-0.5"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 line-clamp-1">
                            {task.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "No date"}
                          </p>
                        </div>
                        <span className={`px-3 py-1 text-xs rounded-full font-medium transition-all duration-300 transform hover:scale-110 ${
                          task.completed 
                            ? "bg-green-100 text-green-700 shadow-sm" 
                            : "bg-amber-100 text-amber-700 shadow-sm"
                        }`}>
                          {task.completed ? "Done" : "Pending"}
                        </span>
                      </div>
                    ))}
                    {tasks.length === 0 && (
                      <div className="text-center py-8 px-2">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-100 flex items-center justify-center">
                          <Clock className="w-8 h-8 text-purple-500"/>
                        </div>
                        <p className="text-gray-600 font-medium">No recent activity</p>
                        <p className="text-sm text-gray-400 mt-1">Tasks will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;