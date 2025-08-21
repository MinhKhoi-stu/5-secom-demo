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
  DialogContent,
  Dialog,
  CircularProgress,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useMemo, useState } from "react";
import { useFindAllAdminUsers } from "hooks/admin-users";
import { useFindAllAdminRoles } from "hooks/admin-roles/useFindAllAdminRole";
import PaginationWrapper from "components/common/PaginationWrapper";
import AddUser from "./CreateUser";
import { AdminUserDto } from "dto/admin-users";
import { useDeleteAdminUsers } from "hooks/admin-users/useDeleteAdminUsers";
import UpdateUser from "./UpdateUser";

const MainUser = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  const { isLoading, isError, data, refetch } = useFindAllAdminUsers({
    codeOrName: searchKeyword,
    roleId: selectedTab || undefined,
    page: page - 1,
    size: itemsPerPage,
  });

  const totalItems = data?.totalElements ?? 0;
  const totalPages = data?.totalPages || 0;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

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
  useEffect(() => {
    setPage(1);
  }, [searchKeyword]);

  const normalizeText = (str: string) =>
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
        .some((field) => normalizeText(field).includes(keyword))
    );
  }, [data, searchKeyword]);

  //MỞ DIALOG ADD USER
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Thay đổi: Click vào thẻ user sẽ mở dialog update
  const [selectedUser, setSelectedUser] = useState<AdminUserDto | null>(null);
  const handleUserClick = (user: AdminUserDto) => {
    setSelectedUser(user);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdate = () => {
    setSelectedUser(null);
    setOpenUpdateDialog(false);
  };

  //HANDLE DELETE - Chuyển logic delete để sử dụng trong UpdateUser
  const { mutate: deleteAdminUsers } = useDeleteAdminUsers();
  const handleDelete = (id: string, version: number) => {
    if (window.confirm("Bạn có chắc muốn xóa user này không?")) {
      deleteAdminUsers(
        { id, version },
        {
          onSuccess: () => {
            const remainingItems = totalItems - 1;
            const maxPage = Math.ceil(remainingItems / itemsPerPage);

            if (page > maxPage) {
              setPage(maxPage);
            }
            handleCloseUpdate(); // Đóng dialog sau khi xóa
            refetch();
          },
        }
      );
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
        {/* TÌM KIẾM */}
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

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && <Typography color="error">Lỗi khi tải user</Typography>}

        {data && (
          <>
            {/* DANH SÁCH USER */}
            <Grid container spacing={2} minHeight="300px">
              {filteredUsers.map((user) => (
                <Grid key={user.id} item xs={12} sm={6} md={4} lg={3}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      padding: 2,
                      borderRadius: 2,
                      border: "1px solid #eee",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      },
                    }}
                    onClick={() => handleUserClick(user)}
                  >
                    {/* <Avatar
                      src={"/img/flag/VietNamflag.jpg"}
                      sx={{ width: 56, height: 56 }}
                    /> */}
                    <img
                      src={user.idCardNumber ?? "/img/flag/VietNamflag.jpg"}
                      // alt={user.id ?? ""}
                      style={{
                        width: 40,
                        height: 40,
                        cursor: "zoom-in",
                      }}
                    />
                    <Box
                      sx={{
                        color: "black",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        flex: 1,
                      }}
                    >
                      <Typography fontWeight="bold">{user.name}</Typography>
                      <Typography fontSize={13}>{user.email}</Typography>
                      <Typography fontSize={13}>{user.phone}</Typography>
                    </Box>
                    {/* Bỏ phần icon edit và delete */}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}

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
          {/* <AddUser onSuccess={handleCloseDialog} selectedRoleId={selectedTab} /> */}
          <AddUser
            onSuccess={() => {
              handleCloseDialog();
              refetch(); 
            }}
            selectedRoleId={selectedTab}
          />
        </DialogContent>
      </Dialog>

      {/* POPUP UPDATE USER */}
      <Dialog
        open={openUpdateDialog}
        onClose={handleCloseUpdate}
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
          <UpdateUser
            user={selectedUser}
            onSuccess={() => {
              handleCloseUpdate();
              refetch();
            }}
            onDelete={handleDelete}
            mode={"update"}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MainUser;
