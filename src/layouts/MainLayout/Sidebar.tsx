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

const FACILITY_BASE = "/facility";

type NavTarget = {
  href: string;
  isFacilityLike: boolean; 
  typeCodeFromHref: string | null; 
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

const coerceHrefFromUrl = (url?: string | null): string => {
  const raw = (url ?? "").toString().trim();
  if (!raw) return "/"; 

  
  if (raw.startsWith("/")) {
    if (raw === FACILITY_BASE || raw.startsWith(`${FACILITY_BASE}/`)) {
      return raw;
    }

    const withoutLeading = raw.slice(1);
    if (withoutLeading.startsWith("facility-")) {
      return `${FACILITY_BASE}/${encodeURIComponent(withoutLeading)}`;
    }
    return raw;
  }

  if (raw.includes("/")) {
    return raw.startsWith("facility/") ? `/${raw}` : `/${raw}`;
  }


  if (raw.startsWith("facility-")) {
    return `${FACILITY_BASE}/${encodeURIComponent(raw)}`;
  }

  return `/${raw}`;
};

const getTypeCodeFromPath = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);
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

const getTypeCodeFromHref = (href: string) => {
  try {
    const u = href.startsWith("/") ? href : `/${href}`;
    return getTypeCodeFromPath(u);
  } catch {
    return null;
  }
};

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
  } catch (e) {
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


  const currentTypeCodeFromPath = getTypeCodeFromPath(location.pathname);

  const [selectedTypeCode, setSelectedTypeCode] = useState<string | null>(
    currentTypeCodeFromPath === MAIN_FULFILLMENT_TYPECODE
      ? null
      : currentTypeCodeFromPath ?? null
  );

  const [resolvedFacilityTypeId, setResolvedFacilityTypeId] = useState<
    string | undefined
  >(undefined);

  const PAGE = 0;
  const SIZE = 20;

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

  useEffect(() => {
    setResolvedFacilityTypeId(undefined);
  }, [selectedTypeCode]);


  useEffect(() => {
    if (!optionsFetching && !optionsLoading && optionsData) {
      if (selectedTypeCode && selectedTypeCode !== MAIN_FULFILLMENT_TYPECODE) {
        const id = extractFacilityTypeIdFromOptions(optionsData);
        if (id && id !== resolvedFacilityTypeId) {
          setResolvedFacilityTypeId(id);
        }
      } else {
        if (resolvedFacilityTypeId !== undefined)
          setResolvedFacilityTypeId(undefined);
      }
    }
  }, [
    optionsData,
    optionsLoading,
    optionsFetching,
    selectedTypeCode,
    resolvedFacilityTypeId,
  ]);

  useEffect(() => {
    const code = getTypeCodeFromPath(location.pathname);

    if (code && code !== selectedTypeCode) {
      if (code === MAIN_FULFILLMENT_TYPECODE) {
        setSelectedTypeCode(null);
        setResolvedFacilityTypeId(undefined);
      } else {
        setSelectedTypeCode(code);
      }
    }

    if (!code && selectedTypeCode) {
      setSelectedTypeCode(null);
      setResolvedFacilityTypeId(undefined);
    }
  }, [location.pathname]);

  const facilityQuery = useFindAllFacilityCustom(
    {
      page: PAGE,
      size: SIZE,
      codeOrName: selectedTypeCode ?? "",
      facilityTypeId: resolvedFacilityTypeId,
      issuePlace: "unassigned",
      sort: ["createdDate,desc", "isException,desc"],
    },
    { enabled: false }
  ) as any;

  const {
    data: facilityData,
    isLoading: facilityLoading,
    refetch: refetchFacilities,
  } = facilityQuery ?? {};

  useEffect(() => {
    if (resolvedFacilityTypeId && typeof refetchFacilities === "function") {
      refetchFacilities();
    }
  }, [resolvedFacilityTypeId]);

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

    const relative = target.href.startsWith("/")
      ? target.href.slice(1)
      : target.href;
    console.log("SIDEBAR CLICK", {
      menuUrl: relative, // luôn facility/xxx
      locationPathname: location.pathname,
    });

    if (target.isFacilityLike && target.typeCodeFromHref) {
      const nextType = target.typeCodeFromHref;

      if (target.componentTarget === "mainFulfillment") {
        navigate(target.href);
        return;
      }

      if (selectedTypeCode === nextType) {
        if (typeof refetchOptions === "function") refetchOptions();
        if (resolvedFacilityTypeId && typeof refetchFacilities === "function") {
          refetchFacilities();
        }
      } else {
        setResolvedFacilityTypeId(undefined);
        setSelectedTypeCode(nextType);
      }

      navigate(target.href);
      return;
    }

    navigate(target.href);
  };

  return (
    <Box
      sx={{
        width: open ? { xs: 0, sm: "200px" } : 0,
        minWidth: open ? { sm: "200px" } : 0,
        overflowX: "hidden",
        overflowY: "auto",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        pt: "64px",
        bgcolor: "white",
        borderRight: "1px solid #eee",
        transition: "width 0.3s ease, min-width 0.3s ease",
        display: { xs: open ? "block" : "none", sm: "block" },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
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
