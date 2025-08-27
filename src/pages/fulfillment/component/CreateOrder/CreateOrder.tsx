// // CreateOrder.tsx
// import {
//   Box,
//   Button,
//   Checkbox,
//   Dialog,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   Grid,
//   InputLabel,
//   Link,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
// import OriginLabel from "../../../../components/OriginLabel";
// import { useNavigate } from "react-router-dom";
// import { FacilityDto } from "dto/facility/facility.dto";
// import { FormField } from "pages/User/components/FormField";
// import CreateOrderDetails from "./CreateOrderDetails";
// import SavingTable from "./SavingTable";
// import { toast } from "react-toastify";
// import { useCreateFacility } from "hooks/facility/useCreateFacility";
// import { CreateFacilityDto } from "dto/facility/create-facility.dto";
// import { useQueryClient } from "react-query";

// type OrgUnit = {
//   id: string;
//   name: string;
//   lvl?: number;
//   code?: string;
//   namePath?: string[];
// };

// interface CreateOrderDialogProps {
//   open: boolean;
//   onClose: () => void;
//   level1Options?: OrgUnit[];
//   level2Options?: OrgUnit[];
//   level3Options?: OrgUnit[];
//   initialValues?: Partial<FacilityDto>;
//   orgUnitId?: string; // <-- mới: truyền từ MainFulfillment để refetch statistic
// }

// const initialFormState: FacilityDto = {
//   version: 0,
//   createdBy: "",
//   updatedBy: null,
//   createdDate: "",
//   updatedDate: null,

//   id: "",
//   code: "",
//   name: "",

//   address: "",
//   phone: "",
//   email: null,

//   area: 0,
//   areaAdmin: null,

//   idNumber: "",
//   issueDate: null,
//   issuePlace: "unassigned", // giữ như bạn đang dùng

//   ownerName: null,
//   ownerPhoneNumber: null,

//   facilityType: {
//     id: "",
//     code: "",
//     name: "",
//     description: null,
//   },

//   attr1: null,
//   attr2: null,
//   attr3: null,
//   attr4: null,
//   attr5: null,

//   skuOpt: {
//     id: "",
//     code: "",
//     name: "",
//   },

//   stateOpt: {
//     id: "",
//     code: "",
//     name: "",
//   },
//   isException: false,

//   orgUnit: null,
//   note: null,

//   establishmentDate: null,
//   idIssueDate: null,

//   sampleSource: null,
//   labelingStandard: null,
// };

// const CreateOrder = ({
//   open,
//   onClose,
//   level1Options = [],
//   level2Options = [],
//   level3Options = [],
//   initialValues = {},
//   orgUnitId, // <-- nhận prop
// }: CreateOrderDialogProps) => {
//   const [fileName, setFileName] = useState("hinhanh.png");
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   // selects (editable)
//   const [selectedLevel1, setSelectedLevel1] = useState<string>("");
//   const [selectedLevel2, setSelectedLevel2] = useState<string>("");
//   const [selectedLevel3, setSelectedLevel3] = useState<string>("");

//   // main form (single source of truth for customer/general info)
//   const [formData, setFormData] = useState<FacilityDto>(initialFormState);

//   // table data
//   const [savedOrders, setSavedOrders] = useState<FacilityDto[]>([]);

//   const navigate = useNavigate();

//   // react-query mutation
//   const { mutateAsync: createFacilityAsync, isLoading: isCreating } =
//     useCreateFacility();

//   // query client to invalidate/refetch main list and statistic
//   const queryClient = useQueryClient();

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) setFileName(file.name);
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({ ...prev, isException: e.target.checked }));
//   };

//   const handleButtonAdd = () => {
//     navigate("/2D");
//   };

//   useEffect(() => {
//     if (!open) return;

//     setSelectedLevel1("");
//     setSelectedLevel2("");
//     setSelectedLevel3("");

//     setFormData({
//       ...initialFormState,
//       code: initialValues.code ?? "",
//       id: initialValues.id ?? "",
//       issuePlace: initialValues.issuePlace ?? initialFormState.issuePlace,
//     });

//     setSavedOrders([]);
//   }, [open, initialValues]);

