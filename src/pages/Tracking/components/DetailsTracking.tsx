import { Box, Typography, Button, Chip, Pagination } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrdersShipList } from "types/OrderTable";
import { shipListData } from "../../../data";

const DetailsTracking = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  const shipDate = state?.shipDate || "N/A";
  const trackingSample = state?.trackingSample || "N/A";
  const orderCount = state?.orderCount || 0;
  const list: OrdersShipList[] = shipListData;

  //Nếu không có dữ liệu, quay về trang trước
  if (!state) {
    navigate("/Tracking");
    return null;
  }
  return (
    <>
      {/* TIÊU ĐỀ */}
      <Typography
        sx={{
          color: "black",
          fontWeight: "bold",
          textAlign: "left",
          fontSize: 20,
          mb: 2,
        }}
      >
        TRACKING ORDER SHIP NGÀY {shipDate}
      </Typography>

      {/* THẺ BỌC CẢ BẢNG */}
      <Box
        sx={{
          width: "flex",
          backgroundColor: "white",
          padding: 3,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* THẺ BỌC TRẠNG THÁI ĐƠN HÀNG GIẢ */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <DescriptionIcon
              sx={{
                color: "black",
                width: "70px",
                height: "70px",
              }}
            />
            <Box
              sx={{
                textAlign: "left",
              }}
            >
              <Typography fontWeight={700} color="black">
                Order Ship ngày {shipDate}
              </Typography>
              <Typography fontSize={14} color="black">
                {orderCount} Order (Track VN-US: {trackingSample})
              </Typography>
            </Box>
          </Box>

          {/* NÚT DOWNLOAD FILE */}
          <Button
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            sx={{ backgroundColor: "#333", borderRadius: 2, width: "130px" }}
          >
            Download File Label
          </Button>
        </Box>

        {/* CẬP NHẬT TRẠNG THÁI */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Chip
            label="Chưa mua tracking"
            color="error"
            variant={selectedChip === "Chưa mua" ? "filled" : "outlined"}
            onClick={() => setSelectedChip("Chưa mua")}
          />
          <Chip
            label="Đã có tracking"
            color="primary"
            variant={selectedChip === "Đã có" ? "filled" : "outlined"}
            onClick={() => setSelectedChip("Đã có")}
          />
          <Chip
            label="Đã trả tracking"
            sx={{
              backgroundColor: selectedChip === "Đã trả" ? "green" : "#e0e0e0",
              color: selectedChip === "Đã trả" ? "white" : "black",
            }}
            onClick={() => setSelectedChip("Đã trả")}
          />
          {/* <Chip label="Cập nhật" variant="outlined" /> */}

          {/* NÚT LƯU CẬP NHẬT TRẠNG THÁI */}
          <Button
            sx={{
              backgroundColor: "gray",
              color: "white",
              borderRadius: "40px",
            }}
          >
            Lưu
          </Button>
        </Box>

        {/* THẺ BỌC DANH SÁCH */}
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: "black",
              textAlign: "left",
            }}
          >
            Danh sách {orderCount} order ship ngày {shipDate}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              rowGap: 0.5,
              columnGap: 7,
            }}
          >
            {list.map((order, i) => (
              <Typography key={i} fontSize={14} color="black">
                {i + 1}. SKU: {order.sku}, Order Number: {order.orderNumber}
              </Typography>
            ))}
          </Box>
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
    </>
  );
};

export default DetailsTracking;
