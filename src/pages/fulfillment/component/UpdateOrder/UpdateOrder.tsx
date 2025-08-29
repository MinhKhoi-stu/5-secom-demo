// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   CircularProgress,
//   FormControl,
//   FormControlLabel,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
//   TextField,
// } from "@mui/material";
// import { toast } from "react-toastify";
// import {FacilityDto} from "dto/facility/facility.dto";
// import {useQueryClient} from "react-query";
// import {useFindOptionsByGroup} from "hooks/option/useFindOptionByGroup";
// import useFindAllFacility from "hooks/facility/useFindAllFacilityCustom";
// import {facilityAPI} from "api/facility";
// import {FormField} from "pages/User/components/FormField";
// import UploadImage from "components/common/UploadImage";

// /* Replace these imports with your actual modules */

// /* Local types (adjust/remove if you already have these in your codebase) */
// type OptionItem = {
//   id: string;
//   name?: string;
//   code?: string;
//   parentOpt?: any;
//   [k: string]: any;
// };

// type OrgUnit = {
//   id: string;
//   name: string;
//   lvl?: number;
//   code?: string;
//   namePath?: string[];
// };

// /**
//  * Props:
//  * - facility: the facility/order object to edit
//  * - onClose: close dialog handler
//  * - onSaved?: optional parent callback (used to trigger targeted refetch like CreateOrder.onSaved)
//  * - level1Options/level2Options/level3Options?: optional orgUnit option lists (same shape as OrgUnit)
//  * - orgUnitId?: optional fallback orgUnit id from parent (MainFulfillment)
//  */
// interface UpdateOrderProps {
//   facility: FacilityDto;
//   onClose: () => void;
//   onSaved?: () => Promise<void>;
//   level1Options?: OrgUnit[];
//   level2Options?: OrgUnit[];
//   level3Options?: OrgUnit[];
//   orgUnitId?: string;
// }

// const UpdateOrder: React.FC<UpdateOrderProps> = ({
//   facility,
//   onClose,
//   onSaved,
//   level1Options = [],
//   level2Options = [],
//   level3Options = [],
//   orgUnitId,
// }) => {
//   const qc = useQueryClient();

//   // --- level selects (follow CreateOrder pattern) ---
//   // In CreateOrder selects used opt.name as value; to stay compatible we also store names here.
//   // If you prefer id-based selects, replace value={opt.id} and state to store ids.
//   const [selectedLevel1, setSelectedLevel1] = useState<string>("");
//   const [selectedLevel2, setSelectedLevel2] = useState<string>("");
//   const [selectedLevel3, setSelectedLevel3] = useState<string>("");

//   // --- local UI states (mirror CreateOrderDetails pattern) ---
//   const [selectedSkuId, setSelectedSkuId] = useState<string>(""); // store SKU design id
//   const [selectedStateId, setSelectedStateId] = useState<string>(""); // size / state id (state-test)
//   const [skuParentId, setSkuParentId] = useState<string | null>(null);

//   const [noteText, setNoteText] = useState<string>("");
//   const [labelingValue, setLabelingValue] = useState<string>("");
//   const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
//   const [facilityTypeName, setFacilityTypeName] = useState<string>("");

//   // top-level fields that come from facility and editable here
//   const [code, setCode] = useState<string>("");
//   const [idNumber, setIdNumber] = useState<string>("");
//   const [isException, setIsException] = useState<boolean>(false);
//   const [customerName, setCustomerName] = useState<string>("");
//   const [address, setAddress] = useState<string>("");
//   const [phone, setPhone] = useState<string>("");
//   const [localArea, setLocalArea] = useState<number | "">("");
//   const [productTypeId, setProductTypeId] = useState<string>("");
//   const [statusId, setStatusId] = useState<string>("");

//   const [isSaving, setIsSaving] = useState(false);

//   // --- options hooks (use same group codes as CreateOrderDetails where possible) ---
//   const { data: skuDesignsData, isLoading: isLoadingSku } =
//     useFindOptionsByGroup("skudesigns", 0, 200, "");
//   const skuDesigns: OptionItem[] = skuDesignsData?.content || [];

//   const { data: stateTestData, isLoading: isLoadingStateTest } =
//     useFindOptionsByGroup(
//       "state-test",
//       0,
//       200,
//       "",
//       undefined,
//       skuParentId ?? ""
//     );
//   const rawStateTest: OptionItem[] = stateTestData?.content || [];
//   // filter by parentOpt if necessary (same logic as CreateOrderDetails)
//   const stateTestOptions = skuParentId
//     ? rawStateTest.filter((opt) => (opt.parentOpt as any)?.id === skuParentId)
//     : rawStateTest;

//   const { data: facilityTypeData, isLoading: isLoadingFacilityType } =
//     useFindOptionsByGroup("facility-type", 0, 200, "", "orderNo,asc");
//   const facilityTypeOptions: OptionItem[] = facilityTypeData?.content || [];

//   const { data: productTypesData } = useFindOptionsByGroup(
//     "productTypes",
//     0,
//     100,
//     ""
//   );
//   const productTypeOptions: OptionItem[] = productTypesData?.content || [];

//   const { data: statusData } = useFindOptionsByGroup(
//     "facilityStatus",
//     0,
//     100,
//     ""
//   );
//   const statusOptions: OptionItem[] = statusData?.content || [];

