import { Star, CloudRain, Sun, Cloud, Wind, Snowflake, CloudSun } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import altaiImage from 'figma:asset/0a558779dfe8bf30b440c032ad9a6b06037fcf0f.png';
import orkhonImage from 'figma:asset/01fbccc3cee6de5bf7d309e965daba1b49d3e177.png';
import tereljImage from 'figma:asset/dd3bd5696d25278ee5d545cbab2ecc901479002b.png';
import gobiImage from 'figma:asset/38f7e947e3fec791e131b7e839ca1d834e705a86.png';
import khovsgolImage from 'figma:asset/684db07aca5051db65f7ecf7aed24417c7d3ca6b.png';
import ulaanbaatarImage from 'figma:asset/5abebaad4859c3cde5bf3baa986904560eae4983.png';

interface DestinationCardProps {
  id: string;
  image: string;
  title: string;
  region: string;
  description: string;
  rating: number;
  reviews: number;
  temperature: number;
  weather: 'sunny' | 'cloudy' | 'rainy' | 'windy' | 'snowy';
}

function DestinationCard({ id, image, title, region, description, rating, reviews, temperature, weather }: DestinationCardProps) {
  const navigate = useNavigate();
  const WeatherIcon = 
    weather === 'sunny' ? Sun : 
    weather === 'cloudy' ? Cloud : 
    weather === 'rainy' ? CloudRain :
    weather === 'snowy' ? Snowflake : Wind;
  
  return (
    <div 
      onClick={() => navigate(`/destinations/${id}`)}
      className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white cursor-pointer"
    >
      <div className="relative h-72 overflow-hidden">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Weather Widget */}
        <div className="absolute top-4 right-4 backdrop-blur-lg bg-white/35 rounded-2xl px-4 py-2 flex items-center gap-2 border border-white/50 shadow-lg">
          <WeatherIcon className="w-5 h-5 text-white drop-shadow-md" />
          <span className="text-white text-sm drop-shadow-md">{temperature}°C</span>
        </div>

        {/* Region Badge */}
        <div className="absolute top-4 left-4 backdrop-blur-md bg-[#4A90A4]/80 rounded-full px-4 py-1.5 text-white text-xs shadow-lg">
          {region}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'fill-[#D4A373] text-[#D4A373]' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
}

export function FeaturedDestinations() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  
  const destinations = [
    {
      id: 'altai-tavan-bogd',
      image: altaiImage,
      title: 'Altai Tavan Bogd',
      region: 'West Mongolia',
      description: 'Five sacred peaks with stunning glaciers, home to eagle hunters and Kazakh nomads',
      rating: 5,
      reviews: 342,
      temperature: -8,
      weather: 'snowy' as const,
    },
    {
      id: 'orkhon-valley',
      image: orkhonImage,
      title: 'Orkhon Valley',
      region: 'Khangai Mountains',
      description: 'UNESCO World Heritage site with ancient monasteries, waterfalls and nomadic culture',
      rating: 5,
      reviews: 567,
      temperature: 12,
      weather: 'sunny' as const,
    },
    {
      id: 'terelj-national-park',
      image: tereljImage,
      title: 'Terelj National Park',
      region: 'Central Mongolia',
      description: 'Alpine landscapes with unique rock formations, perfect for hiking and horse riding',
      rating: 5,
      reviews: 891,
      temperature: 8,
      weather: 'cloudy' as const,
    },
    {
      id: 'khongoryn-els',
      image: gobiImage,
      title: 'Khongoryn Els',
      region: 'Gobi Desert',
      description: 'Spectacular singing sand dunes stretching 180km, experience camel trekking',
      rating: 5,
      reviews: 445,
      temperature: 22,
      weather: 'sunny' as const,
    },
    {
      id: 'lake-khovsgol',
      image: khovsgolImage,
      title: 'Lake Khövsgöl',
      region: 'North Mongolia',
      description: 'Crystal-clear alpine lake known as the "Blue Pearl", meet Tsaatan reindeer herders',
      rating: 5,
      reviews: 623,
      temperature: 5,
      weather: 'windy' as const,
    },
    {
      id: 'ulaanbaatar',
      image: ulaanbaatarImage,
      title: 'Ulaanbaatar',
      region: 'Capital City',
      description: 'Modern capital blending urban life with traditional culture, museums and monasteries',
      rating: 4,
      reviews: 1203,
      temperature: 15,
      weather: 'cloudy' as const,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#FDFBF7] to-white relative overflow-hidden">
      {/* Mongolian Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, #4A90A4 30px, #4A90A4 60px)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Mongolian Design */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-[#D4AF37] rounded-full"></div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-[#D4AF37] rotate-45"></div>
              <div className="w-2 h-2 bg-[#4A90A4] rounded-full"></div>
              <div className="w-2 h-2 bg-[#D4AF37] rotate-45"></div>
            </div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-[#D4AF37] rounded-full"></div>
          </div>
          
          <h2 className="text-5xl mb-4 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] bg-clip-text text-transparent font-bold">
            {t('featured.title')}
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} {...destination} />
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate('/explore')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#4A90A4] border-2 border-[#4A90A4] rounded-full hover:bg-[#4A90A4] hover:text-white transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <span className="font-medium text-lg">{t('featured.viewMore')}</span>
          </button>
        </div>

        {/* Weather Button - Bottom Center */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate('/weather')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <CloudSun className="w-5 h-5" />
            <span className="font-medium text-lg">{t('weather.viewWeather')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}