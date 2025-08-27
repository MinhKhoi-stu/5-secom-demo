// // import { ExpandLess, ExpandMore } from "@mui/icons-material";
// // import {
// //   Box,
// //   Collapse,
// //   List,
// //   ListItemButton,
// //   ListItemText,
// // } from "@mui/material";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axiosClient from "utils/axios-client";

// // const menuItems = [
// //   { label: "Admin Dashboard", path: "/AdminDashboard" },
// //   {
// //     label: "Quản lý đơn hàng",
// //     children: [
// //       { label: "Đơn hàng", path: "/Fulfillment" },
// //       { label: "Chưa có hình", path: "/NoImage" },
// //       { label: "Đang vẽ 2D", path: "/RecieveOrder" },
// //       { label: "Đang vẽ thêu", path: "/Embroidery" },
// //       { label: "Đang cắt laser", path: "/Laser" },
// //       { label: "Sản xuất", path: "/Production" },
// //       { label: "Đóng gói", path: "/Packaging" },
// //       { label: "Tracking", path: "/Tracking" },
// //       { label: "Đơn hàng đã đóng gói", path: "/Completed" },
// //     ],
// //   },
// //   { label: "Quản lý Sản phẩm", path: "/Product" },
// //   { label: "Quản lý User", path: "/User" },
// //   { label: "Quản lý Tracking", path: "/Tracking" },
// //   { label: "Quản lý SKU Design", path: "/SKUDesign" },
// // ];

// // interface SidebarProps {
// //   open: boolean;
// // }

// // const Sidebar = ({ open }: SidebarProps) => {
// //   const navigate = useNavigate();
// //   const [openMenu, setOpenMenu] = useState<string | null>(null);

// //   const handleToggle = (label: string) => {
// //     setOpenMenu(openMenu === label ? null : label);
// //   };

// //   //MENU
// //   useEffect (() => {
// //     const getMenu = async() => {
// //       await axiosClient.get("menu/login");
// //     }
// //     getMenu()
// //   },[])

// //   return (
// //     <Box
// //       sx={{
// //         width: open ? { xs: 0, sm: "200px" } : 0,
// //         minWidth: open ? { sm: "200px" } : 0,
// //         overflowX: "hidden",
// //         height: "100vh",
// //         position: "fixed",
// //         top: 0,
// //         left: 0,
// //         pt: "64px",
// //         bgcolor: "white",
// //         borderRight: "1px solid #eee",
// //         transition: "width 0.3s ease, min-width 0.3s ease",
// //         display: { xs: open ? "block" : "none", sm: "block" },
// //       }}
// //     >
// //       <List>
// //         {menuItems.map((item) => {
// //           const isActive =
// //             location.pathname === item.path ||
// //             (item.children &&
// //               item.children.some((child) => location.pathname === child.path));

// //           if (item.children) {
// //             return (
// //               <Box key={item.label}>
// //                 <ListItemButton
// //                   onClick={() => handleToggle(item.label)}
// //                   sx={{
// //                     height: "60px",
// //                     color: "black",
// //                     backgroundColor: isActive
// //                       ? "rgba(255, 21, 0, 0.44)"
// //                       : "transparent",
// //                     borderLeft: isActive ? "4px solid white" : "none",
// //                     "&:hover": { backgroundColor: "#f5f5f5" },
// //                   }}
// //                 >
// //                   <ListItemText primary={item.label} />
// //                   {openMenu === item.label ? <ExpandLess /> : <ExpandMore />}
// //                 </ListItemButton>
// //                 <Collapse
// //                   in={openMenu === item.label}
// //                   timeout="auto"
// //                   unmountOnExit
// //                 >
// //                   <List component="div" disablePadding>
// //                     {item.children.map((child) => {
// //                       const isChildActive = location.pathname === child.path;
// //                       return (
// //                         <ListItemButton
// //                           key={child.path}
// //                           onClick={() => navigate(child.path)}
// //                           sx={{
// //                             pl: 4,
// //                             height: "50px",
// //                             color: "black",
// //                             backgroundColor: isChildActive
// //                               ? "rgba(255, 21, 0, 0.2)"
// //                               : "transparent",
// //                             "&:hover": { backgroundColor: "#f5f5f5" },
// //                           }}
// //                         >
// //                           <ListItemText primary={child.label} />
// //                         </ListItemButton>
// //                       );
// //                     })}
// //                   </List>
// //                 </Collapse>
// //               </Box>
// //             );
// //           }

