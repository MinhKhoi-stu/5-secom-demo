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

export const TopFileStats = () => {
  const {files, value, setValue} = useDashboardData();
  
  return (
    <>
      <Box
        sx={{
          width: "92%",
          backgroundColor: "white",
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="black">
            Top vẽ file thêu
          </Typography>
          <FormControl size="small" sx={{ width: 170 }}>
            <InputLabel id="filter-label">Lọc</InputLabel>
            <Select
              labelId="filter-label"
              value={value}
              label="Lọc"
              onChange={(e) => setValue(e.target.value)}
            >
              <MenuItem value="7">7 ngày gần nhất</MenuItem>
              <MenuItem value="30">30 ngày gần nhất</MenuItem>
              <MenuItem value="90">90 ngày gần nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* DANH SÁCH USER */}
        {files.map((user) => (
          <Box
            key={user.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 3,
              mb: 2,
            }}
          >
            {/* TRÁI */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={user.img} alt={user.name} />
              <Box>
                <Typography fontWeight="600" color="black">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="gray">
                  {user.email}
                </Typography>
              </Box>
            </Box>

            {/* PHẢI */}
            <Typography fontWeight="bold" color="black">
              {user.files} Files
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};
