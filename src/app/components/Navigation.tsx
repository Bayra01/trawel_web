import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LogOut, Globe, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'mn' as const, name: 'Монгол', flag: '🇲🇳' },
    { code: 'ko' as const, name: '한국어', flag: '🇰🇷' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b-2 border-[#D4AF37]/20">
      {/* Mongolian Pattern Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#4A90A4] to-[#D4AF37]"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button - Only show on non-home pages */}
          {!isHomePage && (
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#4A90A4] transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">{t('nav.backToHome')}</span>
            </button>
          )}

          {/* Logo with Mongolian inspired design */}
          <Link to="/" className={`flex items-center gap-3 group ${!isHomePage ? 'mx-auto' : ''}`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] rounded-lg flex items-center justify-center transform group-hover:rotate-45 transition-all duration-300">
                <div className="w-6 h-6 border-2 border-[#D4AF37] rounded-full"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#D4AF37] to-[#4A90A4] transition-all duration-300"></div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/destinations" className="text-gray-700 hover:text-[#4A90A4] transition-colors">
              {t('nav.destinations')}
            </Link>
            <Link to="/trip-builder" className="text-gray-700 hover:text-[#4A90A4] transition-colors">
              AI Trip Builder
            </Link>
            <a href="/#experiences" className="text-gray-700 hover:text-[#4A90A4] transition-colors">
              {t('nav.experiences')}
            </a>
          </div>

          {/* Right side: Language + Auth */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {languages.find(l => l.code === language)?.flag}
                </span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                        language === lang.code ? 'bg-blue-50 text-[#4A90A4]' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 text-gray-700 hover:text-[#4A90A4] transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] flex items-center justify-center text-white text-sm hover:shadow-lg transition-all">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block">{user.fullName}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:block">{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="px-4 py-2 text-gray-700 hover:text-[#4A90A4] transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="px-6 py-2 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-lg hover:shadow-lg transition-all"
                >
                  {t('nav.signup')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}