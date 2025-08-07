import {
  Box,
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
  user: AdminUserDto | null;
  onSuccess?: () => void;
}

const UpdateUser = ({ user, onSuccess }: UpdateUserProps) => {
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
  });

  useEffect(() => {
    if (!user || !rolesData?.content?.length) return;

    const matchingRole = rolesData.content.find(
      (role) => String(role.id) === String(user.roleId)
    );

    setForm({
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
    });
  }, [user, rolesData]);

  const handleChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //UPLOAD ẢNH MÒ
  const handleImageUpload = (file: File) => {
    console.log("Ảnh đã chọn:", file);
  };

  //MỞ DIALOG
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

  return (
    <>
      {/* <Typography sx={{ fontWeight: "bold", fontSize: "20px", mb: 2 }}>
        CHỈNH SỬA USER
      </Typography> */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
          CHỈNH SỬA USER
        </Typography>

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
            onClick={ handleOpenDialog }
          >
            Đổi mật khẩu
            <KeyIcon fontSize="small" />
          </button>
        </Box>
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
            </Box>

            <Box sx={{ mt: 4 }}>
              <button
                onClick={handleUpdateUser}
                style={{
                  width: "200px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Lưu thay đổi
              </button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* POPUP ADD USER */}
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
            open={true}
            onClose={handleCloseDialog}
            onConfirm={() => {
              handleCloseDialog();
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateUser;
