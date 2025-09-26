import React, { useState } from "react";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteAdminRight } from "hooks/admin-rights/useDeleteAdminRight";
import { useQueryClient } from "react-query";

interface RightListProps {
  rightsItems: any[];
  rightsLoading: boolean;
  rightsError: boolean;
  selectedRightId: string | null;
  handleSelectRight: (id: string | number) => void;
  onCreate?: () => void;
}

const RightList: React.FC<RightListProps> = ({
  rightsItems,
  rightsLoading,
  rightsError,
  selectedRightId,
  handleSelectRight,
  onCreate,
}) => {
  const queryClient = useQueryClient();
  const { mutate: deleteAdminRight } = useDeleteAdminRight();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rightToDelete, setRightToDelete] = useState<{ id: string; version: number; name: string } | null>(null);

  const handleOpenDeleteDialog = (right: any, e: React.MouseEvent) => {
    e.stopPropagation();
    const id = right.id ?? right.code;
    const version = right.version ?? 0;
    const name = right.name ?? right.ten ?? right.code ?? "";
    
    if (id) {
      setRightToDelete({ id: String(id), version, name });
      setDeleteDialogOpen(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setRightToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (rightToDelete) {
      deleteAdminRight(rightToDelete, {
        onSuccess: () => {
          handleCloseDeleteDialog();
          queryClient.invalidateQueries({ predicate: (query) => 
            query.queryKey.toString().includes("FIND_ALL_ADMIN_RIGHT")
          });
        },
        onError: (error) => {
          console.error("Delete error:", error);
          handleCloseDeleteDialog();
        }
      });
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 1,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "270px",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <Typography variant="h6" color="black">
          Danh sách quyền
        </Typography>
        <Button
          sx={{ backgroundColor: "lightsalmon", color: "black", fontSize: "15px" }}
          onClick={() => {
            if (onCreate) onCreate();
          }}
        >
          <AddIcon />
        </Button>
      </Box>

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
        <Table size="small" stickyHeader sx={{ tableLayout: "fixed", minWidth: 0 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "8%" }}>
                <b>STT</b>
              </TableCell>
              <TableCell sx={{ width: "50%", whiteSpace: "normal", wordBreak: "break-word" }}>
                <b>TÊN</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "12%" }}>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rightsLoading && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {!rightsLoading && rightsError && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <Typography color="error">Lỗi khi tải dữ liệu</Typography>
                </TableCell>
              </TableRow>
            )}

            {!rightsLoading && !rightsError && rightsItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <Typography>Không có dữ liệu</Typography>
                </TableCell>
              </TableRow>
            )}

            {!rightsLoading &&
              !rightsError &&
              rightsItems.map((r: any, idx: number) => {
                const id = r.id ?? r.code ?? idx;
                if (!id) return null;
                const name = r.name ?? r.ten ?? r.code ?? "";
                const rowKey = String(id);
                const isSelected = selectedRightId !== null && rowKey === selectedRightId;

                return (
                  <TableRow
                    key={String(id)}
                    hover
                    selected={isSelected}
                    onClick={() => handleSelectRight(id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                      <Typography variant="body1" fontWeight="bold">
                        {name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.8rem" }}
                      >
                        {r.code}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Edit right", id);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        color="error"
                        size="small"
                        onClick={(e) => handleOpenDeleteDialog(r, e)}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Xác nhận xóa
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Bạn có chắc chắn muốn xóa quyền "{rightToDelete?.name}" không? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RightList;