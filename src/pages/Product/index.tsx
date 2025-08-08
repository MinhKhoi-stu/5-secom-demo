import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "./components/CreateProduct";
import MainProduct from "./components/MainProduct";

const Product = () => {
  return (
    <Routes>
      {/* Mặc định route (Tracking/index.tsx) sẽ hiện MainTracking */}
      <Route path="/" element={<MainProduct />} />
      
      {/* Khi navigate("/details-tracking") thì hiện trang DetailsTracking */}
      <Route path="add-product" element={<AddProduct />} />

      {/* Nếu route không hợp lệ thì redirect về "/" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Product;
