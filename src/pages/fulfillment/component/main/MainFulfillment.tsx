import {
  Box,
  TextField,
  InputAdornment,
  Button,
  //   Grid,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import {useNavigate} from "react-router-dom";

import {orderStatus} from "types/OrderTable";
import {orderStatusData} from "../../../../data";
import OrderStatusBox from "./order-status-box";
import OrderTable from "./order-table";

const status: orderStatus[] = orderStatusData;

const MainFulfillment = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("add-order");
  };
  return (
    <>

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
          {status.map((item, index) => (
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
