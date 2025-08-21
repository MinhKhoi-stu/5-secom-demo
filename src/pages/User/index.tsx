import { Routes, Route, Navigate } from "react-router-dom";
import MainUser from "./components/MainUser";
import AddUser from "./components/CreateUser";

const User = () => {
  return (
    <Routes>
      {/* Mặc định route (Tracking/index.tsx) sẽ hiện MainTracking */}
      <Route path="/" element={<MainUser />} />
      
      {/* Khi navigate("/details-tracking") thì hiện trang DetailsTracking */}
      <Route path="add-user" element={<AddUser />} />

      {/* Nếu route không hợp lệ thì redirect về "/" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default User;
