import AuthLayout from 'layouts/AuthLayout';
import PageLayout from 'layouts/PageLayout';

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { PATH } from './constants';

const NotFoundPage = lazy(() => import('pages/404'));

const LoginPage = lazy(() => import('pages/Login'));
const ForgotPasswordPage = lazy(() => import('pages/ForgotPassword'));

const DashboardPage = lazy(() => import('pages/AdminDashboard'));

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
