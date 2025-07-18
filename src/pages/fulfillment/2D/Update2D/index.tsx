import { 
    // useLocation, 
    useParams } from "react-router-dom";
import {UpdateOrderForm} from "../../../../components/fulfillment/2D/UpdateOrderForm";


const UpdateOrderPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
//   const location = useLocation();
//   const orderFromState = location.state?.order;

  // Giả lập dữ liệu đơn hàng (sau này sẽ lấy từ API)
  const order = {
    id: orderId || "", // fallback tránh undefined
    images: [],
  };

  return <UpdateOrderForm orderId={order.id} images={order.images} />;
};

export default UpdateOrderPage;
