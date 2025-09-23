import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useQueryClient } from "react-query";
import { useFindAdminRoleById } from "hooks/admin-roles/useFindAdminRoleById";
import { useUpdateAdminRoles } from "hooks/admin-roles/useUpdateAdminRoles";
import { AdminRightDto } from "dto/admin-rights/admin-rights.dto";
import { UpdateAdminRoleDto } from "dto/admin-roles";

type Props = {
  open: boolean;
  initialData?: any;
  onClose: () => void;
  onSave: (data: any) => void;
};

const emptyDate = () => new Date().toISOString();

const initialForm = {
  id: "",
  version: 0,
  code: "",
  name: "",
  note: "",
  rights: [] as string[],
};

const ensureAdminRightDto = (raw: any): AdminRightDto => {
  if (!raw) {
    return {
      version: 1,
      createdBy: "",
      updatedBy: "",
      createdDate: emptyDate(),
      updatedDate: emptyDate(),
      id: "",
      code: "",
      name: "",
      note: "",
    } as AdminRightDto;
  }

  if (
    typeof raw === "object" &&
    raw.id !== undefined &&
    raw.name !== undefined &&
    raw.code !== undefined &&
    raw.version !== undefined &&
    raw.createdDate !== undefined
  ) {
    return {
      version: Number(raw.version) || 1,
      createdBy: raw.createdBy ?? "",
      updatedBy: raw.updatedBy ?? "",
      createdDate: raw.createdDate ?? emptyDate(),
      updatedDate: raw.updatedDate ?? emptyDate(),
      id: String(raw.id),
      code: String(raw.code ?? raw.name ?? raw.id ?? ""),
      name: String(raw.name ?? raw.code ?? raw.id ?? ""),
      note: raw.note ?? "",
    } as AdminRightDto;
  }

  const id =
    raw && (raw.id ?? raw.code ?? raw.name)
      ? String(raw.id ?? raw.code ?? raw.name)
      : String(raw);
  const code = raw && raw.code ? String(raw.code) : id;
  const name = raw && raw.name ? String(raw.name) : id;

  return {
    version: 1,
    createdBy: "",
    updatedBy: "",
    createdDate: emptyDate(),
    updatedDate: emptyDate(),
    id,
    code,
    name,
    note: raw?.note ?? "",
  } as AdminRightDto;
};

