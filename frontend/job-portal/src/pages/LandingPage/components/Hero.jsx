import { motion } from "framer-motion";
import {
  Search,
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
  ClipboardCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Hero = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: "Active Users", value: "2.4M+" },
    { icon: Building2, label: "Companies", value: "50K+" },
    { icon: TrendingUp, label: "Jobs Posted", value: "150K+" },
  ];

  return (
    <section className="pt-24 pb-16 bg-[#F6F2F0] min-h-screen flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 lg:max-w-5xl">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#22252D] mb-6 leading-tight pt-10"
          >
            Find Your Dream Job or
            <span className="block bg-[#F53900] bg-clip-text text-transparent mt-2">
              Perfect Hire
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-[#676664] mb-12 max-w-xl mx-auto leading-relaxed"
          >
            Connect talented professionals with innovative companies. Your next
            career move or perfect candidate is just one click away.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 gap-y-6 justify-center items-center mb-16"
          >
            {/* Find Jobs */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Find Jobs"
              className="group bg-gradient-to-r from-[#F53900] to-[#FF6B00] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2"
              onClick={() => navigate("/find-jobs")}
            >
              <Search className="w-5 h-5" />
              <span>Find Jobs</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Post a Job */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Post a Job"
              className="bg-white border border-[#E5E5E5] text-[#676664] px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-sm hover:shadow-md"
              onClick={() => {
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login"
                );
              }}
            >
              Post a Job
            </motion.button>

            {/* Interview Prep */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Interview Prep"
              className="group bg-gradient-to-r from-[#F53900] to-[#FF6B00] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2"
              onClick={() => navigate("/interview-page")}
            >
              <ClipboardCheck className="w-5 h-5" />
              <span>Interview Prep</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-[#E5E5E5] transition-colors cursor-default"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#F53900] to-[#FF7A00] rounded-xl flex items-center justify-center mb-2 shadow-md">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-[#22252D]">
                  {stat.value}
                </div>
                <div className="text-sm text-[#676664] font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#E5E5E5] rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#E5E5E5] rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#E5E5E5] rounded-full blur-3xl opacity-20" />
      </div>
    </section>
  );
};

export default Hero;
