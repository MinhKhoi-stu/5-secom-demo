import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./MainLayout/Header";
import Sidebar from "./MainLayout/Sidebar";

const PageLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: "100px",
          marginTop: "64px",
          padding: 3,
          height: 'flex',
          backgroundColor: "#f9f9f9",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default PageLayout;
