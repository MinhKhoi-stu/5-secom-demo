// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import UploadImage from "components/common/UploadImage";
// import { FacilityDto } from "dto/facility/facility.dto";
// import { useFindAllFacility } from "hooks/facility/useFindAllFacilityCustom";
// import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
// import { processImageUpload } from "utils/convert-img";

// interface Props {
//   facility: FacilityDto;
//   onAddOrder: (snapshot: FacilityDto) => void;
//   open: boolean;
// }

// const CreateOrderDetails = ({ facility, onAddOrder, open }: Props) => {
//   // fetch facilities (used to build labelingStandard options)
//   const {
//     data: facilitiesData,
//     isLoading: isLoadingFacilities,
//     isError: isErrorFacilities,
//   } = useFindAllFacility({ page: 0, size: 50, codeOrName: "" });

//   const facilities: FacilityDto[] = facilitiesData?.content || [];

//   // facility-type options
//   const {
//     data: facilityTypeData,
//     isLoading: isLoadingFacilityType,
//     isError: isErrorFacilityType,
//   } = useFindOptionsByGroup("facility-type", 0, 50, "", "orderNo,asc");

//   const facilityTypeOptions: any[] = facilityTypeData?.content || [];

//   const { data: skuDesignsData, isLoading: isLoadingSku } =
//     useFindOptionsByGroup("skudesigns", 0, 200, "");
//   const skuDesigns: any[] = skuDesignsData?.content || [];

//   const [skuParentId, setSkuParentId] = useState<string | null>(null);

//   const {
//     data: stateTestData,
//     isLoading: isLoadingStateTest,
//     isError: isErrorStateTest,
//   } = useFindOptionsByGroup(
//     "state-test",
//     0,
//     200,
//     "",
//     undefined,
//     skuParentId ?? undefined
//   );
//   const rawStateTest: any[] = stateTestData?.content || [];
//   const stateTestOptions = skuParentId
//     ? rawStateTest.filter((opt) => (opt?.parentOpt as any)?.id === skuParentId)
//     : rawStateTest;

//   const [noteText, setNoteText] = useState<string>(
//     (facility?.note ?? "").toString()
//   );
//   const [labelingValue, setLabelingValue] = useState<string>(
//     (facility?.labelingStandard ?? "").toString()
//   );
//   const [facilityTypeName, setFacilityTypeName] = useState<string>(
//     facility?.facilityType?.name ?? ""
//   );

//   const [selectedSkuId, setSelectedSkuId] = useState<string>("");
//   const [selectedStateId, setSelectedStateId] = useState<string>(
//     facility?.stateOpt?.id ?? ""
//   );

//   const [localArea, setLocalArea] = useState<number | "">(
//     (facility?.area ?? 0) === 0 ? "" : facility?.area ?? ""
//   );

//   // image upload states
//   const [imageUploading, setImageUploading] = useState<boolean>(false);
//   const [imageUploadError, setImageUploadError] = useState<string | null>(null);

//   // IMPORTANT: keep local preview state instead of mutating props directly
//   const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(
//     facility?.sampleSource ?? null
//   );

//   const labelingOptions = useMemo(() => {
//     const vals = facilities
//       .map((f) => (f.labelingStandard ?? "").toString().trim())
//       .filter((s) => s.length > 0);
//     return Array.from(new Set(vals));
//   }, [facilities]);

//   useEffect(() => {
//     if (!open) {
//       return;
//     }

//     setNoteText((facility?.note ?? "").toString());
//     setLabelingValue((facility?.labelingStandard ?? "").toString());
//     setFacilityTypeName(facility?.facilityType?.name ?? "");

//     if (facility?.skuOpt?.id) {
//       setSelectedSkuId(facility.skuOpt.id);
//     } else if (facility?.skuOpt?.code) {
//       const byCode = skuDesigns.find((s) => s.code === facility.skuOpt?.code);
//       setSelectedSkuId(byCode ? byCode.id : "");
//     } else if (facility?.skuOpt?.name) {
//       const byName = skuDesigns.find((s) => s.name === facility.skuOpt?.name);
//       setSelectedSkuId(byName ? byName.id : "");
//     } else {
//       setSelectedSkuId("");
//     }

