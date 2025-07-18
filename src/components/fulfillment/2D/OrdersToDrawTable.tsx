//TABLE NHẬN HÀNG 2D
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

interface Props {
  orders: Order[];
  onAccept: (order: Order) => void;
}

const OrdersToDrawTable = ({ orders, onAccept }: Props) => {
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
          ĐƠN HÀNG CẦN VẼ 2D
        </Typography>

        <Box
          sx={{
            backgroundColor: "white",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          }}
          mb={4}
        >
          <Table size="small">
            <TableHead>
              <TableRow
                sx={{
                  color: "black",
                }}
              >
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
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => onAccept(order)}
                    >
                      Nhận đơn hàng
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
              margin: 2
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

export default OrdersToDrawTable;
