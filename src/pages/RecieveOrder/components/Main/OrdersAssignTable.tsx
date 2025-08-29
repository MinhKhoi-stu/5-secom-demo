// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useState } from "react";
// import { Order } from "types/OrderTable";
// import PaginationWrapper from "components/common/PaginationWrapper";
// import { ReturnOrderForm } from "../Return/ReturnOrderForm";

// interface Props {
//   orders: Order[];
//   open: boolean;
//   onClose: () => void;
// }

// const OrdersAssignTable = ({ orders, open, onClose }: Props) => {
//   // PAGINATION
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 8;

//   // DIALOG "TRẢ ĐƠN"
//   const [openReturn, setOpenReturn] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

//   const handlePageChange = (
//     event: React.ChangeEvent<unknown>,
//     value: number
//   ) => {
//     setPage(value);
//   };

//   const handleOpenReturn = (order: Order) => {
//     setSelectedOrder(order);
//     setOpenReturn(true);
//   };

//   const handleCloseReturn = () => {
//     setOpenReturn(false);
//     setSelectedOrder(null);
//   };

//   const paginatedOrders = orders.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   return (
//     <>
//       {/* Dialog bao toàn bộ bảng */}
//       <Dialog
//         open={open}
//         onClose={onClose}
//         fullWidth
//         maxWidth="lg"
//         PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
//       >
//         <DialogTitle
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             pb: 1,
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold">
//             facility - TRẢ ĐƠN
//           </Typography>
//           <IconButton onClick={onClose} size="small">
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent>
//           <TableContainer component={Paper} elevation={0}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
//                   <TableCell>SKU</TableCell>
//                   <TableCell>Order ID</TableCell>
//                   <TableCell>Ngày</TableCell>
//                   <TableCell>Hình Demo</TableCell>
//                   <TableCell>Sản phẩm</TableCell>
//                   <TableCell>Loại</TableCell>
//                   <TableCell>Số lượng</TableCell>
//                   <TableCell>Thao tác</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedOrders.map((order) => (
//                   <TableRow key={String(order.orderId)}>
//                     <TableCell>{order.sku}</TableCell>
//                     <TableCell>{order.orderId}</TableCell>
//                     <TableCell>{order.date}</TableCell>
//                     <TableCell>
//                       <img
//                         src={order.demoImage}
//                         alt="demo"
//                         style={{
//                           width: 40,
//                           height: 40,
//                           borderRadius: "8px",
//                           objectFit: "cover",
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell>{order.product}</TableCell>
//                     <TableCell>{order.type}</TableCell>
//                     <TableCell>{order.quantity}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         size="small"
//                         onClick={() => handleOpenReturn(order)}
//                       >
//                         Trả đơn
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 {orders.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={8} align="center">
//                       Không có đơn hàng nào đang xử lý
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination */}
//           <Box sx={{ mt: 2 }}>
//             <PaginationWrapper
//               page={page}
//               totalPages={Math.ceil(orders.length / itemsPerPage)}
//               totalItems={orders.length}
//               itemsPerPage={itemsPerPage}
//               onChange={handlePageChange}
//             />
//           </Box>
//         </DialogContent>
//       </Dialog>

//       {/* DIALOG TRẢ ĐƠN */}
//       <Dialog
//         open={openReturn}
//         onClose={handleCloseReturn}
//         fullWidth
//         maxWidth="md"
//         keepMounted
//         PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
//       >
//         <DialogContent sx={{ p: 2 }}>
//           {selectedOrder && (
//             <ReturnOrderForm
//               orderId={String(selectedOrder.orderId)}
//               demoImage={selectedOrder.demoImage}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default OrdersAssignTable;

import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaginationWrapper from "components/common/PaginationWrapper";

export interface Order {
  sku: string;
  orderId: string;
  date: string;
  demoImage: string;
  product: string;
  type: string;
  quantity: number;
}

interface Props {
  orders: Order[];
  open: boolean;
  onClose: () => void;
}

const OrdersAssignTable = ({ orders, open, onClose }: Props) => {
  // PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // DIALOG "TRẢ ĐƠN"
  const [openReturn, setOpenReturn] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleOpenReturn = (order: Order) => {
    setSelectedOrder(order);
    setOpenReturn(true);
  };

  const handleCloseReturn = () => {
    setOpenReturn(false);
    setSelectedOrder(null);
  };

  const paginatedOrders = orders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <>
      {/* Dialog bao toàn bộ bảng */}
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            facility - TRẢ ĐƠN
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
                  <TableCell>SKU</TableCell>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Ngày</TableCell>
                  <TableCell>Hình Demo</TableCell>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={String(order.orderId)}>
                    <TableCell>{order.sku}</TableCell>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <img
                        src={order.demoImage}
                        alt="demo"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleOpenReturn(order)}
                      >
                        Trả đơn
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Không có đơn hàng nào đang xử lý
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ mt: 2 }}>
            <PaginationWrapper
              page={page}
              totalPages={Math.ceil(orders.length / itemsPerPage)}
              totalItems={orders.length}
              itemsPerPage={itemsPerPage}
              onChange={handlePageChange}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* DIALOG TRẢ ĐƠN (giữ nguyên, placeholder) */}
      <Dialog
        open={openReturn}
        onClose={handleCloseReturn}
        fullWidth
        maxWidth="md"
        keepMounted
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
      >
        <DialogContent sx={{ p: 2 }}>
          {selectedOrder && (
            <Typography>
              Trả đơn #{selectedOrder.orderId} (demo).
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersAssignTable;