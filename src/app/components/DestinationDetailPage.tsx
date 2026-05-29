import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Calendar, TrendingUp, DollarSign, Star, Users, Mountain, Camera, Info, Bookmark, BookmarkCheck, Navigation as NavIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { ReviewSection } from './ReviewSection';
import { MapRouteViewer } from './MapRouteViewer';
import { getDestinationCoordinates } from '../data/destinationsCoordinates';

interface DestinationDetail {
  id: string;
  name: string;
  nameMn: string;
  nameKo: string;
  region: string;
  regionMn: string;
  regionKo: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  bestSeason: string;
  duration: string;
  difficulty: string;
  priceRange: string;
  highlights: string[];
  highlightsMn: string[];
  highlightsKo: string[];
  overview: string;
  overviewMn: string;
  overviewKo: string;
  history: string;
  historyMn: string;
  historyKo: string;
  geography: string;
  geographyMn: string;
  geographyKo: string;
  wildlife: string;
  wildlifeMn: string;
  wildlifeKo: string;
  activities: string[];
  activitiesMn: string[];
  activitiesKo: string[];
  bestTimeToVisit: string;
  bestTimeToVisitMn: string;
  bestTimeToVisitKo: string;
  gettingThere: string;
  gettingThereMn: string;
  gettingThereKo: string;
}

