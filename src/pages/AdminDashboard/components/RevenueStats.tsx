import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import {useDashboardData} from "../hook/useDashBoardData";

export const RevenueStats = () => {

  const { valueDay, setValueDay, revenue } = useDashboardData();
  return (
    // <Box
    //   sx={{
    //     backgroundColor: "#fff3e0",
    //     p: 3,
    //     borderRadius: 2,
    //     boxShadow: 3,
    //     mt: 3,
    //   }}
    // >
    //   <Typography variant="h6" fontWeight="bold" color="black" gutterBottom>
    //     Thống kê doanh thu
    //   </Typography>

    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexWrap: "wrap",
    //       gap: 4,
    //       justifyContent: "space-between",
    //     }}
    //   >
    //     {/* Tổng doanh thu tháng này */}
    //     <Box>
    //       <Typography variant="subtitle1" color="black">
    //         Doanh thu tháng này
    //       </Typography>
    //       <Typography
    //         variant="h5"
    //         fontWeight="bold"
    //         color="black"
    //         sx={{ mt: 1 }}
    //       >
    //         52,000,000₫
    //       </Typography>
    //     </Box>

    //     {/* Tổng đơn hàng tháng này */}
    //     <Box>
    //       <Typography variant="subtitle1" color="black">
    //         Đơn hàng tháng này
    //       </Typography>
    //       <Typography
    //         variant="h5"
    //         fontWeight="bold"
    //         color="black"
    //         sx={{ mt: 1 }}
    //       >
    //         1,250 đơn
    //       </Typography>
    //     </Box>

    //     {/* Lợi nhuận ước tính */}
    //     <Box>
    //       <Typography variant="subtitle1" color="black">
    //         Lợi nhuận ước tính
    //       </Typography>
    //       <Typography
    //         variant="h5"
    //         fontWeight="bold"
    //         color="black"
    //         sx={{ mt: 1 }}
    //       >
    //         15,600,000₫
    //       </Typography>
    //     </Box>

    //     {/* Tỷ lệ hoàn hàng */}
    //     <Box>
    //       <Typography variant="subtitle1" color="black">
    //         Tỷ lệ hoàn hàng
    //       </Typography>
    //       <Typography
    //         variant="h5"
    //         fontWeight="bold"
    //         color="black"
    //         sx={{ mt: 1 }}
    //       >
    //         2.3%
    //       </Typography>
    //     </Box>
    //   </Box>
    // </Box>
    <>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            backgroundColor: "#c5f5f6",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              color="black"
            >
              Tổng doanh thu
            </Typography>
            <FormControl
              size="small"
              sx={{
                marginLeft: "90px",
                width: "270px",
              }}
            >
              <InputLabel id="combo-label">Chọn</InputLabel>
              <Select
                labelId="total-label"
                value={valueDay}
                label="Loại sản phẩm"
                onChange={(e) => setValueDay(e.target.value)}
              >
                <MenuItem value="shirt">7 ngày gần nhất</MenuItem>
                <MenuItem value="patch">30 ngày gần nhất</MenuItem>
                <MenuItem value="mug">90 ngày gần nhất</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography
            marginTop={5}
            color="black"
            fontSize={50}
            fontWeight="bold"
          >
            {revenue}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