// //           return (
// //             <ListItemButton
// //               key={item.path}
// //               onClick={() => navigate(item.path!)}
// //               sx={{
// //                 height: "60px",
// //                 color: "black",
// //                 backgroundColor: isActive
// //                   ? "rgba(255, 21, 0, 0.44)"
// //                   : "transparent",
// //                 borderLeft: isActive ? "4px solid white" : "none",
// //                 "&:hover": { backgroundColor: "#f5f5f5" },
// //               }}
// //             >
// //               <ListItemText primary={item.label} />
// //             </ListItemButton>
// //           );
// //         })}
// //       </List>
// //     </Box>
// //   );
// // };

// // export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import {
//   Box,
//   Collapse,
//   List,
//   ListItemButton,
//   ListItemText,
//   CircularProgress,
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import { PATH } from "routes/constants";
// import useMenu, { RawMenu } from "hooks/menu/useMenu";
// import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
// import useFindAllFacilityCustom from "hooks/facility/useFindAllFacilityCustom";

// /* helpers (giữ nguyên logic) */
// const FACILITY_BASE = "/facility";

// type NavTarget = {
//   href: string; // luôn là URL để navigate
//   isFacilityLike: boolean; // true nếu href bắt đầu bằng /facility/
//   typeCodeFromHref: string | null; // trích từ href (không lấy từ code)
//   componentTarget: "mainFulfillment" | "receiveOrder" | "other";
// };

// const MAIN_FULFILLMENT_TYPECODE = "facility-add-multiple-row";
// const RECEIVE_ORDER_TYPECODES = new Set([
//   "facility-drawing",
//   "facility-cutting",
//   "facility-sewing",
//   "facility-noimage",
//   "facility-manufactoring",
//   "facility-packing",
//   "facility-tracking",
// ]);

// /**
//  * COERCE HREF: CHỈNH SỬA CHỖ NÀY để xử lý các dạng URL:
//  * - "/facility/facility-add-multiple-row" -> keep
//  * - "facility/facility-add-multiple-row" -> "/facility/facility-add-multiple-row"
//  * - "/facility-add-multiple-row" -> "/facility/facility-add-multiple-row"
//  * - "facility-add-multiple-row" -> "/facility/facility-add-multiple-row"
//  * - other absolute paths (starting with "/") but not facility-* -> keep as-is
//  * - fallback: "/" (an toàn)
//  */
// const coerceHrefFromUrl = (url?: string | null): string => {
//   const raw = (url ?? "").toString().trim();
//   if (!raw) return "/"; // fallback an toàn

//   // already absolute path
//   if (raw.startsWith("/")) {
//     // already a facility path -> keep
//     if (raw === FACILITY_BASE || raw.startsWith(`${FACILITY_BASE}/`)) {
//       return raw;
//     }

//     // if like "/facility-add-multiple-row" (missing /facility/ prefix)
//     const withoutLeading = raw.slice(1); // remove leading slash
//     if (withoutLeading.startsWith("facility-")) {
//       // coerce to /facility/<typeCode>
//       return `${FACILITY_BASE}/${encodeURIComponent(withoutLeading)}`;
//     }

//     // if already starts with "/facility" but weird (e.g. "/facility/..." handled above)
//     // otherwise return as-is (external/absolute route)
//     return raw;
//   }

//   // not starting with '/', treat relative forms
//   // if looks like "facility/xxx" -> prefix leading slash
//   if (raw.includes("/")) {
//     // e.g. "facility/facility-add-multiple-row" -> "/facility/facility-add-multiple-row"
//     return raw.startsWith("facility/") ? `/${raw}` : `/${raw}`;
//   }

//   // single token forms (no slash)
//   // if token looks like facility-... -> map to /facility/<token>
//   if (raw.startsWith("facility-")) {
//     return `${FACILITY_BASE}/${encodeURIComponent(raw)}`;
//   }

//   // otherwise default to a safe absolute path using token as-is
//   return `/${raw}`;
// };

// const getTypeCodeFromPath = (pathname: string) => {
//   const parts = pathname.split("/").filter(Boolean); // ["facility", "<typeCode>", ...]
//   const base = FACILITY_BASE.replace(/^\//, "").toLowerCase(); // "facility"

//   if (parts.length >= 2 && parts[0].toLowerCase() === base) {
//     try {
//       return decodeURIComponent(parts[1]);
//     } catch {
//       return parts[1];
//     }
//   }
//   return null;
// };

// const getTypeCodeFromHref = (href: string) => {
//   try {
//     const u = href.startsWith("/") ? href : `/${href}`;
//     return getTypeCodeFromPath(u);
//   } catch {
//     return null;
//   }
// };

// /** extract facility-type id safe từ options response (giữ nhiều shape khác nhau) */
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
//     // fallback: nếu first là chính group
//     if (first.id && (first.parentId == null || first.parentId === ""))
//       return first.id;
//   }

