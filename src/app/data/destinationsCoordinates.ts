// Destinations database with coordinates
export interface DestinationCoordinates {
  id: string;
  name: string;
  nameMn: string;
  nameKo: string;
  latitude: number;
  longitude: number;
  address: string;
  addressMn: string;
  addressKo: string;
}

export const destinationsCoordinates: DestinationCoordinates[] = [
  {
    id: 'khuvsgul',
    name: 'Khuvsgul Lake',
    nameMn: 'Хөвсгөл нуур',
    nameKo: '흡스굴 호수',
    latitude: 50.5039,
    longitude: 100.1541,
    address: 'Khuvsgul Province, Mongolia',
    addressMn: 'Хөвсгөл аймаг, Монгол улс',
    addressKo: '흡스굴 주, 몽골'
  },
  {
    id: 'gobi',
    name: 'Gobi Desert (Khongoryn Els)',
    nameMn: 'Говь (Хонгорын элс)',
    nameKo: '고비 사막 (홍고린 엘스)',
    latitude: 43.8167,
    longitude: 102.2167,
    address: 'Umnugovi Province, Mongolia',
    addressMn: 'Өмнөговь аймаг, Монгол улс',
    addressKo: '움누고비 주, 몽골'
  },
  {
    id: 'terelj',
    name: 'Terelj National Park',
    nameMn: 'Тэрэлжийн байгалийн цогцолбор газар',
    nameKo: '테를지 국립공원',
    latitude: 47.8480,
    longitude: 107.4520,
    address: 'Töv Province, Mongolia',
    addressMn: 'Төв аймаг, Монгол улс',
    addressKo: '퇴브 주, 몽골'
  },
  {
    id: 'altai',
    name: 'Altai Mountains (Tavan Bogd)',
    nameMn: 'Алтай уулс (Таван богд)',
    nameKo: '알타이 산맥 (타반 보그드)',
    latitude: 49.1442,
    longitude: 87.8167,
    address: 'Bayan-Ölgii Province, Mongolia',
    addressMn: 'Баян-Өлгий аймаг, Монгол улс',
    addressKo: '바얀울기 주, 몽골'
  },
  {
    id: 'karakorum',
    name: 'Karakorum (Erdene Zuu)',
    nameMn: 'Хархорин (Эрдэнэ зуу)',
    nameKo: '카라코룸 (에르데네 주)',
    latitude: 47.2167,
    longitude: 102.8167,
    address: 'Övörkhangai Province, Mongolia',
    addressMn: 'Өвөрхангай аймаг, Монгол улс',
    addressKo: '외뵈르항가이 주, 몽골'
  },
  {
    id: 'hustai',
    name: 'Hustai National Park',
    nameMn: 'Хустайн байгалийн цогцолбор газар',
    nameKo: '후스타이 국립공원',
    latitude: 47.7667,
    longitude: 106.2833,
    address: 'Töv Province, Mongolia',
    addressMn: 'Төв аймаг, Монгол улс',
    addressKo: '퇴브 주, 몽골'
  },
  {
    id: 'ulaanbaatar',
    name: 'Ulaanbaatar',
    nameMn: 'Улаанбаатар',
    nameKo: '울란바토르',
    latitude: 47.9214,
    longitude: 106.9055,
    address: 'Ulaanbaatar, Mongolia',
    addressMn: 'Улаанбаатар, Монгол улс',
    addressKo: '울란바토르, 몽골'
  },
  {
    id: 'orkhon',
    name: 'Orkhon Valley (Orkhon Waterfall)',
    nameMn: 'Орхоны хөндий (Орхоны хүрхрээ)',
    nameKo: '오르혼 계곡 (오르혼 폭포)',
    latitude: 47.0569,
    longitude: 102.7417,
    address: 'Övörkhangai Province, Mongolia',
    addressMn: 'Өвөрхангай аймаг, Монгол улс',
    addressKo: '외뵈르항가이 주, 몽골'
  }
];

export function getDestinationCoordinates(id: string): DestinationCoordinates | undefined {
  return destinationsCoordinates.find(dest => dest.id === id);
}
