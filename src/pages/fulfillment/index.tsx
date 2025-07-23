import { Routes, Route, Navigate } from "react-router-dom";
import MainFulfillment from "./component/Main/MainFulfillment";
import AddOrder from "./component/AddOrder/AddOrder";

const Fulfillment = () => {
  return (
    <Routes>
      {/* Mặc định: /fulfillment -> MainFulfillment */}
      <Route path="/" element={<MainFulfillment />} />

      {/* /fulfillment/add-order */}
      <Route path="add-order" element={<AddOrder />} />

      {/* Route không hợp lệ -> redirect về "/fulfillment" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Fulfillment;
