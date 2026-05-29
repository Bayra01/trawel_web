import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router';
import { ChevronRight, Compass, Map, Search } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import heroImage from 'figma:asset/fb3c0b8cc6f3bbab4230f52bfa9c1bb1e64e5a06.png';

export function MongoliaHero() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/destinations');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'mn') {
      if (hour < 12) return 'Өглөөний мэнд';
      if (hour < 18) return 'Өдрийн мэнд';
      return 'Оройн мэнд';
    } else if (language === 'ko') {
      if (hour < 12) return '좋은 아침입니다';
      if (hour < 18) return '안녕하세요';
      return '좋은 저녁입니다';
    } else {
      if (hour < 12) return 'Good Morning';
      if (hour < 18) return 'Good Afternoon';
      return 'Good Evening';
    }
  };
  
  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('${heroImage}')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Mongolian Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,200,50,0.3) 10px, rgba(255,200,50,0.3) 20px)`
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Greeting - personalized if logged in */}
          {user && (
            <div className="mb-4 animate-fade-in">
              <p className="text-white/90 text-xl md:text-2xl">
                {getGreeting()}, <span className="text-[#D4AF37]">{user.fullName}</span>!
              </p>
            </div>
          )}
          
          {/* Mongolian Traditional Border Decoration */}
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37] rounded-full"></div>
            <div className="w-4 h-4 bg-[#D4AF37] rotate-45"></div>
            <div className="h-1 w-32 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37] rounded-full"></div>
          </div>
          
          <h1 className="text-white text-7xl md:text-8xl lg:text-9xl mb-6 tracking-tight drop-shadow-2xl font-bold leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-white/95 text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto drop-shadow-lg leading-relaxed mb-8">
            {t('hero.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="mb-12 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-[#4A90A4] transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'mn'
                      ? 'Аялах газраа хайх... (жнь: Говь, Хөвсгөл)'
                      : language === 'ko'
                      ? '여행지 검색... (예: 고비, 흡스굴)'
                      : 'Search destinations... (e.g., Gobi, Khuvsgul)'
                  }
                  className="w-full pl-16 pr-6 py-5 bg-white/95 backdrop-blur-md rounded-2xl text-gray-900 text-lg placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-[#4A90A4]/50 transition-all shadow-2xl"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  {language === 'mn' ? 'Хайх' : language === 'ko' ? '검색' : 'Search'}
                </button>
              </div>
            </form>
          </div>
          
          {/* Bottom Border Decoration */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white/60 to-white/60 rounded-full"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <div className="w-3 h-3 bg-white/80 rounded-full"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <div className="h-1 w-24 bg-gradient-to-l from-transparent via-white/60 to-white/60 rounded-full"></div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => navigate('/destinations')}
              className="group relative px-10 py-5 bg-gradient-to-r from-[#D4AF37] to-[#C4A037] text-gray-900 font-bold text-lg rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Compass className="w-6 h-6" />
                <span>
                  {t('hero.discover')}
                </span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => navigate('/trip-builder')}
              className="group px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/50 text-white font-bold text-lg rounded-2xl hover:bg-white/20 hover:border-white/80 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <Map className="w-6 h-6" />
                <span>{language === 'mn' ? 'Маршрут төлөвлөх' : language === 'ko' ? '경로 계획하기' : 'Plan Your Route'}</span>
              </div>
            </button>
          </div>

          {/* Info Pills */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <div className="backdrop-blur-md bg-white/15 rounded-full px-6 py-3 text-white/90 text-base border border-white/30 hover:bg-white/25 transition-all">
              {t('hero.feature1')}
            </div>
            <div className="backdrop-blur-md bg-white/15 rounded-full px-6 py-3 text-white/90 text-base border border-white/30 hover:bg-white/25 transition-all">
              {t('hero.feature2')}
            </div>
            <div className="backdrop-blur-md bg-white/15 rounded-full px-6 py-3 text-white/90 text-base border border-white/30 hover:bg-white/25 transition-all">
              {t('hero.feature3')}
            </div>
            <div className="backdrop-blur-md bg-white/15 rounded-full px-6 py-3 text-white/90 text-base border border-white/30 hover:bg-white/25 transition-all">
              {t('hero.feature4')}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}