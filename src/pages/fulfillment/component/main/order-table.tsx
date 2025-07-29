import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { useState } from "react";
import {themeStyles} from "themes/styles";
import PaginationWrapper from "components/common/PaginationWrapper";
import {Order} from "types/OrderTable";
import {mockOrders} from "../../../../data";

const OrderTable = () => {
  const orders: Order[] = mockOrders;
  //PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedOrders = orders.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return (
    <Box
      sx={{
        width: "96%",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        textAlign: "left",
      }}
    >
      <Typography color="black" variant="h6" fontWeight="bold" gutterBottom>
        Thông tin đơn hàng
      </Typography>

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
              <TableCell>SKU</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Ngày</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{row.orderId}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.customer || "—"}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    // color={
                    //   row.status.includes("Đã")
                    //     ? "success"
                    //     : row.status.includes("Đợi")
                    //     ? "warning"
                    //     : "default"
                    // }
                    sx={{
                      backgroundColor: row.status.includes("Đã")
                        ? themeStyles.success
                        : row.status.includes("Đợi")
                        ? themeStyles.warning
                        : themeStyles.successDark,
                        // : themeStyles.grey400,
                      color: "#fff", 
                      fontWeight: "bold",
                    }}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <PaginationWrapper
        page={page}
        totalPages={Math.ceil(orders.length / itemsPerPage)}
        totalItems={orders.length}
        itemsPerPage={itemsPerPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default OrderTable;