//   // labeling options built from existing facilities
//   const {
//     data: facilitiesData,
//     isLoading: isLoadingFacilities,
//     isError: isErrorFacilities,
//   } = useFindAllFacility({ page: 0, size: 50, codeOrName: "" });
//   const facilities: FacilityDto[] = facilitiesData?.content || [];
//   const labelingOptions = useMemo(() => {
//     const vals = facilities
//       .map((f) => String(f.labelingStandard ?? "").trim())
//       .filter((s) => s.length > 0);
//     return Array.from(new Set(vals));
//   }, [facilities]);

//   // --- initialize from facility prop when it changes ---
//   useEffect(() => {
//     if (!facility) return;

//     // top-level fields
//     setCode(facility.code ?? facility.skuOpt?.code ?? "");
//     setIdNumber(facility.idNumber ?? "");
//     setIsException(!!facility.isException);
//     setCustomerName(facility.name ?? "");
//     setAddress(facility.address ?? facility.labelingStandard ?? "");
//     setPhone((facility as any).phone ?? "");
//     setLocalArea((facility.area ?? 0) === 0 ? "" : facility.area ?? "");
//     setProductTypeId(
//       (facility as any).productType?.id ?? (facility as any).productTypeId ?? ""
//     );
//     setStatusId(
//       (facility as any).status?.id ?? (facility as any).statusId ?? ""
//     );

//     // details
//     setNoteText((facility.note ?? "") as string);
//     setLabelingValue((facility.labelingStandard ?? "") as string);
//     setImagePreviewUrl(
//       facility.sampleSource ? String(facility.sampleSource) : null
//     );

//     // facilityTypeName (display string)
//     setFacilityTypeName(facility.facilityType?.name ?? "");

//     // selectedSkuId: try id first, else try to find by code or name in skuDesigns (when loaded)
//     if (facility.skuOpt?.id) {
//       setSelectedSkuId(facility.skuOpt.id);
//     } else if (facility.skuOpt?.code || facility.code) {
//       const codeToFind = facility.skuOpt?.code ?? facility.code;
//       const found = skuDesigns.find(
//         (s) => s.code === codeToFind || s.name === codeToFind
//       );
//       setSelectedSkuId(found ? found.id : "");
//     } else if (facility.skuOpt?.name) {
//       const found = skuDesigns.find((s) => s.name === facility.skuOpt?.name);
//       setSelectedSkuId(found ? found.id : "");
//     } else {
//       setSelectedSkuId("");
//     }

//     // selectedStateId
//     setSelectedStateId(facility.stateOpt?.id ?? "");

//     // --- initialize level selects from facility.orgUnit if possible ---
//     // Preferred source: facility.orgUnit.namePath (array [lvl1, lvl2, lvl3])
//     const org = facility.orgUnit as OrgUnit | undefined | null;
//     if (org) {
//       if (Array.isArray(org.namePath) && org.namePath.length > 0) {
//         setSelectedLevel1(org.namePath[0] ?? "");
//         setSelectedLevel2(org.namePath[1] ?? "");
//         setSelectedLevel3(org.namePath[2] ?? "");
//       } else if (org.name) {
//         // no namePath available: put name into level3 (consistent with CreateOrder fallback)
//         setSelectedLevel1("");
//         setSelectedLevel2("");
//         setSelectedLevel3(org.name);
//       } else {
//         setSelectedLevel1("");
//         setSelectedLevel2("");
//         setSelectedLevel3("");
//       }
//     } else if (orgUnitId) {
//       // If parent gave orgUnitId, try to find matching level3 name from level3Options
//       const found = level3Options.find((o) => o.id === orgUnitId);
//       if (found) {
//         setSelectedLevel3(found.name);
//       } else {
//         setSelectedLevel3("");
//       }
//       setSelectedLevel1("");
//       setSelectedLevel2("");
//     } else {
//       setSelectedLevel1("");
//       setSelectedLevel2("");
//       setSelectedLevel3("");
//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [facility, skuDesigns, level3Options]);

//   // whenever selectedSkuId changes (user / init), compute parent and clear selectedStateId appropriately
//   useEffect(() => {
//     if (!selectedSkuId) {
//       setSkuParentId(null);
//       return;
//     }
//     // find in skuDesigns
//     const sel = skuDesigns.find((s) => s.id === selectedSkuId);
//     const parentId = (sel as any)?.parentOpt?.id ?? null;
//     setSkuParentId(parentId);
//     // if selectedStateId not compatible, we keep but user can change
//   }, [selectedSkuId, skuDesigns]);

//   // handler for sku change (user)
//   const handleSkuChange = (newSkuId: string) => {
//     setSelectedSkuId(newSkuId);
//     setSelectedStateId("");
//   };

//   const handleStateChange = (newStateId: string) => {
//     setSelectedStateId(newStateId);
//   };

//   const handleFacilityTypeChange = (v: string) => {
//     setFacilityTypeName(v);
//   };

//   const handleImageUpload = (file: File) => {
//     const url = URL.createObjectURL(file);
//     setImagePreviewUrl(url);
//   };

//   // --- SAVE logic (maps selected levels to payload) ---
//   const handleSave = async () => {
//     setIsSaving(true);
//     try {
//       // Build payload similar to CreateOrder.mapToCreateFacilityDto but for update
//       const payload: any = {
//         code: code || undefined,
//         idNumber: idNumber || undefined,
//         isException: !!isException,
//         name: customerName || undefined,
//         address: address || undefined,
//         phone: phone || undefined,
//         area: localArea === "" ? undefined : localArea,
//         note: noteText || undefined,
//         labelingStandard: labelingValue || undefined,
//         sampleSource: imagePreviewUrl || undefined,
//         productTypeId: productTypeId || undefined,
//         statusId: statusId || undefined,
//       };

