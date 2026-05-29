import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Eye,
  CloudSnow,
  CloudDrizzle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useState, useEffect } from "react";

interface CityWeather {
  city: string;
  cityMn: string;
  cityKo: string;
  temp: number;
  condition: string;
  conditionMn: string;
  conditionKo: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: "sun" | "cloud" | "rain" | "snow" | "drizzle";
  image: string;
  feelsLike: number;
}

export function WeatherSection() {
  const { language, t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState<CityWeather[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Mongolian cities with coordinates
  const cities = [
    {
      city: "Ulaanbaatar",
      cityMn: "Улаанбаатар",
      cityKo: "울란바토르",
      lat: 47.8864,
      lon: 106.9057,
      image:
        "https://images.unsplash.com/photo-1598959988498-d7da04e8e88d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      city: "Erdenet",
      cityMn: "Эрдэнэт",
      cityKo: "에르데네트",
      lat: 49.0333,
      lon: 104.0833,
      image:
        "https://images.unsplash.com/photo-1457269449834-928af64c684d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      city: "Darkhan",
      cityMn: "Дархан",
      cityKo: "다르항",
      lat: 49.4667,
      lon: 105.9667,
      image:
        "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      city: "Khovd",
      cityMn: "Ховд",
      cityKo: "호브드",
      lat: 48.0056,
      lon: 91.6419,
      image:
        "https://images.unsplash.com/photo-1534088568595-a066f410bcda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      city: "Dalanzadgad",
      cityMn: "Даланзадгад",
      cityKo: "달란자드가드",
      lat: 43.5708,
      lon: 104.425,
      image:
        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      city: "Khövsgöl",
      cityMn: "Хөвсгөл",
      cityKo: "회브스골",
      lat: 50.4283,
      lon: 100.1614,
      image:
        "https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      // Replace with your OpenWeatherMap API key
      const API_KEY = "70060adabf627b134019af970c537cd5";

      // Use mock data if API key is not configured
      if (
        !API_KEY ||
        API_KEY === "70060adabf627b134019af970c537cd5"
      ) {
        setLoading(true);
        // Simulate loading delay
        setTimeout(() => {
          setWeatherData([
            {
              city: "Ulaanbaatar",
              cityMn: "Улаанбаатар",
              cityKo: "울란바토르",
              temp: -12,
              feelsLike: -18,
              condition: "Partly Cloudy",
              conditionMn: "Багавтар үүлтэй",
              conditionKo: "부분 흐림",
              humidity: 45,
              windSpeed: 12,
              visibility: 10,
              icon: "cloud",
              image:
                "https://images.unsplash.com/photo-1598959988498-d7da04e8e88d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            },
            {
              city: "Erdenet",
              cityMn: "Эрдэнэт",
              cityKo: "에르데네트",
              temp: -15,
              feelsLike: -20,
              condition: "Light Snow",
              conditionMn: "Цасан бороо",
              conditionKo: "가벼운 눈",
              humidity: 65,
              windSpeed: 8,
              visibility: 7,
              icon: "snow",
              image:
                "https://images.unsplash.com/photo-1457269449834-928af64c684d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            },
            {
              city: "Darkhan",
              cityMn: "Дархан",
              cityKo: "다르항",
              temp: -14,
              feelsLike: -19,
              condition: "Clear Sky",
              conditionMn: "Цэлмэг",
              conditionKo: "맑음",
              humidity: 40,
              windSpeed: 15,
              visibility: 12,
              icon: "sun",
              image:
                "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            },
            {
              city: "Khovd",
              cityMn: "Ховд",
              cityKo: "호브드",
              temp: -18,
              feelsLike: -24,
              condition: "Cloudy",
              conditionMn: "Үүлтэй",
              conditionKo: "흐림",
              humidity: 50,
              windSpeed: 20,
              visibility: 8,
              icon: "cloud",
              image:
                "https://images.unsplash.com/photo-1534088568595-a066f410bcda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            },
            {
              city: "Dalanzadgad",
              cityMn: "Даланзадгад",
              cityKo: "달란자드가드",
              temp: -8,
              feelsLike: -12,
              condition: "Sunny",
              conditionMn: "Нарлаг",
              conditionKo: "화창함",
              humidity: 25,
              windSpeed: 18,
              visibility: 15,
              icon: "sun",
              image:
                "https://images.unsplash.com/photo-1509316785289-025f5b846b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            },
            {
              city: "Khövsgöl",
              cityMn: "Хөвсгөл",
              cityKo: "회브스골",
              temp: -20,
              feelsLike: -26,
              condition: "Snow",
              conditionMn: "Цас орж байна",
              conditionKo: "눈",
              humidity: 70,
              windSpeed: 10,
              visibility: 5,
              icon: "snow",
              image:
                "https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
            },
          ]);
          setLoading(false);
          setError(false);
        }, 800);
        return;
      }

      try {
        setLoading(true);
        setError(false);

        const weatherPromises = cities.map(async (city) => {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=en`;

          const response = await fetch(url);

          if (!response.ok) {
            const errorData = await response
              .json()
              .catch(() => ({}));
            console.error("Weather API error:", {
              status: response.status,
              statusText: response.statusText,
              city: city.city,
              error: errorData,
            });
            throw new Error(
              `Weather API error: ${response.status} ${response.statusText}`,
            );
          }

          const data = await response.json();

          // Map weather condition to icon and translations
          const weatherCode =
            data.weather[0].main.toLowerCase();
          let icon: CityWeather["icon"] = "sun";
          let condition = data.weather[0].description;
          let conditionMn = "";
          let conditionKo = "";

          if (weatherCode.includes("rain")) {
            icon = "rain";
            conditionMn = "Бороо";
            conditionKo = "비";
          } else if (weatherCode.includes("snow")) {
            icon = "snow";
            conditionMn = "Цас";
            conditionKo = "눈";
          } else if (weatherCode.includes("drizzle")) {
            icon = "drizzle";
            conditionMn = "Шиврээ бороо";
            conditionKo = "이슬비";
          } else if (weatherCode.includes("cloud")) {
            icon = "cloud";
            conditionMn = "Үүлтэй";
            conditionKo = "흐림";
          } else {
            icon = "sun";
            conditionMn = "Нарлаг";
            conditionKo = "맑음";
          }

          return {
            city: city.city,
            cityMn: city.cityMn,
            cityKo: city.cityKo,
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            condition:
              condition.charAt(0).toUpperCase() +
              condition.slice(1),
            conditionMn,
            conditionKo,
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
            visibility: Math.round(data.visibility / 1000), // Convert m to km
            icon,
            image: city.image,
          };
        });

        const results = await Promise.all(weatherPromises);
        setWeatherData(results);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
        setError(true);
        setLoading(false);

        // Fallback to mock data if API fails
        setWeatherData([
          {
            city: "Ulaanbaatar",
            cityMn: "Улаанбаатар",
            cityKo: "울란바토르",
            temp: -12,
            feelsLike: -18,
            condition: "Partly Cloudy",
            conditionMn: "Багавтар үүлтэй",
            conditionKo: "부분 흐림",
            humidity: 45,
            windSpeed: 12,
            visibility: 10,
            icon: "cloud",
            image:
              "https://images.unsplash.com/photo-1598959988498-d7da04e8e88d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
          },
          {
            city: "Erdenet",
            cityMn: "Эрдэнэт",
            cityKo: "에르데네트",
            temp: -15,
            feelsLike: -20,
            condition: "Light Snow",
            conditionMn: "Цасан бороо",
            conditionKo: "가벼운 눈",
            humidity: 65,
            windSpeed: 8,
            visibility: 7,
            icon: "snow",
            image:
              "https://images.unsplash.com/photo-1457269449834-928af64c684d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
          },
          {
            city: "Darkhan",
            cityMn: "Дархан",
            cityKo: "다르항",
            temp: -14,
            feelsLike: -19,
            condition: "Clear Sky",
            conditionMn: "Цэлмэг",
            conditionKo: "맑음",
            humidity: 40,
            windSpeed: 15,
            visibility: 12,
            icon: "sun",
            image:
              "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
          },
          {
            city: "Khovd",
            cityMn: "Ховд",
            cityKo: "호브드",
            temp: -18,
            feelsLike: -24,
            condition: "Cloudy",
            conditionMn: "Үүлтэй",
            conditionKo: "흐림",
            humidity: 50,
            windSpeed: 20,
            visibility: 8,
            icon: "cloud",
            image:
              "https://images.unsplash.com/photo-1534088568595-a066f410bcda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
          },
          {
            city: "Dalanzadgad",
            cityMn: "Даланзадгад",
            cityKo: "달란자드가드",
            temp: -8,
            feelsLike: -12,
            condition: "Sunny",
            conditionMn: "Нарлаг",
            conditionKo: "화창함",
            humidity: 25,
            windSpeed: 18,
            visibility: 15,
            icon: "sun",
            image:
              "https://images.unsplash.com/photo-1509316785289-025f5b846b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
          },
          {
            city: "Khövsgöl",
            cityMn: "Хөвсгөл",
            cityKo: "회브스골",
            temp: -20,
            feelsLike: -26,
            condition: "Snow",
            conditionMn: "Цас орж байна",
            conditionKo: "눈",
            humidity: 70,
            windSpeed: 10,
            visibility: 5,
            icon: "snow",
            image:
              "https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
          },
        ]);
      }
    };

    fetchWeather();

    // Refresh weather data every hour (only if API key is configured)
    const API_KEY = "70060adabf627b134019af970c537cd5";
    if (API_KEY && API_KEY !== "70060adabf627b134019af970c537cd5") {
      const refreshInterval = setInterval(
        fetchWeather,
        3600000,
      );
      return () => clearInterval(refreshInterval);
    }
  }, []);

  const getCityName = (city: CityWeather) => {
    if (language === "mn") return city.cityMn;
    if (language === "ko") return city.cityKo;
    return city.city;
  };

  const getCondition = (city: CityWeather) => {
    if (language === "mn") return city.conditionMn;
    if (language === "ko") return city.conditionKo;
    return city.condition;
  };

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case "sun":
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case "rain":
        return (
          <CloudRain className="w-12 h-12 text-blue-400" />
        );
      case "cloud":
        return <Cloud className="w-12 h-12 text-gray-400" />;
      case "snow":
        return (
          <CloudSnow className="w-12 h-12 text-blue-500" />
        );
      case "drizzle":
        return (
          <CloudDrizzle className="w-12 h-12 text-blue-500" />
        );
      default:
        return <Sun className="w-12 h-12 text-yellow-500" />;
    }
  };

  const formatTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Ulaanbaatar",
    };
    return currentTime.toLocaleTimeString(
      language === "mn"
        ? "mn-MN"
        : language === "ko"
          ? "ko-KR"
          : "en-US",
      options,
    );
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-[#FDFBF7] relative overflow-hidden">
      {/* Decorative Mongolian Pattern */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#4A90A4] to-transparent opacity-30"></div>

      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Mongolian Design */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#4A90A4]"></div>
            <Sun className="w-6 h-6 text-[#D4AF37]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#4A90A4]"></div>
          </div>
          
          <h2 className="text-4xl mb-3 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] bg-clip-text text-transparent font-bold">
            {t("weather.title")}
          </h2>
          <p className="text-gray-600 text-lg">
            {t("weather.subtitle")}
          </p>
        </div>

        {/* Loading State */}
        {loading && weatherData.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg p-6 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                </div>
                <div className="mb-6">
                  <div className="h-16 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Weather Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weatherData.map((city, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url(${city.image})`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative p-6">
                    {/* City Name & Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl text-gray-900 mb-1">
                          {getCityName(city)}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {getCondition(city)}
                        </p>
                      </div>
                      {getWeatherIcon(city.icon)}
                    </div>

                    {/* Temperature */}
                    <div className="mb-6">
                      <div className="text-6xl text-gray-900 mb-1">
                        {city.temp > 0 ? "+" : ""}
                        {city.temp}°
                      </div>
                      <div className="text-sm text-gray-500">
                        {language === "mn" && "Цельс"}
                        {language === "ko" && "섭씨"}
                        {language === "en" && "Celsius"}
                      </div>
                    </div>

                    {/* Weather Details */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-col items-center gap-1">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <span className="text-xs text-gray-500">
                          {language === "mn" && "Чийг"}
                          {language === "ko" && "습도"}
                          {language === "en" && "Humidity"}
                        </span>
                        <span className="text-sm text-gray-900">
                          {city.humidity}%
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <Wind className="w-5 h-5 text-cyan-500" />
                        <span className="text-xs text-gray-500">
                          {language === "mn" && "Салхи"}
                          {language === "ko" && "바람"}
                          {language === "en" && "Wind"}
                        </span>
                        <span className="text-sm text-gray-900">
                          {city.windSpeed} km/h
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <Eye className="w-5 h-5 text-purple-500" />
                        <span className="text-xs text-gray-500">
                          {language === "mn" && "Харах"}
                          {language === "ko" && "가시거리"}
                          {language === "en" && "Visibility"}
                        </span>
                        <span className="text-sm text-gray-900">
                          {city.visibility} km
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#4A90A4] rounded-3xl transition-all duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            {language === "mn" &&
              "* Цаг агаарын мэдээлэл ойролцоогоор өгөгдсөн"}
            {language === "ko" &&
              "* 날씨 정보는 대략적인 값입니다"}
            {language === "en" &&
              "* Weather data is approximate for demonstration purposes"}
          </p>
        </div>
      </div>
    </section>
  );
}