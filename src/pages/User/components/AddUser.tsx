import {
  Box,
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
import { useCreateAdminUser } from "hooks/admin-users";
import { CreateAdminUserDto } from "dto/admin-users";
import { ADMIN_USER_STATUS } from "utils/enums";
import { useFindAllAdminRoles } from "hooks/admin-roles/useFindAllAdminRole";
import { useFindAllOrgunit } from "hooks/orgunit/useFindAllOrgunit";

// {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{SELECT BOX ORG ĐANG LỖI}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}

const AddUser = ({
  onSuccess,
  selectedRoleId = "",
}: {
  onSuccess?: () => void;
  selectedRoleId?: string;
}) => {
  const [fileName, setFileName] = useState("");

  //UPLOAD ẢNH MÒ--------------------------------------------------------------------------------------------
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleImageUpload = (file: File) => {
    console.log("Ảnh đã chọn:", file);
    // Bạn có thể upload lên server tại đây hoặc preview
  };

  //FormField------------------------------------------------------------------------------------------------
  const initialForm = {
    username: "",
    name: "",
    // code: "",
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
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    // console.log("cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc", e.target, e.target.value)
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //NÚT THÊM USER--------------------------------------------------------------------------------------------
  // const { mutate: createUser } = useCreateAdminUser();

  // const onSubmit = (formData: CreateAdminUserDto) => {
  //   createUser(formData);
  // };

  const [form, setForm] = useState(initialForm);
  const createAdminUser = useCreateAdminUser();

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      adminRoleId: selectedRoleId,
      role: { id: selectedRoleId },
    }));
  }, [selectedRoleId]);

  const handleAddUser = () => {
    const payload: CreateAdminUserDto = {
      ...form,
      birthday: form.birthday ? new Date(form.birthday) : undefined,
      adminRoleId: form.adminRoleId,
      role: { id: form.adminRoleId },
      status: form.status as ADMIN_USER_STATUS,
      orgUnit: form.orgUnitId ? { id: form.orgUnitId } : undefined,
      id: "",
    };

    createAdminUser.mutate(payload, {
      onSuccess: () => {
        setForm(initialForm);
        if (onSuccess) onSuccess();
      },
    });
  };

  //SELECT BOX ROLE------------------------------------------------------------------------------------------
  const { data: rolesData } = useFindAllAdminRoles();

  const { data: orgUnitData, isLoading } = useFindAllOrgunit({
    orgUnitId: "",
    page: 0,
    size: 0,
  });

  const orgUnits = orgUnitData?.content || [];

  const sortedOrgUnits = [...orgUnits].sort((a, b) => a.lvl - b.lvl);

  //NÀY LÀ LÀM TREE MÀ 0 ĐƯỢC---------------------------------------------------------------------------------
  // const { data: orgUnitData } = useFindAllOrgunit({ orgUnitId: "" });
  // const orgUnits = orgUnitData?.content || [];
  // const orgTree = OrgunitTree(orgUnits);
  // const orgTree = OrgunitTree(sortedOrgUnits);

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
          width: "flex",
          backgroundColor: "white",
          p: 3,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={6} md={6}>
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

export default AddUser;

// import React, { useState, MouseEvent } from 'react';
// import { Button, Menu, MenuItem } from '@mui/material';

// const MultiLevelMenu: React.FC = () => {
//   const [mainAnchor, setMainAnchor] = useState<null | HTMLElement>(null);
//   const [subAnchor, setSubAnchor] = useState<null | HTMLElement>(null);
//   const [subSubAnchor, setSubSubAnchor] = useState<null | HTMLElement>(null);

//   const handleMainOpen = (event: MouseEvent<HTMLElement>) => {
//     setMainAnchor(event.currentTarget);
//   };

//   const handleCloseAll = () => {
//     setMainAnchor(null);
//     setSubAnchor(null);
//     setSubSubAnchor(null);
//   };

//   const handleSubOpen = (event: MouseEvent<HTMLElement>) => {
//     setSubAnchor(event.currentTarget);
//   };

//   const handleSubClose = () => {
//     setSubAnchor(null);
//     setSubSubAnchor(null);
//   };

//   const handleSubSubOpen = (event: MouseEvent<HTMLElement>) => {
//     setSubSubAnchor(event.currentTarget);
//   };

//   const handleSubSubClose = () => {
//     setSubSubAnchor(null);
//   };

//   return (
//     <>
//       <Button variant="contained" onClick={handleMainOpen}>
//         Tutorials
//       </Button>

//       {/* First Menu */}
//       <Menu
//         anchorEl={mainAnchor}
//         open={Boolean(mainAnchor)}
//         onClose={handleCloseAll}
//       >
//         <MenuItem onClick={handleCloseAll}>HTML</MenuItem>
//         <MenuItem onClick={handleCloseAll}>CSS</MenuItem>
//         <MenuItem
//           onClick={handleSubOpen}
//           // onMouseLeave={handleSubClose}
//         >
//           New dropdown
//         </MenuItem>
//       </Menu>

//       {/* Second Menu */}
//       <Menu
//         anchorEl={subAnchor}
//         open={Boolean(subAnchor)}
//         onClose={handleSubClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//       >
//         <MenuItem onClick={handleCloseAll}>2nd level dropdown</MenuItem>
//         <MenuItem
//           onClick={handleSubSubOpen}
//           // onMouseLeave={handleSubSubClose}
//         >
//           Another dropdown
//         </MenuItem>
//       </Menu>

//       {/* Third Menu */}
//       <Menu
//         anchorEl={subSubAnchor}
//         open={Boolean(subSubAnchor)}
//         onClose={handleSubSubClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//       >
//         <MenuItem onClick={handleCloseAll}>3rd level dropdown</MenuItem>
//         <MenuItem onClick={handleCloseAll}>3rd level dropdown</MenuItem>
//       </Menu>
//     </>
//   );
// };

// export default MultiLevelMenu;
