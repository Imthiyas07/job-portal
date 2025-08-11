import { useState, useEffect } from "react";
import { Briefcase, Building2, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NAVIGATION_MENU } from "../../utils/data";
import ProfileDropdown from "./ProfileDropdown";
import logo from "../../assets/nxtserve-logo.png";

// Color replacements applied:
// bg-gray-50 → bg-[#FEF7F4]/95
// bg-white → bg-[#FEFAF9]
// border-gray-200 → border-[#FEFAF9]
// text-gray-900 → text-[#2A2A2A]
// text-gray-600 → text-[#6B6A6A]
// text-gray-500 → text-[#6B6A6A]
// hover:text-gray-900 → hover:text-[#2A2A2A]
// hover:bg-gray-50 → hover:bg-[#FEFAF9]
// bg-gray-100 → bg-[#FEFAF9]

const NavigationItem = ({ item, isActive, onClick, isCollapsed }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
        isActive
          ? "bg-[#FEFAF9] text-[#2A2A2A] shadow-sm shadow-[#FEFAF9]"
          : "text-[#6B6A6A] hover:bg-[#FEFAF9] hover:text-[#2A2A2A]"
      }`}
    >
      <Icon
        className={`h-5 w-5 flex-shrink-0 ${
          isActive ? "text-[#EB611F]" : "text-[#6B6A6A]"
        }`}
      />
      {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
    </button>
  );
};

const DashboardLayout = ({ activeMenu, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(activeMenu || "dashboard");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);

  const handleNavigation = (itemId) => {
    setActiveNavItem(itemId);
    navigate(`/${itemId}`);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarCollapsed = !isMobile && false;

  return (
    <div className="flex h-screen bg-[#FEF7F4]/95">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform ${
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        } ${sidebarCollapsed ? "w-16" : "w-64"} bg-[#FEFAF9] border-r border-[#FEFAF9]`}
      >
        {/* Company Logo */}
        <div className="flex items-center h-16 border-b border-[#FEFAF9] pl-6">
          {!sidebarCollapsed ? (
            <Link className="flex items-center space-x-3" to="/">
              <div className="w-20 h-25 rounded-lg flex items-center justify-center">
               <img src={logo} alt="NxtServe Logo" className="w-20 h-22 text-white" />
              </div>
            </Link>
          ) : (
            <div className="h-8 w-8 bg-[#EB611F] rounded-xl flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {NAVIGATION_MENU.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={activeNavItem === item.id}
              onClick={handleNavigation}
              isCollapsed={sidebarCollapsed}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-[#6B6A6A] hover:bg-[#FEFAF9] hover:text-[#2A2A2A] transition-all duration-200"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 flex-shrink-0 text-[#6B6A6A]" />
            {!sidebarCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/0 bg-opacity-25 z-40 backdrop-blur-xs"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Top navbar */}
        <header className="bg-[#FEFAF9]/80 backdrop-blur-sm border-b border-[#FEFAF9] h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-[#FEFAF9] transition-colors duration-200"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5 text-[#6B6A6A]" />
                ) : (
                  <Menu className="h-5 w-5 text-[#6B6A6A]" />
                )}
              </button>
            )}
            <div>
              <h1 className="text-base font-semibold text-[#2A2A2A]">
                Welcome back!
              </h1>
              <p className="text-sm text-[#6B6A6A] hidden sm:block">
                Here's what's happening with your jobs today.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ProfileDropdown
              isOpen={profileDropdownOpen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdownOpen(!profileDropdownOpen);
              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              email={user?.email || ""}
              onLogout={logout}
            />
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
