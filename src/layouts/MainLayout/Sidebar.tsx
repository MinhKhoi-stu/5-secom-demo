// import { Box, List, ListItemButton, ListItemText } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const menuItems = [
//   { label: "Admin Dashboard", path: "/AdminDashboard" },
//   { label: "Quản lý Fulfillment", path: "/Fulfillment" },
//   { label: "Quản lý Sản phẩm", path: "/Product" },
//   { label: "Quản lý User", path: "/User" },
//   { label: "Quản lý Tracking", path: "/Tracking" },
//   { label: "Quản lý SKU Design", path: "/SKUDesign" },
// ];

// const Sidebar = () => {
//   const navigate = useNavigate();
//   return (
//     <Box
//       sx={{
//         width: "200px",
//         minWidth: "200px",
//         height: "100vh",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         overflowY: "auto",
//         bgcolor: "white",
//         color: "black",
//         pt: "64px",
//       }}
//     >
//       <List>
//         {menuItems.map((item) => {
//           const isActive = location.pathname === item.path;
//           // const isActive = location.pathname.startsWith(item.path);
//           return (
//             <ListItemButton
//               key={item.path}
//               onClick={() => navigate(item.path)}
//               sx={{
//                 width: "195px",
//                 height: "60px",
//                 boxShadow: isActive
//                   ? "0 0 12px rgba(255, 255, 255, 0.6)"
//                   : "0 4px 8px rgba(255, 255, 255, 0.25)",
//                 backgroundColor: isActive ? "rgba(255, 21, 0, 0.44)" : "transparent",
//                 color: isActive ? "black" : "black",
//                 borderLeft: isActive ? "4px solid white" : "none",
//                 "&:hover": {
//                   boxShadow: "0 6px 12px rgba(255, 255, 255, 0.25)",
//                 },
//               }}
//             >
//               <ListItemText primary={item.label} />
//             </ListItemButton>
//           );
//         })}
//       </List>
//     </Box>
//   );
// };

// export default Sidebar;

import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { label: "Admin Dashboard", path: "/AdminDashboard" },
  { label: "Quản lý Fulfillment", path: "/Fulfillment" },
  { label: "Quản lý Sản phẩm", path: "/Product" },
  { label: "Quản lý User", path: "/User" },
  { label: "Quản lý Tracking", path: "/Tracking" },
  { label: "Quản lý SKU Design", path: "/SKUDesign" },
];

interface SidebarProps {
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: open ? { xs: 0, sm: "200px" } : 0,
        minWidth: open ? { sm: "200px" } : 0,
        overflowX: "hidden",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        pt: "64px",
        bgcolor: "white",
        borderRight: "1px solid #eee",
        transition: "width 0.3s ease, min-width 0.3s ease",
        display: { xs: open ? "block" : "none", sm: "block" },
      }}
    >
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                height: "60px",
                color: "black",
                backgroundColor: isActive ? "rgba(255, 21, 0, 0.44)" : "transparent",
                borderLeft: isActive ? "4px solid white" : "none",
                "&:hover": { backgroundColor: "#f5f5f5" },
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
