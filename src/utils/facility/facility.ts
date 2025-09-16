// // utils/facility.ts
// export const FACILITY_BASE = "/facility";
// export const MAIN_FULFILLMENT_TYPECODE = "facility-add-multiple-row";

// /** Lấy typeCode từ pathname giống logic ở Sidebar */
// export const getTypeCodeFromPath = (pathname: string): string | null => {
//   const parts = pathname.split("/").filter(Boolean);
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

// /** copy/port logic bạn đang có trong Sidebar để trích facilityTypeId (robust) */
// export const extractFacilityTypeIdFromOptions = (
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
//   } catch (e) {}

//   return undefined;
// };

// /** Mở rộng để trích NAME (robust search giống extract id) */
// export const extractFacilityTypeNameFromOptions = (
//   optionsData: any
// ): string | undefined => {
//   if (!optionsData) return undefined;

//   // try top-level common shapes
//   const topName =
//     optionsData?.data?.optionGroup?.name ??
//     optionsData?.optionGroup?.name ??
//     optionsData?.data?.name ??
//     optionsData?.name;
//   if (topName) return topName;

//   const arrCandidates =
//     optionsData?.data?.content ??
//     optionsData?.data?.items ??
//     optionsData?.content ??
//     optionsData?.items ??
//     null;

//   if (Array.isArray(arrCandidates) && arrCandidates.length > 0) {
//     const first = arrCandidates[0];
//     if (first?.name) return first.name;
//     if (first?.label) return first.label;
//     if (first?.optionGroup?.name) return first.optionGroup.name;
//   }

//   // deep traversal
//   try {
//     const stack = [optionsData];
//     while (stack.length) {
//       const node: any = stack.pop();
//       if (!node || typeof node !== "object") continue;
//       if (node.optionGroup && node.optionGroup.name)
//         return node.optionGroup.name;
//       if (typeof node.name === "string" && node.name.trim()) return node.name;
//       if (typeof node.label === "string" && node.label.trim())
//         return node.label;
//       for (const k of Object.keys(node)) {
//         const v = node[k];
//         if (v && typeof v === "object") stack.push(v);
//       }
//     }
//   } catch (e) {}

//   return undefined;
// };

// utils/facility.ts
export const FACILITY_BASE = "/facility";
export const MAIN_FULFILLMENT_TYPECODE = "facility-add-multiple-row";

export type OrgUnit = {
  optionGroupId: any;
  optionGroup: any;
  groupId: any;
  parentId: null;
  label: any;
  id: string;
  name: string;
  lvl?: number;
  code?: string;
  namePath?: string[];
};

/** Utility function to extract array from various API response formats */
export const extractList = (data: any): OrgUnit[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data.content && Array.isArray(data.content)) return data.content;
  if (data.items && Array.isArray(data.items)) return data.items;
  return [];
};

/** Lấy typeCode từ pathname giống logic ở Sidebar */
export const getTypeCodeFromPath = (pathname: string): string | null => {
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

/** copy/port logic bạn đang có trong Sidebar để trích facilityTypeId (robust) */
export const extractFacilityTypeIdFromOptions = (
  optionsData: any
): string | undefined => {
  if (!optionsData) return undefined;

  const topOptionGroupId =
    optionsData?.data?.optionGroup?.id ||
    optionsData?.optionGroup?.id ||
    optionsData?.data?.id ||
    optionsData?.id;
  if (topOptionGroupId) return topOptionGroupId;

  const arrCandidates = extractList(optionsData);

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

/** Mở rộng để trích NAME (robust search giống extract id) */
export const extractFacilityTypeNameFromOptions = (
  optionsData: any
): string | undefined => {
  if (!optionsData) return undefined;

  // try top-level common shapes
  const topName =
    optionsData?.data?.optionGroup?.name ??
    optionsData?.optionGroup?.name ??
    optionsData?.data?.name ??
    optionsData?.name;
  if (topName) return topName;

  const arrCandidates = extractList(optionsData);

  if (Array.isArray(arrCandidates) && arrCandidates.length > 0) {
    const first = arrCandidates[0];
    if (first?.name) return first.name;
    if (first?.label) return first.label;
    if (first?.optionGroup?.name) return first.optionGroup.name;
  }

  // deep traversal
  try {
    const stack = [optionsData];
    while (stack.length) {
      const node: any = stack.pop();
      if (!node || typeof node !== "object") continue;
      if (node.optionGroup && node.optionGroup.name)
        return node.optionGroup.name;
      if (typeof node.name === "string" && node.name.trim()) return node.name;
      if (typeof node.label === "string" && node.label.trim())
        return node.label;
      for (const k of Object.keys(node)) {
        const v = node[k];
        if (v && typeof v === "object") stack.push(v);
      }
    }
  } catch (e) {}

  return undefined;
};