//     setSelectedStateId(facility?.stateOpt?.id ?? "");

//     setLocalArea((facility?.area ?? 0) === 0 ? "" : facility?.area ?? "");

//     if ((facility?.skuOpt?.id || selectedSkuId) && skuDesigns.length > 0) {
//       const idToCheck = facility?.skuOpt?.id ?? selectedSkuId;
//       const sel = skuDesigns.find((s) => s.id === idToCheck);
//       const parentId = (sel as any)?.parentOpt?.id ?? null;
//       setSkuParentId(parentId);
//     } else {
//       setSkuParentId(null);
//     }

//     // Reset upload error/uploading state and sync local preview from facility.sampleSource when opening
//     setImageUploading(false);
//     setImageUploadError(null);
//     setImagePreviewUrl(facility?.sampleSource ?? null);

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [facility, open, skuDesigns.length]);

//   const handleSkuChange = (newSkuId: string) => {
//     setSelectedSkuId(newSkuId);

//     const sel = skuDesigns.find((s) => s.id === newSkuId);
//     if (sel) {
//       const parentId = (sel as any)?.parentOpt?.id ?? null;
//       setSkuParentId(parentId);

//       setSelectedStateId("");
//     } else {
//       setSkuParentId(null);
//       setSelectedStateId("");
//     }
//   };

//   const handleStateChange = (newStateId: string) => {
//     setSelectedStateId(newStateId);
//   };

//   const handleLabelingChange = (e: any) => {
//     const v = e.target.value as string;
//     setLabelingValue(v);
//   };

//   const handleFacilityTypeChange = (e: any) => {
//     const v = e.target.value as string;
//     setFacilityTypeName(v);
//   };

//   /**
//    * Xử lý upload ảnh:
//    * - validate & convert sang base64 data URL bằng processImageUpload
//    * - set imagePreviewUrl = base64 data URL (dùng để snapshot.sampleSource khi add)
//    * - hiển thị lỗi nếu có
//    */
//   const handleImageUpload = async (file: File) => {
//     setImageUploadError(null);
//     setImageUploading(true);

//     try {
//       const result: any = await processImageUpload(
//         file,
//         { maxSizeInMB: 5 },
//         false
//       );

//       if (!result || !result.success) {
//         throw new Error(result?.error || "Không thể xử lý ảnh");
//       }

//       // result.data.base64 là data URL (ví dụ "data:image/png;base64,....")
//       const base64 = result.data?.base64 ?? null;
//       if (!base64) {
//         throw new Error("Không nhận được dữ liệu ảnh từ xử lý.");
//       }

//       // store into local preview state (do NOT mutate props directly)
//       setImagePreviewUrl(base64);
//     } catch (err: any) {
//       console.error("Upload image error:", err);
//       setImageUploadError(err?.message ?? "Lỗi khi xử lý ảnh");
//     } finally {
//       setImageUploading(false);
//     }
//   };

//   const handleAreaChange = (e: any) => {
//     const { name, value } = e.target;
//     if (name === "area") {
//       setLocalArea(value === "" ? "" : Number(value));
//     } else {
//       // fallback
//     }
//   };

//   const handleAdd = () => {
//     const skuSel = skuDesigns.find((s) => s.id === selectedSkuId);
//     const stateSel = stateTestOptions.find((s) => s.id === selectedStateId);
//     const facilityTypeFound = facilityTypeOptions.find(
//       (o) => o.name === facilityTypeName
//     );

//     const snapshot: FacilityDto = JSON.parse(JSON.stringify({ ...facility }));

//     // ensure we include the uploaded image (local preview) into snapshot
//     snapshot.sampleSource = imagePreviewUrl ?? facility?.sampleSource ?? null;

//     snapshot.skuOpt = skuSel
//       ? { id: skuSel.id, code: skuSel.code ?? "", name: skuSel.name ?? "" }
//       : {
//           id: facility?.skuOpt?.id ?? "",
//           code: facility?.skuOpt?.code ?? facility?.code ?? "",
//           name: facility?.skuOpt?.name ?? "",
//         };

