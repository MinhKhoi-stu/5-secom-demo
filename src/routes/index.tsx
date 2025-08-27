// import AuthLayout from "layouts/AuthLayout";
// import PageLayout from "layouts/PageLayout";

// import { lazy } from "react";
// import { RouteObject } from "react-router-dom";
// import { PATH } from "./constants";
// import MainTracking from "pages/Tracking/components/MainTracking";
// import DetailsTracking from "pages/Tracking/components/DetailsTracking";
// import MainSKUDesign from "pages/SKUDesign/components/MainSKUDesign";
// import AddSKUDesign from "pages/SKUDesign/components/CreateSKUDesign";
// import MainUser from "pages/User/components/MainUser";
// import AddUser from "pages/User/components/CreateUser";
// import MainProduct from "pages/Product/components/MainProduct";
// import AddProduct from "pages/Product/components/CreateProduct";
// import MainFulfillment from "pages/Fulfillment/component/Main/MainFulfillment";
// import UpdateOrderPage from "pages/RecieveOrder/components/Return/Update";

// const NotFoundPage = lazy(() => import("pages/404"));

// const LoginPage = lazy(() => import("pages/Login"));
// const ForgotPasswordPage = lazy(() => import("pages/ForgotPassword"));

// const DashboardPage = lazy(() => import("pages/AdminDashboard"));
// const SKUDesignPage = lazy(() => import("pages/SKUDesign"));
// const TrackingPage = lazy(() => import("pages/Tracking"));
// const UserPage = lazy(() => import("pages/User"));
// const ProductPage = lazy(() => import("pages/Product"));
// const FulfillmentPage = lazy(() => import("pages/Fulfillment"));
// const MainPage = lazy(() => import("pages/RecieveOrder"));

// export const routes: RouteObject[] = [
//   {
//     Component: PageLayout,
//     children: [
//       {
//         path: PATH.ALL,
//         Component: NotFoundPage,
//       },
//       {
//         path: PATH.HOME,
//         Component: DashboardPage,
//       },
//       {
//         path: PATH.DASHBOARD,
//         Component: DashboardPage,
//       },
//       {
//         path: PATH.SKUDESIGN,
//         Component: SKUDesignPage,
//         children: [
//           {
//             index: true,
//             Component: MainSKUDesign,
//           },
//           {
//             path: "add-skudesign",
//             Component: AddSKUDesign,
//           },
//         ],
//       },
//       {
//         path: PATH.TRACKING,
//         Component: TrackingPage,
//         children: [
//           {
//             index: true,
//             Component: MainTracking,
//           },
//           {
//             path: "details-tracking",
//             Component: DetailsTracking,
//           },
//         ],
//       },
//       {
//         path: PATH.USERS,
//         Component: UserPage,
//         children: [
//           {
//             index: true,
//             Component: MainUser,
//           },
//           {
//             path: "add-user",
//             Component: AddUser,
//           },
//         ],
//       },
//       {
//         path: PATH.PRODUCT,
//         Component: ProductPage,
//         children: [
//           {
//             index: true,
//             Component: MainProduct,
//           },
//           {
//             path: "add-product",
//             Component: AddProduct,
//           },
//         ],
//       },
//       {
//         path: PATH.FULFILLMENT,
//         Component: FulfillmentPage,
//         children: [
//           {
//             index: true,
//             Component: MainFulfillment,
//           },
//           { path: ":typeCode", Component: MainFulfillment },
//           // {
//           //   path: "add-order",
//           //   Component: CreateOrder,
//           // },
//           // {
//           //   path: "add-order-details",
//           //   Component: CreateOrderDetails,
//           // },
//         ],
//       },
//       {
//         path: PATH.RECIEVEORDER,
//         Component: MainPage,
//         children: [
//           {
//             index: true,
//             Component: MainPage,
//           },
//           {
//             path: "update-2d",
//             Component: UpdateOrderPage,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     Component: AuthLayout,
//     children: [
//       {
//         path: PATH.LOGIN,
//         Component: LoginPage,
//       },
//       {
//         path: PATH.FORGOT_PASSWORD,
//         Component: ForgotPasswordPage,
//       },
//       // {
//       //   path: PATH.RESET_PASSWORD,
//       //   Component: ResetPasswordPage,
//       // },
//     ],
//   },
// ];

