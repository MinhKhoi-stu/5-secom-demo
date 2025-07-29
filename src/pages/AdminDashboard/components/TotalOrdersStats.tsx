import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {useDashboardData} from "../hook/useDashBoardData";


export const TotalOrdersStats = () => {
  
const {valueBill, setValueBill, counts} = useDashboardData();

  return (
    <>
      <Box
        sx={{
          // backgroundColor: "#ff000036",
          backgroundImage: `linear-gradient(135deg, #ffffff 0%, #fdd0d0ff 90%)`,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          mt: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom color="black">
            Tổng đơn hàng
          </Typography>

          <FormControl
            size="small"
            sx={{
              marginLeft: "auto",
              width: "270px",
            }}
          >
            <InputLabel id="combo-label">Chọn</InputLabel>
            <Select
              labelId="combo-label"
              value={valueBill}
              label="Loại sản phẩm"
              onChange={(e) => setValueBill(e.target.value)}
            >
              <MenuItem value="7days">7 ngày gần nhất</MenuItem>
              <MenuItem value="30days">30 ngày gần nhất</MenuItem>
              <MenuItem value="90days">90 ngày gần nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {counts.map((item) => (
          <Box
            key={item.id}
            sx={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            {/* TRÁI */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={item.img} alt={item.name} />
              <Box>
                <Typography fontWeight="600" color="black">
                  {item.name}
                </Typography>
              </Box>
            </Box>

            {/* PHẢI */}
            <Typography fontWeight="bold" color="black">
              {item.count} Orders
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};
