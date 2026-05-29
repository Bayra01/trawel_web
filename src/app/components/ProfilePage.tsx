import { useState, useRef } from 'react';
import { Navigation } from './Navigation';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router';
import { 
  User, 
  Mail, 
  Globe, 
  Calendar, 
  MapPin, 
  Heart, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard,
  Bookmark,
  TrendingUp,
  Clock,
  Edit,
  Save,
  X,
  Camera
} from 'lucide-react';

type TabType = 'overview' | 'bookings' | 'saved' | 'settings';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem('profileImage')
  );
  
  // Edit form states
  const [editedName, setEditedName] = useState(user?.fullName || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  if (!user) {
    navigate('/auth');
    return null;
  }

  // Parse first/last name from full name
  const nameParts = user.fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  // Mock data - дараа нь database-аас авна
  const stats = [
    { label: 'Total Trips', value: '0', icon: MapPin, color: 'from-blue-500 to-blue-600' },
    { label: 'Saved Places', value: '0', icon: Bookmark, color: 'from-purple-500 to-purple-600' },
    { label: 'Reviews', value: '0', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'Member Since', value: '2026', icon: Calendar, color: 'from-orange-500 to-orange-600' },
  ];

  const mockBookings = [
    {
      id: 1,
      destination: 'Khuvsgul Lake',
      date: '2026-07-15',
      status: 'upcoming',
      guests: 2,
      price: '₮850,000'
    },
  ];

  const savedDestinations = [
    {
      id: 1,
      name: 'Gobi Desert',
      location: 'Southern Mongolia',
      image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400',
    },
    {
      id: 2,
      name: 'Terelj National Park',
      location: 'Central Mongolia',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    },
  ];

  const handleSave = () => {
    // TODO: Save to database
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem('profileImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">Account created</p>
                    <p className="text-sm text-gray-600">Welcome to AYL Travel!</p>
                  </div>
                  <span className="text-sm text-gray-500">Just now</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate('/destinations')}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Explore Destinations</span>
                </button>
                <button
                  onClick={() => navigate('/trip-builder')}
                  className="flex items-center gap-3 p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Plan a Trip</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className="flex items-center gap-3 p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                >
                  <Heart className="w-5 h-5" />
                  <span>View Saved</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">My Bookings</h3>
            
            {mockBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No bookings yet</p>
                <button
                  onClick={() => navigate('/destinations')}
                  className="px-6 py-3 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Start Planning
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A90A4] to-[#3D7A8C] flex items-center justify-center text-white">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{booking.destination}</h4>
                        <p className="text-sm text-gray-600">{booking.date} · {booking.guests} guests</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{booking.price}</p>
                      <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'saved':
        return (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Saved Destinations</h3>
            
            {savedDestinations.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No saved destinations yet</p>
                <button
                  onClick={() => navigate('/destinations')}
                  className="px-6 py-3 bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Explore Destinations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-all cursor-pointer"
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h4 className="font-semibold mb-1">{dest.name}</h4>
                      <p className="text-sm text-white/80">{dest.location}</p>
                    </div>
                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            {/* Account Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Account Settings</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4A90A4] text-white rounded-lg hover:bg-[#3D7A8C] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedName(user.fullName);
                        setEditedEmail(user.email);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90A4]"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{user.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A90A4]"
                    />
                  ) : (
                    <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <p className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      <Shield className="w-4 h-4" />
                      Standard Member
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive updates about your bookings</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#4A90A4]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A90A4]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Payment Methods</p>
                      <p className="text-sm text-gray-600">Manage your payment options</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                    Manage
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-xl font-semibold text-red-900 mb-4">Danger Zone</h3>
              <p className="text-sm text-red-700 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#4A90A4] to-[#3D7A8C] rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center gap-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-bold border-4 border-white/30 shadow-lg">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{firstName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm rounded-lg transition-all flex items-center gap-2 border border-white/20"
                  >
                    <Camera className="w-4 h-4" />
                    {profileImage ? 'Change' : 'Upload'}
                  </button>
                  
                  {profileImage && (
                    <button
                      onClick={handleRemoveImage}
                      className="px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-white text-sm rounded-lg transition-all flex items-center gap-2 border border-red-400/30"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
                
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.fullName}</h1>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>Mongolia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-[#4A90A4] text-[#4A90A4]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Overview</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === 'bookings'
                    ? 'border-[#4A90A4] text-[#4A90A4]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Bookings</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`flex-1 px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === 'saved'
                    ? 'border-[#4A90A4] text-[#4A90A4]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span>Saved</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 px-6 py-4 font-medium transition-colors border-b-2 ${
                  activeTab === 'settings'
                    ? 'border-[#4A90A4] text-[#4A90A4]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </div>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}