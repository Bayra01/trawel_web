import { useEffect, useRef, useState } from 'react';
import { Navigation as NavIcon, MapPin, Clock, TrendingUp, X, Loader2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

interface MapRouteViewerProps {
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  onClose: () => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export function MapRouteViewer({ destinationName, destinationLat, destinationLng, onClose }: MapRouteViewerProps) {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);
  // Load Google Maps script with async
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps && window.google.maps.Map) {
        initializeMap();
        return;
      }
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        let checkInterval: NodeJS.Timeout | null = null;
        
        // Wait for the script to load
        checkInterval = setInterval(() => {
          if (window.google && window.google.maps && window.google.maps.Map) {
            if (checkInterval) clearInterval(checkInterval);
            initializeMap();
          }
        }, 100);
      
        // Timeout after 10 seconds
        setTimeout(() => {
          if (checkInterval) clearInterval(checkInterval);
          if (!window.google || !window.google.maps || !window.google.maps.Map) {
            setApiKeyError(true);
            setError(
              language === 'mn' 
                ? '⚠️ Google Maps API ачаалагдсангүй. API түлхүүр шаардлагатай.' 
                : language === 'ko' 
                ? '⚠️ Google Maps API를 로드할 수 없습니다. API 키가 필요합니다.' 
                : '⚠️ Failed to load Google Maps API. API key required.'
            );
            setLoading(false);
          }
        }, 10000);
        return;
      }

      const script = document.createElement('script');
      // Note: Replace 'YOUR_API_KEY_HERE' with your actual Google Maps API key
      // Get your key at: https://console.cloud.google.com/google/maps-apis
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places,marker,routes,geometry&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Wait a bit for all libraries to load
        setTimeout(() => {
          if (window.google && window.google.maps && window.google.maps.Map) {
            initializeMap();
          } else {
            setApiKeyError(true);
            setError(
              language === 'mn' 
                ? '⚠️ Google Maps API ачаалагдсангүй - API түлхүүр буруу эсвэл идэвхгүй байна' 
                : language === 'ko' 
                ? '⚠️ Google Maps API 로드 실패 - 잘못되었거나 비활성화된 API 키' 
                : '⚠️ Failed to load Google Maps API - Invalid or inactive API key'
            );
            setLoading(false);
          }
        }, 500);
      };
      script.onerror = () => {
        setApiKeyError(true);
        setError(
          language === 'mn' 
            ? '⚠️ Google Maps API түлхүүр хэрэгтэй. Админтай холбогдоно уу.' 
            : language === 'ko' 
            ? '⚠️ Google Maps API 키가 필요합니다. 관리자에게 문의하세요.' 
            : '⚠️ Google Maps API key required. Please contact administrator.'
        );
        setLoading(false);
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [language]);

  // Initialize map
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    // Check if API loaded successfully
    if (!window.google.maps) {
      setApiKeyError(true);
      setError(
        language === 'mn' 
          ? '⚠️ Google Maps API түлхүүр буруу эсвэл идэвхгүй байна' 
          : language === 'ko' 
          ? '⚠️ Google Maps API 키가 잘못되었거나 비활성화되었습니다' 
          : '⚠️ Invalid or inactive Google Maps API key'
      );
      setLoading(false);
      return;
    }

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      zoom: 6,
      center: { lat: 47.9214, lng: 106.9055 }, // Ulaanbaatar center
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      mapId: 'DEMO_MAP_ID', // Required for AdvancedMarkerElement
    });

    setMap(mapInstance);

    // Get user location
    getUserLocation();
  };

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError(language === 'mn' ? 'Таны төхөөрөмж байршил олохыг дэмжихгүй байна' : language === 'ko' ? '기기가 위치 정보를 지원하지 않습니다' : 'Geolocation is not supported by your device');
      setLoading(false);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userPos);
        setLocationPermissionDenied(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setLocationPermissionDenied(true);
        // Default to Ulaanbaatar if location denied
        const defaultPos = { lat: 47.9214, lng: 106.9055 };
        setUserLocation(defaultPos);
      }
    );
  };

  // Calculate and display route using new Routes API
  useEffect(() => {
    if (!map || !userLocation || apiKeyError) return;

    const destination = { lat: destinationLat, lng: destinationLng };

    // Use new Routes API (non-deprecated)
    computeRouteWithNewAPI(userLocation, destination);
  }, [map, userLocation, destinationLat, destinationLng, apiKeyError]);

  const computeRouteWithNewAPI = async (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
    if (!window.google || !window.google.maps) return;

    try {
      // Create markers first
      new window.google.maps.Marker({
        position: origin,
        map: map,
        title: language === 'mn' ? 'Таны байршил' : language === 'ko' ? '현재 위치' : 'Your Location',
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        },
      });

      new window.google.maps.Marker({
        position: destination,
        map: map,
        title: destinationName,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      });

      // Fit bounds to show both markers
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(origin);
      bounds.extend(destination);
      map.fitBounds(bounds);

      // Try to compute route using new Routes API
      if (window.google.maps.routes && window.google.maps.routes.Route) {
        // Ensure lat/lng are proper numbers
        const request = {
          origin: {
            location: {
              latLng: {
                latitude: Number(origin.lat),
                longitude: Number(origin.lng),
              },
            },
          },
          destination: {
            location: {
              latLng: {
                latitude: Number(destination.lat),
                longitude: Number(destination.lng),
              },
            },
          },
          travelMode: 'DRIVE',
          computeAlternativeRoutes: false,
        };

        try {
          const response = await window.google.maps.routes.Route.computeRoutes(request);
          
          if (response.routes && response.routes.length > 0) {
            const route = response.routes[0];
            
            // Extract distance and duration
            const distanceMeters = route.distanceMeters || 0;
            const durationSeconds = route.duration?.seconds || 0;
            
            setRouteInfo({
              distance: `${Math.round(distanceMeters / 1000)} km`,
              duration: `${Math.round(durationSeconds / 3600)} hours ${Math.round((durationSeconds % 3600) / 60)} mins`,
            });

            // Draw polyline
            if (route.polyline && route.polyline.encodedPolyline) {
              const decodedPath = window.google.maps.geometry.encoding.decodePath(route.polyline.encodedPolyline);
              new window.google.maps.Polyline({
                path: decodedPath,
                geodesic: true,
                strokeColor: '#4A90A4',
                strokeOpacity: 0.8,
                strokeWeight: 5,
                map: map,
              });
            }

            setLoading(false);
            setError(null);
          } else {
            throw new Error('No routes found');
          }
        } catch (apiError) {
          console.error('Routes API request failed:', apiError);
          // Fallback to straight line if API key invalid or request fails
          throw apiError;
        }
      } else {
        // Fallback: just show straight line if Routes API not available
        drawStraightLine(origin, destination);
      }
    } catch (err) {
      console.error('Route computation error:', err);
      setError(
        language === 'mn' 
          ? 'Маршрут олдсонгүй. Өөр аргаар очих боломжтой.' 
          : language === 'ko' 
          ? '경로를 찾을 수 없습니다. 다른 방법으로 이동하세요.' 
          : 'No route found. Consider alternative transportation.'
      );
      setLoading(false);
      
      // Draw straight line as fallback
      drawStraightLine(origin, destination);
    }
  };

  const drawStraightLine = (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
    // Draw a simple straight line as fallback
    const path = [origin, destination];
    new window.google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: '#4A90A4',
      strokeOpacity: 0.6,
      strokeWeight: 3,
      map: map,
    });

    // Calculate approximate distance
    const distanceKm = calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng);
    setRouteInfo({
      distance: `${Math.round(distanceKm)} km (approx.)`,
      duration: 'N/A',
    });
    setLoading(false);
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

  const handleSaveRoute = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (!userLocation || !routeInfo) return;

    const savedRoutes = JSON.parse(localStorage.getItem('savedRoutes') || '[]');
    const newRoute = {
      id: Date.now().toString(),
      destinationName,
      destinationLat,
      destinationLng,
      userLat: userLocation.lat,
      userLng: userLocation.lng,
      distance: routeInfo.distance,
      duration: routeInfo.duration,
      createdAt: new Date().toISOString(),
    };
    savedRoutes.push(newRoute);
    localStorage.setItem('savedRoutes', JSON.stringify(savedRoutes));

    alert(language === 'mn' ? 'Маршрут хадгалагдлаа!' : language === 'ko' ? '경로가 저장되었습니다!' : 'Route saved successfully!');
  };

  // API Key Error UI
  if (apiKeyError) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <AlertCircle className="w-7 h-7 text-orange-500" />
              {language === 'mn' ? 'Google Maps тохиргоо хэрэгтэй' : language === 'ko' ? 'Google Maps 설정 필요' : 'Google Maps Setup Required'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <p className="text-gray-700 mb-3">
                {language === 'mn' 
                  ? 'Маршрут харуулахын тулд Google Maps API түлхүүр шаардлагатай.' 
                  : language === 'ko' 
                  ? '경로를 표시하려면 Google Maps API 키가 필요합니다.' 
                  : 'A Google Maps API key is required to display routes.'}
              </p>
              <p className="text-sm text-gray-600">
                {language === 'mn' 
                  ? 'Админ эрхтэй хэрэглэгч дараах алхмуудыг дагана:' 
                  : language === 'ko' 
                  ? '관리자는 다음 단계를 따르세요:' 
                  : 'Admin users should follow these steps:'}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4A90A4] text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'mn' ? 'Google Cloud Console-д нэвтрэх' : language === 'ko' ? 'Google Cloud Console에 로그인' : 'Sign in to Google Cloud Console'}
                  </p>
                  <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-sm text-[#4A90A4] hover:underline">
                    console.cloud.google.com/google/maps-apis
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4A90A4] text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'mn' ? 'API түлхүр үүсгэх' : language === 'ko' ? 'API 키 생성' : 'Create an API key'}
                  </p>
                  <p className="text-sm text-gray-600">Enable: Maps JavaScript API, Routes API, Places API</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#4A90A4] text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <p className="font-medium text-gray-900">
                    {language === 'mn' ? 'Код дээр түлхүрээ оруулах' : language === 'ko' ? '코드에 키 입력' : 'Add key to code'}
                  </p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block mt-1">
                    /components/MapRouteViewer.tsx
                  </code>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded block mt-1">
                    key=YOUR_API_KEY_HERE
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
              <p className="text-sm text-gray-700">
                💡 <strong>{language === 'mn' ? 'Зөвлөмж:' : language === 'ko' ? '팁:' : 'Tip:'}</strong>{' '}
                {language === 'mn' 
                  ? 'API түлхүрийг хамгаалахын тулд домайн хязгаарлалт тохируулна уу.' 
                  : language === 'ko' 
                  ? 'API 키를 보호하기 위해 도메인 제한을 설정하세요.' 
                  : 'Set up domain restrictions to protect your API key.'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-xl hover:shadow-lg transition-all"
            >
              {language === 'mn' ? 'Ойлгосон' : language === 'ko' ? '확인' : 'Got it'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <NavIcon className="w-7 h-7" />
              {language === 'mn' ? 'Маршрут' : language === 'ko' ? '경로' : 'Route to'} {destinationName}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {locationPermissionDenied && (
            <div className="bg-yellow-500/20 border border-yellow-300/30 rounded-lg p-3 text-sm">
              {language === 'mn' 
                ? '⚠️ Байршил зөвшөөрөөгүй тул Улаанбаатараас тооцоолсон' 
                : language === 'ko' 
                ? '⚠️ 위치 권한이 거부되어 울란바토르에서 계산됨' 
                : '⚠️ Location permission denied. Route calculated from Ulaanbaatar'}
            </div>
          )}

          {/* Route Info */}
          {routeInfo && !loading && (
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <div>
                  <div className="text-xs opacity-90">
                    {language === 'mn' ? 'Зай' : language === 'ko' ? '거리' : 'Distance'}
                  </div>
                  <div className="font-semibold">{routeInfo.distance}</div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <div>
                  <div className="text-xs opacity-90">
                    {language === 'mn' ? 'Хугацаа' : language === 'ko' ? '시간' : 'Duration'}
                  </div>
                  <div className="font-semibold">{routeInfo.duration}</div>
                </div>
              </div>
              {isAuthenticated && (
                <button
                  onClick={handleSaveRoute}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl px-4 py-2 flex items-center gap-2 transition-all"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">
                    {language === 'mn' ? 'Хадгалах' : language === 'ko' ? '저장' : 'Save Route'}
                  </span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
              <Loader2 className="w-12 h-12 text-[#4A90A4] animate-spin mb-4" />
              <p className="text-gray-600 text-lg">
                {language === 'mn' ? 'Маршрут бэлтгэж байна...' : language === 'ko' ? '경로 준비 중...' : 'Preparing route...'}
              </p>
            </div>
          )}

          {error && !apiKeyError && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-300 text-yellow-800 px-6 py-3 rounded-xl shadow-lg z-20 max-w-md">
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{language === 'mn' ? 'Таны байршил' : language === 'ko' ? '현재 위치' : 'Your Location'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>{language === 'mn' ? 'Очих газар' : language === 'ko' ? '목적지' : 'Destination'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-[#4A90A4]"></div>
              <span>{language === 'mn' ? 'Маршрут' : language === 'ko' ? '경로' : 'Route'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}