// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { useState } from "react";
// import { FormField } from "./FormField";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useChangeMyPassword } from "hooks/admin-users/useChangePassword";
import React, { useEffect } from "react";
import { FormField } from "./FormField";
import { useGetMyProfile } from "hooks/admin-users";
import {AdminUserDto} from "dto/admin-users";

// interface ChangePasswordDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onConfirm: (oldPassword: string, newPassword: string) => void;
// }

// const ChangePasswordDialog = ({
//   open,
//   onClose,
//   onConfirm,
// }: ChangePasswordDialogProps) => {
//   const [form, setForm] = useState({
//     oldPassword: "",
//     newPassword: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleConfirm = () => {
//     onConfirm(form.oldPassword, form.newPassword);
//     setForm({ oldPassword: "", newPassword: "" });
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ fontWeight: "bold", fontSize: "20px" }}>
//           ĐỔI MẬT KHẨU
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
//             <Grid container spacing={4} justifyContent="center">
//               <Grid item xs={12}>
//                 <FormField
//                   label="Mật khẩu cũ"
//                   name="oldPassword"
//                   type="password"
//                   value={form.oldPassword}
//                   onChange={handleChange}
//                 />
//                 <FormField
//                   label="Mật khẩu mới"
//                   name="newPassword"
//                   type="password"
//                   value={form.newPassword}
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </Grid>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ pr: 3, pb: 2 }}>
//           <Button onClick={onClose} color="inherit">
//             Hủy
//           </Button>
//           <Button
//             onClick={handleConfirm}
//             variant="contained"
//             color="primary"
//             disabled={!form.oldPassword || !form.newPassword}
//             sx={{
//               backgroundColor: "red",
//             }}
//           >
//             Xác nhận
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ChangePasswordDialog;

interface ChangePasswordDialogProps {
  user: AdminUserDto;
  open: boolean;
  onClose: () => void;
  // onCofirm: () => void;
}

const ChangePasswordDialog = ({ open, onClose, user, onCofirm }: ChangePasswordDialogProps) => {
  const [form, setForm] = React.useState({
    oldPassword: "",
    newPassword: "",
  });

  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const {
    mutate: changePassword,
    isLoading,
    isError,
    error,
    isSuccess,
    reset,
  } = useChangeMyPassword({
    onSuccess: (data) => {
      setSuccessMsg(data.message || "Đổi mật khẩu thành công");
      setErrorMsg(null);
      setForm({ oldPassword: "", newPassword: "" });
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.message ||
        "Đổi mật khẩu thất bại. Vui lòng thử lại.";
      setErrorMsg(msg);
      setSuccessMsg(null);
    },
  });

  // Reset trạng thái mỗi khi mở dialog
  useEffect(() => {
    if (open) {
      setErrorMsg(null);
      setSuccessMsg(null);
      reset();
      setForm({ oldPassword: "", newPassword: "" });
    }
  }, [open, reset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Kiểm tra xác nhận mật khẩu mới có khớp không
  const isConfirmPasswordValid = form.newPassword;
  // const getProfileId = useGetMyProfile();
  // console.log("-----------------------------", getProfileId);
  const handleConfirm = () => {
    if (!isConfirmPasswordValid) {
      setErrorMsg("Mật khẩu mới và xác nhận mật khẩu không khớp");
      setSuccessMsg(null);
      return;
    }
    changePassword({
      id: user.id,
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    });
  };

  return (
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
                disabled={isLoading}
              />
              <FormField
                label="Mật khẩu mới"
                name="newPassword"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
              {/* <FormField
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                error={
                  !isConfirmPasswordValid && form.confirmPassword.length > 0
                }
                helperText={
                  !isConfirmPasswordValid && form.confirmPassword.length > 0
                    ? "Mật khẩu xác nhận không khớp"
                    : ""
                }
              /> */}
            </Grid>
            <Grid item xs={12}>
              {isError && errorMsg && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMsg}
                </Alert>
              )}
              {isSuccess && successMsg && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {successMsg}
                </Alert>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit" disabled={isLoading}>
          Hủy
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          disabled={
            isLoading || !form.oldPassword || !form.newPassword
            // !form.confirmPassword ||
            // !isConfirmPasswordValid
          }
          sx={{ backgroundColor: "red" }}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
