import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    document.cookie = `i18next=${selectedLang}; path=/; max-age=31536000`; // 1 year
  };

  //console.log("Current language:", i18n.language);


  return (
    
    <select
      onChange={changeLanguage}
      value={i18n.language}
      className="bg-white border border-gray-300 text-[#676664] rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
    >
      <option value="en-US">🇺🇸 English</option>
      <option value="es">🇪🇸 Español</option>
      <option value="zh">🇨🇳 中文</option>
      <option value="vi">🇻🇳 Tiếng Việt</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="pt">🇵🇹 Português</option>
      <option value="fil">🇵🇭 Filipino</option>
      <option value="hi">🇮🇳 हिन्दी</option>
      <option value="ta">🇮🇳 Tamil</option>
      <option value="ar">🇸🇦 العربية</option>
      <option value="ko">🇰🇷 한국어</option>
    </select>
    
  );
};

export default LanguageSwitcher;
