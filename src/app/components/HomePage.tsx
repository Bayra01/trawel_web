import { MongoliaHero } from './MongoliaHero';
import { FeaturedDestinations } from './FeaturedDestinations';
import { RoadTripPlanner } from './RoadTripPlanner';
import { TravelerExperiences } from './TravelerExperiences';
import { MongoliaFooter } from './MongoliaFooter';
import { Navigation } from './Navigation';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navigation />
      <MongoliaHero />
      <FeaturedDestinations />
      <RoadTripPlanner />
      <TravelerExperiences />
      <MongoliaFooter />
    </div>
  );
}