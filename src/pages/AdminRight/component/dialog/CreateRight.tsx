import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useCreateAdminRight } from "hooks/admin-rights/useCreateAdminRight";

interface CreateRightProps {
  open: boolean;
  onClose: () => void;
  rightsItems?: any[];
  onCreated?: () => void; 
}

const CreateRight: React.FC<CreateRightProps> = ({ open, onClose, rightsItems, onCreated }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  // hook tạo quyền
  const createMutation = useCreateAdminRight();

  useEffect(() => {
    if (!open) {
      // reset khi đóng dialog
      setCode("");
      setName("");
      setNote("");
      setLocalError(null);
    }
  }, [open]);

  const handleSubmit = () => {
    setLocalError(null);
    // Basic validation: code and name required
    if (!code.trim()) {
      setLocalError("Mã (code) không được để trống");
      return;
    }
    if (!name.trim()) {
      setLocalError("Tên (name) không được để trống");
      return;
    }

    // Thực hiện tạo, dùng onSuccess để đóng dialog và notify parent reload
    createMutation.mutate(
      { code: String(code).trim(), name: String(name).trim(), note: String(note).trim() },
      {
        onSuccess: () => {
          onClose();
          // Thông báo cho parent (ví dụ MainAdminRight) reload lại danh sách quyền
          try {
            onCreated?.();
          } catch (e) {
            // defensive: nếu callback ném lỗi thì không phá flow
            console.error("onCreated callback error:", e);
          }
          // reset form (will also reset via effect when dialog closed)
          setCode("");
          setName("");
          setNote("");
        },
        onError: (err: any) => {
          // Nếu hook đã có onError, đây là bổ sung để hiển thị lỗi nội bộ
          setLocalError(err?.message ?? "Lỗi khi tạo quyền");
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Thêm quyền</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {localError && <Alert severity="error">{localError}</Alert>}
          {createMutation.isError && (
            <Alert severity="error">{(createMutation.error as any)?.message ?? "Tạo thất bại"}</Alert>
          )}
          <TextField
            label="Mã (code)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            size="small"
            fullWidth
            autoFocus
          />
          <TextField
            label="Tên (name)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="Ghi chú (note)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            size="small"
            fullWidth
            multiline
            minRows={2}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={createMutation.isLoading}>
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={createMutation.isLoading}
          sx={{
            bgcolor: "lightsalmon",
            color: "white",
          }}
        >
          {createMutation.isLoading ? "Đang tạo..." : "Tạo"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRight;