//   // try shallow recursive scan
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
//   } catch (e) {
//     // ignore
//   }

//   return undefined;
// };

// interface SidebarProps {
//   open: boolean;
// }

// const Sidebar: React.FC<SidebarProps> = ({ open }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState<string | null>(null);

//   const { loading, getChildrenOfParentCode, findByCode } = useMenu();

//   // sync initial selectedTypeCode từ URL
//   const currentTypeCodeFromPath = getTypeCodeFromPath(location.pathname);

//   /**
//    * IMPORTANT:
//    * - Nếu URL đang là MAIN_FULFILLMENT_TYPECODE (facility-add-multiple-row)
//    *   -> chúng ta không muốn Sidebar tự set selectedTypeCode vì sẽ trigger các hook
//    *      của Sidebar (options/facility) và đè lên hook của MainFulfillment.
//    * - Vì vậy initial state sẽ là `null` khi current path là main fulfillment.
//    */
//   const [selectedTypeCode, setSelectedTypeCode] = useState<string | null>(
//     currentTypeCodeFromPath === MAIN_FULFILLMENT_TYPECODE
//       ? null
//       : currentTypeCodeFromPath ?? null
//   );

//   // resolvedFacilityTypeId: chỉ set khi options fetch hoàn tất cho selection hiện tại
//   const [resolvedFacilityTypeId, setResolvedFacilityTypeId] = useState<
//     string | undefined
//   >(undefined);

//   const PAGE = 0;
//   const SIZE = 20;

//   // gọi hook options (luôn gọi ở cấp component) - GIỮ NGUYÊN flow của bạn
//   const optionsQuery = useFindOptionsByGroup(
//     "facility-type",
//     PAGE,
//     SIZE,
//     selectedTypeCode ?? undefined
//   ) as any;

//   const {
//     data: optionsData,
//     isLoading: optionsLoading,
//     isFetching: optionsFetching,
//     refetch: refetchOptions,
//   } = optionsQuery ?? {};

//   // Khi selectedTypeCode thay đổi -> clear resolved id để tránh dùng id cũ
//   useEffect(() => {
//     setResolvedFacilityTypeId(undefined);
//   }, [selectedTypeCode]);

//   /**
//    * Khi options fetch xong (không đang fetching) và trả data mới -> extract id và set resolvedFacilityTypeId
//    * IMPORTANT: Chúng ta phải tránh set id nếu selectedTypeCode === MAIN_FULFILLMENT_TYPECODE (hoặc null),
//    * vì khi user ở route mainFulfillment, ta KHÔNG muốn Sidebar tự động fetch facility list.
//    */
//   useEffect(() => {
//     if (!optionsFetching && !optionsLoading && optionsData) {
//       if (selectedTypeCode && selectedTypeCode !== MAIN_FULFILLMENT_TYPECODE) {
//         const id = extractFacilityTypeIdFromOptions(optionsData);
//         setResolvedFacilityTypeId(id);
//       } else {
//         // explicitly ensure no id when on mainFulfillment / null
//         setResolvedFacilityTypeId(undefined);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [optionsData, optionsLoading, optionsFetching, selectedTypeCode]);

//   // Sync selectedTypeCode nếu người dùng thay đổi URL trực tiếp (ví dụ back/forward)
//   // --- CHỈ sync khi URL KHÔNG phải MAIN_FULFILLMENT_TYPECODE ---
//   useEffect(() => {
//     const code = getTypeCodeFromPath(location.pathname);

//     if (code && code !== selectedTypeCode) {
//       // nếu là mainFulfillment -> skip sync để tránh Sidebar can thiệp
//       if (code === MAIN_FULFILLMENT_TYPECODE) {
//         // keep sidebar selection cleared
//         setSelectedTypeCode(null);
//         setResolvedFacilityTypeId(undefined);
//       } else {
//         setSelectedTypeCode(code);
//       }
//     }

//     // nếu code là null (ví dụ chuyển ra khỏi /facility/...), clear selection
//     if (!code && selectedTypeCode) {
//       setSelectedTypeCode(null);
//       setResolvedFacilityTypeId(undefined);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname]);

//   const facilityQuery = useFindAllFacilityCustom(
//     {
//       page: PAGE,
//       size: SIZE,
//       codeOrName: selectedTypeCode ?? "",
//       facilityTypeId: resolvedFacilityTypeId,
//       issuePlace: "unassigned",
//       sort: ["createdDate,desc", "isException,desc"],
//     },
//     { enabled: Boolean(resolvedFacilityTypeId) }
//   ) as any;

//   const {
//     data: facilityData,
//     isLoading: facilityLoading,
//     refetch: refetchFacilities,
//   } = facilityQuery ?? {};

