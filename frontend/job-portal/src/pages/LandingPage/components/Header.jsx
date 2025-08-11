import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import logo from "../../../assets/nxtserve-logo.png";


const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F6F2F0]/95 backdrop-blur-sm border-b border-[#E5E5E5]"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
           <div className="w-20 h-25 rounded-lg flex items-center justify-center">
             <img src={logo} alt="NxtServe Logo" className="w-22 h-20 text-white" />
           </div>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              onClick={() => navigate("/find-jobs")}
              className="text-[#676664] hover:text-[#22252D] transition-colors font-medium"
            >
              Find Jobs
            </a>
            <a
              onClick={() => {
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                );
              }}
              className="text-[#676664] hover:text-[#22252D] transition-colors font-medium"
            >
              For Employers
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-[#676664]">Welcome, {user?.fullName}</span>
                <a
                  href={
                    user?.role === "employer"
                      ? "/employer-dashboard"
                      : "/find-jobs"
                  }
                  className="bg-[#F53900] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-[#676664] hover:text-[#22252D] transition-colors font-medium px-4 py-2 rounded-lg hover:bg-[#F6F2F0]"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-[#F53900] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
