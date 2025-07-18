import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Avatar,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// const fakeUsers = Array.from({ length: 18 }).map((_, i) => ({ //dùng cho fake random avatar
const fakeUsers = Array.from({ length: 18 }).map((_, i) => ({
  name: "Trần Chiêm",
  email: "tranchiem@secom.com",
  phone: "12345678910JQk",
  avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 10}.jpg`, //API fake random avatar
  // avatar: "/logo.png",
}));

const tabLabels = [
  "Tất cả",
  "Admin",
  "Vẽ 2D",
  "Vẽ File Thêu",
  "Sản Xuất",
  "Đóng gói",
  "Shipping",
];

const MainUser = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-user");
  };
  return (
    <>
      {/* TIÊU ĐỀ */}
      <Typography
        sx={{
          display: "flex",
          color: "black",
          fontWeight: "bold",
          fontSize: "20px",
          mb: 2,
        }}
      >
        QUẢN LÝ USER
      </Typography>

      <Box
        sx={{
          width: "1180px",
          backgroundColor: "white",
          padding: 3,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/*TÌM KIẾM*/}
        <TextField
          type="text"
          placeholder="Tìm kiếm User"
          variant="outlined"
          sx={{
            width: "100%",
            marginBottom: 3,
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon sx={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* CÁC TAB GIẢ*/}
        <Tabs
          value={tab}
          onChange={(e, newVal) => setTab(newVal)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          {tabLabels.map((label, idx) => (
            <Tab
              key={idx}
              label={label}
              sx={{
                // textTransform: "none",
                fontWeight: "bold",
              }}
            />
          ))}
        </Tabs>

        {/*DANH SÁCH USER GIẢ*/}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "flex-start",
          }}
        >
          {fakeUsers.map((user, index) => (
            <Box
              key={index}
              sx={{
                width: "25%",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar src={user.avatar} sx={{ width: 56, height: 56 }} />
              <Box
                sx={{
                  color: "black",
                }}
              >
                <Typography fontWeight="bold">{user.name}</Typography>
                <Typography fontSize={13}>{user.email}</Typography>
                <Typography fontSize={13}>Phone: {user.phone}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography color="black" variant="body2">
            Showing 1 to 3 of 6 entries
          </Typography>
          <Pagination count={3} page={1} variant="outlined" shape="rounded" />
        </Box>
      </Box>

      {/* NÚT THÊM USER */}
      <Box mt={2}>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            display: "flex",
            backgroundColor: "black",
            borderRadius: 2,
            alignItems: "flex-start",
          }}
        >
          THÊM USER
        </Button>
      </Box>
    </>
  );
};

export default MainUser;
