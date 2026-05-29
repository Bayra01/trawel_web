import { createBrowserRouter } from 'react-router';
import { HomePage } from './components/HomePage';
import { AuthPage } from './components/AuthPage';
import { AITripBuilder } from './components/AITripBuilder';
import { DestinationsPage } from './components/DestinationsPage';
import { DestinationDetailPage } from './components/DestinationDetailPage';
import { ProfilePage } from './components/ProfilePage';
import { WeatherPage } from './components/WeatherPage';
import { AllDestinationsPage } from './components/AllDestinationsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/auth',
    Component: AuthPage,
  },
  {
    path: '/trip-builder',
    Component: AITripBuilder,
  },
  {
    path: '/destinations',
    Component: DestinationsPage,
  },
  {
    path: '/destinations/:id',
    Component: DestinationDetailPage,
  },
  {
    path: '/profile',
    Component: ProfilePage,
  },
  {
    path: '/weather',
    Component: WeatherPage,
  },
  {
    path: '/explore',
    Component: AllDestinationsPage,
  },
]);