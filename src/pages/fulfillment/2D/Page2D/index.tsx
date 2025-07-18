import { useState } from "react";
import { Box } from "@mui/material";
import type {Order} from "../../../../types/OrderTable";
import {mockOrders} from "../../../../data";
import OrdersToDrawTable from "../../../../components/fulfillment/2D/OrdersToDrawTable";
import OrdersInProgressTable from "../../../../components/fulfillment/2D/OrdersInProgressTable";


const Page2D = () => {
  const [ordersToDraw, setOrdersToDraw] = useState<Order[]>(mockOrders);
  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);

  const handleAcceptOrder = (order: Order) => {
    setOrdersToDraw((prev) => prev.filter((o) => o.id !== order.id));
    setInProgressOrders((prev) => [...prev, order]);
  };

  return (
    <Box>
      <OrdersToDrawTable orders={ordersToDraw} onAccept={handleAcceptOrder} />
      <OrdersInProgressTable orders={inProgressOrders} />
    </Box>
  );
};

export default Page2D;
