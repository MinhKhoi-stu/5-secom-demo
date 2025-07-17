import { Box } from "@mui/material";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: "white",
        padding: 2,
        textAlign: "center",
        color: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Link to="/login" style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logocochu.png"
          alt="Logo"
          style={{
            height: "40px",
            marginRight: "16px",
          }}
        />
      </Link>
    </Box>
  );
};

export default Header;
