import {
  Box,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import OrderStatusBox from "./order-status-box";
import OrderTable from "./order-table";
import { useEffect, useState } from "react";
import { useFindAllFacility } from "hooks/facility/useFindAllFacility";
import { useStatisticAllFacility } from "hooks/dashboard/useStatisticAllFacility";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { OptionDto } from "dto/option/option.dto";
import { useSearchOrgunit } from "hooks/orgunit/useSearchOrgunit";
import { FacilityDto } from "dto/facility/facility.dto";
import CreateOrder from "../CreateOrder/CreateOrder";

type OrgUnit = {
  id: string;
  name: string;
  lvl?: number;
  code?: string;
  namePath?: string[];
};

const MainFulfillment = () => {
  const [search, setSearch] = useState("");

  const [selectedFacilityTypeId, setSelectedFacilityTypeId] =
    useState<string>("");
  const [prefillFacility, setPrefillFacility] = useState<FacilityDto | null>(
    null
  );

  const orgUnitId = "ltAKs4jLw8N7q7SHeUR2Kw==";

  //ORDER STATUS BOX
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useStatisticAllFacility(orgUnitId);

  //SELECT FACILITY-TYPE
  const {
    data: facilityTypePage,
    isLoading: typesLoading,
    isError: typesError,
  } = useFindOptionsByGroup("facility-type", 0, 10, "", "orderNo,asc");

  //OPEN ADDORDER DIALOG
  const [openAddOrder, setOpenAddOrder] = useState(false);

  const {
    data: prefillData,
    isLoading: prefillLoading,
    isError: prefillError,
  } = useFindAllFacility({
    page: 0,
    size: 50,
    codeOrName: search,
    facilityTypeId: selectedFacilityTypeId || undefined,
  });

  const handleOpen = () => {
    const first = prefillData?.content?.[0] ?? null;
    setPrefillFacility(first);
    setOpenAddOrder(true);
  };

  const handleClose = () => {
    setOpenAddOrder(false);
    setPrefillFacility(null);
  };

  //SEARCH lvl ORGUNIT
  const { data: lvl1Data, isLoading: lvl1Loading } = useSearchOrgunit({
    lvl: 1,
  });
  const { data: lvl2Data, isLoading: lvl2Loading } = useSearchOrgunit({
    lvl: 2,
  });
  const { data: lvl3Data, isLoading: lvl3Loading } = useSearchOrgunit({
    lvl: 3,
  });

  const [orgLevel1, setOrgLevel1] = useState<OrgUnit[]>([]);
  const [orgLevel2, setOrgLevel2] = useState<OrgUnit[]>([]);
  const [orgLevel3, setOrgLevel3] = useState<OrgUnit[]>([]);

  const extractList = (data: any): OrgUnit[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.content && Array.isArray(data.content)) return data.content;
    if (data.items && Array.isArray(data.items)) return data.items;
    return [];
  };

  useEffect(() => {
    setOrgLevel1(extractList(lvl1Data));
  }, [lvl1Data]);

  useEffect(() => {
    setOrgLevel2(extractList(lvl2Data));
  }, [lvl2Data]);

  useEffect(() => {
    setOrgLevel3(extractList(lvl3Data));
  }, [lvl3Data]);

  // Optional: persist vào localStorage để "lưu 3 lvl đó vào web"
  useEffect(() => {
    if (orgLevel1.length || orgLevel2.length || orgLevel3.length) {
      try {
        localStorage.setItem("orgLevel1", JSON.stringify(orgLevel1));
        localStorage.setItem("orgLevel2", JSON.stringify(orgLevel2));
        localStorage.setItem("orgLevel3", JSON.stringify(orgLevel3));
      } catch (e) {
        // ignore
      }
    }
  }, [orgLevel1, orgLevel2, orgLevel3]);

  return (
    <>
      {/* BOX TRẠNG THÁI SỐ LƯỢNG ĐƠN HÀNG */}
      <Box
        sx={{
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
          width: "96%",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: 3,
          display: "flex",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box p={2} sx={{ width: "100%" }}>
          {statsLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {statsError && (
            <Typography align="center" color="error">
              Không tải được thống kê.
            </Typography>
          )}

          {!statsLoading && !statsError && (
            <Grid container spacing={2} justifyContent="center">
              {stats?.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={item.id ?? item.name ?? ""}
                >
                  <OrderStatusBox
                    color="lightsalmon"
                    count={item.quantity}
                    label={item.name ?? "-"}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      {/* BOX TÌM KIẾM */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          padding: 2,
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm Order: SKU fulfill, Order ID, Tên khách hàng..."
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon sx={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel id="facility-type-label">Trạng thái</InputLabel>
          <Select
            labelId="facility-type-label"
            label="Trạng thái"
            value={selectedFacilityTypeId}
            onChange={(e) =>
              setSelectedFacilityTypeId(e.target.value as string)
            }
            disabled={typesLoading || typesError}
          >
            <MenuItem value="">Tất cả</MenuItem>

            {typesLoading && <MenuItem disabled>Đang tải...</MenuItem>}
            {typesError && <MenuItem disabled>Lỗi tải loại cơ sở</MenuItem>}

            {facilityTypePage?.content?.map((opt: OptionDto) => (
              <MenuItem key={opt.id} value={opt.id}>
                {opt.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* BOX THÔNG TIN ĐƠN HÀNG */}
      <OrderTable
        search={search}
        facilityTypeId={selectedFacilityTypeId || undefined}
      />
      <div
        style={{
          display: "flex",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={handleOpen}
          sx={{
            color: "white",
            backgroundColor: "red",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          Thêm đơn hàng
        </Button>
      </div>

      {/* ADDORDER DIALOG */}
      <CreateOrder
        open={openAddOrder}
        onClose={handleClose}
        level1Options={orgLevel1}
        level2Options={orgLevel2}
        level3Options={orgLevel3}
        initialValues={{
          code: prefillFacility?.code ?? "",
          idNumber: prefillFacility?.idNumber ?? "",
          name: prefillFacility?.name ?? "",
          address: prefillFacility?.address ?? "",
          phone: prefillFacility?.phone ?? "",
          skuOpt: prefillFacility?.skuOpt ?? undefined,
        }}
        orgUnitId={orgUnitId}
      />
    </>
  );
};

export default MainFulfillment;
