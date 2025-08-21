// EditSize.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { OptionDto } from "dto/option/option.dto";
import { useUpdateOption } from "hooks/option/useUpdateOption";

interface EditSizeProps {
  open: boolean;
  onClose: () => void;
  sizeData: OptionDto | null; // size được chọn khi bấm edit
}

type FormState = {
  code: string;
  name: string;
  att1: string; // weight
  att2: string; // length
  att3: string; // wide
  att4: string; // height
};

const emptyForm: FormState = {
  code: "",
  name: "",
  att1: "",
  att2: "",
  att3: "",
  att4: "",
};

const mapFromSize = (s: OptionDto | null): FormState => ({
  code: s?.code ?? "",
  name: s?.name ?? "",
  att1: s?.att1 ?? "",
  att2: s?.att2 ?? "",
  att3: s?.att3 ?? "",
  att4: s?.att4 ?? "",
});

const EditSize: React.FC<EditSizeProps> = ({ open, onClose, sizeData }) => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [initial, setInitial] = useState<FormState>(emptyForm);

  const { mutateAsync: updateOption, isLoading } = useUpdateOption();

  // Mỗi lần mở dialog hoặc đổi size được chọn → load lại form & mốc so sánh
  useEffect(() => {
    if (open) {
      const next = mapFromSize(sizeData);
      setForm(next);
      setInitial(next);
    }
  }, [open, sizeData?.id]); // theo dõi id để tránh khởi tạo lại không cần thiết

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const isChanged = useMemo(() => {
    return (
      form.code !== initial.code ||
      form.name !== initial.name ||
      form.att1 !== initial.att1 ||
      form.att2 !== initial.att2 ||
      form.att3 !== initial.att3 ||
      form.att4 !== initial.att4
    );
  }, [form, initial]);

  const handleCancel = () => {
    // reset về dữ liệu gốc và đóng
    const reset = mapFromSize(sizeData);
    setForm(reset);
    setInitial(reset);
    onClose();
  };

  const handleSave = async () => {
    if (!sizeData || !isChanged) return;

    await updateOption({
      id: sizeData.id,
      version: sizeData.version ?? 0,
      code: form.code,
      name: form.name,
      att1: form.att1,
      att2: form.att2,
      att3: form.att3,
      att4: form.att4,
      note: sizeData.note,
      orderNo: sizeData.orderNo,
      optionGroup: { id: sizeData.optionGroup?.id ?? "" },
      parentOpt: sizeData.parentOpt ? { id: sizeData.parentOpt.id } : undefined,
      image: sizeData.image,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle>Chỉnh sửa Size</DialogTitle>
      <DialogContent>
        <Box
          sx={{ display: "flex", gap: 1, mb: 1, mt: 2, alignItems: "center" }}
        >
          <TextField
            label="Mã"
            value={form.code}
            onChange={handleChange("code")}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="Tên"
            value={form.name}
            onChange={handleChange("name")}
            size="small"
            sx={{ flex: 1 }}
          />
          <TextField
            label="weight"
            value={form.att1}
            onChange={handleChange("att1")}
            size="small"
            sx={{ flex: 0.7 }}
          />
          <TextField
            label="length"
            value={form.att2}
            onChange={handleChange("att2")}
            size="small"
            sx={{ flex: 0.7 }}
          />
          <TextField
            label="wide"
            value={form.att3}
            onChange={handleChange("att3")}
            size="small"
            sx={{ flex: 0.7 }}
          />
          <TextField
            label="height"
            value={form.att4}
            onChange={handleChange("att4")}
            size="small"
            sx={{ flex: 0.7 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="inherit" disabled={isLoading}>
          Hủy
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!isChanged || isLoading || !sizeData}
          sx={{
            backgroundColor: isChanged && !isLoading ? "red" : "grey",
            "&:hover": {
              backgroundColor: isChanged && !isLoading ? "lightsalmon" : "grey",
            },
          }}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSize;
