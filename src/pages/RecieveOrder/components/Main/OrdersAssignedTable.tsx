// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Box,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Button,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import PaginationWrapper from "components/common/PaginationWrapper";
// import { ReturnOrderForm } from "../Return/ReturnOrderForm";
// import { FacilityDto } from "dto/facility/facility.dto";

// interface Props {
//   orders: FacilityDto[];
//   open: boolean;
//   onClose: () => void;
// }

// const OrdersAssignTable = ({ orders, open, onClose }: Props) => {
//   // PAGINATION
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 8;

//   // ensure current page is valid when orders change
//   const totalPages = Math.max(1, Math.ceil(orders.length / itemsPerPage));
//   useEffect(() => {
//     if (page > totalPages) {
//       setPage(totalPages);
//     }
//     if (orders.length === 0 && page !== 1) {
//       setPage(1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [orders, totalPages]);

//   // DIALOG "TRẢ ĐƠN" state
//   const [openReturn, setOpenReturn] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState<FacilityDto | null>(null);

//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   const handlePageChange = (
//     event: React.ChangeEvent<unknown>,
//     value: number
//   ) => {
//     setPage(value);
//   };

//   // mở dialog trả đơn
//   const handleOpenReturn = (order: FacilityDto) => {
//     setSelectedOrder(order);
//     setOpenReturn(true);
//   };

//   // đóng dialog trả đơn
//   const handleCloseReturn = () => {
//     setOpenReturn(false);
//     setSelectedOrder(null);
//   };

//   const handleReturnSubmit = (data: { status: string; image?: File }) => {
//     console.log("Trả đơn submit:", {
//       selectedOrderId: selectedOrder?.id ?? selectedOrder?.code,
//       payload: data,
//     });

//     // đóng modal sau khi submit
//     setOpenReturn(false);
//     setSelectedOrder(null);
//   };

//   const paginatedOrders = useMemo(
//     () => orders.slice((page - 1) * itemsPerPage, page * itemsPerPage),
//     [orders, page]
//   );

//   // helper để lấy ảnh demo (sampleSource có thể là string/array/object)
//   const getFirstImage = (sampleSource: any): string | undefined => {
//     if (!sampleSource) return undefined;
//     if (typeof sampleSource === "string") return sampleSource;
//     if (Array.isArray(sampleSource)) {
//       const first = sampleSource[0];
//       if (!first) return undefined;
//       if (typeof first === "string") return first;
//       return first.url ?? first.path ?? undefined;
//     }
//     return sampleSource.url ?? sampleSource.path ?? undefined;
//   };

//   return (
//     <>
//       {/* Dialog bao toàn bộ bảng */}
//       <Dialog
//         open={open}
//         onClose={onClose}
//         fullWidth
//         maxWidth="lg"
//         PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
//         fullScreen={false}
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
//             TRẢ ĐƠN
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
//                   <TableCell>Trạng thái</TableCell>
//                   <TableCell>Thao tác</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedOrders.map((order) => {
//                   const demoImage = getFirstImage(order.sampleSource);
//                   return (
//                     <TableRow key={order.id}>
//                       <TableCell>{order.code}</TableCell>
//                       <TableCell>{order.idNumber}</TableCell>
//                       <TableCell>
//                         {order.createdDate
//                           ? new Date(order.createdDate).toLocaleString("vi-VN")
//                           : "-"}
//                       </TableCell>
//                       <TableCell>
//                         {demoImage ? (
//                           <img
//                             src={demoImage}
//                             alt="demo"
//                             style={{
//                               width: 40,
//                               height: 40,
//                               borderRadius: 8,
//                               objectFit: "cover",
//                             }}
//                           />
//                         ) : (
//                           <Typography variant="body2" color="text.secondary">
//                             -
//                           </Typography>
//                         )}
//                       </TableCell>
//                       <TableCell>{order.labelingStandard ?? "-"}</TableCell>
//                       <TableCell>{order.stateOpt?.code ?? "-"}</TableCell>
//                       <TableCell>{order.area ?? 0}</TableCell>
//                       <TableCell>{order.facilityType.name}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="outlined"
//                           color="error"
//                           size="small"
//                           onClick={() => handleOpenReturn(order)}
//                         >
//                           Trả đơn
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
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
//               totalPages={totalPages}
//               totalItems={orders.length}
//               itemsPerPage={itemsPerPage}
//               onChange={handlePageChange}
//             />
//           </Box>
//         </DialogContent>
//       </Dialog>

//       {/* DIALOG TRẢ ĐƠN (mở khi click "Trả đơn") */}
//       <Dialog
//         open={openReturn}
//         onClose={handleCloseReturn}
//         fullWidth
//         maxWidth="sm"
//         keepMounted
//         fullScreen={fullScreen}
//         PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
//         aria-labelledby="return-order-dialog"
//       >
//         <DialogTitle
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             pb: 0,
//           }}
//         ></DialogTitle>

