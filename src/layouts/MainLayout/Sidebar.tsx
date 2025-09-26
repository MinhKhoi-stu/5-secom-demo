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
import useMenu, { MenuNode } from "hooks/menu/useTreeMenu";
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
  "facility-tracking-waiting",
  "facility-tracking-done",
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
  } catch (e) {}

  return undefined;
};

interface SidebarProps {
  open: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const { loading, tree } = useMenu();

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

  // Map các code từ database sang route tương ứng
  const codeToRouteMap: Record<string, string> = {
    dashboard: PATH.DASHBOARD,
    products: PATH.PRODUCT,
    skudesigns: PATH.SKUDESIGN,
    user: PATH.USERS,
    role: PATH.ROLES,
    right: PATH.RIGHTS,
  };

  // Tạo menu sections từ tree
  const menuSections: Array<
    { label: string; path?: string } | { label: string; children: MenuNode[] }
  > = [];

  // Thêm tất cả menu cha có children vào menuSections
  tree.forEach((parentNode) => {
    if (parentNode.children && parentNode.children.length > 0) {
      menuSections.push({
        label: parentNode.name ?? parentNode.code ?? "Unnamed",
        children: parentNode.children,
      });
    } else if (!parentNode.parentId) {
      // Nếu là menu cha không có children, thêm như một item đơn
      const href = coerceHrefFromUrl(parentNode.url);

      // Ưu tiên sử dụng route từ map, nếu không có thì dùng href từ database
      const path =
        parentNode.code && codeToRouteMap[parentNode.code]
          ? codeToRouteMap[parentNode.code]
          : href;

      menuSections.push({
        label: parentNode.name ?? parentNode.code ?? "Unnamed",
        path: path,
      });
    }
  });
  const handleToggle = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  const typeCodeFromPath = getTypeCodeFromPath(location.pathname);

  const getNavTarget = (item: MenuNode): NavTarget => {
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

  const isChildActive = (child: MenuNode) => {
    const target = getNavTarget(child);
    if (!target.isFacilityLike) {
      return location.pathname === target.href;
    }
    return typeCodeFromPath && target.typeCodeFromHref
      ? typeCodeFromPath === target.typeCodeFromHref
      : false;
  };

  const onChildClick = (child: MenuNode) => {
    const target = getNavTarget(child);

    // Xử lý các route đặc biệt từ database
    const childCode = child.code;

    // Nếu code có trong map, sử dụng route được map
    if (childCode && codeToRouteMap[childCode]) {
      navigate(codeToRouteMap[childCode]);
      return;
    }

    // Xử lý facility như cũ
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

    // Fallback: sử dụng href từ menu
    navigate(target.href);
  };
  return (
    <Box
      sx={{
        width: open ? { xs: 0, sm: "220px" } : 0,
        minWidth: open ? { sm: "220px" } : 0,
        overflowX: "hidden",
        overflowY: "auto",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        pt: "64px",
        pb: 2,
        bgcolor: "white",
        borderRight: "1px solid #eee",
        transition: "width 0.3s ease, min-width 0.3s ease",
        display: { xs: open ? "block" : "none", sm: "block" },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <List
        sx={{
          maxHeight: "calc(100vh - 74px)",
          overflowY: "auto",
          pb: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {loading ? (
          <ListItemButton sx={{ height: "60px" }}>
            <CircularProgress size={20} />
            <ListItemText sx={{ ml: 1 }} primary="Đang tải menu..." />
          </ListItemButton>
        ) : (
          menuSections.map((item, index) => {
            if ("children" in item) {
              const label = item.label;
              const children = item.children;

              return (
                <Box key={`${label}-${index}`}>
                  <ListItemButton
                    onClick={() => handleToggle(label)}
                    sx={{
                      height: "60px",
                      color: "black",
                      backgroundColor:
                        openMenu === label
                          ? "rgba(255, 21, 0, 0.12)"
                          : "transparent",
                      borderLeft:
                        openMenu === label ? "4px solid white" : "none",
                      "&:hover": { backgroundColor: "#f5f5f5" },
                    }}
                  >
                    <ListItemText primary={label} />
                    {openMenu === label ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  <Collapse
                    in={openMenu === label}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {children.map((child) => {
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
                      })}
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
                    location.pathname === item.path
                      ? "4px solid white"
                      : "none",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
