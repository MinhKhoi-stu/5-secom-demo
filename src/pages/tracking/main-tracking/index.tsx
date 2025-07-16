import { Box, Typography, Paper } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";

const MainTracking = () => {
  const navigate = useNavigate();
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
        QUẢN LÝ TRACKING
      </Typography>

      {/* BỌC CẢ BẢNG */}
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
        {/* BỌC ORDER ĐÃ SHIP CẦN MUA TRACKING */}
        <Box
          sx={{
            textAlign: "left",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Order đã Ship cần mua tracking
          </Typography>

          {/* BỌC ĐƠN HÀNG GIẢ */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[20, 22, 23, 24].map((day, idx) => (
              <Paper
                key={idx}
                elevation={2}
                // onClick={() => navigate(`/details-tracking/${day}`)}
                onClick={() => navigate(`/details-tracking`)}
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  width: "flex",
                  border: "1px solid #e0e0e0",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    boxShadow: "0 0 0 2px #f93b3bff",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalShippingIcon sx={{ color: "red" }} />
                  <Typography fontWeight={700} color="red">
                    Ship ngày {day}/05/2025
                  </Typography>
                </Box>
                <Typography fontSize={14} mt={1}>
                  {100 + idx * 50} Order (Track VN-US: 1ZW4090W0494xxxxxx)
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* BỌC TRACKING ĐÃ MUA GẦN NHẤT */}
        <Box
          sx={{
            textAlign: "left",
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Tracking đã mua gần nhất
          </Typography>

          {/* BỌC TRACKING GIẢ */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <Box key={i} sx={{ width: "270px", display: "flex", gap: 1 }}>
                <LocalShippingIcon />
                <Typography color="black" fontSize={14}>
                  Ship ngày 10/05/2025 (148 Order)
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainTracking;
