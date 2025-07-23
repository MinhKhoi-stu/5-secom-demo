import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import UploadImage from "components/common/UploadImage";

const AddUser = () => {
  const [show, setShow] = useState(false);
  const [fileName, setFileName] = useState("hinhanh.png"); // ban đầu
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    inputRef.current?.click(); // trigger input ẩn
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name); // lưu tên file để hiển thị
      // Sau này upload file 
    }
  }

  const handleImageUpload = (file: File) => {
    console.log("Ảnh đã chọn:", file);
    // Bạn có thể upload lên server tại đây hoặc preview
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
              sx={{ display: "flex", color: "black", alignItems: "flex-start" }}
            >
              Hình ảnh đại diện
            </Typography>

            <UploadImage onFileSelect={handleImageUpload}/>
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
                // backgroundColor: "rgba(232, 67, 12, 0.88)",
                backgroundColor: "red"
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
