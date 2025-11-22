import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setSidebarOpen(false); // Close sidebar on login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setSidebarOpen(false); // Close sidebar on logout
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    // Add a subtle animation trigger
    document.body.style.animation = 'none';
    setTimeout(() => {
      document.body.style.animation = 'fade-in 0.5s ease-out';
    }, 10);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4 animate-pulse">
              <div className="w-8 h-8 bg-white rounded-lg animate-bounce"></div>
            </div>
            <div className="absolute -inset-2 bg-blue-500/20 rounded-2xl blur-lg animate-ping"></div>
          </div>
          <p className="text-gray-600 font-medium mt-4 animate-pulse">Loading DayLine...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 transition-all duration-300">
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : isLogin ? (
                <Login 
                  onLogin={handleLogin} 
                  onSwitchMode={switchMode} 
                />
              ) : (
                <SignUp 
                  onLogin={handleLogin} 
                  onSwitchMode={switchMode} 
                />
              )
            } 
          />
          <Route 
            path="/" 
            element={
              user ? (
                <Layout 
                  user={user} 
                  onLogout={handleLogout} 
                  sidebarOpen={sidebarOpen}
                  onSidebarToggle={handleSidebarToggle}
                  onSidebarClose={handleSidebarClose}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="profile" element={<Profile />} />
            <Route 
              path="calendar" 
              element={
                <div className="p-6 animate-fade-in">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <div className="text-white text-2xl">📅</div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Calendar View</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Beautiful calendar interface coming soon! Track your tasks with an intuitive timeline view.
                    </p>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100 max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
                      <div className="text-sm text-gray-500 mb-4">Coming in next update</div>
                      <div className="animate-pulse">
                        <div className="grid grid-cols-7 gap-2 mb-4">
                          {[...Array(7)].map((_, i) => (
                            <div key={i} className="text-xs font-medium text-gray-400 text-center">SMTWTFS</div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {[...Array(35)].map((_, i) => (
                            <div key={i} className="h-8 bg-gray-100 rounded-lg"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="analytics" 
              element={
                <div className="p-6 animate-fade-in">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <div className="text-white text-2xl">📊</div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Advanced Analytics</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Deep insights into your productivity patterns and task completion trends.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 transform hover:scale-105 transition-all duration-300">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-100 flex items-center justify-center">
                          <div className="text-blue-600 text-lg">📈</div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Productivity Trends</h3>
                        <p className="text-sm text-gray-600">Track your performance over time</p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 transform hover:scale-105 transition-all duration-300">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-100 flex items-center justify-center">
                          <div className="text-green-600 text-lg">⏱️</div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Time Analysis</h3>
                        <p className="text-sm text-gray-600">Understand where your time goes</p>
                      </div>
                    </div>
                  </div>
                </div>
              } 
            />
            <Route 
              path="settings" 
              element={
                <div className="p-6 animate-fade-in">
                  <div className="max-w-4xl mx-auto text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                      <div className="text-white text-2xl">⚙️</div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">App Settings</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Customize your DayLine experience with powerful settings and preferences.
                    </p>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100 max-w-md mx-auto transform hover:scale-105 transition-all duration-300">
                      <div className="space-y-4 text-left">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <span className="text-sm font-medium text-gray-700">Dark Mode</span>
                          <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-300"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <span className="text-sm font-medium text-gray-700">Notifications</span>
                          <div className="w-12 h-6 bg-blue-500 rounded-full relative">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform duration-300"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <span className="text-sm font-medium text-gray-700">Email Reports</span>
                          <div className="w-12 h-6 bg-gray-300 rounded-full relative">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-300"></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 text-xs text-gray-500">More settings coming soon!</div>
                    </div>
                  </div>
                </div>
              } 
            />
          </Route>
          {/* Catch all route - redirect to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;