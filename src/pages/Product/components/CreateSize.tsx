import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useCreateOption } from "hooks/option/useCreateOption";
import { OptionDto } from "dto/option/option.dto";

export default function AddSizeDialog({
  open,
  onClose,
  parentProduct,
}: {
  open: boolean;
  onClose: () => void;
  parentProduct?: OptionDto | null;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: createOption } = useCreateOption(
    "HTFOHI2F0V03UEHgOjf0xw==",
    0,
    50
  );

  // Danh sách size đang nhập
  const [sizes, setSizes] = useState([
    { code: "", name: "", att1: "", att2: "", att3: "", att4: "" },
  ]);

  useEffect(() => {
    if (open) {
      setSizes([
        { code: "", name: "", att1: "", att2: "", att3: "", att4: "" },
      ]);
    }
  }, [open]);

  const handleAddRow = () => {
    setSizes((prev) => [
      ...prev,
      { code: "", name: "", att1: "", att2: "", att3: "", att4: "" },
    ]);
  };

  const handleDeleteRow = (index: number) => {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: string) => {
    setSizes((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  // const handleSave = async () => {
  //   if (!parentProduct?.id) {
  //     toast.error("Không tìm thấy sản phẩm cha!");
  //     return;
  //   }

  //   try {
  //     for (const s of sizes) {
  //       if (!s.code || !s.name) {
  //         toast.error("Mã và Tên là bắt buộc!");
  //         return;
  //       }

  //       const payload = {
  //         code: s.code,
  //         name: s.name,
  //         att1: s.att1,
  //         att2: s.att2,
  //         att3: s.att3,
  //         att4: s.att4,
  //         optionGroup: { id: "HTFOHI2F0V03UEHgOjf0xw==" },
  //         parentOpt: { id: parentProduct.id },
  //       };

  //       console.log("Sending payload:", payload);
  //       await createOption(payload);
  //     }
  //     queryClient.invalidateQueries([
  //       "FIND_ALL_OPTION",
  //       // "HTFOHI2F0V03UEHgOjf0xw==",
  //       "state-test",
  //       0,
  //       50,
  //     ]);
  //     onClose();
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Lỗi khi thêm size!");
  //   }
  // };

  const handleSave = async () => {
    if (!parentProduct?.id) {
      toast.error("Không tìm thấy sản phẩm cha!");
      return;
    }

    // Kiểm tra nếu có bất kỳ size nào bị trống code hoặc name
    const hasInvalid = sizes.some((s) => !s.code.trim() || !s.name.trim());
    if (hasInvalid) {
      toast.error(
        "Vui lòng điền đầy đủ Mã và Tên hoặc xóa các size trống trước khi thêm!"
      );
      return;
    }

    try {
      for (const s of sizes) {
        const payload = {
          code: s.code.trim(),
          name: s.name.trim(),
          att1: s.att1,
          att2: s.att2,
          att3: s.att3,
          att4: s.att4,
          optionGroup: { id: "HTFOHI2F0V03UEHgOjf0xw==" },
          parentOpt: { id: parentProduct.id },
        };

        await createOption(payload);
      }

      // Sau khi thêm thành công thì load lại danh sách size
      await queryClient.invalidateQueries([
        "FIND_ALL_OPTION",
        "state-test",
        0,
        50,
      ]);

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thêm size!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thêm Size</DialogTitle>
      <DialogContent>
        {sizes.map((s, index) => (
          <Box
            key={index}
            sx={{ display: "flex", gap: 1, mb: 1, alignItems: "center" }}
          >
            <TextField
              label="Mã"
              value={s.code}
              onChange={(e) => handleChange(index, "code", e.target.value)}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="Tên"
              value={s.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              label="weight"
              value={s.att1}
              onChange={(e) => handleChange(index, "att1", e.target.value)}
              size="small"
              sx={{ flex: 0.7 }}
            />
            <TextField
              label="length"
              value={s.att2}
              onChange={(e) => handleChange(index, "att2", e.target.value)}
              size="small"
              sx={{ flex: 0.7 }}
            />
            <TextField
              label="wide"
              value={s.att3}
              onChange={(e) => handleChange(index, "att3", e.target.value)}
              size="small"
              sx={{ flex: 0.7 }}
            />
            <TextField
              label="height"
              value={s.att4}
              onChange={(e) => handleChange(index, "att4", e.target.value)}
              size="small"
              sx={{ flex: 0.7 }}
            />
            {sizes.length > 1 && (
              <IconButton onClick={() => handleDeleteRow(index)}>
                <Delete />
              </IconButton>
            )}
          </Box>
        ))}
        <Button
          startIcon={<Add />}
          onClick={handleAddRow}
          sx={{ mt: 1, color: "red" }}
        >
          Thêm
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Hủy
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: "red",
            "&:hover": { backgroundColor: "lightsalmon" },
          }}
        >
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
