import {
  Box,
  TextField,
  InputAdornment,
  Button,
  //   Grid,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {useNavigate} from "react-router-dom";
import OrderStatusBox from "../../../components/fulfillment/main/order-status-box";
import OrderTable from "../../../components/fulfillment/main/order-table";

const orderStatusData = [
  { label: "Mới cập nhật", count: 120, color: "#f8b500" },
  { label: "Chưa có hình", count: 55, color: "#f48fb1" },
  { label: "Đang vẽ 2D", count: 24, color: "#ce93d8" },
  { label: "Đang vẽ thêu", count: 85, color: "#90caf9" },
  { label: "Đang cắt laser", count: 43, color: "#a5d6a7" },
  { label: "Đang sản xuất", count: 57, color: "#81c784" },
  { label: "Đang đóng gói", count: 94, color: "#aed581" },
];

const MainFulfillment = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-order");
  };
  return (
    <>
      {/* <Grid container spacing={2} sx={{ mb: 3 }}>
        {orderStatusData.map((item, index) => (
          <Grid item key={index}>
            <OrderStatusBox {...item} />
          </Grid>
        ))}
      </Grid> */}

      {/* BOX TRẠNG THÁI SỐ LƯỢNG ĐƠN HÀNG */}
      <Box
        sx={{
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
          width: "96%",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: 3,
          display: "flex",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {orderStatusData.map((item, index) => (
            <OrderStatusBox key={index} {...item} />
          ))}
        </Box>
      </Box>

      {/* BOX TÌM KIẾM */}
      <Box
        sx={{
          backgroundColor: "white",
          padding: 2,
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          type="text"
          placeholder="Tìm Order: SKU fulfill, Order ID, Tên khách hàng..."
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon sx={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* BOX THÔNG TIN ĐƠN HÀNG */}
      <OrderTable />
      <div
        style={{
          display: "flex",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={handleClick}
          sx={{
            color: "white",
            backgroundColor: "red",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          Thêm đơn hàng
        </Button>
      </div>
    </>
  );
};

export default MainFulfillment;
