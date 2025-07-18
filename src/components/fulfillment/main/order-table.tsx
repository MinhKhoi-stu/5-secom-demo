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
  Pagination,
} from "@mui/material";

const orderData = [
  {
    sku: "E7214",
    orderId: "36239330075",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đợi khách gửi hình",
  },
  {
    sku: "AMZ505",
    orderId: "36804885320",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 3,
    status: "Đã đóng gói",
  },
  {
    sku: "E7214",
    orderId: "36239330075",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đợi khách gửi hình",
  },
  {
    sku: "AMZ505",
    orderId: "36804885320",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 3,
    status: "Đã đóng gói",
  },
  {
    sku: "E7214",
    orderId: "36239330075",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đợi khách gửi hình",
  },
  {
    sku: "AMZ505",
    orderId: "36804885320",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 3,
    status: "Đã đóng gói",
  },
  {
    sku: "E7214",
    orderId: "36239330075",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đợi khách gửi hình",
  },
  {
    sku: "AMZ505",
    orderId: "36804885320",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 3,
    status: "Đã đóng gói",
  },
  {
    sku: "E7214",
    orderId: "36239330075",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 2,
    status: "Đợi khách gửi hình",
  },
  {
    sku: "AMZ505",
    orderId: "36804885320",
    shop: "CustomPatchesTX",
    date: "20/5/2025",
    customer: "Jennifer Vargas",
    product: "Patches thêu",
    type: "3 inches",
    quantity: 3,
    status: "Đã đóng gói",
  },
];

const OrderTable = () => {
  return (
    <Box
      sx={{
        width: "96%",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography color="black" variant="h6" fontWeight="bold" gutterBottom>
        Thông tin đơn hàng
      </Typography>

      <TableContainer component={Paper} elevation={0}>
        <Table>
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
            {orderData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{row.orderId}</TableCell>
                <TableCell>{row.shop}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={
                      row.status === "Đã đóng gói"
                        ? "success"
                        : row.status.includes("Đợi")
                        ? "warning"
                        : "default"
                    }
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <Box
        sx={{
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 2,
        }}
      >
        <Typography variant="body2">Showing 1 to 3 of 6 entries</Typography>
        <Pagination count={3} page={1} variant="outlined" shape="rounded" />
      </Box>
    </Box>
  );
};

export default OrderTable;
