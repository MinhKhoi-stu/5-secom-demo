import {
  Box,
  Typography,
  Avatar,
  TableBody,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Paper,
  TableHead,
  Chip,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Link,
} from "@mui/material";
import { useState } from "react";
import PaginationWrapper from "../../components/common/PaginationWrapper";
import type { TopFile, TotalOrders } from "../../types/OrderTable";
import { CountOrders, TopUserDesignData } from "../../data";

const AdminDashboard = () => {
  // Fake data kết nối với BE sau này
  const revenue = "$3,201,350";
  const orders2 = [
    { name: "CustomPatchesTX", count: 86 },
    { name: "TexasGiftsbyThi", count: 55 },
    { name: "HomeGiftsTX", count: 50 },
    { name: "5SECOM", count: 50 },
    { name: "EcomplusTX", count: 40 },
  ];
  const orders = [
    {
      sku: "E7212",
      orderId: "3692333075",
      shop: "CustomPatchesTX",
      date: "20/5/2025",
      customer: "Jennifer Vargas",
      product: "Patches thêu",
      type: "3 inches",
      quantity: 2,
      status: "Đợi khách gửi hình",
    },
    {
      sku: "E7213",
      orderId: "3636855560",
      shop: "CustomPatchesTX",
      date: "20/5/2025",
      customer: "Jennifer Vargas",
      product: "Patches thêu",
      type: "3 inches",
      quantity: 2,
      status: "Đợi khách gửi hình",
    },
    {
      sku: "E7214",
      orderId: "3683805200",
      shop: "CustomPatchesTX",
      date: "20/5/2025",
      customer: "Jennifer Vargas",
      product: "Patches thêu",
      type: "3 inches",
      quantity: 2,
      status: "Đang đợi khách duyệt 2D",
    },
    {
      sku: "E7216",
      orderId: "3684236956",
      shop: "CustomPatchesTX",
      date: "20/5/2025",
      customer: "Jennifer Vargas",
      product: "Patches thêu",
      type: "3 inches",
      quantity: 2,
      status: "Đang vẽ file thêu",
    },
    {
      sku: "E7218",
      orderId: "3684321262",
      shop: "CustomPatchesTX",
      date: "20/5/2025",
      customer: "Jennifer Vargas",
      product: "Patches thêu",
      type: "3 inches",
      quantity: 2,
      status: "Đang vẽ file thêu",
    },
    {
      sku: "EB162",
      orderId: "3684479986",
      shop: "CustomPatchesTX",
      date: "20/5/2025",
      customer: "Jennifer Vargas",
      product: "Patches thêu",
      type: "3 inches",
      quantity: 2,
      status: "Cần cắt laser",
    },
    {
      sku: "EB153",
      orderId: "3683950859",
      shop: "CustomPatchesTX",
      date: "20/5/2025",
      customer: "Jennifer Vargas",
      product: "Patches thêu",
      type: "3 inches",
      quantity: 2,
      status: "Đang sản xuất thêu",
    },
    {
      sku: "AMZ503",
      orderId: "3684588370",
      shop: "CustomPatchesTX",
      date: "20/5/2025",
      customer: "Jennifer Vargas",
      product: "Patches thêu",
      type: "3 inches",
      quantity: 2,
      status: "Đã đóng gói",
    },
    {
      sku: "AMZ504",
      orderId: "3693659045",
      shop: "CustomPatchesTX",
      date: "20/5/2025",
      customer: "Jennifer Vargas",
      product: "Patches thêu",
      type: "3 inches",
      quantity: 2,
      status: "Đã ship ngày 22/05/2025",
    },
    {
      sku: "AMZ505",
      orderId: "3685099534",
      shop: "CustomPatchesTX",
      date: "20/5/2025",
      customer: "Jennifer Vargas",
      product: "Patches thêu",
      type: "3 inches",
      quantity: 2,
      status: "Đã có hình",
      // isError: true,
    },
  ];

  const getStatusColor = (status: string | string[]) => {
    if (status.includes("Đợi") || status.includes("Đang")) return "grey";
    if (status.includes("cần") || status.includes("Cần")) return "orange";
    if (status.includes("Đã")) return "green";
    return "grey";
  };

  const files: TopFile[] = TopUserDesignData;
  const counts: TotalOrders[] = CountOrders;

  const [valueDay, setValueDay] = useState("");
  const [valueBill, setValueBill] = useState("");

  //PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

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

  const [value, setValue] = useState("30");
  return (
    <div>
      {/* ĐƠN HÀNG MỚI CẬP NHẬT */}
      <Box
        sx={{
          width: "1180px",
          backgroundColor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
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
              {orders.map((order, idx) => (
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
          {/* Pagination */}
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 2,
            }}
          >
            <Typography color="black" variant="body2">
              Showing 1 to 3 of 6 entries
            </Typography>
            <Pagination count={3} page={1} variant="outlined" shape="rounded" />
          </Box> */}
          <PaginationWrapper
            page={page}
            totalPages={Math.ceil(orders.length / itemsPerPage)}
            totalItems={orders.length}
            itemsPerPage={itemsPerPage}
            onChange={handlePageChange}
          />
        </TableContainer>
      </Box>

      {/* NGÀY SHIP VÀ TRACKING */}
      <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
        {/* <Box
          sx={{
            width: "100%",
            backgroundColor: "#c5f5f6",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom color="black">
            Ngày ship hàng gần nhất
          </Typography>
          <Typography color="black">23/05/2025 - 350 đơn hàng</Typography>
        </Box> */}

        <Box
          sx={{
            width: "100%",
            backgroundColor: "#c5f5f6",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Bên trái - thông tin */}
          <Box>
            <Typography variant="h6" fontWeight="bold" color="black">
              Ngày ship hàng gần nhất
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="black"
              sx={{ mt: 1 }}
            >
              23/05/2025
            </Typography>
            <Typography color="black">
              350 đơn hàng.{" "}
              <Link
                href="https://dientoan.vn/"
                underline="hover"
                fontWeight={500}
              >
                Xem file Label
              </Link>
            </Typography>
          </Box>

          {/*PHẢI */}
          <Box>
            <img
              src="/img/demo/truckkun.png"
              alt="truck"
              style={{ width: 150, height: "auto", opacity: 0.8 }}
            />
          </Box>
        </Box>

        {/* TRACKING */}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#c5f5f6",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Bên trái - thông tin */}
          <Box>
            <Typography variant="h6" fontWeight="bold" color="black">
              Cập nhật tracking mới nhất
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="black"
              sx={{ mt: 1 }}
            >
              19/05/2025
            </Typography>
            <Typography color="black">
              250 đơn hàng.{" "}
              <Link
                href="https://dientoan.vn/"
                underline="hover"
                fontWeight={500}
              >
                Xem file Tracking
              </Link>
            </Typography>
          </Box>

          {/*PHẢI */}
          <Box>
            <img
              src="/img/demo/tracking.png"
              alt="tracking"
              style={{ width: 150, height: "auto", opacity: 0.8 }}
            />
          </Box>
        </Box>
      </Box>

      {/* TỔNG DOANH THU, TỔNG ĐƠN HÀNG, TOP VẼ */}
      <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              backgroundColor: "#c5f5f6",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                color="black"
              >
                Tổng doanh thu
              </Typography>
              <FormControl
                size="small"
                sx={{
                  marginLeft: "90px",
                  width: "270px",
                }}
              >
                <InputLabel id="combo-label">Chọn</InputLabel>
                <Select
                  labelId="total-label"
                  value={valueDay}
                  label="Loại sản phẩm"
                  onChange={(e) => setValueDay(e.target.value)}
                >
                  <MenuItem value="shirt">7 ngày gần nhất</MenuItem>
                  <MenuItem value="patch">30 ngày gần nhất</MenuItem>
                  <MenuItem value="mug">90 ngày gần nhất</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography
              marginTop={5}
              color="black"
              fontSize={29}
              fontWeight="bold"
            >
              {revenue}
            </Typography>
          </Box>

          {/* TỔNG ĐƠN HÀNG */}
          {/* <Box
            sx={{
              backgroundColor: "#c5f5f6",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              mt: 3,
            }}
          >
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                color="black"
              >
                Tổng đơn hàng
              </Typography>

              <FormControl
                size="small"
                sx={{
                  marginLeft: "90px",
                  width: "270px",
                }}
              >
                <InputLabel id="combo-label">Chọn</InputLabel>
                <Select
                  labelId="totalbill-label"
                  value={valueBill}
                  label="Loại sản phẩm"
                  onChange={(e) => setValueBill(e.target.value)}
                >
                  <MenuItem value="shirt">7 ngày gần nhất</MenuItem>
                  <MenuItem value="patch">30 ngày gần nhất</MenuItem>
                  <MenuItem value="mug">90 ngày gần nhất</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {orders2.map((o, i) => (
              <Typography marginTop={5} key={i} color="black">
                {o.name}: {o.count} Orders
              </Typography>
            ))}
          </Box> */}

          {/* TỔNG ĐƠN HÀNG */}
          <Box
            sx={{
              backgroundColor: "#c5f5f6",
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              mt: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                color="black"
              >
                Tổng đơn hàng
              </Typography>

              <FormControl
                size="small"
                sx={{
                  marginLeft: "auto",
                  width: "270px",
                }}
              >
                <InputLabel id="combo-label">Chọn</InputLabel>
                <Select
                  labelId="combo-label"
                  value={valueBill}
                  label="Loại sản phẩm"
                  onChange={(e) => setValueBill(e.target.value)}
                >
                  <MenuItem value="7days">7 ngày gần nhất</MenuItem>
                  <MenuItem value="30days">30 ngày gần nhất</MenuItem>
                  <MenuItem value="90days">90 ngày gần nhất</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Hiển thị danh sách đơn hàng từ backend hoặc mock data */}
            {/* {counts.map((item) => (
              <Typography marginTop={2} key={item.id} color="black">
                {item.name}: {item.count} Orders
              </Typography>
            ))} */}

            {counts.map((item) => (
              <Box
                key={item.id}
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                {/* TRÁI */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar src={item.img} alt={item.name} />
                  <Box>
                    <Typography fontWeight="600" color="black">
                      {item.name}
                    </Typography>
                  </Box>
                </Box>

                {/* PHẢI */}
                <Typography fontWeight="bold" color="black">
                  {item.count} Orders
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* TOP FILE THÊU */}
        {/* <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              color="black"
            >
              Top vẽ file thêu
            </Typography>
            <FormControl
              size="small"
              sx={{
                marginLeft: "90px",
                width: "270px",
              }}
            >
              <InputLabel id="combo-label">Chọn</InputLabel>
              <Select
                labelId="totalbill-label"
                value={valueBill}
                label="Loại sản phẩm"
                onChange={(e) => setValueBill(e.target.value)}
              >
                <MenuItem value="shirt">7 ngày gần nhất</MenuItem>
                <MenuItem value="patch">30 ngày gần nhất</MenuItem>
                <MenuItem value="mug">90 ngày gần nhất</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {topUsers.map((user, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                my: 3,
              }}
            >
              <Avatar>{user.name[0]}</Avatar>
              <Box>
                <Typography color="black">{user.name}</Typography>
                <Typography variant="body2" color="gray">
                  {user.email} - {user.files} Files
                </Typography>
              </Box>
            </Box>
          ))}
        </Box> */}

        <Box
          sx={{
            width: "100%",
            backgroundColor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="black">
              Top vẽ file thêu
            </Typography>
            <FormControl size="small" sx={{ width: 170 }}>
              <InputLabel id="filter-label">Lọc</InputLabel>
              <Select
                labelId="filter-label"
                value={value}
                label="Lọc"
                onChange={(e) => setValue(e.target.value)}
              >
                <MenuItem value="7">7 ngày gần nhất</MenuItem>
                <MenuItem value="30">30 ngày gần nhất</MenuItem>
                <MenuItem value="90">90 ngày gần nhất</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* DANH SÁCH USER */}
          {files.map((user) => (
            <Box
              key={user.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              {/* TRÁI */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src={user.img} alt={user.name} />
                <Box>
                  <Typography fontWeight="600" color="black">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="gray">
                    {user.email}
                  </Typography>
                </Box>
              </Box>

              {/* PHẢI */}
              <Typography fontWeight="bold" color="black">
                {user.files} Files
              </Typography>
            </Box>
          ))}
          {/* PAGINATION */}
          {/* <PaginationWrapper
            page={page}
            totalPages={Math.ceil(orders.length / itemsPerPage)}
            totalItems={orders.length}
            itemsPerPage={itemsPerPage}
            onChange={handlePageChange}
          /> */}
        </Box>
      </Box>
    </div>
  );
};

export default AdminDashboard;
