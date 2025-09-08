// import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";

// const FACILITY_BASE = "/facility";
// const MAIN_FULFILLMENT_TYPECODE = "facility-add-multiple-row";
// const PAGE = 0;
// const SIZE = 50;

// type FacilityTypeContextValue = {
//   selectedTypeCode: string | null;
//   setSelectedTypeCode: (c: string | null) => void;
//   resolvedFacilityTypeId?: string;
//   optionsLoading: boolean;
//   refetchOptions?: () => void;
// };

// const FacilityTypeContext = createContext<FacilityTypeContextValue | undefined>(undefined);

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

// /* same robust extractor as you had */
// const extractFacilityTypeIdFromOptions = (optionsData: any): string | undefined => {
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
//     if (first.id && (first.parentId == null || first.parentId === "")) return first.id;
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
//   } catch (e) {}

//   return undefined;
// };

// export const FacilityTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const location = useLocation();

//   const [selectedTypeCode, setSelectedTypeCode] = useState<string | null>(() => {
//     const initial = getTypeCodeFromPath(location.pathname);
//     return initial === MAIN_FULFILLMENT_TYPECODE ? null : initial ?? null;
//   });

//   // fetch option-group for selectedTypeCode centrally
//   const optionsQuery = useFindOptionsByGroup(
//     "facility-type",
//     PAGE,
//     SIZE,
//     selectedTypeCode ?? undefined
//   ) as any;

//   const optionsData = optionsQuery?.data;
//   const optionsLoading = !!(optionsQuery?.isLoading || optionsQuery?.isFetching);

//   const resolvedFacilityTypeId = useMemo(() => {
//     if (!selectedTypeCode) return undefined;
//     try {
//       return extractFacilityTypeIdFromOptions(optionsData);
//     } catch {
//       return undefined;
//     }
//   }, [optionsData, selectedTypeCode]);

//   // keep selectedTypeCode in sync with path changes (so direct navigation works)
//   useEffect(() => {
//     const code = getTypeCodeFromPath(location.pathname);
//     if (code === MAIN_FULFILLMENT_TYPECODE) {
//       setSelectedTypeCode(null);
//     } else {
//       setSelectedTypeCode(code ?? null);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname]);

//   const value: FacilityTypeContextValue = {
//     selectedTypeCode,
//     setSelectedTypeCode,
//     resolvedFacilityTypeId,
//     optionsLoading,
//     refetchOptions: optionsQuery?.refetch,
//   };

//   return <FacilityTypeContext.Provider value={value}>{children}</FacilityTypeContext.Provider>;
// };

// export const useFacilityType = () => {
//   const ctx = useContext(FacilityTypeContext);
//   if (!ctx) {
//     throw new Error("useFacilityType must be used inside FacilityTypeProvider");
//   }
//   return ctx;
// };
