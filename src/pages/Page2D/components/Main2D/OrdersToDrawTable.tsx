import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import PaginationWrapper from "components/common/PaginationWrapper";
import { useState } from "react";
import {Order} from "types/OrderTable";

interface Props {
  orders: Order[];
  onAccept: (order: Order) => void;
}

const OrdersToDrawTable = ({ orders, onAccept }: Props) => {
  //PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

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
        mt: 2,
      }}
    >
      <Typography color="black" variant="h6" fontWeight="bold" gutterBottom>
        Danh sách đơn cần vẽ 2D
      </Typography>

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
            {paginatedOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.sku}</TableCell>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <img
                    src={order.demoImage}
                    alt="demo"
                    style={{ width: 40, height: 40, borderRadius: "8px" }}
                  />
                </TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.type}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => onAccept(order)}
                  >
                    Nhận đơn
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Không có đơn hàng nào cần xử lý
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* Pagination */}
        <PaginationWrapper
          page={page}
          totalPages={Math.ceil(orders.length / itemsPerPage)}
          totalItems={orders.length}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
        />
      </TableContainer>
    </Box>
  );
};

export default OrdersToDrawTable;
