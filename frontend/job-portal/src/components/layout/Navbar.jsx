import { useState, useEffect } from "react";
import { Briefcase, Bookmark } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import logo from "../../assets/nxtserve-logo.png";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FEFAF9]/95 backdrop-blur-sm border-b border-[#FEFAF9]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-20 h-25 rounded-lg flex items-center justify-center">
             <img src={logo} alt="NxtServe Logo" className="w-22 h-20 text-white" />
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {user && (
              <button
                className="p-2 rounded-xl hover:bg-[#FEFAF9] transition-colors duration-200 relative"
                onClick={() => navigate("/saved-jobs")}
              >
                <Bookmark className="h-5 w-5 text-[#6B6A6A]" />
              </button>
            )}

            {isAuthenticated ? (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation();
                  setProfileDropdownOpen(!profileDropdownOpen);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                userRole={user?.role || ""}
                onLogout={logout}
              />
            ) : (
              <>
                <a
                  href="/login"
                  className="text-[#6B6A6A] hover:text-[#2A2A2A] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-[#FEFAF9]"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-[#EB611F] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#EB611F]/90 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