//     snapshot.stateOpt = stateSel
//       ? {
//           id: stateSel.id,
//           code: stateSel.code ?? "",
//           name: stateSel.name ?? "",
//         }
//       : {
//           id: facility?.stateOpt?.id ?? "",
//           code: facility?.stateOpt?.code ?? "",
//           name: facility?.stateOpt?.name ?? "",
//         };

//     snapshot.area =
//       typeof localArea === "number"
//         ? localArea
//         : localArea === ""
//         ? 0
//         : Number(localArea);

//     snapshot.note = noteText || null;
//     snapshot.labelingStandard = labelingValue || null;
//     snapshot.facilityType = facilityTypeFound
//       ? {
//           id: facilityTypeFound.id,
//           code: facilityTypeFound.code ?? "",
//           name: facilityTypeFound.name ?? "",
//           description: (facilityTypeFound as any).description ?? null,
//         }
//       : {
//           id: facility?.facilityType?.id ?? "",
//           code: facility?.facilityType?.code ?? "",
//           name: facility?.facilityType?.name ?? "",
//           description: facility?.facilityType?.description ?? null,
//         };

//     onAddOrder(snapshot);

//     // reset form fields (local to this component)
//     setSelectedSkuId("");
//     setSelectedStateId("");
//     setSkuParentId(null);
//     setNoteText("");
//     setLabelingValue("");
//     setFacilityTypeName("");
//     setLocalArea("");
//     setImageUploadError(null);
//     setImageUploading(false);
//     setImagePreviewUrl(null);
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "white",
//         padding: 3,
//         borderRadius: "12px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//         height: "100%",
//       }}
//     >
//       <Typography color="black" fontWeight="bold">
//         THÔNG TIN ĐƠN HÀNG
//       </Typography>

//       {/* --- SKU Design + Kích thước --- */}
//       <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//         <FormControl size="small" sx={{ width: "50%" }}>
//           <InputLabel id="sku-design-label">Nhập SKU Design</InputLabel>
//           <Select
//             labelId="sku-design-label"
//             value={selectedSkuId || ""}
//             label="Nhập SKU Design"
//             onChange={(e) => handleSkuChange(e.target.value as string)}
//           >
//             {isLoadingSku ? (
//               <MenuItem disabled>Đang tải...</MenuItem>
//             ) : skuDesigns.length > 0 ? (
//               skuDesigns.map((opt: any) => (
//                 <MenuItem key={opt.id} value={opt.id}>
//                   {opt.code}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem value="" disabled>
//                 Không có dữ liệu
//               </MenuItem>
//             )}
//           </Select>
//         </FormControl>

//         <FormControl
//           size="small"
//           sx={{ width: "50%" }}
//           disabled={!selectedSkuId}
//         >
//           <InputLabel id="state-test-label">Kích thước</InputLabel>
//           <Select
//             labelId="state-test-label"
//             value={selectedStateId || ""}
//             label="Kích thước"
//             onChange={(e) => handleStateChange(e.target.value as string)}
//           >
//             {isLoadingStateTest ? (
//               <MenuItem disabled>Đang tải...</MenuItem>
//             ) : !selectedSkuId ? (
//               <MenuItem value="" disabled>
//                 Hãy chọn SKU trước
//               </MenuItem>
//             ) : stateTestOptions.length > 0 ? (
//               stateTestOptions.map((opt: any) => (
//                 <MenuItem key={opt.id} value={opt.id}>
//                   {opt.name}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem value="" disabled>
//                 Không có dữ liệu phù hợp SKU
//               </MenuItem>
//             )}
//           </Select>
//         </FormControl>
//       </Box>

//       {/* --- SỐ LƯỢNG (moved here) --- */}
//       <TextField
//         label="Số lượng"
//         name="area"
//         type="number"
//         value={localArea === "" ? "" : localArea}
//         onChange={handleAreaChange}
//         size="small"
//       />

//       {/* Thông tin đơn hàng (note) */}
//       <TextField
//         placeholder="Nhập thông tin đơn hàng"
//         fullWidth
//         multiline
//         rows={3}
//         value={noteText}
//         onChange={(e) => {
//           const v = e.target.value;
//           setNoteText(v);
//         }}
//       />

