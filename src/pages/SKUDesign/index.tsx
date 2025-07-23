import { Routes, Route, Navigate } from "react-router-dom";
import MainSKUDesign from "./components/MainSKUDesign";
import AddSKUDesign from "./components/AddSKUDesign";

const SKUDesign = () => {
  return (
    <Routes>
      {/* Mặc định route (Tracking/index.tsx) sẽ hiện MainTracking */}
      <Route path="/" element={<MainSKUDesign />} />
      
      {/* Khi navigate("/details-tracking") thì hiện trang DetailsTracking */}
      <Route path="add-skudesign" element={<AddSKUDesign />} />

      {/* Nếu route không hợp lệ thì redirect về "/" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default SKUDesign;