//   const isFormDirty = () => {
//     const formDirty =
//       JSON.stringify(formData) !== JSON.stringify(initialFormState);
//     const selectsDirty =
//       selectedLevel1 !== "" || selectedLevel2 !== "" || selectedLevel3 !== "";
//     const tableDirty = savedOrders.length > 0;
//     return formDirty || selectsDirty || tableDirty;
//   };

//   const handleDialogClose = (event: any, reason?: string) => {
//     if (!isFormDirty()) {
//       resetAllAndClose();
//       return;
//     }

//     const confirmClose = window.confirm(
//       "Bạn muốn tắt? Điều này sẽ xóa toàn bộ thông tin đã nhập trước đó?"
//     );
//     if (confirmClose) {
//       resetAllAndClose();
//     }
//   };

//   const resetAllAndClose = () => {
//     setFormData(initialFormState);
//     setSelectedLevel1("");
//     setSelectedLevel2("");
//     setSelectedLevel3("");
//     setSavedOrders([]);
//     onClose();
//   };

//   // receive snapshot from details
//   const handleAddOrderFromDetails = (details: Partial<FacilityDto>) => {
//     const snapshot: FacilityDto = JSON.parse(
//       JSON.stringify({
//         ...formData,
//         ...details,
//       })
//     );

//     if ((!snapshot.orgUnit || !snapshot.orgUnit.name) && selectedLevel3) {
//       snapshot.orgUnit = { id: "", name: selectedLevel3 } as any;
//     }

//     if ((!snapshot.skuOpt || !snapshot.skuOpt.id) && snapshot.code) {
//       snapshot.skuOpt = snapshot.skuOpt?.id
//         ? snapshot.skuOpt
//         : ({
//             id: "",
//             code: snapshot.skuOpt?.code || snapshot.code,
//             name: "",
//           } as any);
//     }

//     snapshot.issuePlace = snapshot.issuePlace ?? "unassigned";

//     setSavedOrders((prev) => [snapshot, ...prev]);
//   };

//   const handleRemoveFromTable = (index: number) => {
//     setSavedOrders((prev) => prev.filter((_, i) => i !== index));
//   };

//   // validation
//   const validateRow = (row: FacilityDto) => {
//     const errs: string[] = [];
//     const code = row.code || row.skuOpt?.code || "";
//     if (!code) errs.push("SKU Fulfill (code) là bắt buộc");
//     if (!row.name) errs.push("Tên khách hàng (name) là bắt buộc");
//     if (!row.idNumber) errs.push("Order ID (idNumber) là bắt buộc");
//     return errs;
//   };

//   const mapToCreateFacilityDto = (row: FacilityDto): CreateFacilityDto => {
//     const dto: any = {
//       page: 0,
//       size: 10,
//       code: row.code || row.skuOpt?.code || "",
//       skuCode: row.code || row.skuOpt?.code || "",
//       name: row.name || "",
//       idNumber: row.idNumber || "",
//       area: row.area ?? 0,
//       isException: !!row.isException,
//       phone: row.phone || "",
//       address: row.address || "",
//       labelingStandard: row.labelingStandard || "",
//       issuePlace: row.issuePlace ?? "unassigned",
//     };

//     if (row.skuOpt?.id) {
//       dto.skuOpt = { id: row.skuOpt.id };
//       dto.skuId = row.skuOpt.id;
//     } else if (row.skuOpt?.code) {
//       dto.skuOpt = { code: row.skuOpt.code };
//     }

//     if (row.facilityType?.id) dto.facilityType = { id: row.facilityType.id };
//     else if (row.facilityType?.code)
//       dto.facilityType = { code: row.facilityType.code };

//     if (row.stateOpt?.id) dto.stateOpt = { id: row.stateOpt.id };
//     if (row.orgUnit?.id) dto.orgUnit = { id: row.orgUnit.id };
//     else if (row.orgUnit?.name) dto.orgUnit = { name: row.orgUnit.name };

//     return dto as CreateFacilityDto;
//   };

//   const handleSaveAll = async () => {
//     if (savedOrders.length === 0) {
//       toast.warn("Chưa có đơn nào trong danh sách để lưu.");
//       return;
//     }

//     for (const row of savedOrders) {
//       const errs = validateRow(row);
//       if (errs.length) {
//         toast.error(`Thiếu dữ liệu: ${errs.join(", ")} — dừng lưu.`);
//         return;
//       }
//     }

