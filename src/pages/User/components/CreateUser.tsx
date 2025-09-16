import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import UploadImage from "components/common/UploadImage";
import { FormField } from "./FormField";
import { useCreateAdminUser } from "hooks/admin-users";
import { CreateAdminUserDto } from "dto/admin-users";
import { ADMIN_USER_STATUS } from "utils/enums";
import { useFindAllAdminRoles } from "hooks/admin-roles/useFindAllAdminRole";
import { useFindAllOrgunit } from "hooks/orgunit/useFindAllOrgunit";
import { processImageUpload } from "utils/convert-img";

const CreateUser = ({
  onSuccess,
  selectedRoleId = "",
}: {
  onSuccess?: () => void;
  selectedRoleId?: string;
}) => {
  const [fileName, setFileName] = useState("");
  const createAdminUser = useCreateAdminUser();

  const [form, setForm] = useState({
    username: "",
    name: "",
    address: "",
    email: "",
    password: "",
    phone: "",
    facebook: "",
    birthday: "",
    adminRoleId: selectedRoleId,
    role: { id: selectedRoleId },
    orgUnitId: "",
    status: "ACTIVE",
    // idCardNumber: "",
  });

  // Xử lý khi chọn ảnh
  const handleImageUpload = async (file: File) => {
    console.log("Ảnh đã chọn:", file);

    const result = await processImageUpload(
      file,
      {
        maxSizeInMB: 5,
        allowedTypes: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/webp",
        ],
      },
      false
    );

    if (!result.success) {
      alert(result.error);
      return;
    }

    if (!result.data) {
      throw new Error("Không có dữ liệu trả về");
    }

    const { data } = result;

    setForm((prev) => ({
      ...prev,
      image: data.base64,
      // idCardNumber: data.base64,
    }));
    setFileName(data.fileName);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //CREATE USER
  const handleAddUser = () => {
    const payload: CreateAdminUserDto = {
      ...form,
      birthday: form.birthday ? new Date(form.birthday) : undefined,
      adminRoleId: form.adminRoleId,
      role: { id: form.adminRoleId },
      status: form.status as ADMIN_USER_STATUS,
      orgUnit: form.orgUnitId ? { id: form.orgUnitId } : undefined,
      id: "",
      // idCardNumber: form.idCardNumber,
    };

    createAdminUser.mutate(payload, {
      onSuccess: () => {
        setForm((prev) => ({ ...prev, image: "" }));
        // setForm((prev) => ({ ...prev, idCardNumber: "" }));
        setFileName("");
        if (onSuccess) onSuccess();
      },
    });
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      adminRoleId: selectedRoleId,
      role: { id: selectedRoleId },
    }));
  }, [selectedRoleId]);

  const { data: rolesData } = useFindAllAdminRoles();
  const { data: orgUnitData } = useFindAllOrgunit({
    orgUnitId: "",
    page: 0,
    size: 50,
  });
  const orgUnits = orgUnitData?.content || [];

  return (
    <>
      <Typography
        sx={{ color: "black", fontWeight: "bold", fontSize: "20px", mb: 2 }}
      >
        THÊM USER
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
          p: 3,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={6} md={6}>
            {/* Các FormField khác */}
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
            <FormField
              label="Mật khẩu đăng nhập"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />

            {/* Select Vai trò */}
            <FormControl fullWidth sx={{ mt: 4 }}>
              <InputLabel id="role-select-label">Vai trò</InputLabel>
              <Select
                labelId="role-select-label"
                name="adminRoleId"
                value={form.adminRoleId}
                onChange={handleChange}
              >
                {rolesData?.content.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Select Khu vực */}
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

            {/* Upload ảnh */}
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ mb: 1 }}>Hình ảnh đại diện</Typography>
              <UploadImage onFileSelect={handleImageUpload} />
              {/* {form.idCardNumber && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="textSecondary">
                    Đã chọn: {fileName}
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
              )} */}
            </Box>

            {/* Nút thêm user */}
            <Box sx={{ mt: 4 }}>
              <button
                onClick={handleAddUser}
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
                Thêm User
              </button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CreateUser;
