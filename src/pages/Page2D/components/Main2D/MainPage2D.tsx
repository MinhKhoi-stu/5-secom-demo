import { useState } from "react";
import { Box } from "@mui/material";

import OrdersToDrawTable from "pages/Page2D/components/Main2D/OrdersToDrawTable";
import OrdersInProgressTable from "pages/Page2D/components/Main2D/OrdersInProgressTable";
import {mockOrders} from "../../../../data";
import {Order} from "types/OrderTable";


const MainPage2D = () => {
  const [ordersToDraw, setOrdersToDraw] = useState<Order[]>(mockOrders);
  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);

  const handleAcceptOrder = (order: Order) => {
    setOrdersToDraw((prev) => prev.filter((o) => o.id !== order.id));
    setInProgressOrders((prev) => [...prev, order]);
  };

  // const handleReturnOrder = (order: Order) => {
  //   setInProgressOrders((prev) => prev.filter((o) => o.id !== order.id));
  //   setOrdersToDraw((prev) => [...prev, order]);
  // };

  return (
    <Box>
      <OrdersToDrawTable orders={ordersToDraw} onAccept={handleAcceptOrder} />
      <OrdersInProgressTable
        orders={inProgressOrders}
        // onReturn={handleReturnOrder}
      />
    </Box>
  );
};

export default MainPage2D;