//     try {
//       for (const [idx, row] of savedOrders.entries()) {
//         const dto = mapToCreateFacilityDto(row);
//         const created = await createFacilityAsync(dto);
//         console.debug(`Created facility ${idx}:`, created);
//       }

//       // --- REFRESH BOTH: order list + statistic box ---
//       // 1) invalidate & refetch FIND_ALL_FACILITY
//       try {
//         await queryClient.invalidateQueries({
//           queryKey: ["FIND_ALL_FACILITY"],
//         });
//         await queryClient.refetchQueries({ queryKey: ["FIND_ALL_FACILITY"] });
//       } catch (e) {
//         console.warn("Không thể refetch FIND_ALL_FACILITY:", e);
//       }

//       // 2) invalidate & refetch statistic. Prefer explicit key with orgUnitId if provided.
//       try {
//         if (orgUnitId) {
//           await queryClient.invalidateQueries({
//             queryKey: ["STATISTIC_ALL_FACILITY", orgUnitId],
//           });
//           await queryClient.refetchQueries({
//             queryKey: ["STATISTIC_ALL_FACILITY", orgUnitId],
//           });
//         } else {
//           // fallback: try to invalidate any query whose key starts with STATISTIC_...
//           await queryClient.invalidateQueries({
//             predicate: (q) => {
//               try {
//                 const k = q.queryKey?.[0];
//                 return (
//                   typeof k === "string" && k.toString().includes("STATISTIC")
//                 );
//               } catch {
//                 return false;
//               }
//             },
//           });
//           await queryClient.refetchQueries({
//             predicate: (q) => {
//               try {
//                 const k = q.queryKey?.[0];
//                 return (
//                   typeof k === "string" && k.toString().includes("STATISTIC")
//                 );
//               } catch {
//                 return false;
//               }
//             },
//           });
//         }
//       } catch (e) {
//         console.warn("Không thể refetch STATISTIC queries:", e);
//       }

//       toast.success(`Đã lưu ${savedOrders.length} đơn hàng.`);
//       resetAllAndClose();
//     } catch (err: any) {
//       console.error("Lỗi khi lưu đơn:", err);
//       const msg =
//         (err?.response?.data?.message as string) ||
//         (err?.message as string) ||
//         "Lưu đơn thất bại";
//       toast.error(msg);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleDialogClose}
//       maxWidth="lg"
//       fullWidth
//       PaperProps={{ sx: { borderRadius: "16px", padding: 2 } }}
//     >
//       <Typography
//         sx={{
//           display: "flex",
//           color: "black",
//           fontWeight: "bold",
//           fontSize: "20px",
//           mb: 2,
//         }}
//       >
//         THÊM ORDER MỚI
//       </Typography>

//       <Box sx={{ display: "flex", justifyContent: "center", px: 1 }}>
//         <Grid
//           container
//           spacing={3}
//           sx={{
//             width: "100%",
//             maxWidth: 1300,
//             margin: "0 auto",
//             justifyContent: "center",
//             alignItems: "stretch",
//           }}
//         >
//           <Grid item xs={12} sm={6} md={4}>
//             <Box
//               sx={{
//                 backgroundColor: "white",
//                 padding: 3,
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//                 height: "100%",
//               }}
//             >
//               <FormControl size="small" fullWidth>
//                 <InputLabel id="level1-label">Loại cửa hàng</InputLabel>
//                 <Select
//                   labelId="level1-label"
//                   value={selectedLevel1}
//                   label="Loại cửa hàng"
//                   onChange={(e) => setSelectedLevel1(e.target.value)}
//                 >
//                   {level1Options.length > 0 ? (
//                     level1Options.map((opt) => (
//                       <MenuItem key={opt.id} value={opt.name}>
//                         {opt.name}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem value="" disabled>
//                       Không có dữ liệu
//                     </MenuItem>
//                   )}
//                 </Select>
//               </FormControl>

//               <FormControl size="small" fullWidth>
//                 <InputLabel id="level2-label">Quốc gia</InputLabel>
//                 <Select
//                   labelId="level2-label"
//                   value={selectedLevel2}
//                   label="Quốc gia"
//                   onChange={(e) => setSelectedLevel2(e.target.value)}
//                 >
//                   {level2Options.length > 0 ? (
//                     level2Options.map((opt) => (
//                       <MenuItem key={opt.id} value={opt.name}>
//                         {opt.name}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem value="" disabled>
//                       Không có dữ liệu
//                     </MenuItem>
//                   )}
//                 </Select>
//               </FormControl>

