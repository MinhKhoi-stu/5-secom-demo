// // import {
// //   Box,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Typography,
// //   Paper,
// // } from "@mui/material";
// // import PaginationWrapper from "components/common/PaginationWrapper";
// // import { useState } from "react";
// // import { Order } from "types/OrderTable";

// // interface Props {
// //   orders: Order[];
// //   onAccept: (order: Order) => void;
// // }

// // const OrdersUnassignedTable = ({ orders, onAccept }: Props) => {
// //   //PAGINATION
// //   const [page, setPage] = useState(1);
// //   const itemsPerPage = 8;

// //   const handlePageChange = (
// //     event: React.ChangeEvent<unknown>,
// //     value: number
// //   ) => {
// //     setPage(value);
// //   };

// //   const paginatedOrders = orders.slice(
// //     (page - 1) * itemsPerPage,
// //     page * itemsPerPage
// //   );
// //   return (
// //     <Box
// //       sx={{
// //         width: "96%",
// //         backgroundColor: "white",
// //         borderRadius: "20px",
// //         padding: 3,
// //         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
// //         mt: 2,
// //         textAlign: "left",
// //       }}
// //     >
// //       <TableContainer component={Paper} elevation={0}>
// //         <Table>
// //           <TableHead>
// //             <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
// //               <TableCell>SKU</TableCell>
// //               <TableCell>Order ID</TableCell>
// //               <TableCell>Ngày</TableCell>
// //               <TableCell>Hình Demo</TableCell>
// //               <TableCell>Sản phẩm</TableCell>
// //               <TableCell>Loại</TableCell>
// //               <TableCell>Số lượng</TableCell>
// //               <TableCell>Trạng thái</TableCell>
// //               <TableCell>Thao tác</TableCell>
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {paginatedOrders.map((order, index) => (
// //               <TableRow key={index}>
// //                 <TableCell>{order.sku}</TableCell>
// //                 <TableCell>{order.orderId}</TableCell>
// //                 <TableCell>{order.date}</TableCell>
// //                 <TableCell>
// //                   <img
// //                     src={order.demoImage}
// //                     alt="demo"
// //                     style={{ width: 40, height: 40, borderRadius: "8px" }}
// //                   />
// //                 </TableCell>
// //                 <TableCell>{order.product}</TableCell>
// //                 <TableCell>{order.type}</TableCell>
// //                 <TableCell>{order.quantity}</TableCell>
// //                 <TableCell>{order.status}</TableCell>
// //                 <TableCell>
// //                   <Button
// //                     variant="contained"
// //                     size="small"
// //                     onClick={() => onAccept(order)}
// //                     sx={{
// //                       backgroundColor: "lightsalmon",
// //                       color: "black",
// //                     }}
// //                   >
// //                     Nhận đơn
// //                   </Button>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //             {orders.length === 0 && (
// //               <TableRow>
// //                 <TableCell colSpan={9} align="center">
// //                   Không có đơn hàng nào cần xử lý
// //                 </TableCell>
// //               </TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //         {/* Pagination */}
// //         <PaginationWrapper
// //           page={page}
// //           totalPages={Math.ceil(orders.length / itemsPerPage)}
// //           totalItems={orders.length}
// //           itemsPerPage={itemsPerPage}
// //           onChange={handlePageChange}
// //         />
// //       </TableContainer>
// //     </Box>
// //   );
// // };

// // export default OrdersUnassignedTable;

// // File: components/FacilityOrdersTable.tsx
// import React, { useMemo, useState, useCallback } from "react";
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import PaginationWrapper from "components/common/PaginationWrapper";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useFindAllFacility } from "hooks/facility/useFindAllFacility";
// import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
// import useFindAllFacilityCustom from "hooks/facility/useFindAllFacilityCustom";

// const FACILITY_BASE = "/facility";

// const getTypeCodeFromPath = (pathname: string | undefined | null) => {
//   const p = (pathname ?? "").toString();
//   const parts = p.split("/").filter(Boolean);
//   const base = FACILITY_BASE.replace(/^\//, "").toLowerCase();
//   if (parts.length >= 2 && parts[0].toLowerCase() === base) {
//     try {
//       return decodeURIComponent(parts[1]);
//     } catch {
//       return parts[1];
//     }
//   }
//   return null;
// };

// const extractFacilityTypeIdFromOptions = (
//   optionsData: any
// ): string | undefined => {
//   if (!optionsData) return undefined;
//   const topOptionGroupId =
//     optionsData?.data?.optionGroup?.id ||
//     optionsData?.optionGroup?.id ||
//     optionsData?.data?.id ||
//     optionsData?.id;
//   if (topOptionGroupId) return topOptionGroupId;

//   const arrCandidates =
//     optionsData?.data?.content ??
//     optionsData?.data?.items ??
//     optionsData?.content ??
//     optionsData?.items ??
//     null;

//   if (Array.isArray(arrCandidates) && arrCandidates.length > 0) {
//     const first = arrCandidates[0];
//     if (!first) return undefined;
//     if (first.optionGroupId) return first.optionGroupId;
//     if (first.optionGroup && first.optionGroup.id) return first.optionGroup.id;
//     if (first.groupId) return first.groupId;
//     if (first.id && (first.parentId == null || first.parentId === ""))
//       return first.id;
//   }

//   try {
//     const stack = [optionsData];
//     while (stack.length) {
//       const node: any = stack.pop();
//       if (!node || typeof node !== "object") continue;
//       if (node.optionGroup && node.optionGroup.id) return node.optionGroup.id;
//       if (node.optionGroupId) return node.optionGroupId;
//       for (const k of Object.keys(node)) {
//         const v = node[k];
//         if (v && typeof v === "object") stack.push(v);
//       }
//     }
//   } catch {
//     // ignore
//   }

//   return undefined;
// };

// const extractFacilityTypeNameFromOptions = (
//   optionsData: any
// ): string | undefined => {
//   if (!optionsData) return undefined;
//   return (
//     optionsData?.data?.optionGroup?.name ??
//     optionsData?.optionGroup?.name ??
//     optionsData?.data?.name ??
//     optionsData?.name
//   );
// };

// interface Props {
//   facilityTypeId?: string;
//   typeCode?: string;
//   pageSize?: number;
//   issuePlace?: string;
//   onAccept?: (facility: any) => void;
// }

// const FacilityOrdersTable: React.FC<Props> = ({
//   facilityTypeId: facilityTypeIdProp,
//   typeCode: typeCodeProp,
//   pageSize = 8,
//   issuePlace = "unassigned",
//   onAccept,
// }) => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [page, setPage] = useState<number>(1);
//   const size = pageSize;

//   const typeCodeFromPath = getTypeCodeFromPath(location.pathname);
//   const typeCode = typeCodeProp ?? typeCodeFromPath ?? undefined;

//   const locationStateAny: any = (location as any).state ?? {};
//   const facilityTypeIdFromState: string | undefined =
//     locationStateAny?.facilityTypeId;

//   const shouldResolveOptions =
//     !facilityTypeIdProp && !facilityTypeIdFromState && !!typeCode;

//   const optionsQuery = useFindOptionsByGroup
//     ? useFindOptionsByGroup(
//         "facility-type",
//         0,
//         50,
//         shouldResolveOptions ? typeCode : undefined
//       )
//     : (null as any);

//   const optionsData = optionsQuery?.data;
//   const optionsLoading = optionsQuery?.isLoading || optionsQuery?.isFetching;

//   const resolvedFacilityTypeId = useMemo(() => {
//     if (facilityTypeIdProp) return facilityTypeIdProp;
//     if (facilityTypeIdFromState) return facilityTypeIdFromState;
//     return extractFacilityTypeIdFromOptions(optionsData);
//   }, [facilityTypeIdProp, facilityTypeIdFromState, optionsData]);

//   const facilityTypeDisplayName = useMemo(() => {
//     return (
//       extractFacilityTypeNameFromOptions(optionsData) ??
//       (typeCode ? typeCode : undefined)
//     );
//   }, [optionsData, typeCode]);

//   const facilityQuery = useFindAllFacilityCustom({
//     page: page - 1,
//     size,
//     codeOrName: typeCode ?? "",
//     facilityTypeId: resolvedFacilityTypeId,
//     issuePlace,
//     sort: ["createdDate,desc", "isException,desc"],
//   }) as any;

//   const facilityData = facilityQuery?.data;
//   const facilityLoading = facilityQuery?.isLoading || facilityQuery?.isFetching;
//   const facilities: any[] = useMemo(() => {
//     if (!facilityData) return [];
//     return (
//       facilityData?.content ??
//       facilityData?.data?.content ??
//       facilityData?.data ??
//       facilityData?.items ??
//       facilityData?.content?.items ??
//       []
//     );
//   }, [facilityData]);

//   const totalItems: number = useMemo(() => {
//     return (
//       facilityData?.totalElements ??
//       facilityData?.data?.totalElements ??
//       facilityData?.total ??
//       facilityData?.data?.total ??
//       facilities.length
//     );
//   }, [facilityData, facilities]);

//   const getFirstImage = (sampleSource: any): string | undefined => {
//     if (!sampleSource) return undefined;
//     if (typeof sampleSource === "string") return sampleSource;
//     if (Array.isArray(sampleSource)) {
//       const first = sampleSource[0];
//       if (!first) return undefined;
//       if (typeof first === "string") return first;
//       return first.url ?? first.path ?? undefined;
//     }
//     return sampleSource.url ?? sampleSource.path ?? undefined;
//   };

//   const rows = useMemo(
//     () =>
//       facilities.map((f: any, idx: number) => {
//         return {
//           id: f?.id ?? f?.code ?? `f-${idx}`,
//           sku: f?.skuOpt?.name,
//           // ?? f?.skuCode ?? f?.sku ?? f?.productSku ?? "",
//           orderId:
//             f?.idNumber ??
//             f?.externalOrderId ??
//             f?.order?.orderId ??
//             f?.orderCode ??
//             f?.code ??
//             "",
//           date: f?.createdDate
//             ? new Date(f.createdDate).toLocaleString("vi-VN")
//             : f?.date ?? "",
//           demoImage: getFirstImage(
//             f?.sampleSource ?? f?.sampleSources ?? f?.samples
//           ),
//           product:
//             f?.product?.name ??
//             f?.option?.name ??
//             f?.productName ??
//             f?.skuName ??
//             "",
//           size: f?.stateOpt?.name ?? f?.stateOptName ?? f?.size ?? "",
//           quantity: f?.area ?? f?.quantity ?? f?.amount ?? 0,
//           status: f?.facilityType?.name ?? facilityTypeDisplayName ?? "",
//           raw: f,
//         };
//       }),
//     [facilities, facilityTypeDisplayName]
//   );

//   const handlePageChange = useCallback(
//     (_: React.ChangeEvent<unknown>, value: number) => {
//       setPage(value);
//     },
//     []
//   );

//   const handleAccept = useCallback(
//     (row: any) => {
//       if (typeof onAccept === "function") {
//         onAccept(row.raw);
//         return;
//       }
//       console.log("Nhận đơn (default):", row.raw);
//       if (typeCode) {
//         navigate(
//           `${FACILITY_BASE}/${encodeURIComponent(typeCode)}/detail/${row.id}`
//         );
//       }
//     },
//     [onAccept, navigate, typeCode]
//   );

//   const isLoading = optionsLoading || facilityLoading;

//   return (
//     <Box
//       sx={{
//         width: "96%",
//         backgroundColor: "white",
//         borderRadius: "20px",
//         padding: 3,
//         boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//         mt: 2,
//         textAlign: "left",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mb: 2,
//         }}
//       >
//         <Typography variant="h6" color="black">
//           {facilityTypeDisplayName
//             ? `Loại xử lý: ${facilityTypeDisplayName}`
//             : "Đơn hàng"}
//         </Typography>

//         {isLoading && (
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <CircularProgress size={18} />
//             <Typography variant="body2">Đang tải...</Typography>
//           </Box>
//         )}
//       </Box>

//       <TableContainer component={Paper} elevation={0}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
//               <TableCell>SKU</TableCell>
//               <TableCell>Order ID</TableCell>
//               <TableCell>Ngày</TableCell>
//               <TableCell>Hình Demo</TableCell>
//               <TableCell>Sản phẩm</TableCell>
//               <TableCell>Kích thước</TableCell>
//               <TableCell>Số lượng</TableCell>
//               <TableCell>Trạng thái</TableCell>
//               <TableCell>Thao tác</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {rows.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.sku}</TableCell>
//                 <TableCell>{row.orderId}</TableCell>
//                 <TableCell>{row.date}</TableCell>
//                 <TableCell>
//                   {row.demoImage ? (
//                     <img
//                       src={row.demoImage}
//                       alt="demo"
//                       style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: 8,
//                         objectFit: "cover",
//                       }}
//                     />
//                   ) : (
//                     <Typography variant="body2" color="text.secondary">
//                       -
//                     </Typography>
//                   )}
//                 </TableCell>
//                 <TableCell>{row.product}</TableCell>
//                 <TableCell>{row.size}</TableCell>
//                 <TableCell>{row.quantity}</TableCell>
//                 <TableCell>{row.status}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     size="small"
//                     onClick={() => handleAccept(row)}
//                     sx={{ backgroundColor: "lightsalmon", color: "black" }}
//                   >
//                     Nhận đơn
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}

//             {!isLoading && rows.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={9} align="center">
//                   Không có đơn hàng nào cần xử lý
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>

//         <PaginationWrapper
//           page={page}
//           totalPages={Math.max(1, Math.ceil((totalItems ?? 0) / size))}
//           totalItems={totalItems ?? rows.length}
//           itemsPerPage={size}
//           onChange={handlePageChange}
//         />
//       </TableContainer>
//     </Box>
//   );
// };

// export default FacilityOrdersTable;

import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import PaginationWrapper from "components/common/PaginationWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import useFindAllFacilityCustom from "hooks/facility/useFindAllFacilityCustom";
import RecieveOrderForm from "./RecieveOrderForm";
import OrdersAssignTable, { Order } from "./OrdersAssignTable";

const FACILITY_BASE = "/facility";

const getTypeCodeFromPath = (pathname: string | undefined | null) => {
  const p = (pathname ?? "").toString();
  const parts = p.split("/").filter(Boolean);
  const base = FACILITY_BASE.replace(/^\//, "").toLowerCase();
  if (parts.length >= 2 && parts[0].toLowerCase() === base) {
    try {
      return decodeURIComponent(parts[1]);
    } catch {
      return parts[1];
    }
  }
  return null;
};

/* robust extractor for option-group responses */
const extractFacilityTypeIdFromOptions = (
  optionsData: any
): string | undefined => {
  if (!optionsData) return undefined;
  const topOptionGroupId =
    optionsData?.data?.optionGroup?.id ||
    optionsData?.optionGroup?.id ||
    optionsData?.data?.id ||
    optionsData?.id;
  if (topOptionGroupId) return topOptionGroupId;

  const arrCandidates =
    optionsData?.data?.content ??
    optionsData?.data?.items ??
    optionsData?.content ??
    optionsData?.items ??
    null;

  if (Array.isArray(arrCandidates) && arrCandidates.length > 0) {
    const first = arrCandidates[0];
    if (!first) return undefined;
    if (first.optionGroupId) return first.optionGroupId;
    if (first.optionGroup && first.optionGroup.id) return first.optionGroup.id;
    if (first.groupId) return first.groupId;
    if (first.id && (first.parentId == null || first.parentId === ""))
      return first.id;
  }

  try {
    const stack = [optionsData];
    while (stack.length) {
      const node: any = stack.pop();
      if (!node || typeof node !== "object") continue;
      if (node.optionGroup && node.optionGroup.id) return node.optionGroup.id;
      if (node.optionGroupId) return node.optionGroupId;
      for (const k of Object.keys(node)) {
        const v = node[k];
        if (v && typeof v === "object") stack.push(v);
      }
    }
  } catch {
    // ignore
  }

  return undefined;
};

const extractFacilityTypeNameFromOptions = (
  optionsData: any
): string | undefined => {
  if (!optionsData) return undefined;
  return (
    optionsData?.data?.optionGroup?.name ??
    optionsData?.optionGroup?.name ??
    optionsData?.data?.name ??
    optionsData?.name
  );
};

interface Props {
  facilityTypeId?: string;
  typeCode?: string;
  pageSize?: number;
  issuePlace?: string;
  onAccept?: (facility: any) => void; // nếu truyền vào -> ưu tiên, ngược lại mở dialog nhận đơn
}

const FacilityOrdersTable: React.FC<Props> = ({
  facilityTypeId: facilityTypeIdProp,
  typeCode: typeCodeProp,
  pageSize = 8,
  issuePlace = "unassigned",
  onAccept,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const size = pageSize;

  // DIALOG: Nhận đơn
  const [openReceive, setOpenReceive] = useState(false);
  const [selectedRow, setSelectedRow] = useState<{
    id: string;
    orderId: string;
    demoImage: string;
    note?: string;
    raw: any;
    mappedForAssign: Order;
  } | null>(null);

  // Danh sách đã “gán” (issuePlace = userName) để hiển thị trong OrdersAssignTable (UI)
  const [assignedOrders, setAssignedOrders] = useState<Order[]>([]);
  const [openAssignedDialog, setOpenAssignedDialog] = useState(false);

  // Ẩn các item đã “nhận” khỏi bảng Unassigned (UI-side)
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());

  // try sources for typeCode & facilityTypeId
  const typeCodeFromPath = getTypeCodeFromPath(location.pathname);
  const typeCode = typeCodeProp ?? typeCodeFromPath ?? undefined;

  // location.state might contain facilityTypeId if Sidebar navigates with state
  const locationStateAny: any = (location as any).state ?? {};
  const facilityTypeIdFromState: string | undefined =
    locationStateAny?.facilityTypeId;

  // priority for facilityTypeId: prop > location.state > resolve from options
  const shouldResolveOptions =
    !facilityTypeIdProp && !facilityTypeIdFromState && !!typeCode;

  const optionsQuery = useFindOptionsByGroup
    ? useFindOptionsByGroup(
        "facility-type",
        0,
        50,
        shouldResolveOptions ? typeCode : undefined
      )
    : (null as any);

  const optionsData = optionsQuery?.data;
  const optionsLoading = optionsQuery?.isLoading || optionsQuery?.isFetching;

  const resolvedFacilityTypeId = useMemo(() => {
    if (facilityTypeIdProp) return facilityTypeIdProp;
    if (facilityTypeIdFromState) return facilityTypeIdFromState;
    return extractFacilityTypeIdFromOptions(optionsData);
  }, [facilityTypeIdProp, facilityTypeIdFromState, optionsData]);

  const facilityTypeDisplayName = useMemo(() => {
    return (
      extractFacilityTypeNameFromOptions(optionsData) ??
      (typeCode ? typeCode : undefined)
    );
  }, [optionsData, typeCode]);

  // fetch facilities via hook
  const facilityQuery = useFindAllFacilityCustom({
    page: page - 1,
    size,
    codeOrName: typeCode ?? "",
    facilityTypeId: resolvedFacilityTypeId,
    issuePlace,
    sort: ["createdDate,desc", "isException,desc"],
  }) as any;

  const facilityData = facilityQuery?.data;
  const facilityLoading = facilityQuery?.isLoading || facilityQuery?.isFetching;

  // helper: safe get first image url from sampleSource
  const getFirstImage = (sampleSource: any): string | undefined => {
    if (!sampleSource) return undefined;
    if (typeof sampleSource === "string") return sampleSource;
    if (Array.isArray(sampleSource)) {
      const first = sampleSource[0];
      if (!first) return undefined;
      if (typeof first === "string") return first;
      return first.url ?? first.path ?? undefined;
    }
    // object
    return sampleSource.url ?? sampleSource.path ?? undefined;
  };

  const facilities: any[] = useMemo(() => {
    if (!facilityData) return [];
    const raw =
      facilityData?.content ??
      facilityData?.data?.content ??
      facilityData?.data ??
      facilityData?.items ??
      facilityData?.content?.items ??
      [];
    // lọc các id đã được “nhận” (ẩn khỏi bảng Unassigned)
    const filtered = raw.filter((f: any, idx: number) => {
      const k = f?.id ?? f?.code ?? `f-${idx}`;
      return !hiddenIds.has(k);
    });
    return filtered;
  }, [facilityData, hiddenIds]);

  const totalItems: number = useMemo(() => {
    return (
      (facilityData?.totalElements ??
        facilityData?.data?.totalElements ??
        facilityData?.total ??
        facilityData?.data?.total ??
        facilities.length) - hiddenIds.size
    );
  }, [facilityData, facilities, hiddenIds]);

  // map facilities -> rows matching required mapping
  const rows = useMemo(
    () =>
      facilities.map((f: any, idx: number) => {
        const id = f?.id ?? f?.code ?? `f-${idx}`;
        const orderId =
          f?.idNumber ??
          f?.externalOrderId ??
          f?.order?.orderId ??
          f?.orderCode ??
          f?.code ??
          "";
        const date = f?.createdDate
          ? new Date(f.createdDate).toLocaleString("vi-VN")
          : f?.date ?? "";
        const demoImage = getFirstImage(
          f?.sampleSource ?? f?.sampleSources ?? f?.samples
        );
        const product =
          f?.product?.name ??
          f?.option?.name ??
          f?.productName ??
          f?.skuName ??
          "";
        const size = f?.stateOpt?.name ?? f?.stateOptName ?? f?.size ?? "";
        const quantity = f?.area ?? f?.quantity ?? f?.amount ?? 0;
        const status = f?.facilityType?.name ?? facilityTypeDisplayName ?? "";

        // Chuẩn hóa dữ liệu chuyển sang OrdersAssignTable
        const mappedForAssign: Order = {
          sku: f?.skuOpt?.name,
          orderId,
          date,
          demoImage: demoImage ?? "",
          product,
          type: status,
          quantity: Number(quantity) || 0,
        };

        return {
          id,
          sku: f?.skuOpt?.name,
          orderId,
          date,
          demoImage,
          product,
          size,
          quantity,
          status,
          raw: f,
          mappedForAssign,
        };
      }),
    [facilities, facilityTypeDisplayName]
  );

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  const openReceiveDialog = useCallback((row: any) => {
    const note =
      row?.raw?.note ??
      row?.raw?.description ??
      row?.raw?.requirement?.note ??
      undefined;

    setSelectedRow({
      id: row.id,
      orderId: row.orderId,
      demoImage: row.demoImage ?? "",
      note,
      raw: row.raw,
      mappedForAssign: row.mappedForAssign,
    });
    setOpenReceive(true);
  }, []);

  const handleAccept = useCallback(
    (row: any) => {
      // Nếu prop onAccept được truyền, ưu tiên dùng callback đó
      if (typeof onAccept === "function") {
        onAccept(row.raw);
        return;
      }
      // Ngược lại, mở dialog nhận đơn
      openReceiveDialog(row);
    },
    [onAccept, openReceiveDialog]
  );

  // Submit từ RecieveOrderForm: status = userName (issuePlace mới)
  const handleReceiveSubmit = useCallback(
    (data: { status: string; image?: File }) => {
      if (!selectedRow) return;
      const issuePlaceNew = data.status?.trim() || "unknown";

      // UI: chuyển sang bảng Assigned + ẩn tại Unassigned
      setAssignedOrders((prev) => [selectedRow.mappedForAssign, ...prev]);
      setHiddenIds((prev) => new Set(prev).add(selectedRow.id));

      // Đóng dialog nhận đơn, mở bảng Assigned để nhìn thấy kết quả
      setOpenReceive(false);
      setSelectedRow(null);
      setOpenAssignedDialog(true);

      // (Tuỳ bạn) Nếu có API update, gọi ở đây rồi refetch
      // await facilityAPI.updateIssuePlace(selectedRow.id, issuePlaceNew)
      // facilityQuery.refetch?.();
    },
    [selectedRow]
  );

  const isLoading = optionsLoading || facilityLoading;

  return (
    <>
      <Box
        sx={{
          width: "96%",
          backgroundColor: "white",
          borderRadius: "20px",
          padding: 3,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          mt: 2,
          textAlign: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6" color="black">
            {facilityTypeDisplayName
              ? `Loại xử lý: ${facilityTypeDisplayName}`
              : "Đơn hàng"}
          </Typography>

          {isLoading && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={18} />
              <Typography variant="body2">Đang tải...</Typography>
            </Box>
          )}
        </Box>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
                <TableCell>SKU</TableCell>
                <TableCell>Order ID</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Hình Demo</TableCell>
                <TableCell>Sản phẩm</TableCell>
                <TableCell>Kích thước</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.sku}</TableCell>
                  <TableCell>{row.orderId}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    {row.demoImage ? (
                      <img
                        src={row.demoImage}
                        alt="demo"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        -
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.size}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleAccept(row)}
                      sx={{ backgroundColor: "lightsalmon", color: "black" }}
                    >
                      Nhận đơn
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {!isLoading && rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Không có đơn hàng nào cần xử lý
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <PaginationWrapper
            page={page}
            totalPages={Math.max(1, Math.ceil((totalItems ?? 0) / size))}
            totalItems={totalItems ?? rows.length}
            itemsPerPage={size}
            onChange={handlePageChange}
          />
        </TableContainer>
      </Box>

      {/* Dialog Nhận đơn */}
      <RecieveOrderForm
        open={openReceive}
        order={
          selectedRow
            ? {
                orderId: selectedRow.orderId,
                demoImage: selectedRow.demoImage,
                note: selectedRow.note,
              }
            : null
        }
        onClose={() => {
          setOpenReceive(false);
          setSelectedRow(null);
        }}
        onSubmit={handleReceiveSubmit}
      />

      {/* Dialog Assigned Orders (UI) */}
      <OrdersAssignTable
        orders={assignedOrders}
        open={openAssignedDialog}
        onClose={() => setOpenAssignedDialog(false)}
      />
    </>
  );
};

export default FacilityOrdersTable;
