import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Navigation } from './Navigation';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  MapPin, Star, Clock, DollarSign, Calendar, ArrowLeft, 
  Send, Heart, ThumbsUp, MessageCircle, User, ChevronDown, ChevronUp
} from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  likedBy: string[];
}

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
  longDescription: string;
  longDescriptionEn: string;
  longDescriptionMn: string;
  longDescriptionKo: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  bestSeason: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  priceRange: string;
  highlights: string[];
  whatToBring: string[];
  howToGetThere: string;
}

const destinationsData: { [key: string]: Destination } = {
  'khuvsgul': {
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
    longDescription: 'Khuvsgul Lake, known as the "Blue Pearl of Mongolia," is the country\'s largest freshwater lake and one of the most ancient lakes in the world. The lake is 136 km long, 262 m deep, and contains 2% of the world\'s fresh water. The area around the lake is home to nomadic herders, reindeer people, and diverse wildlife including ibex, argali sheep, and bears.',
    longDescriptionEn: 'Khuvsgul Lake, known as the "Blue Pearl of Mongolia," is the country\'s largest freshwater lake and one of the most ancient lakes in the world. The lake is 136 km long, 262 m deep, and contains 2% of the world\'s fresh water. The area around the lake is home to nomadic herders, reindeer people, and diverse wildlife including ibex, argali sheep, and bears.',
    longDescriptionMn: 'Хөвсгөл нуур буюу "Монголын цэнхэр сувд" нь манай орны хамгийн том цэнгэг усны нуур бөгөөд дэлхийн хамгийн эртний нууруудын нэг юм. Нуур нь 136 км урт, 262 м гүн бөгөөд дэлхийн цэнгэг усны 2 хувийг агуулдаг. Нуурын эргэн тойронд нүүдэлчин малчид, цаа буга өсгөгчид болон янз бүрийн зэрлэг амьтад амьдардаг.',
    longDescriptionKo: '몽골의 푸른 진주로 알려진 흡스굴 호수는 몽골 최대의 담수호이자 세계에서 가장 오래된 호수 중 하나입니다. 호수는 길이 136km, 깊이 262m이며 세계 담수의 2%를 포함하고 있습니다. 호수 주변 지역에는 유목민, 순록 목동, 아이벡스, 아르갈리 양, 곰 등 다양한 야생 동물이 서식하고 있습니다.',
    image: 'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGxha2UlMjBraHV2c2d1bCUyMG1vdW50YWluc3xlbnwxfHx8fDE3Njk4Mzg5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGxha2UlMjBraHV2c2d1bCUyMG1vdW50YWluc3xlbnwxfHx8fDE3Njk4Mzg5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1695197943218-be1bb14b6894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHRlbnQlMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc2OTg0MDcxMnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1613294576846-73901118ef6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHdpbGQlMjBob3JzZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY5ODQxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.9,
    reviewCount: 342,
    bestSeason: 'Jun-Sep',
    duration: '3-5 days',
    difficulty: 'Easy',
    priceRange: '$$$',
    highlights: ['Horseback riding along the shore', 'Swimming in crystal clear water', 'Visit Tsaatan reindeer herders', 'Hiking and camping', 'Traditional boat rides', 'Wildlife spotting'],
    whatToBring: ['Warm clothing (nights are cold)', 'Sunscreen and hat', 'Insect repellent', 'Good hiking boots', 'Camera', 'Reusable water bottle'],
    howToGetThere: 'Located 800km from Ulaanbaatar. You can take a domestic flight to Murun (1 hour) then drive 100km, or drive directly (2 days) through scenic landscapes.'
  },
  'gobi': {
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
    longDescription: 'The Gobi Desert is one of the world\'s most unique desert ecosystems. Home to the famous Flaming Cliffs where the first dinosaur eggs were discovered, the towering Khongoryn Els sand dunes, and the icy Yol Valley. Experience camel trekking, visit nomadic families, and witness stunning desert sunsets.',
    longDescriptionEn: 'The Gobi Desert is one of the world\'s most unique desert ecosystems. Home to the famous Flaming Cliffs where the first dinosaur eggs were discovered, the towering Khongoryn Els sand dunes, and the icy Yol Valley. Experience camel trekking, visit nomadic families, and witness stunning desert sunsets.',
    longDescriptionMn: 'Говь бол дэлхийн хамгийн өвөрмөц цөлийн экосистемүүдийн нэг юм. Анхны үлэг гүрвэлийн өндөг олдсон алдартай Баянзаг, өндөр Хонгорын элс, мөсөн Ёлын ам зэрэг газрууд оршдог. Тэмээгээр аялах, нүүдлийн айлууд зочлох, гайхамшигтай цөлийн нар жаргах үзэгдлийг үзэх боломжтой.',
    longDescriptionKo: '고비 사막은 세계에서 가장 독특한 사막 생태계 중 하나입니다. 최초의 공룡 알이 발견된 유명한 플레이밍 클리프, 우뚝 솟은 홍고린 엘스 모래 언덕, 얼음으로 뒤덮인 욜 계곡이 있습니다. 낙타 트레킹을 경험하고, 유목민 가족을 방문하고, 멋진 사막 일몰을 목격하세요.',
    image: 'https://images.unsplash.com/photo-1649357028504-ffc3c1976fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGdvYmklMjBkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5ODM4OTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1649357028504-ffc3c1976fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGdvYmklMjBkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5ODM4OTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1695197943218-be1bb14b6894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHRlbnQlMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc2OTg0MDcxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.8,
    reviewCount: 528,
    bestSeason: 'May-Oct',
    duration: '4-7 days',
    difficulty: 'Moderate',
    priceRange: '$$$$',
    highlights: ['Khongoryn Els singing dunes', 'Flaming Cliffs (Bayanzag)', 'Camel trekking', 'Yol Valley ice formations', 'Dinosaur fossil sites', 'Nomadic family visits'],
    whatToBring: ['Sun protection', 'Warm layers (desert nights are cold)', 'Scarf for dust', 'Comfortable shoes', 'Water bottle', 'Camera'],
    howToGetThere: 'Fly from Ulaanbaatar to Dalanzadgad (1.5 hours) or drive (2-3 days). 4WD vehicles required for desert travel.'
  },
  'terelj': {
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
    longDescription: 'Terelj National Park is one of Mongolia\'s most accessible natural wonders, located just 80km from Ulaanbaatar. Famous for the Turtle Rock formation, Aryabal Buddhist temple, and excellent opportunities for horseback riding, hiking, and staying in traditional ger camps.',
    longDescriptionEn: 'Terelj National Park is one of Mongolia\'s most accessible natural wonders, located just 80km from Ulaanbaatar. Famous for the Turtle Rock formation, Aryabal Buddhist temple, and excellent opportunities for horseback riding, hiking, and staying in traditional ger camps.',
    longDescriptionMn: 'Тэрэлжийн байгалийн цогцолбор газар нь Улаанбаатар хотоос 80 км-ийн зайд байрладаг Монголын хамгийн хялбар очиж болох байгалийн үзэсгэлэнт газрууд юм. Мэлхий хад, Арьяабалын хийд, морь унах, явган аялал хийх, уламжлалт гэрт амрах боломжууд байдаг.',
    longDescriptionKo: '테를지 국립공원은 울란바토르에서 80km 떨어진 곳에 위치한 몽골에서 가장 접근하기 쉬운 자연의 경이로움 중 하나입니다. 거북이 바위, 아랴발 불교 사원, 승마, 하이킹, 전통 게르 캠프 숙박 기회로 유명합니다.',
    image: 'https://images.unsplash.com/photo-1695197943218-be1bb14b6894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHRlbnQlMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc2OTg0MDcxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1695197943218-be1bb14b6894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHRlbnQlMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc2OTg0MDcxMnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGxha2UlMjBraHV2c2d1bCUyMG1vdW50YWluc3xlbnwxfHx8fDE3Njk4Mzg5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.7,
    reviewCount: 486,
    bestSeason: 'May-Sep',
    duration: '1-3 days',
    difficulty: 'Easy',
    priceRange: '$$',
    highlights: ['Turtle Rock', 'Aryabal Meditation Temple', 'Horse riding', 'Traditional ger camps', 'Rock climbing', 'River rafting'],
    whatToBring: ['Comfortable walking shoes', 'Light jacket', 'Sun protection', 'Camera', 'Snacks'],
    howToGetThere: 'Just 80km from Ulaanbaatar - 1.5 hour drive on paved road. Easy day trip or overnight stay.'
  },
  'altai': {
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
    longDescription: 'The Altai Mountains represent Mongolia\'s most dramatic mountain scenery. Home to the Kazakh eagle hunters, glaciers, and the Tavan Bogd peaks. Experience the famous Golden Eagle Festival, explore ancient petroglyphs, and immerse yourself in Kazakh nomadic culture.',
    longDescriptionEn: 'The Altai Mountains represent Mongolia\'s most dramatic mountain scenery. Home to the Kazakh eagle hunters, glaciers, and the Tavan Bogd peaks. Experience the famous Golden Eagle Festival, explore ancient petroglyphs, and immerse yourself in Kazakh nomadic culture.',
    longDescriptionMn: 'Алтайн нурууд нь Монголын хамгийн гайхалтай уулархаг байгалийг төлөөлдөг. Казах бүргэдийн анчид, мөсөн гол, Таван Богдын оргилууд оршдог. Алтан бүргэдийн баяр, эртний хадны зураг, Казахын нүүдлийн соёлыг мэдрээрэй.',
    longDescriptionKo: '알타이 산맥은 몽골에서 가장 극적인 산악 풍경을 대표합니다. 카자흐 독수리 사냥꾼, 빙하, 타반 보그드 봉우리가 있습니다. 유명한 골든 이글 페스티벌을 경험하고, 고대 암각화를 탐험하며, 카자흐 유목 문화에 빠져보세요.',
    image: 'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.9,
    reviewCount: 215,
    bestSeason: 'Jul-Sep',
    duration: '5-10 days',
    difficulty: 'Challenging',
    priceRange: '$$$$',
    highlights: ['Golden Eagle Festival', 'Potanin Glacier', 'Tavan Bogd peaks', 'Kazakh culture', 'Ancient petroglyphs', 'Mountain trekking'],
    whatToBring: ['Warm clothing', 'Mountain gear', 'Good boots', 'High-altitude medicine', 'Sun protection', 'Camera with telephoto lens'],
    howToGetThere: 'Fly from Ulaanbaatar to Ulgii (2.5 hours), then 4WD transfer. Very remote location requiring proper planning.'
  },
  'karakorum': {
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
    longDescription: 'Karakorum was the capital of the Mongol Empire under Genghis Khan\'s son. Today, the Erdene Zuu Monastery stands as Mongolia\'s oldest Buddhist monastery. Explore the museum, ancient ruins, and the beautiful Orkhon Valley UNESCO World Heritage Site.',
    longDescriptionEn: 'Karakorum was the capital of the Mongol Empire under Genghis Khan\'s son. Today, the Erdene Zuu Monastery stands as Mongolia\'s oldest Buddhist monastery. Explore the museum, ancient ruins, and the beautiful Orkhon Valley UNESCO World Heritage Site.',
    longDescriptionMn: 'Хархорин нь Чингис хааны хүүгийн үед Монголын эзэнт гүрний нийслэл байсан. Өнөөдөр Эрдэнэ Зуу хийд нь Монголын хамгийн эртний Буддын шашны хийд болж байна. Музей, эртний туурь балгас, ЮНЕСКО-гийн дэлхийн өв болох Орхоны хөндийг үзэж мэдээрэй.',
    longDescriptionKo: '카라코룸은 칭기즈 칸의 아들 시대 몽골 제국의 수도였습니다. 오늘날 에르덴 주 수도원은 몽골에서 가장 오래된 불교 수도원입니다. 박물관, 고대 유적, 아름다운 오르혼 계곡 유네스코 세계 문화유산을 탐험하세요.',
    image: 'https://images.unsplash.com/photo-1707669904598-05fdfe66a513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGthcmFrb3J1bSUyMGFuY2llbnQlMjBjaXR5fGVufDF8fHx8MTc2OTg0MTUxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1707669904598-05fdfe66a513?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGthcmFrb3J1bSUyMGFuY2llbnQlMjBjaXR5fGVufDF8fHx8MTc2OTg0MTUxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.6,
    reviewCount: 392,
    bestSeason: 'May-Sep',
    duration: '1-2 days',
    difficulty: 'Easy',
    priceRange: '$$',
    highlights: ['Erdene Zuu Monastery', 'Karakorum Museum', 'Orkhon Valley', 'Ancient capital ruins', 'Turtle Rock monument', 'Buddhist temples'],
    whatToBring: ['Comfortable shoes', 'Modest clothing for monastery', 'Camera', 'Sun protection', 'Water'],
    howToGetThere: 'Located 370km from Ulaanbaatar - 6 hour drive on mostly paved roads. Can be combined with Orkhon Valley trip.'
  },
  'tunkhel': {
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
    longDescription: 'Tunkhel is a remote settlement in the Darkhad Valley of Khuvsgul Province, home to the Tsaatan (Dukha) people - one of the last remaining groups of reindeer herders in the world. The Tsaatan live in traditional teepee-style tents called "urts" and migrate seasonally with their reindeer herds. This area offers an incredibly rare glimpse into an ancient way of life, surrounded by pristine taiga forests, crystal-clear rivers, and untouched mountain landscapes. The journey to Tunkhel is challenging but rewards visitors with unforgettable cultural experiences and stunning natural beauty.',
    longDescriptionEn: 'Tunkhel is a remote settlement in the Darkhad Valley of Khuvsgul Province, home to the Tsaatan (Dukha) people - one of the last remaining groups of reindeer herders in the world. The Tsaatan live in traditional teepee-style tents called "urts" and migrate seasonally with their reindeer herds. This area offers an incredibly rare glimpse into an ancient way of life, surrounded by pristine taiga forests, crystal-clear rivers, and untouched mountain landscapes. The journey to Tunkhel is challenging but rewards visitors with unforgettable cultural experiences and stunning natural beauty.',
    longDescriptionMn: 'Түнхэл бол Хөвсгөл аймгийн Дархадын хөндийд байрладаг алслагдмал суурин газар бөгөөд дэлхийн цөөхөн үлдсэн цаа буга малчдын нэг болох Цаатан (Духа) ард түмний нутаг юм. Цаатнууд "өрц" гэж нэрлэгддэг уламжлалт майхан дотор амьдарч, улирлын дагуу цаа буга сүрэгтэйгээ нүүдэллэдэг. Энэ бүс нь эртний амьдралын хэв маягийг үзэх онцгой ховор боломж олгодог бөгөөд хатуу ширэнгэн ойгоор хүрээлэгдсэн, тунгалаг гол мөрөн, хөндөгдөөгүй уулархаг байгаль байдаг. Түнхэл рүү явах зам хэцүү боловч жуулчдад мартагдашгүй соёлын туршлага болон гайхамшигтай байгалийн үзэсгэлэнг бэлэглэдэг.',
    longDescriptionKo: '툰켈은 흡스굴 아이막의 다르하드 계곡에 위치한 외딴 정착지로, 세계에서 마지막으로 남아있는 순록 목동 그룹 중 하나인 차탄(두하) 사람들의 고향입니다. 차탄족은 "우르츠"라고 불리는 전통적인 티피 스타일의 텐트에 살며 순록 떼와 함께 계절에 따라 이동합니다. 이 지역은 순수한 타이가 숲, 수정처럼 맑은 강, 손대지 않은 산악 풍경으로 둘러싸인 고대 생활 방식을 엿볼 수 있는 매우 드문 기회를 제공합니다. 툰켈로 가는 여정은 어렵지만 잊을 수 없는 문화적 경험과 놀라운 자연의 아름다움으로 방문객들에게 보상합니다.',
    image: 'https://images.unsplash.com/photo-1613294576846-73901118ef6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHdpbGQlMjBob3JzZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY5ODQxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1613294576846-73901118ef6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHdpbGQlMjBob3JzZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY5ODQxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGxha2UlMjBraHV2c2d1bCUyMG1vdW50YWluc3xlbnwxfHx8fDE3Njk4Mzg5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.9,
    reviewCount: 87,
    bestSeason: 'Jun-Sep',
    duration: '7-10 days',
    difficulty: 'Very Challenging',
    priceRange: '$$$$',
    highlights: [
      'Meet Tsaatan reindeer herders',
      'Ride reindeer in taiga forest',
      'Stay in traditional urts (teepees)',
      'Experience nomadic reindeer herder lifestyle',
      'Pristine wilderness trekking',
      'Photography of unique culture',
      'Darkhad Valley exploration'
    ],
    whatToBring: [
      'Warm clothing (even in summer)',
      'Waterproof gear',
      'Sturdy hiking boots',
      'Insect repellent (mosquitoes are abundant)',
      'Gifts for host families (tea, sugar, batteries)',
      'Cash (no ATMs)',
      'First aid kit',
      'Sleeping bag',
      'Camera with extra batteries'
    ],
    howToGetThere: 'Extremely remote location. Fly from Ulaanbaatar to Murun (Khuvsgul), then 4WD to Tsagaannuur village (8-10 hours on rough roads). From there, hire horses or arrange helicopter transfer to reach the Tsaatan camps (2-3 days horseback riding through taiga). Professional guide essential. Best organized through tour operators specializing in remote Mongolia travel.',
    lat: 51.5,
    lng: 99.5
  },
  'hustai': {
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
    longDescription: 'Hustai National Park is a successful wildlife reintroduction story. The Przewalski\'s horses (Takhi), extinct in the wild since 1969, were successfully reintroduced here. Today over 300 wild horses roam freely. Also home to red deer, wolves, and diverse bird species.',
    longDescriptionEn: 'Hustai National Park is a successful wildlife reintroduction story. The Przewalski\'s horses (Takhi), extinct in the wild since 1969, were successfully reintroduced here. Today over 300 wild horses roam freely. Also home to red deer, wolves, and diverse bird species.',
    longDescriptionMn: 'Хустайн байгалийн цогцолбор газар нь зэрлэг амьтдыг амжилттай нутагшуулсан түүх юм. 1969 онд байгальд устсан Пржевальскийн морь буюу тахийг энд амжилттай нутагшуулсан. Өнөөдөр 300 гаруй зэрлэг морь чөлөөтэй тэнүүчилдэг. Мөн бугын эрвээхэй, чоно болон олон төрлийн шувууд амьдардаг.',
    longDescriptionKo: '후스타이 국립공원은 성공적인 야생동물 재도입 이야기입니다. 1969년 야생에서 멸종된 프르제발스키 야생마(타히)가 이곳에 성공적으로 재도입되었습니다. 현재 300마리 이상의 야생마가 자유롭게 돌아다닙니다. 또한 붉은 사슴, 늑대, 다양한 조류 종의 서식지입니다.',
    image: 'https://images.unsplash.com/photo-1613294576846-73901118ef6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHdpbGQlMjBob3JzZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY5ODQxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1613294576846-73901118ef6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHdpbGQlMjBob3JzZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY5ODQxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.7,
    reviewCount: 298,
    bestSeason: 'Apr-Oct',
    duration: '1-2 days',
    difficulty: 'Easy',
    priceRange: '$$',
    highlights: ['Wild Takhi horses', 'Wildlife viewing', 'Nature photography', 'Hiking trails', 'Visitor center', 'Sunset horse watching'],
    whatToBring: ['Binoculars', 'Camera with zoom lens', 'Comfortable shoes', 'Insect repellent', 'Sun protection'],
    howToGetThere: 'Located 100km from Ulaanbaatar - 2 hour drive on good roads. Perfect for day trip or overnight camping.'
  },
  'ulaanbaatar': {
    id: 'ulaanbaatar',
    name: 'Ulaanbaatar',
    nameEn: 'Ulaanbaatar',
    nameMn: 'Улаанбаатар',
    nameKo: '울란바토르',
    region: 'Capital City',
    description: 'Mongolia\'s vibrant capital blending modern life with ancient traditions',
    descriptionEn: 'Mongolia\'s vibrant capital blending modern life with ancient traditions',
    descriptionMn: 'Орчин үеийн амьдрал болон эртний уламжлалыг хослуулсан Монголын нийслэл',
    descriptionKo: '현대 생활과 고대 전통이 어우러진 몽골의 활기찬 수도',
    longDescription: 'Ulaanbaatar is Mongolia\'s capital and largest city, home to nearly half the country\'s population. Despite rapid modernization, the city maintains strong connections to nomadic traditions. Visit Buddhist monasteries, explore museums, shop at local markets, and enjoy the nightlife.',
    longDescriptionEn: 'Ulaanbaatar is Mongolia\'s capital and largest city, home to nearly half the country\'s population. Despite rapid modernization, the city maintains strong connections to nomadic traditions. Visit Buddhist monasteries, explore museums, shop at local markets, and enjoy the nightlife.',
    longDescriptionMn: 'Улаанбаатар бол Монголын нийслэл бөгөөд хамгийн том хот, улсын хүн амын бараг талыг эзэлдэг. Хурдацтай хөгжиж байгаа хэдий ч хот нь нүүдэлчдийн уламжлалтай хүчтэй холбоотой хэвээр байна. Буддын хийдүүд зочлох, музей үзэх, захад худалдаа хийх, шөнийн амьдралыг эдлээрэй.',
    longDescriptionKo: '울란바토르는 몽골의 수도이자 최대 도시로 전체 인구의 거의 절반이 거주합니다. 급속한 현대화에도 불구하고 도시는 유목 전통과 강한 연결을 유지합니다. 불교 수도원을 방문하고, 박물관을 탐험하고, 현지 시장에서 쇼핑하고, 나이트라이프를 즐기세요.',
    image: 'https://images.unsplash.com/photo-1653380550474-56f0b47da4cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHVsYWFuYmFhdGFyJTIwY2l0eXxlbnwxfHx8fDE3Njk4Mzg5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1653380550474-56f0b47da4cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHVsYWFuYmFhdGFyJTIwY2l0eXxlbnwxfHx8fDE3Njk4Mzg5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.5,
    reviewCount: 612,
    bestSeason: 'May-Sep',
    duration: '2-3 days',
    difficulty: 'Easy',
    priceRange: '$',
    highlights: ['Gandan Monastery', 'National Museum', 'Sukhbaatar Square', 'Zaisan Memorial', 'Bogd Khan Palace', 'Narantuul Market'],
    whatToBring: ['Comfortable walking shoes', 'Modest clothing for temples', 'Cash for markets', 'Camera', 'City map'],
    howToGetThere: 'International gateway - Chinggis Khaan International Airport. All Mongolia trips start and end here.'
  },
  'orkhon': {
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
    longDescription: 'The Orkhon Valley Cultural Landscape is a UNESCO World Heritage Site showcasing 2000 years of nomadic pastoral traditions. Visit the spectacular Orkhon Waterfall, relax in natural hot springs, explore ancient ruins, and experience authentic nomadic lifestyle.',
    longDescriptionEn: 'The Orkhon Valley Cultural Landscape is a UNESCO World Heritage Site showcasing 2000 years of nomadic pastoral traditions. Visit the spectacular Orkhon Waterfall, relax in natural hot springs, explore ancient ruins, and experience authentic nomadic lifestyle.',
    longDescriptionMn: 'Орхоны хөндийн соёлын дурсгалт газар нь 2000 жилийн нүүдлийн малчдын уламжлалыг харуулсан ЮНЕСКО-гийн дэлхийн өв юм. Орхоны гайхалтай хүрхрээ үзэх, байгалийн халуун рашаанд амрах, эртний туурь балгасууд судлах, жинхэнэ нүүдэлчдийн амьдралыг мэдрээрэй.',
    longDescriptionKo: '오르혼 계곡 문화 경관은 2000년의 유목 목축 전통을 보여주는 유네스코 세계 문화유산입니다. 장관인 오르혼 폭포를 방문하고, 천연 온천에서 휴식하고, 고대 유적을 탐험하고, 진정한 유목 생활을 경험하세요.',
    image: 'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    rating: 4.8,
    reviewCount: 267,
    bestSeason: 'Jun-Sep',
    duration: '2-4 days',
    difficulty: 'Moderate',
    priceRange: '$$',
    highlights: ['Orkhon Waterfall (20m drop)', 'Natural hot springs', 'Ancient Turkic monuments', 'Horseback riding', 'Nomadic family homestays', 'UNESCO World Heritage'],
    whatToBring: ['Swimming clothes for hot springs', 'Hiking boots', 'Warm layers', 'Camera', 'Sun protection', 'Insect repellent'],
    howToGetThere: 'Located 320km from Ulaanbaatar - 6 hour drive. Can be combined with Karakorum visit.'
  }
};

