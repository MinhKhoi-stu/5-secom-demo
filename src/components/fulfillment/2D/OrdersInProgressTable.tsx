// TABLE TRẢ HÀNG 2D
import {
  Box,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { Order } from "../../../types/OrderTable";
import { useNavigate } from "react-router-dom";

interface Props {
  orders: Order[];
}

const OrdersInProgressTable = ({ orders }: Props) => {
  const navigate = useNavigate();

  // const handleReturnOrder = (orderId: string) => {
  const handleReturnOrder = () => {
    navigate(`/Update2D`);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
        }}
      >
        <Typography color="black" variant="h6" fontWeight="bold" mb={2}>
          ĐƠN HÀNG ĐANG NHẬN VẼ 2D
        </Typography>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Hình Demo</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.sku}</TableCell>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <img
                      src={order.demoImage}
                      alt="demo"
                      style={{ width: 40, height: 40, borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>Đang vẽ 2D</TableCell>
                  <TableCell>
                    {/* <Button onClick={() => handleReturnOrder(order.id)}> */}
                    <Button onClick={() => handleReturnOrder()}>
                      Trả đơn hàng
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <Box
            sx={{
              color: "black",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 2,
            }}
          >
            <Typography variant="body2">Showing 1 to 3 of 6 entries</Typography>
            <Pagination count={3} page={1} variant="outlined" shape="rounded" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OrdersInProgressTable;
