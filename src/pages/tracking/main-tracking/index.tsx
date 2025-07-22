import { Box, Typography, Paper } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useNavigate } from "react-router-dom";
import { recentTrackings, shippedData } from "../../../data";
import { ShippedOrders } from "types/OrderTable";
import DescriptionIcon from "@mui/icons-material/Description";

const MainTracking = () => {
  const navigate = useNavigate();
  const shipped: ShippedOrders[] = shippedData;
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
        {/* ĐƠN ĐÃ SHIP CẦN MUA TRACKING */}
        <Box sx={{ textAlign: "left" }}>
          <Typography sx={{ color: "black", fontWeight: "bold", mb: 2 }}>
            Order đã Ship cần mua tracking
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {shipped.map((order, idx) => (
              <Paper
                key={idx}
                elevation={2}
                // onClick={() => navigate(`/details-tracking`)}
                onClick={() =>
                  navigate("/details-tracking", {
                    state: {
                      shipDate: order.shipDate,
                      trackingSample: order.trackingSample,
                      orderCount: order.orderCount,
                    },
                  })
                }
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
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
                    Ship ngày {order.shipDate}
                  </Typography>
                </Box>
                <Typography fontSize={14} mt={1}>
                  {order.orderCount} Order (Track VN-US: {order.trackingSample})
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>

        {/* TRACKING ĐÃ MUA GẦN NHẤT */}
        <Box sx={{ textAlign: "left" }}>
          <Typography sx={{ color: "black", fontWeight: "bold", mb: 2 }}>
            Tracking đã mua gần nhất
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {recentTrackings.map((tracking, i) => (
              <Box key={i} sx={{ width: "400px", display: "flex", gap: 1 }}>
                <DescriptionIcon
                  sx={{
                    color: "black",
                    width: "50px",
                    height: "50px",
                  }}
                />
                <Typography color="black" fontSize={18}>
                  Ship ngày {tracking.shipDate} ({tracking.orderCount} Order)
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
