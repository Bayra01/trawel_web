import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'mn' | 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  mn: {
    // Navigation
    'nav.destinations': 'Газрууд',
    'nav.planTrip': 'Аялал төлөвлөх',
    'nav.budget': 'Төсөв',
    'nav.experiences': 'Туршлагууд',
    'nav.login': 'Нэвтрэх',
    'nav.signup': 'Бүртгүүлэх',
    'nav.logout': 'Гарах',
    'nav.backToHome': 'Нүүр хуудас руу буцах',
    
    // Hero
    'hero.title': 'AYL',
    'hero.subtitle': 'Монгол орны байгалийн гайхамшиг, эртний соёл уламжлалыг нээж мэдээрэй',
    'hero.region': 'Бүс нутаг',
    'hero.allRegions': 'Бүх бүс нутаг',
    'hero.westMongolia': 'Баруун Монгол',
    'hero.eastMongolia': 'Зүүн Монгол',
    'hero.gobiDesert': 'Говь',
    'hero.khangaiMountains': 'Хангайн нуруу',
    'hero.centralMongolia': 'Төв Монгол',
    'hero.experience': 'Туршлага',
    'hero.allExperiences': 'Бүх туршлага',
    'hero.horseRiding': 'Морь унах',
    'hero.eagleFestival': 'Бүргэдийн баяр',
    'hero.nomadicLife': 'Нүүдэлчний амьдрал',
    'hero.gerCamp': 'Гэрт амрах',
    'hero.desertSafari': 'Говийн аялал',
    'hero.culturalTours': 'Соёлын аялал',
    'hero.season': 'Улирал',
    'hero.anySeason': 'Бүх улирал',
    'hero.spring': 'Хавар (3-5 сар)',
    'hero.summer': 'Зун (6-8 сар)',
    'hero.autumn': 'Намар (9-11 сар)',
    'hero.winter': 'Өвөл (12-2 сар)',
    'hero.discover': 'Монгол орныг нээх',
    'hero.feature1': '🏕️ Жинхэнэ гэрийн бааз',
    'hero.feature2': '🐎 Морин аялал',
    'hero.feature3': '🦅 Бүргэдийн ан',
    'hero.feature4': '🏔️ Уулын адал явдал',
    
    // Weather
    'weather.title': 'Монголын Цаг Агаар',
    'weather.subtitle': 'Монголын томоохон хотуудын өнөөдрийн цаг агаар',
    'weather.pageTitle': 'Монголын Цаг Агаар',
    'weather.pageSubtitle': 'Монгол улсын томоохон хотуудын цаг агаарын мэдээлэл',
    'weather.viewWeather': 'Цаг агаар харах',
    
    // Featured Destinations
    'featured.title': 'Монгол орноо аялцгаая',
    'featured.subtitle': 'Өргөн уудам тал нутаг, эртний уламжлал, үзэсгэлэнт байгалийг судал',
    'featured.viewMore': 'Илүү ихийг үзэх',
    
    // Explore Page
    'explore.title': 'All Scenic Destinations',
    'explore.subtitle': 'Explore 12 must-see destinations in Mongolia - from the Altai peaks to the Gobi dunes',
    
    // Experiences
    'experiences.title': 'Аялагчдын Туршлага',
    'experiences.subtitle': 'Монгол орноор аялсан жинхэнэ аялагчдын түүхүүд',
    
    // Auth
    'auth.welcomeBack': 'Тавтай морил',
    'auth.createAccount': 'Бүртгэл үүсгэх',
    'auth.loginDesc': 'Өөрийн бүртгэлдээ нэвтэрнэ үү',
    'auth.signupDesc': 'Бидэнтэй нэгдэж Монголын аялалаа төлөвлөөрэй',
    'auth.fullName': 'Овог нэр',
    'auth.email': 'И-мэйл хаяг',
    'auth.password': 'Нууц үг',
    'auth.rememberMe': 'Намайг сана',
    'auth.forgotPassword': 'Нууц үг мартсан?',
    'auth.login': 'Нэвтрэх',
    'auth.signup': 'Бүртгүүлэх',
    'auth.orContinue': 'Эсвэл үргэлжлүүлэх',
    'auth.continueGoogle': 'Google-ээр үргэлжлүүлэх',
    'auth.firstName': 'Нэр',
    'auth.lastName': 'Овог',
    'auth.country': 'Улс',
    'auth.selectCountry': 'Улсаа сонгоно уу',
    'auth.confirmPassword': 'Нууц үг баталгаажуулах',
    'auth.passwordMismatch': 'Нууц ү таарахгүй байна',
    'auth.continueFacebook': 'Facebook-ээр үргэлжлүүлэх',
    'auth.terms': 'Үргэлжлүүлснээр та манай',
    'auth.otpTitle': 'И-мэйл баталгаажуулах',
    'auth.otpDesc': 'Таны и-мэйл хаягруу 4 оронтой код илгээсэн. Кодыг оруулна уу.',
    'auth.verifyOtp': 'Баталгаажуулах',
    'auth.resendOtp': 'Дахин илгээх',
    'auth.otpError': 'Код буруу байна. Дахин оролдоно уу.',
    'auth.otpResent': 'Код амжилттай дахин илгээгдлээ!',
    'auth.termsService': 'Үйлчилгээний нөхцөл',
    'auth.and': 'болон',
    'auth.privacyPolicy': 'Нууцлалын бодлого',
    'auth.agree': '-тай зөвшөөрч байна',
    'auth.noAccount': 'Бүртгэл байхгүй юу?',
    'auth.haveAccount': 'Бүртгэлтэй юу?',
    'auth.signupLink': 'Бүртгүүлэх',
    'auth.loginLink': 'Нэвтрэх',
    'auth.successTitle': 'Амжилттай бүртгэгдлээ!',
    'auth.successDesc': 'Таны бүртгэл амжилттай үүслээ',
    'auth.errorTitle': 'Алдаа гарлаа',
    'auth.errorDesc': 'И-мэйл эсвэл нууц үг буруу бана',
    'auth.startAdventure': 'Монголын адал вдлаа эхлүүлэх',
    'auth.joinThousands': 'Монголын өргөн уудам тал, эртний уламжлал, гайхамшигт байгалийг нээж олсон олон мянган аялагчидтай нэгдээрэй.',
    'auth.authenticExperiences': 'Жинхэнэ туршлагууд',
    'auth.expertGuides': 'Мэргэжлийн хөтөч',
    'auth.sustainableTourism': 'Тогтвортой аялал жуулчлл',
    'auth.copyright': '© 2026 AYL',
    'auth.mobileTitle': 'Адал явдлаа эхлүүлэх',
    
    // Road Trip Planner
    'roadTrip.title': 'Монгол орны аялалын газрын зураг',
    'roadTrip.subtitle': 'Монгол орны үзэсгэлэнт газруудыг судлаарай',
  },
  en: {
    // Navigation
    'nav.destinations': 'Destinations',
    'nav.planTrip': 'Plan Trip',
    'nav.budget': 'Budget',
    'nav.experiences': 'Experiences',
    'nav.login': 'Log In',
    'nav.signup': 'Sign Up',
    'nav.logout': 'Log Out',
    'nav.backToHome': 'Back to Home',
    
    // Hero
    'hero.title': 'AYL',
    'hero.subtitle': 'Explore the untamed beauty of Mongolia - from vast steppes to ancient traditions',
    'hero.region': 'Region',
    'hero.allRegions': 'All Regions',
    'hero.westMongolia': 'West Mongolia',
    'hero.eastMongolia': 'East Mongolia',
    'hero.gobiDesert': 'Gobi Desert',
    'hero.khangaiMountains': 'Khangai Mountains',
    'hero.centralMongolia': 'Central Mongolia',
    'hero.experience': 'Experience',
    'hero.allExperiences': 'All Experiences',
    'hero.horseRiding': 'Horse Riding',
    'hero.eagleFestival': 'Eagle Festival',
    'hero.nomadicLife': 'Nomadic Life',
    'hero.gerCamp': 'Ger Camp Stay',
    'hero.desertSafari': 'Desert Safari',
    'hero.culturalTours': 'Cultural Tours',
    'hero.season': 'Season',
    'hero.anySeason': 'Any Season',
    'hero.spring': 'Spring (Mar-May)',
    'hero.summer': 'Summer (Jun-Aug)',
    'hero.autumn': 'Autumn (Sep-Nov)',
    'hero.winter': 'Winter (Dec-Feb)',
    'hero.discover': 'Discover Mongolia',
    'hero.feature1': '🏕️ Authentic Ger Camps',
    'hero.feature2': '🐎 Horse Trekking',
    'hero.feature3': '🦅 Eagle Hunting',
    'hero.feature4': '🏔️ Mountain Adventures',
    
    // Weather
    'weather.title': 'Mongolia Weather',
    'weather.subtitle': 'Daily weather in major cities of Mongolia',
    'weather.pageTitle': 'Mongolia Weather',
    'weather.pageSubtitle': 'Real-time weather information for major cities across Mongolia',
    'weather.viewWeather': 'View Weather',
    
    // Featured Destinations
    'featured.title': 'Featured Destinations in Mongolia',
    'featured.subtitle': 'Explore the best places in Mongolia, from scenic landscapes to cultural sites',
    'featured.viewMore': 'View More',
    
    // Explore Page
    'explore.title': '모든 아름다운 목적지',
    'explore.subtitle': '몽골의 12가지 꼭 봐야 할 목적지 탐험 - 알타이 봉우리부터 고비 사막까지',
    
    // Experiences
    'experiences.title': 'Traveler Experiences',
    'experiences.subtitle': 'True stories of travelers who have visited Mongolia',
    
    // Auth
    'auth.welcomeBack': 'Welcome Back',
    'auth.createAccount': 'Create Account',
    'auth.loginDesc': 'Enter your credentials to access your account',
    'auth.signupDesc': 'Join us and start planning your Mongolian journey',
    'auth.fullName': 'Full Name',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.rememberMe': 'Remember me',
    'auth.forgotPassword': 'Forgot password?',
    'auth.login': 'Log In',
    'auth.signup': 'Sign Up',
    'auth.orContinue': 'Or continue with',
    'auth.continueGoogle': 'Continue with Google',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.country': 'Country',
    'auth.selectCountry': 'Select Country',
    'auth.confirmPassword': 'Confirm Password',
    'auth.passwordMismatch': 'Passwords do not match',
    'auth.continueFacebook': 'Continue with Facebook',
    'auth.terms': 'By continuing, you agree to our',
    'auth.otpTitle': 'Verify Email',
    'auth.otpDesc': 'We have sent a 4-digit code to your email. Please enter it below.',
    'auth.verifyOtp': 'Verify',
    'auth.resendOtp': 'Resend OTP',
    'auth.otpError': 'Incorrect code. Please try again.',
    'auth.otpResent': 'OTP code successfully resent!',
    'auth.termsService': 'Terms of Service',
    'auth.and': 'and',
    'auth.privacyPolicy': 'Privacy Policy',
    'auth.agree': '',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',
    'auth.signupLink': 'Sign up',
    'auth.loginLink': 'Log in',
    'auth.successTitle': 'Successfully Registered!',
    'auth.successDesc': 'Your account has been created successfully',
    'auth.errorTitle': 'Error',
    'auth.errorDesc': 'Incorrect email or password',
    'auth.startAdventure': 'Start Your Mongolian Adventure',
    'auth.joinThousands': 'Join thousands of travelers discovering the vast steppes, ancient traditions, and breathtaking landscapes of Mongolia.',
    'auth.authenticExperiences': 'Curated authentic experiences',
    'auth.expertGuides': 'Expert local guides',
    'auth.sustainableTourism': 'Sustainable tourism commitment',
    'auth.copyright': '© 2026 AYL',
    'auth.mobileTitle': 'Start your adventure',
    
    // Road Trip Planner
    'roadTrip.title': 'Mongolia Road Trip Map',
    'roadTrip.subtitle': 'Explore the scenic destinations of Mongolia',
  },
  ko: {
    // Navigation
    'nav.destinations': '목적지',
    'nav.planTrip': '여행 계획',
    'nav.budget': '예산',
    'nav.experiences': '경험',
    'nav.login': '로그인',
    'nav.signup': '회원가입',
    'nav.logout': '로그아웃',
    'nav.backToHome': '홈으로 돌아가기',
    
    // Hero
    'hero.title': 'AYL',
    'hero.subtitle': '광활한 초원부터 고대 전통까지 몽골의 거친 아름다움을 탐험하세요',
    'hero.region': '지역',
    'hero.allRegions': '모든 지역',
    'hero.westMongolia': '서부 몽골',
    'hero.eastMongolia': '동부 몽골',
    'hero.gobiDesert': '고비 사막',
    'hero.khangaiMountains': '항가이 산맥',
    'hero.centralMongolia': '중부 몽골',
    'hero.experience': '체험',
    'hero.allExperiences': '모든 체험',
    'hero.horseRiding': '승마',
    'hero.eagleFestival': '독수리 축제',
    'hero.nomadicLife': '유목 생활',
    'hero.gerCamp': '게르 캠프 숙박',
    'hero.desertSafari': '사막 사파리',
    'hero.culturalTours': '문화 투어',
    'hero.season': '계절',
    'hero.anySeason': '모든 계절',
    'hero.spring': '봄 (3-5월)',
    'hero.summer': '여름 (6-8월)',
    'hero.autumn': '가을 (9-11월)',
    'hero.winter': '겨울 (12-2월)',
    'hero.discover': '몽골 탐험하기',
    'hero.feature1': '🏕️ 정통 게르 캠프',
    'hero.feature2': '🐎 승마 트레킹',
    'hero.feature3': '🦅 독수리 사냥',
    'hero.feature4': '🏔️ 산악 모험',
    
    // Weather
    'weather.title': '몽골 날씨',
    'weather.subtitle': '몽골 주요 도시의 일일 날씨',
    'weather.pageTitle': '몽골 날씨',
    'weather.pageSubtitle': '몽골 전역 주요 도시의 실시간 날씨 정보',
    'weather.viewWeather': '날씨 보기',
    
    // Featured Destinations
    'featured.title': '몽골의 특별한 목적지',
    'featured.subtitle': '풍경이 아름다운 곳부터 문화적 장소까지 몽골의 최고의 장소를 탐험하세요',
    'featured.viewMore': '더 보기',
    
    // Explore Page
    'explore.title': '모든 아름다운 목적지',
    'explore.subtitle': '몽골의 12가지 꼭 봐야 할 목적지 탐험 - 알타이 봉우리부터 고비 사막까지',
    
    // Experiences
    'experiences.title': '여행자 경험',
    'experiences.subtitle': '몽골을 방문한 여행자의 진정한 이야기',
    
    // Auth
    'auth.welcomeBack': '환영합니다',
    'auth.createAccount': '계정 만들기',
    'auth.loginDesc': '계정에 액세스하려면 자격 증명을 입력하세요',
    'auth.signupDesc': '함께하고 몽골 여행을 계획하세요',
    'auth.fullName': '이름',
    'auth.email': '이메일 주소',
    'auth.password': '비밀번호',
    'auth.rememberMe': '로그인 상태 유지',
    'auth.forgotPassword': '비밀번호를 잊으셨나요?',
    'auth.login': '로그인',
    'auth.signup': '회원가입',
    'auth.orContinue': '또는 속하기',
    'auth.continueGoogle': 'Google로 계속하기',
    'auth.firstName': '이름',
    'auth.lastName': '성',
    'auth.country': '국가',
    'auth.selectCountry': '국가 선택',
    'auth.confirmPassword': '비밀번호 확인',
    'auth.passwordMismatch': '비밀번호가 일치하지 않습니다',
    'auth.continueFacebook': 'Facebook으로 계속하기',
    'auth.terms': '계속하면 다음에 동의하는 것입니다',
    'auth.otpTitle': '이메일 확인',
    'auth.otpDesc': '이메일로 4자리 코드를 보냈습니다. 아래에 입력하세요.',
    'auth.verifyOtp': '확인',
    'auth.resendOtp': 'OTP 재전송',
    'auth.otpError': '잘못된 코드입니다. 다시 시도하세요.',
    'auth.otpResent': 'OTP 코드가 성공적으로 재전송되었습니다!',
    'auth.termsService': '서비스 약관',
    'auth.and': '및',
    'auth.privacyPolicy': '개인정보 보호정책',
    'auth.agree': '',
    'auth.noAccount': '계정이 없으신가요?',
    'auth.haveAccount': '이미 계정이 있으신가요?',
    'auth.signupLink': '회원가입',
    'auth.loginLink': '로그인',
    'auth.successTitle': '등록 완료!',
    'auth.successDesc': '계정이 성공적으로 생성되었습니다',
    'auth.errorTitle': '오류',
    'auth.errorDesc': '이메일 또는 비밀번호가 올바르지 않습니다',
    'auth.startAdventure': '몽골 모험 시작하기',
    'auth.joinThousands': '광활한 초원, 고대 전통, 숨막히는 풍경을 발견하는 수천 명의 여행자와 함께하세요.',
    'auth.authenticExperiences': '엄선된 정통 체험',
    'auth.expertGuides': '전문 현지 가이드',
    'auth.sustainableTourism': '지속 가능한 관광 약속',
    'auth.copyright': '© 2026 AYL',
    'auth.mobileTitle': '모험을 시작하세요',
    
    // Road Trip Planner
    'roadTrip.title': '몽골 여행 지도',
    'roadTrip.subtitle': '몽골의 아름다운 목적지 탐험하기',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['mn', 'en', 'ko'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}