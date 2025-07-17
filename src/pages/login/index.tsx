import { InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/admin-dashboard");
  };

  return (
    //thẻ bọc cả trang
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        flexDirection: "column",
        position: "fixed",
        display: "flex",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
      }}
    >
      {/* Logo */}
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "60px",
          color: "black",
        }}
      >
        5SECOM
      </Typography>

      {/* thẻ bọc form login */}
      <form
        style={{
          width: "600px",
          height: "flex",
          backgroundColor: "white",
          // border: '2px solid gray',
          borderRadius: "30px",
          boxShadow: "0px 4px 20px rgba(128, 128, 128, 0.3)",
        }}
      >
        {/* input username */}
        <TextField
          type="text"
          id="username"
          placeholder="Email address"
          variant="outlined"
          sx={{
            width: "500px",
            marginTop: "50px",
            backgroundColor: "white",
            borderRadius: "10px",
            "& input::placeholder": {
              fontWeight: "bold",
              color: "black",
            },
          }}
        />

        {/* input password */}
        <TextField
          type={show ? "text" : "password"}
          id="username"
          placeholder="Password"
          variant="outlined"
          sx={{
            width: "500px",
            marginTop: "30px",
            backgroundColor: "white",
            borderRadius: "10px",
            "& input::placeholder": {
              fontWeight: "bold",
              color: "black",
            },
          }}
          //ẨN HIỆN PASSWORD
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       {show ? (
          //         <VisibilityIcon
          //           onClick={() => setShow(false)}
          //           sx={{
          //             cursor: "pointer",
          //             "&:hover": {
          //               color: "gray",
          //               transform: "scale(1.2)",
          //               transition: "all 0.2s ease",
          //             },
          //           }}
          //         />
          //       ) : (
          //         <VisibilityOffIcon
          //           onClick={() => setShow(true)}
          //           sx={{
          //             cursor: "pointer",
          //             "&:hover": {
          //               color: "gray",
          //               transform: "scale(1.2)",
          //               transition: "all 0.2s ease",
          //             },
          //           }}
          //         />
          //       )}
          //     </InputAdornment>
          //   ),
          // }}
        />

        {/* nút Đăng nhập */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: "30px",
            marginBottom: "50px",
          }}
        >
          <div style={{ flex: 1 }} />

          <button
            onClick={handleLogin}
            style={{
              width: "150px",
              fontSize: "20px",
              backgroundColor: "rgba(232, 67, 12, 0.88)",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Đăng nhập
          </button>

          <Typography style={{ flex: 1, textAlign: "right" }}>
            <Link
              to="/forgotpassword"
              style={{
                fontSize: "15px",
                textDecoration: "none",
                color: "black",
                marginRight: "48px",
              }}
            >
              Quên mật khẩu?
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default Login;