//   // static links
//   const staticAfter = [
//     { label: "Quản lý Sản phẩm", path: PATH.PRODUCT },
//     { label: "Quản lý User", path: PATH.USERS },
//     { label: "Quản lý Tracking", path: PATH.TRACKING },
//     { label: "Quản lý SKU Design", path: PATH.SKUDESIGN },
//   ];

//   const manufactorParent = findByCode("manufactor");
//   const manufactorChildren = getChildrenOfParentCode("manufactor");

//   const menuSections: Array<
//     { label: string; path?: string } | { label: string; children: RawMenu[] }
//   > = [];

//   menuSections.push({ label: "Admin Dashboard", path: PATH.DASHBOARD });

//   if (loading) {
//     menuSections.push({ label: "Quản lý đơn hàng (loading...)", children: [] });
//   } else if (manufactorParent) {
//     menuSections.push({
//       label: manufactorParent.name ?? "Quản lý đơn hàng",
//       children: manufactorChildren,
//     });
//   } else {
//     menuSections.push({
//       label: "Quản lý đơn hàng",
//       children: [
//         {
//           id: "fallback-1",
//           name: "Đơn hàng",
//           code: "donhang",
//           url: undefined,
//           parentId: null,
//         },
//         {
//           id: "fallback-2",
//           name: "Chưa có hình",
//           code: "noimage",
//           url: undefined,
//           parentId: null,
//         },
//         {
//           id: "fallback-3",
//           name: "Đang vẽ 2D",
//           code: "2d",
//           url: undefined,
//           parentId: null,
//         },
//       ] as RawMenu[],
//     });
//   }

//   staticAfter.forEach((s) => menuSections.push(s));

//   const handleToggle = (label: string) => {
//     setOpenMenu(openMenu === label ? null : label);
//   };

//   const typeCodeFromPath = getTypeCodeFromPath(location.pathname);

//   const getNavTarget = (item: RawMenu): NavTarget => {
//     const href = coerceHrefFromUrl(item.url);
//     const isFacilityLike = href.startsWith(`${FACILITY_BASE}/`);
//     const typeCodeFromHref = isFacilityLike ? getTypeCodeFromHref(href) : null;

//     let componentTarget: NavTarget["componentTarget"] = "other";
//     if (typeCodeFromHref === MAIN_FULFILLMENT_TYPECODE) {
//       componentTarget = "mainFulfillment";
//     } else if (
//       typeCodeFromHref &&
//       RECEIVE_ORDER_TYPECODES.has(typeCodeFromHref)
//     ) {
//       componentTarget = "receiveOrder";
//     }

//     return { href, isFacilityLike, typeCodeFromHref, componentTarget };
//   };

//   const isChildActive = (child: RawMenu) => {
//     const target = getNavTarget(child);
//     if (!target.isFacilityLike) {
//       return location.pathname === target.href;
//     }
//     return typeCodeFromPath && target.typeCodeFromHref
//       ? typeCodeFromPath === target.typeCodeFromHref
//       : false;
//   };

//   const onChildClick = (child: RawMenu) => {
//     const target = getNavTarget(child);

//     // Log đúng format bạn muốn (không dấu '/')
//     const relative = target.href.startsWith("/")
//       ? target.href.slice(1)
//       : target.href;
//     console.log("SIDEBAR CLICK", {
//       menuUrl: relative, // luôn facility/xxx
//       locationPathname: location.pathname,
//     });

//     // SPECIAL CASE:
//     // Nếu đây là mainFulfillment (facility-add-multiple-row), KHÔNG thực hiện
//     // các side-effect của Sidebar (setSelectedTypeCode / refetchOptions / refetchFacilities).
//     // Chỉ navigate để route chuyển qua MainFulfillment và để component đó quản lý hook của nó.
//     if (target.isFacilityLike && target.typeCodeFromHref) {
//       const nextType = target.typeCodeFromHref;

//       if (target.componentTarget === "mainFulfillment") {
//         // CHÚ Ý: không setSelectedTypeCode và không refetch gì cả.
//         navigate(target.href);
//         return;
//       }

//       // bình thường (receiveOrder hoặc others): giữ flow cũ
//       if (selectedTypeCode === nextType) {
//         // cùng type → refetch
//         if (typeof refetchOptions === "function") refetchOptions();
//         if (resolvedFacilityTypeId && typeof refetchFacilities === "function") {
//           refetchFacilities();
//         }
//       } else {
//         setResolvedFacilityTypeId(undefined);
//         setSelectedTypeCode(nextType);
//       }

//       // navigate (bất kể)
//       navigate(target.href);
//       return;
//     }

//     // non-facility-like: just navigate
//     navigate(target.href);
//   };

