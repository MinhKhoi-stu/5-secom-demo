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
import { Order } from "types/OrderTable";
import { mockOrders } from "../../../../data";

/**
 * MainPage: ưu tiên đọc typeCode từ location.state.typeCode (Sidebar truyền vào).
 * Nếu không có state -> fallback getTypeCodeFromPath(location.pathname).
 * Khi effectiveTypeCode thay đổi, ép refetch options (nếu hook hỗ trợ).
 */

const PAGE = 0;
const SIZE = 20;

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

  // PRIORITY: typeCode passed in navigate state from Sidebar
  const locState = (location.state as any) ?? {};
  const stateTypeCode: string | undefined =
    locState?.typeCode ?? locState?.preferredTypeCode ?? undefined;

  // fallback: parse from pathname (/facility/<typeCode>)
  const parsedTypeCode = getTypeCodeFromPath(location.pathname) ?? undefined;

  // effective type code that we will use to query options
  const effectiveTypeCode = stateTypeCode ?? parsedTypeCode;

  // facility type info extracted from options API
  const [facilityTypeId, setFacilityTypeId] = useState<string | undefined>(
    undefined
  );
  const [facilityTypeName, setFacilityTypeName] = useState<string | undefined>(
    undefined
  );

  // Query options with the effectiveTypeCode (state preferred)
  const optionsQuery = useFindOptionsByGroup(
    "facility-type",
    PAGE,
    SIZE,
    effectiveTypeCode ?? undefined
  ) as any;

  const {
    data: optionsData,
    isLoading: optionsLoading,
    isFetching: optionsFetching,
    refetch: refetchOptions,
  } = optionsQuery ?? {};

  // If effectiveTypeCode changed, force refetch (safe even if hook auto-fetches)
  useEffect(() => {
    if (typeof refetchOptions === "function") {
      try {
        refetchOptions();
      } catch (e) {
        // ignore
      }
    }
    // also reset facility ids while loading new options
    setFacilityTypeId(undefined);
    setFacilityTypeName(undefined);
  }, [effectiveTypeCode]);

  // extract facilityTypeId/name when optionsData arrives (robust search)
  useEffect(() => {
    if (!optionsLoading && !optionsFetching && optionsData) {
      const expectedCode = effectiveTypeCode ?? undefined;

      const findExactId = (
        data: any,
        expected?: string
      ): string | undefined => {
        if (!expected) return undefined;
        const stack: any[] = [data];
        while (stack.length) {
          const node = stack.pop();
          if (!node || typeof node !== "object") continue;

          if (Array.isArray(node)) {
            for (const el of node) {
              if (!el || typeof el !== "object") continue;

              if (
                el.code === expected ||
                el.value === expected ||
                el.name === expected ||
                el.label === expected
              ) {
                return (
                  el.id ?? el.value ?? el.optionGroupId ?? el.optionGroup?.id
                );
              }

              if (el.data && typeof el.data === "object") {
                if (
                  el.data.code === expected ||
                  el.data.value === expected ||
                  el.data.name === expected
                ) {
                  return (
                    el.id ?? el.value ?? el.optionGroupId ?? el.optionGroup?.id
                  );
                }
              }
            }
          }

          for (const k of Object.keys(node)) {
            const v = node[k];
            if (v && typeof v === "object") stack.push(v);
          }
        }
        return undefined;
      };

      const findExactName = (
        data: any,
        expected?: string
      ): string | undefined => {
        if (!expected) return undefined;
        const stack: any[] = [data];
        while (stack.length) {
          const node = stack.pop();
          if (!node || typeof node !== "object") continue;

          if (Array.isArray(node)) {
            for (const el of node) {
              if (!el || typeof el !== "object") continue;
              if (
                el.code === expected ||
                el.value === expected ||
                el.name === expected ||
                el.label === expected
              ) {
                return el.name ?? el.label ?? el.value ?? el.title;
              }
              if (el.data && typeof el.data === "object") {
                if (
                  el.data.code === expected ||
                  el.data.value === expected ||
                  el.data.name === expected
                ) {
                  return el.data.name ?? el.data.label ?? el.data.value;
                }
              }
            }
          }

          for (const k of Object.keys(node)) {
            const v = node[k];
            if (v && typeof v === "object") stack.push(v);
          }
        }
        return undefined;
      };

      const exactId = findExactId(optionsData, expectedCode);
      if (exactId) {
        setFacilityTypeId(exactId);
        const exactName = findExactName(optionsData, expectedCode);
        setFacilityTypeName(
          exactName ??
            extractFacilityTypeNameFromOptions(optionsData) ??
            undefined
        );
      } else {
        // fallback
        const id = extractFacilityTypeIdFromOptions(optionsData);
        const name = extractFacilityTypeNameFromOptions(optionsData);
        setFacilityTypeId(id);
        setFacilityTypeName(name ?? undefined);
      }
    } else {
      // if no effectiveTypeCode -> reset
      if (!effectiveTypeCode) {
        setFacilityTypeId(undefined);
        setFacilityTypeName(undefined);
      }
    }
  }, [optionsData, optionsLoading, optionsFetching, effectiveTypeCode]);

  // get user profile
  const { data: profileData } = useGetMyProfile({ enabled: true });
  const username = profileData?.username;

  // facility query (enabled only when facilityTypeId + username available)
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

  // map facility -> orders
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

  // debug logs (xóa nếu cần)
  useEffect(() => {
    // helpful to debug when you click menu — you will see which effectiveTypeCode is used
    // eslint-disable-next-line no-console
    console.log(
      "MainPage: effectiveTypeCode, facilityTypeId, location.pathname, location.state:",
      {
        effectiveTypeCode,
        facilityTypeId,
        pathname: location.pathname,
        state: locState,
      }
    );
  }, [
    effectiveTypeCode,
    facilityTypeId,
    location.pathname,
    JSON.stringify(locState),
  ]);

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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="black">
            {effectiveTypeCode === MAIN_FULFILLMENT_TYPECODE
              ? "Tổng hợp nhận đơn"
              : facilityTypeName ??
                (effectiveTypeCode ? effectiveTypeCode : "Danh sách đơn hàng")}
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

        <OrdersUnassignedTable
          facilityTypeId={facilityTypeId}
          facilityTypeName={facilityTypeName}
          typeCode={effectiveTypeCode ?? undefined}
          onAccept={handleAcceptOrder}
        />

        <RecieveOrderForm
          open={openDialog}
          order={selectedOrder}
          onClose={handleCloseDialog}
          onSubmit={handleConfirmUpdate}
        />
      </Box>

      <OrdersAssignTable
        orders={facilityData?.content ?? []}
        open={openAssignDialog}
        onClose={() => setOpenAssignDialog(false)}
      />
    </>
  );
};

export default MainPage;
