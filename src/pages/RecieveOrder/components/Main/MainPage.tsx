import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Order } from "types/OrderTable";
import { mockOrders } from "../../../../data";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import OrdersUnassignedTable from "./OrdersUnassignedTable";
import RecieveOrderForm from "./RecieveOrderForm";
import OrdersAssignTable from "./OrdersAssignedTable";
import { useLocation } from "react-router-dom";
import {
  extractFacilityTypeIdFromOptions,
  extractFacilityTypeNameFromOptions,
  getTypeCodeFromPath,
  MAIN_FULFILLMENT_TYPECODE,
} from "utils/facility/facility";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { useGetMyProfile } from "hooks/admin-users/useGetMyProfile";
import { useFindAllFacility } from "hooks/facility/useFindAllFacilityCustom";

const MainPage: React.FC = () => {
  const [ordersToDraw, setOrdersToDraw] = useState<Order[]>(mockOrders);
  const [inProgressOrders, setInProgressOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openAssignDialog, setOpenAssignDialog] = useState(false);

  const handleAcceptOrder = (order: Order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleConfirmUpdate = (updatedData?: {
    status: string;
    image?: File;
  }) => {
    if (selectedOrder) {
      const updatedOrder: Order = {
        ...selectedOrder,
        status: updatedData?.status || "Đã cập nhật",
      };
      setOrdersToDraw((prev) => prev.filter((o) => o.id !== selectedOrder.id));
      setInProgressOrders((prev) => [...prev, updatedOrder]);
    }
    handleCloseDialog();
  };

  const location = useLocation();

  // dữ liệu hiển thị tiêu đề
  const [facilityTypeId, setFacilityTypeId] = useState<string | undefined>(
    undefined
  );
  const [facilityTypeName, setFacilityTypeName] = useState<string | undefined>(
    undefined
  );

  const typeCodeFromPath = getTypeCodeFromPath(location.pathname);

  const PAGE = 0;
  const SIZE = 20;
  const optionsQuery = useFindOptionsByGroup(
    "facility-type",
    PAGE,
    SIZE,
    typeCodeFromPath ?? undefined
  ) as any;

  const {
    data: optionsData,
    isLoading: optionsLoading,
    isFetching: optionsFetching,
  } = optionsQuery ?? {};

  // khi optionsData về -> extract id/name
  useEffect(() => {
    if (!optionsLoading && !optionsFetching && optionsData) {
      const id = extractFacilityTypeIdFromOptions(optionsData);
      const name = extractFacilityTypeNameFromOptions(optionsData);
      setFacilityTypeId(id);
      setFacilityTypeName(name ?? undefined);
    } else {
      if (!typeCodeFromPath) {
        setFacilityTypeId(undefined);
        setFacilityTypeName(undefined);
      }
    }
  }, [optionsData, optionsLoading, optionsFetching, typeCodeFromPath]);

  // lấy user profile
  const { data: profileData } = useGetMyProfile({ enabled: true });
  const username = profileData?.username;

  // query facility theo issuePlace = username
  const { data: facilityData, isLoading: facilityLoading } = useFindAllFacility(
    {
      page: 0,
      size: 50,
      sort: ["createdDate,desc", "isException,desc"],
      facilityTypeId,
      issuePlace: username,
    },
    { enabled: !!facilityTypeId && !!username }
  );

  // mapping facility -> orders table
  const facilitiesAsOrders = useMemo(() => {
    if (!facilityData?.content) return [];
    return facilityData.content.map((f: any) => ({
      sku: f.code ?? "-",
      orderId: f.id ?? "-",
      date: f.createdAt ?? "-",
      demoImage: f.imageUrl ?? "",
      product: f.name ?? "-",
      type: f.type ?? "-",
      quantity: f.capacity ?? 0,
    }));
  }, [facilityData]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "start",
          gap: 1,
          width: "100%",
        }}
      >
        {/* --- Tiêu đề chính lấy từ facilityTypeName --- */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="black">
            {typeCodeFromPath === MAIN_FULFILLMENT_TYPECODE
              ? "Tổng hợp nhận đơn"
              : facilityTypeName ??
                (typeCodeFromPath ? typeCodeFromPath : "Danh sách đơn hàng")}
          </Typography>
          {optionsLoading || optionsFetching ? (
            <CircularProgress size={18} />
          ) : null}
        </Box>

        <Grid
          container
          spacing={0}
          alignItems="center"
          sx={{
            columnGap: { xs: 0, md: 4 },
            rowGap: 2,
            justifyContent: "space-between",
          }}
        >
          {/* Left column: search */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "start",
                gap: 2,
                height: "100%",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <TextField
                type="text"
                placeholder="Tìm kiếm đơn hàng"
                variant="outlined"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchOutlinedIcon sx={{ color: "#888" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  width: "100%",
                }}
                fullWidth
              />
            </Box>
          </Grid>

          {/* Right column: button */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
            >
              <Button
                sx={{
                  width: { xs: "100%", md: 360 },
                  backgroundColor: "transparent",
                  color: "black",
                  fontSize: { xs: "16px", md: "20px" },
                  fontWeight: "bold",
                  borderRadius: 2,
                  textTransform: "uppercase",
                  minHeight: { xs: 56, sm: 80, md: 120 },
                  flexDirection: "column",
                  gap: 0.5,
                }}
                variant="contained"
                size="large"
                onClick={() => setOpenAssignDialog(true)}
              >
                <Typography
                  variant="button"
                  fontSize={{ xs: 16, md: 20 }}
                  fontWeight="bold"
                >
                  ĐÃ NHẬN
                </Typography>
                <Typography
                  variant="body2"
                  fontSize={{ xs: 20, md: 30 }}
                  fontWeight="bold"
                >
                  {facilityLoading ? "..." : facilityData?.totalElements ?? 0}
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Bảng đơn hàng chưa phân công */}
        <OrdersUnassignedTable
          facilityTypeId={facilityTypeId}
          facilityTypeName={facilityTypeName}
          typeCode={typeCodeFromPath ?? undefined}
          onAccept={handleAcceptOrder}
        />

        {/* Form nhận đơn */}
        <RecieveOrderForm
          open={openDialog}
          order={selectedOrder}
          onClose={handleCloseDialog}
          onSubmit={handleConfirmUpdate}
        />
      </Box>

      {/* Assign Table, load từ facility API */}
      <OrdersAssignTable
        // orders={facilitiesAsOrders}
        // open={openAssignDialog}
        // onClose={() => setOpenAssignDialog(false)}
        orders={facilityData?.content ?? []}
        open={openAssignDialog}
        onClose={() => setOpenAssignDialog(false)}
      />
    </>
  );
};

export default MainPage;
