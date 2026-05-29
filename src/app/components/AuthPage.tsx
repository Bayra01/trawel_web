import { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, User, CheckCircle, X, AlertCircle, Globe, ChevronDown } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Navigation } from './Navigation';

type AuthMode = 'login' | 'signup';

// 216 улсын жагсаалт
const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
  'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Congo (DRC)',
  'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
  'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
  'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
  'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo', 'Kuwait',
  'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
  'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman',
  'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia',
  'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
  'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

export function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, signup } = useAuth();
  const { t } = useLanguage();
  
  const [mode, setMode] = useState<AuthMode>(
    (searchParams.get('mode') as AuthMode) || 'login'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // OTP states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpInputs, setOtpInputs] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const [emailSendError, setEmailSendError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  // Country search states
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  // EmailJS library-г динамикаар ачаалах
  useEffect(() => {
    // EmailJS script-йг DOM дээр байгаа эсэхийг шалгах
    const existingScript = document.querySelector('script[src*="emailjs"]');
    
    if (!existingScript) {
      // Script байхгүй бол шинээр үүсгэх
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.async = true;
      script.onload = () => {
        console.log('✅ EmailJS library loaded successfully');
      };
      script.onerror = () => {
        console.error('❌ Failed to load EmailJS library');
      };
      document.head.appendChild(script);
    } else {
      console.log('✅ EmailJS library already loaded');
    }
  }, []);

  // Country dropdown гаднаас дарахад хаах
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const countryInput = document.getElementById('country');
      
      if (showCountryDropdown && countryInput && !countryInput.contains(target)) {
        const dropdown = target.closest('.country-dropdown');
        if (!dropdown) {
          setShowCountryDropdown(false);
          setCountrySearch('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCountryDropdown]);

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    // Бүх талбаруудыг цэвэрлэх
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup') {
      // Нууц үг таарч байгаа эсэхийг шалгах
      if (password !== confirmPassword) {
        setErrorMessage(t('auth.passwordMismatch'));
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
        return;
      }

      // 🔧 TEMPORARY: Skip OTP verification - direct signup
      // TODO: Enable OTP when EmailJS is configured
      
      // Шууд бүртгэх (OTP алгасах)
      const fullName = `${firstName} ${lastName}`;
      signup(email, password, fullName);
      
      // Амжилттай бүртгэгдсэн мэдэгдэл харуулах
      setShowSuccess(true);
      
      // Форм цэвэрлэх
      setFirstName('');
      setLastName('');
      setCountry('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // 2 секундын дараа log in хэсэг рүү шилжүүлэх
      setTimeout(() => {
        setShowSuccess(false);
        setMode('login');
      }, 2000);

      /* 
      // 📧 OTP Verification (currently disabled)
      // Uncomment this section when EmailJS is configured:
      
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(otp);
      sendOtpEmail(email, otp, firstName);
      setShowOtpModal(true);
      */
      
    } else {
      // Нэвтрэх
      const success = login(email, password);
      
      if (success) {
        // Амжилттай нэвтэрсэн бол home page рүү үсрэх
        navigate('/');
      } else {
        // Алдаа харуулах
        setErrorMessage(t('auth.errorDesc'));
        setShowError(true);
        
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    }
  };

  const sendOtpEmail = async (toEmail: string, otpCode: string, name: string) => {
    try {
      // EmailJS Configuration
      // 🔑 Setup instructions at: https://www.emailjs.com/
      const EMAILJS_SERVICE_ID = 'service_abc123'; // Replace with your EmailJS service ID
      const EMAILJS_TEMPLATE_ID = 'template_yjitvin'; // Replace with your EmailJS template ID
      const EMAILJS_PUBLIC_KEY = 'sNOxFMSq5Nqr-UoG0'; // Replace with your EmailJS public key

      // EmailJS library хэрэглэх (CDN-ээс татагдсан)
      const emailjs = (window as any).emailjs;

      if (!emailjs) {
        console.error('❌ EmailJS library not loaded. Add the script to index.html');
        console.log(`📧 OTP for ${toEmail}: ${otpCode}`);
        return;
      }

      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Email template parameters
      const templateParams = {
        to_email: toEmail,
        to_name: name,
        otp_code: otpCode,
        from_name: 'AYL Travel',
        message: `Your verification code is: ${otpCode}`,
      };

      // Send email
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        console.log('✅ OTP email sent successfully!');
        console.log(`📧 Sent to: ${toEmail}`);
        console.log(`🔑 OTP Code: ${otpCode}`);
      }
    } catch (error: any) {
      console.error('❌ Failed to send email:', error);
      console.log(`📧 OTP for ${toEmail}: ${otpCode}`);
      
      // Gmail API authentication error
      if (error.status === 412 || error.text?.includes('insufficient authentication scopes')) {
        console.error('\n🔴 GMAIL AUTHENTICATION ERROR!\n');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('Your Gmail connection needs to be reconfigured.');
        console.error('');
        console.error('📋 FIX STEPS:');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('');
        console.error('Option 1: Reconnect Gmail (RECOMMENDED)');
        console.error('─────────────────────────────────────────────────');
        console.error('1. Go to: https://dashboard.emailjs.com/admin');
        console.error('2. Click "Email Services"');
        console.error('3. Find your Gmail service');
        console.error('4. Click "Reconnect" or "Delete" then add new');
        console.error('5. When Google asks for permissions:');
        console.error('   ✅ GRANT ALL PERMISSIONS (especially "Send email")');
        console.error('   ❌ DO NOT skip any permission');
        console.error('6. Test again');
        console.error('');
        console.error('Option 2: Use Different Email Service');
        console.error('─────────────────────────────────────────────────');
        console.error('Gmail has strict API limits. Try these instead:');
        console.error('');
        console.error('🔹 Outlook/Hotmail (BEST ALTERNATIVE)');
        console.error('   → No API restrictions');
        console.error('   → Easy setup');
        console.error('   → More reliable');
        console.error('');
        console.error('🔹 Yahoo Mail');
        console.error('   → Simple configuration');
        console.error('   → Good for testing');
        console.error('');
        console.error('🔹 Custom SMTP');
        console.error('   → Use any email provider');
        console.error('   → Requires SMTP credentials');
        console.error('');
        console.error('Setup Instructions:');
        console.error('─────────────────────────────────────────────────');
        console.error('1. EmailJS Dashboard → Email Services');
        console.error('2. Click "Add New Service"');
        console.error('3. Select "Outlook" or "Yahoo"');
        console.error('4. Connect your account');
        console.error('5. Copy new SERVICE_ID');
        console.error('6. Update AuthPage.tsx line 117:');
        console.error('   const EMAILJS_SERVICE_ID = "NEW_SERVICE_ID";');
        console.error('');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('');
        console.error('For now, your OTP code is: ' + otpCode);
        console.error('You can manually enter this code to test the system.');
        console.error('');
      }
      
      // Other errors
      if (error.status === 400) {
        console.error('❌ Invalid template or missing variables');
        console.error('💡 Check your EmailJS template has: {{to_email}}, {{to_name}}, {{otp_code}}');
      }
      
      if (error.status === 404) {
        console.error('❌ Service ID or Template ID not found');
        console.error('💡 Check your SERVICE_ID and TEMPLATE_ID are correct');
      }

      // Set email send error
      setEmailSendError(true);
      setEmailErrorMessage(error.message || 'Failed to send email');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Зөвхөн тоо оруулах
    if (value && !/^\d$/.test(value)) return;
    
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);
    setOtpError(false);
    
    // Автоматаар дараагийн input руу шилжих
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace дарахад өмнөх input руу шилжих
    if (e.key === 'Backspace' && !otpInputs[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpVerify = () => {
    const enteredOtp = otpInputs.join('');
    
    if (enteredOtp === generatedOtp) {
      // OTP зөв бол бүртгэл хийх
      const fullName = `${firstName} ${lastName}`;
      signup(email, password, fullName);
      
      // OTP modal хаах
      setShowOtpModal(false);
      setOtpInputs(['', '', '', '']);
      
      // Амжилттай бүртгэгдсэн мэдэгдэл харуулах
      setShowSuccess(true);
      
      // Форм цэвэрлэх
      setFirstName('');
      setLastName('');
      setCountry('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      // 2 секундын дараа log in хэсэг рүү шилжүүлэх
      setTimeout(() => {
        setShowSuccess(false);
        setMode('login');
      }, 2000);
    } else {
      // OTP буруу бол алдаа харуулах
      setOtpError(true);
      setOtpInputs(['', '', '', '']);
      const firstInput = document.getElementById('otp-0');
      firstInput?.focus();
    }
  };

  const handleResendOtp = () => {
    // Шинэ OTP үүсгэх
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    
    // Шинэ OTP-ийг и-мэйээр илгээх
    sendOtpEmail(email, otp, firstName);
    
    // Inputs цэвэрлэх
    setOtpInputs(['', '', '', '']);
    setOtpError(false);
    
    // Амжилттай дахин илгээсэн мэдэгдэл
    alert(t('auth.otpResent'));
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'Google') {
      // Google OAuth URL рүү шилжих
      window.location.href = 'https://accounts.google.com/';
    }
  };

  const handleCountrySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCountrySearch(value);
    
    if (value) {
      const filtered = countries.filter(country =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
      setShowCountryDropdown(true);
    } else {
      setFilteredCountries(countries);
      setShowCountryDropdown(false);
    }
  };

  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setCountrySearch('');
    setShowCountryDropdown(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navigation />
      
      <div className="flex flex-1 pt-16">
        {/* Success Notification - Fixed at top */}
        {showSuccess && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
            <div className="bg-white rounded-2xl shadow-2xl border border-green-200 p-5 flex items-center gap-4 min-w-[320px]">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Амжилттай бүртгэгдлээ!</h4>
                <p className="text-sm text-gray-600">Таны бүртгэл амжилттай үүслээ</p>
              </div>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Error Notification - Fixed at top */}
        {showError && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
            <div className="bg-white rounded-2xl shadow-2xl border border-red-200 p-5 flex items-center gap-4 min-w-[320px]">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900 mb-1">Алдаа гарлаа!</h4>
                <p className="text-sm text-gray-600">{errorMessage}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowError(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Left Panel - Visual */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1695554477492-303aacd40561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25nb2xpYSUyMGdlciUyMGNhbXAlMjBzdGFycnklMjBuaWdodHxlbnwxfHx8fDE3Njk4Mzk0NjF8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F6F]/60 to-black/70" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
            {/* Logo/Brand */}
            <div>
              <h1 className="text-4xl mb-2">AYL</h1>
              <p className="text-white/80">Explore the untamed beauty of Mongolia</p>
            </div>

            {/* Main Message */}
            <div className="max-w-md">
              <h2 className="text-5xl mb-6 leading-tight">
                Start Your Mongolian Adventure
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Join thousands of travelers discovering the vast steppes, ancient traditions,
                and breathtaking landscapes of Mongolia.
              </p>

              {/* Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-white/90">Curated authentic experiences</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-white/90">Expert local guides</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    ✓
                  </div>
                  <span className="text-white/90">Sustainable tourism commitment</span>
                </div>
              </div>
            </div>

            {/* Bottom decoration */}
            <div className="text-sm text-white/60">
              © 2026 AYL
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <h1 className="text-3xl text-[#4A90A4] mb-2">AYL</h1>
              <p className="text-gray-600">Start your adventure</p>
            </div>

            {/* Tab Toggle */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-2xl">
              <button
                onClick={() => handleModeChange('login')}
                className={`flex-1 py-3 rounded-xl transition-all duration-300 ${
                  mode === 'login'
                    ? 'bg-white shadow-md text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => handleModeChange('signup')}
                className={`flex-1 py-3 rounded-xl transition-all duration-300 ${
                  mode === 'signup'
                    ? 'bg-white shadow-md text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600">
                {mode === 'login'
                  ? 'Enter your credentials to access your account'
                  : 'Join us and start planning your Mongolian journey'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name - Only for Sign Up */}
              {mode === 'signup' && (
                <div>
                  <label htmlFor="firstName" className="block text-sm text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A90A4] focus:border-transparent transition-all shadow-sm"
                      required={mode === 'signup'}
                    />
                  </div>
                </div>
              )}

              {/* Last Name - Only for Sign Up */}
              {mode === 'signup' && (
                <div>
                  <label htmlFor="lastName" className="block text-sm text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A90A4] focus:border-transparent transition-all shadow-sm"
                      required={mode === 'signup'}
                    />
                  </div>
                </div>
              )}

              {/* Country - Only for Sign Up */}
              {mode === 'signup' && (
                <div>
                  <label htmlFor="country" className="block text-sm text-gray-700 mb-2">
                    {t('auth.country')}
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                    <input
                      id="country"
                      type="text"
                      value={country || countrySearch}
                      onChange={handleCountrySearch}
                      onFocus={() => {
                        if (country) {
                          setCountry('');
                          setCountrySearch('');
                        }
                        setShowCountryDropdown(true);
                        setFilteredCountries(countries);
                      }}
                      placeholder={country || t('auth.selectCountry')}
                      className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A90A4] focus:border-transparent transition-all shadow-sm bg-white"
                      autoComplete="off"
                    />
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    
                    {/* Сонгогдсон улс харуулах */}
                    {country && !showCountryDropdown && (
                      <div className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-900 pointer-events-none">
                        {country}
                      </div>
                    )}
                    
                    {/* Dropdown list */}
                    {showCountryDropdown && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto z-20 country-dropdown">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((countryItem) => (
                            <div
                              key={countryItem}
                              className="px-4 py-2.5 cursor-pointer hover:bg-[#4A90A4]/10 transition-colors text-gray-700 hover:text-gray-900"
                              onClick={() => handleCountrySelect(countryItem)}
                            >
                              {countryItem}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-gray-500 text-center">
                            No countries found
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Hidden input for form validation */}
                  <input
                    type="hidden"
                    value={country}
                    required={mode === 'signup'}
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A90A4] focus:border-transparent transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A90A4] focus:border-transparent transition-all shadow-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password - Only for Sign Up */}
              {mode === 'signup' && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4A90A4] focus:border-transparent transition-all shadow-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot Password - Only for Login */}
              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-[#4A90A4] focus:ring-[#4A90A4]"
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-[#4A90A4] hover:text-[#3D7A8C] transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                {mode === 'login' ? 'Log In' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="w-full py-3.5 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 group-hover:text-gray-900">
                  Continue with Google
                </span>
              </button>
            </div>

            {/* Terms & Privacy */}
            <p className="mt-8 text-center text-sm text-gray-600">
              By continuing, you agree to our{' '}
              <a href="#" className="text-[#4A90A4] hover:text-[#3D7A8C] transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#4A90A4] hover:text-[#3D7A8C] transition-colors">
                Privacy Policy
              </a>
            </p>

            {/* Alternative Action */}
            <p className="mt-6 text-center text-sm text-gray-600">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => handleModeChange(mode === 'login' ? 'signup' : 'login')}
                className="text-[#4A90A4] hover:text-[#3D7A8C] transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl mb-2">{t('auth.otpTitle')}</h2>
              <p className="text-sm text-gray-600">
                {t('auth.otpDesc')}
              </p>
              <p className="text-sm text-[#4A90A4] mt-2">
                {email}
              </p>
            </div>

            {/* OTP Input Boxes */}
            <div className="flex gap-3 justify-center mb-6">
              {otpInputs.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className={`w-14 h-14 text-center text-2xl rounded-xl border-2 focus:outline-none transition-all shadow-sm ${
                    otpError
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-300 focus:border-[#4A90A4] focus:ring-2 focus:ring-[#4A90A4]/20'
                  }`}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Error Message */}
            {otpError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">
                  {t('auth.otpError')}
                </p>
              </div>
            )}

            {/* Verify Button */}
            <button
              type="button"
              onClick={handleOtpVerify}
              disabled={otpInputs.some(val => !val)}
              className="w-full py-4 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-3"
            >
              {t('auth.verifyOtp')}
            </button>

            {/* Resend Button */}
            <button
              type="button"
              onClick={handleResendOtp}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300"
            >
              {t('auth.resendOtp')}
            </button>

            {/* Console Note - Dev Only */}
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="text-center">
                <p className="text-xs text-blue-700 mb-2">
                  <strong>🔧 Development Mode</strong>
                </p>
                <p className="text-xs text-blue-600 mb-2">
                  Your OTP code is: <span className="font-mono font-bold text-lg text-blue-800">{generatedOtp}</span>
                </p>
                <p className="text-[10px] text-blue-500">
                  In production, this code will only be sent via email.
                </p>
              </div>
            </div>

            {/* Gmail Error Help */}
            {emailSendError && (
              <div className="mt-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-amber-900 mb-2">
                      📧 Email System Configuration Required
                    </p>
                    <p className="text-xs text-amber-700 mb-3">
                      Gmail authentication failed (Error 412). You have two options:
                    </p>
                    
                    <div className="space-y-2 mb-3">
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs font-semibold text-amber-900 mb-1">
                          ✅ Option 1: Switch to Outlook (Recommended)
                        </p>
                        <p className="text-[10px] text-amber-700">
                          Outlook has no API restrictions and works reliably.
                        </p>
                      </div>
                      
                      <div className="bg-white/60 rounded-lg p-2">
                        <p className="text-xs font-semibold text-amber-900 mb-1">
                          🔄 Option 2: Reconnect Gmail
                        </p>
                        <p className="text-[10px] text-amber-700">
                          Grant all permissions when reconnecting.
                        </p>
                      </div>
                    </div>

                    <a 
                      href="https://dashboard.emailjs.com/admin" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-700 underline"
                    >
                      Open EmailJS Dashboard →
                    </a>
                    
                    <p className="text-[10px] text-amber-600 mt-2">
                      For now, use the code above to continue testing.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {emailSendError && (
              <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <details className="cursor-pointer">
                  <summary className="text-xs text-gray-700 font-semibold">
                    🛠 View Detailed Instructions
                  </summary>
                  <div className="mt-2 pt-2 border-t border-gray-200 space-y-2 text-[10px] text-gray-600">
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Outlook Setup (3 minutes):</p>
                      <ol className="list-decimal list-inside space-y-0.5 ml-2">
                        <li>Go to EmailJS Dashboard</li>
                        <li>Click "Add New Service" → Outlook</li>
                        <li>Connect your Microsoft account</li>
                        <li>Copy the new SERVICE_ID</li>
                        <li>Update AuthPage.tsx line 117</li>
                        <li>Refresh browser and test</li>
                      </ol>
                    </div>
                    <div className="pt-1">
                      <p className="font-semibold text-gray-700 mb-1">Gmail Reconnect:</p>
                      <ol className="list-decimal list-inside space-y-0.5 ml-2">
                        <li>EmailJS → Email Services → Gmail</li>
                        <li>Click "Reconnect"</li>
                        <li>✅ Grant ALL permissions</li>
                        <li>Test again</li>
                      </ol>
                    </div>
                  </div>
                </details>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}