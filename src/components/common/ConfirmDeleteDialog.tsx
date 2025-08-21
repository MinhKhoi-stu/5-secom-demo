import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type ConfirmDeleteDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};

export default function ConfirmDeleteDialog({
  open,
  title = "Xác nhận xóa",
  description = "Bạn có chắc muốn xóa không?",
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button color="error" onClick={handleConfirm}>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
