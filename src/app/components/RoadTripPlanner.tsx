import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

function InteractiveMap() {
  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg">
      {/* Google Maps-style Mongolia Map */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5537166.623265594!2d100.84821747656252!3d46.82525060000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969240766567fb%3A0x4d88249c5c3a8e2!2sMongolia!5e0!3m2!1sen!2s!4v1706851200000!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0"
      />
    </div>
  );
}

export function RoadTripPlanner() {
  const { t } = useLanguage();
  
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl mb-4">{t('roadTrip.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('roadTrip.subtitle')}
          </p>
        </div>

        {/* Full Width Map */}
        <div className="h-[700px] w-full">
          <InteractiveMap />
        </div>
      </div>
    </section>
  );
}