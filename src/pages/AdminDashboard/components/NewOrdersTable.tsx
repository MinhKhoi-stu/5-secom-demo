import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PaginationWrapper from "components/common/PaginationWrapper";

import { useState } from "react";
import { newOrders } from "types/OrderTable";
import { useDashboardData } from "../hook/useDashBoardData";

interface Props {
  news: newOrders[];
}

export const NewOrdersTable = ({ news }: Props) => {
  const { getStatusColor } = useDashboardData();

  //PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const paginated = news.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
       // ĐƠN HÀNG MỚI CẬP NHẬT 
    <Box
      sx={{
        width: "1180px",
        backgroundColor: "white",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "left"
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
        Đơn hàng mới cập nhật
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow
              sx={{
                "& th": { fontWeight: "bold" },
              }}
            >
              <TableCell>SKU</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Shop</TableCell>
              <TableCell>Ngày</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {news.map((order, idx) => (
              <TableRow key={idx}>
                <TableCell
                // sx={{ color: order.isError ? "red" : "inherit" }}
                >
                  {order.sku}
                </TableCell>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.shop}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.type}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(order.status),
                      color: "white",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        <PaginationWrapper
          page={page}
          totalPages={Math.ceil(news.length / itemsPerPage)}
          totalItems={news.length}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
        />
      </TableContainer>
    </Box>
  );
};
