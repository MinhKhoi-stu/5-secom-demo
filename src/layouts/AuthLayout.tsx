import { Box, Card, CardContent, Grid, Stack } from "@mui/material";
import { Loadable } from "components/common";
import { useGetMyProfile } from "hooks/admin-users";
import ErrorBoundary from "pages/500";
import { ReactNode, memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PATH } from "routes/constants";
import { themeStyles } from "themes/styles";
import { localStorageKey } from "utils/constants";

type Props = {
  children?: ReactNode;
};

function AuthLayout(props: Props) {
  if (localStorage.getItem(localStorageKey.accessToken)) {
    return <Navigate to={PATH.HOME} replace />;
  }

  return (
    <Grid
      id="AuthLayout"
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        // background: themeStyles.backgoundLayout,
        height: "100%",
        minHeight: "100vh",
        padding: "18px",
      }}
      component="main"
    >
      <Box sx={{ width: "100%", maxWidth: 550 }}>
        <Stack spacing={6} alignItems="center">
          <Card sx={{ width: "100%" }}>
            <CardContent sx={{ padding: "40px 24px !important" }}>
              <ErrorBoundary>
                <Loadable>{props.children ?? <Outlet />}</Loadable>
              </ErrorBoundary>
            </CardContent>
          </Card>
          {/* <LogoBoYTe /> */}
        </Stack>
      </Box>
    </Grid>
  );
}

export default memo(AuthLayout);
