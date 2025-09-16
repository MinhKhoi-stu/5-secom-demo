import { Box, Grid } from "@mui/material";
// import PaginationWrapper from "../../components/common/PaginationWrapper";
// import { newOrders, TopFile} from "types/OrderTable";
import { newOrderData } from "../../data";
import { RevenueStats } from "./components/RevenueStats";
import { NewShipAndTracking } from "./components/NewShipAndTracking";
import { TotalOrdersStats } from "./components/TotalOrdersStats";
import { TopFileStats } from "./components/TopFileStats";
import NewOrdersTable from "./components/NewOrdersTable";

const AdminDashboard = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* 1. Bảng đơn hàng mới cập nhật */}
      <NewOrdersTable news={newOrderData} />

      {/* 2. Thông tin ship hàng và tracking */}
      <Box sx={{ mt: 3 }}>
        <NewShipAndTracking />
      </Box>

      {/* 3. Khối bên dưới chia 2 cột (responsive) */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Cột trái: Revenue + TotalOrders */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <RevenueStats />
            <TotalOrdersStats />
          </Box>
        </Grid>

        {/* Cột phải: Top file thêu */}
        <Grid item xs={12} md={6}>
          <TopFileStats />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