//       // sku & state
//       if (selectedSkuId) {
//         payload.skuId = selectedSkuId;
//         payload.skuOpt = { id: selectedSkuId };
//       } else if (code) {
//         payload.skuCode = code;
//         payload.skuOpt = { code };
//       }

//       if (selectedStateId) {
//         payload.stateOpt = { id: selectedStateId };
//       }

//       // facilityType: try to map by selected facilityTypeName -> find id if available
//       const fType = facilityTypeOptions.find(
//         (o) => o.name === facilityTypeName
//       );
//       if (fType?.id) payload.facilityType = { id: fType.id };
//       else if (facility.facilityType?.id)
//         payload.facilityType = { id: facility.facilityType.id };

//       // --- ORG UNIT mapping using selectedLevel3/2/1 ---
//       // Priority:
//       // 1) If selectedLevel3 matches a provided level3Options entry, send its id.
//       // 2) Else preserve facility.orgUnit.id if present.
//       // 3) Else if selectedLevel3 exists (user typed/selected a name), send name as fallback.
//       // 4) Else if orgUnitId prop provided as fallback, use it.
//       let orgUnitPayload: any = undefined;
//       if (selectedLevel3) {
//         const found = level3Options.find(
//           (o) => (o.name ?? "").trim() === selectedLevel3.trim()
//         );
//         if (found) {
//           orgUnitPayload = { id: found.id };
//         } else {
//           // Maybe level3Options are not provided or user typed a custom name => send name fallback
//           orgUnitPayload = { name: selectedLevel3 };
//         }
//       } else if (facility.orgUnit?.id) {
//         orgUnitPayload = { id: facility.orgUnit.id };
//       } else if (orgUnitId) {
//         orgUnitPayload = { id: orgUnitId };
//       }

//       if (orgUnitPayload) payload.orgUnit = orgUnitPayload;

//       // remove undefined keys
//       Object.keys(payload).forEach(
//         (k) => payload[k] === undefined && delete payload[k]
//       );

//       // call update API
//       await facilityAPI.updateFacility(facility.id, payload);

//       // call parent callback if provided (targeted refetch)
//       if (typeof onSaved === "function") {
//         try {
//           await onSaved();
//         } catch (err) {
//           // ignore parent callback errors but log
//           console.warn("onSaved callback error:", err);
//         }
//       } else {
//         // fallback to invalidating facility list
//         qc.invalidateQueries(["FIND_ALL_FACILITY"]);
//       }

//       toast.success("Lưu chỉnh sửa thành công");
//       onClose();
//     } catch (err: any) {
//       console.error("Update facility failed:", err);
//       const message =
//         err?.response?.data?.message ?? err?.message ?? "Lưu thất bại";
//       toast.error(message);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         overflowX: "hidden",
//         overflowY: "auto",
//         scrollbarWidth: "none",
//         "&::-webkit-scrollbar": { display: "none" },
//       }}
//     >
//       <Typography fontWeight="bold" variant="h6" sx={{ mb: 2 }}>
//         CHỈNH SỬA ĐƠN HÀNG
//       </Typography>

//       <Grid
//         container
//         spacing={3}
//         sx={{
//           width: "100%",
//           maxWidth: 1300,
//           margin: "0 auto",
//           justifyContent: "center",
//           alignItems: "stretch",
//         }}
//       >
//         {/* CỘT 1 - top-level selects / id */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Box
//             sx={{
//               backgroundColor: "white",
//               padding: 3,
//               borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               height: "100%",
//             }}
//           >
//             {/* lvl1: Loại cửa hàng */}
//             <FormControl size="small" fullWidth>
//               <InputLabel id="lvl1-label">Loại cửa hàng</InputLabel>
//               <Select
//                 labelId="lvl1-label"
//                 value={selectedLevel1}
//                 label="Loại cửa hàng"
//                 onChange={(e) => setSelectedLevel1(e.target.value as string)}
//               >
//                 {level1Options && level1Options.length > 0 ? (
//                   level1Options.map((opt) => (
//                     <MenuItem key={opt.id} value={opt.name}>
//                       {opt.name}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem value="" disabled>
//                     Không có dữ liệu
//                   </MenuItem>
//                 )}
//               </Select>
//             </FormControl>

//             {/* lvl2: Quốc gia */}
//             <FormControl size="small" fullWidth>
//               <InputLabel id="lvl2-label">Quốc gia</InputLabel>
//               <Select
//                 labelId="lvl2-label"
//                 value={selectedLevel2}
//                 label="Quốc gia"
//                 onChange={(e) => setSelectedLevel2(e.target.value as string)}
//               >
//                 {level2Options && level2Options.length > 0 ? (
//                   level2Options.map((opt) => (
//                     <MenuItem key={opt.id} value={opt.name}>
//                       {opt.name}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem value="" disabled>
//                     Không có dữ liệu
//                   </MenuItem>
//                 )}
//               </Select>
//             </FormControl>

