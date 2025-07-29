import { TextField, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "hooks/auth";
import { LoginDto } from "dto/auth";
import { toast } from "react-toastify";
import { authAPI } from "api/auth";
import {PATH} from "routes/constants";

const Login = () => {
  const [show, setShow] = useState(false);
  const login = useLogin();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<LoginDto>({
    username: "",
    password: "",
    grant_type: "password",
    scope: "read write",
    client_id: "dichtetayninh",
    client_secret: "AVTaQ7vJes38oseonKqt",
  });

  // login.mutate({
  //   username: initialValues.username,
  //   password: initialValues.password,
  //   client_id: "dichtetayninh",
  //   client_secret: "AVTaQ7vJes38oseonKqt",
  //   grant_type: "password",
  //   scope: "read write",
  // });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // localStorage.setItem("accessToken", "fake_token");
    login.mutate(formValues);
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
        onSubmit={handleLogin}
        style={{
          width: "600px",
          height: "flex",
          backgroundColor: "white",
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
          //
          value={formValues.username}
          onChange={(e) =>
            setFormValues({ ...formValues, username: e.target.value })
          }
          sx={{
            width: "500px",
            marginTop: "50px",
            backgroundColor: "white",
            borderRadius: "10px",
            "& input::placeholder": {
              fontWeight: "bold",
            },
          }}
        />

        {/* input password */}
        <TextField
          type={show ? "text" : "password"}
          id="password"
          placeholder="Password"
          variant="outlined"
          //
          value={formValues.password}
          onChange={(e) =>
            setFormValues({ ...formValues, password: e.target.value })
          }
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
            type="submit"
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
              to="/ForgotPassword"
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
