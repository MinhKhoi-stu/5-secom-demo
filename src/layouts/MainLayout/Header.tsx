import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { useGetMyProfile } from "hooks/admin-users";
import { useLogout } from "hooks/auth";

interface HeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header = ({ sidebarOpen, toggleSidebar }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data: profile } = useGetMyProfile({ enabled: true });
  const logout = useLogout();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "64px",
        zIndex: 1100,
        px: 2,
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "left 0.3s ease",
      }}
    >
      {/* Sidebar Toggle + Logo */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={toggleSidebar} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
        <Link to="/Login" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logocochu.png"
            alt="Logo"
            style={{ height: "40px" }}
          />
        </Link>
      </Box>

      {/* User Menu */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: "black", mr: 4 }}>
          <AccountCircleIcon />
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>
            {profile?.name}
          </Typography>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={() => logout.mutate()}>Đăng xuất</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
