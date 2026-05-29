import { useEffect, useRef, useState } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface RouteMapViewerProps {
  waypoints: Array<{
    name: string;
    lat: number;
    lng: number;
  }>;
  onClose: () => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export function RouteMapViewer({
  waypoints,
  onClose,
}: RouteMapViewerProps) {
  const { language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyError, setApiKeyError] = useState(false);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com"]',
      );
      if (existingScript) {
        // Wait for the script to load
        const checkInterval = setInterval(() => {
          if (
            window.google &&
            window.google.maps &&
            window.google.maps.Map
          ) {
            clearInterval(checkInterval);
            initializeMap();
          }
        }, 100);

        // Timeout after 10 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          if (
            !window.google ||
            !window.google.maps ||
            !window.google.maps.Map
          ) {
            setApiKeyError(true);
            setError(
              language === "mn"
                ? "Google Maps API ачаалагдсангүй"
                : language === "ko"
                  ? "Google Maps API를 로드할 수 없습니다"
                  : "Failed to load Google Maps API",
            );
            setLoading(false);
          }
        }, 10000);
        return;
      }

      const script = document.createElement("script");
      // Note: Replace 'YOUR_API_KEY_HERE' with your actual Google Maps API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places,marker,routes,geometry&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Wait a bit for all libraries to load
        setTimeout(() => {
          if (
            window.google &&
            window.google.maps &&
            window.google.maps.Map
          ) {
            initializeMap();
          } else {
            setApiKeyError(true);
            setError(
              language === "mn"
                ? "Google Maps API ачаалагдсангүй - API түлхүүр буруу байна"
                : language === "ko"
                  ? "Google Maps API 로드 실패 - 잘못된 API 키"
                  : "Failed to load Google Maps API - Invalid API key",
            );
            setLoading(false);
          }
        }, 500);
      };
      script.onerror = () => {
        setApiKeyError(true);
        setError(
          language === "mn"
            ? "Газрын зураг ачаалагдсангүй"
            : language === "ko"
              ? "지도를 로드하지 못했습니다"
              : "Failed to load map",
        );
        setLoading(false);
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [language]);

  const initializeMap = async () => {
    if (
      !mapRef.current ||
      !window.google ||
      waypoints.length === 0
    )
      return;

    // Check if API loaded successfully
    if (!window.google.maps) {
      setApiKeyError(true);
      setError(
        language === "mn"
          ? "Google Maps API түлхүүр буруу байна"
          : language === "ko"
            ? "Google Maps API 키 오류"
            : "Google Maps API key error",
      );
      setLoading(false);
      return;
    }
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 6,
      center: { lat: waypoints[0].lat, lng: waypoints[0].lng },
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      mapId: "DEMO_MAP_ID",
    });

    const bounds = new window.google.maps.LatLngBounds();

    // Add markers for each waypoint using AdvancedMarkerElement if available
    waypoints.forEach((point, index) => {
      // Use regular Marker as AdvancedMarkerElement needs more setup
      const marker = new window.google.maps.Marker({
        position: { lat: point.lat, lng: point.lng },
        map: map,
        label: {
          text: (index + 1).toString(),
          color: "white",
          fontWeight: "bold",
        },
        title: point.name,
      });

      bounds.extend({ lat: point.lat, lng: point.lng });

      // Info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><strong>${point.name}</strong><br/>Stop ${index + 1}</div>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });

    // Draw route if we have multiple waypoints
    if (waypoints.length > 1) {
      try {
        // Try to use new Routes API if available
        if (
          window.google.maps.routes &&
          window.google.maps.routes.Route
        ) {
          await computeRouteWithNewAPI(map, waypoints);
        } else {
          // Fallback to straight lines
          drawStraightLines(map, waypoints);
        }
      } catch (err) {
        console.error("Route computation error:", err);
        // Fallback to straight lines
        drawStraightLines(map, waypoints);
      }
    } else {
      setLoading(false);
    }

    map.fitBounds(bounds);
  };

  const computeRouteWithNewAPI = async (
    map: any,
    waypoints: Array<{
      name: string;
      lat: number;
      lng: number;
    }>,
  ) => {
    if (!window.google.maps.routes) {
      drawStraightLines(map, waypoints);
      return;
    }

    try {
      // For multiple waypoints, compute routes in segments
      const allPaths: any[] = [];

      for (let i = 0; i < waypoints.length - 1; i++) {
        const origin = waypoints[i];
        const destination = waypoints[i + 1];

        const request = {
          origin: {
            location: {
              latLng: {
                latitude: origin.lat,
                longitude: origin.lng,
              },
            },
          },
          destination: {
            location: {
              latLng: {
                latitude: destination.lat,
                longitude: destination.lng,
              },
            },
          },
          travelMode: "DRIVE",
          computeAlternativeRoutes: false,
        };

        const response =
          await window.google.maps.routes.Route.computeRoutes(
            request,
          );

        if (response.routes && response.routes.length > 0) {
          const route = response.routes[0];

          if (
            route.polyline &&
            route.polyline.encodedPolyline
          ) {
            const decodedPath =
              window.google.maps.geometry.encoding.decodePath(
                route.polyline.encodedPolyline,
              );
            allPaths.push(...decodedPath);
          }
        }
      }

      if (allPaths.length > 0) {
        new window.google.maps.Polyline({
          path: allPaths,
          geodesic: true,
          strokeColor: "#4A90A4",
          strokeOpacity: 0.7,
          strokeWeight: 4,
          map: map,
        });
      }

      setLoading(false);
    } catch (err) {
      console.error("Routes API error:", err);
      drawStraightLines(map, waypoints);
    }
  };

  const drawStraightLines = (
    map: any,
    waypoints: Array<{
      name: string;
      lat: number;
      lng: number;
    }>,
  ) => {
    // Draw straight lines between waypoints as fallback
    const path = waypoints.map((wp) => ({
      lat: wp.lat,
      lng: wp.lng,
    }));
    new window.google.maps.Polyline({
      path: path,
      geodesic: true,
      strokeColor: "#4A90A4",
      strokeOpacity: 0.6,
      strokeWeight: 3,
      map: map,
    });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {language === "mn"
                  ? "Таны аяллын маршрут"
                  : language === "ko"
                    ? "여행 경로"
                    : "Your Trip Route"}
              </h2>
              <p className="text-white/90">
                {waypoints.length}{" "}
                {language === "mn"
                  ? "газар"
                  : language === "ko"
                    ? "장소"
                    : "stops"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
              <Loader2 className="w-12 h-12 text-[#4A90A4] animate-spin mb-4" />
              <p className="text-gray-600 text-lg">
                {language === "mn"
                  ? "Маршрут бэлтгэж байна..."
                  : language === "ko"
                    ? "경로 준비 중..."
                    : "Preparing route..."}
              </p>
            </div>
          )}

          {error && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-300 text-red-800 px-6 py-3 rounded-xl shadow-lg z-20">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {apiKeyError && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-orange-100 border border-orange-300 text-orange-800 px-6 py-3 rounded-xl shadow-lg z-20 max-w-md text-center">
              <AlertCircle className="w-5 h-5 inline-block mr-2" />
              <p className="font-medium inline">
                {language === "mn"
                  ? "Google Maps API түлхүүр шаардлагатай"
                  : language === "ko"
                    ? "Google Maps API 키 필요"
                    : "Google Maps API key required"}
              </p>
            </div>
          )}

          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Route List */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 max-h-48 overflow-y-auto">
          <h3 className="font-semibold text-gray-700 mb-3">
            {language === "mn"
              ? "Аяллын дараалал:"
              : language === "ko"
                ? "여행 순서:"
                : "Route Order:"}
          </h3>
          <div className="space-y-2">
            {waypoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white p-3 rounded-lg"
              >
                <div className="w-8 h-8 bg-[#4A90A4] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {point.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}