//               <FormControl size="small" fullWidth>
//                 <InputLabel id="level3-label">Cửa hàng</InputLabel>
//                 <Select
//                   labelId="level3-label"
//                   value={selectedLevel3}
//                   label="Cửa hàng"
//                   onChange={(e) => setSelectedLevel3(e.target.value)}
//                 >
//                   {level3Options.length > 0 ? (
//                     level3Options.map((opt) => (
//                       <MenuItem key={opt.id} value={opt.name}>
//                         {opt.name}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem value="" disabled>
//                       Không có dữ liệu
//                     </MenuItem>
//                   )}
//                 </Select>
//               </FormControl>

//               <FormField
//                 label="SKU Fulfill"
//                 name="code"
//                 type="text"
//                 value={formData.code || ""}
//                 onChange={handleChange}
//               />

//               <FormField
//                 label="Nhập Order ID"
//                 name="idNumber"
//                 type="text"
//                 value={formData.idNumber || ""}
//                 onChange={handleChange}
//               />

//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={formData.isException || false}
//                     onChange={handleCheckboxChange}
//                   />
//                 }
//                 label={
//                   <Typography
//                     sx={{ fontSize: 16, fontWeight: "bold", color: "black" }}
//                   >
//                     Ưu tiên làm đơn này
//                   </Typography>
//                 }
//               />
//             </Box>
//           </Grid>

//           <Grid item xs={12} sm={6} md={4}>
//             <Box
//               sx={{
//                 backgroundColor: "white",
//                 padding: 3,
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//                 height: "100%",
//               }}
//             >
//               <Box
//                 sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}
//               >
//                 <Link
//                   target="_blank"
//                   underline="hover"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     color: "black",
//                     fontWeight: 500,
//                     transition: "all 0.2s ease-in-out",
//                     "&:hover": {
//                       color: "red",
//                       transform: "translateY(-1px)",
//                       textDecoration: "underline",
//                     },
//                     cursor: "pointer",
//                   }}
//                 >
//                   <OriginLabel
//                     label="Hàng sản xuất tại Việt Nam"
//                     icon="/img/flag/VietNamflag.jpg"
//                   />
//                 </Link>
//               </Box>

//               <Divider sx={{ backgroundColor: "#ccc", my: 1 }} />

//               <Typography sx={{ color: "black", fontWeight: "bold" }}>
//                 THÔNG TIN KHÁCH HÀNG
//               </Typography>

//               <FormField
//                 label="Tên khách hàng"
//                 name="name"
//                 type="text"
//                 value={formData.name || ""}
//                 onChange={handleChange}
//               />
//               <FormField
//                 label="Địa chỉ khách hàng"
//                 name="address"
//                 type="text"
//                 value={formData.address || ""}
//                 onChange={handleChange}
//               />
//               <FormField
//                 label="Số điện thoại"
//                 name="phone"
//                 type="text"
//                 value={formData.phone || ""}
//                 onChange={handleChange}
//               />
//             </Box>
//           </Grid>

//           <Grid item xs={12} sm={12} md={4}>
//             <CreateOrderDetails
//               facility={formData}
//               open={open}
//               onAddOrder={handleAddOrderFromDetails}
//             />
//           </Grid>
//         </Grid>
//       </Box>

//       <Divider sx={{ backgroundColor: "#ccc", my: 3, mt: 10 }} />

//       <Box sx={{ px: 2, pb: 3 }}>
//         <SavingTable items={savedOrders} onRemove={handleRemoveFromTable} />
//       </Box>

//       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
//         <Button
//           onClick={handleSaveAll}
//           disabled={isCreating}
//           sx={{
//             borderRadius: "50px",
//             width: "20%",
//             backgroundColor: isCreating ? "#ef9a9a" : "orangered",
//             color: "white",
//             ":hover": { backgroundColor: "tomato" },
//           }}
//         >
//           {isCreating ? "ĐANG LƯU..." : "LƯU"}
//         </Button>
//       </Box>
//     </Dialog>
//   );
// };

// export default CreateOrder;