//       <FormControl size="small" fullWidth>
//         <InputLabel id="labeling-standard-label">Loại hàng</InputLabel>
//         <Select
//           labelId="labeling-standard-label"
//           value={labelingValue}
//           label="Loại hàng"
//           onChange={handleLabelingChange}
//         >
//           {isLoadingFacilities ? (
//             <MenuItem disabled>Đang tải...</MenuItem>
//           ) : isErrorFacilities ? (
//             <MenuItem disabled>Lỗi tải dữ liệu</MenuItem>
//           ) : labelingOptions.length > 0 ? (
//             labelingOptions.map((opt) => (
//               <MenuItem key={opt} value={opt}>
//                 {opt}
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem value="" disabled>
//               Không có dữ liệu
//             </MenuItem>
//           )}
//         </Select>
//       </FormControl>

//       <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//         <UploadImage onFileSelect={handleImageUpload} />

//         {/* upload status */}
//         {imageUploading && (
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <CircularProgress size={18} />
//             <Typography variant="body2">Đang xử lý ảnh...</Typography>
//           </Box>
//         )}

//         {imageUploadError && (
//           <Typography variant="body2" color="error">
//             {imageUploadError}
//           </Typography>
//         )}

//         {imagePreviewUrl || facility.sampleSource ? (
//           <Box
//             sx={{
//               mt: 1,
//               border: "1px solid #eee",
//               borderRadius: "8px",
//               p: 1,
//               maxWidth: 320,
//             }}
//           >
//             <Typography variant="caption" sx={{ color: "gray" }}>
//               Xem trước hình (sampleSource):
//             </Typography>
//             <img
//               src={imagePreviewUrl ?? (facility.sampleSource as any) ?? ""}
//               alt="preview"
//               style={{ width: "100%", borderRadius: 6 }}
//             />
//           </Box>
//         ) : null}
//       </Box>

//       <FormControl size="small" fullWidth>
//         <InputLabel id="facility-type-label">Trạng thái</InputLabel>
//         <Select
//           labelId="facility-type-label"
//           value={facilityTypeName}
//           label="Trạng thái"
//           onChange={handleFacilityTypeChange}
//         >
//           {isLoadingFacilityType ? (
//             <MenuItem disabled>Đang tải...</MenuItem>
//           ) : isErrorFacilityType ? (
//             <MenuItem disabled>Lỗi tải dữ liệu</MenuItem>
//           ) : facilityTypeOptions.length > 0 ? (
//             facilityTypeOptions.map((opt: any) => (
//               <MenuItem key={opt.id} value={opt.name ?? ""}>
//                 {opt.name}
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem value="" disabled>
//               Không có dữ liệu
//             </MenuItem>
//           )}
//         </Select>
//       </FormControl>

//       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
//         <Button
//           onClick={handleAdd}
//           sx={{
//             borderRadius: "50px",
//             width: "20%",
//             backgroundColor: "orangered",
//             color: "white",
//             ":hover": { backgroundColor: "tomato" },
//           }}
//         >
//           +
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CreateOrderDetails;

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FacilityDto } from "dto/facility/facility.dto";
import { useFindAllFacility } from "hooks/facility/useFindAllFacilityCustom";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import {useFileUpload} from "hooks/file-upload/useFileUpload";

interface Props {
  facility: FacilityDto;
  onAddOrder: (snapshot: FacilityDto) => void;
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

  const facilityTypeOptions: any[] = facilityTypeData?.content || [];

  const { data: skuDesignsData, isLoading: isLoadingSku } =
    useFindOptionsByGroup("skudesigns", 0, 200, "");
  const skuDesigns: any[] = skuDesignsData?.content || [];

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

  const [noteText, setNoteText] = useState<string>(
    (facility?.note ?? "").toString()
  );
  const [labelingValue, setLabelingValue] = useState<string>(
    (facility?.labelingStandard ?? "").toString()
  );
  const [facilityTypeName, setFacilityTypeName] = useState<string>(
    facility?.facilityType?.name ?? ""
  );

  const [selectedSkuId, setSelectedSkuId] = useState<string>("");
  const [selectedStateId, setSelectedStateId] = useState<string>(
    facility?.stateOpt?.id ?? ""
  );

