// import {
//   Box,
//   Chip,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import PaginationWrapper from "components/common/PaginationWrapper";

// import { useState } from "react";
// import { newOrders } from "types/OrderTable";
// import { useDashboardData } from "../hook/useDashBoardData";

// interface Props {
//   news: newOrders[];
// }

// export const NewOrdersTable = ({ news }: Props) => {
//   const { getStatusColor } = useDashboardData();

//   // PAGINATION
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 3;

//   const handlePageChange = (
//     event: React.ChangeEvent<unknown>,
//     value: number
//   ) => {
//     setPage(value);
//   };

//   const paginated = news.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   return (
//     // ĐƠN HÀNG MỚI CẬP NHẬT
//     <Box
//       sx={{
//         width: "100%",
//         maxWidth: "1180px",
//         backgroundColor: "white",
//         p: { xs: 2, md: 3 },
//         borderRadius: 2,
//         boxShadow: 3,
//         textAlign: "left",
//         overflowX: "auto", // cho phép cuộn ngang trên mobile
//       }}
//     >
//       <Typography
//         variant="h6"
//         fontWeight="bold"
//         gutterBottom
//         color="black"
//         sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
//       >
//         Đơn hàng mới cập nhật
//       </Typography>

//       <TableContainer component={Paper} sx={{ minWidth: 650 }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow
//               sx={{
//                 "& th": { fontWeight: "bold", whiteSpace: "nowrap" },
//               }}
//             >
//               <TableCell>SKU</TableCell>
//               <TableCell>Order ID</TableCell>
//               <TableCell>Shop</TableCell>
//               <TableCell>Ngày</TableCell>
//               <TableCell>Khách hàng</TableCell>
//               <TableCell>Sản phẩm</TableCell>
//               <TableCell>Loại</TableCell>
//               <TableCell>Số lượng</TableCell>
//               <TableCell>Trạng thái</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {paginated.map((order, idx) => (
//               <TableRow key={idx}>
//                 <TableCell>{order.sku}</TableCell>
//                 <TableCell>{order.orderId}</TableCell>
//                 <TableCell>{order.shop}</TableCell>
//                 <TableCell>{order.date}</TableCell>
//                 <TableCell>{order.customer}</TableCell>
//                 <TableCell>{order.product}</TableCell>
//                 <TableCell>{order.type}</TableCell>
//                 <TableCell>{order.quantity}</TableCell>
//                 <TableCell>
//                   <Chip
//                     label={order.status}
//                     size="small"
//                     sx={{
//                       backgroundColor: getStatusColor(order.status),
//                       color: "white",
//                     }}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* PAGINATION */}
//         <PaginationWrapper
//           page={page}
//           totalPages={Math.ceil(news.length / itemsPerPage)}
//           totalItems={news.length}
//           itemsPerPage={itemsPerPage}
//           onChange={handlePageChange}
//         />
//       </TableContainer>
//     </Box>
//   );
// };

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import PaginationWrapper from "components/common/PaginationWrapper";
import { useFindAllFacility } from "hooks/facility/useFindAllFacility";
import { FacilityDto } from "dto/facility/facility.dto";
import UpdateOrder from "pages/Fulfillment/component/UpdateOrder/UpdateOrder";

const NewOrdersTable = () => {
  const [selectedFacility, setSelectedFacility] = useState<FacilityDto | null>(
    null
  );
  const [openUpdate, setOpenUpdate] = useState(false);

  // pagination (server-side)
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setPage(1);
  }, []);

  const { data, isLoading, isError, refetch } = useFindAllFacility({
    page: page - 1,
    size: itemsPerPage,
    sort: "createdDate,desc",
  });

  const facilities: FacilityDto[] = data?.content ?? [];
  const totalItems = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRowClick = (facility: FacilityDto) => {
    setSelectedFacility(facility);
    setOpenUpdate(true);
  };

  if (isLoading) return <Typography>Đang tải dữ liệu...</Typography>;
  if (isError) return <Typography>Lỗi khi tải dữ liệu</Typography>;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1180px",
        backgroundColor: "white",
        p: { xs: 2, md: 3 },
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "left",
        overflowX: "auto",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        gutterBottom
        color="black"
        sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
      >
        Đơn hàng mới cập nhật
      </Typography>

      <TableContainer component={Paper} sx={{ minWidth: 650 }}>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{ "& th": { fontWeight: "bold", whiteSpace: "nowrap" } }}
            >
              <TableCell>Ngày tạo</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Shop</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {facilities.map((facility: FacilityDto) => (
              <TableRow
                key={facility.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => handleRowClick(facility)}
              >
                <TableCell>
                  {facility.createdDate
                    ? new Date(facility.createdDate).toLocaleDateString("vi-VN")
                    : "-"}
                </TableCell>
                <TableCell>{facility.skuOpt?.name || "-"}</TableCell>
                <TableCell>{facility.labelingStandard || "-"}</TableCell>
                <TableCell>{facility.idNumber || "-"}</TableCell>
                <TableCell>{facility.name || "-"}</TableCell>
                <TableCell>{facility.labelingStandard || "-"}</TableCell>
                <TableCell>{facility.area ?? "-"}</TableCell>
                <TableCell>
                  {/* Trạng thái lấy trực tiếp từ option facility-type */}
                  {facility.facilityType?.name || "-"}
                </TableCell>
              </TableRow>
            ))}

            {facilities.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <PaginationWrapper
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
        />
      </TableContainer>

      <Dialog
        open={openUpdate}
        onClose={() => {
          setOpenUpdate(false);
          setSelectedFacility(null);
        }}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent
          sx={{
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {selectedFacility && (
            <UpdateOrder
              facility={selectedFacility}
              onClose={() => {
                setOpenUpdate(false);
                setSelectedFacility(null);
                refetch();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NewOrdersTable;