//             {/* lvl3: Cửa hàng */}
//             <FormControl size="small" fullWidth>
//               <InputLabel id="lvl3-label">Cửa hàng</InputLabel>
//               <Select
//                 labelId="lvl3-label"
//                 value={selectedLevel3}
//                 label="Cửa hàng"
//                 onChange={(e) => setSelectedLevel3(e.target.value as string)}
//               >
//                 {level3Options && level3Options.length > 0 ? (
//                   level3Options.map((opt) => (
//                     <MenuItem key={opt.id} value={opt.name}>
//                       {opt.name}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem value="" disabled>
//                     Không có dữ liệu
//                   </MenuItem>
//                 )}
//               </Select>
//             </FormControl>

//             {/* SKU Fulfill (as text) */}
//             <FormField
//               label="SKU Fulfill (code)"
//               name="code"
//               type="text"
//               value={code}
//               onChange={(e) => setCode(e.target.value)}
//             />

//             <FormField
//               label="Nhập Order ID"
//               name="idNumber"
//               type="text"
//               value={idNumber}
//               onChange={(e) => setIdNumber(e.target.value)}
//             />

//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={isException}
//                   onChange={(e) => setIsException(e.target.checked)}
//                 />
//               }
//               label={
//                 <Typography
//                   sx={{ fontSize: 16, fontWeight: "bold", color: "black" }}
//                 >
//                   Ưu tiên làm đơn này
//                 </Typography>
//               }
//             />
//           </Box>
//         </Grid>

//         {/* CỘT 2 - customer info */}
//         <Grid item xs={12} sm={6} md={4}>
//           <Box
//             sx={{
//               backgroundColor: "white",
//               padding: 3,
//               borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               height: "100%",
//             }}
//           >
//             <Typography sx={{ color: "black", fontWeight: "bold" }}>
//               THÔNG TIN KHÁCH HÀNG
//             </Typography>

//             <FormField
//               label="Tên khách hàng"
//               name="name"
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//             />
//             <FormField
//               label="Địa chỉ khách hàng"
//               name="address"
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//             <FormField
//               label="Số điện thoại"
//               name="phone"
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </Box>
//         </Grid>

//         {/* CỘT 3 - order details (sku design, size, amount, note, labeling, upload, status) */}
//         <Grid item xs={12} sm={12} md={4}>
//           <Box
//             sx={{
//               backgroundColor: "white",
//               padding: 3,
//               borderRadius: "12px",
//               boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               height: "100%",
//             }}
//           >
//             <Typography color="black" fontWeight="bold">
//               THÔNG TIN ĐƠN HÀNG
//             </Typography>

//             <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//               <FormControl size="small" sx={{ width: "50%" }}>
//                 <InputLabel id="sku-design-label">Nhập SKU Design</InputLabel>
//                 <Select
//                   labelId="sku-design-label"
//                   value={selectedSkuId || ""}
//                   label="Nhập SKU Design"
//                   onChange={(e) => handleSkuChange(e.target.value as string)}
//                 >
//                   {isLoadingSku ? (
//                     <MenuItem disabled>Đang tải...</MenuItem>
//                   ) : skuDesigns.length > 0 ? (
//                     skuDesigns.map((opt) => (
//                       <MenuItem key={opt.id} value={opt.id}>
//                         {opt.code ?? opt.name}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem value="" disabled>
//                       Không có dữ liệu
//                     </MenuItem>
//                   )}
//                 </Select>
//               </FormControl>

//               <FormControl
//                 size="small"
//                 sx={{ width: "50%" }}
//                 disabled={!selectedSkuId}
//               >
//                 <InputLabel id="state-test-label">Kích thước</InputLabel>
//                 <Select
//                   labelId="state-test-label"
//                   value={selectedStateId || ""}
//                   label="Kích thước"
//                   onChange={(e) => handleStateChange(e.target.value as string)}
//                 >
//                   {isLoadingStateTest ? (
//                     <MenuItem disabled>Đang tải...</MenuItem>
//                   ) : !selectedSkuId ? (
//                     <MenuItem value="" disabled>
//                       Hãy chọn SKU trước
//                     </MenuItem>
//                   ) : stateTestOptions.length > 0 ? (
//                     stateTestOptions.map((opt) => (
//                       <MenuItem key={opt.id} value={opt.id}>
//                         {opt.name}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem value="" disabled>
//                       Không có dữ liệu phù hợp SKU
//                     </MenuItem>
//                   )}
//                 </Select>
//               </FormControl>
//             </Box>

//             <FormField
//               label="Số lượng"
//               name="area"
//               type="number"
//               value={localArea === 0 ? "" : (localArea as any)}
//               onChange={(e) => {
//                 const v = e.target.value;
//                 setLocalArea(v === "" ? "" : Number(v));
//               }}
//             />

//             <TextField
//               placeholder="Nhập thông tin đơn hàng"
//               fullWidth
//               multiline
//               rows={3}
//               value={noteText}
//               onChange={(e) => setNoteText(e.target.value)}
//             />

//             <FormControl size="small" fullWidth>
//               <InputLabel id="labeling-standard-label">Loại hàng</InputLabel>
//               <Select
//                 labelId="labeling-standard-label"
//                 value={labelingValue || ""}
//                 label="Loại hàng"
//                 onChange={(e) => setLabelingValue(e.target.value as string)}
//               >
//                 {isLoadingFacilities ? (
//                   <MenuItem disabled>Đang tải...</MenuItem>
//                 ) : isErrorFacilities ? (
//                   <MenuItem disabled>Lỗi tải dữ liệu</MenuItem>
//                 ) : labelingOptions.length > 0 ? (
//                   labelingOptions.map((opt) => (
//                     <MenuItem key={opt} value={opt}>
//                       {opt}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem value="" disabled>
//                     Không có dữ liệu
//                   </MenuItem>
//                 )}
//               </Select>
//             </FormControl>

