import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const AddUser = () => {
  const [show, setShow] = useState(false);

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
        THÊM USER
      </Typography>

      <Box
        sx={{
          width: "1180px",
          backgroundColor: "white",
          padding: 3,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          gap: 4,
        }}
      >
        {/* TRÁI */}
        <Box sx={{ flex: 1 }}>
          {/* THẺ INPUT EMAIL ĐĂNG NHẬP */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                color: "black",
                alignItems: "flex-start",
              }}
            >
              Email đăng nhập
            </Typography>

            <TextField
              type="text"
              id="addproduct"
              variant="outlined"
              size="small"
              sx={{
                width: "400px",
                marginTop: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          </div>

          {/* THẺ INPUT MẬT KHẨU ĐĂNG NHẬP */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                color: "black",
                alignItems: "flex-start",
              }}
            >
              Mật khẩu đăng nhập
            </Typography>

            <TextField
              type={show ? "text" : "password"}
              id="addproduct"
              variant="outlined"
              size="small"
              sx={{
                width: "400px",
                marginTop: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              //ẨN HIỆN PASSWORD
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {show ? (
                      <VisibilityIcon
                        onClick={() => setShow(false)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            color: "gray",
                            transform: "scale(1.2)",
                            transition: "all 0.2s ease",
                          },
                        }}
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={() => setShow(true)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            color: "gray",
                            transform: "scale(1.2)",
                            transition: "all 0.2s ease",
                          },
                        }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Box>

        {/* PHẢI */}
        <Box sx={{ flex: 1 }}>
          {/* THẺ INPUT HỌ VÀ TÊN*/}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                color: "black",
                alignItems: "flex-start",
              }}
            >
              Họ và tên
            </Typography>

            <TextField
              type="text"
              id="addproduct"
              variant="outlined"
              size="small"
              sx={{
                width: "400px",
                marginTop: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          </div>

          {/* THẺ INPUT ĐỊA CHỈ*/}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                color: "black",
                alignItems: "flex-start",
              }}
            >
              Địa chỉ
            </Typography>

            <TextField
              type="text"
              id="addproduct"
              variant="outlined"
              size="small"
              sx={{
                width: "400px",
                marginTop: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          </div>

          {/* THẺ INPUT SDT*/}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                color: "black",
                alignItems: "flex-start",
              }}
            >
              Số điện thoại
            </Typography>

            <TextField
              type="text"
              id="addproduct"
              variant="outlined"
              size="small"
              sx={{
                width: "400px",
                marginTop: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          </div>

          {/* THẺ INPUT LINK FACEBOOK*/}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                color: "black",
                alignItems: "flex-start",
              }}
            >
              Link Facebook
            </Typography>

            <TextField
              type="text"
              id="addproduct"
              variant="outlined"
              size="small"
              sx={{
                width: "400px",
                marginTop: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          </div>

          {/* HÌNH ẢNH ĐẠI DIỆN */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                color: "black",
                alignItems: "flex-start",
              }}
            >
              Hình ảnh đại diện
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Button
                sx={{
                  color: "black",
                  backgroundColor: "gray",
                  marginTop: "30px",
                  height: "40px",
                }}
              >
                Chọn tệp
              </Button>

              <TextField
                type="img"
                id="addproduct"
                variant="outlined"
                size="small"
                sx={{
                  width: "315px",
                  marginTop: "30px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>

          {/* NÚT THÊM USER */}
          <div
            style={{
              display: "flex",
              marginTop: "30px",
            }}
          >
            <button
              // onClick={handleClick}
              style={{
                width: "200px",
                backgroundColor: "rgba(232, 67, 12, 0.88)",
              }}
            >
              Thêm User
            </button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default AddUser;
