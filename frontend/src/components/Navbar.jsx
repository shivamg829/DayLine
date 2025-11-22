import { useNavigate } from "react-router-dom";
import { CheckSquare, ChevronDown, LogOut, Settings, Menu } from "lucide-react";
import { useRef, useState } from "react";

const Navbar = ({ onLogout, user = {}, onMenuToggle }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const handleLogout = () => {
    setMenuOpen(false);
    onLogout();
  };

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gray-200 font-sans animate-slide-down">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
          >
            <Menu className="w-5 h-5 text-purple-600" />
          </button>
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-rose-500 shadow-lg group-hover:shadow-purple-300/50 group-hover:scale-105 transition-all duration-300">
              <CheckSquare className="w-6 h-6 text-white" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full shadow-md animate-ping"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 bg-clip-text text-transparent tracking-wide">
              DayLine
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="p-2 text-gray-600 hover:text-rose-500 transition-all duration-300 hover:bg-rose-50 rounded-full transform hover:scale-110" 
            onClick={() => navigate('/profile')}
          >
            <Settings className="w-5 h-5" />
          </button>
          <div ref={menuRef} className="relative">
            <button onClick={handleMenuToggle} className="flex items-center gap-2 px-3 py-3 rounded-full cursor-pointer hover:bg-rose-50 transition-all duration-300 border border-transparent hover:border-rose-200 transform hover:scale-105">
              <div className="flex items-center gap-2">
                <div className="relative">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-9 h-9 rounded-full shadow-sm" />
                  ) : (
                    <div className="w-8 h-8 items-center justify-center flex rounded-full bg-gradient-to-br from-blue-500 to-rose-500 text-white font-semibold shadow-md">
                      {user.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500 font-normal">{user.email}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${menuOpen ? 'rotate-180' : ''}`} />
            </button>
            {menuOpen && (
              <ul className="absolute top-14 right-0 w-56 bg-white rounded-2xl shadow-xl border border-rose-100 z-50 overflow-hidden animate-fade-in">
                <li className="p-2">
                  <button onClick={() => { setMenuOpen(false); navigate('/profile'); }} className="w-full px-4 py-2.5 text-left hover:bg-rose-50 text-sm text-gray-700 transition-all duration-300 flex items-center gap-2 group transform hover:translate-x-2" role="menuitem">
                    <Settings className="w-4 h-4 text-gray-700 transition-transform duration-300 group-hover:scale-110" />
                    Profile Setting
                  </button>
                </li>
                <li className="p-2">
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-red-50 text-red-600 transition-all duration-300 transform hover:translate-x-2">
                    <LogOut className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;