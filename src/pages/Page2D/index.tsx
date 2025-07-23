import { Routes, Route, Navigate } from "react-router-dom";
import MainPage2D from "./components/Main2D/MainPage2D";
import UpdateOrderPage from "./components/Update2D/Update2D";

const Page2D = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage2D />} />
      
      <Route path="update-2d" element={<UpdateOrderPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Page2D;