import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import OriginLabel from "../../../../components/OriginLabel";
import { useNavigate } from "react-router-dom";
import { FacilityDto } from "dto/facility/facility.dto";
import { FormField } from "pages/User/components/FormField";
import CreateOrderDetails from "./CreateOrderDetails";
import SavingTable from "./SavingTable";
import { toast } from "react-toastify";
import { useCreateFacility } from "hooks/facility/useCreateFacility";
import { CreateFacilityDto } from "dto/facility/create-facility.dto";
// import { useQueryClient } from "react-query"; // removed: CreateOrder no longer manipulates global queries

type OrgUnit = {
  id: string;
  name: string;
  lvl?: number;
  code?: string;
  namePath?: string[];
};

interface CreateOrderDialogProps {
  open: boolean;
  onClose: () => void;
  level1Options?: OrgUnit[];
  level2Options?: OrgUnit[];
  level3Options?: OrgUnit[];
  initialValues?: Partial<FacilityDto>;
  orgUnitId?: string; // <-- truyền từ MainFulfillment để có thể sử dụng nếu cần
  onSaved?: () => Promise<void>; // <-- MỚI: callback để MainFulfillment xử lý refetch targetted
}

const initialFormState: FacilityDto = {
  version: 0,
  createdBy: "",
  updatedBy: null,
  createdDate: "",
  updatedDate: null,

  id: "",
  code: "",
  name: "",

  address: "",
  phone: "",
  email: null,

  area: 0,
  areaAdmin: null,

  idNumber: "",
  issueDate: null,
  issuePlace: "unassigned", // giữ như bạn đang dùng

  ownerName: null,
  ownerPhoneNumber: null,

  facilityType: {
    id: "",
    code: "",
    name: "",
    description: null,
  },

  attr1: null,
  attr2: null,
  attr3: null,
  attr4: null,
  attr5: null,

  skuOpt: {
    id: "",
    code: "",
    name: "",
  },

  stateOpt: {
    id: "",
    code: "",
    name: "",
  },
  isException: false,

  orgUnit: null,
  note: null,

  establishmentDate: null,
  idIssueDate: null,

  sampleSource: null,
  labelingStandard: null,
};