import AuthLayout from "layouts/AuthLayout";
import PageLayout from "layouts/PageLayout";

import React, { lazy } from "react";
import { RouteObject, useParams } from "react-router-dom";
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
import UpdateOrderPage from "pages/RecieveOrder/components/Return/Update";
import MainPage from "pages/RecieveOrder";

const NotFoundPage = lazy(() => import("pages/404"));
const LoginPage = lazy(() => import("pages/Login"));
const ForgotPasswordPage = lazy(() => import("pages/ForgotPassword"));
const DashboardPage = lazy(() => import("pages/AdminDashboard"));
const SKUDesignPage = lazy(() => import("pages/SKUDesign"));
const TrackingPage = lazy(() => import("pages/Tracking"));
const UserPage = lazy(() => import("pages/User"));
const ProductPage = lazy(() => import("pages/Product"));

/** Constants cho Fulfillment switch */
const MAIN_FULFILLMENT_TYPECODE = "facility-add-multiple-row";
const RECEIVE_ORDER_TYPECODES = new Set([
  "facility-drawing",
  "facility-cutting",
  "facility-sewing",
  "facility-noimage",
  "facility-manufactoring",
  "facility-packing",
  "facility-tracking",
]);

/** Quyết định component render dựa trên :typeCode từ URL */
const FulfillmentSwitch: React.FC = () => {
  const { typeCode: raw } = useParams<{ typeCode: string }>();
  let typeCode = "";
  try {
    typeCode = decodeURIComponent(raw ?? "");
  } catch {
    typeCode = raw ?? "";
  }

  if (!typeCode) return <MainFulfillment />;

  if (typeCode === MAIN_FULFILLMENT_TYPECODE) return <MainFulfillment />;

  if (typeCode === "facility-add-multiple-row") return <MainFulfillment />;

  if (RECEIVE_ORDER_TYPECODES.has(typeCode)) return <MainPage />;

  return <NotFoundPage />;
};

export const routes: RouteObject[] = [
  {
    Component: PageLayout,
    children: [
      { path: PATH.ALL, Component: NotFoundPage },
      { path: PATH.HOME, Component: DashboardPage },
      { path: PATH.DASHBOARD, Component: DashboardPage },

      {
        path: PATH.SKUDESIGN,
        Component: SKUDesignPage,
        children: [
          { index: true, Component: MainSKUDesign },
          { path: "add-skudesign", Component: AddSKUDesign },
        ],
      },

      {
        path: PATH.TRACKING,
        Component: TrackingPage,
        children: [
          { index: true, Component: MainTracking },
          { path: "details-tracking", Component: DetailsTracking },
        ],
      },

      {
        path: PATH.USERS,
        Component: UserPage,
        children: [
          { index: true, Component: MainUser },
          { path: "add-user", Component: AddUser },
        ],
      },

      {
        path: PATH.PRODUCT,
        Component: ProductPage,
        children: [
          { index: true, Component: MainProduct },
          { path: "add-product", Component: AddProduct },
        ],
      },

      /** 🔥 Fulfillment theo URL */
      { path: "facility", Component: MainFulfillment }, // /facility
      { path: "facility/:typeCode", Component: FulfillmentSwitch }, // /facility/:typeCode
      {
        path: "facility/facility-add-multiple-row",
        Component: MainFulfillment,
      },

      /** Phần ReceiveOrder cũ (nếu vẫn dùng riêng) */
      {
        path: PATH.RECIEVEORDER,
        Component: MainPage,
        children: [
          { index: true, Component: MainPage },
          { path: "update-2d", Component: UpdateOrderPage },
        ],
      },
    ],
  },
  {
    Component: AuthLayout,
    children: [
      { path: PATH.LOGIN, Component: LoginPage },
      { path: PATH.FORGOT_PASSWORD, Component: ForgotPasswordPage },
    ],
  },
];
