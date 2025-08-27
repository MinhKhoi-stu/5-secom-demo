import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";

interface RecieveOrderModalProps {
  open: boolean;
  order: { orderId: string; demoImage: string } | null;
  onClose: () => void;
  onSubmit: (data: { status: string; image?: File }) => void;
}

const RecieveOrderForm = ({
  open,
  order,
  onClose,
  onSubmit,
}: RecieveOrderModalProps) => {
  const [fileName, setFileName] = useState("hinhanh.png");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!order) return;
    onSubmit({
      status: value,
      image: undefined,
    });
  };

  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} sx={{ width: "flex" }}>
      <DialogTitle fontWeight="bold">Xác nhận nhận đơn hàng</DialogTitle>
      <DialogContent dividers>
        {/* --- PHẦN HIỂN THỊ NỘI DUNG --- */}
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography
            color="black"
            variant="h6"
            fontWeight={"bold"}
            gutterBottom
          >
            ĐƠN HÀNG CẦN VẼ 2D - {order.orderId}
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              mb: 2,
              mt: 2,
            }}
          >
            {/* THÔNG TIN YÊU CẦU */}
            <Box>
              <Typography color="black" fontWeight="bold">
                Thông tin yêu cầu
              </Typography>
              <Card
                variant="outlined"
                sx={{ borderRadius: "10px", height: "20vh" }}
              >
                <CardContent>
                  <Typography color="text.secondary">
                    Chưa có thông tin yêu cầu.
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* HÌNH ẢNH KHÁCH GỬI */}
            <Box>
              <Typography color="black" fontWeight="bold">
                Hình ảnh khách gửi
              </Typography>
              <Card variant="outlined" sx={{ borderRadius: "10px" }}>
                <CardContent>
                  <Box width={250}>
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
                        src={order.demoImage}
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

          {/* FORM TRẠNG THÁI */}
          <Box
            mt={1}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={onClose}>Hủy</Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "red" }}
              onClick={handleSubmit}
            >
              Nhận đơn
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RecieveOrderForm;
