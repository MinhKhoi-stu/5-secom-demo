import { Routes, Route, Navigate } from "react-router-dom";
import MainFulfillment from "./component/Main/MainFulfillment";
import AddOrder from "./component/CreateOrder/CreateOrder";
import CreateOrder from "./component/CreateOrder/CreateOrder";

const Fulfillment = () => {
  return (
    <Routes>
      {/* Mặc định: /fulfillment -> MainFulfillment */}
      <Route path="/" element={<MainFulfillment />} />

      {/* /fulfillment/add-order */}
      <Route path="add-order" element={<CreateOrder />} />

      {/* Route không hợp lệ -> redirect về "/fulfillment" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Fulfillment;