//         <DialogContent
//           sx={{
//             p: 2,
//             overflowX: "hidden",
//             overflowY: "auto",
//             scrollbarWidth: "none",
//             "&::-webkit-scrollbar": { display: "none" },
//           }}
//         >
//           <ReturnOrderForm
//             order={selectedOrder}
//             orderId={String(selectedOrder?.idNumber)}
//             demoImage={getFirstImage(selectedOrder?.sampleSource) ?? ""}
//             onClose={handleCloseReturn}
//             onSubmit={handleReturnSubmit}
//           />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default OrdersAssignTable;

import React, { useState, useMemo, useEffect, useRef } from "react";
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaginationWrapper from "components/common/PaginationWrapper";
import { ReturnOrderForm } from "../Return/ReturnOrderForm";
import { FacilityDto } from "dto/facility/facility.dto";

interface Props {
  orders: FacilityDto[];
  open: boolean;
  onClose: () => void;
}

const OrdersAssignTable = ({ orders, open, onClose }: Props) => {
  // PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // ensure current page is valid when orders change
  const totalPages = Math.max(1, Math.ceil(orders.length / itemsPerPage));
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
    if (orders.length === 0 && page !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, totalPages]);

  // DIALOG "TRẢ ĐƠN" state
  const [openReturn, setOpenReturn] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<FacilityDto | null>(null);

  const openReturnTimeoutRef = useRef<number | null>(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // mở dialog trả đơn
  const handleOpenReturn = (order: FacilityDto) => {
    // set selected order
    setSelectedOrder(order);

    // đóng OrdersAssignTable (yêu cầu)
    try {
      onClose && onClose();
    } catch (e) {
      // ignore if onClose not provided / throws
      console.error("onClose error:", e);
    }

    // mở dialog ReturnOrderForm sau 1 khoảng nhỏ để tránh 2 dialog chồng nhau
    // (giúp UX mượt hơn: đóng dialog cũ trước, rồi mở dialog trả đơn)
    if (openReturnTimeoutRef.current) {
      clearTimeout(openReturnTimeoutRef.current);
      openReturnTimeoutRef.current = null;
    }
    openReturnTimeoutRef.current = window.setTimeout(() => {
      setOpenReturn(true);
      openReturnTimeoutRef.current = null;
    }, 150);
  };

  // đóng dialog trả đơn
  const handleCloseReturn = () => {
    setOpenReturn(false);
    setSelectedOrder(null);
  };

  const handleReturnSubmit = (data: { status: string; image?: File }) => {
    console.log("Trả đơn submit:", {
      selectedOrderId: selectedOrder?.id ?? selectedOrder?.code,
      payload: data,
    });

    // đóng modal sau khi submit
    setOpenReturn(false);
    setSelectedOrder(null);
  };

  const paginatedOrders = useMemo(
    () => orders.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [orders, page]
  );

  // helper để lấy ảnh demo (sampleSource có thể là string/array/object)
  const getFirstImage = (sampleSource: any): string | undefined => {
    if (!sampleSource) return undefined;
    if (typeof sampleSource === "string") return sampleSource;
    if (Array.isArray(sampleSource)) {
      const first = sampleSource[0];
      if (!first) return undefined;
      if (typeof first === "string") return first;
      return first.url ?? first.path ?? undefined;
    }
    return sampleSource.url ?? sampleSource.path ?? undefined;
  };

  // cleanup timeout khi unmount
  useEffect(() => {
    return () => {
      if (openReturnTimeoutRef.current) {
        clearTimeout(openReturnTimeoutRef.current);
        openReturnTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {/* Dialog bao toàn bộ bảng */}
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ sx: { borderRadius: 3, p: 2 } }}
        fullScreen={false}
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
             - TRẢ ĐƠN
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
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map((order) => {
                  const demoImage = getFirstImage(order.sampleSource);
                  return (
                    <TableRow key={order.id}>
                      <TableCell>{order.code}</TableCell>
                      <TableCell>{order.idNumber}</TableCell>
                      <TableCell>
                        {order.createdDate
                          ? new Date(order.createdDate).toLocaleString("vi-VN")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {demoImage ? (
                          <img
                            src={demoImage}
                            alt="demo"
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 8,
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            -
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{order.labelingStandard ?? "-"}</TableCell>
                      <TableCell>{order.stateOpt?.code ?? "-"}</TableCell>
                      <TableCell>{order.area ?? 0}</TableCell>
                      <TableCell>{order.facilityType.name}</TableCell>
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
                  );
                })}
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
              totalPages={totalPages}
              totalItems={orders.length}
              itemsPerPage={itemsPerPage}
              onChange={handlePageChange}
            />
          </Box>
        </DialogContent>
      </Dialog>

      {/* DIALOG TRẢ ĐƠN (mở khi click "Trả đơn") */}
      <Dialog
        open={openReturn}
        onClose={handleCloseReturn}
        fullWidth
        maxWidth="sm"
        keepMounted
        fullScreen={fullScreen}
        PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
        aria-labelledby="return-order-dialog"
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 0,
          }}
        ></DialogTitle>

        <DialogContent
          sx={{
            p: 2,
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <ReturnOrderForm
            order={selectedOrder}
            orderId={String(selectedOrder?.idNumber)}
            demoImage={getFirstImage(selectedOrder?.sampleSource) ?? ""}
            onClose={handleCloseReturn}
            onSubmit={handleReturnSubmit}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersAssignTable;
