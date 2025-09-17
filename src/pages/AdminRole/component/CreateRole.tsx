import React, { useMemo, useState, useEffect } from "react";
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
import { useFindAllAdminRights } from "hooks/admin-rights/useFindAllAdminRights";
import { useCreateAdminRoles } from "hooks/admin-roles/useCreateAdminRoles";
import { AdminRightDto } from "dto/admin-rights/admin-rights.dto";

const initialForm = {
  code: "",
  name: "",
  note: "",
  rights: [] as string[],
};

const CreateRole: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}> = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...initialForm });
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // load rights từ API chỉ khi dialog mở
  const { data, isLoading, isError } = useFindAllAdminRights(
    { page: 0, size: 100 },
    { enabled: open }
  );

  // chuẩn hoá danh sách rights
  const availableOptions = useMemo(() => {
    const listFromApi: any[] =
      (data && (data.content || (data as any).items || (data as any).data)) ||
      (Array.isArray(data) ? data : []) ||
      [];

    return listFromApi.map((r: any) => {
      const id = r.id ?? r._id ?? null;
      const code = r.code ?? r.codeName ?? null;
      const label = r.name ?? r.label ?? code ?? String(id ?? r);
      const value =
        id != null ? String(id) : code != null ? String(code) : label;
      return { value, label, raw: r };
    });
  }, [data]);

  useEffect(() => {
    if (open) {
      setError(null);
    }
  }, [open]);

  const createRole = useCreateAdminRoles();

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    setError(null);

    const selectedValues: string[] = formData.rights || [];

    const rightsIds = selectedValues
      .map((sel) => {
        const opt = availableOptions.find(
          (o) => String(o.value) === String(sel)
        );
        if (!opt) return undefined;
        const raw = opt.raw;
        if (raw) {
          if (raw.id !== undefined && raw.id !== null) return String(raw.id);
          if (raw._id !== undefined && raw._id !== null) return String(raw._id);
        }
        if (sel !== undefined && sel !== null) return String(sel);
        return undefined;
      })
      .filter(Boolean) as string[];

    type RightIdOnly = Pick<AdminRightDto, "id">;

    const payload: {
      code: string;
      name: string;
      note?: string;
      rights?: RightIdOnly[];
      //   level?: number;
    } = {
      code: formData.code,
      name: formData.name,
      note: formData.note || undefined,
      // map string ids to objects matching CreateAdminRoleDto requirement
      rights: rightsIds.map((id) => ({ id: id as AdminRightDto["id"] })),
    };

    createRole.mutate(payload, {
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
          e?.message || e?.response?.data?.message || "Lỗi khi tạo role";
        setError(String(msg));
        console.error("Create role error:", e);
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6">Thêm mới nhóm quyền</Typography>
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
              renderValue={(selected) =>
                (selected as string[]).length > 0
                  ? (selected as string[])
                      .map((val) => {
                        const opt = availableOptions.find(
                          (o) => String(o.value) === String(val)
                        );
                        return opt ? opt.label : String(val);
                      })
                      .join(", ")
                  : "Chọn quyền"
              }
              fullWidth
            >
              {availableOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  <Checkbox checked={formData.rights.includes(opt.value)} />
                  <ListItemText primary={opt.label} />
                </MenuItem>
              ))}
            </Select>
          )}

          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={createRole.isLoading}
          sx={{ backgroundColor: "red" }}
        >
          {createRole.isLoading ? "Đang tạo..." : "Tạo"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRole;
