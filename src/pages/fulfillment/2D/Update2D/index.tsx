import { useLocation } from "react-router-dom";
import { type Order } from "../../../../types/OrderTable";
import {UpdateOrderForm} from "pages/fulfillment/component/2D/UpdateOrderForm";

const UpdateOrderPage = () => {
  const location = useLocation();
  const order = location.state?.order as Order;

  if (!order) {
    return <div>Không tìm thấy dữ liệu đơn hàng</div>;
  }

  return <UpdateOrderForm orderId={order.orderId} demoImage={order.demoImage} />;
};

export default UpdateOrderPage;
