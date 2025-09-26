import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Checkbox,
  Autocomplete,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useQueryClient } from "react-query";
import { useUpdateRightPermission } from "hooks/admin-rights/useUpdateRightPermission";

interface PermissionListProps {
  selectedRightId?: string | null;
  selectedRightLoading: boolean;
  selectedRightError: boolean;
  resourceItems: any[];
  getPermissionsForResource: (res: any) => any;
  isChecked: (resourceId: string, field: any, defaultValue: boolean) => boolean;
  handleCheckboxChange: (resourceId: string, field: any) => void;
  onClearPending?: () => void;
}

type ExtraRow = {
  uid: string;
  selected?: any | null;
};

const PermissionList: React.FC<PermissionListProps> = ({
  selectedRightId,
  selectedRightLoading,
  selectedRightError,
  resourceItems,
  getPermissionsForResource,
  isChecked,
  handleCheckboxChange,
  onClearPending,
}) => {
  // local new rows
  const [extraRows, setExtraRows] = useState<ExtraRow[]>([]);
  const queryClient = useQueryClient();
  const updatePermissionMutation = useUpdateRightPermission();

  // keep previous selected right id to detect changes
  const prevRightIdRef = useRef<string | null | undefined>(undefined);

  // clear local unsaved edits when switching role or when loading new right
  useEffect(() => {
    const prev = prevRightIdRef.current;
    if (prev !== undefined && prev !== selectedRightId) {
      setExtraRows([]);
      try {
        onClearPending?.();
      } catch (e) {
        // ignore
      }
    }

    if (selectedRightLoading) {
      setExtraRows([]);
    }

    prevRightIdRef.current = selectedRightId;
  }, [selectedRightId, selectedRightLoading]);

  const handleAddRow = () => {
    const uid = `new-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    setExtraRows((prev) => [{ uid, selected: null }, ...prev]);
  };

  const handleSelectForRow = (uid: string, option: any | null) => {
    setExtraRows((prev) =>
      prev.map((r) => (r.uid === uid ? { ...r, selected: option ?? null } : r))
    );
  };

  const handleRemoveRow = (uid: string) => {
    setExtraRows((prev) => prev.filter((r) => r.uid !== uid));
  };


  const findSelectedRightIdFromCache = (): string | null => {
    try {
      // @ts-ignore
      const q = queryClient.getQueriesData?.() ?? [];
      if (Array.isArray(q) && q.length > 0) {
        for (const [key, data] of q as any[]) {
          try {
            const keyStr = JSON.stringify(key).toLowerCase();
            if (keyStr.includes("admin") && data && data.id) {
              return String(data.id);
            }
            if (data && data.id && (data.permissions || data.name || data.code)) {
              return String(data.id);
            }
            if (data?.data && data.data.id) {
              return String(data.data.id);
            }
          } catch (e) {
          }
        }
      }
    } catch (e) {
    }
    return null;
  };

  const invalidateAndRefetchRelevant = async (effectiveRightId: string) => {
    try {
      await queryClient.invalidateQueries("FIND_ALL_ADMIN_RIGHT");
    } catch (e) {
    }

    try {
      await queryClient.invalidateQueries(["FIND_ALL_ADMIN_RIGHT", effectiveRightId]);
    } catch (e) {
    }

    // Try to find queries whose keys mention the right id or admin-right-like keys.
    try {
      // @ts-ignore
      const all = queryClient.getQueriesData?.() ?? [];
      const keysToInvalidate: any[] = [];
      if (Array.isArray(all)) {
        for (const [key] of all as any[]) {
          try {
            const keyStr = JSON.stringify(key).toLowerCase();
            if (!keyStr) continue;
            if (
              (effectiveRightId && keyStr.includes(String(effectiveRightId).toLowerCase())) ||
              keyStr.includes("find_all_admin_right") ||
              keyStr.includes("find_admin_right") ||
              keyStr.includes("admin-right") ||
              keyStr.includes("admin_right") ||
              keyStr.includes("adminrights") ||
              keyStr.includes("admin-rights")
            ) {
              keysToInvalidate.push(key);
            }
          } catch (e) {
            // ignore this key
          }
        }
      }

      // unique
      const uniqKeys = Array.from(new Set(keysToInvalidate.map((k) => JSON.stringify(k)))).map(
        (s) => JSON.parse(s)
      );

      // invalidate all found keys (sequentially to avoid overwhelming)
      for (const k of uniqKeys) {
        try {
          await queryClient.invalidateQueries(k as any);
        } catch (e) {
          // ignore
        }
      }

      try {
        // @ts-ignore
        await queryClient.refetchQueries?.(["FIND_ALL_ADMIN_RIGHT", effectiveRightId]);
      } catch (e) {
        // ignore
      }
    } catch (e) {
      // ignore global scan errors
    }
  };

  const handleSave = async () => {
    const effectiveRightId = selectedRightId ?? findSelectedRightIdFromCache();
    if (!effectiveRightId) {
      return;
    }

    // Build permissions payload
    const permissionsPayload: any[] = [];

    // extra rows
    for (const row of extraRows) {
      const selected = row.selected;
      const resourceKey = String(selected?.id ?? selected?.code ?? row.uid ?? "");
      const resourceIdForPayload = String(selected?.id ?? selected?.code ?? "");
      if (!resourceIdForPayload) {
        continue;
      }
      permissionsPayload.push({
        resource: { id: resourceIdForPayload },
        create: Boolean(isChecked(resourceKey, "create", false)),
        read: Boolean(isChecked(resourceKey, "read", false)),
        update: Boolean(isChecked(resourceKey, "update", false)),
        delete: Boolean(isChecked(resourceKey, "delete", false)),
        exec: Boolean(isChecked(resourceKey, "exec", false)),
      });
    }

    // existing shown resources
    resourceItems
      .filter((res: any) => {
        const perms = getPermissionsForResource(res);
        return (
          perms.create || perms.read || perms.update || perms.delete || perms.exec
        );
      })
      .forEach((res: any, idx: number) => {
        const perms = getPermissionsForResource(res);
        const id = String(res.id ?? res.code ?? res.resourceId ?? idx);
        if (!id) return;
        permissionsPayload.push({
          resource: { id },
          create: Boolean(isChecked(id, "create", !!perms.create)),
          read: Boolean(isChecked(id, "read", !!perms.read)),
          update: Boolean(isChecked(id, "update", !!perms.update)),
          delete: Boolean(isChecked(id, "delete", !!perms.delete)),
          exec: Boolean(isChecked(id, "exec", !!perms.exec)),
        });
      });

    if (permissionsPayload.length === 0) {
      console.warn("Không có permission hợp lệ để lưu.");
      return;
    }

    const dto: any = {
      version: 0,
      id: effectiveRightId,
      permissions: permissionsPayload,
    };

    try {
      await updatePermissionMutation.mutateAsync(dto);
      // 1) clear local extraRows
      setExtraRows([]);

      // 2) notify parent to clear pending (so it can reset checkedPermissions)
      try {
        onClearPending?.();
      } catch (e) {
        // ignore
      }

      // 3) robust invalidation & refetch of relevant queries (so MainAdminRight's selectedRightData will refresh)
      await invalidateAndRefetchRelevant(effectiveRightId);
    } catch (e) {
      console.error("Cập nhật quyền thất bại", e);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "white",
        p: 1,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="h6" color="black">
            Quyền đối tượng
          </Typography>
          <Button
            sx={{
              backgroundColor: "lightsalmon",
              color: "black",
              fontSize: "15px",
            }}
            onClick={handleAddRow}
          >
            <AddIcon />
          </Button>
        </Box>
        <Button
          sx={{
            backgroundColor: "lightblue",
            color: "black",
            fontSize: "15px",
          }}
          onClick={handleSave}
          disabled={updatePermissionMutation.isLoading || !selectedRightId}
        >
          <SaveIcon />
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 420,
          overflowX: "hidden",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Table size="small" stickyHeader sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "10px" }}>
                <b>STT</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "100px" }}>
                <b>TÊN ĐỐI TƯỢNG</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "20px" }}>
                <b>XEM</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "25px" }}>
                <b>THÊM</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "20px" }}>
                <b>XÓA</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "20px" }}>
                <b>SỬA</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "25px" }}>
                <b>EXCE</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "10px" }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {selectedRightLoading && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {/* Extra rows */}
            {!selectedRightLoading &&
              extraRows.map((row, idx) => {
                const stt = idx + 1;
                const selected = row.selected ?? null;
                const resourceKey = String(
                  selected?.id ?? selected?.code ?? row.uid
                );
                const displayName =
                  selected?.name ?? selected?.ten ?? selected?.code ?? "";

                return (
                  <TableRow key={row.uid} hover>
                    <TableCell>{stt}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <Autocomplete
                            size="medium"
                            options={resourceItems || []}
                            getOptionLabel={(opt: any) =>
                              opt?.name ?? opt?.ten ?? opt?.code ?? ""
                            }
                            value={selected}
                            onChange={(_, option) =>
                              handleSelectForRow(row.uid, option)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Tên"
                                variant="outlined"
                                size="small"
                              />
                            )}
                            isOptionEqualToValue={(option, value) =>
                              String(option?.id ?? option?.code) ===
                              String(value?.id ?? value?.code)
                            }
                            slotProps={{
                              paper: {
                                sx: {
                                  width: "auto",
                                  minWidth: 250,
                                },
                              },
                              listbox: {
                                sx: {
                                  maxHeight: 300,
                                  overflowY: "auto",
                                  scrollbarWidth: "none",
                                  "&::-webkit-scrollbar": {
                                    display: "none",
                                  },
                                },
                              },
                            }}
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontSize: "0.8rem",
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                              mt: 0.5,
                            }}
                          >
                            {displayName ? `(${displayName})` : ""}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell align="center" sx={{ p: 0 }}>
                      <Checkbox
                        size="small"
                        checked={isChecked(resourceKey, "read", false)}
                        onChange={() =>
                          handleCheckboxChange(resourceKey, "read")
                        }
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ p: 0 }}>
                      <Checkbox
                        size="small"
                        checked={isChecked(resourceKey, "create", false)}
                        onChange={() =>
                          handleCheckboxChange(resourceKey, "create")
                        }
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ p: 0 }}>
                      <Checkbox
                        size="small"
                        checked={isChecked(resourceKey, "delete", false)}
                        onChange={() =>
                          handleCheckboxChange(resourceKey, "delete")
                        }
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ p: 0 }}>
                      <Checkbox
                        size="small"
                        checked={isChecked(resourceKey, "update", false)}
                        onChange={() =>
                          handleCheckboxChange(resourceKey, "update")
                        }
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ p: 0 }}>
                      <Checkbox
                        size="small"
                        checked={isChecked(resourceKey, "exec", false)}
                        onChange={() =>
                          handleCheckboxChange(resourceKey, "exec")
                        }
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ p: 0 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveRow(row.uid)}
                        aria-label="xóa dòng"
                        color="error"
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

            {/* Existing resources */}
            {!selectedRightError &&
              resourceItems
                .filter((res: any) => {
                  const perms = getPermissionsForResource(res);
                  return (
                    perms.create ||
                    perms.read ||
                    perms.update ||
                    perms.delete ||
                    perms.exec
                  );
                })
                .map((res: any, idx: number) => {
                  const id = String(res.id ?? res.code ?? idx);
                  const stt = extraRows.length + idx + 1;
                  const name = res.name ?? res.ten ?? res.code ?? "";
                  const perms = getPermissionsForResource(res);

                  return (
                    <TableRow key={id} hover>
                      <TableCell>{stt}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: "0.8rem",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                          }}
                        >
                          {res.code}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ p: 0 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked(id, "read", !!perms.read)}
                          onChange={() => handleCheckboxChange(id, "read")}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked(id, "create", !!perms.create)}
                          onChange={() => handleCheckboxChange(id, "create")}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked(id, "delete", !!perms.delete)}
                          onChange={() => handleCheckboxChange(id, "delete")}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked(id, "update", !!perms.update)}
                          onChange={() => handleCheckboxChange(id, "update")}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked(id, "exec", !!perms.exec)}
                          onChange={() => handleCheckboxChange(id, "exec")}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PermissionList;
