// import {
//   Box,
//   Button,
//   InputAdornment,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import { Order } from "types/OrderTable";
// import { mockOrders } from "../../../../data";

// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import OrdersUnassignedTable from "./OrdersUnassignedTable";
// import RecieveOrderForm from "./RecieveOrderForm";

// const MainPage = () => {
//   const [ordersToDraw, setOrdersToDraw] = useState<Order[]>(mockOrders);
//   const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);

//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//   const [openDialog, setOpenDialog] = useState(false);

//   const [searchKeyword, setSearchKeyword] = useState("");

//   const handleAcceptOrder = (order: Order) => {
//     setSelectedOrder(order);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedOrder(null);
//   };

//   const handleConfirmUpdate = (updatedData?: {
//     status: string;
//     image?: File;
//   }) => {
//     if (selectedOrder) {
//       const updatedOrder = {
//         ...selectedOrder,
//         status: updatedData?.status || "Đã cập nhật",
//       };

//       setOrdersToDraw((prev) => prev.filter((o) => o.id !== selectedOrder.id));
//       setInProgressOrders((prev) => [...prev, updatedOrder]);
//     }
//     handleCloseDialog();
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         textAlign: "start",
//         gap: 2,
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           gap: 10
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             textAlign: "start",
//             gap: 2,
//           }}
//         >
//           <Typography variant="h5" fontWeight="bold" color="black">
//             Tiêu đề này truyền facilityTypeId vào
//           </Typography>

//           <TextField
//             type="text"
//             placeholder="Tìm kiếm đơn hàng"
//             variant="outlined"
//             value={searchKeyword}
//             onChange={(e) => setSearchKeyword(e.target.value)}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <SearchOutlinedIcon sx={{ color: "#888" }} />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               backgroundColor: "white",
//               borderRadius: "10px",
//               width: "100%",
//             }}
//           />
//         </Box>

//         <Button
//           sx={{
//             backgroundColor: "transparent",
//             color: "black",
//             fontSize: "20px",
//             fontWeight: "bold",
//             width: "400px",
//             height: "20vh",
//           }}
//           variant="contained"
//           size="small"
//           // onClick={() => onAccept(order)}
//         >
//           ĐÃ NHẬN
//         </Button>
//       </Box>

//       <OrdersUnassignedTable
//         orders={ordersToDraw}
//         onAccept={handleAcceptOrder}
//       />
//       {/* <OrdersAssignTable orders={inProgressOrders} /> */}

//       <RecieveOrderForm
//         open={openDialog}
//         order={selectedOrder}
//         onClose={handleCloseDialog}
//         onSubmit={handleConfirmUpdate}
//       />
//     </Box>
//   );
// };

// export default MainPage;

import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Order } from "types/OrderTable";
import { mockOrders } from "../../../../data";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import OrdersUnassignedTable from "./OrdersUnassignedTable";
import RecieveOrderForm from "./RecieveOrderForm";
import OrdersAssignTable from "./OrdersAssignTable";

const MainPage: React.FC = () => {
  const [ordersToDraw, setOrdersToDraw] = useState<Order[]>(mockOrders);
  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [openAssignDialog, setOpenAssignDialog] = useState(false);

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
      const updatedOrder: Order = {
        ...selectedOrder,
        status: updatedData?.status || "Đã cập nhật",
      };

      setOrdersToDraw((prev) => prev.filter((o) => o.id !== selectedOrder.id));
      setInProgressOrders((prev) => [...prev, updatedOrder]);
    }
    handleCloseDialog();
  };
  
  const filteredOrders = useMemo(() => {
    const kw = searchKeyword.trim().toLowerCase();
    if (!kw) return ordersToDraw;
    return ordersToDraw.filter((o) => {
      const parts = [
        (o as any).id,
        (o as any).code,
        (o as any).customerName,
        (o as any).status,
        JSON.stringify(o),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return parts.includes(kw);
    });
  }, [ordersToDraw, searchKeyword]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          gap: 2,
          width: "100%",
        }}
      >
        <Grid container spacing={2} alignItems="stretch">
          {/* Left column: title + search */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "start",
                gap: 2,
                height: "100%",
              }}
            >
              <Typography variant="h5" fontWeight="bold" color="black">
                Tiêu đề này truyền facilityTypeId vào
              </Typography>

              <TextField
                type="text"
                placeholder="Tìm kiếm đơn hàng"
                variant="outlined"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchOutlinedIcon sx={{ color: "#888" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  width: "100%",
                }}
                fullWidth
                inputProps={{ "aria-label": "Tìm kiếm đơn hàng" }}
              />
            </Box>
          </Grid>

          {/* Right column: big button */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 0, md: 1 },
              }}
            >
              <Box sx={{ width: { xs: "100%", md: 400 }, display: "flex" }}>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: "transparent",
                    color: "black",
                    fontSize: { xs: "16px", md: "20px" },
                    fontWeight: "bold",
                    borderRadius: 2,
                    textTransform: "uppercase",
                    minHeight: { xs: 56, sm: 80, md: 120 },
                    height: { xs: "auto", md: "100%" },
                  }}
                  variant="contained"
                  size="large"
                  onClick={() => setOpenAssignDialog(true)}
                >
                  ĐÃ NHẬN
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bảng đơn hàng chưa phân công */}
        <OrdersUnassignedTable
          // orders={filteredOrders}
          onAccept={handleAcceptOrder}
        />

        {/* Form nhận đơn (popup) */}
        <RecieveOrderForm
          open={openDialog}
          order={selectedOrder}
          onClose={handleCloseDialog}
          onSubmit={handleConfirmUpdate}
        />
      </Box>

      <OrdersAssignTable
        orders={inProgressOrders}
        open={openAssignDialog}
        onClose={() => setOpenAssignDialog(false)}
      />
    </>
  );
};

export default MainPage;
