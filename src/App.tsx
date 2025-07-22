// import { useState } from 'react'
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import ErrorBoundary from "pages/500";
import { Loadable, Loading } from "components/common";
import { useEffect } from "react";
import { useGetMyProfile } from "hooks/admin-users";
import { routes } from "routes";
import { localStorageKey } from "utils/constants";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Login from "pages/Login";
import ForgotPassword from "pages/ForgotPassword";
import PageLayout from "layouts/PageLayout";
import AdminDashboard from "pages/AdminDashboard";
import MainProduct from "pages/product/main-product";
import Page2D from "pages/fulfillment/2D/Page2D";
import UpdateOrderPage from "pages/fulfillment/2D/Update2D";
import AddOrder from "pages/fulfillment/add-order";
import MainFulfillment from "pages/fulfillment/main-fulfillment";
import AddProduct from "pages/product/add-product";
import AddSKUDesign from "pages/SKUDesign/add-skudesign";
import MainSKUDesign from "pages/SKUDesign/main-skudesign";
import DetailsTracking from "pages/Tracking/details-tracking";
import MainTracking from "pages/Tracking/main-tracking";
import AddUser from "pages/user/add-user";
import MainUser from "pages/user/main-user";

function App() {
  // const [count, setCount] = useState(0)
  const router = createBrowserRouter(routes);
  const profile = useGetMyProfile();

  useEffect(() => {
    if (localStorage.getItem(localStorageKey.accessToken)) {
      profile.refetch();
    }

    const listener = (e: StorageEvent) => {
      if (e.key === localStorageKey.accessToken && e.newValue) {
        profile.refetch();
      }
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* mặc định load đăng nhập */}
        <Route path="/" element={<Navigate to="/Login" />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />

        <Route element={<PageLayout />}>
          <Route path="/" element={<Navigate to="/AdminDashboard" />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/main-product" element={<MainProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/main-skudesign" element={<MainSKUDesign />} />
          <Route path="/add-skudesign" element={<AddSKUDesign />} />
          <Route path="/main-user" element={<MainUser />} />
          <Route path="/add-user" element={<AddUser/>} />
          <Route path="/main-tracking" element={<MainTracking/>} />
          <Route path="/details-tracking" element={<DetailsTracking/>} />
          <Route path="/main-fulfillment" element={<MainFulfillment/>} />
          <Route path="/add-order" element={<AddOrder/>} />
          <Route path="/2D" element={<Page2D/>} />
          <Route path="/Update2D" element={<UpdateOrderPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    // <ErrorBoundary>
    //   <Loadable>
    //     {profile.isLoading ? (
    //       <Box
    //         display="flex"
    //         alignItems="center"
    //         sx={{ width: "100vw", height: "100vh" }}
    //       >
    //         <Loading text="Đang tải thông tin người dùng..." />
    //       </Box>
    //     ) : (
    //       <RouterProvider router={router} />
    //     )}
    //   </Loadable>
      
    //   <ToastContainer hideProgressBar autoClose={3000} />
    // </ErrorBoundary>
  );
}

export default App;
