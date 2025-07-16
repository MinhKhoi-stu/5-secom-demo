import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Admin Dashboard", path: "/admin-dashboard" },
  { label: "Quản lý Fulfillment", path: "/fulfillment" },
  { label: "Quản lý Sản phẩm", path: "/main-product" },
  { label: "Quản lý User", path: "/main-user" },
  { label: "Quản lý Tracking", path: "/main-tracking" },
  { label: "Quản lý SKU Design", path: "/main-skudesign" },
  // { label: "Quản lý SKU Design", path: "/skudesign" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "200px",
        minWidth: "200px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        bgcolor: "white",
        color: "black",
        pt: "64px",
      }}
    >
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          // const isActive = location.pathname.startsWith(item.path);


          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                width: "195px",
                height: "60px",
                boxShadow: isActive
                  ? "0 0 12px rgba(255, 255, 255, 0.6)"
                  : "0 4px 8px rgba(255, 255, 255, 0.25)",
                backgroundColor: isActive ? "#333" : "transparent",
                color: isActive ? "#ffffff" : "#cccccc",
                borderLeft: isActive ? "4px solid white" : "none",
                "&:hover": {
                  boxShadow: "0 6px 12px rgba(255, 255, 255, 0.25)",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
