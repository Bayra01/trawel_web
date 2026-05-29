import { Star, CloudRain, Sun, Cloud, Wind, Snowflake, ChevronLeft, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import altaiImage from 'figma:asset/0a558779dfe8bf30b440c032ad9a6b06037fcf0f.png';
import orkhonImage from 'figma:asset/01fbccc3cee6de5bf7d309e965daba1b49d3e177.png';
import tereljImage from 'figma:asset/dd3bd5696d25278ee5d545cbab2ecc901479002b.png';
import gobiImage from 'figma:asset/38f7e947e3fec791e131b7e839ca1d834e705a86.png';
import khovsgolImage from 'figma:asset/684db07aca5051db65f7ecf7aed24417c7d3ca6b.png';
import ulaanbaatarImage from 'figma:asset/5abebaad4859c3cde5bf3baa986904560eae4983.png';

interface DestinationCardProps {
  image: string;
  title: string;
  region: string;
  description: string;
  rating: number;
  reviews: number;
  temperature: number;
  weather: 'sunny' | 'cloudy' | 'rainy' | 'windy' | 'snowy';
}

function DestinationCard({ image, title, region, description, rating, reviews, temperature, weather }: DestinationCardProps) {
  const WeatherIcon = 
    weather === 'sunny' ? Sun : 
    weather === 'cloudy' ? Cloud : 
    weather === 'rainy' ? CloudRain :
    weather === 'snowy' ? Snowflake : Wind;
  
  return (
    <div className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
      <div className="relative h-72 overflow-hidden">
        {typeof image === 'string' && image.startsWith('http') ? (
          <ImageWithFallback 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
        
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

export function AllDestinationsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const allDestinations = [
    {
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
      image: ulaanbaatarImage,
      title: 'Ulaanbaatar',
      region: 'Capital City',
      description: 'Modern capital blending urban life with traditional culture, museums and monasteries',
      rating: 4,
      reviews: 1203,
      temperature: 15,
      weather: 'cloudy' as const,
    },
    {
      image: 'https://images.unsplash.com/photo-1537212429608-6b5f5449cdf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHJlZCUyMGNsaWZmcyUyMGRlc2VydCUyMGNhbnlvbnxlbnwxfHx8fDE3NzI2MDI2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Bayanzag (Flaming Cliffs)',
      region: 'Gobi Desert',
      description: 'Famous red cliffs where dinosaur fossils were first discovered, stunning sunset views',
      rating: 5,
      reviews: 389,
      temperature: 25,
      weather: 'sunny' as const,
    },
    {
      image: 'https://images.unsplash.com/photo-1706901549707-908e73f91f66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGFtYXJiYXlhc2dhbGFudCUyMG1vbmFzdGVyeXxlbnwxfHx8fDE3NzI2MDI2MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Amarbayasgalant Monastery',
      region: 'North Mongolia',
      description: 'One of the three largest Buddhist monasteries in Mongolia, stunning architecture',
      rating: 5,
      reviews: 278,
      temperature: 10,
      weather: 'cloudy' as const,
    },
    {
      image: 'https://images.unsplash.com/photo-1728738185806-378db2c9f0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGJ1ZGRoaXN0JTIwdGVtcGxlJTIwZ29sZGVufGVufDF8fHx8MTc3MjYwMjYxNXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Erdene Zuu Monastery',
      region: 'Central Mongolia',
      description: "Mongolia's oldest Buddhist monastery with 108 stupas surrounding the complex",
      rating: 5,
      reviews: 512,
      temperature: 14,
      weather: 'sunny' as const,
    },
    {
      image: 'https://images.unsplash.com/photo-1548141262-b6e455ea61bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG5hcnJvdyUyMGdvcmdlJTIwaWNlfGVufDF8fHx8MTc3MjYwMjYxOXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Yol Valley (Eagle Valley)',
      region: 'Gobi Desert',
      description: 'Narrow gorge with ice formations lasting into summer, home to rare wildlife',
      rating: 5,
      reviews: 334,
      temperature: 18,
      weather: 'windy' as const,
    },
    {
      image: 'https://images.unsplash.com/photo-1762245277176-ed7ea0dd1c19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWluZGVlciUyMGhlcmRlciUyMG5vcnRoZXJuJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MjYwMjYxOXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Tsaatan Community',
      region: 'Far North Mongolia',
      description: 'Meet the reindeer herders of Taiga, experience unique nomadic culture',
      rating: 5,
      reviews: 198,
      temperature: -5,
      weather: 'snowy' as const,
    },
    {
      image: 'https://images.unsplash.com/photo-1760410719977-0f423178a5d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGd1biUyMGdhbHV1dCUyMGxha2UlMjBiaXJkc3xlbnwxfHx8fDE3NzI2MDI2MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Gun-Galuut Nature Reserve',
      region: 'Central Mongolia',
      description: 'Pristine wetlands perfect for birdwatching, spot rare species and wild horses',
      rating: 4,
      reviews: 267,
      temperature: 11,
      weather: 'cloudy' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 mb-8 text-white/90 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>{t('nav.backToHome')}</span>
          </button>
          
          <div className="flex items-center gap-4 mb-6">
            <MapPin className="w-12 h-12" />
            <h1 className="text-5xl">{t('explore.title')}</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            {t('explore.subtitle')}
          </p>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allDestinations.map((destination, index) => (
            <DestinationCard key={index} {...destination} />
          ))}
        </div>
      </div>
    </div>
  );
}