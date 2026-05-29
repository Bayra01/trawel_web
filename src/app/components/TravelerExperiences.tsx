import { useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Experience {
  id: number;
  name: string;
  avatar: string;
  country: string;
  quote: string;
  rating: number;
  experience: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    avatar: 'https://images.unsplash.com/photo-1706670708045-e4bee60bdb81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwb3V0ZG9vciUyMGhpa2luZ3xlbnwxfHx8fDE3Njk4Mzg5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    country: 'USA',
    quote: 'Staying in a traditional ger under the stars of the Gobi Desert was absolutely magical. The nomadic family welcomed us with warm hospitality and homemade airag. An experience I\'ll treasure forever!',
    rating: 5,
    experience: 'Ger Camp & Desert Safari',
  },
  {
    id: 2,
    name: 'Thomas Weber',
    avatar: 'https://images.unsplash.com/photo-1656570382480-7d6a0dfcee95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGV1cm9wZWFuJTIwbWFuJTIwdHJhdmVsJTIwYmFja3BhY2t8ZW58MXx8fHwxNzY5ODM4OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    country: 'Germany',
    quote: 'The Eagle Festival in Western Mongolia exceeded all expectations. Witnessing the ancient tradition of eagle hunting and meeting the Kazakh hunters was a profound cultural immersion. Highly recommend!',
    rating: 5,
    experience: 'Eagle Festival Tour',
  },
  {
    id: 3,
    name: 'Yuki Tanaka',
    avatar: 'https://images.unsplash.com/photo-1768933294181-82778103e501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGFzaWFuJTIwdHJhdmVsZXIlMjB3b21hbiUyMGFkdmVudHVyZXxlbnwxfHx8fDE3Njk4Mzg5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    country: 'Japan',
    quote: 'Horse trekking through Orkhon Valley was breathtaking. Our guide taught us about nomadic life and we shared meals with herder families. The landscape is unlike anywhere else on Earth.',
    rating: 5,
    experience: 'Horse Riding Adventure',
  },
  {
    id: 4,
    name: 'Emma Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1706670708045-e4bee60bdb81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwb3V0ZG9vciUyMGhpa2luZ3xlbnwxfHx8fDE3Njk4Mzg5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    country: 'Spain',
    quote: 'Meeting the Tsaatan reindeer herders in the remote north was life-changing. Their way of life is so connected to nature. AYL arranged everything perfectly!',
    rating: 5,
    experience: 'Reindeer Herders Visit',
  },
  {
    id: 5,
    name: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1656570382480-7d6a0dfcee95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGV1cm9wZWFuJTIwbWFuJTIwdHJhdmVsJTIwYmFja3BhY2t8ZW58MXx8fHwxNzY5ODM4OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    country: 'Australia',
    quote: 'The road trip from UB to the Gobi was epic! Our driver/guide was knowledgeable and the ger camps were comfortable. Seeing the Flaming Cliffs at sunset was worth every kilometer.',
    rating: 5,
    experience: 'Gobi Road Trip',
  },
  {
    id: 6,
    name: 'Maria Santos',
    avatar: 'https://images.unsplash.com/photo-1768933294181-82778103e501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGFzaWFuJTIwdHJhdmVsZXIlMjB3b21hbiUyMGFkdmVudHVyZXxlbnwxfHx8fDE3Njk4Mzg5MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    country: 'Brazil',
    quote: 'As a solo female traveler, I felt completely safe and welcomed. The nomadic families treated me like one of their own. Mongolia stole my heart!',
    rating: 5,
    experience: 'Cultural Immersion',
  },
];

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="flex-shrink-0 w-[420px] bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Quote Icon */}
      <div className="mb-6">
        <Quote className="w-10 h-10 text-[#4A90A4]/20" />
      </div>

      {/* Quote Text */}
      <p className="text-gray-700 mb-6 leading-relaxed min-h-[120px]">{experience.quote}</p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-6">
        {[...Array(experience.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#D4A373] text-[#D4A373]" />
        ))}
      </div>

      {/* Experience Type */}
      <div className="inline-block bg-[#4A90A4]/10 text-[#4A90A4] text-xs px-3 py-1.5 rounded-full mb-4">
        {experience.experience}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <img
          src={experience.avatar}
          alt={experience.name}
          className="w-14 h-14 rounded-full object-cover ring-2 ring-[#4A90A4]/20"
        />
        <div>
          <h4 className="text-lg">{experience.name}</h4>
          <p className="text-sm text-gray-600">{experience.country}</p>
        </div>
      </div>
    </div>
  );
}

export function TravelerExperiences() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      setCurrentIndex(prev => {
        if (direction === 'left') return Math.max(0, prev - 1);
        return Math.min(experiences.length - 1, prev + 1);
      });
    }
  };

  return (
    <section id="experiences" className="py-20 px-4 bg-gradient-to-b from-white to-[#FDFBF7] relative overflow-hidden">
      {/* Mongolian Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 40px, #D4AF37 40px, #D4AF37 41px),
            repeating-linear-gradient(90deg, transparent, transparent 40px, #D4AF37 40px, #D4AF37 41px)
          `
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Mongolian Design */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37] rounded-full"></div>
            <div className="w-4 h-4 bg-[#D4AF37] rotate-45 relative">
              <div className="absolute inset-1 bg-white rounded-sm"></div>
            </div>
            <div className="h-1 w-24 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37] rounded-full"></div>
          </div>

          <h2 className="text-5xl mb-4 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] bg-clip-text text-transparent font-bold">
            {t('experiences.title')}
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            {t('experiences.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Scroll Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#4A90A4] hover:text-white transition-all duration-300 -ml-6"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {currentIndex < experiences.length - 1 && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#4A90A4] hover:text-white transition-all duration-300 -mr-6"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Experiences Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] rounded-3xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl mb-2">8,500+</div>
              <p className="text-white/80">Happy Travelers</p>
            </div>
            <div>
              <div className="text-5xl mb-2">95%</div>
              <p className="text-white/80">5-Star Reviews</p>
            </div>
            <div>
              <div className="text-5xl mb-2">50+</div>
              <p className="text-white/80">Ger Camps Partnered</p>
            </div>
            <div>
              <div className="text-5xl mb-2">15</div>
              <p className="text-white/80">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}