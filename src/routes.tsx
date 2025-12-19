import Home from './pages/Home';
import Library from './pages/Library';
import ActivityBuilder from './pages/ActivityBuilder';
import AACBuilder from './pages/AACBuilder';
import ScheduleBuilder from './pages/ScheduleBuilder';
import ViewAAC from './pages/ViewAAC';
import ViewSchedule from './pages/ViewSchedule';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TherapistDashboard from './pages/TherapistDashboard';
import ChildDashboard from './pages/ChildDashboard';
import ParentDashboard from './pages/ParentDashboard';
import PlayActivity from './pages/PlayActivity';
import AssignActivity from './pages/AssignActivity';
import Admin from './pages/Admin';
import MatchingActivityBuilder from './pages/MatchingActivityBuilder';
import ManageUsers from './pages/ManageUsers';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import ResourceDetailPage from './pages/marketplace/ResourceDetailPage';
import UploadResourcePage from './pages/marketplace/UploadResourcePage';
import MyResourcesPage from './pages/marketplace/MyResourcesPage';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false
  },
  {
    name: 'Signup',
    path: '/signup',
    element: <Signup />,
    visible: false
  },
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
    element: <MatchingActivityBuilder />
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
    name: 'Marketplace',
    path: '/marketplace',
    element: <MarketplacePage />
  },
  {
    name: 'Resource Detail',
    path: '/marketplace/:id',
    element: <ResourceDetailPage />,
    visible: false
  },
  {
    name: 'Upload Resource',
    path: '/marketplace/upload',
    element: <UploadResourcePage />,
    visible: false
  },
  {
    name: 'My Resources',
    path: '/my-resources',
    element: <MyResourcesPage />
  },
  {
    name: 'Therapist Dashboard',
    path: '/therapist-dashboard',
    element: <TherapistDashboard />,
    visible: false
  },
  {
    name: 'Child Dashboard',
    path: '/child-dashboard',
    element: <ChildDashboard />,
    visible: false
  },
  {
    name: 'Parent Dashboard',
    path: '/parent-dashboard',
    element: <ParentDashboard />,
    visible: false
  },
  {
    name: 'Manage Users',
    path: '/manage-users',
    element: <ManageUsers />,
    visible: false
  },
  {
    name: 'Play Activity',
    path: '/play-activity/:assignmentId',
    element: <PlayActivity />,
    visible: false
  },
  {
    name: 'Assign Activity',
    path: '/assign-activity/:activityId',
    element: <AssignActivity />,
    visible: false
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <Admin />,
    visible: false
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