const UpdateRole: React.FC<Props> = ({
  open,
  initialData,
  onClose,
  onSave,
}) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(() => ({ ...initialForm }));
  const [error, setError] = useState<string | null>(null);

  const fetchIdRaw =
    open && initialData
      ? initialData.id ??
        initialData.code ??
        initialData.ma ??
        initialData.roleCode ??
        undefined
      : undefined;

  const fetchEnabled = Boolean(
    open && fetchIdRaw !== undefined && fetchIdRaw !== null
  );

  const {
    data: roleData,
    isLoading,
    isError,
  } = useFindAdminRoleById(fetchIdRaw as any as number, fetchEnabled);

  const rightsFromSource = (roleData?.rights ??
    initialData?.rights ??
    []) as any[];

  const rightsOptions: AdminRightDto[] = useMemo(() => {
    if (!Array.isArray(rightsFromSource)) return [];
    return rightsFromSource.map((r: any) => ensureAdminRightDto(r));
  }, [JSON.stringify(rightsFromSource)]);

  useEffect(() => {
    if (!open) {
      setFormData({ ...initialForm });
      setError(null);
      return;
    }

    const src = (roleData as any) ?? (initialData as any) ?? {};

    const computedRights: string[] =
      Array.isArray(src.rights) && src.rights.length > 0
        ? src.rights.map((r: any) => {
            if (r === null || r === undefined) return String(r);
            if (typeof r === "string" || typeof r === "number")
              return String(r);
            return String(r.id ?? r.code ?? r.name ?? r);
          })
        : rightsOptions.map((o) => String(o.id));

    const idVal = src.id ?? src._id ?? src.code ?? src.roleCode ?? "";
    const versionVal = src.version ?? src.v ?? 1;

    setFormData({
      id: String(idVal ?? ""),
      version: Number(versionVal ?? 1),
      code: src.code ?? src.roleCode ?? src.ma ?? "",
      name: src.name ?? src.roleName ?? "",
      note: src.note ?? "",
      rights: computedRights,
    });
    setError(null);
  }, [open, initialData, roleData, rightsOptions]);

  const updateRole = useUpdateAdminRoles();

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateBeforeSubmit = (): string | null => {
    if (!formData.id || String(formData.id).trim().length === 0) {
      return "Trường 'id' là bắt buộc.";
    }
    if (
      formData.version === undefined ||
      formData.version === null ||
      Number.isNaN(Number(formData.version))
    ) {
      return "Trường 'version' là bắt buộc và phải là số.";
    }
    if (!formData.code || String(formData.code).trim().length === 0) {
      return "Trường 'Mã' (code) là bắt buộc.";
    }
    if (!formData.name || String(formData.name).trim().length === 0) {
      return "Trường 'Tên' (name) là bắt buộc.";
    }
    if (!Array.isArray(formData.rights) || formData.rights.length === 0) {
      return "Phải chọn ít nhất một quyền (rights).";
    }
    return null;
  };

  const handleUpdate = () => {
    setError(null);

    const validationError = validateBeforeSubmit();
    if (validationError) {
      setError(validationError);
      return;
    }

    const rightsPayload: AdminRightDto[] = (formData.rights || []).map(
      (selId) => {
        const found = rightsOptions.find((r) => String(r.id) === String(selId));
        if (found) {
          return {
            version: Number(found.version ?? 1),
            createdBy: found.createdBy ?? "",
            updatedBy: found.updatedBy ?? "",
            createdDate: found.createdDate ?? emptyDate(),
            updatedDate: found.updatedDate ?? emptyDate(),
            id: String(found.id),
            code: found.code ?? String(found.id),
            name: found.name ?? String(found.id),
            note: found.note ?? "",
          } as AdminRightDto;
        }

        const idStr = String(selId);
        return {
          version: 1,
          createdBy: "",
          updatedBy: "",
          createdDate: emptyDate(),
          updatedDate: emptyDate(),
          id: idStr,
          code: idStr,
          name: idStr,
          note: "",
        } as AdminRightDto;
      }
    );

    const payload: UpdateAdminRoleDto = {
      id: String(formData.id),
      version: Number(formData.version),
      code: String(formData.code).trim(),
      name: String(formData.name).trim(),
      note: formData.note ? String(formData.note) : undefined,
      rights: rightsPayload,
    };

    updateRole.mutate(
      {
        id: String(payload.id),
        data: payload,
      },
      {
        onSuccess: (resp) => {
          try {
            queryClient.invalidateQueries({
              predicate: (query) => {
                try {
                  const k = query.queryKey;
                  return JSON.stringify(k).toLowerCase().includes("role");
                } catch {
                  return false;
                }
              },
            });
          } catch {
            queryClient.invalidateQueries();
          }

          onSave(resp);
          setFormData({ ...initialForm });
          onClose();
        },
        onError: (e: any) => {
          const msg =
            e?.message || e?.response?.data?.message || "Lỗi khi cập nhật role";
          setError(String(msg));
          console.error("Update role error:", e);
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6">Cập nhật nhóm quyền</Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Mã*"
            fullWidth
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
          />
          <TextField
            label="Tên*"
            fullWidth
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextField
            label="Ghi chú"
            fullWidth
            value={formData.note}
            onChange={(e) => handleChange("note", e.target.value)}
          />

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : isError ? (
            <Typography color="error">Lỗi khi tải quyền</Typography>
          ) : (
            <Select
              multiple
              displayEmpty
              value={formData.rights}
              onChange={(e) =>
                handleChange("rights", e.target.value as string[])
              }
              renderValue={(selected) => {
                const sel = (selected as string[]) || [];
                if (sel.length === 0) return "Chọn quyền";
                return sel
                  .map((id) => {
                    const found = rightsOptions.find(
                      (r) => String(r.id) === String(id)
                    );
                    return found
                      ? found.name ?? found.code ?? String(id)
                      : String(id);
                  })
                  .join(", ");
              }}
              fullWidth
            >
              {rightsOptions.length === 0 ? (
                <MenuItem disabled>Không có quyền để hiển thị</MenuItem>
              ) : (
                rightsOptions.map((r) => (
                  <MenuItem key={r.id} value={String(r.id)}>
                    <Checkbox
                      checked={formData.rights.indexOf(String(r.id)) > -1}
                    />
                    <ListItemText primary={r.name ?? r.code ?? String(r.id)} />
                  </MenuItem>
                ))
              )}
            </Select>
          )}

          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </DialogContent>

      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button
          variant="contained"
          onClick={handleUpdate}
          disabled={updateRole.isLoading}
          sx={{ backgroundColor: "red" }}
        >
          {updateRole.isLoading ? "Đang lưu..." : "Lưu"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateRole;
