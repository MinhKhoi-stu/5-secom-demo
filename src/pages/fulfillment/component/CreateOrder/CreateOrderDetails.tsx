import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import UploadImage from "components/common/UploadImage";
import { FacilityDto } from "dto/facility/facility.dto";
import { useFindAllFacility } from "hooks/facility/useFindAllFacility";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { OptionDto } from "dto/option/option.dto";
import { FormField } from "pages/User/components/FormField";

interface Props {
  facility: FacilityDto; // parent customer/general info (used only to copy customer-level fields into snapshot)
  onAddOrder: (snapshot: FacilityDto) => void; // called when user clicks '+'
  open: boolean;
}

const CreateOrderDetails = ({ facility, onAddOrder, open }: Props) => {
  // fetch facilities (used to build labelingStandard options)
  const {
    data: facilitiesData,
    isLoading: isLoadingFacilities,
    isError: isErrorFacilities,
  } = useFindAllFacility({ page: 0, size: 50, codeOrName: "" });

  const facilities: FacilityDto[] = facilitiesData?.content || [];

  // facility-type options
  const {
    data: facilityTypeData,
    isLoading: isLoadingFacilityType,
    isError: isErrorFacilityType,
  } = useFindOptionsByGroup("facility-type", 0, 50, "", "orderNo,asc");

  const facilityTypeOptions: OptionDto[] = facilityTypeData?.content || [];

  // --- SKU Design & State-Test hooks (kept here) ---
  const { data: skuDesignsData, isLoading: isLoadingSku } =
    useFindOptionsByGroup("skudesigns", 0, 200, "");
  const skuDesigns: any[] = skuDesignsData?.content || [];

  // local skuParentId used to filter state-test options (call BE with parentId if supported)
  const [skuParentId, setSkuParentId] = useState<string | null>(null);

  const {
    data: stateTestData,
    isLoading: isLoadingStateTest,
    isError: isErrorStateTest,
  } = useFindOptionsByGroup(
    "state-test",
    0,
    200,
    "",
    undefined,
    skuParentId ?? undefined
  );
  const rawStateTest: any[] = stateTestData?.content || [];
  const stateTestOptions = skuParentId
    ? rawStateTest.filter((opt) => (opt?.parentOpt as any)?.id === skuParentId)
    : rawStateTest;

  // LOCAL UI STATES (detached from parent until user clicks '+')
  const [noteText, setNoteText] = useState<string>(
    (facility?.note ?? "").toString()
  );
  const [labelingValue, setLabelingValue] = useState<string>(
    (facility?.labelingStandard ?? "").toString()
  );
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
    facility?.sampleSource && facility.sampleSource.toString().length > 0
      ? (facility.sampleSource as any as string)
      : null
  );
  const [facilityTypeName, setFacilityTypeName] = useState<string>(
    facility?.facilityType?.name ?? ""
  );

  // ---- IMPORTANT: selectedSkuId luôn lưu "id" của skuDesign ----
  const [selectedSkuId, setSelectedSkuId] = useState<string>("");
  const [selectedStateId, setSelectedStateId] = useState<string>(
    facility?.stateOpt?.id ?? ""
  );

  // local area (Số lượng) independent from parent
  const [localArea, setLocalArea] = useState<number | "">(
    (facility?.area ?? 0) === 0 ? "" : facility?.area ?? ""
  );

  // Build unique labelingStandard options from facilities
  const labelingOptions = useMemo(() => {
    const vals = facilities
      .map((f) => (f.labelingStandard ?? "").toString().trim())
      .filter((s) => s.length > 0);
    return Array.from(new Set(vals));
  }, [facilities]);

  // Prefill local UI states whenever parent facility or dialog open changes
  useEffect(() => {
    if (!open) {
      // keep local state if dialog closed
      return;
    }

    // sync from parent facility (but only to initialize local inputs)
    setNoteText((facility?.note ?? "").toString());
    setLabelingValue((facility?.labelingStandard ?? "").toString());
    setImagePreviewUrl(
      facility?.sampleSource && facility.sampleSource.toString().length > 0
        ? (facility.sampleSource as any as string)
        : null
    );
    setFacilityTypeName(facility?.facilityType?.name ?? "");

    // Synchronous mapping from facility.skuOpt -> selectedSkuId.
    // Support several shapes: { id }, or only { code } or { name } (try to find id by code/name)
    if (facility?.skuOpt?.id) {
      setSelectedSkuId(facility.skuOpt.id);
    } else if (facility?.skuOpt?.code) {
      const byCode = skuDesigns.find((s) => s.code === facility.skuOpt?.code);
      setSelectedSkuId(byCode ? byCode.id : "");
    } else if (facility?.skuOpt?.name) {
      const byName = skuDesigns.find((s) => s.name === facility.skuOpt?.name);
      setSelectedSkuId(byName ? byName.id : "");
    } else {
      setSelectedSkuId("");
    }

    // sync selected state
    setSelectedStateId(facility?.stateOpt?.id ?? "");

    setLocalArea((facility?.area ?? 0) === 0 ? "" : facility?.area ?? "");

    // if we have a selectedSkuId and skuDesigns loaded, compute parentId
    if ((facility?.skuOpt?.id || selectedSkuId) && skuDesigns.length > 0) {
      const idToCheck = facility?.skuOpt?.id ?? selectedSkuId;
      const sel = skuDesigns.find((s) => s.id === idToCheck);
      const parentId = (sel as any)?.parentOpt?.id ?? null;
      setSkuParentId(parentId);
    } else {
      setSkuParentId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facility, open, skuDesigns.length]);

  // whenever selectedSkuId changes (user action), update parent and compute parentId locally
  const handleSkuChange = (newSkuId: string) => {
    setSelectedSkuId(newSkuId);

    // const sel = skuDesigns.find((o: any) => o.id === newSkuId);
    const sel = skuDesigns.find((s) => s.id === newSkuId);
    if (sel) {
      const parentId = (sel as any)?.parentOpt?.id ?? null;
      setSkuParentId(parentId);

      // clear local selectedStateId (size)
      setSelectedStateId("");
    } else {
      setSkuParentId(null);
      setSelectedStateId("");
    }
  };

  const handleStateChange = (newStateId: string) => {
    setSelectedStateId(newStateId);
  };

  const handleLabelingChange = (e: any) => {
    const v = e.target.value as string;
    setLabelingValue(v);
  };

  const handleFacilityTypeChange = (e: any) => {
    const v = e.target.value as string;
    setFacilityTypeName(v);
  };

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
  };

  // --- handle area change locally ---
  const handleAreaChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "area") {
      setLocalArea(value === "" ? "" : Number(value));
    } else {
      // fallback in case other fields reused
    }
  };

  // Build snapshot and pass to parent on '+', then clear local inputs
  const handleAdd = () => {
    const skuSel = skuDesigns.find((s) => s.id === selectedSkuId);
    const stateSel = stateTestOptions.find((s) => s.id === selectedStateId);
    const facilityTypeFound = facilityTypeOptions.find(
      (o) => o.name === facilityTypeName
    );

    const snapshot: FacilityDto = JSON.parse(JSON.stringify({ ...facility }));

    // set skuOpt from skuSel (if found) — otherwise keep empty object with safe defaults
    snapshot.skuOpt = skuSel
      ? { id: skuSel.id, code: skuSel.code ?? "", name: skuSel.name ?? "" }
      : {
          id: facility?.skuOpt?.id ?? "",
          code: facility?.skuOpt?.code ?? facility?.code ?? "",
          name: facility?.skuOpt?.name ?? "",
        };

    snapshot.stateOpt = stateSel
      ? {
          id: stateSel.id,
          code: stateSel.code ?? "",
          name: stateSel.name ?? "",
        }
      : {
          id: facility?.stateOpt?.id ?? "",
          code: facility?.stateOpt?.code ?? "",
          name: facility?.stateOpt?.name ?? "",
        };

    snapshot.area =
      typeof localArea === "number"
        ? localArea
        : localArea === ""
        ? 0
        : Number(localArea);

    snapshot.note = noteText || null;
    snapshot.labelingStandard = labelingValue || null;
    snapshot.sampleSource = imagePreviewUrl || null;

    snapshot.facilityType = facilityTypeFound
      ? {
          id: facilityTypeFound.id,
          code: facilityTypeFound.code ?? "",
          name: facilityTypeFound.name ?? "",
          description: (facilityTypeFound as any).description ?? null,
        }
      : {
          id: facility?.facilityType?.id ?? "",
          code: facility?.facilityType?.code ?? "",
          name: facility?.facilityType?.name ?? "",
          description: facility?.facilityType?.description ?? null,
        };

    // send snapshot up to parent (parent will add to its temp array)
    onAddOrder(snapshot);

    // CLEAR local inputs in details only (parent `facility` is intentionally NOT modified)
    setSelectedSkuId("");
    setSelectedStateId("");
    setSkuParentId(null);
    setNoteText("");
    setLabelingValue("");
    setImagePreviewUrl(null);
    setFacilityTypeName("");
    setLocalArea("");
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: 3,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      <Typography color="black" fontWeight="bold">
        THÔNG TIN ĐƠN HÀNG
      </Typography>

      {/* --- SKU Design + Kích thước --- */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <FormControl size="small" sx={{ width: "50%" }}>
          <InputLabel id="sku-design-label">Nhập SKU Design</InputLabel>
          <Select
            labelId="sku-design-label"
            value={selectedSkuId || ""}
            label="Nhập SKU Design"
            onChange={(e) => handleSkuChange(e.target.value as string)}
          >
            {isLoadingSku ? (
              <MenuItem disabled>Đang tải...</MenuItem>
            ) : skuDesigns.length > 0 ? (
              skuDesigns.map((opt: any) => (
                <MenuItem key={opt.id} value={opt.id}>
                  {opt.code}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Không có dữ liệu
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl
          size="small"
          sx={{ width: "50%" }}
          disabled={!selectedSkuId}
        >
          <InputLabel id="state-test-label">Kích thước</InputLabel>
          <Select
            labelId="state-test-label"
            value={selectedStateId || ""}
            label="Kích thước"
            onChange={(e) => handleStateChange(e.target.value as string)}
          >
            {isLoadingStateTest ? (
              <MenuItem disabled>Đang tải...</MenuItem>
            ) : !selectedSkuId ? (
              <MenuItem value="" disabled>
                Hãy chọn SKU trước
              </MenuItem>
            ) : stateTestOptions.length > 0 ? (
              stateTestOptions.map((opt: any) => (
                <MenuItem key={opt.id} value={opt.id}>
                  {opt.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                Không có dữ liệu phù hợp SKU
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>

      {/* --- SỐ LƯỢNG (moved here) --- */}
      <FormField
        label="Số lượng"
        name="area"
        type="text"
        value={localArea === 0 ? "" : (localArea as any)}
        onChange={handleAreaChange}
      />

      {/* Thông tin đơn hàng (note) */}
      <TextField
        placeholder="Nhập thông tin đơn hàng"
        fullWidth
        multiline
        rows={3}
        value={noteText}
        onChange={(e) => {
          const v = e.target.value;
          setNoteText(v);
        }}
      />
      {/* <FormField
        label="SKU Fulfill"
        name="code"
        type="text"
        value={formData.code || ""}
        onChange={handleChange}
      /> */}

      <FormControl size="small" fullWidth>
        <InputLabel id="labeling-standard-label">Loại hàng</InputLabel>
        <Select
          labelId="labeling-standard-label"
          value={labelingValue}
          label="Loại hàng"
          onChange={handleLabelingChange}
        >
          {isLoadingFacilities ? (
            <MenuItem disabled>Đang tải...</MenuItem>
          ) : isErrorFacilities ? (
            <MenuItem disabled>Lỗi tải dữ liệu</MenuItem>
          ) : labelingOptions.length > 0 ? (
            labelingOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              Không có dữ liệu
            </MenuItem>
          )}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <UploadImage onFileSelect={handleImageUpload} />
        {imagePreviewUrl ? (
          <Box
            sx={{
              mt: 1,
              border: "1px solid #eee",
              borderRadius: "8px",
              p: 1,
              maxWidth: 320,
            }}
          >
            <Typography variant="caption" sx={{ color: "gray" }}>
              Xem trước hình (sampleSource):
            </Typography>
            <img
              src={imagePreviewUrl}
              alt="preview"
              style={{ width: "100%", borderRadius: 6 }}
            />
          </Box>
        ) : null}
      </Box>

      <FormControl size="small" fullWidth>
        <InputLabel id="facility-type-label">Trạng thái</InputLabel>
        <Select
          labelId="facility-type-label"
          value={facilityTypeName}
          label="Trạng thái"
          onChange={handleFacilityTypeChange}
        >
          {isLoadingFacilityType ? (
            <MenuItem disabled>Đang tải...</MenuItem>
          ) : isErrorFacilityType ? (
            <MenuItem disabled>Lỗi tải dữ liệu</MenuItem>
          ) : facilityTypeOptions.length > 0 ? (
            facilityTypeOptions.map((opt: OptionDto) => (
              <MenuItem key={opt.id} value={opt.name ?? ""}>
                {opt.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" disabled>
              Không có dữ liệu
            </MenuItem>
          )}
        </Select>
      </FormControl>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button
          onClick={handleAdd}
          sx={{
            borderRadius: "50px",
            width: "20%",
            backgroundColor: "orangered",
            color: "white",
            ":hover": { backgroundColor: "tomato" },
          }}
        >
          +
        </Button>
      </Box>
    </Box>
  );
};

export default CreateOrderDetails;
