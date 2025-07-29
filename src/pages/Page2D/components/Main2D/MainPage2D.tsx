// import { useState } from "react";
// import { Box } from "@mui/material";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import OrdersToDrawTable from "./OrdersToDrawTable";
import OrdersInProgressTable from "./OrdersInProgressTable";
import { useState } from "react";
import { Order } from "types/OrderTable";
import { mockOrders } from "../../../../data";
import RecieveOrderModal from "../Update2D/RecieveOrder";

// import OrdersToDrawTable from "pages/Page2D/components/Main2D/OrdersToDrawTable";
// import OrdersInProgressTable from "pages/Page2D/components/Main2D/OrdersInProgressTable";
// import {mockOrders} from "../../../../data";
// import {Order} from "types/OrderTable";

// const MainPage2D = () => {
//   const [ordersToDraw, setOrdersToDraw] = useState<Order[]>(mockOrders);
//   const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);

//   const handleAcceptOrder = (order: Order) => {
//     setOrdersToDraw((prev) => prev.filter((o) => o.id !== order.id));
//     setInProgressOrders((prev) => [...prev, order]);
//   };

//   // const handleReturnOrder = (order: Order) => {
//   //   setInProgressOrders((prev) => prev.filter((o) => o.id !== order.id));
//   //   setOrdersToDraw((prev) => [...prev, order]);
//   // };

//   return (
//     <Box>
//       <OrdersToDrawTable orders={ordersToDraw} onAccept={handleAcceptOrder} />
//       <OrdersInProgressTable
//         orders={inProgressOrders}
//         // onReturn={handleReturnOrder}
//       />
//     </Box>
//   );
// };

// export default MainPage2D;

const MainPage2D = () => {
  const [ordersToDraw, setOrdersToDraw] = useState<Order[]>(mockOrders);
  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAcceptOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleConfirmUpdate = (updatedData?: {
    status: string;
    image?: File;
  }) => {
    if (selectedOrder) {
      const updatedOrder = {
        ...selectedOrder,
        status: updatedData?.status || "Đã cập nhật", // hoặc giữ nguyên nếu không cần
        // demoImage: updatedData?.image ? URL.createObjectURL(updatedData.image) : selectedOrder.demoImage,
      };

      setOrdersToDraw((prev) => prev.filter((o) => o.id !== selectedOrder.id));
      setInProgressOrders((prev) => [...prev, updatedOrder]);
    }
    handleCloseDialog();
  };

  return (
    <Box>
      <OrdersToDrawTable orders={ordersToDraw} onAccept={handleAcceptOrder} />
      <OrdersInProgressTable orders={inProgressOrders} />

      <RecieveOrderModal
        open={openDialog}
        order={selectedOrder}
        onClose={handleCloseDialog}
        onSubmit={handleConfirmUpdate}
      />
    </Box>
  );
};

export default MainPage2D;
