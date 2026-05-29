import { useState, useEffect } from 'react';
import { Sparkles, MapPin, Calendar, Navigation as NavigationIcon, CheckCircle2, Circle, Clock, DollarSign, ChevronRight, MapIcon, Home, Loader2, Save, Map as MapIconLucide } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Navigation } from './Navigation';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router';
import { RouteMapViewer } from './RouteMapViewer';

interface Destination {
  id: string;
  name: string;
  nameMn: string;
  nameKo: string;
  region: string;
  description: string;
  descriptionMn: string;
  descriptionKo: string;
  image: string;
  duration: string;
  priceRange: string;
  coordinates: { lat: number; lng: number };
}

interface RouteStop {
  destination: Destination;
  distanceFromPrevious: number;
  dayNumber: number;
}

const destinations: Destination[] = [
  {
    id: 'ulaanbaatar',
    name: 'Ulaanbaatar',
    nameMn: 'Улаанбаатар',
    nameKo: '울란바토르',
    region: 'Capital City',
    description: 'Mongolia\'s vibrant capital blending modern life with ancient traditions',
    descriptionMn: 'Орчин үеийн амьдрал болон эртний уламжлалыг хослуулсан Монголын нийслэл',
    descriptionKo: '현대 생활과 고대 전통이 어우러진 몽골의 활기찬 수도',
    image: 'https://images.unsplash.com/photo-1653380550474-56f0b47da4cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHVsYWFuYmFhdGFyJTIwY2l0eXxlbnwxfHx8fDE3Njk4Mzg5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '2-3 days',
    priceRange: '$',
    coordinates: { lat: 47.9077, lng: 106.8832 }
  },
  {
    id: 'khuvsgul',
    name: 'Khuvsgul Lake',
    nameMn: 'Хөвсгөл нуур',
    nameKo: '흡스굴 호수',
    region: 'Northern Mongolia',
    description: 'Crystal clear alpine lake surrounded by pristine forests and mountains',
    descriptionMn: 'Цэнхэр тунгалаг усан болон ой, уулсаар хүрээлэгдсэн алпийн нуур',
    descriptionKo: '깨끗한 숲과 산으로 둘러싸인 수정처럼 맑은 고산 호수',
    image: 'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGxha2UlMjBraHV2c2d1bCUyMG1vdW50YWluc3xlbnwxfHx8fDE3Njk4Mzg5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3-5 days',
    priceRange: '$$$',
    coordinates: { lat: 50.75, lng: 100.5 }
  },
  {
    id: 'gobi',
    name: 'Gobi Desert',
    nameMn: 'Говь',
    nameKo: '고비 사막',
    region: 'Southern Mongolia',
    description: 'Vast desert landscapes with singing sand dunes and ancient dinosaur fossils',
    descriptionMn: 'Дуулах элсэн манхан болон эртний үлэг гүрвэлийн олдворуудтай өргөн уудам говь',
    descriptionKo: '노래하는 모래 언덕과 고대 공룡 화석이 있는 광활한 사막 풍경',
    image: 'https://images.unsplash.com/photo-1649357028504-ffc3c1976fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGdvYmklMjBkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5ODM4OTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4-7 days',
    priceRange: '$$$$',
    coordinates: { lat: 43.75, lng: 102.5 }
  },
  {
    id: 'terelj',
    name: 'Terelj National Park',
    nameMn: 'Тэрэлжийн байгалийн цогцолбор газар',
    nameKo: '테를지 국립공원',
    region: 'Central Mongolia',
    description: 'Stunning rock formations and alpine meadows just outside Ulaanbaatar',
    descriptionMn: 'Улаанбаатараас ойрхон байрладаг гайхамшигтай хадан чулуу болон нуга',
    descriptionKo: '울란바토르 바로 외곽의 놀라운 암석층과 고산 초원',
    image: 'https://images.unsplash.com/photo-1695197943218-be1bb14b6894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHRlbnQlMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc2OTg0MDcxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '1-3 days',
    priceRange: '$$',
    coordinates: { lat: 47.98, lng: 107.48 }
  },
  {
    id: 'altai',
    name: 'Altai Mountains',
    nameMn: 'Алтай уулс',
    nameKo: '알타이 산맥',
    region: 'Western Mongolia',
    description: 'Majestic snow-capped peaks home to Kazakh eagle hunters',
    descriptionMn: 'Казах бүргэдийн анчдын нутаг болох цасан оргилт уулс',
    descriptionKo: '카자흐 독수리 사냥꾼들의 고향인 장엄한 설산 봉우리',
    image: 'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5-10 days',
    priceRange: '$$$$',
    coordinates: { lat: 48.75, lng: 89.5 }
  },
  {
    id: 'karakorum',
    name: 'Karakorum',
    nameMn: 'Хархорин',
    nameKo: '카라코룸',
    region: 'Central Mongolia',
    description: 'Ancient capital of the Mongol Empire and historic monasteries',
    descriptionMn: 'Монголын эзэнт гүрний эртний нийслэл болон түүхт хийдүүд',
    descriptionKo: '몽골 제국의 고대 수도와 역사적인 수도원',
    image: 'https://images.unsplash.com/photo-1707669904598-05fdfe66a513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGthcmFrb3J1bSUyMGFuY2llbnQlMjBjaXR5fGVufDF8fHx8MTc2OTg0MTUxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '1-2 days',
    priceRange: '$$',
    coordinates: { lat: 47.2, lng: 102.8 }
  },
  {
    id: 'hustai',
    name: 'Hustai National Park',
    nameMn: 'Хустайн байгалийн цогцолбор газар',
    nameKo: '후스타이 국립공원',
    region: 'Central Mongolia',
    description: 'Home to the rare Przewalski\'s wild horses (Takhi)',
    descriptionMn: 'Монголын тахь буюу Пржевальскийн зэрлэг адууны нутаг',
    descriptionKo: '희귀한 프르제발스키 야생마(타히)의 서식지',
    image: 'https://images.unsplash.com/photo-1613294576846-73901118ef6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHdpbGQlMjBob3JzZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY5ODQxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '1-2 days',
    priceRange: '$$',
    coordinates: { lat: 47.75, lng: 105.9 }
  },
  {
    id: 'orkhon',
    name: 'Orkhon Valley',
    nameMn: 'Орхоны хөндий',
    nameKo: '오르혼 계곡',
    region: 'Central Mongolia',
    description: 'UNESCO World Heritage Site with stunning waterfalls and nomadic culture',
    descriptionMn: 'ЮНЕСКО-гийн дэлхийн өв, гайхалтай хүрхрээ болон нүүдэлчдийн соёл',
    descriptionKo: '유네스코 세계 문화유산이자 멋진 폭포와 유목 문화',
    image: 'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '2-4 days',
    priceRange: '$$',
    coordinates: { lat: 47.55, lng: 102.85 }
  }
];