//   return (
//     <Box
//       sx={{
//         width: open ? { xs: 0, sm: "200px" } : 0,
//         minWidth: open ? { sm: "200px" } : 0,
//         overflowX: "hidden",
//         height: "100vh",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         pt: "64px",
//         bgcolor: "white",
//         borderRight: "1px solid #eee",
//         transition: "width 0.3s ease, min-width 0.3s ease",
//         display: { xs: open ? "block" : "none", sm: "block" },
//       }}
//     >
//       <List>
//         {menuSections.map((item) => {
//           if ("children" in item) {
//             const label = item.label;
//             const children = item.children as RawMenu[];

//             return (
//               <Box key={label}>
//                 <ListItemButton
//                   onClick={() => handleToggle(label)}
//                   sx={{
//                     height: "60px",
//                     color: "black",
//                     backgroundColor:
//                       openMenu === label
//                         ? "rgba(255, 21, 0, 0.12)"
//                         : "transparent",
//                     borderLeft: openMenu === label ? "4px solid white" : "none",
//                     "&:hover": { backgroundColor: "#f5f5f5" },
//                   }}
//                 >
//                   <ListItemText primary={label} />
//                   {openMenu === label ? <ExpandLess /> : <ExpandMore />}
//                 </ListItemButton>

//                 <Collapse in={openMenu === label} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     {loading && label.includes("loading") ? (
//                       <ListItemButton sx={{ pl: 4, height: "50px" }}>
//                         <CircularProgress size={20} />
//                         <ListItemText
//                           sx={{ ml: 1 }}
//                           primary="Đang tải menu..."
//                         />
//                       </ListItemButton>
//                     ) : (
//                       children.map((child) => {
//                         const active = isChildActive(child);
//                         return (
//                           <ListItemButton
//                             key={child.id ?? child.url ?? child.name}
//                             onClick={() => onChildClick(child)}
//                             sx={{
//                               pl: 4,
//                               height: "50px",
//                               color: "black",
//                               backgroundColor: active
//                                 ? "rgba(255, 21, 0, 0.2)"
//                                 : "transparent",
//                               "&:hover": { backgroundColor: "#f5f5f5" },
//                             }}
//                           >
//                             <ListItemText primary={child.name} />
//                           </ListItemButton>
//                         );
//                       })
//                     )}
//                   </List>
//                 </Collapse>
//               </Box>
//             );
//           }

//           return (
//             <ListItemButton
//               key={item.path ?? item.label}
//               onClick={() => navigate(item.path ?? "/")}
//               sx={{
//                 height: "60px",
//                 color: "black",
//                 backgroundColor:
//                   location.pathname === item.path
//                     ? "rgba(255, 21, 0, 0.44)"
//                     : "transparent",
//                 borderLeft:
//                   location.pathname === item.path ? "4px solid white" : "none",
//                 "&:hover": { backgroundColor: "#f5f5f5" },
//               }}
//             >
//               <ListItemText primary={item.label} />
//             </ListItemButton>
//           );
//         })}
//       </List>
//     </Box>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { PATH } from "routes/constants";
import useMenu, { RawMenu } from "hooks/menu/useMenu";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import useFindAllFacilityCustom from "hooks/facility/useFindAllFacilityCustom";

/* helpers (giữ nguyên logic) */
const FACILITY_BASE = "/facility";

type NavTarget = {
  href: string; // luôn là URL để navigate
  isFacilityLike: boolean; // true nếu href bắt đầu bằng /facility/
  typeCodeFromHref: string | null; // trích từ href (không lấy từ code)
  componentTarget: "mainFulfillment" | "receiveOrder" | "other";
};

const MAIN_FULFILLMENT_TYPECODE = "facility-add-multiple-row";
const RECEIVE_ORDER_TYPECODES = new Set([
  "facility-drawing",
  "facility-cutting",
  "facility-sewing",
  "facility-noimage",
  "facility-manufactoring",
  "facility-packing",
  "facility-tracking",
]);

/**
 * COERCE HREF: CHỈNH SỬA CHỖ NÀY để xử lý các dạng URL:
 * - "/facility/facility-add-multiple-row" -> keep
 * - "facility/facility-add-multiple-row" -> "/facility/facility-add-multiple-row"
 * - "/facility-add-multiple-row" -> "/facility/facility-add-multiple-row"
 * - "facility-add-multiple-row" -> "/facility/facility-add-multiple-row"
 * - other absolute paths (starting with "/") but not facility-* -> keep as-is
 * - fallback: "/" (an toàn)
 */
