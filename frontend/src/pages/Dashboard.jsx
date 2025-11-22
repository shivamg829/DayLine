import React from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  TrendingUp,
  Calendar,
  Flag,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';

const Dashboard = () => {
  const context = useOutletContext();
  const tasks = context?.tasks || [];
  
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    highPriority: tasks.filter(task => task.priority && task.priority.toLowerCase() === 'high' && !task.completed).length,
  };
  const recentTasks = tasks.slice(0, 5);
  const upcomingTasks = tasks
    .filter(task => !task.completed && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-gray-600 text-sm mt-1">{title}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-blue-100">
          {stats.completed === stats.total && stats.total > 0
            ? "Amazing! You've completed all your tasks! 🎉"
            : `You have ${stats.pending} task${stats.pending !== 1 ? 's' : ''} pending today.`
          }
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={TrendingUp}
          color="bg-blue-500"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          color="bg-green-500"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={Clock}
          color="bg-amber-500"
        />
        <StatCard
          title="High Priority"
          value={stats.highPriority}
          icon={AlertTriangle}
          color="bg-red-500"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task._id} className="flex items-center justify-between p-3 rounded-lg border border-purple-50 hover:bg-purple-50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    task.completed ? 'bg-green-500' :
                    task.priority && task.priority.toLowerCase() === 'high' ? 'bg-red-500' :
                    task.priority && task.priority.toLowerCase() === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                </div>
                {task.dueDate && (
                  <span className="text-xs text-gray-500">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
            {recentTasks.length === 0 && (
              <p className="text-gray-500 text-center py-4">No tasks yet</p>
            )}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task._id} className="p-3 rounded-lg border border-amber-50 bg-amber-25">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {task.title}
                  </span>
                  <Flag className="w-4 h-4 text-amber-500" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {upcomingTasks.length === 0 && (
              <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;