export function AITripBuilder() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [route, setRoute] = useState<RouteStop[]>([]);
  const [generated, setGenerated] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);

  const getDestinationName = (dest: Destination) => {
    if (language === 'mn') return dest.nameMn;
    if (language === 'ko') return dest.nameKo;
    return dest.name;
  };

  const getDestinationDescription = (dest: Destination) => {
    if (language === 'mn') return dest.descriptionMn;
    if (language === 'ko') return dest.descriptionKo;
    return dest.description;
  };

  const toggleDestination = (id: string) => {
    if (selectedDestinations.includes(id)) {
      setSelectedDestinations(selectedDestinations.filter(d => d !== id));
    } else {
      setSelectedDestinations([...selectedDestinations, id]);
    }
  };

  const getUserLocation = () => {
    setLocationLoading(true);
    setLocationError('');
    
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationLoading(false);
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        setLocationLoading(false);
        // Fallback to Ulaanbaatar
        setUserLocation({ lat: 47.9077, lng: 106.8832 });
      }
    );
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const generateRoute = () => {
    if (selectedDestinations.length === 0) {
      return;
    }

    // Get selected destination objects
    const selectedDests = destinations.filter(d => selectedDestinations.includes(d.id));
    
    // If no user location, use Ulaanbaatar as default
    const startPoint = userLocation || { lat: 47.9077, lng: 106.8832 };

    // Find closest destination to user location
    let remaining = [...selectedDests];
    const routeStops: RouteStop[] = [];
    let currentLocation = startPoint;
    let dayCounter = 1;

    while (remaining.length > 0) {
      // Find closest destination
      let closestIndex = 0;
      let minDistance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        remaining[0].coordinates.lat,
        remaining[0].coordinates.lng
      );

      for (let i = 1; i < remaining.length; i++) {
        const distance = calculateDistance(
          currentLocation.lat,
          currentLocation.lng,
          remaining[i].coordinates.lat,
          remaining[i].coordinates.lng
        );
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }

      // Add to route
      const nextDest = remaining[closestIndex];
      routeStops.push({
        destination: nextDest,
        distanceFromPrevious: Math.round(minDistance),
        dayNumber: dayCounter
      });

      // Extract duration days (parse "3-5 days" -> take max value 5)
      const durationMatch = nextDest.duration.match(/(\d+)-?(\d+)?/);
      const durationDays = durationMatch ? parseInt(durationMatch[2] || durationMatch[1]) : 2;
      dayCounter += durationDays;

      // Update current location
      currentLocation = nextDest.coordinates;
      remaining.splice(closestIndex, 1);
    }

    setRoute(routeStops);
    setGenerated(true);
    setTimeout(() => {
      document.getElementById('route-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const calculateTotalDistance = () => {
    return route.reduce((sum, stop) => sum + stop.distanceFromPrevious, 0);
  };

  const calculateTotalDuration = () => {
    if (route.length === 0) return 0;
    const lastStop = route[route.length - 1];
    const lastDurationMatch = lastStop.destination.duration.match(/(\d+)-?(\d+)?/);
    const lastDuration = lastDurationMatch ? parseInt(lastDurationMatch[2] || lastDurationMatch[1]) : 2;
    return lastStop.dayNumber + lastDuration - 1;
  };

  const calculateBudget = () => {
    let total = 0;
    route.forEach(stop => {
      const price = stop.destination.priceRange;
      const basePrice = price.length === 1 ? 50 : price.length === 2 ? 150 : price.length === 3 ? 300 : 500;
      total += basePrice;
    });
    return total;
  };

  useEffect(() => {
    // Try to get user location on mount
    getUserLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] to-[#F5F3EF] pt-20">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Destination Selection */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl mb-2 text-gray-900">
                  {language === 'mn' ? 'Аяллын Маршрут' : language === 'ko' ? '여행 경로' : 'Build Your Route'}
                </h2>
                <p className="text-gray-600">
                  {language === 'mn' 
                    ? 'Аялах газруудаа сонгоод таны байршлаас хамгийн ойр газраас эхэлсэн маршрут гарна'
                    : language === 'ko'
                    ? '방문할 장소를 선택하 현재 위치에서 가장 가까운 곳부터 시작하는 경로가 생성됩니다'
                    : 'Select destinations and we\'ll create a route starting from the closest one to you'}
                </p>
              </div>

              {/* Location Status */}
              <div className="mb-6 p-4 bg-gradient-to-r from-[#4A90A4]/10 to-[#3D7A8C]/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <NavigationIcon className="w-4 h-4 text-[#4A90A4]" />
                  <span className="text-sm text-gray-700">
                    {language === 'mn' ? 'Таны байршил' : language === 'ko' ? '현재 위치' : 'Your Location'}
                  </span>
                </div>
                {userLocation ? (
                  <p className="text-xs text-gray-600">
                    {language === 'mn' ? 'Байршил олдсон' : language === 'ko' ? '위치 확인됨' : 'Location detected'}: {userLocation.lat.toFixed(2)}, {userLocation.lng.toFixed(2)}
                  </p>
                ) : locationError ? (
                  <div>
                    <p className="text-xs text-red-600 mb-2">{locationError}</p>
                    <button
                      onClick={getUserLocation}
                      className="text-xs text-[#4A90A4] hover:underline"
                    >
                      {language === 'mn' ? 'Дахин оролдох' : language === 'ko' ? '다시 시도' : 'Try again'}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#4A90A4]" />
                    <span className="text-xs text-gray-600">
                      {language === 'mn' ? 'Байршил хайж байна...' : language === 'ko' ? '위치 확인 중...' : 'Detecting location...'}
                    </span>
                  </div>
                )}
              </div>

              {/* Destinations List */}
              <div className="mb-6">
                <label className="block text-sm mb-3 text-gray-700">
                  {language === 'mn' ? 'Аялах газруудаа сонгоно уу' : language === 'ko' ? '방문할 장소를 선택하세요' : 'Select Destinations'}
                  <span className="ml-2 text-gray-400">({selectedDestinations.length} selected)</span>
                </label>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {destinations.map((dest) => {
                    const isSelected = selectedDestinations.includes(dest.id);
                    return (
                      <button
                        key={dest.id}
                        onClick={() => toggleDestination(dest.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-3 hover:shadow-md ${
                          isSelected
                            ? 'border-[#4A90A4] bg-[#4A90A4]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {isSelected ? (
                            <CheckCircle2 className="w-5 h-5 text-[#4A90A4]" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm text-gray-900 mb-1">{getDestinationName(dest)}</div>
                          <div className="text-xs text-gray-500">{dest.region}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{dest.duration}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateRoute}
                disabled={selectedDestinations.length === 0}
                className={`w-full py-4 rounded-xl transition-all duration-300 transform flex items-center justify-center gap-3 group ${
                  selectedDestinations.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white hover:shadow-xl hover:scale-105'
                }`}
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span className="text-lg">
                  {language === 'mn' ? 'Маршрут гаргах' : language === 'ko' ? '경로 생성' : 'Generate Route'}
                </span>
              </button>
            </div>
          </div>

          {/* Main Content - Route Display */}
          <div className="lg:col-span-2" id="route-results">
            {!generated ? (
              <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100 flex flex-col items-center justify-center min-h-[600px]">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] rounded-full flex items-center justify-center mb-6">
                  <MapIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl text-gray-900 mb-3">
                  {language === 'mn' ? 'Аяллын маршрутаа гаргая' : language === 'ko' ? '여행 경로를 만들어보세요' : 'Ready to Plan Your Journey?'}
                </h3>
                <p className="text-gray-600 text-center max-w-md mb-8">
                  {language === 'mn'
                    ? 'Зүүн талаас аялах газруудаа сонгоод "Маршрут гаргах" товчийг дарна уу. Таны байршлаас хамгийн ойр газраас эхлэх маршрут автоматаар бүтнэ.'
                    : language === 'ko'
                    ? '왼쪽에서 방문할 장소를 선택하고 "경로 생성"을 클릭하세요. 현재 위치에서 가장 가까운 곳부터 시작하는 최적의 경로가 자동으로 생성됩니다.'
                    : 'Select destinations from the left sidebar and click "Generate Route". We\'ll create an optimized route starting from the closest destination to your location.'}
                </p>
                <div className="grid grid-cols-3 gap-6 w-full max-w-xl">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
                      <MapPin className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {language === 'mn' ? 'Газар сонгох' : language === 'ko' ? '장소 선택' : 'Select Places'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <NavigationIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {language === 'mn' ? 'Байршил тодоройлох' : language === 'ko' ? '위치 감지' : 'Detect Location'}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                      <Sparkles className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {language === 'mn' ? 'Маршрут гарна' : language === 'ko' ? '경로 생성' : 'Generate Route'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header Summary */}
                <div className="bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] rounded-3xl shadow-xl p-8 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-sm opacity-90">
                          {language === 'mn' ? 'Оновчтой маршрут' : language === 'ko' ? '최적 경로' : 'Optimized Route'}
                        </span>
                      </div>
                      <h2 className="text-3xl mb-2">
                        {language === 'mn' ? 'Таны аяллын маршрут' : language === 'ko' ? '여행 경로' : 'Your Mongolia Journey'}
                      </h2>
                      <p className="text-white/90">
                        {language === 'mn' 
                          ? `${route.length} газар, таны байршлаас хамгийн ойрхоос эхэлнэ`
                          : language === 'ko'
                          ? `${route.length}개 장소, 현재 위치에서 가장 가까운 곳부터 시작`
                          : `${route.length} destinations, starting from the closest to you`}
                      </p>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <MapIcon className="w-4 h-4" />
                        <span className="text-sm opacity-90">
                          {language === 'mn' ? 'Нийт зай' : language === 'ko' ? '총 거리' : 'Total Distance'}
                        </span>
                      </div>
                      <div className="text-2xl">{calculateTotalDistance()} km</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm opacity-90">
                          {language === 'mn' ? 'Нийт хугацаа' : language === 'ko' ? '총 기간' : 'Duration'}
                        </span>
                      </div>
                      <div className="text-2xl">{calculateTotalDuration()} {language === 'mn' ? 'хоног' : language === 'ko' ? '일' : 'days'}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm opacity-90">
                          {language === 'mn' ? 'Төсөвлөсөн үнэ' : language === 'ko' ? '예상 비용' : 'Est. Budget'}
                        </span>
                      </div>
                      <div className="text-2xl">${calculateBudget()}</div>
                    </div>
                  </div>
                </div>

                {/* Route Timeline */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-2xl mb-6 text-gray-900">
                    {language === 'mn' ? 'Маршрутын дэлгэрэнгүй' : language === 'ko' ? '경로 상세 정보' : 'Route Details'}
                  </h3>
                  <div className="space-y-6">
                    {route.map((stop, index) => (
                      <div key={stop.destination.id} className="relative">
                        {/* Connector Line */}
                        {index < route.length - 1 && (
                          <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-[#4A90A4] to-gray-200" />
                        )}
                        
                        <div className="flex gap-4">
                          {/* Stop Number Circle */}
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] rounded-full flex items-center justify-center text-white shadow-lg z-10">
                            <span className="text-sm">{index + 1}</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 pb-8">
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                              {/* Image */}
                              <div className="relative h-48 overflow-hidden">
                                {stop.destination.image.startsWith('http') ? (
                                  <ImageWithFallback
                                    src={stop.destination.image}
                                    alt={getDestinationName(stop.destination)}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <img
                                    src={stop.destination.image}
                                    alt={getDestinationName(stop.destination)}
                                    className="w-full h-full object-cover"
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                  <h4 className="text-xl mb-1">{getDestinationName(stop.destination)}</h4>
                                  <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    <span>{stop.destination.region}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Details */}
                              <div className="p-6">
                                <p className="text-gray-600 mb-4">
                                  {getDestinationDescription(stop.destination)}
                                </p>

                                <div className="grid grid-cols-3 gap-4">
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 text-[#4A90A4]" />
                                    <div>
                                      <div className="text-xs text-gray-500">
                                        {language === 'mn' ? 'Өдөр' : language === 'ko' ? '일차' : 'Day'}
                                      </div>
                                      <div>{stop.dayNumber}</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <NavigationIcon className="w-4 h-4 text-[#4A90A4]" />
                                    <div>
                                      <div className="text-xs text-gray-500">
                                        {language === 'mn' ? 'Зай' : language === 'ko' ? '거리' : 'Distance'}
                                      </div>
                                      <div>{stop.distanceFromPrevious} km</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4 text-[#4A90A4]" />
                                    <div>
                                      <div className="text-xs text-gray-500">
                                        {language === 'mn' ? 'Хугацаа' : language === 'ko' ? '기간' : 'Duration'}
                                      </div>
                                      <div>{stop.destination.duration}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] rounded-3xl shadow-xl p-8 text-white text-center">
                  <h3 className="text-2xl mb-3">
                    {language === 'mn' ? 'Энэ маршрут таалагдлаа уу?' : language === 'ko' ? '이 경로가 마음에 드시나요?' : 'Love This Route?'}
                  </h3>
                  <p className="text-white/90 mb-6">
                    {language === 'mn'
                      ? 'Одоо захиалах эсвэл манай мэргэжилтнүүдтэй илүү нарийвчлан төлөвлөх'
                      : language === 'ko'
                      ? '지금 예약하거나 전문가와 함께 더 자세히 계획하세요'
                      : 'Book now or customize further with our travel experts'}
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button 
                      onClick={() => setShowRouteMap(true)}
                      className="px-8 py-3 bg-white text-[#4A90A4] rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <MapIconLucide className="w-5 h-5" />
                      {language === 'mn' ? 'Газрын зураг дээр харах' : language === 'ko' ? '지도에서 보기' : 'View on Map'}
                    </button>
                    <button
                      onClick={() => {
                        setGenerated(false);
                        setRoute([]);
                        setSelectedDestinations([]);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all"
                    >
                      {language === 'mn' ? 'Шинээр эхлэх' : language === 'ko' ? '새로 시작' : 'Start Over'}
                    </button>
                    {user && (
                      <button
                        onClick={() => {
                          // Save route to localStorage
                          const savedRoutes = JSON.parse(localStorage.getItem('savedRoutes') || '[]');
                          const newRoute = {
                            id: Date.now().toString(),
                            userId: user.email,
                            route: route,
                            createdAt: new Date().toISOString(),
                            totalDistance: calculateTotalDistance(),
                            totalDuration: calculateTotalDuration(),
                            budget: calculateBudget()
                          };
                          savedRoutes.push(newRoute);
                          localStorage.setItem('savedRoutes', JSON.stringify(savedRoutes));
                          
                          alert(language === 'mn' ? 'Маршрут амжилттай хадгалагдлаа!' : language === 'ko' ? '경로가 저장되었습니다!' : 'Route saved successfully!');
                        }}
                        className="px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        {language === 'mn' ? 'Хадгалах' : language === 'ko' ? '저장하기' : 'Save Route'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Route Map Viewer Modal */}
      {showRouteMap && route.length > 0 && (
        <RouteMapViewer
          waypoints={route.map(stop => ({
            name: getDestinationName(stop.destination),
            lat: stop.destination.coordinates.lat,
            lng: stop.destination.coordinates.lng
          }))}
          onClose={() => setShowRouteMap(false)}
        />
      )}
    </div>
  );
}