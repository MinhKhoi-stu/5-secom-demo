import { Box, Typography } from "@mui/material";

const AdminDashboard = () => {
  return (
    <div>
      {/* ĐƠN HÀNG MỚI CẬP NHẬT */}
      <Box
        sx={{
          width: "1180px",
          height: "50vh",
          backgroundColor: "white",
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          // marginTop: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "black",
          }}
        >
          Đơn hàng mới cập nhật
        </Typography>
        <Typography
          sx={{
            color: "black",
          }}
        >
          Đây là nội dung của trang admin. Có thể thêm bảng, biểu đồ, v.v.
        </Typography>
      </Box>

      {/* NGÀY SHIP HÀNG MỚI + TRACKING MỚI */}
      <div
        style={{
          flex: 1,
          display: "flex",
        }}
      >
        {/* NGÀY SHIP HÀNG GẦN NHẤT */}
        <Box
          sx={{
            width: "550px",
            height: "20vh",
            backgroundColor: "rgba(73, 204, 206, 0.92)",
            padding: 3,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            marginTop: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "black",
            }}
          >
            Ngày ship hàng gần nhất
          </Typography>
          <Typography
            sx={{
              color: "black",
            }}
          >
            Đây là nội dung
          </Typography>
        </Box>

        {/* CẬP NHẬT TRACKING MỚI NHẤT */}
        <Box
          sx={{
            width: "550px",
            height: "20vh",
            backgroundColor: "white",
            padding: 3,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            marginTop: 2,
            marginLeft: "30px",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "black",
            }}
          >
            Cập nhật tracking mới nhất
          </Typography>
          <Typography
            sx={{
              color: "black",
            }}
          >
            Đây là nội dung
          </Typography>
        </Box>
      </div>

      {/* (TỔNG DOANH THU + TỔNG ĐƠN HÀNG) + TOP VẼ FILE THÊU*/}
      <div
        style={{
          flex: 1,
          display: "flex",
        }}
      >
        <div>
          {/* TỔNG DOANH THU */}
          <Box
            sx={{
              width: "550px",
              height: "20vh",
              backgroundColor: "rgba(73, 204, 206, 0.92)",
              padding: 3,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              marginTop: 2,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "black",
              }}
            >
              Tổng doanh thu
            </Typography>
            <Typography
              sx={{
                color: "black",
              }}
            >
              Đây là nội dung
            </Typography>
          </Box>

          {/* TỔNG ĐƠN HÀNG */}
          <Box
            sx={{
              width: "550px",
              height: "71vh",
              backgroundColor: "rgba(73, 204, 206, 0.92)",
              padding: 3,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              marginTop: 2,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "black",
              }}
            >
              Tổng đơn hàng
            </Typography>
            <Typography
              sx={{
                color: "black",
              }}
            >
              Đây là nội dung
            </Typography>
          </Box>
        </div>

        {/*TOP VẼ FILE THÊU*/}
        <Box
          sx={{
            width: "550px",
            height: "100vh",
            backgroundColor: "white",
            padding: 3,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            marginTop: 2,
            marginLeft: "30px",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{
              color: "black",
            }}
          >
            Top vẽ file thêu
          </Typography>
          <Typography
            sx={{
              color: "black",
            }}
          >
            Đây là nội dung
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default AdminDashboard;
