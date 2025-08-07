import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Avatar,
  Tabs,
  Tab,
  Grid,
  IconButton,
  DialogContent,
  Dialog,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useFindAllAdminUsers } from "hooks/admin-users";
import { useFindAllAdminRoles } from "hooks/admin-roles/useFindAllAdminRole";
import PaginationWrapper from "components/common/PaginationWrapper";
import AddUser from "./AddUser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditUser from "./UpdateUser";
import { AdminUserDto } from "dto/admin-users";
import { useDeleteAdminUsers } from "hooks/admin-users/useDeleteAdminUsers";

const MainUser = () => {
  const deleteUser = useDeleteAdminUsers();
  // const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const { data, refetch } = useFindAllAdminUsers({
    // keyword: searchKeyword,
    codeOrName: searchKeyword,
    roleId: selectedTab || undefined,
    page: page - 1,
    size: itemsPerPage,
    // limit: 0
  });

  const totalItems = data?.totalElements ?? 0;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
  const totalPages = data?.totalPages || 0;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // const handleClick = () => navigate("add-user");

  // ROLE FILTER
  const { data: roleData } = useFindAllAdminRoles();
  const RoleTabs = useMemo(() => {
    const dynamicTabs =
      roleData?.content.map((role) => ({
        label: role.name,
        value: role.id,
      })) || [];

    return [{ label: "Tất cả", value: "" }, ...dynamicTabs];
  }, [roleData]);

  //TÌM KIẾM
  // const filteredUsers = useMemo(() => {
  //   if (!searchKeyword) return data?.content || [];
  //   const keyword = searchKeyword.toLowerCase();
  //   return (data?.content || []).filter((user) =>
  //     [user.name, user.email, user.phone]
  //       .filter(Boolean)
  //       .some((field) => field?.toLowerCase().includes(keyword))
  //   );
  // }, [searchKeyword, data]);

  // const newRoleId = filteredUsers[0]?.roleId;

  // const existsInTabs = RoleTabs.some(
  //   (tab) => String(tab.value) === String(newRoleId)
  // );

  // useEffect(() => {
  //   const user = filteredUsers[0];
  //   const newRoleId = user?.roleId;

  //   if (!searchKeyword || !newRoleId) return;

  //   const exists = RoleTabs.some(
  //     (tab) => String(tab.value) === String(newRoleId)
  //   );
  //   if (!exists) return;
  //   if (String(newRoleId) !== String(selectedTab)) {
  //     setSelectedTab(String(newRoleId));
  //     setPage(1);
  //   }
  // }, [filteredUsers, searchKeyword, RoleTabs]);

  useEffect(() => {
    setPage(1);
  }, [searchKeyword]);

  const normalizeText = (str: string) => //chuẩn hóa
    str
      ?.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") 
      .toLowerCase() || "";

  const filteredUsers = useMemo(() => {
    if (!data?.content) return [];

    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) return data.content;

    return data.content.filter((user) =>
      [user.name, user.email, user.phone]
        .filter((field): field is string => Boolean(field))
        // .some((field) => field.toLowerCase().includes(keyword))
        .some((field) => normalizeText(field).includes(keyword))
    );
  }, [data, searchKeyword]);

  //MỞ DIALOG ADD USER
  const [openDialog, setOpenDialog] = useState(false);

  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserDto | null>(null);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenDialogEdit = (user: AdminUserDto) => {
    setEditingUser({
      ...user,
      roleId: user.roleId ? String(user.roleId) : "",
    });
    setOpenDialogEdit(true);
  };

  const handleCloseDialogEdit = () => {
    setEditingUser(null);
    setOpenDialogEdit(false);
  };

  //HANDLE DELETE
  const handleDelete = (id: string, version: number) => {
    if (confirm("Bạn có chắc muốn xóa user này?")) {
      deleteUser.mutate({ id, version });
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
      <Typography
        sx={{
          color: "black",
          fontWeight: "bold",
          fontSize: "20px",
          mb: 2,
        }}
      >
        QUẢN LÝ USER
      </Typography>

      <Box
        sx={{
          height: "auto",
          backgroundColor: "white",
          padding: { xs: 2, sm: 3 },
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* TÌM LIẾM */}
        <TextField
          type="text"
          placeholder="Tìm kiếm User"
          variant="outlined"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          sx={{
            width: "100%",
            mb: 3,
            backgroundColor: "white",
            borderRadius: "10px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon sx={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
        />

        {/* TABS CÁC ROLE */}
        <Box sx={{ overflowX: "auto" }}>
          <Tabs
            // value={selectedTab}
            value={String(selectedTab)}
            onChange={(e, newValue) => {
              setSelectedTab(newValue);
              setPage(1);
            }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              mb: 3,
              "& .MuiTabs-indicator": {
                backgroundColor: "red",
              },
              "& .MuiTabs-scrollButtons": {
                color: "red",
                "&.Mui-disabled": {
                  opacity: 0.3,
                  color: "orange",
                },
              },
            }}
          >
            {RoleTabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                // value={tab.value}
                value={String(tab.value)}
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  "&.Mui-selected": {
                    color: "red",
                  },
                  "&:focus": {
                    outline: "none",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* DANH SÁCH USER */}
        <Grid container spacing={2} minHeight="300px">
          {/* {(data?.content || []).map((user, index) => ( */}
          {filteredUsers.map((user) => (
            // <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  padding: 2,
                  borderRadius: 2,
                  border: "1px solid #eee",
                  justifyContent: "space-between",
                }}
              >
                <Avatar
                  src={"/img/flag/VietNamflag.jpg"}
                  sx={{ width: 56, height: 56 }}
                />
                <Box
                  sx={{
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                >
                  <Typography fontWeight="bold">{user.name}</Typography>
                  <Typography fontSize={13}>{user.email}</Typography>
                  <Typography fontSize={13}>{user.phone}</Typography>
                </Box>

                {/* BÊN PHẢI: ICON HÀNH ĐỘNG */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    size="small"
                    color="primary"
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                    onClick={() => handleOpenDialogEdit(user)}
                  >
                    {/* <i className="fas fa-edit" /> */}
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    sx={{
                      "&:focus": {
                        outline: "none",
                      },
                    }}
                    onClick={() => handleDelete(user.id, user.version ?? 0)}
                  >
                    {/* <i className="fas fa-trash" /> */}
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* PAGINATION */}
        <PaginationWrapper
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
        />
      </Box>

      {/* NÚT THÊM USER */}
      {/* <Box mt={2}>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            display: "flex",
            backgroundColor: "black",
            borderRadius: 2,
            alignItems: "flex-start",
          }}
        >
          THÊM USER
        </Button>
      </Box> */}

      {/* NÚT THÊM USER */}
      <Box mt={2}>
        <Button
          onClick={handleOpenDialog}
          variant="contained"
          sx={{
            display: "flex",
            backgroundColor: "black",
            borderRadius: 2,
            alignItems: "flex-start",
          }}
        >
          THÊM USER
        </Button>
      </Box>

      {/* POPUP ADD USER */}
      <Dialog
        open={openDialog}
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
        <DialogContent>
          <AddUser onSuccess={handleCloseDialog} selectedRoleId={selectedTab} />
        </DialogContent>
      </Dialog>

      {/* POPUP EDIT USER */}
      <Dialog
        open={openDialogEdit}
        onClose={handleCloseDialogEdit}
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
        <DialogContent>
          {/* <EditUser onSuccess={handleCloseDialogEdit} user={editingUser} /> */}
          {/* <EditUser
            user={editingUser}
            onSuccess={() => {
              setOpenDialog(false);
              refetch();
            }}
          /> */}
          <EditUser
            user={editingUser}
            onSuccess={() => {
              setOpenDialogEdit(false);
              refetch();
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MainUser;