//             <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//               <UploadImage onFileSelect={handleImageUpload} />
//               {imagePreviewUrl ? (
//                 <Box
//                   sx={{
//                     mt: 1,
//                     border: "1px solid #eee",
//                     borderRadius: "8px",
//                     p: 1,
//                     maxWidth: 320,
//                   }}
//                 >
//                   <Typography variant="caption" sx={{ color: "gray" }}>
//                     Xem trước hình (sampleSource):
//                   </Typography>
//                   <img
//                     src={imagePreviewUrl}
//                     alt="preview"
//                     style={{ width: "100%", borderRadius: 6 }}
//                   />
//                 </Box>
//               ) : null}
//             </Box>

//             <FormControl size="small" fullWidth>
//               <InputLabel id="facility-type-label">TRẠNG THÁI</InputLabel>
//               <Select
//                 labelId="facility-type-label"
//                 value={facilityTypeName || ""}
//                 label="TRẠNG THÁI"
//                 onChange={(e) =>
//                   handleFacilityTypeChange(e.target.value as string)
//                 }
//               >
//                 {isLoadingFacilityType ? (
//                   <MenuItem value="">
//                     <CircularProgress size={18} />
//                   </MenuItem>
//                 ) : facilityTypeOptions.length > 0 ? (
//                   facilityTypeOptions.map((opt) => (
//                     <MenuItem key={opt.id} value={opt.name ?? ""}>
//                       {opt.name}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem value="" disabled>
//                     Không có dữ liệu
//                   </MenuItem>
//                 )}
//               </Select>
//             </FormControl>
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//             <Button
//               onClick={handleSave}
//               disabled={isSaving}
//               sx={{
//                 borderRadius: "8px",
//                 width: "40%",
//                 backgroundColor: isSaving ? "#ef9a9a" : "lightsalmon",
//                 color: "black",
//                 ":hover": { backgroundColor: "tomato" },
//               }}
//             >
//               {isSaving ? <CircularProgress size={20} /> : "LƯU CHỈNH SỬA"}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default UpdateOrder;

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryClient } from "react-query";

// NOTE: adjust these imports to match your project structure
import { useFindAllFacility } from "hooks/facility/useFindAllFacility"; // keep existing hook
import { useSearchOrgunit } from "hooks/orgunit/useSearchOrgunit"; // your hook provided
import { toast } from "react-toastify";
import {useFindOptionsByGroup} from "hooks/option/useFindOptionByGroup";
import {facilityAPI} from "api/facility";
import {FormField} from "pages/User/components/FormField";
import UploadImage from "components/common/UploadImage";


// types: adjust import if you have explicit type files
// import { FacilityDto } from 'types/Facility';

type OptionItem = {
  id: string;
  name?: string;
  code?: string;
  parentOpt?: any;
  [k: string]: any;
};

type OrgUnit = {
  id: string;
  name: string;
  lvl?: number;
  code?: string;
  namePath?: string[];
};

interface UpdateOrderProps {
  facility: any; // FacilityDto
  onClose: () => void;
  onSaved?: () => Promise<void>;
  level1Options?: OrgUnit[]; // (optional, but we'll fetch via hook)
  level2Options?: OrgUnit[];
  level3Options?: OrgUnit[];
  orgUnitId?: string;
}

const getParentId = (opt: any): string | null => {
  if (!opt) return null;
  const p = opt.parentOpt;
  if (!p) return null;
  if (typeof p === "object") return p.id ?? null;
  return String(p) ?? null;
};

