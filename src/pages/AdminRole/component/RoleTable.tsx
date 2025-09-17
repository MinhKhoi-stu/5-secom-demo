// RoleTable.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddIcon from "@mui/icons-material/Add";
import CreateRole from "./CreateRole";
import UpdateRole from "./UpdateRole";
import { useDeleteAdminRole } from "hooks/admin-roles/useDeleteAdminRole";
import { useQueryClient } from "react-query";

type RoleTableProps = {
  isLoading: boolean;
  isError: boolean;
  rowsData: any[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (_event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRoleId: string | number | null;
  handleRoleSelect: (rawId: any) => void;
};

const RoleTable: React.FC<RoleTableProps> = ({
  isLoading,
  isError,
  rowsData,
  totalCount,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  selectedRoleId,
  handleRoleSelect,
}) => {
  const [open, setOpen] = useState(false);

  // Update dialog
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<any | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    version: number;
    name?: string;
  } | null>(null);

  const deleteRole = useDeleteAdminRole();
  const queryClient = useQueryClient();

  const handleDeleteClick = (row: any) => {
    const id = row.id ?? row.code;
    const version = row.version ?? 0;
    setDeleteTarget({ id: String(id), version, name: row.name });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteRole.mutate(deleteTarget, {
        onSettled: () => {
          setConfirmOpen(false);
          setDeleteTarget(null);
        },
      });
    }
  };

  // mở dialog cập nhật và truyền toàn bộ row vào
  const handleEditClick = (row: any) => {
    setUpdateTarget(row);
    setUpdateOpen(true);
  };

  return (
    <Box sx={{ flex: 1, minWidth: 200 }}>
      <Box
        sx={{
          width: "90%",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          p: { xs: 2, sm: 3 },
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          mt: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" color="black">
            Nhóm quyền
          </Typography>
          <Button
            sx={{
              backgroundColor: "lightsalmon",
              color: "black",
              fontSize: "15px",
            }}
            onClick={() => setOpen(true)}
          >
            <AddIcon /> Tạo mới
          </Button>
        </Box>

        <TextField
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
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "50%",
          }}
          fullWidth
        />

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 420,
            minWidth: 0,
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Table
            size="small"
            stickyHeader
            sx={{ tableLayout: "fixed", minWidth: 0 }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "8%" }}>
                  <b>STT</b>
                </TableCell>
                <TableCell
                  sx={{
                    width: "20%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <b>MÃ</b>
                </TableCell>
                <TableCell
                  sx={{
                    width: "50%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <b>TÊN</b>
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  <b>CẤP ĐỘ</b>
                </TableCell>
                <TableCell align="center" sx={{ width: "12%" }}>
                  <b>Hành động</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Loading */}
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}

              {/* Error */}
              {isError && !isLoading && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="error">Lỗi khi tải dữ liệu</Typography>
                  </TableCell>
                </TableRow>
              )}

              {/* Empty */}
              {!isLoading && !isError && rowsData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography>Không có dữ liệu</Typography>
                  </TableCell>
                </TableRow>
              )}

              {!isLoading &&
                !isError &&
                rowsData.map((r: any, idx: number) => {
                  const id = r.id ?? r.code ?? idx;
                  const code = r.code ?? r.ma ?? r?.roleCode ?? "";
                  const name = r.name ?? r.ten ?? r?.roleName ?? "";
                  const level = r.level ?? r.capDo ?? r?.roleLevel ?? "";
                  const version = r.version ?? 0;

                  return (
                    <TableRow
                      key={id}
                      hover
                      onClick={() => handleRoleSelect(id)}
                      selected={selectedRoleId === id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{page * rowsPerPage + idx + 1}</TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {code}
                      </TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {name}
                      </TableCell>
                      <TableCell>{level}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(r);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          color="error"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick({ id, version, name });
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 1 }}>
          <TablePagination
            component="div"
            count={typeof totalCount === "number" ? totalCount : rowsData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Items:"
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Box>

      {/* Dialog tạo role */}
      <CreateRole
        open={open}
        onClose={() => setOpen(false)}
        onSave={(data) => console.log("saved:", data)}
      />

      {/* Dialog xác nhận xoá */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          Bạn có chắc muốn xoá role <b>{deleteTarget?.name ?? deleteTarget?.id}</b> không?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Huỷ</Button>
          <Button color="error" onClick={handleConfirmDelete} disabled={deleteRole.isLoading}>
            {deleteRole.isLoading ? "Đang xoá..." : "Xoá"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog cập nhật */}
      <UpdateRole
        open={updateOpen}
        initialData={updateTarget}
        onClose={() => setUpdateOpen(false)}
        onSave={(data) => {
          // on success: invalidate role queries để refresh bảng
          try {
            queryClient.invalidateQueries({
              predicate: (q) => {
                try {
                  return JSON.stringify(q.queryKey).toLowerCase().includes("role");
                } catch {
                  return false;
                }
              },
            });
          } catch {
            queryClient.invalidateQueries();
          }
          setUpdateOpen(false);
          setUpdateTarget(null);
          console.log("updated role resp:", data);
        }}
      />
    </Box>
  );
};

export default RoleTable;
