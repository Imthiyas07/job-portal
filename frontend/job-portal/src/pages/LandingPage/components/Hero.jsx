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
import LanguageSwitcher from "../../../components/layout/LanguageSwitcher";
import { useTranslation } from "react-i18next"; // ✅ Added

const Hero = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ Hook for translations

  const stats = [
    { icon: Users, label: t("activeUsers"), value: "2.4M+" },
    { icon: Building2, label: t("companies"), value: "50K+" },
    { icon: TrendingUp, label: t("jobsPosted"), value: "150K+" },
  ];

  return (
    <section className="pt-24 pb-16 bg-[#F6F2F0] min-h-screen flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 lg:max-w-5xl">
        <div className="max-w-4xl mx-auto text-center">
          <div className="hidden md:block float-top-right">
            <p className="text-[#676664] hover:text-[#22252D] transition-colors font-medium">Language : <LanguageSwitcher /></p>
          </div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#22252D] mb-6 leading-tight pt-10"
          >
            {t("heroTitle")}
            <span className="block bg-[#F53900] bg-clip-text text-transparent mt-2">
              {t("heroTagline")}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-[#676664] mb-12 max-w-xl mx-auto leading-relaxed"
          >
            {t("heroSubtitle")}
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
              <span>{t("findJobs")}</span>
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
              {t("postJob")}
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
              <span>{t("interviewPrep")}</span>
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
    </section>
  );
};

export default Hero;
