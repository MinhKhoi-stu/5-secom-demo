import AuthLayout from 'layouts/AuthLayout';
import PageLayout from 'layouts/PageLayout';

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { PATH } from './constants';
// import MainSKUDesign from 'pages/sku-design/main-skudesign';

const NotFoundPage = lazy(() => import('pages/404'));

const LoginPage = lazy(() => import('pages/Login'));
const ForgotPasswordPage = lazy(() => import('pages/ForgotPassword'));

const DashboardPage = lazy(() => import('pages/AdminDashboard'));
// const MainSKUDesign = lazy(() =>
//   import('pages/SKUDesign/main-skudesign')
// );
const TrackingPage = lazy(() => import('pages/Tracking/main-tracking'));

export const routes: RouteObject[] = [
  {
    Component: PageLayout,
    children: [
      {
        path: PATH.ALL,
        Component: NotFoundPage,
      },
      {
        path: PATH.HOME,
        Component: DashboardPage,
      },
      {
        path: PATH.DASHBOARD,
        Component: DashboardPage,
      },
      // {
      //   path: PATH.SKUDESIGN,
      //   Component: MainSKUDesign,
      // },
      {
        path: PATH.TRACKING,
        Component: TrackingPage,
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: PATH.LOGIN,
        Component: LoginPage,
      },
      {
        path: PATH.FORGOT_PASSWORD,
        Component: ForgotPasswordPage,
      },
      // {
      //   path: PATH.RESET_PASSWORD,
      //   Component: ResetPasswordPage,
      // },
    ],
  },
];
