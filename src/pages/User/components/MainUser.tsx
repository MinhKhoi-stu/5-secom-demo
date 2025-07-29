import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Button,
  Avatar,
  Tabs,
  Tab,
  Pagination,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminUserDto } from "dto/admin-users";
import { FindAllAdminUserDto, useAllAdminUsers } from "hooks/admin-users";

//---------------------------------------LÀM LẠI LOAD USER-------------------------------
// const fakeUsers: FakeUser[] = userData;

const MainUser = () => {
  const [users, setUsers] = useState<AdminUserDto[]>([]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("add-user");
  };

  // NÀY LÀM QUERY--------------------------------------------------------------------------------
  // const [selectedTab, setSelectedTab] = useState("");
  // const { data, isLoading } = useAllAdminUsers({
  //   pageIndex: 0,
  //   pageSize: 100,
  // });

  // const users = data?.content || []; // content là mảng AdminUserDto

  // const filteredUsers = useMemo(() => {
  //   return selectedTab === ""
  //     ? users
  //     : users.filter((user) => user.adminRole?.username === selectedTab);
  // }, [users, selectedTab]);

  // const params = {}; // có thể truyền thêm keyword, status nếu cần

  // const { data, isLoading, isError } = useAllAdminUsers(params);

  // const users = data?.content || [];

  // const filteredUsers = useMemo(() => {
  //   if (!selectedTab) return users;
  //   return users.filter((user) => user.adminRole?.username === selectedTab);
  // }, [users, selectedTab]);

  // KHÔNG PHẢI QUERY--------------------------------------------------------------------------------
  //kiềm tím----------------------------------------------------------------------------------------
  // const [searchText, setSearchText] = useState("");

  //bộ nọc chuyển tab--------------------------------------------------------------------------------

  const [selectedTab, setSelectedTab] = useState("");

  const RoleTabs = [
    { label: "Tất cả", value: "" },
    { label: "Admin", value: "admin" },
    { label: "Vẽ 2D", value: "ve2d" },
    { label: "Vẽ File Thêu", value: "theu" },
    { label: "Sản Xuất", value: "sanxuat" },
    { label: "Đóng gói", value: "donggoi" },
    { label: "Cắt laser", value: "catlaser" },
  ];

  const filteredUsers = useMemo(() => {
    if (!selectedTab) return users;
    return users.filter((user) => user.adminRole?.username === selectedTab);
  }, [users, selectedTab]);

  // const filteredUsers = useMemo(() => {
  //   const role = RoleTabs[selectedTab].value;
  //   if (!role) return users;
  //   // return users.filter((user) => user.adminRole?.username === role);
  //   return users.filter((user) => user.adminRole?.username === role);
  // }, [users, selectedTab]);

  //load du sơ------------------------------------------------------------------------------------
  const params: FindAllAdminUserDto = {};

  useEffect(() => {
    const fetchData = async () => {
      const res = await useAllAdminUsers(params);
      // console.log("RESPONSE:", res);
      setUsers(res);
    };
    fetchData();
  }, []);

  // const findAllUser = async () => {
  //   // console.log(await useAllAdminUsers(params));
  //   const res = await useAllAdminUsers(params);
  //   console.log(res);
  //   setUsers(res);
  // };
  // useEffect(() => {
  //   // findAllUser();
  // }, [users, setUsers, findAllUser]);

  return (
    <>
      {/* TIÊU ĐỀ */}
      <Typography
        sx={{
          display: "flex",
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
          width: "1180px",
          height: "60vh",
          // height: "flex",
          backgroundColor: "white",
          padding: 3,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/*TÌM KIẾM*/}
        <TextField
          type="text"
          placeholder="Tìm kiếm User"
          variant="outlined"
          sx={{
            width: "100%",
            marginBottom: 3,
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

        {/* CÁC TAB GIẢ*/}
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 3,
            "& .MuiTabs-indicator": {
              backgroundColor: "red", // ✅ màu gạch chân
            },
          }}
        >
          {RoleTabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              sx={{
                color: "black",
                fontWeight: "bold",
                "&.Mui-selected": {
                  color: "red",
                },
              }}
            />
          ))}
        </Tabs>

        {/*DANH SÁCH USER GIẢ*/}
        <Box
          sx={{
            display: "flex",
            height: "30vh",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "flex-start",
          }}
        >
          {filteredUsers?.map((user, index) => (
            <Box
              key={index}
              sx={{
                width: "25%",
                display: "flex",
                alignItems: "center",
                gap: 2,
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
            </Box>
          ))}
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography color="black" variant="body2">
            Showing 1 to 3 of 6 entries
          </Typography>
          <Pagination count={3} page={1} variant="outlined" shape="rounded" />
        </Box>
      </Box>

      {/* NÚT THÊM USER */}
      <Box mt={2}>
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
      </Box>
    </>
  );
};

export default MainUser;
