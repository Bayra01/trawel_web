import { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Star, Clock, DollarSign, Users, Calendar, Search, Filter, ChevronRight } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router';

interface Destination {
  id: string;
  name: string;
  nameEn: string;
  nameMn: string;
  nameKo: string;
  region: string;
  description: string;
  descriptionEn: string;
  descriptionMn: string;
  descriptionKo: string;
  image: string;
  rating: number;
  reviewCount: number;
  bestSeason: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Very Challenging';
  priceRange: string;
  highlights: string[];
  experienceTypes: string[];
  seasons: string[];
}

const destinations: Destination[] = [
  {
    id: 'khuvsgul',
    name: 'Khuvsgul Lake',
    nameEn: 'Khuvsgul Lake',
    nameMn: 'Хөвсгөл нуур',
    nameKo: '흡스굴 호수',
    region: 'Northern Mongolia',
    description: 'Crystal clear alpine lake surrounded by pristine forests and mountains',
    descriptionEn: 'Crystal clear alpine lake surrounded by pristine forests and mountains',
    descriptionMn: 'Цэнхэр тунгалаг усан болон ой, уулсаар хүрээлэгдсэн алпийн нуур',
    descriptionKo: '깨끗한 숲과 산으로 둘러싸인 수정처럼 맑은 고산 호수',
    image: 'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGxha2UlMjBraHV2c2d1bCUyMG1vdW50YWluc3xlbnwxfHx8fDE3Njk4Mzg5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 342,
    bestSeason: 'Jun-Sep',
    duration: '3-5 days',
    difficulty: 'Easy',
    priceRange: '$$$',
    highlights: ['Horseback riding', 'Lake swimming', 'Tsaatan reindeer herders', 'Hiking trails'],
    experienceTypes: ['Nature', 'Adventure'],
    seasons: ['Summer', 'Autumn']
  },
  {
    id: 'gobi',
    name: 'Gobi Desert',
    nameEn: 'Gobi Desert',
    nameMn: 'Говь',
    nameKo: '고비 사막',
    region: 'Southern Mongolia',
    description: 'Vast desert landscapes with singing sand dunes and ancient dinosaur fossils',
    descriptionEn: 'Vast desert landscapes with singing sand dunes and ancient dinosaur fossils',
    descriptionMn: 'Дуулах элсэн манхан болон эртний үлэг гүрвэлийн олдворуудтай өргөн уудам говь',
    descriptionKo: '노래하는 모래 언덕과 고대 공룡 화석이 있는 광활한 사막 풍경',
    image: 'https://images.unsplash.com/photo-1649357028504-ffc3c1976fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGdvYmklMjBkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5ODM4OTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 528,
    bestSeason: 'May-Oct',
    duration: '4-7 days',
    difficulty: 'Moderate',
    priceRange: '$$$$',
    highlights: ['Khongoryn Els dunes', 'Flaming Cliffs', 'Camel trekking', 'Yol Valley'],
    experienceTypes: ['Adventure', 'Cultural'],
    seasons: ['Spring', 'Summer', 'Autumn']
  },
  {
    id: 'terelj',
    name: 'Terelj National Park',
    nameEn: 'Terelj National Park',
    nameMn: 'Тэрэлжийн байгалийн цогцолбор газар',
    nameKo: '테를지 국립공원',
    region: 'Central Mongolia',
    description: 'Stunning rock formations and alpine meadows just outside Ulaanbaatar',
    descriptionEn: 'Stunning rock formations and alpine meadows just outside Ulaanbaatar',
    descriptionMn: 'Улаанбаатараас ойрхон байрладаг гайхамшигтай хадан чулуу болон нуга',
    descriptionKo: '울란바토르 바로 외곽의 놀라운 암석층과 고산 초원',
    image: 'https://images.unsplash.com/photo-1695197943218-be1bb14b6894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHRlbnQlMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc2OTg0MDcxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 486,
    bestSeason: 'May-Sep',
    duration: '1-3 days',
    difficulty: 'Easy',
    priceRange: '$$',
    highlights: ['Turtle Rock', 'Aryabal Temple', 'Horse riding', 'Ger camps'],
    experienceTypes: ['Nature', 'Cultural'],
    seasons: ['Spring', 'Summer', 'Autumn']
  },
  {
    id: 'altai',
    name: 'Altai Mountains',
    nameEn: 'Altai Mountains',
    nameMn: 'Алтай уулс',
    nameKo: '알타이 산맥',
    region: 'Western Mongolia',
    description: 'Majestic snow-capped peaks home to Kazakh eagle hunters',
    descriptionEn: 'Majestic snow-capped peaks home to Kazakh eagle hunters',
    descriptionMn: 'Казах бүргэдийн анчдын нутаг болох цасан оргилт уулс',
    descriptionKo: '카자흐 독수리 사냥꾼들의 고향인 장엄한 설산 봉우리',
    image: 'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 215,
    bestSeason: 'Jul-Sep',
    duration: '5-10 days',
    difficulty: 'Challenging',
    priceRange: '$$$$',
    highlights: ['Eagle Festival', 'Potanin Glacier', 'Tavan Bogd peaks', 'Kazakh culture'],
    experienceTypes: ['Adventure', 'Cultural'],
    seasons: ['Summer', 'Autumn']
  },
  {
    id: 'karakorum',
    name: 'Karakorum',
    nameEn: 'Karakorum',
    nameMn: 'Хархорин',
    nameKo: '카라코룸',
    region: 'Central Mongolia',
    description: 'Ancient capital of the Mongol Empire and historic monasteries',
    descriptionEn: 'Ancient capital of the Mongol Empire and historic monasteries',
    descriptionMn: 'Монголын эзэнт гүрний эртний нийслэл болон түүхт хийдүүд',
    descriptionKo: '몽골 제국의 고대 수도와 역사적인 수도원',
    image: 'https://images.unsplash.com/photo-1707669904598-05fdfe66a513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGthcmFrb3J1bSUyMGFuY2llbnQlMjBjaXR5fGVufDF8fHx8MTc2OTg0MTUxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviewCount: 392,
    bestSeason: 'May-Sep',
    duration: '1-2 days',
    difficulty: 'Easy',
    priceRange: '$$',
    highlights: ['Erdene Zuu Monastery', 'Museum', 'Orkhon Valley', 'Turtle Rock'],
    experienceTypes: ['Cultural', 'Historical'],
    seasons: ['Spring', 'Summer', 'Autumn']
  },
  {
    id: 'tunkhel',
    name: 'Tunkhel Village (Tsaatan Reindeer Herders)',
    nameEn: 'Tunkhel Village (Tsaatan Reindeer Herders)',
    nameMn: 'Түнхэл тосгон (Цаатан)',
    nameKo: '툰켈 마을 (차탄 순록 목동)',
    region: 'Northern Mongolia (Darkhad Valley)',
    description: 'Remote village home to the Tsaatan reindeer herders in pristine wilderness',
    descriptionEn: 'Remote village home to the Tsaatan reindeer herders in pristine wilderness',
    descriptionMn: 'Дархадын хөндийд орших цаатан малчдын уламжлалт нутаг',
    descriptionKo: '순수한 야생에서 차탄 순록 목동의 고향인 외딴 마을',
    image: 'https://images.unsplash.com/photo-1613294576846-73901118ef6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHdpbGQlMjBob3JzZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY5ODQxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviewCount: 87,
    bestSeason: 'Jun-Sep',
    duration: '7-10 days',
    difficulty: 'Very Challenging',
    priceRange: '$$$$',
    highlights: ['Tsaatan reindeer herders', 'Ride reindeer', 'Traditional urts', 'Taiga trekking'],
    experienceTypes: ['Cultural', 'Adventure'],
    seasons: ['Summer']
  },
  {
    id: 'hustai',
    name: 'Hustai National Park',
    nameEn: 'Hustai National Park',
    nameMn: 'Хустайн байгалийн цогцолбор газар',
    nameKo: '후스타이 국립공원',
    region: 'Central Mongolia',
    description: 'Home to the rare Przewalski\'s wild horses (Takhi)',
    descriptionEn: 'Home to the rare Przewalski\'s wild horses (Takhi)',
    descriptionMn: 'Монголын тахь буюу Пржевальскийн зэрлэг адууны нутаг',
    descriptionKo: '희귀한 프르제발스키 야생마(타히)의 서식지',
    image: 'https://images.unsplash.com/photo-1613294576846-73901118ef6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHdpbGQlMjBob3JzZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY5ODQxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviewCount: 298,
    bestSeason: 'Apr-Oct',
    duration: '1-2 days',
    difficulty: 'Easy',
    priceRange: '$$',
    highlights: ['Wild horses', 'Wildlife viewing', 'Hiking', 'Photography'],
    experienceTypes: ['Nature', 'Adventure'],
    seasons: ['Spring', 'Summer', 'Autumn']
  },
  {
    id: 'ulaanbaatar',
    name: 'Ulaanbaatar',
    nameEn: 'Ulaanbaatar',
    nameMn: 'Улаанбаатар',
    nameKo: '울란바토르',
    region: 'Capital City',
    description: 'Mongolia\'s vibrant capital blending modern life with ancient traditions',
    descriptionEn: 'Mongolia\'s vibrant capital blending modern life with ancient traditions',
    descriptionMn: 'Орчин үеийн амьдрал болон эртний уламжлалыг хослуулсан Монолын нийслэл',
    descriptionKo: '현대 생활과 고대 전통이 어우러진 몽골의 활기찬 수도',
    image: 'https://images.unsplash.com/photo-1653380550474-56f0b47da4cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHVsYWFuYmFhdGFyJTIwY2l0eXxlbnwxfHx8fDE3Njk4Mzg5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.5,
    reviewCount: 612,
    bestSeason: 'May-Sep',
    duration: '2-3 days',
    difficulty: 'Easy',
    priceRange: '$',
    highlights: ['Gandan Monastery', 'National Museum', 'Zaisan Memorial', 'Local markets'],
    experienceTypes: ['Cultural', 'Historical'],
    seasons: ['Spring', 'Summer', 'Autumn']
  },
  {
    id: 'orkhon',
    name: 'Orkhon Valley',
    nameEn: 'Orkhon Valley',
    nameMn: 'Орхоны хөндий',
    nameKo: '오르혼 계곡',
    region: 'Central Mongolia',
    description: 'UNESCO World Heritage Site with stunning waterfalls and nomadic culture',
    descriptionEn: 'UNESCO World Heritage Site with stunning waterfalls and nomadic culture',
    descriptionMn: 'ЮНЕСКО-гийн дэлхийн өв, гайхалтай хүрхрээ болон нүүдэлчдийн соёл',
    descriptionKo: '유네스코 세계 문화유산이자 멋진 폭포와 유목 문화',
    image: 'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviewCount: 267,
    bestSeason: 'Jun-Sep',
    duration: '2-4 days',
    difficulty: 'Moderate',
    priceRange: '$$',
    highlights: ['Orkhon Waterfall', 'Hot springs', 'Ancient ruins', 'Horseback riding'],
    experienceTypes: ['Nature', 'Adventure'],
    seasons: ['Summer', 'Autumn']
  }
];

