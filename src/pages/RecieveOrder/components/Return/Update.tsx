import { useLocation } from "react-router-dom";
import {Order} from "types/OrderTable";
import {ReturnOrderForm} from "./ReturnOrderForm";

const UpdateOrderPage = () => {
  const location = useLocation();
  const order = location.state?.order as Order;

  if (!order) {
    return <div>Không tìm thấy dữ liệu đơn hàng</div>;
  }

  return <ReturnOrderForm orderId={order.orderId} demoImage={order.demoImage} />;
};

export default UpdateOrderPage;
