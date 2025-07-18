import { Box, Typography, Button, Chip, Pagination } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DescriptionIcon from "@mui/icons-material/Description";
import { useState } from "react";

const DetailsTracking = () => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

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
        TRACKING ORDER SHIP NGÀY []
      </Typography>

      {/* THẺ BỌC CẢ BẢNG */}
      <Box
        sx={{
          width: "1180px",
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
                Order Ship ngày []
              </Typography>
              <Typography fontSize={14} color="black">
                148 Order (Track VN-US: 1ZW4090W0494381838)
              </Typography>
            </Box>
          </Box>

          {/* NÚT DOWNLOAD FILE */}
          <Button
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            sx={{ backgroundColor: "#333", borderRadius: 2 }}
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
            Danh sách 148 order ship ngày 20/05/2025
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              rowGap: 0.5,
            }}
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <Typography key={i} fontSize={14} color="black">
                {i + 1}. SKU: E7541, Order Number: 3432581692
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
