import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  CheckSquare, 
  Calendar,
  BarChart3,
  Settings,
  X,
  User,
  Bell,
  Target,
  Sparkles
} from 'lucide-react';

const Sidebar = ({ user, tasks, isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', badge: null },
    { icon: CheckSquare, label: 'My Tasks', href: '/tasks', badge: tasks?.length || 0 },
    // { icon: Calendar, label: 'Calendar', href: '/calendar', badge: null },
    // { icon: BarChart3, label: 'Analytics', href: '/analytics', badge: 'New' },
    // { icon: Settings, label: 'Settings', href: '/settings', badge: null },
  ];
  
  const stats = React.useMemo(() => {
    const completed = tasks?.filter(task => task.completed === true).length || 0;
    const total = tasks?.length || 0;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, completionRate };
  }, [tasks]);

  const handleNavigation = (href) => {
    navigate(href);
    onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-white/95 backdrop-blur-xl shadow-2xl border-r border-purple-100/50 z-50
        transition-all duration-300 ease-in-out transform
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-64'}
        flex flex-col
      `}>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-xl hover:bg-purple-50 transition-all duration-300 z-50"
        >
          <X className="w-5 h-5 text-purple-600" />
        </button>

        {/* Sidebar Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* User Info */}
          <div className="p-6 border-b border-purple-100/50">
            <div className="flex items-center gap-3 transition-all duration-300">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-800 truncate">
                  {user?.name || 'Welcome Back'}
                </h2>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email || 'Ready to be productive?'}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-4 border-b border-purple-100/30">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-xl bg-blue-50/80 border border-blue-100/50 backdrop-blur-sm">
                <p className="text-lg font-bold text-blue-600">{stats.total}</p>
                <p className="text-xs text-blue-500 font-medium">Total</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-green-50/80 border border-green-100/50 backdrop-blur-sm">
                <p className="text-lg font-bold text-green-600">{stats.completed}</p>
                <p className="text-xs text-green-500 font-medium">Done</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-amber-50/80 border border-amber-100/50 backdrop-blur-sm">
                <p className="text-lg font-bold text-amber-600">{stats.pending}</p>
                <p className="text-xs text-amber-500 font-medium">Pending</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1">
            <ul className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group relative
                        ${isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                          : 'text-gray-600 hover:bg-purple-50/80 hover:text-purple-700 hover:shadow-md'
                        }
                      `}
                    >
                      <div className={`
                        p-2 rounded-xl transition-all duration-300 flex-shrink-0
                        ${isActive
                          ? 'bg-white/20'
                          : 'bg-gray-100/60 group-hover:bg-purple-100/60'
                        }
                      `}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                      </div>
                      <span className="font-semibold flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className={`
                          px-2 py-1 text-xs rounded-full font-medium
                          ${isActive
                            ? 'bg-white/20 text-white'
                            : typeof item.badge === 'number'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-amber-100 text-amber-700'
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Progress Section */}
          <div className="p-4">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-4 border border-blue-100/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-semibold text-gray-800">Today's Progress</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-600">Completion</span>
                  <span className="text-sm font-bold text-purple-600">
                    {stats.completionRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200/60 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${stats.completionRate}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">
                    {stats.completed} completed
                  </span>
                  <span className="text-gray-500">
                    {stats.pending} remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-100/30 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-blue-100/50">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                Daily Goal
              </p>
              <p className="text-xs text-gray-500">
                {stats.completed} tasks done
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;