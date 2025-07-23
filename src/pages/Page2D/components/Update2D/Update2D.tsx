import { useLocation } from "react-router-dom";
import {UpdateOrderForm} from "pages/Page2D/components/Update2D/UpdateOrderForm";
import {Order} from "types/OrderTable";

const UpdateOrderPage = () => {
  const location = useLocation();
  const order = location.state?.order as Order;

  if (!order) {
    return <div>Không tìm thấy dữ liệu đơn hàng</div>;
  }

  return <UpdateOrderForm orderId={order.orderId} demoImage={order.demoImage} />;
};

export default UpdateOrderPage;
