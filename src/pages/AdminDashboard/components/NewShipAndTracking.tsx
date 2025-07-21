import { Box, Typography, Link } from "@mui/material";

export const NewShipAndTracking = () => {
  return (
    <>
      {/* NGÀY SHIP VÀ TRACKING */}
      <Box sx={{ display: "flex", gap: 3, mt: 3 }}>
        {/* NGÀY SHIP MỚI NHẤT */}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#c5f5f6",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Bên trái - thông tin */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="black">
              Ngày ship hàng gần nhất
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="black"
              sx={{ mt: 1 }}
            >
              23/05/2025
            </Typography>
            <Typography color="black">
              350 đơn hàng.{" "}
              <Link
                href="https://dientoan.vn/"
                underline="hover"
                fontWeight={500}
              >
                Xem file Label
              </Link>
            </Typography>
          </Box>

          {/*PHẢI */}
          <Box>
            <img
              src="/img/demo/truck.png"
              alt="truck"
              style={{ width: 150, height: "auto", opacity: 0.8 }}
            />
          </Box>
        </Box>

        {/* TRACKING */}
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#c5f5f6",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Bên trái - thông tin */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="black">
              Cập nhật tracking mới nhất
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="black"
              sx={{ mt: 1 }}
            >
              19/05/2025
            </Typography>
            <Typography color="black">
              250 đơn hàng.{" "}
              <Link
                href="https://dientoan.vn/"
                underline="hover"
                fontWeight={500}
              >
                Xem file Tracking
              </Link>
            </Typography>
          </Box>

          {/*PHẢI */}
          <Box>
            <img
              src="/img/demo/tracking.png"
              alt="tracking"
              style={{ width: 150, height: "auto", opacity: 0.8 }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
