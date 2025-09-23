import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { useFindAllAdminRoles } from "hooks/admin-roles/useFindAllAdminRole";
import { useFindAllAdminRights } from "hooks/admin-rights/useFindAllAdminRights";
import { useFindAdminRightByRoleId } from "hooks/admin-rights/useFindAdminRightByRoleId";
import RoleTable from "../component/table/RoleTable";
import RightTable from "../component/table/RightTable";
import { useUpdateRightOfRole } from "hooks/admin-roles/useUpdateRightOfRole";
import { useQueryClient } from "react-query";
import type { UpdateRightOfRoleDto } from "dto/admin-roles/update-right-of-role.dto";

type PermissionItem = {
  id: string | number;
  code?: string | number;
  label: string;
  checked: boolean;
};

const MainAdminRole: React.FC = () => {
  // pagination state (server-side)
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // permissions (right panel) - populated from useFindAllAdminRights
  const [state, setState] = useState<PermissionItem[]>([]);

  // selected role id (null nghĩa là không có role được chọn -> mặc định tick ALL)
  const [selectedRoleId, setSelectedRoleId] = useState<string | number | null>(
    null
  );

  // selected role version (lấy từ rowsData khi chọn role) - để gửi cùng DTO
  const [selectedRoleVersion, setSelectedRoleVersion] = useState<number>(0);

  const handleChange = (id: string | number) => {
    setState((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p))
    );
  };

  // memoize params to avoid refetch loops due to new object reference
  const queryParams = useMemo(
    () => ({ page, size: rowsPerPage }),
    [page, rowsPerPage]
  );

  // fetch roles using provided hook (server-side paging)
  const { data, isLoading, isError } = useFindAllAdminRoles(queryParams);

  const items: any[] =
    (data && (data.content || (data as any).items || (data as any).data)) || [];
  const fallbackArray = Array.isArray(data) ? (data as any) : [];
  const rowsData = items.length
    ? items
    : fallbackArray.length
    ? fallbackArray
    : [];

  const totalCount =
    (data &&
      ((data as any).totalElements ??
        (data as any).total ??
        (data as any).totalItems ??
        (data as any).count)) ??
    rowsData.length;

  // handle page change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
  };

  // ---- NEW: fetch rights for the right panel using provided hook ----
  const {
    data: rightsData,
    isLoading: rightsLoading,
    isError: rightsError,
  } = useFindAllAdminRights({
    page: 0,
    size: 0,
  });

  // normalize rights array from various backend shapes
  const rightsItems: any[] =
    (rightsData &&
      (rightsData.content ||
        (rightsData as any).items ||
        (rightsData as any).data ||
        (rightsData as any).rights)) ||
    (Array.isArray(rightsData) ? rightsData : []);

  // hook to fetch assigned rights for a selected role
  // note: useAdminRight expects roleId (the hook you provided)
  const {
    data: adminRightData,
    isLoading: adminRightLoading,
    isError: adminRightError,
  } = useFindAdminRightByRoleId(selectedRoleId);
  console.log("selectedRoleId:", selectedRoleId);

  // initialize state for rights only once (when rightsItems arrives and state is still empty)
  useEffect(() => {
    if (!rightsItems || rightsItems.length === 0) return;
    if (state.length > 0) return; // already initialized by user interaction or previous load

    const mapped: PermissionItem[] = rightsItems.map((r: any, idx: number) => {
      const id = r.id ?? r.code ?? idx;
      const code = r.code ?? r.ma ?? r.roleCode ?? r.id ?? "";
      const name = r.name ?? r.ten ?? r.roleName ?? code;
      // Important: when NO role is selected (initial state), we must set ALL checked
      const checked = true;
      return {
        id,
        code,
        label: `${name} (${code})`,
        checked,
      };
    });

    setState(mapped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightsItems]);

  // Utility: extract an array of identifiers (ids or codes as strings/numbers) from adminRightData
  const extractAssignedIdentifiers = (
    adminData: any
  ): Array<string | number> => {
    if (!adminData) return [];

    // If adminData is directly an array
    if (Array.isArray(adminData)) {
      return adminData.flatMap((item) => {
        if (item == null) return [];
        if (typeof item === "string" || typeof item === "number") return [item];
        return [
          item.id ??
            item.code ??
            item.permissionId ??
            item.ma ??
            item.name ??
            item,
        ];
      });
    }

    // Try common container fields
    const possible =
      adminData.content ||
      adminData.items ||
      adminData.data ||
      adminData.rights ||
      adminData.permissions ||
      adminData.assigned ||
      adminData.permissionIds ||
      adminData.permissionId;

    if (Array.isArray(possible)) {
      return possible.flatMap((item: any) => {
        if (item == null) return [];
        if (typeof item === "string" || typeof item === "number") return [item];
        return [
          item.id ??
            item.code ??
            item.permissionId ??
            item.ma ??
            item.name ??
            item,
        ];
      });
    }

    // possible is an object map like { permissionId: true }
    if (possible && typeof possible === "object") {
      const keys: string[] = [];
      for (const k in possible) {
        if (Object.prototype.hasOwnProperty.call(possible, k)) {
          const v = possible[k];
          // include key if truthy OR if value is object describing the permission
          if (v === true || (v && typeof v === "object")) {
            keys.push(k);
          }
        }
      }
      if (keys.length) return keys;
    }

    // fallback: single object with id or code
    if (adminData.id || adminData.code) return [adminData.id ?? adminData.code];

    return [];
  };

  // khi adminRightData thay đổi (hoặc role thay đổi), cập nhật checked state tương ứng
  useEffect(() => {
    if (!state || state.length === 0) {
      return;
    }

    if (selectedRoleId == null) {
      // no role selected -> tick all
      setState((prev) => prev.map((p) => ({ ...p, checked: true })));
      return;
    }

    // when a role is selected, wait for adminRightData to arrive
    if (!adminRightData) {
      // no data yet — do not modify user's manual changes
      return;
    }

    // parse assigned identifiers (ids or codes)
    const assigned = extractAssignedIdentifiers(adminRightData).map(String);
    const assignedSet = new Set(assigned);

    // update state: checked = true iff id or code is present in assignedSet
    setState((prev) =>
      prev.map((p) => {
        const idStr = String(p.id);
        const codeStr = p.code != null ? String(p.code) : "";
        const isAssigned =
          assignedSet.has(idStr) || (codeStr && assignedSet.has(codeStr));
        return { ...p, checked: !!isAssigned };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminRightData, selectedRoleId]);

  // handle role row click: toggle select
  const handleRoleSelect = (rawId: any) => {
    if (selectedRoleId === rawId) {
      setSelectedRoleId(null);
      setSelectedRoleVersion(0);
    } else {
      setSelectedRoleId(rawId);

      // tìm object role trong rowsData để lấy version (nhiều backend dùng field version)
      const found =
        rowsData.find(
          (r: any) =>
            r.id === rawId ||
            r.code === rawId ||
            String(r.id) === String(rawId) ||
            String(r.code) === String(rawId)
        ) ?? null;

      const ver =
        (found && (found.version ?? found.ver ?? found._version ?? 0)) ?? 0;
      setSelectedRoleVersion(Number(ver ?? 0));
    }
  };

  // mutation: cập nhật quyền cho role
  const updateRights = useUpdateRightOfRole();
  const queryClient = useQueryClient();

  const handleSaveRights = () => {
    if (selectedRoleId == null) return;

    const dto: UpdateRightOfRoleDto = {
      id: String(selectedRoleId),
      version: selectedRoleVersion ?? 0,
      rights: state
        .filter((p) => p.checked)
        .map((p) => ({ id: String(p.id) })),
    };

    updateRights.mutate(dto, {
      onSuccess: (data) => {
        // invalidate queries liên quan đến rights / role để re-fetch
        try {
          queryClient.invalidateQueries({
            predicate: (q) => {
              try {
                const keyStr = JSON.stringify(q.queryKey).toLowerCase();
                return (
                  keyStr.includes("adminright") ||
                  keyStr.includes("find_admin_right") ||
                  keyStr.includes("right") ||
                  keyStr.includes("find_all_admin_role") ||
                  keyStr.includes("role")
                );
              } catch {
                return false;
              }
            },
          });
        } catch {
          queryClient.invalidateQueries();
        }
        // tùy nếu bạn muốn hiển thị toast/snackbar thì có thể thêm ở đây
        console.log("Cập nhật quyền cho role thành công:", data);
      },
      onError: (err) => {
        console.error("Lỗi khi cập nhật quyền:", err);
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        textAlign: "left",
      }}
    >
      <Typography variant="h4" color="black">
        Danh sách vai trò
      </Typography>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <RoleTable
          isLoading={isLoading}
          isError={isError}
          rowsData={rowsData}
          totalCount={totalCount}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          selectedRoleId={selectedRoleId}
          handleRoleSelect={handleRoleSelect}
        />

        <RightTable
          rightsLoading={rightsLoading || adminRightLoading}
          rightsError={rightsError || adminRightError}
          state={state}
          handleChange={handleChange}
          onSave={handleSaveRights}
          saving={updateRights.isLoading}
          selectedRoleId={selectedRoleId}
        />
      </Box>
    </Box>
  );
};

export default MainAdminRole;
