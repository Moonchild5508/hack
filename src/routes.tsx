import Home from './pages/Home';
import Library from './pages/Library';
import ActivityBuilder from './pages/ActivityBuilder';
import AACBuilder from './pages/AACBuilder';
import ScheduleBuilder from './pages/ScheduleBuilder';
import ViewAAC from './pages/ViewAAC';
import ViewSchedule from './pages/ViewSchedule';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Library',
    path: '/library',
    element: <Library />
  },
  {
    name: 'Activity Builder',
    path: '/activity-builder',
    element: <ActivityBuilder />
  },
  {
    name: 'AAC Builder',
    path: '/aac-builder',
    element: <AACBuilder />
  },
  {
    name: 'Schedule Builder',
    path: '/schedule-builder',
    element: <ScheduleBuilder />
  },
  {
    name: 'View AAC',
    path: '/view/aac/:id',
    element: <ViewAAC />,
    visible: false
  },
  {
    name: 'View Schedule',
    path: '/view/schedule/:id',
    element: <ViewSchedule />,
    visible: false
  }
];

export default routes;
