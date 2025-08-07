import {
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { FormField } from "./FormField";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (oldPassword: string, newPassword: string) => void;
}

const ChangePasswordDialog = ({
  open,
  onClose,
  onConfirm,
}: ChangePasswordDialogProps) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = () => {
    onConfirm(form.oldPassword, form.newPassword);
    setForm({ oldPassword: "", newPassword: "" });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "20px" }}>
          ĐỔI MẬT KHẨU
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12}>
                <FormField
                  label="Mật khẩu cũ"
                  name="oldPassword"
                  type="password"
                  value={form.oldPassword}
                  onChange={handleChange}
                />
                <FormField
                  label="Mật khẩu mới"
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="primary"
            disabled={!form.oldPassword || !form.newPassword}
            sx={{
              backgroundColor: "red",
            }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePasswordDialog;