const coerceHrefFromUrl = (url?: string | null): string => {
  const raw = (url ?? "").toString().trim();
  if (!raw) return "/"; // fallback an toàn

  // already absolute path
  if (raw.startsWith("/")) {
    // already a facility path -> keep
    if (raw === FACILITY_BASE || raw.startsWith(`${FACILITY_BASE}/`)) {
      return raw;
    }

    // if like "/facility-add-multiple-row" (missing /facility/ prefix)
    const withoutLeading = raw.slice(1); // remove leading slash
    if (withoutLeading.startsWith("facility-")) {
      // coerce to /facility/<typeCode>
      return `${FACILITY_BASE}/${encodeURIComponent(withoutLeading)}`;
    }

    // if already starts with "/facility" but weird (e.g. "/facility/..." handled above)
    // otherwise return as-is (external/absolute route)
    return raw;
  }

  // not starting with '/', treat relative forms
  // if looks like "facility/xxx" -> prefix leading slash
  if (raw.includes("/")) {
    // e.g. "facility/facility-add-multiple-row" -> "/facility/facility-add-multiple-row"
    return raw.startsWith("facility/") ? `/${raw}` : `/${raw}`;
  }

  // single token forms (no slash)
  // if token looks like facility-... -> map to /facility/<token>
  if (raw.startsWith("facility-")) {
    return `${FACILITY_BASE}/${encodeURIComponent(raw)}`;
  }

  // otherwise default to a safe absolute path using token as-is
  return `/${raw}`;
};

const getTypeCodeFromPath = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean); // ["facility", "<typeCode>", ...]
  const base = FACILITY_BASE.replace(/^\//, "").toLowerCase(); // "facility"

  if (parts.length >= 2 && parts[0].toLowerCase() === base) {
    try {
      return decodeURIComponent(parts[1]);
    } catch {
      return parts[1];
    }
  }
  return null;
};

const getTypeCodeFromHref = (href: string) => {
  try {
    const u = href.startsWith("/") ? href : `/${href}`;
    return getTypeCodeFromPath(u);
  } catch {
    return null;
  }
};