interface Review {
  id: string;
  destinationId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const destinationsData: { [key: string]: DestinationDetail } = {
  khuvsgul: {
    id: 'khuvsgul',
    name: 'Lake Khövsgöl',
    nameMn: 'Хөвсгөл нуур',
    nameKo: '흡스굴 호수',
    region: 'Northern Mongolia',
    regionMn: 'Хойд Монгол',
    regionKo: '북부 몽골',
    image: 'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGxha2UlMjBraHV2c2d1bCUyMG1vdW50YWluc3xlbnwxfHx8fDE3Njk4Mzg5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
    ],
    rating: 4.9,
    reviewCount: 342,
    bestSeason: 'Jun-Sep',
    duration: '3-5 days',
    difficulty: 'Easy',
    priceRange: '$$$',
    highlights: ['Horseback riding', 'Lake swimming', 'Tsaatan reindeer herders', 'Hiking trails'],
    highlightsMn: ['Морь унах', 'Нуурт сэлэх', 'Цаатан буга', 'Явган аялал'],
    highlightsKo: ['승마', '호수 수영', '차탄 순록 유목민', '하이킹 코스'],
    overview: 'Lake Khövsgöl is one of seventeen ancient lakes in the world, being more than 2 million years old. It is the largest freshwater lake in Mongolia by volume and the second largest by area. The lake is nicknamed "the Dark Blue Pearl" and is surrounded by pristine forests and mountains.',
    overviewMn: 'Хөвсгөл нуур бол дэлхийн хамгийн эртний 17 нуурын нэг бөгөөд 2 сая гаруй жилийн настай. Энэ нь Монгол дахь эзлэхүүнээрээ хамгийн том, талбайгаараа хоёрдугаарт ордог цэнгэг усны нуур юм. Нуурыг "Хар цэнхэр сувд" гэж нэрлэдэг бөгөөд ой мод, уулсаар хүрээлэгдсэн байдаг.',
    overviewKo: '흡스굴 호수는 200만 년 이상 된 세계 17개 고대 호수 중 하나입니다. 몽골에서 부피로는 가장 크고 면적으로는 두 번째로 큰 담수호입니다. 호수는 "짙은 청색 진주"라는 별명을 가지고 있으며 깨끗한 숲과 산으로 둘러싸여 있습니다.',
    history: 'The lake has been inhabited by nomadic peoples for thousands of years. The Tsaatan (Dukha) people, who are reindeer herders, have lived in the area for centuries, maintaining their traditional way of life. The lake holds great spiritual significance in Mongolian culture.',
    historyMn: 'Энэ нуурын орчимд нүүдэлчид олон мянган жилийн турш амьдарч ирсэн. Буга маллагч Цаатан (Духа) ард түмэн олон зуун жилийн турш энэ бүсэд амьдарч, уламжлалт амьдралын хэв маягаа хадгалсаар ирсэн. Нуур нь Монголын соёлд агуу их ариун ёслолын ач холбогдолтой.',
    historyKo: '이 호수는 수천 년 동안 유목민들이 거주해 왔습니다. 순록을 키우는 차탄(두카) 사람들은 수세기 동안 이 지역에 살면서 전통적인 생활 방식을 유지해 왔습니다. 호수는 몽골 문화에서 큰 영적 의미를 지니고 있습니다.',
    geography: 'Located in northern Mongolia near the Russian border, the lake is 136 km long, 262 m deep, and holds 70% of Mongolia\'s fresh water. It sits at an elevation of 1,645 meters above sea level and is frozen from January to May.',
    geographyMn: 'Оросын хилийн ойролцоо, Монголын хойд хэсэгт байрлах нуур нь 136 км урт, 262 м гүн бөгөөд Монголын цэнгэг усны 70%-ийг агуулдаг. Далайн түвшнээс 1,645 метрийн өндөрт байрладаг бөгөөд 1-р сараас 5-р сар хүртэл мөсөөр хучигдсан байдаг.',
    geographyKo: '러시아 국경 근처 몽골 북부에 위치한 이 호수는 길이 136km, 깊이 262m이며 몽골 담수의 70%를 보유하고 있습니다. 해발 1,645m에 위치하며 1월부터 5월까지 얼어붙습니다.',
    wildlife: 'The area is home to diverse wildlife including argali sheep, ibex, brown bears, wolves, and over 200 species of birds. The lake itself contains unique fish species including lenok and grayling. The surrounding forests are inhabited by elk, sable, and wolverines.',
    wildlifeMn: 'Энэ бүс нутагт аргаль хонь, янгир, хүрэн баавгай, чоно болон 200 гаруй төрлийн шувууд амьдардаг. Нуурт өөрөө ленок, хайрас зэрэг өвөрмөц загасны зүйлүүд байдаг. Эргэн тойрны ойд бугачуудай, булга, зээх амьдардаг.',
    wildlifeKo: '이 지역에는 아르갈리 양, 아이벡스, 불곰, 늑대 및 200종 이상의 조류를 포함한 다양한 야생 동물이 서식합니다. 호수 자체에는 레녹과 그레이링을 포함한 독특한 어종이 있습니다. 주변 숲에는 엘크, 담비, 울버린이 서식합니다.',
    activities: ['Horseback trekking', 'Kayaking and boating', 'Hiking mountain trails', 'Visit Tsaatan reindeer herders', 'Ice activities in winter', 'Wildlife photography', 'Camping by the lake'],
    activitiesMn: ['Морин аялал', 'Сэлүүр болон завиар аялах', 'Уулын зам дагуу явах', 'Цаатан бугачдад зочлох', 'Өвлийн мөсөн спорт', 'Амьтны гэрэл зураг', 'Нуурын эрэг дээр майхан барих'],
    activitiesKo: ['승마 트레킹', '카약 및 보트', '산악 하이킹', '차탄 순록 유목민 방문', '겨울 얼음 활동', '야생동물 사진', '호숫가 캠핑'],
    bestTimeToVisit: 'The best time to visit is from June to September when temperatures are mild (10-20°C) and the lake is ice-free. Winter visits (December-February) offer unique experiences like ice skating and ice fishing, but temperatures can drop to -30°C.',
    bestTimeToVisitMn: 'Хамгийн тохиромжтой үе бол 6-р сараас 9-р сар хүртэл бөгөөд энэ үед температур зөөлөн (10-20°C) байж, нуур мөсгүй байдаг. Өвлийн айлчлал (12-2-р сар) мөсөн талбай, мөсөн загас агнуур зэр��г өвөрмөц туршлага санал болгодог боловч температур -30°C хүртэл буурч болно.',
    bestTimeToVisitKo: '방문하기 가장 좋은 시기는 기온이 온화하고(10-20°C) 호수가 얼지 않는 6월부터 9월까지입니다. 겨울 방문(12월-2월)은 아이스 스케이팅과 얼음 낚시 같은 독특한 경험을 제공하지만 기온이 -30°C까지 떨어질 수 있습니다.',
    gettingThere: 'Located about 800km northwest of Ulaanbaatar. Accessible by domestic flight to Mörön (1.5 hours), then 100km by road (2-3 hours). Alternatively, travel overland from Ulaanbaatar (2-3 days by vehicle). Tour operators offer organized trips including transportation.',
    gettingThereMn: 'Улаанбаатараас баруун хойш 800 орчим км зайтай. Мөрөн хүртэл дотоодын нислэг (1.5 цаг), дараа нь авто замаар 100 км (2-3 цаг). Эсвэл Улаанбаатараас хуурай замаар (машинаар 2-3 хоног). Аялал жуулчлалын компаниуд тээвэр зохион байгуулдаг.',
    gettingThereKo: '울란바토르에서 북서쪽으로 약 800km 떨어져 있습니다. 뫼런까지 국내선 항공편(1.5시간), 그 다음 도로로 100km(2-3시간)로 접근할 수 있습니다. 또는 울란바토르에서 육로로 이동(차량으로 2-3일). 여행사에서 교통편을 포함한 조직적인 여행을 제공합니다.',
  },
  gobi: {
    id: 'gobi',
    name: 'Gobi Desert',
    nameMn: 'Говийн цөл',
    nameKo: '고비 사막',
    region: 'Southern Mongolia',
    regionMn: 'Өмнөд Монгол',
    regionKo: '남부 몽골',
    image: 'https://images.unsplash.com/photo-1649357028504-ffc3c1976fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGdvYmklMjBkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5ODM4OTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1649357028504-ffc3c1976fc4?w=800',
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800',
    ],
    rating: 4.8,
    reviewCount: 528,
    bestSeason: 'May-Oct',
    duration: '4-7 days',
    difficulty: 'Moderate',
    priceRange: '$$$$',
    highlights: ['Khongoryn Els dunes', 'Flaming Cliffs', 'Camel trekking', 'Yol Valley'],
    highlightsMn: ['Хонгорын элсэн манхан', 'Баянзаг (Улаан хад)', 'Тэмээгээр аялах', 'Ёлын ам'],
    highlightsKo: ['홍고린 엘스 모래 언덕', '플레이밍 클리프', '낙타 트레킹', '욜 계곡'],
    overview: 'The Gobi Desert is a large, cold desert and grassland region in northern China and southern Mongolia. It is the sixth largest desert in the world and Asia\'s largest. The desert stretches across both Mongolia and China, with the Mongolian portion offering some of the most spectacular and accessible desert landscapes.',
    overviewMn: 'Говийн цөл бол Хятадын хойд болон Монголын өмнөд хэсэгт оршдог том, хүйтэн цөл, бэлчээрийн бүс нутаг юм. Энэ нь дэлхийн зургаад, Азийн хамгийн том цөл юм. Цөл нь Монгол, Хятад хоёрт тархсан бөгөөд Монголын хэсэг нь хамгийн гайхалтай, хүртээмжтэй цөлийн ландшафтыг санал болгодог.',
    overviewKo: '고비 사막은 중국 북부와 몽골 남부에 있는 거대하고 추운 사막 및 초원 지역입니다. 세계에서 여섯 번째로 크고 아시아에서 가장 큰 사막입니다. 사막은 몽골과 중국에 걸쳐 있으며, 몽골 부분은 가장 멋진 접근 가능한 사막 풍경을 제공합니다.',
    history: 'The Gobi Desert has been an important part of the Mongol Empire and was crossed by the Silk Road. It was home to several important cities along the caravan routes. The region gained international fame when Roy Chapman Andrews discovered dinosaur fossils and eggs at the Flaming Cliffs in the 1920s.',
    historyMn: 'Говийн цөл нь Монголын эзэнт гүрний чухал хэсэг байсан бөгөөд Торгоны замаар дамждаг байв. Энэ нь цөөвөрлөгчдийн замын дагуух хэд хэдэн чухал хотуудын нутаг байсан. 1920-ад онд Рой Чапман Эндрюс Баянзагаас үлэг гүрвэлийн яс, өндөг олсноор бүс нутаг олон улсад алдартай болсон.',
    historyKo: '고비 사막은 몽골 제국의 중요한 부분이었으며 실크로드가 통과했습니다. 카라반 루트를 따라 여러 중요한 도시의 본거지였습니다. 1920년대 로이 채프먼 앤드루스가 플레이밍 클리프에서 공룡 화석과 알을 발견하면서 이 지역은 국제적 명성을 얻었습니다.',
    geography: 'The Gobi is a rain shadow desert formed by the Tibetan Plateau blocking precipitation. Despite its reputation, the Gobi is not entirely sandy - only 5% is covered by sand dunes. The landscape varies from rocky outcrops to gravel plains and massive sand dunes like Khongoryn Els, which stretch for 180 km.',
    geographyMn: 'Говь бол Төвдийн өндөрлөг хур тунадасыг хааж байгаад үүссэн сүүдэрт цөл юм. Говь бүхэлдээ элстэй биш - зөвхөн 5%-ийг нь элсэн манхан эзэлдэг. Ландшафт нь хадархаг хадан хошуунаас эхлээд хайрган тал, 180 км үргэлжилдэг Хонгорын элс зэрэг асар том элсэн манхан хүртэл өөр өөр байдаг.',
    geographyKo: '고비는 티베트 고원이 강수를 차단하여 형성된 비 그림자 사막입니다. 명성에도 불구하고 고비는 완전히 모래로 덮여 있지 않으며 5%만이 모래 언덕으로 덮여 있습니다. 풍경은 바위 노두에서 자갈 평원, 180km에 걸쳐 펼쳐진 홍고린 엘스 같은 거대한 모래 언덕까지 다양합니다.',
    wildlife: 'The Gobi is home to rare and endangered species including the Bactrian camel, Gobi bear (mazaalai), snow leopard, and wild ass (khulan). The region also supports jerboa, wild sheep, and various birds of prey. Many dinosaur fossils have been discovered here, making it a paleontological treasure.',
    wildlifeMn: 'Говь нь хаврагат тэмээ, мазаалай, ирвэс, хулан зэрэг ховор, устаж үгүй болох аюултай амьтдын нутаг юм. Мөн энэ бүс нуагтаа алаг өвс, аргаль, янгир, төрөл бүрийн махчин шувууд амьдардаг. Энд олон үлэг гүрвэлийн чулуужсан олдвор олдсон нь палеонтологийн эрдэнэс болгосон.',
    wildlifeKo: '고비는 박트리아 낙타, 고비 곰(마잘라이), 눈표범, 야생 당나귀(쿨란)를 포함한 희귀하고 멸종 위기에 처한 종의 서식지입니다. 이 지역은 또한 저보아, 야생 양, 다양한 맹금류를 지원합니다. 많은 공룡 화석이 여기서 발견되어 고생물학적 보물이 되었습니다.',
    activities: ['Camel trekking', 'Visit Flaming Cliffs (Bayanzag)', 'Explore Khongoryn Els sand dunes', 'Yol Valley ice canyon', 'Dinosaur fossil sites', 'Stay in traditional ger camps', 'Stargazing', 'Meet nomadic herder families'],
    activitiesMn: ['Тэмээгээр аялах', 'Баянзаг (Улаан хад) үзэх', 'Хонгорын элсийг судлах', 'Ёлын амны мөсөн хавцал', 'Үлэг гүрвэлийн олдворын газар', 'Уламжлалт гэрт байрлах', 'Од харах', 'Нүүдэлчин малчин гэр бүлтэй уулзах'],
    activitiesKo: ['낙타 트레킹', '플레이밍 클리프(바얀작) 방문', '홍고린 엘스 모래 언덕 탐험', '욜 계곡 얼음 협곡', '공룡 화석 유적지', '전통 게르 캠프 숙박', '별 관측', '유목민 가족 만나기'],
    bestTimeToVisit: 'May to October is ideal with pleasant temperatures (15-25°C during day). Summer (June-August) can be hot but evenings are cool. Avoid winter months (November-March) when temperatures can drop to -40°C. Spring (April-May) brings wildflowers but can be windy.',
    bestTimeToVisitMn: '5-10-р сар нь хамгийн тохиромжтой бөгөөд өдрийн температур 15-25°C байна. Зун (6-8-р сар) халуун ч орой сэрүүн байдаг. Өвлийн саруудаас (11-3-р сар) зайлсхий, температур -40°C хүртэл буурч болно. Хавар (4-5-р сар) зэрлэг цэцэг ургадаг ч салхитай байж болно.',
    bestTimeToVisitKo: '5월부터 10월까지가 이상적이며 낮 기온이 15-25°C로 쾌적합니다. 여름(6-8월)은 더울 수 있지만 저녁은 시원합니다. 기온이 -40°C까지 떨어질 수 있는 겨울(11-3월)은 피하세요. 봄(4-5월)은 야생화가 피지만 바람이 많이 불 수 있습니다.',
    gettingThere: 'Most tours depart from Ulaanbaatar and take 2-7 days depending on destinations. The journey is typically 6-8 hours by vehicle to reach the main Gobi sites. Some ger camps offer package tours including transport, meals, and activities. Domestic flights to Dalanzadgad are available.',
    gettingThereMn: 'Ихэнх аялал Улаанбаатараас хөдөлж, газруудаас хамааран 2-7 хоног үргэлжилнэ. Говийн гол газруудад хүрэхэд ихэвчлэн машинаар 6-8 цаг явна. Зарим гэрийн бааз нь тээвэр, хоол, үйл ажиллагааг багтаасан багц аялал санал болгодог. Даланзадгад хүртэл дотоодын нислэг байдаг.',
    gettingThereKo: '대부분의 투어는 울란바토르에서 출발하며 목적지에 따라 2-7일이 소요됩니다. 주요 고비 유적지에 도달하는 데 일반적으로 차량으로 6-8시간이 걸립니다. 일부 게르 캠프는 교통편, 식사 및 활동을 포함한 패키지 투어를 제공합니다. 달란자드가드까지 국내선 항공편이 있습니다.',
  },
  terelj: {
    id: 'terelj',
    name: 'Terelj National Park',
    nameMn: 'Тэрэлжийн байгалийн цогцолбор газар',
    nameKo: '테를지 국립공원',
    region: 'Central Mongolia',
    regionMn: 'Төв Монгол',
    regionKo: '중부 몽골',
    image: 'https://images.unsplash.com/photo-1695197943218-be1bb14b6894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHRlbnQlMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc2OTg0MDcxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1695197943218-be1bb14b6894?w=800',
      'https://images.unsplash.com/photo-1478827536313-e363b7d05fd4?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    rating: 4.7,
    reviewCount: 486,
    bestSeason: 'May-Sep',
    duration: '1-3 days',
    difficulty: 'Easy',
    priceRange: '$$',
    highlights: ['Turtle Rock', 'Aryabal Temple', 'Horse riding', 'Ger camps'],
    highlightsMn: ['Мэлхий хад', 'Арьяабалын хийд', 'Морь унах', 'Гэрийн бааз'],
    highlightsKo: ['거북 바위', '아리야발 사원', '승마', '게르 캠프'],
    overview: 'Gorkhi-Terelj National Park is one of Mongolia\'s most visited protected areas due to its proximity to Ulaanbaatar (80 km). The park features spectacular alpine scenery, including unique rock formations, lush valleys, and winding rivers. It offers an accessible introduction to Mongolia\'s natural beauty.',
    overviewMn: 'Горхи-Тэрэлжийн байгалийн цогцолбор газар нь Улаанбаатараас ойрхон (80 км) байдаг учраас Монголын хамгийн их зочилдог хамгаалалттай газруудын нэг юм. Цогцолборт газар нь өвөрмөц хадан чулуу, ногоон хөндий, мөчрөөс гол зэрэг гайхалтай алпийн үзэсгэлэнт байдаг. Энэ нь Монголын байгалийн гоо үзэсгэлэнг танин мэдэх хялбар боломж олгодог.',
    overviewKo: '고르히-테를지 국립공원은 울란바토르와의 근접성(80km) 때문에 몽골에서 가장 많이 방문하는 보호 지역 중 하나입니다. 공원은 독특한 암석층, 무성한 계곡, 구불구불한 강을 포함한 멋진 고산 풍경을 특징으로 합니다. 몽골의 자연미를 접할 수 있는 접근 가능한 소개를 제공합니다.',
    history: 'The park was established as a tourist zone in 1964 and granted National Park status in 1993. The area has been used by nomadic herders for centuries. Aryabal Meditation Temple was built in 1998 as a spiritual retreat center, reflecting the region\'s Buddhist heritage.',
    historyMn: '1964 онд аялал жуулчлалын бүс болж байгуулагдсан бөгөөд 1993 онд Үндэсний цогцолборт газрын статус авсан. Энэ бүс нутгийг олон зуун жилийн турш нүүдэлчин малчид ашиглаж ирсэн. Арьяабалын бясалгалын хийдийг 1998 онд сүнслэг амралтын төв болгон барьсан нь бүс нутгийн буддын шашны өвийг тусгасан.',
    historyKo: '공원은 1964년 관광 구역으로 설립되었으며 1993년 국립공원 지위를 부여받았습니다. 이 지역은 수세기 동안 유목민 목동들이 사용해 왔습니다. 아리야발 명상 사원은 1998년에 영적 수양 센터로 건립되어 지역의 불교 유산을 반영합니다.',
    geography: 'Located in the Khan Khentii mountain range at elevations of 1,600-2,664 meters. The park covers 2,932 square kilometers of alpine meadows, forests of larch and birch, and granite rock formations. The Terelj River flows through the park, creating scenic valleys.',
    geographyMn: 'Хан Хэнтийн нурууд 1,600-2,664 метрийн өндөрт оршдог. Цогцолборт газар нь 2,932 км.кв талбайн алпийн нуга, шинэс, хус модны ой, боржин чулуун формацуудыг эзэлдэг. Тэрэлж гол нь цогцолборт газраар урсаж үзэсгэлэнт хөндий үүсгэдэг.',
    geographyKo: '칸 헨티 산맥에 해발 1,600-2,664m에 위치합니다. 공원은 2,932평방킬로미터의 고산 초원, 낙엽송과 자작나무 숲, 화강암 암석층을 포함합니다. 테를지 강이 공원을 흐르며 경치 좋은 계곡을 만듭니다.',
    wildlife: 'The park is home to brown bears, wolves, foxes, elk, and over 250 species of birds including golden eagles and black vultures. Siberian marmots are commonly seen in summer. The diverse ecosystem supports various wildflowers and medicinal plants.',
    wildlifeMn: 'Цогцолборт газарт хүрэн баавгай, чоно, үнэг, бугачуудай болон алтан бүргэд, хар тас зэрэг 250 гаруй төрлийн шувууд амьдардаг. Зуны улиралд сибирийн тарвага ихээр ажиглагддаг. Олон янзын экосистем нь төрөл бүрийн зэрлэг цэцэг, эмийн ургамлыг дэмждэг.',
    wildlifeKo: '공원은 불곰, 늑대, 여우, 엘크, 황금 독수리와 검은 독수리를 포함한 250종 이상의 조류의 서식지입니다. 여름에는 시베리아 마멋이 흔히 보입니다. 다양한 생태계는 다양한 야생화와 약용 식물을 지원합니다.',
    activities: ['Horse riding tours', 'Hiking to Turtle Rock', 'Visit Aryabal Meditation Temple', 'Rock climbing', 'River rafting', 'Stay in luxury ger camps', 'Photography', 'Buddhist meditation retreats'],
    activitiesMn: ['Морин аялал', 'Мэлхий хад руу явган аялал', 'Арьяабалын хийд үзэх', 'Хадан авирах', 'Голын сэлүүр', 'Тансаг гэрт байрлах', 'Гэрэл зураг', 'Буддын бясалгалын зугаалга'],
    activitiesKo: ['승마 투어', '거북 바위 하이킹', '아리야발 명상 사원 방문', '암벽 등반', '래프팅', '럭셔리 게르 캠프 숙박', '사진', '불교 명상 수련'],
    bestTimeToVisit: 'May to September offers the best weather with temperatures of 15-25°C. Summer (June-August) is peak season with green valleys and wildflowers. Autumn (September) brings golden colors. Winter visits are possible but temperatures drop to -20°C.',
    bestTimeToVisitMn: '5-9-р сар нь 15-25°C температуртай хамгийн сайн цаг агаарыг санал болгоно. Зун (6-8-р сар) нь ногоон хөндий, зэрлэг цэцгийн оргил улирал. Намар (9-р сар) алтан өнгө авчирна. Өвлийн айлчлал боломжтой ч температур -20°C хүртэл буурна.',
    bestTimeToVisitKo: '5월부터 9월까지 15-25°C의 기온으로 최고의 날씨를 제공합니다. 여름(6-8월)은 녹색 계곡과 야생화가 있는 성수기입니다. 가을(9월)은 황금빛을 가져옵니다. 겨울 방문도 가능하지만 기온이 -20°C까지 떨어집니다.',
    gettingThere: 'Only 80 km northeast of Ulaanbaatar, easily accessible by paved road (1.5-2 hours drive). Many tour operators offer day trips or overnight stays. Public buses run daily from Ulaanbaatar. Taxis and rental cars are readily available.',
    gettingThereMn: 'Улаанбаатараас зүүн хойш зөвхөн 80 км зайтай, хатуу замаар хялбархан хүрч очих боломжтой (1.5-2 цаг). Олон аялал жуулчлалын компани өдрийн аялал эсвэл шөнийн байрлалт санал болгодог. Улаанбаатараас өдөр бүр нийтийн автобус явдаг. Такси, түрээсийн машин бэлэн байдаг.',
    gettingThereKo: '울란바토르에서 북동쪽으로 80km에 불과하며 포장 도로로 쉽게 접근할 수 있습니다(1.5-2시간 운전). 많은 여행사가 당일치기 여행이나 숙박을 제공합니다. 울란바토르에서 매일 공공 버스가 운행됩니다. 택시와 렌터카를 쉽게 이용할 수 있습니다.',
  },
  // Additional destinations would follow the same pattern...
  altai: {
    id: 'altai',
    name: 'Altai Mountains',
    nameMn: 'Алтайн нуруу',
    nameKo: '알타이 산맥',
    region: 'Western Mongolia',
    regionMn: 'Баруун Монгол',
    regionKo: '서부 몽골',
    image: 'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1587029720533-0b873e9df001?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
    ],
    rating: 4.9,
    reviewCount: 215,
    bestSeason: 'Jul-Sep',
    duration: '5-10 days',
    difficulty: 'Challenging',
    priceRange: '$$$$',
    highlights: ['Eagle Festival', 'Potanin Glacier', 'Tavan Bogd peaks', 'Kazakh culture'],
    highlightsMn: ['Бүргэдийн наадам', 'Потанины мөсөн гол', 'Таван богд оргил', 'Казах соёл'],
    highlightsKo: ['독수리 축제', '포타닌 빙하', '타반 보그드 봉우리', '카자흐 문화'],
    overview: 'The Altai Mountains in western Mongolia represent one of the most remote and spectacular wilderness areas in Asia. Home to Mongolia\'s highest peaks including Khüiten Peak (4,374m), this region preserves the ancient traditions of Kazakh eagle hunters and offers pristine glaciers, alpine lakes, and diverse wildlife.',
    overviewMn: 'Баруун Монголын Алтайн нуруу нь Азийн хамгийн алслагдмал, гайхалтай цөлжсөн газруудын нэг юм. Хүйтэн оргил (4,374м) зэрэг Монголын хамгийн өндөр оргилуудын нутаг болох энэ бүс нутагт Казах бүргэдийн анчдын эртний уламжлал, цэвэр мөсөн гол, алпийн нуур, олон янзын зэрлэг амьтад байдаг.',
    overviewKo: '몽골 서부의 알타이 산맥은 아시아에서 가장 외딴 멋진 야생 지역 중 하나를 나타냅니다. 훼이텐 봉우리(4,374m)를 포함한 몽골의 최고봉이 있는 이 지역은 카자흐 독수리 사냥꾼의 고대 전통을 보존하고 깨끗한 빙하, 고산 호수, 다양한 야생 동물을 제공합니다.',
    history: 'The Altai region has been inhabited for thousands of years, with ancient petroglyphs and burial mounds (kurgans) dating back to the Bronze Age. The area is culturally significant as home to Mongolia\'s Kazakh minority, who have preserved their distinct language, customs, and the ancient art of eagle hunting across generations.',
    historyMn: 'Алтайн бүс нутагт олон мянган жилийн турш хүн амьдарч ирсэн бөгөөд Хүрэл зэвсгийн үед хамаарах эртний хадны зураг, булш (курган) байдаг. Энэ бүс нутаг нь Монголын Казах цөөнхийн нутаг бөгөөд тэд үе дамжсан хэл, ёс заншил, бүргэдийн анчны эртний урлагаа хадгалж ирсэн.',
    historyKo: '알타이 지역은 청동기 시대로 거슬러 올라가는 고대 암각화와 고분(쿠르간)과 함께 수천 년 동안 거주해 왔습니다. 이 지역은 몽골의 카자흐 소수 민족의 고향으로 문화적으로 중요하며, 그들은 세대를 거쳐 고유한 언어, 관습, 독수리 사냥의 고대 예술을 보존해 왔습니다.',
    geography: 'The Mongol Altai range stretches over 1,000 km across western Mongolia. The Tavan Bogd massif contains five sacred peaks, with permanent glaciers including the Potanin Glacier. The landscape varies from snow-capped peaks to alpine meadows, crystal-clear lakes, and river valleys.',
    geographyMn: 'Монголын Алтайн нуруу баруун Монголоор 1,000 гаруй км үргэлжилдэг. Таван богдын нуруу таван ариун оргилтой бөгөөд Потанины мөсөн гол зэрэг мөнхийн мөсөн голтой. Ландшафт нь цасан оргилоос эхлээд алпийн нуга, цэнгэг нуур, голын хөндий хүртэл олон янз байдаг.',
    geographyKo: '몽골 알타이 산맥은 몽골 서부를 가로질러 1,000km 이상 뻗어 있습니다. 타반 보그드 산괴는 포타닌 빙하를 포함한 영구 빙하와 함께 다섯 개의 신성한 봉우리를 포함합니다. 풍경은 눈 덮인 봉우리에서 고산 초원, 맑은 호수, 강 계곡까지 다양합니다.',
    wildlife: 'The Altai supports incredible biodiversity including snow leopards, ibex, argali sheep, wolves, and golden eagles. The region is a UNESCO World Heritage site partly due to its importance for endangered species. Rare birds like lammergeiers and saker falcons nest in the mountains.',
    wildlifeMn: 'Алтайд цасан ирвэс, янгир, аргаль, чоно, алтан бүргэд зэрэг гайхалтай биологийн олон янз байдал байдаг. Энэ бүс нутаг нь устаж үгүй болох аюулд орсон амьтдын ач холбогдлоос болж ЮНЕСКО-гийн дэлхийн өвийн дурсгалт газар юм. Ламмергайер, шонхор зэрэг ховор шувууд уулсад үүрээ тавьдаг.',
    wildlifeKo: '알타이는 눈표범, 아이벡스, 아르갈리 양, 늑대, 황금 독수리를 포함한 놀라운 생물 다양성을 지원합니다. 이 지역은 멸종 위기 종에 대한 중요성 때문에 부분적으로 유네스코 세계 유산입니다. 라머가이어와 사커 매 같은 희귀 조류가 산에 둥지를 틉니다.',
    activities: ['Eagle hunting demonstrations', 'Mountain trekking and climbing', 'Visit Kazakh families', 'Attend Golden Eagle Festival (October)', 'Glacier hiking', 'Horseback riding', 'Petroglyphs viewing', 'Photography expeditions'],
    activitiesMn: ['Бүргэдийн анчны үзүүлбэр', 'Уулын явган аялал, авирах', 'Казах гэр бүлд зочлох', 'Алтан бүргэдийн наадамд оролцох (10-р сар)', 'Мөсөн голын аялал', 'Морь унах', 'Хадны зураг үзэх', 'Гэрэл зургийн экспедиц'],
    activitiesKo: ['독수리 사냥 시연', '산악 트레킹 및 등반', '카자흐 가족 방문', '황금 독수리 축제 참석 (10월)', '빙하 하이킹', '승마', '암각화 관람', '사진 탐험'],
    bestTimeToVisit: 'July to September offers the best weather for trekking with temperatures of 10-20°C. October is ideal for the Eagle Festival but nights are cold. Winter (November-March) is extremely harsh with temperatures dropping to -40°C. Spring brings wildflowers but unpredictable weather.',
    bestTimeToVisitMn: '7-9-р сар нь 10-20°C температуртай явган аялалд хамгийн сайн цаг агаарыг санал болгоно. 10-р сар нь Бүргэдийн наадамд тохиромжтой боловч шөнө хүйтэн байдаг. Өвөл (11-3-р сар) -40°C хүртэл буурч маш хатуу байна. Хавар зэрлэг цэцэг ургадаг ч цаг агаар тогтворгүй.',
    bestTimeToVisitKo: '7월부터 9월까지 10-20°C의 기온으로 트레킹에 가장 좋은 날씨를 제공합니다. 10월은 독수리 축제에 이상적이지만 밤은 춥습니다. 겨울(11-3월)은 기온이 -40°C까지 떨어지는 극도로 혹독합니다. 봄은 야생화를 가져오지만 예측할 수 없는 날씨입니다.',
    gettingThere: 'The nearest major town is Ölgii, accessible by domestic flight from Ulaanbaatar (2.5 hours) or overland journey (3-4 days). From Ölgii, it\'s another 4-6 hours by 4WD to Tavan Bogd base camp. Due to remoteness, organized tours with experienced guides are highly recommended.',
    gettingThereMn: 'Хамгийн ойрын том хот бол Өлгий бөгөөд Улаанбаатараас дотоодын нислэг (2.5 цаг) эсвэл хуурай замаар (3-4 хоног) хүрч очих боломжтой. Өлгийгөөс Таван богдын суурийн баазад 4WD машинаар 4-6 цаг явна. Алслагдсан байдлаас болж туршлагатай хөтөчтэй зохион байгуулалттай аялал маш зөвлөмжтэй.',
    gettingThereKo: '가장 가까운 주요 도시는 올기이로 울란바토르에서 국내선 항공편(2.5시간) 또는 육로 여행(3-4일)으로 접근할 수 있습니다. 올기이에서 타반 보그드 베이스 캠프까지 4WD로 4-6시간이 더 걸립니다. 외딴 곳이기 때문에 경험 많은 가이드와 함께하는 조직적인 투어를 강력히 권장합니다.',
  },
  'lake-khovsgol': {
    id: 'lake-khovsgol',
    name: 'Lake Khövsgöl',
    nameMn: 'Хөвсгөл нуур',
    nameKo: '흡스굴 호수',
    region: 'Northern Mongolia',
    regionMn: 'Хойд Монгол',
    regionKo: '북부 몽골',
    image: 'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGxha2UlMjBraHV2c2d1bCUyMG1vdW50YWluc3xlbnwxfHx8fDE3Njk4Mzg5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
    ],
    rating: 4.9,
    reviewCount: 623,
    bestSeason: 'Jun-Sep',
    duration: '3-5 days',
    difficulty: 'Easy',
    priceRange: '$$$',
    highlights: ['Horseback riding', 'Lake swimming', 'Tsaatan reindeer herders', 'Hiking trails'],
    highlightsMn: ['Морь унах', 'Нуурт сэлэх', 'Цаатан буга', 'Явган аялал'],
    highlightsKo: ['승마', '호수 수영', '차탄 순록 유목민', '하이킹 코스'],
    overview: 'Lake Khövsgöl is one of seventeen ancient lakes in the world, being more than 2 million years old. It is the largest freshwater lake in Mongolia by volume and the second largest by area. The lake is nicknamed "the Dark Blue Pearl" and is surrounded by pristine forests and mountains.',
    overviewMn: 'Хөвсгөл нуур бол дэлхийн хамгийн эртний 17 нуурын нэг бөгөөд 2 сая гаруй жилийн настай. Энэ нь Монгол дахь эзлэхүүнээрээ хамгийн том, талбайгаараа хоёрдугаарт ордог цэнгэг усны нуур юм. Нуурыг "Хар цэнхэр сувд" гэж нэрлэдэг бөгөөд ой мод, уулсаар хүрээлэгдсэн байдаг.',
    overviewKo: '흡스굴 호수는 200만 년 이상 된 세계 17개 고대 호수 중 하나입니다. 몽골에서 부피로는 가장 크고 면적으로는 두 번째로 큰 담수호입니다. 호수는 "짙은 청색 진주"라는 별명을 가지고 있으며 깨끗한 숲과 산으로 둘러싸여 있습니다.',
    history: 'The lake has been inhabited by nomadic peoples for thousands of years. The Tsaatan (Dukha) people, who are reindeer herders, have lived in the area for centuries, maintaining their traditional way of life. The lake holds great spiritual significance in Mongolian culture.',
    historyMn: 'Энэ нуурын орчимд нүүдэлчид олон мянган жилийн турш амьдарч ирсэн. Буга маллагч Цаатан (Духа) ард түмэн олон зуун жилийн турш энэ бүсэд амьдарч, уламжлалт амьдралын хэв маягаа хадгалсаар ирсэн. Нуур нь Монголын соёлд агуу их ариун ёслолын ач холбогдолтой.',
    historyKo: '이 호수는 수천 년 동안 유목민들이 거주해 왔습니다. 순록을 키우는 차탄(두카) 사람들은 수세기 동안 이 지역에 살면서 전통적인 생활 방식을 유지해 왔습니다. 호수는 몽골 문화에서 큰 영적 의미를 지니고 있습니다.',
    geography: 'Located in northern Mongolia near the Russian border, the lake is 136 km long, 262 m deep, and holds 70% of Mongolia\'s fresh water. It sits at an elevation of 1,645 meters above sea level and is frozen from January to May.',
    geographyMn: 'Оросын хилийн ойролцоо, Монголын хойд хэсэгт байрлах нуур нь 136 км урт, 262 м гүн бөгөөд Монголын цэнгэг усны 70%-ийг агуулдаг. Далайн түвшнээс 1,645 метрийн өндөрт байрладаг бөгөөд 1-р сараас 5-р сар хүртэл мөсөөр хучигдсан байдаг.',
    geographyKo: '러시아 국경 근처 몽골 북부에 위치한 이 호수는 길이 136km, 깊이 262m이며 몽골 담수의 70%를 보유하고 있습니다. 해발 1,645m에 위치하며 1월부터 5월까지 얼어붙습니다.',
    wildlife: 'The area is home to diverse wildlife including argali sheep, ibex, brown bears, wolves, and over 200 species of birds. The lake itself contains unique fish species including lenok and grayling. The surrounding forests are inhabited by elk, sable, and wolverines.',
    wildlifeMn: 'Энэ бүс нутагт аргаль хонь, янгир, хүрэн баавгай, чоно болон 200 гаруй төрлийн шувууд амьдардаг. Нуурт өөрөө ленок, хайрас зэрэг өвөрмөц загасны зүйлүүд байдаг. Эргэн тойрны ойд бугачуудай, булга, зээх амьдардаг.',
    wildlifeKo: '이 지역에는 아르갈리 양, 아이벡스, 불곰, 늑대 및 200종 이상의 조류를 포함한 다양한 야생 동물이 서식합니다. 호수 자체에는 레녹과 그레이링을 포함한 독특한 어종이 있습니다. 주변 숲에는 엘크, 담비, 울버린이 서식합니다.',
    activities: ['Horseback trekking', 'Kayaking and boating', 'Hiking mountain trails', 'Visit Tsaatan reindeer herders', 'Ice activities in winter', 'Wildlife photography', 'Camping by the lake'],
    activitiesMn: ['Морин аялал', 'Сэлүүр болон завиар аялах', 'Уулын зам дагуу явах', 'Цаатан бугачдад зочлох', 'Өвлийн мөсөн спорт', 'Амьтны гэрэл зураг', 'Нуурын эрэг дээр майхан барих'],
    activitiesKo: ['승마 트레킹', '카약 및 보트', '산악 하이킹', '차탄 순록 유목민 방문', '겨울 얼음 활동', '야생동물 사진', '호숫가 캠핑'],
    bestTimeToVisit: 'The best time to visit is from June to September when temperatures are mild (10-20°C) and the lake is ice-free. Winter visits (December-February) offer unique experiences like ice skating and ice fishing, but temperatures can drop to -30°C.',
    bestTimeToVisitMn: 'Хамгийн тохиромжтой үе бол 6-р сараас 9-р сар хүртэл бөгөөд энэ үед температур зөөлөн (10-20°C) байж, нуур мөсгүй байдаг. Өвлийн айлчлал (12-2-р сар) мөсөн талбай, мөсөн загас агнуур зэрэг өвөрмөц туршлага санал болгодог боловч температур -30°C хүртэл буурч болно.',
    bestTimeToVisitKo: '방문하기 가장 좋은 시기는 기온이 온화하고(10-20°C) 호수가 얼지 않는 6월부터 9월까지입니다. 겨울 방문(12월-2월)은 아이스 스케이팅과 얼음 낚시 같은 독특한 경험을 제공하지만 기온이 -30°C까지 떨어질 수 있습니다.',
    gettingThere: 'Located about 800km northwest of Ulaanbaatar. Accessible by domestic flight to Mörön (1.5 hours), then 100km by road (2-3 hours). Alternatively, travel overland from Ulaanbaatar (2-3 days by vehicle). Tour operators offer organized trips including transportation.',
    gettingThereMn: 'Улаанбаатараас баруун хойш 800 орчим км зайтай. Мөрөн хүртэл дотоодын нислэг (1.5 цаг), дараа нь авто замаар 100 км (2-3 цаг). Эсвэл Улаанбаатараас хуурай замаар (машинаар 2-3 хоног). Аялал жуулчлалын компаниуд тээвэр зохион байгуулдаг.',
    gettingThereKo: '울란바토르에서 북서쪽으로 약 800km 떨어져 있습니다. 뫼런까지 국내선 항공편(1.5시간), 그 다음 도로로 100km(2-3시간)로 접근할 수 있습니다. 또는 울란바토르에서 육로로 이동(차량으로 2-3일). 여행사에서 교통편을 포함한 조직적인 여행을 제공합니다.',
  },
  'altai-tavan-bogd': {
    id: 'altai-tavan-bogd',
    name: 'Altai Tavan Bogd',
    nameMn: 'Алтайн Таван богд',
    nameKo: '알타이 타반 보그드',
    region: 'Western Mongolia',
    regionMn: 'Баруун Монгол',
    regionKo: '서부 몽골',
    image: 'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1587029720533-0b873e9df001?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
    ],
    rating: 5,
    reviewCount: 342,
    bestSeason: 'Jul-Sep',
    duration: '5-10 days',
    difficulty: 'Challenging',
    priceRange: '$$$$',
    highlights: ['Eagle Festival', 'Potanin Glacier', 'Tavan Bogd peaks', 'Kazakh culture'],
    highlightsMn: ['Бүргэдийн наадам', 'Потанины мөсөн гол', 'Таван богд оргил', 'Казах соёл'],
    highlightsKo: ['독수리 축제', '포타닌 빙하', '타반 보그드 봉우리', '카자흐 문화'],
    overview: 'The Altai Mountains in western Mongolia represent one of the most remote and spectacular wilderness areas in Asia. Home to Mongolia\'s highest peaks including Khüiten Peak (4,374m), this region preserves the ancient traditions of Kazakh eagle hunters and offers pristine glaciers, alpine lakes, and diverse wildlife.',
    overviewMn: 'Баруун Монголын Алтайн нуруу нь Азийн хамгийн алслагдмал, гайхалтай цөлжсөн газруудын нэг юм. Хүйтэн оргил (4,374м) зэрэг Монголын хамгийн өндөр оргилуудын нутаг болох энэ бүс нутагт Казах бүргэдийн анчдын эртний уламжлал, цэвэр мөсөн гол, алпийн нуур, олон янзын зэрлэг амьтад байдаг.',
    overviewKo: '몽골 서부의 알타이 산맥은 아시아에서 가장 외딴 멋진 야생 지역 중 하나를 나타냅니다. 훼이텐 봉우리(4,374m)를 포함한 몽골의 최고봉이 있는 이 지역은 카자흐 독수리 사냥꾼의 고대 전통을 보존하고 깨끗한 빙하, 고산 호수, 다양한 야생 동물을 제공합니다.',
    history: 'The Altai region has been inhabited for thousands of years, with ancient petroglyphs and burial mounds (kurgans) dating back to the Bronze Age. The area is culturally significant as home to Mongolia\'s Kazakh minority, who have preserved their distinct language, customs, and the ancient art of eagle hunting across generations.',
    historyMn: 'Алтайн бүс нутагт олон мянган жилийн турш хүн амьдарч ирсэн бөгөөд Хүрэл зэвсгийн үед хамаарах эртний хадны зураг, булш (курган) байдаг. Энэ бүс нутаг нь Монголын Казах цөөнхийн нутаг бөгөөд тэд үе дамжсан хэл, ёс заншил, бүргэдийн анчны эртний урлагаа хадгалж ирсэн.',
    historyKo: '알타이 지역은 청동기 시대로 거슬러 올라가는 고대 암각화와 고분(쿠르간)과 함께 수천 년 동안 거주해 왔습니다. 이 지역은 몽골의 카자흐 소수 민족의 고향으로 문화적으로 중요하며, 그들은 세대를 거쳐 고유한 언어, 관습, 독수리 사냥의 고대 예술을 보존해 왔습니다.',
    geography: 'The Mongol Altai range stretches over 1,000 km across western Mongolia. The Tavan Bogd massif contains five sacred peaks, with permanent glaciers including the Potanin Glacier. The landscape varies from snow-capped peaks to alpine meadows, crystal-clear lakes, and river valleys.',
    geographyMn: 'Монголын Алтайн нуруу баруун Монголоор 1,000 гаруй км үргэлжилдэг. Таван богдын нуруу таван ариун оргилтой бөгөөд Потанины мөсөн гол зэрэг мөнхийн мөсөн голтой. Ландшафт нь цасан оргилоос эхлээд алпийн нуга, цэнгэг нуур, голын хөндий хүртэл олон янз байдаг.',
    geographyKo: '몽골 알타이 산맥은 몽골 서부를 가로질러 1,000km 이상 뻗어 있습니다. 타반 보그드 산괴는 포타닌 빙하를 포함한 영구 빙하와 함께 다섯 개의 신성한 봉우리를 포함합니다. 풍경은 눈 덮인 봉우리에서 고산 초원, 맑은 호수, 강 계곡까지 다양합니다.',
    wildlife: 'The Altai supports incredible biodiversity including snow leopards, ibex, argali sheep, wolves, and golden eagles. The region is a UNESCO World Heritage site partly due to its importance for endangered species. Rare birds like lammergeiers and saker falcons nest in the mountains.',
    wildlifeMn: 'Алтайд цасан ирвэс, янгир, аргаль, чоно, алтан бүргэд зэрэг гайхалтай биологийн олон янз байдал байдаг. Энэ бүс нутаг нь устаж үгүй болох аюулд орсон амьтдын ач холбогдлоос болж ЮНЕСКО-гийн дэлхийн өвийн дурсгалт газар юм. Ламмергайер, шонхор зэрэг ховор шувууд уулсад үүрээ тавьдаг.',
    wildlifeKo: '알타이는 눈표범, 아이벡스, 아르갈리 양, 늑대, 황금 독수리를 포함한 놀라운 생물 다양성을 지원합니다. 이 지역은 멸종 위기 종에 대한 중요성 때문에 부분적으로 유네스코 세계 유산입니다. 라머가이어와 사커 매 같은 희귀 조류가 산에 둥지를 틉니다.',
    activities: ['Eagle hunting demonstrations', 'Mountain trekking and climbing', 'Visit Kazakh families', 'Attend Golden Eagle Festival (October)', 'Glacier hiking', 'Horseback riding', 'Petroglyphs viewing', 'Photography expeditions'],
    activitiesMn: ['Бүргэдийн анчны үзүүлбэр', 'Уулын явган аялал, авирах', 'Казах гэр бүлд зочлох', 'Алтан бүргэдийн наадамд оролцох (10-р сар)', 'Мөсөн голын аялал', 'Морь унах', 'Хадны зураг үзэх', 'Гэрэл зургийн экспедиц'],
    activitiesKo: ['독수리 사냥 시연', '산악 트레킹 및 등반', '카자흐 가족 방문', '황금 독수리 축제 참석 (10월)', '빙하 하이킹', '승마', '암각화 관람', '사진 탐험'],
    bestTimeToVisit: 'July to September offers the best weather for trekking with temperatures of 10-20°C. October is ideal for the Eagle Festival but nights are cold. Winter (November-March) is extremely harsh with temperatures dropping to -40°C. Spring brings wildflowers but unpredictable weather.',
    bestTimeToVisitMn: '7-9-р сар нь 10-20°C температуртай явган аялалд хамгийн сайн цаг агаарыг санал болгоно. 10-р сар нь Бүргэдийн наадамд тохиромжтой боловч шөнө хүйтэн байдаг. Өвөл (11-3-р сар) -40°C хүртэл буурч маш хатуу байна. Хавар зэрлэг цэцэг ургадаг ч цаг агаар тогтворгүй.',
    bestTimeToVisitKo: '7월부터 9월까지 10-20°C의 기온으로 트레킹에 가장 좋은 날씨를 제공합니다. 10월은 독수리 축제에 이상적이지만 밤은 춥습니다. 겨울(11-3월)은 기온이 -40°C까지 떨어지는 극도로 혹독합니다. 봄은 야생화를 가져오지만 예측할 수 없는 날씨입니다.',
    gettingThere: 'The nearest major town is Ölgii, accessible by domestic flight from Ulaanbaatar (2.5 hours) or overland journey (3-4 days). From Ölgii, it\'s another 4-6 hours by 4WD to Tavan Bogd base camp. Due to remoteness, organized tours with experienced guides are highly recommended.',
    gettingThereMn: 'Хамгийн ойрын том хот бол Өлгий бөгөөд Улаанбаатараас дотоодын нислэг (2.5 цаг) эсвэл хуурай замаар (3-4 хоног) хүрч очих боломжтой. Өлгийгөөс Таван богдын суурийн баазад 4WD машинаар 4-6 цаг явна. Алслагдсан байдлаас болж туршлагатай хөтөчтэй зохион байгуулалттай аялал маш зөвлөмжтэй.',
    gettingThereKo: '가장 가까운 주요 도시는 올기이로 울란바토르에서 국내선 항공편(2.5시간) 또는 육로 여행(3-4일)으로 접근할 수 있습니다. 올기이에서 타반 보그드 베이스 캠프까지 4WD로 4-6시간이 더 걸립니다. 외딴 곳이기 때문에 경험 많은 가이드와 함께하는 조직적인 투어를 강력히 권장합니다.',
  },
  'orkhon-valley': {
    id: 'orkhon-valley',
    name: 'Orkhon Valley',
    nameMn: 'Орхоны хөндий',
    nameKo: '오르혼 계곡',
    region: 'Central Mongolia',
    regionMn: 'Төв Монгол',
    regionKo: '중부 몽골',
    image: 'https://images.unsplash.com/photo-1587029720533-0b873e9df001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMG1vdW50YWluJTIwbGFuZHNjYXBlJTIwd2lsZHxlbnwxfHx8fDE3Njk4NDE1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1587029720533-0b873e9df001?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
    ],
    rating: 5,
    reviewCount: 567,
    bestSeason: 'Jun-Sep',
    duration: '2-4 days',
    difficulty: 'Moderate',
    priceRange: '$$',
    highlights: ['Orkhon Waterfall', 'Hot springs', 'Ancient ruins', 'Horseback riding'],
    highlightsMn: ['Орхоны хүрхрээ', 'Халуун рашаан', 'Эртний туурь', 'Морь унах'],
    highlightsKo: ['오르혼 폭포', '온천', '고대 유적', '승마'],
    overview: 'UNESCO World Heritage Site with stunning waterfalls and nomadic culture. The Orkhon Valley Cultural Landscape encompasses an extensive area of grassland along the Orkhon River, representing the evolution of nomadic pastoral traditions.',
    overviewMn: 'ЮНЕСКО-гийн дэлхийн өв, гайхалтай хүрхрээ болон нүүдэлчдийн соёл. Орхоны хөндийн соёлын ландшафт нь Орхон голын дагуух өргөн уудам бэлчээрийг хамарч, нүүдэлчин малчдын уламжлалын хөгжлийг илэрхийлдэг.',
    overviewKo: '유네스코 세계 문화유산이자 멋진 폭포와 유목 문화. 오르혼 계곡 문화경관은 오르혼 강을 따라 광범위한 초원 지역을 포함하며 유목 목축 전통의 진화를 나타냅니다.',
    history: 'The Orkhon Valley has been home to various nomadic empires throughout history. The valley was the center of the Turkic Empire, the Uyghur Empire, and eventually the Mongol Empire. Karakorum, the ancient capital of Genghis Khan, lies nearby.',
    historyMn: 'Орхоны хөндий түүхийн туршид янз бүрийн нүүдэлчин гүрний нутаг байсаар ирсэн. Хөндий нь Түрэгийн эзэнт гүрэн, Уйгурын эзэнт гүрэн, эцэст нь Монголын эзэнт гүрний төв байв. Чингис хааны эртний нийслэл Хархорин ойролцоо оршдог.',
    historyKo: '오르혼 계곡은 역사를 통틀어 다양한 유목 제국의 고향이었습니다. 계곡은 투르크 제국, 위구르 제국, 그리고 결국 몽골 제국의 중심지였습니다. 칭기즈 칸의 고대 수도인 카라코룸이 근처에 있습니다.',
    geography: 'The Orkhon River Valley stretches through central Mongolia, featuring diverse landscapes from mountains to grasslands. The famous Orkhon Waterfall (Ulaan Tsutgalan) drops 20 meters into a spectacular gorge.',
    geographyMn: 'Орхон голын хөндий Монголын төв хэсгээр урсдаг бөгөөд уулнаас бэлчээр хүртэлх олон янзын ландшафттай. Алдартай Орхоны хүрхрээ (Улаан цутгалан) 20 метр өндрөөс гайхалтай хавцал руу унадаг.',
    geographyKo: '오르혼 강 계곡은 몽골 중부를 가로질러 산에서 초원까지 다양한 풍경을 특징으로 합니다. 유명한 오르혼 폭포(울란 추트갈란)는 20m 높이에서 멋진 협곡으로 떨어집니다.',
    wildlife: 'The valley supports diverse wildlife including wolves, foxes, marmots, and various bird species. The grasslands are ideal for observing nomadic herders with their livestock.',
    wildlifeMn: 'Хөндий нь чоно, үнэг, тарвага, төрөл бүрийн шувууд зэрэг олон янзын амьтдыг дэмждэг. Бэлчээр нь нүүдэлчин малчдыг малынх нь хамт ажиглахад тохиромжтой.',
    wildlifeKo: '계곡은 늑대, 여우, 마멋, 다양한 조류를 포함한 다양한 야생 동물을 지원합니다. 초원은 가축과 함께 유목민 목동을 관찰하기에 이상적입니다.',
    activities: ['Visit Orkhon Waterfall', 'Horseback riding', 'Explore ancient ruins', 'Hot spring bathing', 'Stay with nomadic families', 'Photography'],
    activitiesMn: ['Орхоны хүрхрээ үзэх', 'Морь унах', 'Эртний туурь судлах', 'Халуун рашаанд орох', 'Нүүдэлчин гэр бүлтэй амьдрах', 'Гэрэл зураг'],
    activitiesKo: ['오르혼 폭포 방문', '승마', '고대 유적 탐험', '온천욕', '유목민 가족과 함께 머물기', '사진'],
    bestTimeToVisit: 'June to September offers the best weather with temperatures of 15-25°C and green landscapes. The waterfall is most impressive in summer with full flow. Autumn brings golden colors to the grasslands.',
    bestTimeToVisitMn: '6-9-р сар нь 15-25°C температур, ногоон ландшафттай хамгийн сайн цаг агаарыг санал болгоно. Хүрхрээ зун бүтэн урсгалтайдаа хамгийн гайхалтай байдаг. Намар бэлчээрт алтан өнгө авчирдаг.',
    bestTimeToVisitKo: '6월부터 9월까지 15-25°C의 기온과 녹색 풍경으로 최고의 날씨를 제공합니다. 폭포는 여름에 완전한 흐름으로 가장 인상적입니다. 가을은 초원에 황금빛을 가져옵니다.',
    gettingThere: 'Located about 360km southwest of Ulaanbaatar. Accessible by vehicle (6-8 hours drive). Many tour operators offer multi-day trips combining the Orkhon Valley with Karakorum.',
    gettingThereMn: 'Улаанбаатараас баруун урагш 360 орчим км зайтай. Машинаар (6-8 цагийн зам) хүрч очих боломжтой. Олон аялал жуулчлалын компани Орхоны хөндийг Хархоринтой хослуулсан олон өдрийн аялал санал болгодог.',
    gettingThereKo: '울란바토르에서 남서쪽으로 약 360km 떨어져 있습니다. 차량으로 접근 가능(6-8시간 운전). 많은 여행사가 오르혼 계곡을 카라코룸과 결합한 여러 날 여행을 제공합니다.',
  },
  'terelj-national-park': {
    id: 'terelj-national-park',
    name: 'Terelj National Park',
    nameMn: 'Тэрэлжийн байгалийн цогцолбор газар',
    nameKo: '테를지 국립공원',
    region: 'Central Mongolia',
    regionMn: 'Төв Монгол',
    regionKo: '중부 몽골',
    image: 'https://images.unsplash.com/photo-1695197943218-be1bb14b6894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHRlbnQlMjBjYW1waW5nJTIwbmF0dXJlfGVufDF8fHx8MTc2OTg0MDcxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1695197943218-be1bb14b6894?w=800',
      'https://images.unsplash.com/photo-1478827536313-e363b7d05fd4?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    rating: 5,
    reviewCount: 891,
    bestSeason: 'May-Sep',
    duration: '1-3 days',
    difficulty: 'Easy',
    priceRange: '$$',
    highlights: ['Turtle Rock', 'Aryabal Temple', 'Horse riding', 'Ger camps'],
    highlightsMn: ['Мэлхий хад', 'Арьяабалын хийд', 'Морь унах', 'Гэрийн бааз'],
    highlightsKo: ['거북 바위', '아리야발 사원', '승마', '게르 캠프'],
    overview: 'Gorkhi-Terelj National Park is one of Mongolia\'s most visited protected areas due to its proximity to Ulaanbaatar (80 km). The park features spectacular alpine scenery, including unique rock formations, lush valleys, and winding rivers. It offers an accessible introduction to Mongolia\'s natural beauty.',
    overviewMn: 'Горхи-Тэрэлжийн байгалийн цогцолбор газар нь Улаанбаатараас ойрхон (80 км) байдаг учраас Монголын хамгийн их зочилдог хамгаалалттай газруудын нэг юм. Цогцолборт газар нь өвөрмөц хадан чулуу, ногоон хөндий, мөчрөөс гол зэрэг гайхалтай алпийн үзэсгэлэнт байдаг. Энэ нь Монголын байгалийн гоо үзэсгэлэнг танин мэдэх хялбар боломж олгодог.',
    overviewKo: '고르히-테를지 국립공원은 울란바토르와의 근접성(80km) 때문에 몽골에서 가장 많이 방문하는 보호 지역 중 하나입니다. 공원은 독특한 암석층, 무성한 계곡, 구불구불한 강을 포함한 멋진 고산 풍경을 특징으로 합니다. 몽골의 자연미를 접할 수 있는 접근 가능한 소개를 제공합니다.',
    history: 'The park was established as a tourist zone in 1964 and granted National Park status in 1993. The area has been used by nomadic herders for centuries. Aryabal Meditation Temple was built in 1998 as a spiritual retreat center, reflecting the region\'s Buddhist heritage.',
    historyMn: '1964 онд аялал жуулчлалын бүс болж байгуулагдсан бөгөөд 1993 онд Үндэсний цогцолборт газрын статус авсан. Энэ бүс нутгийг олон зуун жилийн турш нүүдэлчин малчид ашиглаж ирсэн. Арьяабалын бясалгалын хийдийг 1998 онд сүнслэг амралтын төв болгон барьсан нь бүс нутгийн буддын шашны өвийг тусгасан.',
    historyKo: '공원은 1964년 관광 구역으로 설립되었으며 1993년 국립공원 지위를 부여받았습니다. 이 지역은 수세기 동안 유목민 목동들이 사용해 왔습니다. 아리야발 명상 사원은 1998년에 영적 수양 센터로 건립되어 지역의 불교 유산을 반영합니다.',
    geography: 'Located in the Khan Khentii mountain range at elevations of 1,600-2,664 meters. The park covers 2,932 square kilometers of alpine meadows, forests of larch and birch, and granite rock formations. The Terelj River flows through the park, creating scenic valleys.',
    geographyMn: 'Хан Хэнтийн нурууд 1,600-2,664 метрийн өндөрт оршдог. Цогцолборт газар нь 2,932 км.кв талбайн алпийн нуга, шинэс, хус модны ой, боржин чулуун формацуудыг эзэлдэг. Тэрэлж гол нь цогцолборт газраар урсаж үзэсгэлэнт хөндий үүсгэдэг.',
    geographyKo: '칸 헨티 산맥에 해발 1,600-2,664m에 위치합니다. 공원은 2,932평방킬로미터의 고산 초원, 낙엽송과 자작나무 숲, 화강암 암석층을 포함합니다. 테를지 강이 공원을 흐르며 경치 좋은 계곡을 만듭니다.',
    wildlife: 'The park is home to brown bears, wolves, foxes, elk, and over 250 species of birds including golden eagles and black vultures. Siberian marmots are commonly seen in summer. The diverse ecosystem supports various wildflowers and medicinal plants.',
    wildlifeMn: 'Цогцолборт газарт хүрэн баавгай, чоно, үнэг, бугачуудай болон алтан бүргэд, хар тас зэрэг 250 гаруй төрлийн шувууд амьдардаг. Зуны улиралд сибирийн тарвага ихээр ажиглагддаг. Олон янзын экосистем нь төрөл бүрийн зэрлэг цэцэг, эмийн ургамлыг дэмждэг.',
    wildlifeKo: '공원은 불곰, 늑대, 여우, 엘크, 황금 독수리와 검은 독수리를 포함한 250종 이상의 조류의 서식지입니다. 여름에는 시베리아 마멋이 흔히 보입니다. 다양한 생태계는 다양한 야생화와 약용 식물을 지원합니다.',
    activities: ['Horse riding tours', 'Hiking to Turtle Rock', 'Visit Aryabal Meditation Temple', 'Rock climbing', 'River rafting', 'Stay in luxury ger camps', 'Photography', 'Buddhist meditation retreats'],
    activitiesMn: ['Морин аялал', 'Мэлхий хад руу явган аялал', 'Арьяабалын хийд үзэх', 'Хадан авирах', 'Голын сэлүүр', 'Тансаг гэрт байрлах', 'Гэрэл зураг', 'Буддын бясалгалын зугаалга'],
    activitiesKo: ['승마 투어', '거북 바위 하이킹', '아리야발 명상 사원 방문', '암벽 등반', '래프팅', '럭셔리 게르 캠프 숙박', '사진', '불교 명상 수련'],
    bestTimeToVisit: 'May to September offers the best weather with temperatures of 15-25°C. Summer (June-August) is peak season with green valleys and wildflowers. Autumn (September) brings golden colors. Winter visits are possible but temperatures drop to -20°C.',
    bestTimeToVisitMn: '5-9-р сар нь 15-25°C температуртай хамгийн сайн цаг агаарыг санал болгоно. Зун (6-8-р сар) нь ногоон хөндий, зэрлэг цэцгийн оргил улирал. Намар (9-р сар) алтан өнгө авчирна. Өвлийн айлчлал боломжтой ч температур -20°C хүртэл буурна.',
    bestTimeToVisitKo: '5월부터 9월까지 15-25°C의 기온으로 최고의 날씨를 제공합니다. 여름(6-8월)은 녹색 계곡과 야생화가 있는 성수기입니다. 가을(9월)은 황금빛을 가져옵니다. 겨울 방문도 가능하지만 기온이 -20°C까지 떨어집니다.',
    gettingThere: 'Only 80 km northeast of Ulaanbaatar, easily accessible by paved road (1.5-2 hours drive). Many tour operators offer day trips or overnight stays. Public buses run daily from Ulaanbaatar. Taxis and rental cars are readily available.',
    gettingThereMn: 'Улаанбаатараас зүүн хойш зөвхөн 80 км зайтай, хатуу замаар хялбархан хүрч очих боломжтой (1.5-2 цаг). Олон аялал жуулчлалын компани өдрийн аялал эсвэл шөнийн байрлалт санал болгодог. Улаанбаатараас өдөр бүр нийтийн автобус явдаг. Такси, түрээсийн машин бэлэн байдаг.',
    gettingThereKo: '울란바토르에서 북동쪽으로 80km에 불과하며 포장 도로로 쉽게 접근할 수 있습니다(1.5-2시간 운전). 많은 여행사가 당일치기 여행이나 숙박을 제공합니다. 울란바토르에서 매일 공공 버스가 운행됩니다. 택시와 렌터카를 쉽게 이용할 수 있습니다.',
  },
  'khongoryn-els': {
    id: 'khongoryn-els',
    name: 'Khongoryn Els',
    nameMn: 'Хонгорын элс',
    nameKo: '홍고린 엘스',
    region: 'Gobi Desert',
    regionMn: 'Говийн цөл',
    regionKo: '고비 사막',
    image: 'https://images.unsplash.com/photo-1649357028504-ffc3c1976fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGdvYmklMjBkZXNlcnQlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY5ODM4OTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1649357028504-ffc3c1976fc4?w=800',
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
      'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=800',
    ],
    rating: 5,
    reviewCount: 445,
    bestSeason: 'May-Oct',
    duration: '4-7 days',
    difficulty: 'Moderate',
    priceRange: '$$$$',
    highlights: ['Singing sand dunes', 'Camel trekking', 'Flaming Cliffs', 'Yol Valley'],
    highlightsMn: ['Дуулах элсэн манхан', 'Тэмээгээр аялах', 'Баянзаг', 'Ёлын ам'],
    highlightsKo: ['노래하는 모래 언덕', '낙타 트레킹', '플레이밍 클리프', '욜 계곡'],
    overview: 'Spectacular singing sand dunes stretching 180km, experience camel trekking. Khongoryn Els, also known as the "Singing Dunes," are among the largest and most impressive sand dunes in Mongolia, reaching heights of up to 300 meters.',
    overviewMn: '180 км үргэлжилсэн гайхалтай дуулах элсэн манхан, тэмээгээр аялах туршлага. "Дуулах манхан" гэгддэг Хонгорын элс нь Монголын хамгийн том, гайхалтай элсэн манхануудын нэг бөгөөд 300 метр хүртэл өндөртэй.',
    overviewKo: '180km에 걸쳐 펼쳐진 멋진 노래하는 모래 언덕, 낙타 트레킹 경험. "노래하는 언덕"으로도 알려진 홍고린 엘스는 몽골에서 가장 크고 인상적인 모래 언덕 중 하나로 최대 300m 높이에 이릅니다.',
    history: 'The Gobi Desert has been an important part of the Mongol Empire and was crossed by the Silk Road. It was home to several important cities along the caravan routes. The region gained international fame when Roy Chapman Andrews discovered dinosaur fossils and eggs at the Flaming Cliffs in the 1920s.',
    historyMn: 'Говийн цөл нь Монголын эзэнт гүрний чухал хэсэг байсан бөгөөд Торгоны замаар дамждаг байв. Энэ нь цөөвөрлөгчдийн замын дагуух хэд хэдэн чухал хотуудын нутаг байсан. 1920-ад онд Рой Чапман Эндрюс Баянзагаас үлэг гүрвэлийн яс, өндөг олсноор бүс нутаг олон улсад алдартай болсон.',
    historyKo: '고비 사막은 몽골 제국의 중요한 부분이었으며 실크로드가 통과했습니다. 카라반 루트를 따라 여러 중요한 도시의 본거지였습니다. 1920년대 로이 채프먼 앤드루스가 플레이밍 클리프에서 공룡 화석과 알을 발견하면서 이 지역은 국제적 명성을 얻었습니다.',
    geography: 'The Khongoryn Els sand dunes stretch for approximately 180 kilometers and reach widths of 3-15 kilometers. They are located in the Gobi Gurvan Saikhan National Park. The dunes are called "singing" because the sound of shifting sand resembles music.',
    geographyMn: 'Хонгорын элсэн манхан ойролцоогоор 180 километр урт, 3-15 километр өргөнтэй. Тэд Говь Гурван Сайханы байгалийн цогцолборт газарт байрладаг. Элсний хөдөлж буй чимээ хөгжимтэй төстэй тул манханыг "дуулах" гэж нэрлэдэг.',
    geographyKo: '홍고린 엘스 모래 언덕은 약 180km에 걸쳐 뻗어 있으며 폭은 3-15km에 이릅니다. 그들은 고비 구르반 사이한 국립공원에 위치하고 있습니다. 이동하는 모래의 소리가 음악과 비슷하기 때문에 언덕을 "노래하는"이라고 합니다.',
    wildlife: 'The Gobi is home to rare and endangered species including the Bactrian camel, Gobi bear (mazaalai), snow leopard, and wild ass (khulan). The region also supports jerboa, wild sheep, and various birds of prey.',
    wildlifeMn: 'Говь нь хаврагат тэмээ, мазаалай, ирвэс, хулан зэрэг ховор, устаж үгүй болох аюултай амьтдын нутаг юм. Мөн энэ бүс нуагтаа алаг өвс, аргаль, янгир, төрөл бүрийн махчин шувууд амьдардаг.',
    wildlifeKo: '고비는 박트리아 낙타, 고비 곰(마잘라이), 눈표범, 야생 당나귀(쿨란)를 포함한 희귀하고 멸종 위기에 처한 종의 서식지입니다. 이 지역은 또한 저보아, 야생 양, 다양한 맹금류를 지원합니다.',
    activities: ['Camel trekking on the dunes', 'Sandboarding', 'Photography at sunrise/sunset', 'Visit nearby oasis', 'Stay in ger camps', 'Stargazing'],
    activitiesMn: ['Манхан дээр тэмээгээр аялах', 'Элсэн цанаар гулгах', 'Нар мандах/жаргах үед гэрэл зураг', 'Ойролцоох оазис үзэх', 'Гэрийн баазд байрлах', 'Од харах'],
    activitiesKo: ['모래 언덕에서 낙타 트레킹', '샌드보딩', '일출/일몰 사진', '근처 오아시스 방문', '게르 캠프 숙박', '별 관측'],
    bestTimeToVisit: 'May to October is ideal with pleasant temperatures (15-25°C during day). Summer (June-August) can be hot but evenings are cool. Avoid winter months (November-March) when temperatures can drop to -40°C.',
    bestTimeToVisitMn: '5-10-р сар нь хамгийн тохиромжтой бөгөөд өдрийн температур 15-25°C байна. Зун (6-8-р сар) халуун ч орой сэрүүн байдаг. Өвлийн саруудаас (11-3-р сар) зайлсхий, температур -40°C хүртэл буурч болно.',
    bestTimeToVisitKo: '5월부터 10월까지가 이상적이며 낮 기온이 15-25°C로 쾌적합니다. 여름(6-8월)은 더울 수 있지만 저녁은 시원합니다. 기온이 -40°C까지 떨어질 수 있는 겨울(11-3월)은 피하세요.',
    gettingThere: 'Located approximately 180km from Dalanzadgad. Most tours depart from Ulaanbaatar and take 2-3 days to reach the dunes. The journey is typically 8-10 hours by vehicle. Domestic flights to Dalanzadgad are available.',
    gettingThereMn: 'Даланзадгадаас 180 орчим км зайтай. Ихэнх аялал Улаанбаатараас хөдөлж, манхан хүрэхэд 2-3 хоног шаардагддаг. Замын явц ихэвчлэн машинаар 8-10 цаг байна. Даланзадгад хүртэл дотоодын нислэг байдаг.',
    gettingThereKo: '달란자드가드에서 약 180km 떨어져 있습니다. 대부분의 투어는 울란바토르에서 출발하여 모래 언덕에 도달하는 데 2-3일이 걸립니다. 여행은 일반적으로 차량으로 8-10시간이 걸립니다. 달란자드가드까지 국내선 항공편이 있습니다.',
  },
  ulaanbaatar: {
    id: 'ulaanbaatar',
    name: 'Ulaanbaatar',
    nameMn: 'Улаанбаатар',
    nameKo: '울란바토르',
    region: 'Capital City',
    regionMn: 'Нийслэл хот',
    regionKo: '수도',
    image: 'https://images.unsplash.com/photo-1653380550474-56f0b47da4cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHVsYWFuYmFhdGFyJTIwY2l0eXxlbnwxfHx8fDE3Njk4Mzg5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1653380550474-56f0b47da4cf?w=800',
      'https://images.unsplash.com/photo-1478827536313-e363b7d05fd4?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    rating: 4,
    reviewCount: 1203,
    bestSeason: 'May-Sep',
    duration: '2-3 days',
    difficulty: 'Easy',
    priceRange: '$',
    highlights: ['Gandan Monastery', 'National Museum', 'Zaisan Memorial', 'Local markets'],
    highlightsMn: ['Гандантэгчинлэн хийд', 'Үндэсний музей', 'Зайсаны толгой', 'Орон нутгийн зах'],
    highlightsKo: ['간단 수도원', '국립 박물관', '자이산 기념비', '현지 시장'],
    overview: 'Mongolia\'s vibrant capital blending modern life with ancient traditions. Ulaanbaatar is the economic, cultural, and political center of Mongolia, home to nearly half of the country\'s population.',
    overviewMn: 'Орчин үеийн амьдрал болон эртний уламжлалыг хослуулсан Монголын эрч хүчтэй нийслэл. Улаанбаатар бол Монголын эдийн засаг, соёл, улс төрийн төв бөгөөд улсын хүн амын бараг тал хувь нь энд амьдардаг.',
    overviewKo: '현대 생활과 고대 전통이 어우러진 몽골의 활기찬 수도. 울란바토르는 몽골의 경제, 문화, 정치 중심지이며 국가 인구의 거의 절반이 거주합니다.',
    history: 'Founded in 1639 as a nomadic Buddhist monastery, Ulaanbaatar has moved locations numerous times before settling in its current valley in 1778. The city became the capital of independent Mongolia in 1924.',
    historyMn: '1639 онд нүүдэлчин буддын хийд болж байгуулагдсан Улаанбаатар 1778 онд одоогийн хөндийдөө суурьших хүртэл олон удаа байршлаа шилжүүлсэн. Хот нь 1924 онд тусгаар тогтносон Монголын нийслэл болсон.',
    historyKo: '1639년에 유목 불교 수도원으로 설립된 울란바토르는 1778년에 현재의 계곡에 정착하기 전에 여러 번 위치를 옮겼습니다. 이 도시는 1924년에 독립 몽골의 수도가 되었습니다.',
    geography: 'Located in north-central Mongolia at an elevation of about 1,350 meters above sea level. The city sits in a valley on the Tuul River, surrounded by four sacred mountains.',
    geographyMn: 'Монголын хойд төв хэсэгт далайн түвшнээс дээш 1,350 метр өндөрт байрладаг. Хот нь Туул голын хөндийд дөрвөн ариун уулаар хүрээлэгдсэн байдаг.',
    geographyKo: '몽골 북중부에 해발 약 1,350m에 위치합니다. 도시는 투울 강 계곡에 있으며 네 개의 신성한 산으로 둘러싸여 있습니다.',
    wildlife: 'As an urban center, wildlife is limited, but the surrounding mountains are home to various birds, foxes, and small mammals. The nearby Tuul River supports aquatic life.',
    wildlifeMn: 'Хотын төв учраас зэрлэг амьтад хязгаарлагдмал боловч эргэн тойрон уулс нь янз бүрийн шувууд, үнэг, жижиг хөхтөн амьтдын нутаг юм. Ойролцоох Туул гол усны амьтдыг дэмждэг.',
    wildlifeKo: '도시 중심지로서 야생 동물은 제한적이지만 주변 산은 다양한 조류, 여우, 소형 포유류의 서식지입니다. 근처의 투울 강은 수생 생물을 지원합니다.',
    activities: ['Visit Gandan Monastery', 'Explore National Museum of Mongolia', 'Shop at Narantuul Market', 'See traditional performances', 'Visit Zaisan Memorial', 'Sukhbaatar Square', 'Bogd Khan Palace Museum'],
    activitiesMn: ['Гандан хийд үзэх', 'Монголын Үндэсний музейг судлах', 'Нарантуул зах дээр худалдаа хийх', 'Уламжлалт үзүүлбэр үзэх', 'Зайсаны толгой үзэх', 'Сүхбаатарын талбай', 'Богд хааны ордны музей'],
    activitiesKo: ['간단 수도원 방문', '몽골 국립 박물관 탐험', '나란투울 시장에서 쇼핑', '전통 공연 관람', '자이산 기념비 방문', '수흐바타르 광장', '복드 칸 궁전 박물관'],
    bestTimeToVisit: 'May to September offers the best weather with temperatures of 15-25°C. Summer is ideal for outdoor activities and festivals. Winter (November-March) is very cold with temperatures dropping to -30°C but offers winter festivals.',
    bestTimeToVisitMn: '5-9-р сар нь 15-25°C температуртай хамгийн сайн цаг агаарыг санал болгоно. Зун нь гадаа үйл ажиллагаа, наадамд тохиромжтой. Өвөл (11-3-р сар) маш хүйтэн бөгөөд температур -30°C хүртэл буурдаг боловч өвлийн наадмууд болдог.',
    bestTimeToVisitKo: '5월부터 9월까지 15-25°C의 기온으로 최고의 날씨를 제공합니다. 여름은 야외 활동과 축제에 이상적입니다. 겨울(11-3월)은 기온이 -30°C까지 떨어지는 매우 춥지만 겨울 축제를 제공합니다.',
    gettingThere: 'Chinggis Khaan International Airport serves the city with international and domestic flights. The city is well-connected by bus and taxi services. Most international visitors arrive at Ulaanbaatar as their entry point to Mongolia.',
    gettingThereMn: 'Чингис хааны олон улсын нисэх буудал олон улсын болон дотоодын нислэгээр хотод үйлчилдэг. Хот автобус, таксигийн үйлчилгээгээр сайн холбогдсон. Ихэнх олон улсын зочид Монголд нэвтрэх цэг болгон Улаанбаатарт ирдэг.',
    gettingThereKo: '칭기스 칸 국제공항이 국제선 및 국내선 항공편으로 도시를 운항합니다. 도시는 버스와 택시 서비스로 잘 연결되어 있습니다. 대부분의 국제 방문객은 몽골 입국 지점으로 울란바토르에 도착합니다.',
  },
  tunkhel: {
    id: 'tunkhel',
    name: 'Tunkhel Village (Tsaatan Reindeer Herders)',
    nameMn: 'Түнхэл тосгон (Цаатан)',
    nameKo: '툰켈 마을 (차탄 순록 목동)',
    region: 'Northern Mongolia (Darkhad Valley)',
    regionMn: 'Хойд Монгол (Дархадын хөндий)',
    regionKo: '북부 몽골 (다르하드 계곡)',
    image: 'https://images.unsplash.com/photo-1613294576846-73901118ef6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMHdpbGQlMjBob3JzZXMlMjBuYXR1cmV8ZW58MXx8fHwxNzY5ODQxNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1613294576846-73901118ef6d?w=800',
      'https://images.unsplash.com/photo-1587029720533-0b873e9df001?w=800',
      'https://images.unsplash.com/photo-1664770427501-bd19f9f6224a?w=800',
    ],
    rating: 4.9,
    reviewCount: 87,
    bestSeason: 'Jun-Sep',
    duration: '7-10 days',
    difficulty: 'Very Challenging',
    priceRange: '$$$$',
    highlights: ['Meet Tsaatan reindeer herders', 'Ride reindeer in taiga forest', 'Stay in traditional urts (teepees)', 'Experience nomadic reindeer herder lifestyle'],
    highlightsMn: ['Цаатан бугачинтай уулзах', 'Тайга ойд буга унах', 'Уламжлалт өрц (чадар) майханд байрлах', 'Нүүдэлчин бугачдын амьдралыг мэдрэх'],
    highlightsKo: ['차탄 순록 목동 만나기', '타이가 숲에서 순록 타기', '전통 우르츠(티피)에서 숙박', '유목 순록 목동 생활 체험'],
    overview: 'Tunkhel is a remote settlement in the Darkhad Valley of Khuvsgul Province, home to the Tsaatan (Dukha) people - one of the last remaining groups of reindeer herders in the world. The Tsaatan live in traditional teepee-style tents called "urts" and migrate seasonally with their reindeer herds. This area offers an incredibly rare glimpse into an ancient way of life.',
    overviewMn: 'Түнхэл бол Хөвсгөл аймгийн Дархадын хөндийд байрладаг алслагдмал суурин газар бөгөөд дэлхийн цөөхөн үлдсэн цаа буга малчдын нэг болох Цаатан (Духа) ард түмний нутаг юм. Цаатнууд "өрц" гэж нэрлэгддэг уламжлалт майхан дотор амьдарч, улирлын дагуу цаа буга сүрэгтэйгээ нүүдэллэдэг. Энэ бүс нь эртний амьдралын хэв маягийг үзэх онцгой ховор боломж олгодог.',
    overviewKo: '툰켈은 흡스굴 아이막의 다르하드 계곡에 위치한 외딴 정착지로, 세계에서 마지막으로 남아있는 순록 목동 그룹 중 하나인 차탄(두하) 사람들의 고향입니다. 차탄족은 "우르츠"라고 불리는 전통적인 티피 스타일의 텐트에 살며 순록 떼와 함께 계절에 따라 이동합니다. 이 지역은 고대 생활 방식을 엿볼 수 있는 매우 드문 기회를 제공합니다.',
    history: 'The Tsaatan people have lived in the taiga forests of northern Mongolia for centuries, maintaining their unique reindeer herding culture. They are one of the few remaining groups in the world who still practice this ancient nomadic lifestyle, passing down traditional knowledge through generations.',
    historyMn: 'Цаатан ард түмэн Монголын хойд хэсгийн тайга ойд олон зуун жилийн турш амьдарч, өөрсдийн өвөрмөц буга малчдын соёлыг хадгалж ирсэн. Тэд энэ эртний нүүдлийн амьдралын хэв маягийг өнөөг хүртэл хадгалж, уламжлалт мэдлэгийг үе дамжуулан дамжуулж байгаа дэлхийн цөөхөн бүлгүүдийн нэг юм.',
    historyKo: '차탄 사람들은 수세기 동안 몽골 북부의 타이가 숲에 살면서 독특한 순록 목축 문화를 유지해 왔습니다. 그들은 여전히 이 고대 유목 생활 방식을 실천하고 전통 지식을 세대를 거쳐 전수하는 세계에서 몇 안 되는 그룹 중 하나입니다.',
    geography: 'Located in the remote Darkhad Valley of northern Khuvsgul Province, surrounded by pristine taiga forests, crystal-clear rivers, and untouched mountain landscapes. The area sits at high elevation with harsh winters and short summers.',
    geographyMn: 'Хөвсгөл аймгийн хойд хэсгийн алслагдмал Дархадын хөндийд байрлах бөгөөд хатуу ширэнгэн тайга ой, тунгалаг гол мөрөн, хөндөгдөөгүй уулархаг байгалиар хүрээлэгдсэн. Энэ бүс нутаг өндөр өндөрлөгт байрладаг бөгөөд өвөл хатуу, зун богино байдаг.',
    geographyKo: '깨끗한 타이가 숲, 수정처럼 맑은 강, 손대지 않은 산악 풍경으로 둘러싸인 북부 흡스굴 아이막의 외딴 다르하드 계곡에 위치합니다. 이 지역은 고도가 높아 겨울이 혹독하고 여름이 짧습니다.',
    wildlife: 'The taiga forest is home to reindeer, moose, brown bears, wolves, sable, and various bird species. The pristine environment supports a delicate ecosystem that the Tsaatan people have lived in harmony with for generations.',
    wildlifeMn: 'Тайга ойд цаа буга, хандгай, хүрэн баавгай, чоно, булга болон янз бүрийн шувууд амьдардаг. Энэ цэвэр орчин нь Цаатан ард түмэн үе дамжин зохицож амьдарч ирсэн эмзэг экосистемийг дэмждэг.',
    wildlifeKo: '타이가 숲은 순록, 무스, 불곰, 늑대, 담비, 다양한 조류 종의 서식지입니다. 깨끗한 환경은 차탄 사람들이 세대에 걸쳐 조화롭게 살아온 섬세한 생태계를 지원합니다.',
    activities: ['Meet Tsaatan reindeer herders', 'Ride reindeer through taiga forest', 'Stay in traditional urts', 'Experience nomadic lifestyle', 'Wilderness trekking', 'Cultural photography', 'Learn about reindeer herding traditions'],
    activitiesMn: ['Цаатан бугачинтай уулзах', 'Тайга ойгоор буга унах', 'Уламжлалт өрцөд байрлах', 'Нүүдэлчин амьдралыг мэдрэх', 'Цөлжсөн газрын аялал', 'Соёлын гэрэл зураг', 'Буга малчдын уламжлалыг сурах'],
    activitiesKo: ['차탄 순록 목동 만나기', '타이가 숲을 통해 순록 타기', '전통 우르츠에서 숙박', '유목 생활 체험', '야생 트레킹', '문화 사진', '순록 목축 전통 배우기'],
    bestTimeToVisit: 'June to September is the only practical time to visit, with temperatures ranging from 10-20°C during the day. Summer is short but beautiful with wildflowers. Winter is extremely harsh with temperatures dropping below -40°C, making travel nearly impossible.',
    bestTimeToVisitMn: '6-9-р сар нь зочлоход хамгийн тохиромжтой цаг бөгөөд өдрийн температур 10-20°C байна. Зун богино боловч зэрлэг цэцгээр үзэсгэлэнтэй. Өвөл маш хатуу бөгөөд температур -40°C-аас доош буурч, аялах нь бараг боломжгүй болдог.',
    bestTimeToVisitKo: '6월부터 9월까지가 방문하기에 유일하게 실용적인 시기이며 낮 기온은 10-20°C입니다. 여름은 짧지만 야생화로 아름답습니다. 겨울은 기온이 -40°C 이하로 떨어져 여행이 거의 불가능할 정도로 극도로 혹독합니다.',
    gettingThere: 'Extremely remote location. Fly from Ulaanbaatar to Murun (Khuvsgul), then 4WD to Tsagaannuur village (8-10 hours on rough roads). From there, hire horses or arrange helicopter transfer to reach the Tsaatan camps (2-3 days horseback riding through taiga). Professional guide essential. Best organized through specialized tour operators.',
    gettingThereMn: 'Маш алслагдмал газар. Улаанбаатараас Мөрөн (Хөвсгөл) хүртэл нисэх, дараа нь Цагааннуур тосгон хүртэл 4WD машинаар (8-10 цаг муу замаар). Тэндээс морь түрээслэх эсвэл нисдэг тэргээр шилжүүлэлт зохион байгуулж Цаатны баазад хүрэх (тайгаар дамжин 2-3 хоног морин аялал). Мэргэжлийн хөтөч зайлшгүй шаардлагатай. Тусгай аялал жуулчлалын компаниудаар зохион байгуулах нь хамгийн сайн.',
    gettingThereKo: '매우 외딴 지역입니다. 울란바토르에서 무른(흡스굴)까지 비행한 다음 차가안누르 마을까지 4WD(험한 도로로 8-10시간). 거기서 말을 빌리거나 헬리콥터 이동을 준비하여 차탄 캠프에 도달합니다(타이가를 통해 2-3일 승마). 전문 가이드 필수. 전문 여행사를 통해 조직하는 것이 가장 좋습니다.',
  },
};

