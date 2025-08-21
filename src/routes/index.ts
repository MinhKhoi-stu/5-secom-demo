import AuthLayout from "layouts/AuthLayout";
import PageLayout from "layouts/PageLayout";

import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { PATH } from "./constants";
import MainTracking from "pages/Tracking/components/MainTracking";
import DetailsTracking from "pages/Tracking/components/DetailsTracking";
import MainSKUDesign from "pages/SKUDesign/components/MainSKUDesign";
import AddSKUDesign from "pages/SKUDesign/components/CreateSKUDesign";
import MainUser from "pages/User/components/MainUser";
import AddUser from "pages/User/components/CreateUser";
import MainProduct from "pages/Product/components/MainProduct";
import AddProduct from "pages/Product/components/CreateProduct";
import MainFulfillment from "pages/Fulfillment/component/Main/MainFulfillment";
import AddOrder from "pages/Fulfillment/component/CreateOrder/CreateOrder";
import AddOrderDetails from "pages/Fulfillment/component/CreateOrder/CreateOrderDetails";
import MainPage2D from "pages/Page2D/components/Main2D/MainPage2D";
import UpdateOrderPage from "pages/Page2D/components/Update2D/Update2D";


const NotFoundPage = lazy(() => import("pages/404"));

const LoginPage = lazy(() => import("pages/Login"));
const ForgotPasswordPage = lazy(() => import("pages/ForgotPassword"));

const DashboardPage = lazy(() => import("pages/AdminDashboard"));
const SKUDesignPage = lazy(() => import("pages/SKUDesign"));
const TrackingPage = lazy(() => import("pages/Tracking"));
const UserPage = lazy(() => import("pages/User"));
const ProductPage = lazy(() => import("pages/Product"));
const FulfillmentPage = lazy(() => import("pages/Fulfillment"));
const Main2DPage = lazy(() => import("pages/Page2D"));


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
      {
        path: PATH.SKUDESIGN,
        Component: SKUDesignPage,
        children: [
          {
            index: true,
            Component: MainSKUDesign,
          },
          {
            path: "add-skudesign",
            Component: AddSKUDesign,
          },
        ],
      },
      {
        path: PATH.TRACKING,
        Component: TrackingPage,
        children: [
          {
            index: true,
            Component: MainTracking,
          },
          {
            path: "details-tracking",
            Component: DetailsTracking,
          },
        ],
      },
      {
        path: PATH.USERS,
        Component: UserPage,
        children: [
          {
            index: true,
            Component: MainUser,
          },
          {
            path: "add-user",
            Component: AddUser,
          },
        ],
      },
      {
        path: PATH.PRODUCT,
        Component: ProductPage,
        children: [
          {
            index: true,
            Component: MainProduct,
          },
          {
            path: "add-product",
            Component: AddProduct,
          },
        ],
      },
      {
        path: PATH.FULFILLMENT,
        Component: FulfillmentPage,
        children: [
          {
            index: true,
            Component: MainFulfillment,
          },
          {
            path: "add-order",
            Component: AddOrder,
          },
          {
            path: "add-order-details",
            Component: AddOrderDetails,
          },
        ],
      },
      {
        path: PATH.PAGE2D,
        Component: Main2DPage,
        children: [
          {
            index: true,
            Component: MainPage2D,
          },
          {
            path: "update-2d",
            Component: UpdateOrderPage,
          },
        ],
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
