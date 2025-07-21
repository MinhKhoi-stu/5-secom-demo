import { useLocation } from "react-router-dom";
import { UpdateOrderForm } from "../../../../components/FulFillment/2D/UpdateOrderForm";
import { type Order } from "../../../../types/OrderTable";

const UpdateOrderPage = () => {
  const location = useLocation();
  const order = location.state?.order as Order;

  if (!order) {
    return <div>Không tìm thấy dữ liệu đơn hàng</div>;
  }

  return <UpdateOrderForm orderId={order.orderId} demoImage={order.demoImage} />;
};

export default UpdateOrderPage;
