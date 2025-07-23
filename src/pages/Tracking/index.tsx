import { Routes, Route, Navigate } from "react-router-dom";
import MainTracking from "./components/MainTracking";
import DetailsTracking from "./components/DetailsTracking";

const Tracking = () => {
  return (
    <Routes>
      {/* Mặc định route (Tracking/index.tsx) sẽ hiện MainTracking */}
      <Route path="/" element={<MainTracking />} />
      
      {/* Khi navigate("/details-tracking") thì hiện trang DetailsTracking */}
      <Route path="details-tracking" element={<DetailsTracking />} />

      {/* Nếu route không hợp lệ thì redirect về "/" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Tracking;
