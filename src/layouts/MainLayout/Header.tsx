// import { Box } from "@mui/material";
// import {Link} from "react-router-dom";

// const Header = () => {
//   return (
//     <Box
//       sx={{
//         alignItems: "center",
//         display: "flex",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         zIndex: 1000,
//         backgroundColor: "white",
//         padding: 2,
//         textAlign: "center",
//         color: "white",
//         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//       }}
//     >
//       <Link to="/Login" style={{ display: "flex", alignItems: "center" }}>
//         <img
//           src="/logocochu.png"
//           alt="Logo"
//           style={{
//             height: "40px",
//             marginRight: "16px",
//           }}
//         />
//       </Link>
//     </Box>
//   );
// };

// export default Header;

import { Box, IconButton, Menu, MenuItem} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import ElderlyIcon from '@mui/icons-material/Elderly';
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {

    // Xoá accessToken khỏi localStorage/sessionStorage
    // Gọi API logout
    // Điều hướng về trang login
    localStorage.removeItem("accessToken");
    handleMenuClose();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "white",
        padding: 2,
        color: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo bên trái */}
      <Link to="/Login" style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logocochu.png"
          alt="Logo"
          style={{
            height: "40px",
            marginRight: "16px",
          }}
        />
      </Link>

      {/* Menu bên phải */}
      <Box sx={{
        mr: 3
      }}>
        <IconButton onClick={handleMenuOpen} sx={{ color: "black" }}>
          <ElderlyIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleMenuClose}>Này nọ</MenuItem>
          <MenuItem onClick={handleMenuClose}>Nọ kia</MenuItem>
          <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
