import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import UploadImage from "components/common/UploadImage";
import { useRef, useState } from "react";

interface UpdateOrderFormProps {
  orderId: string;
  demoImage: string;
}

export const ReturnOrderForm = ({
  orderId,
  demoImage,
}: UpdateOrderFormProps) => {
  const [fileName, setFileName] = useState("hinhanh.png");
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
  };
  const [value, setValue] = useState("");
  const handleImageUpload = (file: File) => {
    console.log("Ảnh đã chọn:", file);
  };

  return (
    <>
      {/* TIÊu ĐỀ */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "left",
        }}
      >
        <Typography color="black" variant="h6" fontWeight={"bold"} gutterBottom>
          ĐƠN HÀNG CẦN VẼ 2D - {orderId}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "flex",
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          p: 2,
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        {/* THẺ BỌC THÔNG TIN + HÌNH ẢNH KHÁCH GỬI */}
        <Box
          sx={{
            width: "500px",
            display: "flex",
            flexDirection: "row",
            textAlign: "left",
            gap: "10px",
          }}
        >
          {/* CỘT THÔNG TIN YÊU CẦU */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <Typography color="black" fontWeight="bold">
              Thông tin yêu cầu
            </Typography>

            <Card variant="outlined" sx={{ flex: 1, borderRadius: "10px" }}>
              <CardContent>
                <Typography color="text.secondary">
                  {/* Tạm thời hiển thị trống hoặc default text */}
                  Chưa có thông tin yêu cầu.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* CỘT HÌNH ẢNH KHÁCH GỬI */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <Typography color="black" fontWeight="bold">
              Hình ảnh khách gửi
            </Typography>

            <Card variant="outlined" sx={{ width: "flex" , 
              borderRadius: "10px" }}>
              <CardContent>
                <Box width={250} display="flex" gap={1} flexWrap="wrap">
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 2,
                      overflow: "hidden",
                      border: "1px solid #ccc",
                    }}
                  >
                    <img
                      src={demoImage}
                      alt="Demo"
                      width={100}
                      height={100}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}>
          <Typography
            sx={{ marginTop: "10px", color: "black" }}
            fontWeight="bold"
          >
            Trạng thái đơn hàng
          </Typography>
          <Card
            variant="outlined"
            sx={{
              width: "flex",
              // flex: 1,
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <Box mt={2} display="flex" flexDirection="column" gap={2}>
                {/* Nhóm chọn file */}
                <UploadImage onFileSelect={handleImageUpload} />

                {/* Nhóm trạng thái */}
                <FormControl size="small" sx={{ width: "467px" }}>
                  <InputLabel id="combo-label">Trạng thái</InputLabel>
                  <Select
                    labelId="combo-label"
                    value={value}
                    label="Loại sản phẩm"
                    onChange={(e) => setValue(e.target.value)}
                  >
                    <MenuItem value="drawing">Vẽ thêu</MenuItem>
                    <MenuItem value="cutting">Cắt laser</MenuItem>
                    <MenuItem value="produce">Sản xuất</MenuItem>
                    <MenuItem value="package">Đóng gói</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box mt={3}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "red",
                  }}
                >
                  Cập nhật trạng thái đơn hàng
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};
