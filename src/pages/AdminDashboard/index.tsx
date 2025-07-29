import { Box } from "@mui/material";
// import PaginationWrapper from "../../components/common/PaginationWrapper";
// import { newOrders, TopFile} from "types/OrderTable";
import { newOrderData } from "../../data";
import { NewOrdersTable } from "./components/NewOrdersTable";
import { RevenueStats } from "./components/RevenueStats";
import { NewShipAndTracking } from "./components/NewShipAndTracking";
import { TotalOrdersStats } from "./components/TotalOrdersStats";
import { TopFileStats } from "./components/TopFileStats";

const AdminDashboard = () => {
  // Fake data - dễ kết nối với BE sau này
  // const revenue = "$3,201,350";
  // const news: newOrders[] = newOrderData;
  // const files: TopFile[] = TopUserDesignData;
  // const counts: TotalOrders[] = CountOrders;

  // const getStatusColor = (status: string | string[]) => {
  //   if (status.includes("Đợi") || status.includes("Đang")) return "grey";
  //   if (status.includes("cần") || status.includes("Cần")) return "orange";
  //   if (status.includes("Đã")) return "green";
  //   return "grey";
  // };

  // const [valueDay, setValueDay] = useState("");
  // const [valueBill, setValueBill] = useState("");
  // const [value, setValue] = useState("30");

  //PAGINATION
  // const [page, setPage] = useState(1);
  // const itemsPerPage = 3;

  // const handlePageChange = (
  //   event: React.ChangeEvent<unknown>,
  //   value: number
  // ) => {
  //   setPage(value);
  // };

  // const paginatedOrders = news.slice(
  //   (page - 1) * itemsPerPage,
  //   page * itemsPerPage
  // );

  return (

    <div>
      {/* 1. Bảng đơn hàng mới cập nhật */}
      <NewOrdersTable news={newOrderData} />

      {/* 2. Thông tin ship hàng và tracking */}
      <Box sx={{ mt: 3 }}>
        <NewShipAndTracking />
      </Box>

      {/* 3. Khối bên dưới chia 2 cột */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 3,
          alignItems: "flex-start",
        }}
      >
        {/* Cột trái: Revenue + TotalOrders */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <RevenueStats />
          <TotalOrdersStats />
        </Box>

        {/* Cột phải: Top file thêu */}
        <Box sx={{ flex: 1 }}>
          <TopFileStats />
        </Box>
      </Box>
    </div>
  );
};

export default AdminDashboard;
