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
import { useState } from "react";
import { Order } from "types/OrderTable";
import { mockOrders } from "../../../../data";

import OrdersAssignTable from "./OrdersAssignTable";
import OrdersUnassignedTable from "./OrdersUnassignedTable";
import RecieveOrderForm from "./RecieveOrderForm";

const MainPage = () => {
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
      <OrdersUnassignedTable orders={ordersToDraw} onAccept={handleAcceptOrder} />
      <OrdersAssignTable orders={inProgressOrders} />

      <RecieveOrderForm
        open={openDialog}
        order={selectedOrder}
        onClose={handleCloseDialog}
        onSubmit={handleConfirmUpdate}
      />
    </Box>
  );
};

export default MainPage;

