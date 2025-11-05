import {
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router';

import { Intro } from '../pages/Intro';
import { Login } from '../pages/Login';
import { CheckIn } from '../pages/CheckIn';
import { CheckInResult } from '../pages/CheckInResult';
import { CaseTrack } from '../pages/CaseTrack';
import { CaseList } from '../pages/CaseList';
import { CreateCase } from '../pages/CreateCase';

// import { Home } from '../pages/Home';

const rootRoute = createRootRoute();

const introRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Intro
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/Login',
  component: Login
})

const checkInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/CheckIn',
  component: CheckIn,
});

const checkInResultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/CheckInResult',
  component: CheckInResult,
});

const caseTrackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/CaseTrack/$caseID',
  component: CaseTrack,
});

const caseListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/CaseList',
  component: CaseList,
});

const createCaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/CreateCase',
  component: CreateCase,
});
// const workRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/home',
//   component: Home,
// });

const routeTree = rootRoute.addChildren([introRoute, loginRoute, checkInRoute, checkInResultRoute, caseTrackRoute, caseListRoute, createCaseRoute]);
export const router = createRouter({ routeTree });