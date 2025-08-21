import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import OriginLabel from "components/OriginLabel";
import { FormField } from "pages/User/components/FormField";
import CreateOrderDetails from "../CreateOrder/CreateOrderDetails";

const UpdateOrder = () => {
  return (
    <>
      <Typography fontWeight="bold" variant="h6">
        CHỈNH SỬA ĐƠN HÀNG
      </Typography>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", px: 1 }}>
          <Grid
            container
            spacing={3}
            sx={{
              width: "100%",
              maxWidth: 1300,
              margin: "0 auto",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {/* CỘT 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: 3,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <FormField
                  label="LEFT"
                  name=""
                  type="text"
                  //   value={formData.code || ""}
                  //   onChange={handleChange}
                />
              </Box>
            </Grid>

            {/* CỘT 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: 3,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <FormField
                  label="MIDDLE"
                  name=""
                  type="text"
                  //   value={formData.code || ""}
                  //   onChange={handleChange}
                />
              </Box>
            </Grid>

            {/* CỘT 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: 3,
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}
              >
                <FormField
                  label="RIGHT"
                  name=""
                  type="text"
                  //   value={formData.code || ""}
                  //   onChange={handleChange}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default UpdateOrder;
