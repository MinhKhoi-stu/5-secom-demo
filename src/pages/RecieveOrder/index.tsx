import { Routes, Route, Navigate } from "react-router-dom";
import MainPage2D from "./components/Main/MainPage";
import UpdateOrderPage from "./components/Return/Update";
import MainPage from "./components/Main/MainPage";

const RecieveOrder = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      
      <Route path="update-2d" element={<UpdateOrderPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RecieveOrder;