export function DestinationDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const destination = id ? destinationsData[id] : null;

  // Load reviews from localStorage
  useEffect(() => {
    if (id) {
      const savedReviews = localStorage.getItem(`reviews_${id}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    }
  }, [id]);

  // Save reviews to localStorage
  const saveReviews = (newReviews: Review[]) => {
    if (id) {
      localStorage.setItem(`reviews_${id}`, JSON.stringify(newReviews));
      setReviews(newReviews);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      alert('Please log in to leave a review');
      return;
    }

    if (!comment.trim()) {
      alert('Please write a comment');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userName: user.fullName,
      userEmail: user.email,
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
      likes: 0,
      likedBy: []
    };

    saveReviews([newReview, ...reviews]);
    setComment('');
    setRating(5);
  };

  const handleLikeReview = (reviewId: string) => {
    if (!isAuthenticated || !user) {
      alert('Please log in to like reviews');
      return;
    }

    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        const hasLiked = review.likedBy.includes(user.email);
        return {
          ...review,
          likes: hasLiked ? review.likes - 1 : review.likes + 1,
          likedBy: hasLiked 
            ? review.likedBy.filter(email => email !== user.email)
            : [...review.likedBy, user.email]
        };
      }
      return review;
    });

    saveReviews(updatedReviews);
  };

  if (!destination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] to-[#F5F3EF]">
        <Navigation />
        <div className="pt-24 text-center">
          <h1 className="text-3xl text-gray-900">Destination not found</h1>
        </div>
      </div>
    );
  }

  const getDestinationName = () => {
    if (language === 'mn') return destination.nameMn;
    if (language === 'ko') return destination.nameKo;
    return destination.nameEn;
  };

  const getDestinationDescription = () => {
    if (language === 'mn') return destination.descriptionMn;
    if (language === 'ko') return destination.descriptionKo;
    return destination.descriptionEn;
  };

  const getLongDescription = () => {
    if (language === 'mn') return destination.longDescriptionMn;
    if (language === 'ko') return destination.longDescriptionKo;
    return destination.longDescriptionEn;
  };

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDFBF7] to-[#F5F3EF]">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[500px]">
          <img
            src={destination.image}
            alt={getDestinationName()}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          
          {/* Back Button */}
          <Link
            to="/destinations"
            className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white transition-all shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Destinations</span>
          </Link>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                  {destination.region}
                </span>
                <span className={`px-4 py-2 rounded-full text-white text-sm ${
                  destination.difficulty === 'Easy' ? 'bg-green-500/80' :
                  destination.difficulty === 'Moderate' ? 'bg-yellow-500/80' :
                  'bg-red-500/80'
                }`}>
                  {destination.difficulty}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl text-white mb-4">{getDestinationName()}</h1>
              <p className="text-xl text-white/95 max-w-3xl">{getDestinationDescription()}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Quick Info */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#4A90A4]/10 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-[#4A90A4]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Best Season</div>
                      <div className="font-medium text-gray-900">{destination.bestSeason}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#4A90A4]/10 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[#4A90A4]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Duration</div>
                      <div className="font-medium text-gray-900">{destination.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#4A90A4]/10 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-[#4A90A4]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Price Range</div>
                      <div className="font-medium text-gray-900">{destination.priceRange}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#4A90A4]/10 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#4A90A4] fill-[#4A90A4]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Rating</div>
                      <div className="font-medium text-gray-900">{destination.rating} ({destination.reviewCount + reviews.length})</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl mb-4 text-gray-900">About This Destination</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {getLongDescription()}
                </p>
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl mb-6 text-gray-900">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#4A90A4]/5 to-transparent rounded-xl">
                      <div className="w-2 h-2 bg-[#4A90A4] rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Gallery */}
              {destination.gallery && destination.gallery.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                  <h2 className="text-3xl mb-6 text-gray-900">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {destination.gallery.map((image, index) => (
                      <div key={index} className="aspect-square rounded-xl overflow-hidden">
                        <img
                          src={image}
                          alt={`${getDestinationName()} ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl mb-6 text-gray-900 flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-[#4A90A4]" />
                  Reviews ({reviews.length})
                </h2>

                {/* Write Review */}
                {isAuthenticated ? (
                  <form onSubmit={handleSubmitReview} className="mb-8 pb-8 border-b border-gray-200">
                    <h3 className="text-xl mb-4 text-gray-900">Share Your Experience</h3>
                    
                    {/* Star Rating */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-2">Your Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= (hoveredStar || rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-700 mb-2">Your Review</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        placeholder="Share your thoughts about this destination..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A90A4] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submit Review
                    </button>
                  </form>
                ) : (
                  <div className="mb-8 pb-8 border-b border-gray-200 text-center py-8 bg-gray-50 rounded-xl">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">Please log in to leave a review</p>
                    <Link
                      to="/auth"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      Log In
                    </Link>
                  </div>
                )}

                {/* Reviews List */}
                <div className="space-y-6">
                  {displayedReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] rounded-full flex items-center justify-center text-white flex-shrink-0">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-gray-900">{review.userName}</h4>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-4 h-4 ${
                                        star <= review.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          <button
                            onClick={() => handleLikeReview(review.id)}
                            className={`flex items-center gap-2 text-sm transition-colors ${
                              user && review.likedBy.includes(user.email)
                                ? 'text-[#4A90A4]'
                                : 'text-gray-500 hover:text-[#4A90A4]'
                            }`}
                          >
                            <ThumbsUp className={`w-4 h-4 ${user && review.likedBy.includes(user.email) ? 'fill-[#4A90A4]' : ''}`} />
                            <span>Helpful ({review.likes})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show More/Less */}
                {reviews.length > 3 && (
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {showAllReviews ? (
                      <>
                        <ChevronUp className="w-5 h-5" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-5 h-5" />
                        Show All Reviews ({reviews.length})
                      </>
                    )}
                  </button>
                )}

                {reviews.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No reviews yet. Be the first to share your experience!
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* What to Bring */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 sticky top-24">
                <h3 className="text-xl mb-4 text-gray-900">What to Bring</h3>
                <ul className="space-y-3">
                  {destination.whatToBring.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <Heart className="w-4 h-4 text-[#4A90A4] flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Get There */}
              <div className="bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-6 h-6" />
                  <h3 className="text-xl">How to Get There</h3>
                </div>
                <p className="text-white/95 leading-relaxed">
                  {destination.howToGetThere}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}