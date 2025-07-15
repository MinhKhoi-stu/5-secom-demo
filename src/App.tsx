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

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* mặc định load đăng nhập */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route element={<PageLayout />}>
          <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/main-product" element={<MainProduct />} />
          <Route path="/main-skudesign" element={<MainSKUDesign />} />
          <Route path="/add-skudesign" element={<AddSKUDesign />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