export function DestinationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);
  
  const destination = id ? destinationsData[id] : null;
  const coordinates = id ? getDestinationCoordinates(id) : null;

  // Check if destination is saved
  useEffect(() => {
    if (id && isAuthenticated) {
      const savedDestinations = JSON.parse(localStorage.getItem('savedDestinations') || '[]');
      setIsSaved(savedDestinations.includes(id));
    }
  }, [id, isAuthenticated]);

  const toggleSave = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    const savedDestinations = JSON.parse(localStorage.getItem('savedDestinations') || '[]');
    if (isSaved) {
      const updated = savedDestinations.filter((destId: string) => destId !== id);
      localStorage.setItem('savedDestinations', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      savedDestinations.push(id);
      localStorage.setItem('savedDestinations', JSON.stringify(savedDestinations));
      setIsSaved(true);
    }
  };

  if (!destination) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
          <button
            onClick={() => navigate('/destinations')}
            className="text-emerald-600 hover:text-emerald-700"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  const name = language === 'mn' ? destination.nameMn : language === 'ko' ? destination.nameKo : destination.name;
  const region = language === 'mn' ? destination.regionMn : language === 'ko' ? destination.regionKo : destination.region;
  const highlights = language === 'mn' ? destination.highlightsMn : language === 'ko' ? destination.highlightsKo : destination.highlights;
  const overview = language === 'mn' ? destination.overviewMn : language === 'ko' ? destination.overviewKo : destination.overview;
  const history = language === 'mn' ? destination.historyMn : language === 'ko' ? destination.historyKo : destination.history;
  const geography = language === 'mn' ? destination.geographyMn : language === 'ko' ? destination.geographyKo : destination.geography;
  const wildlife = language === 'mn' ? destination.wildlifeMn : language === 'ko' ? destination.wildlifeKo : destination.wildlife;
  const activities = language === 'mn' ? destination.activitiesMn : language === 'ko' ? destination.activitiesKo : destination.activities;
  const bestTimeToVisit = language === 'mn' ? destination.bestTimeToVisitMn : language === 'ko' ? destination.bestTimeToVisitKo : destination.bestTimeToVisit;
  const gettingThere = language === 'mn' ? destination.gettingThereMn : language === 'ko' ? destination.gettingThereKo : destination.gettingThere;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={destination.image}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/destinations')}
          className="absolute top-8 left-8 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">
            {language === 'mn' ? 'Буцах' : language === 'ko' ? '뒤로' : 'Back'}
          </span>
        </button>

        {/* Save/Bookmark Button */}
        <button
          onClick={toggleSave}
          className="absolute top-8 right-8 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white transition-all hover:scale-105"
        >
          {isSaved ? (
            <>
              <BookmarkCheck className="w-5 h-5 text-[#4A90A4]" />
              <span className="font-medium text-[#4A90A4]">
                {language === 'mn' ? 'Хадгалсан' : language === 'ko' ? '저장됨' : 'Saved'}
              </span>
            </>
          ) : (
            <>
              <Bookmark className="w-5 h-5" />
              <span className="font-medium">
                {language === 'mn' ? 'Хадгалах' : language === 'ko' ? '저장' : 'Save'}
              </span>
            </>
          )}
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-white/90 mb-3">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{region}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg">{destination.rating}</span>
                <span className="text-sm">({destination.reviewCount} {language === 'mn' ? 'сэтгэгдэл' : language === 'ko' ? '리뷰' : 'reviews'})</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{destination.bestSeason}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span>{destination.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                <span>{destination.priceRange}</span>
              </div>
            </div>

            {/* Get Directions Button */}
            {coordinates && (
              <button
                onClick={() => setShowRouteMap(true)}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#C4A037] text-gray-900 font-bold px-8 py-4 rounded-xl hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <NavIcon className="w-6 h-6" />
                <span>
                  {language === 'mn' ? 'Маршрут гаргах' : language === 'ko' ? '경로 보기' : 'Get Directions'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Map Route Viewer Modal */}
      {showRouteMap && coordinates && (
        <MapRouteViewer
          destinationName={name}
          destinationLat={coordinates.latitude}
          destinationLng={coordinates.longitude}
          onClose={() => setShowRouteMap(false)}
        />
      )}

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-sky-50 p-6 rounded-xl">
            <Calendar className="w-8 h-8 text-sky-600 mb-3" />
            <div className="text-sm text-gray-600 mb-1">
              {language === 'mn' ? 'Хугацаа' : language === 'ko' ? '기간' : 'Duration'}
            </div>
            <div className="font-semibold text-gray-900">{destination.duration}</div>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl">
            <Mountain className="w-8 h-8 text-emerald-600 mb-3" />
            <div className="text-sm text-gray-600 mb-1">
              {language === 'mn' ? 'Хэцүү байдал' : language === 'ko' ? '난이도' : 'Difficulty'}
            </div>
            <div className="font-semibold text-gray-900">{destination.difficulty}</div>
          </div>
          <div className="bg-amber-50 p-6 rounded-xl">
            <Users className="w-8 h-8 text-amber-600 mb-3" />
            <div className="text-sm text-gray-600 mb-1">
              {language === 'mn' ? 'Сэтгэгдэл' : language === 'ko' ? '리뷰' : 'Reviews'}
            </div>
            <div className="font-semibold text-gray-900">{destination.reviewCount}+</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl">
            <Camera className="w-8 h-8 text-purple-600 mb-3" />
            <div className="text-sm text-gray-600 mb-1">
              {language === 'mn' ? 'Зураг' : language === 'ko' ? '사진' : 'Photos'}
            </div>
            <div className="font-semibold text-gray-900">{destination.gallery.length}+</div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {language === 'mn' ? 'Онцлох зүйлс' : language === 'ko' ? '하이라이트' : 'Highlights'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">✨</div>
                <div className="text-sm font-medium text-gray-900">{highlight}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-sky-600" />
            <h2 className="text-2xl font-bold">
              {language === 'mn' ? 'Тойм' : language === 'ko' ? '개요' : 'Overview'}
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">{overview}</p>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">
              {language === 'mn' ? 'Түүх' : language === 'ko' ? '역사' : 'History'}
            </h3>
            <p className="text-gray-700 leading-relaxed">{history}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">
              {language === 'mn' ? 'Газарзүй' : language === 'ko' ? '지리' : 'Geography'}
            </h3>
            <p className="text-gray-700 leading-relaxed">{geography}</p>
          </div>
        </div>

        {/* Wildlife */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4">
            {language === 'mn' ? 'Амьтан судлал' : language === 'ko' ? '야생동물' : 'Wildlife'}
          </h3>
          <p className="text-gray-700 leading-relaxed">{wildlife}</p>
        </div>

        {/* Activities */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4">
            {language === 'mn' ? 'Үйл ажиллагаа' : language === 'ko' ? '활동' : 'Activities'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2" />
                <span className="text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Time & Getting There */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-sky-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">
              {language === 'mn' ? 'Хамгийн тохиромжтой цаг' : language === 'ko' ? '최적 방문 시기' : 'Best Time to Visit'}
            </h3>
            <p className="text-gray-700 leading-relaxed">{bestTimeToVisit}</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">
              {language === 'mn' ? 'Хэрхэн очих вэ' : language === 'ko' ? '찾아가는 방법' : 'Getting There'}
            </h3>
            <p className="text-gray-700 leading-relaxed">{gettingThere}</p>
          </div>
        </div>

        {/* Reviews Section */}
        {id && <ReviewSection destinationId={id} />}
      </div>
    </div>
  );
}