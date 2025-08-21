import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import UploadImage from "components/common/UploadImage";
import { FormField } from "./FormField";
import { useUpdateAdminUsers } from "hooks/admin-users/useUpdateAdminUsers";
import { ADMIN_USER_STATUS } from "utils/enums";
import { useFindAllAdminRoles } from "hooks/admin-roles/useFindAllAdminRole";
import { useFindAllOrgunit } from "hooks/orgunit/useFindAllOrgunit";
import { AdminUserDto } from "dto/admin-users";
import KeyIcon from "@mui/icons-material/Key";
import ChangePasswordDialog from "./ChangePassword";

interface UpdateUserProps {
  mode: "create" | "update";
  user: AdminUserDto | null;
  onSuccess?: () => void;
  onDelete?: (id: string, version: number) => void;
}

const UpdateUser = ({ mode, user, onSuccess, onDelete }: UpdateUserProps) => {
  const [fileName, setFileName] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const updateAdminUser = useUpdateAdminUsers();
  const { data: rolesData, isLoading: loadingRoles } = useFindAllAdminRoles();
  const { data: orgUnitData } = useFindAllOrgunit({
    orgUnitId: "",
    page: 0,
    size: 0,
  });

  const orgUnits = orgUnitData?.content || [];

  const [form, setForm] = useState({
    id: "",
    version: 0,
    username: "",
    name: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    facebook: "",
    birthday: "",
    adminRoleId: "",
    role: { id: "" },
    orgUnitId: "",
    status: "ACTIVE",
    idCardNumber: "",
  });

  // const [initialUser, setInitialUser] = useState({
  //   name: "",
  //   code: "",
  //   idCardNumber: "hinhanh.png",
  // });

  // useEffect(() => {
  //   if (!user || !rolesData?.content?.length) return;

  //   const matchingRole = rolesData.content.find(
  //     (role) => String(role.id) === String(user.roleId)
  //   );

  //   setForm({
  //     id: user.id,
  //     version: user.version ?? 0,
  //     username: user.username || "",
  //     name: user.name || "",
  //     address: user.address || "",
  //     email: user.email || "",
  //     password: "",
  //     phone: user.phone || "",
  //     facebook: "",
  //     birthday: user.dob || "",
  //     adminRoleId: matchingRole ? String(matchingRole.id) : "",
  //     role: { id: matchingRole ? String(matchingRole.id) : "" },
  //     orgUnitId: "",
  //     status: "ACTIVE",
  //     idCardNumber: user.idCardNumber || "",
  //   });

  //   // Set file name từ data
  //   if (user.idCardNumber) {
  //     setFileName("Ảnh hiện tại");
  //   } else {
  //     setFileName("");
  //   }
  // }, [user, rolesData]);

  //SAVE BUTTON CONFIG
  const [initialUser, setInitialUser] = useState({
    name: "",
    id: "",
    idCardNumber: "",
    // image: "hinhanh.png",
  });

  useEffect(() => {
    if (!user || !rolesData?.content?.length) return;

    const matchingRole = rolesData.content.find(
      (role) => String(role.id) === String(user.roleId)
    );

    const newForm = {
      id: user.id,
      version: user.version ?? 0,
      username: user.username || "",
      name: user.name || "",
      address: user.address || "",
      email: user.email || "",
      password: "",
      phone: user.phone || "",
      facebook: "",
      birthday: user.dob || "",
      adminRoleId: matchingRole ? String(matchingRole.id) : "",
      role: { id: matchingRole ? String(matchingRole.id) : "" },
      orgUnitId: "",
      status: "ACTIVE",
      idCardNumber: user.idCardNumber || "",
    };

    setForm(newForm);
    setInitialUser(newForm);

    if (user.idCardNumber) {
      setFileName("Ảnh hiện tại");
    } else {
      setFileName("");
    }
  }, [user, rolesData]);

  const handleChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const formString = JSON.stringify(form);
    const initialString = JSON.stringify(initialUser);
    setIsChanged(formString !== initialString);
  }, [form, initialUser]);

  //UPLOAD ẢNH
  const handleImageUpload = (file: File) => {
    console.log("Ảnh đã chọn:", file);
  };

  //MỞ DIALOG CHANGE PASSWORD
  const [openDialogChange, setOpenDialogChange] = useState(false);

  const handleOpenDialog = () => setOpenDialogChange(true);
  const handleCloseDialog = () => setOpenDialogChange(false);

  //HANDLE UPDATE
  const handleUpdateUser = () => {
    if (!user) return;
    updateAdminUser.mutate(
      {
        id: String(user.id),
        data: {
          ...form,
          id: user.id,
          version: form.version ? Number(form.version) : user.version,
          birthday: form.birthday ? new Date(form.birthday) : undefined,
          role: { id: form.adminRoleId },
          status: form.status as ADMIN_USER_STATUS,
        },
      },
      {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      }
    );
  };

  if (!user || loadingRoles) {
    return <Typography>Đang tải...</Typography>;
  }

  //DELETE - Hàm xử lý xóa user
  const handleDeleteClick = () => {
    if (user && onDelete) {
      onDelete(user.id, user.version ?? 0);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          {mode === "update" ? "CHỈNH SỬA USER" : "THÊM USER"}
        </Typography>

        {/* Chỉ hiển thị nút đổi mật khẩu khi ở mode update */}
        {mode === "update" && (
          <Box>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "red",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={handleOpenDialog}
            >
              Đổi mật khẩu
              <KeyIcon fontSize="small" />
            </button>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          backgroundColor: "white",
          p: 3,
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={4}>
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={6}>
            <FormField
              label="Email đăng nhập"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <FormField
              label="Tên đăng nhập"
              name="username"
              value={form.username}
              onChange={handleChange}
            />

            <FormControl fullWidth sx={{ mt: 4 }}>
              <InputLabel id="role-select-label">Vai trò</InputLabel>
              <Select
                labelId="role-select-label"
                name="adminRoleId"
                value={form.adminRoleId}
                onChange={handleChange}
              >
                {rolesData?.content.map((role) => (
                  <MenuItem key={role.id} value={String(role.id)}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mt: 4 }}>
              <InputLabel id="orgunit-select-label">Khu vực quản lý</InputLabel>
              <Select
                labelId="orgunit-select-label"
                name="orgUnitId"
                value={form.orgUnitId}
                onChange={handleChange}
              >
                {orgUnits.map((unit) => (
                  <MenuItem key={unit.id} value={unit.id}>
                    {unit.namePath.join(" / ") || unit.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormField
              label="Họ và tên"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <FormField
              label="Địa chỉ"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            <FormField
              label="Số điện thoại"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <FormField
              label="Link Facebook"
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
            />

            <Box sx={{ mt: 4 }}>
              <Typography sx={{ mb: 1 }}>Hình ảnh đại diện</Typography>
              <UploadImage onFileSelect={handleImageUpload} />
              {form.idCardNumber && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="textSecondary">
                    {fileName || "Ảnh hiện tại"}
                  </Typography>
                  <Box sx={{ mt: 1, maxWidth: 200 }}>
                    <img
                      src={form.idCardNumber}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
                  </Box>
                </Box>
              )}
            </Box>

            {/* BUTTON LƯU VÀ XÓA */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 4,
              }}
            >
              {/* Chỉ hiển thị nút Xóa khi ở mode update */}
              {mode === "update" && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                    borderRadius: "10px",
                    px: 3,
                    py: 1.5,
                    boxShadow: 2,
                    "&:hover": { backgroundColor: "red" },
                  }}
                  onClick={handleDeleteClick}
                >
                  Xóa
                </Button>
              )}

              <Button
                variant="contained"
                disabled={!isChanged}
                sx={{
                  backgroundColor: isChanged ? "green" : "#ccc",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "10px",
                  px: 3,
                  py: 1.5,
                  boxShadow: 2,
                  "&:hover": {
                    backgroundColor: isChanged ? "lightgreen" : "#ccc",
                  },
                }}
                onClick={handleUpdateUser}
              >
                Lưu
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* POPUP CHANGE PASSWORD */}
      {mode === "update" && (
        <Dialog
          open={openDialogChange}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          scroll="body"
          PaperProps={{
            sx: {
              borderRadius: "16px",
              p: 2,
              backgroundColor: "#f9f9f9",
            },
          }}
        >
          <DialogContent dividers sx={{ p: 3 }}>
            <ChangePasswordDialog
              user={user}
              open={true}
              onClose={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UpdateUser;
