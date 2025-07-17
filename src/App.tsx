// import { useState } from 'react'
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import PageLayout from "./layouts/PageLayout";
import AdminDashboard from "./pages/admin-dashboard";
import AddProduct from "./pages/product/add-product";
import MainProduct from "./pages/product/main-product";
import MainSKUDesign from "./pages/sku-design/main-skudesign";
import AddSKUDesign from "./pages/sku-design/add-skudesign";
import MainUser from "./pages/user/main-user";
import AddUser from "./pages/user/add-user";
import MainTracking from "./pages/tracking/main-tracking";
import DetailsTracking from "./pages/tracking/details-tracking";
import MainFulfillment from "./pages/fulfillment/main-fulfillment";
import ForgotPassword from "./pages/forgotpassword";
import AddOrder from "./pages/fulfillment/add-order";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* mặc định load đăng nhập */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />

        <Route element={<PageLayout />}>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
