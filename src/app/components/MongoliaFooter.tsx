import { Facebook, Instagram, Youtube, Mail, Send, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export function MongoliaFooter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-br from-[#2C5F6F] to-[#1E4450] text-white relative overflow-hidden">
      {/* Mongolian Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D4AF37] via-transparent to-[#D4AF37]"></div>
        <div className="w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(212,175,55,0.1) 20px, rgba(212,175,55,0.1) 40px)`
        }}></div>
      </div>

      {/* Decorative Top Border */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 pt-3">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
            </div>
            <div className="h-px w-32 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl mb-4">AYL</h3>
            <p className="text-white/80 leading-relaxed mb-4">
              Your trusted partner for authentic Mongolian adventures since 2009.
            </p>
            <div className="flex items-start gap-2 text-sm text-white/70 mb-2">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>Ulaanbaatar, Mongolia</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+976 7012 3456</span>
            </div>
          </div>

          {/* Essential Info */}
          <div>
            <h4 className="text-lg mb-4">Essential Information</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  🛂 Visa Information
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  🚨 Emergency Contacts
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  🏥 Travel Insurance
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  📋 Packing List
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  🚗 Car Rental Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  🏕️ Ger Camp Bookings
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  👥 Local Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors flex items-center gap-2">
                  ✈️ Flight Assistance
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg mb-4">Stay Connected</h4>
            <p className="text-white/80 mb-4 text-sm">
              Get Mongolia travel tips, seasonal updates, and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="relative flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-3 bg-[#D4A373] hover:bg-[#C89563] text-white rounded-xl transition-all duration-300 flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h5 className="text-sm mb-3 text-white/90">🌍 Sustainable Tourism Commitment</h5>
          <p className="text-xs text-white/70 leading-relaxed">
            We're committed to preserving Mongolia's pristine landscapes and supporting local nomadic communities. 
            A portion of every booking goes toward environmental conservation and cultural preservation projects.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © 2026 AYL Mongolia. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}