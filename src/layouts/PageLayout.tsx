import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./MainLayout/Header";
import Sidebar from "./MainLayout/Sidebar";
import { useEffect } from "react";
import { localStorageKey } from "utils/constants";
import { PATH } from "routes/constants";

const PageLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === localStorageKey.accessToken && !e.newValue) {
        localStorage.removeItem(localStorageKey.accessToken);
        localStorage.removeItem(localStorageKey.refreshToken);
        navigate(PATH.LOGIN, { replace: true });
      }
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, []);

  if (!localStorage.getItem(localStorageKey.accessToken)) {
    return <Navigate to={PATH.LOGIN} replace />;
  }

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
          height: "flex",
          backgroundColor: "#f9f9f9",
          // backgroundColor: "white",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default PageLayout;
