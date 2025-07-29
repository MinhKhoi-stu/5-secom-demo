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
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Order} from "types/OrderTable";
import PaginationWrapper from "components/common/PaginationWrapper";

interface Props {
  orders: Order[];
}

const OrdersInProgressTable = ({ orders }: Props) => {
  const navigate = useNavigate();

  const handleReturnOrder = (order: Order) => {
    // navigate(`/2D/update/${order.id}`, { state: { order } });
    navigate("update-2d");
  };

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
        mt: 4,
        textAlign: "left",
      }}
    >
      <Typography color="black" variant="h6" fontWeight="bold" gutterBottom>
        Đơn hàng đang xử lý (Vẽ 2D)
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
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    // onClick={() => handleReturnOrder(order)}
                    onClick={() => navigate("update-2d", { state: { order } })}
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

export default OrdersInProgressTable;
