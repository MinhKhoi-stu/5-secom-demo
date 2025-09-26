import React, { useMemo, useState, useCallback } from "react";
import { Box, TextField, Typography, InputAdornment } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useQueryClient } from "react-query";
import { useFindAllAdminRights } from "hooks/admin-rights/useFindAllAdminRights";
import { useFindAllResource } from "hooks/resource/useFindAllResource";
import { useFindAdminRightById } from "hooks/admin-rights/useFindAdminRightById";
import RightList from "../component/list-table/RightList";
import PermissionList from "../component/list-table/PermissionList";
import MenuList from "../component/list-table/MenuList";
import CreateRight from "../component/dialog/CreateRight";

const MainAdminRight = () => {
  const queryClient = useQueryClient();

  // --- Fetch Rights ---
  const {
    data: rightsData,
    isLoading: rightsLoading,
    isError: rightsError,
    refetch: rightsRefetch,
  } = useFindAllAdminRights({ page: 0, size: 0 });

  const rightsItems: any[] = useMemo(() => {
    const raw =
      (rightsData &&
        (rightsData.content ||
          (rightsData as any).items ||
          (rightsData as any).data ||
          (rightsData as any).rights)) ||
      (Array.isArray(rightsData) ? rightsData : []);
    const arr = Array.isArray(raw) ? raw : [];
    const seen = new Set();
    return arr.filter((r: any) => {
      const key = String(r.id ?? r.code ?? "");
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [rightsData]);

  // --- Fetch Resources ---
  const {
    data: resourceData,
    isLoading: resourceLoading,
    isError: resourceError,
  } = useFindAllResource({ page: 0, size: 50 });

  const resourceItems: any[] = useMemo(() => {
    const raw =
      (resourceData &&
        (resourceData.content ||
          (resourceData as any).items ||
          (resourceData as any).data ||
          (resourceData as any).resources)) ||
      (Array.isArray(resourceData) ? resourceData : []);
    const arr = Array.isArray(raw) ? raw : [];
    const seen = new Set();
    return arr.filter((r: any) => {
      const key = String(r.id ?? r.code ?? r.name ?? "");
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [resourceData]);


  // --- Selected Right ---
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);
  const {
    data: selectedRightData,
    isLoading: selectedRightLoading,
    isError: selectedRightError,
  } = useFindAdminRightById(selectedRightId ?? "", Boolean(selectedRightId));

  const permissionEntries: any[] = useMemo(() => {
    if (!selectedRightData) return [];
    const candidates = selectedRightData.permissions || [];
    return Array.isArray(candidates) ? candidates : [];
  }, [selectedRightData]);

  const menuNames: string[] = useMemo(() => {
    if (!selectedRightData) return [];
    const menusCandidate = selectedRightData.menus || [];
    if (!Array.isArray(menusCandidate)) return [];
    return menusCandidate
      .map((m: any) => {
        if (!m && typeof m !== "string") return null;
        if (typeof m === "string") return m;
        return m.name ?? m.menuName ?? m.label ?? m.title ?? null;
      })
      .filter(Boolean) as string[];
  }, [selectedRightData]);

  const effectiveMenuNames: string[] = useMemo(() => {
    if (selectedRightId) {
      return menuNames;
    }
    // fallback: show tất cả resourceItems như menu
    return resourceItems.map(
      (res: any) => res.name ?? res.ten ?? res.code ?? ""
    );
  }, [selectedRightId, menuNames, resourceItems]);

  // --- Helpers ---
  const normalize = (v: any) =>
    v === null || v === undefined ? "" : String(v).trim().toLowerCase();

  const getPermissionsForResource = (res: any) => {
    if (!selectedRightData) {
      return {
        create: true,
        read: true,
        update: true,
        delete: true,
        exec: true,
      };
    }

    const resKeys = [
      normalize(res.id),
      normalize(res.code),
      normalize(res.name),
      normalize(res.ten),
      normalize(res.resourceId),
    ].filter(Boolean);

    let matched: any = null;
    for (const p of permissionEntries) {
      const pKeys = [
        normalize(p.resourceId),
        normalize(p.resource?.id),
        normalize(p.resourceCode),
        normalize(p.resource?.code),
        normalize(p.code),
        normalize(p.name),
        normalize(p.resource?.name),
        normalize(p.resourceName),
        normalize(p.id),
      ].filter(Boolean);

      if (pKeys.some((k: string) => resKeys.includes(k))) {
        matched = p;
        break;
      }
      if (p.resource && typeof p.resource === "object") {
        const nestedKeys = [
          normalize(p.resource.id),
          normalize(p.resource.code),
          normalize(p.resource.name),
          normalize(p.resource.ten),
        ].filter(Boolean);
        if (nestedKeys.some((k: string) => resKeys.includes(k))) {
          matched = p;
          break;
        }
      }
    }

    if (!matched) {
      return {
        create: false,
        read: false,
        update: false,
        delete: false,
        exec: false,
      };
    }

    const flag = (obj: any, ...keys: string[]) =>
      keys.some((k) => {
        if (k in obj && obj[k] !== undefined && obj[k] !== null) {
          const val = obj[k];
          return (
            val === true ||
            val === 1 ||
            String(val) === "1" ||
            String(val) === "true"
          );
        }
        return false;
      });

    return {
      create: flag(
        matched,
        "create",
        "canCreate",
        "c",
        "allowCreate",
        "isCreate"
      ),
      read: flag(
        matched,
        "read",
        "view",
        "canRead",
        "r",
        "allowRead",
        "isRead"
      ),
      update: flag(
        matched,
        "update",
        "edit",
        "canUpdate",
        "u",
        "allowUpdate",
        "isUpdate"
      ),
      delete: flag(
        matched,
        "delete",
        "del",
        "canDelete",
        "d",
        "allowDelete",
        "isDelete"
      ),
      exec: flag(
        matched,
        "exec",
        "execute",
        "canExecute",
        "e",
        "allowExec",
        "allowExecute",
        "isExec"
      ),
    };
  };

  const handleSelectRight = (id: string | number) => {
    const key = id === undefined || id === null ? null : String(id);
    setSelectedRightId(key);
  };

  // --- State quản lý checkbox ---
  const [checkedPermissions, setCheckedPermissions] = useState<
    Record<string, any>
  >({});
  const handleCheckboxChange = (
    resourceId: string,
    field: "read" | "create" | "delete" | "update" | "exec"
  ) => {
    setCheckedPermissions((prev) => {
      const current = prev[resourceId] || {};
      return {
        ...prev,
        [resourceId]: { ...current, [field]: !current[field] },
      };
    });
  };

  const isChecked = (
    resourceId: string,
    field: "read" | "create" | "delete" | "update" | "exec",
    defaultValue: boolean
  ) => {
    return checkedPermissions[resourceId]?.[field] ?? defaultValue;
  };

  // ---- Create dialog state ----
  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);

  const handleReloadRights = useCallback(async () => {
    try {
      if (typeof rightsRefetch === "function") {
        // prefer direct refetch if available
        await rightsRefetch();
        return;
      }
    } catch (e) {
      console.error("rightsRefetch failed:", e);
    }

    // fallback: try common query keys (non-blocking)
    try {
      await queryClient.invalidateQueries("FIND_ALL_ADMIN_RIGHT");
    } catch (e) {
      console.warn("invalidateQueries with specific keys failed:", e);
    }
  }, [rightsRefetch, queryClient]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        gap: 3,
      }}
    >
      <Typography variant="h4" color="black">
        Quyền menu - Quyền chức năng
      </Typography>

      {/* Tìm kiếm */}

      {/* <TextField
        type="text"
        size="small"
        placeholder="Tìm kiếm..."
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchOutlinedIcon sx={{ color: "#888" }} />
            </InputAdornment>
          ),
        }}
        sx={{ backgroundColor: "white", borderRadius: "10px", width: "50%" }}
        fullWidth
      /> */}

      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <RightList
          rightsItems={rightsItems}
          rightsLoading={rightsLoading}
          rightsError={rightsError}
          selectedRightId={selectedRightId}
          handleSelectRight={handleSelectRight}
          onCreate={handleOpenCreate}
        />

        <PermissionList
          selectedRightId={selectedRightId}
          selectedRightLoading={selectedRightLoading}
          selectedRightError={selectedRightError}
          resourceItems={resourceItems}
          getPermissionsForResource={getPermissionsForResource}
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
        />

        <MenuList
          selectedRightId={selectedRightId}
          selectedRightData={selectedRightData}
          resourceItems={resourceItems}
        />
      </Box>

      {/* CreateRight dialog */}
      <CreateRight
        open={openCreate}
        onClose={handleCloseCreate}
        rightsItems={rightsItems}
        onCreated={handleReloadRights}
      />
    </Box>
  );
};

export default MainAdminRight;
