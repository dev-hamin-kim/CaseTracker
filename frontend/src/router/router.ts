import {
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router';

import { CheckIn } from '../pages/CheckIn';
import { CheckInResult } from '../pages/CheckInResult';
// import { Home } from '../pages/Home';

const rootRoute = createRootRoute();

const checkInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CheckIn,
});

const checkInResultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/CheckInResult',
  component: CheckInResult,
});

// const workRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/home',
//   component: Home,
// });

const routeTree = rootRoute.addChildren([checkInRoute, checkInResultRoute]);
export const router = createRouter({ routeTree });