  const [localArea, setLocalArea] = useState<number | "">(
    (facility?.area ?? 0) === 0 ? "" : facility?.area ?? ""
  );

  // --- upload ảnh ---
  const {
    uploadFile,
    loading: imageUploading,
    error: imageUploadError,
    data,
  } = useFileUpload();
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(
    facility?.sampleSource ?? null
  );

  const labelingOptions = useMemo(() => {
    const vals = facilities
      .map((f) => (f.labelingStandard ?? "").toString().trim())
      .filter((s) => s.length > 0);
    return Array.from(new Set(vals));
  }, [facilities]);

  useEffect(() => {
    if (!open) {
      return;
    }

    setNoteText((facility?.note ?? "").toString());
    setLabelingValue((facility?.labelingStandard ?? "").toString());
    setFacilityTypeName(facility?.facilityType?.name ?? "");

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

    setSelectedStateId(facility?.stateOpt?.id ?? "");

    setLocalArea((facility?.area ?? 0) === 0 ? "" : facility?.area ?? "");

    if ((facility?.skuOpt?.id || selectedSkuId) && skuDesigns.length > 0) {
      const idToCheck = facility?.skuOpt?.id ?? selectedSkuId;
      const sel = skuDesigns.find((s) => s.id === idToCheck);
      const parentId = (sel as any)?.parentOpt?.id ?? null;
      setSkuParentId(parentId);
    } else {
      setSkuParentId(null);
    }

    // reset upload state
    setUploadedUrl(facility?.sampleSource ?? null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facility, open, skuDesigns.length]);

  const handleSkuChange = (newSkuId: string) => {
    setSelectedSkuId(newSkuId);

    const sel = skuDesigns.find((s) => s.id === newSkuId);
    if (sel) {
      const parentId = (sel as any)?.parentOpt?.id ?? null;
      setSkuParentId(parentId);

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

  const handleAreaChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "area") {
      setLocalArea(value === "" ? "" : Number(value));
    }
  };

  // upload ảnh trực tiếp qua hook
  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const res = await uploadFile(file);
    if (res && res.url) {
      setUploadedUrl(res.url);
    }
  };

  const handleAdd = () => {
    const skuSel = skuDesigns.find((s) => s.id === selectedSkuId);
    const stateSel = stateTestOptions.find((s) => s.id === selectedStateId);
    const facilityTypeFound = facilityTypeOptions.find(
      (o) => o.name === facilityTypeName
    );

    const snapshot: FacilityDto = JSON.parse(JSON.stringify({ ...facility }));

    // gán url ảnh upload vào sampleSource
    snapshot.sampleSource = uploadedUrl ?? facility?.sampleSource ?? null;

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

    onAddOrder(snapshot);

    // reset form fields
    setSelectedSkuId("");
    setSelectedStateId("");
    setSkuParentId(null);
    setNoteText("");
    setLabelingValue("");
    setFacilityTypeName("");
    setLocalArea("");
    setUploadedUrl(null);
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

      {/* --- SỐ LƯỢNG --- */}
      <TextField
        label="Số lượng"
        name="area"
        type="number"
        value={localArea === "" ? "" : localArea}
        onChange={handleAreaChange}
        size="small"
      />

      {/* Thông tin đơn hàng */}
      <TextField
        placeholder="Nhập thông tin đơn hàng"
        fullWidth
        multiline
        rows={3}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />

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

      {/* Upload ảnh */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Button variant="outlined" component="label">
          Chọn ảnh
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageSelect}
          />
        </Button>

        {imageUploading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={18} />
            <Typography variant="body2">Đang upload ảnh...</Typography>
          </Box>
        )}

        {imageUploadError && (
          <Typography variant="body2" color="error">
            {imageUploadError}
          </Typography>
        )}

        {uploadedUrl && (
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
              Xem trước hình (từ server):
            </Typography>
            <img
              src={uploadedUrl}
              alt="preview"
              style={{ width: "100%", borderRadius: 6 }}
            />
          </Box>
        )}
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
            facilityTypeOptions.map((opt: any) => (
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
