import {
  Briefcase,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/nxtserve-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#E5E5E5] text-[#22252D] pt-20 pb-10 px-6">
      {/* Newsletter Section */}
      <div className="bg-[#F6F2F0] rounded-2xl p-8 text-center shadow-md max-w-6xl mx-auto mb-16">
        <h4 className="text-2xl font-bold mb-4">{t("stayInLoop")}</h4>
        <p className="text-[#676664] mb-6">{t("newsletterText")}</p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder={t("enterYourEmail")}
            className="px-4 py-3 rounded-lg border border-[#E5E5E5] w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-[#F53900] text-[#22252D]"
          />
          <button
            type="submit"
            className="bg-[#F53900] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#F6F2F0] hover:text-[#22252D] transition-all duration-300"
          >
            {t("subscribe")}
          </button>
        </form>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-25 h-10 rounded-lg flex items-center justify-center">
              <img src={logo} alt="NxtServe Logo" className="w-22 h-20 text-white" />
            </div>
          </div>
          <p className="text-[#676664]">{t("footerTagline")}</p>
          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-8 h-8 rounded-full bg-[#F53900] flex items-center justify-center hover:bg-[#F6F2F0] transition-colors duration-300"
              >
                <Icon className="w-4 h-4 text-white hover:text-[#F53900] transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <h4 className="font-semibold text-[#22252D] mb-2">{t("explore")}</h4>
          {["home", "jobs", "companies", "aboutUs", "contact"].map((key, i) => (
            <a
              key={i}
              href="#"
              className="block text-[#676664] hover:text-[#22252D] transition-colors duration-300"
            >
              {t(key)}
            </a>
          ))}
        </div>

        {/* Resources */}
        <div className="space-y-2">
          <h4 className="font-semibold text-[#22252D] mb-2">{t("resources")}</h4>
          {["blog", "careerTips", "helpCenter", "privacyPolicy", "terms"].map((key, i) => (
            <a
              key={i}
              href="#"
              className="block text-[#676664] hover:text-[#22252D] transition-colors duration-300"
            >
              {t(key)}
            </a>
          ))}
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <h4 className="font-semibold text-[#22252D] mb-2">{t("contact")}</h4>
          <p className="text-[#676664]">support@nexserve.com</p>
          <p className="text-[#676664]">Sales: (857)301-6002</p>
          <p className="text-[#676664]">Customer Care: (617)682-0225</p>
          <p className="text-[#676664]">333, Summer Street, Boston, MA-02210</p>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center mt-16 text-xs text-[#676664]">
        <p>© {new Date().getFullYear()} JobPortal. {t("rightsReserved")}</p>
        <p>{t("madeWithLove")}</p>
      </div>
    </footer>
  );
};

export default Footer;
