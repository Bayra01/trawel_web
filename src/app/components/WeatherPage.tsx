import { Navigation } from './Navigation';
import { MongoliaFooter } from './MongoliaFooter';
import { WeatherSection } from './WeatherSection';
import { useLanguage } from '../context/LanguageContext';
import { CloudSun } from 'lucide-react';

export function WeatherPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navigation />
      
      {/* Hero Header with Mongolian Design */}
      <div className="relative bg-gradient-to-br from-[#1E5A8E] via-[#2D8BA8] to-[#4A90A4] text-white py-24 overflow-hidden">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 40px)`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Decoration */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent to-white/60 rounded-full"></div>
            <CloudSun className="w-8 h-8 text-white/90" />
            <div className="h-1 w-20 bg-gradient-to-l from-transparent to-white/60 rounded-full"></div>
          </div>

          <h1 className="text-6xl font-bold mb-6 text-center drop-shadow-lg">
            {t('weather.pageTitle')}
          </h1>
          <p className="text-2xl text-center opacity-95 max-w-3xl mx-auto leading-relaxed">
            {t('weather.pageSubtitle')}
          </p>

          {/* Bottom Decoration */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            <div className="w-3 h-3 bg-white/80 rounded-full"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Weather Section */}
      <WeatherSection />

      <MongoliaFooter />
    </div>
  );
}