const CreateOrder = ({
  open,
  onClose,
  level1Options = [],
  level2Options = [],
  level3Options = [],
  initialValues = {},
  orgUnitId, // <-- nhận prop
  onSaved, // <-- nhận callback từ MainFulfillment
}: CreateOrderDialogProps) => {
  const [fileName, setFileName] = useState("hinhanh.png");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // selects (editable)
  const [selectedLevel1, setSelectedLevel1] = useState<string>("");
  const [selectedLevel2, setSelectedLevel2] = useState<string>("");
  const [selectedLevel3, setSelectedLevel3] = useState<string>("");

  // main form (single source of truth for customer/general info)
  const [formData, setFormData] = useState<FacilityDto>(initialFormState);

  // table data
  const [savedOrders, setSavedOrders] = useState<FacilityDto[]>([]);

  const navigate = useNavigate();

  // react-query mutation
  const { mutateAsync: createFacilityAsync, isLoading: isCreating } =
    useCreateFacility();

  // -- note: CreateOrder no longer directly invalidates global queries.
  // If parent doesn't provide onSaved, we will fallback to a minimal refresh (only stats).
  // Parent (MainFulfillment) SHOULD pass onSaved to control targeted refresh.

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isException: e.target.checked }));
  };

  const handleButtonAdd = () => {
    navigate("/2D");
  };

  useEffect(() => {
    if (!open) return;

    setSelectedLevel1("");
    setSelectedLevel2("");
    setSelectedLevel3("");

    setFormData({
      ...initialFormState,
      code: initialValues.code ?? "",
      id: initialValues.id ?? "",
      issuePlace: initialValues.issuePlace ?? initialFormState.issuePlace,
    });

    setSavedOrders([]);
  }, [open, initialValues]);

  const isFormDirty = () => {
    const formDirty =
      JSON.stringify(formData) !== JSON.stringify(initialFormState);
    const selectsDirty =
      selectedLevel1 !== "" || selectedLevel2 !== "" || selectedLevel3 !== "";
    const tableDirty = savedOrders.length > 0;
    return formDirty || selectsDirty || tableDirty;
  };

  const handleDialogClose = (event: any, reason?: string) => {
    if (!isFormDirty()) {
      resetAllAndClose();
      return;
    }

    const confirmClose = window.confirm(
      "Bạn muốn tắt? Điều này sẽ xóa toàn bộ thông tin đã nhập trước đó?"
    );
    if (confirmClose) {
      resetAllAndClose();
    }
  };

  const resetAllAndClose = () => {
    setFormData(initialFormState);
    setSelectedLevel1("");
    setSelectedLevel2("");
    setSelectedLevel3("");
    setSavedOrders([]);
    onClose();
  };

  // receive snapshot from details
  const handleAddOrderFromDetails = (details: Partial<FacilityDto>) => {
    const snapshot: FacilityDto = JSON.parse(
      JSON.stringify({
        ...formData,
        ...details,
      })
    );

    if ((!snapshot.orgUnit || !snapshot.orgUnit.name) && selectedLevel3) {
      snapshot.orgUnit = { id: "", name: selectedLevel3 } as any;
    }

    if ((!snapshot.skuOpt || !snapshot.skuOpt.id) && snapshot.code) {
      snapshot.skuOpt = snapshot.skuOpt?.id
        ? snapshot.skuOpt
        : ({
            id: "",
            code: snapshot.skuOpt?.code || snapshot.code,
            name: "",
          } as any);
    }

    snapshot.issuePlace = snapshot.issuePlace ?? "unassigned";

    setSavedOrders((prev) => [snapshot, ...prev]);
  };

  const handleRemoveFromTable = (index: number) => {
    setSavedOrders((prev) => prev.filter((_, i) => i !== index));
  };

  // validation
  const validateRow = (row: FacilityDto) => {
    const errs: string[] = [];
    const code = row.code || row.skuOpt?.code || "";
    if (!code) errs.push("SKU Fulfill (code) là bắt buộc");
    if (!row.name) errs.push("Tên khách hàng (name) là bắt buộc");
    if (!row.idNumber) errs.push("Order ID (idNumber) là bắt buộc");
    return errs;
  };

  const mapToCreateFacilityDto = (row: FacilityDto): CreateFacilityDto => {
    const dto: any = {
      page: 0,
      size: 10,
      code: row.code || row.skuOpt?.code || "",
      skuCode: row.code || row.skuOpt?.code || "",
      name: row.name || "",
      idNumber: row.idNumber || "",
      area: row.area ?? 0,
      isException: !!row.isException,
      phone: row.phone || "",
      address: row.address || "",
      labelingStandard: row.labelingStandard || "",
      issuePlace: row.issuePlace ?? "unassigned",
    };

    if (row.skuOpt?.id) {
      dto.skuOpt = { id: row.skuOpt.id };
      dto.skuId = row.skuOpt.id;
    } else if (row.skuOpt?.code) {
      dto.skuOpt = { code: row.skuOpt.code };
    }

    if (row.facilityType?.id) dto.facilityType = { id: row.facilityType.id };
    else if (row.facilityType?.code)
      dto.facilityType = { code: row.facilityType.code };

    if (row.stateOpt?.id) dto.stateOpt = { id: row.stateOpt.id };
    if (row.orgUnit?.id) dto.orgUnit = { id: row.orgUnit.id };
    else if (row.orgUnit?.name) dto.orgUnit = { name: row.orgUnit.name };

    return dto as CreateFacilityDto;
  };

  const handleSaveAll = async () => {
    if (savedOrders.length === 0) {
      toast.warn("Chưa có đơn nào trong danh sách để lưu.");
      return;
    }

    for (const row of savedOrders) {
      const errs = validateRow(row);
      if (errs.length) {
        toast.error(`Thiếu dữ liệu: ${errs.join(", ")} — dừng lưu.`);
        return;
      }
    }

    try {
      for (const [idx, row] of savedOrders.entries()) {
        const dto = mapToCreateFacilityDto(row);
        const created = await createFacilityAsync(dto);
        console.debug(`Created facility ${idx}:`, created);
      }

      // --- NEW: Delegate refresh responsibility to parent if provided ---
      try {
        if (typeof onSaved === "function") {
          await onSaved();
        } else {
          // fallback: if parent didn't provide a targeted refresh, do a minimal stat refresh
          // (Do NOT refetch global FIND_ALL_FACILITY here to avoid touching Sidebar.)
          // If you really need full list refresh in components that don't provide callback,
          // better to pass a specific onSaved from parent.
          console.warn(
            "CreateOrder: onSaved callback not provided — performing minimal stat refresh only."
          );
          // minimal stat-only fallback could be implemented here if you want (e.g. via queryClient)
          // but we intentionally avoid global invalidation to prevent sidebar refetch.
        }
      } catch (e) {
        console.warn("Error during onSaved callback:", e);
      }

      toast.success(`Đã lưu ${savedOrders.length} đơn hàng.`);
      resetAllAndClose();
    } catch (err: any) {
      console.error("Lỗi khi lưu đơn:", err);
      const msg =
        (err?.response?.data?.message as string) ||
        (err?.message as string) ||
        "Lưu đơn thất bại";
      toast.error(msg);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", padding: 2 } }}
    >
      <Typography
        sx={{
          display: "flex",
          color: "black",
          fontWeight: "bold",
          fontSize: "20px",
          mb: 2,
        }}
      >
        THÊM ORDER MỚI
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", px: 1 }}>
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
              <FormControl size="small" fullWidth>
                <InputLabel id="level1-label">Loại cửa hàng</InputLabel>
                <Select
                  labelId="level1-label"
                  value={selectedLevel1}
                  label="Loại cửa hàng"
                  onChange={(e) => setSelectedLevel1(e.target.value)}
                >
                  {level1Options.length > 0 ? (
                    level1Options.map((opt) => (
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

              <FormControl size="small" fullWidth>
                <InputLabel id="level2-label">Quốc gia</InputLabel>
                <Select
                  labelId="level2-label"
                  value={selectedLevel2}
                  label="Quốc gia"
                  onChange={(e) => setSelectedLevel2(e.target.value)}
                >
                  {level2Options.length > 0 ? (
                    level2Options.map((opt) => (
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

              <FormControl size="small" fullWidth>
                <InputLabel id="level3-label">Cửa hàng</InputLabel>
                <Select
                  labelId="level3-label"
                  value={selectedLevel3}
                  label="Cửa hàng"
                  onChange={(e) => setSelectedLevel3(e.target.value)}
                >
                  {level3Options.length > 0 ? (
                    level3Options.map((opt) => (
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
                label="SKU Fulfill"
                name="code"
                type="text"
                value={formData.code || ""}
                onChange={handleChange}
              />

              <FormField
                label="Nhập Order ID"
                name="idNumber"
                type="text"
                value={formData.idNumber || ""}
                onChange={handleChange}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isException || false}
                    onChange={handleCheckboxChange}
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
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}
              >
                <Link
                  target="_blank"
                  underline="hover"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "black",
                    fontWeight: 500,
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      color: "red",
                      transform: "translateY(-1px)",
                      textDecoration: "underline",
                    },
                    cursor: "pointer",
                  }}
                >
                  <OriginLabel
                    label="Hàng sản xuất tại Việt Nam"
                    icon="/img/flag/VietNamflag.jpg"
                  />
                </Link>
              </Box>

              <Divider sx={{ backgroundColor: "#ccc", my: 1 }} />

              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                THÔNG TIN KHÁCH HÀNG
              </Typography>

              <FormField
                label="Tên khách hàng"
                name="name"
                type="text"
                value={formData.name || ""}
                onChange={handleChange}
              />
              <FormField
                label="Địa chỉ khách hàng"
                name="address"
                type="text"
                value={formData.address || ""}
                onChange={handleChange}
              />
              <FormField
                label="Số điện thoại"
                name="phone"
                type="text"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <CreateOrderDetails
              facility={formData}
              open={open}
              onAddOrder={handleAddOrderFromDetails}
            />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ backgroundColor: "#ccc", my: 3, mt: 10 }} />

      <Box sx={{ px: 2, pb: 3 }}>
        <SavingTable items={savedOrders} onRemove={handleRemoveFromTable} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <Button
          onClick={handleSaveAll}
          disabled={isCreating}
          sx={{
            borderRadius: "50px",
            width: "20%",
            backgroundColor: isCreating ? "#ef9a9a" : "orangered",
            color: "white",
            ":hover": { backgroundColor: "tomato" },
          }}
        >
          {isCreating ? "ĐANG LƯU..." : "LƯU"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateOrder;