const UpdateOrder: React.FC<UpdateOrderProps> = ({
  facility,
  onClose,
  onSaved,
  level1Options: _level1FromProps = [],
  level2Options: _level2FromProps = [],
  level3Options: _level3FromProps = [],
  orgUnitId,
}) => {
  const qc = useQueryClient();

  // Store select values as names to stay compatible with CreateOrder (uses names)
  const [selectedLevel1, setSelectedLevel1] = useState<string>("");
  const [selectedLevel2, setSelectedLevel2] = useState<string>("");
  const [selectedLevel3, setSelectedLevel3] = useState<string>("");

  // --- local UI states (unchanged) ---
  const [selectedSkuId, setSelectedSkuId] = useState<string>("");
  const [selectedStateId, setSelectedStateId] = useState<string>("");
  const [skuParentId, setSkuParentId] = useState<string | null>(null);

  const [noteText, setNoteText] = useState<string>("");
  const [labelingValue, setLabelingValue] = useState<string>("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [facilityTypeName, setFacilityTypeName] = useState<string>("");

  // top-level fields
  const [code, setCode] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [isException, setIsException] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [localArea, setLocalArea] = useState<number | "">("");
  const [productTypeId, setProductTypeId] = useState<string>("");
  const [statusId, setStatusId] = useState<string>("");

  const [isSaving, setIsSaving] = useState(false);

  // --- options hooks (same as before) ---
  const { data: skuDesignsData, isLoading: isLoadingSku } =
    useFindOptionsByGroup("skudesigns", 0, 200, "");
  const skuDesigns: OptionItem[] = skuDesignsData?.content || [];

  const { data: stateTestData, isLoading: isLoadingStateTest } =
    useFindOptionsByGroup(
      "state-test",
      0,
      200,
      "",
      undefined,
      skuParentId ?? ""
    );
  const rawStateTest: OptionItem[] = stateTestData?.content || [];
  const stateTestOptions = skuParentId
    ? rawStateTest.filter((opt) => getParentId(opt) === skuParentId)
    : rawStateTest;

  const { data: facilityTypeData, isLoading: isLoadingFacilityType } =
    useFindOptionsByGroup("facility-type", 0, 200, "", "orderNo,asc");
  const facilityTypeOptions: OptionItem[] = facilityTypeData?.content || [];

  const { data: productTypesData } = useFindOptionsByGroup(
    "productTypes",
    0,
    100,
    ""
  );
  const productTypeOptions: OptionItem[] = productTypesData?.content || [];

  const { data: statusData } = useFindOptionsByGroup(
    "facilityStatus",
    0,
    100,
    ""
  );
  const statusOptions: OptionItem[] = statusData?.content || [];

  const {
    data: facilitiesData,
    isLoading: isLoadingFacilities,
    isError: isErrorFacilities,
  } = useFindAllFacility({ page: 0, size: 50, codeOrName: "" });
  const facilities: any[] = facilitiesData?.content || [];
  const labelingOptions = useMemo(() => {
    const vals = facilities
      .map((f) => String(f.labelingStandard ?? "").trim())
      .filter((s) => s.length > 0);
    return Array.from(new Set(vals));
  }, [facilities]);

  // --- ORGUNIT: use provided hook to fetch levels ---
  // fetch all lvl1/2/3 so we can match by id/name and also filter children locally
  const lvl1Q = useSearchOrgunit({ lvl: 1 });
  const lvl2Q = useSearchOrgunit({ lvl: 2 });
  const lvl3Q = useSearchOrgunit({ lvl: 3 });

  const lvl1Options = lvl1Q.data?.content || _level1FromProps || [];
  const lvl2Options = lvl2Q.data?.content || _level2FromProps || [];
  const lvl3Options = lvl3Q.data?.content || _level3FromProps || [];

  const selectedLevel1Id = useMemo(() => {
    const f = lvl1Options.find((o: OptionItem) => (o.name ?? "") === selectedLevel1);
    return f?.id ?? "";
  }, [lvl1Options, selectedLevel1]);

  const selectedLevel2Id = useMemo(() => {
    const f = lvl2Options.find((o: OptionItem) => (o.name ?? "") === selectedLevel2);
    return f?.id ?? "";
  }, [lvl2Options, selectedLevel2]);

  // filtered lists for better UX: show children only
  const filteredLvl2 = useMemo(() => {
    if (!selectedLevel1Id) return lvl2Options;
    return lvl2Options.filter((o: OptionItem) => getParentId(o) === selectedLevel1Id);
  }, [lvl2Options, selectedLevel1Id]);

  const filteredLvl3 = useMemo(() => {
    if (!selectedLevel2Id) return lvl3Options;
    return lvl3Options.filter((o: OptionItem) => getParentId(o) === selectedLevel2Id);
  }, [lvl3Options, selectedLevel2Id]);

  // --- initialize from facility prop when it changes ---
  useEffect(() => {
    if (!facility) return;

    // top-level fields
    setCode(facility.code ?? facility.skuOpt?.code ?? "");
    setIdNumber(facility.idNumber ?? "");
    setIsException(!!facility.isException);
    setCustomerName(facility.name ?? "");
    setAddress(facility.address ?? facility.labelingStandard ?? "");
    setPhone((facility as any).phone ?? "");
    setLocalArea((facility.area ?? 0) === 0 ? "" : facility.area ?? "");
    setProductTypeId(
      (facility as any).productType?.id ?? (facility as any).productTypeId ?? ""
    );
    setStatusId(
      (facility as any).status?.id ?? (facility as any).statusId ?? ""
    );

    // details
    setNoteText((facility.note ?? "") as string);
    setLabelingValue((facility.labelingStandard ?? "") as string);
    setImagePreviewUrl(
      facility.sampleSource ? String(facility.sampleSource) : null
    );

    setFacilityTypeName(facility.facilityType?.name ?? "");

    // selectedSkuId: try id first, then code/name
    if (facility.skuOpt?.id) {
      setSelectedSkuId(facility.skuOpt.id);
    } else if (facility.skuOpt?.code || facility.code) {
      const codeToFind = facility.skuOpt?.code ?? facility.code;
      const found = skuDesigns.find(
        (s) => s.code === codeToFind || s.name === codeToFind
      );
      setSelectedSkuId(found ? found.id : "");
    } else if (facility.skuOpt?.name) {
      const found = skuDesigns.find((s) => s.name === facility.skuOpt?.name);
      setSelectedSkuId(found ? found.id : "");
    } else {
      setSelectedSkuId("");
    }

    setSelectedStateId(facility.stateOpt?.id ?? "");

    // --- ORG UNIT init: multiple fallbacks ---
    const org = facility.orgUnit as OrgUnit | undefined | null;

    const setParentsFromFound3 = (found3: any) => {
      if (!found3) return;
      setSelectedLevel3(found3.name ?? "");
      const p2Id = getParentId(found3);
      if (p2Id) {
        const found2 = lvl2Options.find((o: OptionItem) => o.id === p2Id);
        if (found2) setSelectedLevel2(found2.name ?? "");
        const p1Id = found2 ? getParentId(found2) : null;
        if (p1Id) {
          const found1 = lvl1Options.find((o: OptionItem) => o.id === p1Id);
          if (found1) setSelectedLevel1(found1.name ?? "");
        }
      }
    };

    if (org) {
      if (Array.isArray(org.namePath) && org.namePath.length > 0) {
        setSelectedLevel1(org.namePath[0] ?? "");
        setSelectedLevel2(org.namePath[1] ?? "");
        setSelectedLevel3(org.namePath[2] ?? "");
      } else if (org.id) {
        // try to find level3 option by id
        const found3 = lvl3Options.find(
          (o: OptionItem) =>
            o.id === org.id || (o.name ?? "").trim() === (org.name ?? "").trim()
        );
        if (found3) {
          setParentsFromFound3(found3);
        } else if (org.name) {
          // try by name in lvl3 list
          const foundByName = lvl3Options.find(
            (o: OptionItem) => (o.name ?? "").trim() === org.name?.trim()
          );
          if (foundByName) setParentsFromFound3(foundByName);
          else {
            // fallback: put org.name into level3 (so select will show as value if option later matches name)
            setSelectedLevel1("");
            setSelectedLevel2("");
            setSelectedLevel3(org.name ?? "");
          }
        } else {
          setSelectedLevel1("");
          setSelectedLevel2("");
          setSelectedLevel3("");
        }
      } else if (org.name) {
        // no id, but name present
        const foundByName = lvl3Options.find(
          (o: OptionItem) => (o.name ?? "").trim() === org.name?.trim()
        );
        if (foundByName) setParentsFromFound3(foundByName);
        else {
          setSelectedLevel1("");
          setSelectedLevel2("");
          setSelectedLevel3(org.name ?? "");
        }
      } else {
        setSelectedLevel1("");
        setSelectedLevel2("");
        setSelectedLevel3("");
      }
    } else if (orgUnitId) {
      // parent supplied fallback
      const found = lvl3Options.find((o: OptionItem) => o.id === orgUnitId);
      if (found) setParentsFromFound3(found);
      else {
        setSelectedLevel1("");
        setSelectedLevel2("");
        setSelectedLevel3("");
      }
    } else {
      setSelectedLevel1("");
      setSelectedLevel2("");
      setSelectedLevel3("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facility, skuDesigns, lvl1Q.data, lvl2Q.data, lvl3Q.data]);

  // when user selects lvl1, clear deeper levels
  const handleLevel1Change = (v: string) => {
    setSelectedLevel1(v);
    setSelectedLevel2("");
    setSelectedLevel3("");
  };

  const handleLevel2Change = (v: string) => {
    setSelectedLevel2(v);
    setSelectedLevel3("");
  };

  const handleLevel3Change = (v: string) => {
    setSelectedLevel3(v);
  };

  // sku parent logic unchanged
  useEffect(() => {
    if (!selectedSkuId) {
      setSkuParentId(null);
      return;
    }
    const sel = skuDesigns.find((s) => s.id === selectedSkuId);
    const parentId = (sel as any)?.parentOpt?.id ?? null;
    setSkuParentId(parentId);
  }, [selectedSkuId, skuDesigns]);

  const handleSkuChange = (newSkuId: string) => {
    setSelectedSkuId(newSkuId);
    setSelectedStateId("");
  };

  const handleStateChange = (newStateId: string) => {
    setSelectedStateId(newStateId);
  };

  const handleFacilityTypeChange = (v: string) => {
    setFacilityTypeName(v);
  };

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
  };

  // --- SAVE logic (maps selected levels to payload) ---
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload: any = {
        code: code || undefined,
        idNumber: idNumber || undefined,
        isException: !!isException,
        name: customerName || undefined,
        address: address || undefined,
        phone: phone || undefined,
        area: localArea === "" ? undefined : localArea,
        note: noteText || undefined,
        labelingStandard: labelingValue || undefined,
        sampleSource: imagePreviewUrl || undefined,
        productTypeId: productTypeId || undefined,
        statusId: statusId || undefined,
      };

      if (selectedSkuId) {
        payload.skuId = selectedSkuId;
        payload.skuOpt = { id: selectedSkuId };
      } else if (code) {
        payload.skuCode = code;
        payload.skuOpt = { code };
      }

      if (selectedStateId) payload.stateOpt = { id: selectedStateId };

      const fType = facilityTypeOptions.find(
        (o) => o.name === facilityTypeName
      );
      if (fType?.id) payload.facilityType = { id: fType.id };
      else if (facility.facilityType?.id)
        payload.facilityType = { id: facility.facilityType.id };

      // ORG UNIT mapping (name-based selects -> try to find id)
      let orgUnitPayload: any = undefined;
      if (selectedLevel3) {
        // try find by name in lvl3Options
        const found = lvl3Options.find(
          (o: OptionItem) => (o.name ?? "").trim() === selectedLevel3.trim()
        );
        if (found) orgUnitPayload = { id: found.id };
        else orgUnitPayload = { name: selectedLevel3 };
      } else if (facility.orgUnit?.id) {
        orgUnitPayload = { id: facility.orgUnit.id };
      } else if (orgUnitId) {
        orgUnitPayload = { id: orgUnitId };
      }

      if (orgUnitPayload) payload.orgUnit = orgUnitPayload;

      Object.keys(payload).forEach(
        (k) => payload[k] === undefined && delete payload[k]
      );

      await facilityAPI.updateFacility(facility.id, payload);

      if (typeof onSaved === "function") {
        try {
          await onSaved();
        } catch (err) {
          console.warn("onSaved callback error:", err);
        }
      } else {
        qc.invalidateQueries(["FIND_ALL_FACILITY"]);
      }

      toast.success("Lưu chỉnh sửa thành công");
      onClose();
    } catch (err: any) {
      console.error("Update facility failed:", err);
      const message =
        err?.response?.data?.message ?? err?.message ?? "Lưu thất bại";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Typography fontWeight="bold" variant="h6" sx={{ mb: 2 }}>
        CHỈNH SỬA ĐƠN HÀNG
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          width: "100%",
          maxWidth: 1300,
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {/* CỘT 1 - top-level selects / id */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {/* lvl1 */}
            <FormControl size="small" fullWidth>
              <InputLabel id="lvl1-label">Loại cửa hàng</InputLabel>
              <Select
                labelId="lvl1-label"
                value={selectedLevel1}
                label="Loại cửa hàng"
                onChange={(e) => handleLevel1Change(e.target.value as string)}
              >
                {lvl1Q.isLoading ? (
                  <MenuItem value="" disabled>
                    Đang tải...
                  </MenuItem>
                ) : lvl1Options && lvl1Options.length > 0 ? (
                  lvl1Options.map((opt: OptionItem) => (
                    <MenuItem key={opt.id} value={opt.name}>
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

            {/* lvl2 */}
            <FormControl size="small" fullWidth>
              <InputLabel id="lvl2-label">Quốc gia</InputLabel>
              <Select
                labelId="lvl2-label"
                value={selectedLevel2}
                label="Quốc gia"
                onChange={(e) => handleLevel2Change(e.target.value as string)}
              >
                {lvl2Q.isLoading ? (
                  <MenuItem value="" disabled>
                    Đang tải...
                  </MenuItem>
                ) : filteredLvl2 && filteredLvl2.length > 0 ? (
                  filteredLvl2.map((opt: OptionItem) => (
                    <MenuItem key={opt.id} value={opt.name}>
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

            {/* lvl3 */}
            <FormControl size="small" fullWidth>
              <InputLabel id="lvl3-label">Cửa hàng</InputLabel>
              <Select
                labelId="lvl3-label"
                value={selectedLevel3}
                label="Cửa hàng"
                onChange={(e) => handleLevel3Change(e.target.value as string)}
              >
                {lvl3Q.isLoading ? (
                  <MenuItem value="" disabled>
                    Đang tải...
                  </MenuItem>
                ) : filteredLvl3 && filteredLvl3.length > 0 ? (
                  filteredLvl3.map((opt: OptionItem) => (
                    <MenuItem key={opt.id} value={opt.name}>
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

            <FormField
              label="SKU Fulfill (code)"
              name="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <FormField
              label="Nhập Order ID"
              name="idNumber"
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isException}
                  onChange={(e) => setIsException(e.target.checked)}
                />
              }
              label={
                <Typography
                  sx={{ fontSize: 16, fontWeight: "bold", color: "black" }}
                >
                  Ưu tiên làm đơn này
                </Typography>
              }
            />
          </Box>
        </Grid>

        {/* CỘT 2 - customer info */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            <Typography sx={{ color: "black", fontWeight: "bold" }}>
              THÔNG TIN KHÁCH HÀNG
            </Typography>

            <FormField
              label="Tên khách hàng"
              name="name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <FormField
              label="Địa chỉ khách hàng"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <FormField
              label="Số điện thoại"
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>
        </Grid>

        {/* CỘT 3 - order details */}
        <Grid item xs={12} sm={12} md={4}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            <Typography color="black" fontWeight="bold">
              THÔNG TIN ĐƠN HÀNG
            </Typography>

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
                    skuDesigns.map((opt) => (
                      <MenuItem key={opt.id} value={opt.id}>
                        {opt.code ?? opt.name}
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
                    stateTestOptions.map((opt) => (
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

            <FormField
              label="Số lượng"
              name="area"
              type="number"
              value={localArea === 0 ? "" : (localArea as any)}
              onChange={(e) => {
                const v = e.target.value;
                setLocalArea(v === "" ? "" : Number(v));
              }}
            />

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
                value={labelingValue || ""}
                label="Loại hàng"
                onChange={(e) => setLabelingValue(e.target.value as string)}
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
              <InputLabel id="facility-type-label">TRẠNG THÁI</InputLabel>
              <Select
                labelId="facility-type-label"
                value={facilityTypeName || ""}
                label="TRẠNG THÁI"
                onChange={(e) =>
                  handleFacilityTypeChange(e.target.value as string)
                }
              >
                {isLoadingFacilityType ? (
                  <MenuItem value="">
                    <CircularProgress size={18} />
                  </MenuItem>
                ) : facilityTypeOptions.length > 0 ? (
                  facilityTypeOptions.map((opt) => (
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
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              sx={{
                borderRadius: "8px",
                width: "40%",
                backgroundColor: isSaving ? "#ef9a9a" : "lightsalmon",
                color: "black",
                ":hover": { backgroundColor: "tomato" },
              }}
            >
              {isSaving ? <CircularProgress size={20} /> : "LƯU CHỈNH SỬA"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateOrder;