export function DestinationsPage() {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get('region') || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState(searchParams.get('experience') || 'all');
  const [selectedSeason, setSelectedSeason] = useState(searchParams.get('season') || 'all');

  const regions = ['all', 'Northern Mongolia', 'Southern Mongolia', 'Central Mongolia', 'Western Mongolia', 'Capital City'];
  const difficulties = ['all', 'Easy', 'Moderate', 'Challenging', 'Very Challenging'];
  const experiences = ['all', 'Nature', 'Adventure', 'Cultural', 'Historical'];
  const seasons = ['all', 'Spring', 'Summer', 'Autumn', 'Winter'];

  const getDestinationName = (dest: Destination) => {
    if (language === 'mn') return dest.nameMn;
    if (language === 'ko') return dest.nameKo;
    return dest.nameEn;
  };

  const getDestinationDescription = (dest: Destination) => {
    if (language === 'mn') return dest.descriptionMn;
    if (language === 'ko') return dest.descriptionKo;
    return dest.descriptionEn;
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = getDestinationName(dest).toLowerCase().includes(searchQuery.toLowerCase()) ||
                         getDestinationDescription(dest).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || dest.region === selectedRegion;
    const matchesDifficulty = selectedDifficulty === 'all' || dest.difficulty === selectedDifficulty;
    const matchesExperience = selectedExperience === 'all' || dest.experienceTypes.includes(selectedExperience);
    const matchesSeason = selectedSeason === 'all' || dest.seasons.includes(selectedSeason);
    return matchesSearch && matchesRegion && matchesDifficulty && matchesExperience && matchesSeason;
  });

  useEffect(() => {
    const params: { [key: string]: string } = {};
    if (searchQuery) params['search'] = searchQuery;
    if (selectedRegion !== 'all') params['region'] = selectedRegion;
    if (selectedDifficulty !== 'all') params['difficulty'] = selectedDifficulty;
    if (selectedExperience !== 'all') params['experience'] = selectedExperience;
    if (selectedSeason !== 'all') params['season'] = selectedSeason;
    setSearchParams(params);
  }, [searchQuery, selectedRegion, selectedDifficulty, selectedExperience, selectedSeason, setSearchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] to-[#F5F3EF]">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl mb-4 text-gray-900">Discover Mongolia</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore breathtaking destinations from vast deserts to pristine lakes
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90A4] transition-all"
                />
              </div>

              {/* Region Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90A4] transition-all appearance-none bg-white"
                >
                  {regions.map(region => (
                    <option key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90A4] transition-all appearance-none bg-white"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>
                      {diff === 'all' ? 'All Difficulties' : diff}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div className="relative">
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90A4] transition-all appearance-none bg-white"
                >
                  {experiences.map(exp => (
                    <option key={exp} value={exp}>
                      {exp === 'all' ? 'All Experiences' : exp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Season Filter */}
              <div className="relative">
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90A4] transition-all appearance-none bg-white"
                >
                  {seasons.map(season => (
                    <option key={season} value={season}>
                      {season === 'all' ? 'All Seasons' : season}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-gray-600">
            Found {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
              <div
                key={destination.id}
                onClick={() => navigate(`/destinations/${destination.id}`)}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={getDestinationName(destination)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Region Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-gray-700">
                    {destination.region}
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
                  </div>

                  {/* Name overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl text-white mb-1">{getDestinationName(destination)}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {getDestinationDescription(destination)}
                  </p>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-[#4A90A4]" />
                      <span>{destination.bestSeason}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-[#4A90A4]" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 text-[#4A90A4]" />
                      <span>{destination.priceRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-[#4A90A4]" />
                      <span>{destination.reviewCount} reviews</span>
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      destination.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      destination.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      destination.difficulty === 'Challenging' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {destination.difficulty}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-[#4A90A4] font-medium group-hover:text-[#3D7A8C] transition-colors">
                      View Details
                    </span>
                    <ChevronRight className="w-5 h-5 text-[#4A90A4] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No results */}
          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-2">No destinations found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}