/** extract facility-type id safe từ options response (giữ nhiều shape khác nhau) */
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
    // fallback: nếu first là chính group
    if (first.id && (first.parentId == null || first.parentId === ""))
      return first.id;
  }

  // try shallow recursive scan
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
  } catch (e) {
    // ignore
  }

  return undefined;
};

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const { loading, getChildrenOfParentCode, findByCode } = useMenu();

  // sync initial selectedTypeCode từ URL
  const currentTypeCodeFromPath = getTypeCodeFromPath(location.pathname);

  /**
   * IMPORTANT:
   * - Nếu URL đang là MAIN_FULFILLMENT_TYPECODE (facility-add-multiple-row)
   *   -> chúng ta không muốn Sidebar tự set selectedTypeCode vì sẽ trigger các hook
   *      của Sidebar (options/facility) và đè lên hook của MainFulfillment.
   * - Vì vậy initial state sẽ là `null` khi current path là main fulfillment.
   */
  const [selectedTypeCode, setSelectedTypeCode] = useState<string | null>(
    currentTypeCodeFromPath === MAIN_FULFILLMENT_TYPECODE
      ? null
      : currentTypeCodeFromPath ?? null
  );

  // resolvedFacilityTypeId: chỉ set khi options fetch hoàn tất cho selection hiện tại
  const [resolvedFacilityTypeId, setResolvedFacilityTypeId] = useState<
    string | undefined
  >(undefined);

  const PAGE = 0;
  const SIZE = 20;

  // gọi hook options (luôn gọi ở cấp component) - GIỮ NGUYÊN flow của bạn
  const optionsQuery = useFindOptionsByGroup(
    "facility-type",
    PAGE,
    SIZE,
    selectedTypeCode ?? undefined
  ) as any;

  const {
    data: optionsData,
    isLoading: optionsLoading,
    isFetching: optionsFetching,
    refetch: refetchOptions,
  } = optionsQuery ?? {};

  // Khi selectedTypeCode thay đổi -> clear resolved id để tránh dùng id cũ
  useEffect(() => {
    setResolvedFacilityTypeId(undefined);
  }, [selectedTypeCode]);

  /**
   * Khi options fetch xong (không đang fetching) và trả data mới -> extract id và set resolvedFacilityTypeId
   * CHÚ Ý: chỉ set khi selectedTypeCode hợp lệ (không phải mainFulfillment) và id thực sự khác
   */
  useEffect(() => {
    if (!optionsFetching && !optionsLoading && optionsData) {
      if (selectedTypeCode && selectedTypeCode !== MAIN_FULFILLMENT_TYPECODE) {
        const id = extractFacilityTypeIdFromOptions(optionsData);
        // chỉ cập nhật nếu id tồn tại và khác id hiện tại (tránh set lại gây re-render không cần thiết)
        if (id && id !== resolvedFacilityTypeId) {
          setResolvedFacilityTypeId(id);
        }
      } else {
        // explicitly ensure no id when on mainFulfillment / null
        if (resolvedFacilityTypeId !== undefined)
          setResolvedFacilityTypeId(undefined);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    optionsData,
    optionsLoading,
    optionsFetching,
    selectedTypeCode,
    resolvedFacilityTypeId,
  ]);

  // Sync selectedTypeCode nếu người dùng thay đổi URL trực tiếp (ví dụ back/forward)
  // --- CHỈ sync khi URL KHÔNG phải MAIN_FULFILLMENT_TYPECODE ---
  useEffect(() => {
    const code = getTypeCodeFromPath(location.pathname);

    if (code && code !== selectedTypeCode) {
      // nếu là mainFulfillment -> skip sync để tránh Sidebar can thiệp
      if (code === MAIN_FULFILLMENT_TYPECODE) {
        // keep sidebar selection cleared
        setSelectedTypeCode(null);
        setResolvedFacilityTypeId(undefined);
      } else {
        setSelectedTypeCode(code);
      }
    }

    // nếu code là null (ví dụ chuyển ra khỏi /facility/...), clear selection
    if (!code && selectedTypeCode) {
      setSelectedTypeCode(null);
      setResolvedFacilityTypeId(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /**
   * === FIXED PART ===
   * - Facility query: tạo nhưng **không auto-enable** (enabled: false) để tránh chạy sớm
   * - Khi resolvedFacilityTypeId được set (từ options), thì sẽ trigger refetchFacilities 1 lần.
   */
  const facilityQuery = useFindAllFacilityCustom(
    {
      page: PAGE,
      size: SIZE,
      codeOrName: selectedTypeCode ?? "",
      facilityTypeId: resolvedFacilityTypeId,
      issuePlace: "unassigned",
      sort: ["createdDate,desc", "isException,desc"],
    },
    // KHÔNG auto-run — refetch thủ công khi cần
    { enabled: false }
  ) as any;

  const {
    data: facilityData,
    isLoading: facilityLoading,
    refetch: refetchFacilities,
  } = facilityQuery ?? {};

  // Khi resolvedFacilityTypeId được set (từ options), refetch facility **chỉ 1 lần** tại đây
  useEffect(() => {
    if (resolvedFacilityTypeId && typeof refetchFacilities === "function") {
      refetchFacilities();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedFacilityTypeId]);

  // static links
  const staticAfter = [
    { label: "Quản lý Sản phẩm", path: PATH.PRODUCT },
    { label: "Quản lý User", path: PATH.USERS },
    { label: "Quản lý Tracking", path: PATH.TRACKING },
    { label: "Quản lý SKU Design", path: PATH.SKUDESIGN },
  ];

  const manufactorParent = findByCode("manufactor");
  const manufactorChildren = getChildrenOfParentCode("manufactor");

  const menuSections: Array<
    { label: string; path?: string } | { label: string; children: RawMenu[] }
  > = [];

  menuSections.push({ label: "Admin Dashboard", path: PATH.DASHBOARD });

  if (loading) {
    menuSections.push({ label: "Quản lý đơn hàng (loading...)", children: [] });
  } else if (manufactorParent) {
    menuSections.push({
      label: manufactorParent.name ?? "Quản lý đơn hàng",
      children: manufactorChildren,
    });
  } else {
    menuSections.push({
      label: "Quản lý đơn hàng",
      children: [
        {
          id: "fallback-1",
          name: "Đơn hàng",
          code: "donhang",
          url: undefined,
          parentId: null,
        },
        {
          id: "fallback-2",
          name: "Chưa có hình",
          code: "noimage",
          url: undefined,
          parentId: null,
        },
        {
          id: "fallback-3",
          name: "Đang vẽ 2D",
          code: "2d",
          url: undefined,
          parentId: null,
        },
      ] as RawMenu[],
    });
  }

  staticAfter.forEach((s) => menuSections.push(s));

  const handleToggle = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  const typeCodeFromPath = getTypeCodeFromPath(location.pathname);

  const getNavTarget = (item: RawMenu): NavTarget => {
    const href = coerceHrefFromUrl(item.url);
    const isFacilityLike = href.startsWith(`${FACILITY_BASE}/`);
    const typeCodeFromHref = isFacilityLike ? getTypeCodeFromHref(href) : null;

    let componentTarget: NavTarget["componentTarget"] = "other";
    if (typeCodeFromHref === MAIN_FULFILLMENT_TYPECODE) {
      componentTarget = "mainFulfillment";
    } else if (
      typeCodeFromHref &&
      RECEIVE_ORDER_TYPECODES.has(typeCodeFromHref)
    ) {
      componentTarget = "receiveOrder";
    }

    return { href, isFacilityLike, typeCodeFromHref, componentTarget };
  };

  const isChildActive = (child: RawMenu) => {
    const target = getNavTarget(child);
    if (!target.isFacilityLike) {
      return location.pathname === target.href;
    }
    return typeCodeFromPath && target.typeCodeFromHref
      ? typeCodeFromPath === target.typeCodeFromHref
      : false;
  };

  const onChildClick = (child: RawMenu) => {
    const target = getNavTarget(child);

    // Log đúng format bạn muốn (không dấu '/')
    const relative = target.href.startsWith("/")
      ? target.href.slice(1)
      : target.href;
    console.log("SIDEBAR CLICK", {
      menuUrl: relative, // luôn facility/xxx
      locationPathname: location.pathname,
    });

    // SPECIAL CASE:
    // Nếu đây là mainFulfillment (facility-add-multiple-row), KHÔNG thực hiện
    // các side-effect của Sidebar (setSelectedTypeCode / refetchOptions / refetchFacilities).
    // Chỉ navigate để route chuyển qua MainFulfillment và để component đó quản lý hook của nó.
    if (target.isFacilityLike && target.typeCodeFromHref) {
      const nextType = target.typeCodeFromHref;

      if (target.componentTarget === "mainFulfillment") {
        // CHÚ Ý: không setSelectedTypeCode và không refetch gì cả.
        navigate(target.href);
        return;
      }

      // bình thường (receiveOrder hoặc others): giữ flow cũ nhưng đảm bảo facility chỉ gọi 1 lần
      if (selectedTypeCode === nextType) {
        // cùng type → refetch options; nếu đã có resolvedFacilityTypeId thì refetch facility luôn
        if (typeof refetchOptions === "function") refetchOptions();
        if (resolvedFacilityTypeId && typeof refetchFacilities === "function") {
          refetchFacilities();
        }
      } else {
        // change type: clear resolved id, set new type -> options sẽ fetch,
        // khi options trả về sẽ setResolvedFacilityTypeId -> effect sẽ refetch facility 1 lần
        setResolvedFacilityTypeId(undefined);
        setSelectedTypeCode(nextType);
      }

      // navigate (bất kể)
      navigate(target.href);
      return;
    }

    // non-facility-like: just navigate
    navigate(target.href);
  };

  return (
    <Box
      sx={{
        width: open ? { xs: 0, sm: "200px" } : 0,
        minWidth: open ? { sm: "200px" } : 0,
        overflowX: "hidden",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        pt: "64px",
        bgcolor: "white",
        borderRight: "1px solid #eee",
        transition: "width 0.3s ease, min-width 0.3s ease",
        display: { xs: open ? "block" : "none", sm: "block" },
      }}
    >
      <List>
        {menuSections.map((item) => {
          if ("children" in item) {
            const label = item.label;
            const children = item.children as RawMenu[];

            return (
              <Box key={label}>
                <ListItemButton
                  onClick={() => handleToggle(label)}
                  sx={{
                    height: "60px",
                    color: "black",
                    backgroundColor:
                      openMenu === label
                        ? "rgba(255, 21, 0, 0.12)"
                        : "transparent",
                    borderLeft: openMenu === label ? "4px solid white" : "none",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <ListItemText primary={label} />
                  {openMenu === label ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={openMenu === label} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {loading && label.includes("loading") ? (
                      <ListItemButton sx={{ pl: 4, height: "50px" }}>
                        <CircularProgress size={20} />
                        <ListItemText
                          sx={{ ml: 1 }}
                          primary="Đang tải menu..."
                        />
                      </ListItemButton>
                    ) : (
                      children.map((child) => {
                        const active = isChildActive(child);
                        return (
                          <ListItemButton
                            key={child.id ?? child.url ?? child.name}
                            onClick={() => onChildClick(child)}
                            sx={{
                              pl: 4,
                              height: "50px",
                              color: "black",
                              backgroundColor: active
                                ? "rgba(255, 21, 0, 0.2)"
                                : "transparent",
                              "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                          >
                            <ListItemText primary={child.name} />
                          </ListItemButton>
                        );
                      })
                    )}
                  </List>
                </Collapse>
              </Box>
            );
          }

          return (
            <ListItemButton
              key={item.path ?? item.label}
              onClick={() => navigate(item.path ?? "/")}
              sx={{
                height: "60px",
                color: "black",
                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(255, 21, 0, 0.44)"
                    : "transparent",
                borderLeft:
                  location.pathname === item.path ? "4px solid white" : "none",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
