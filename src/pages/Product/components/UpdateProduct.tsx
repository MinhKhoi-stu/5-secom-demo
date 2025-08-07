import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import UploadImage from "components/common/UploadImage";
import { OptionDto } from "dto/option/option.dto";
import { useRef, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface UpdateProductProps {
  mode: "create" | "update";
  product?: OptionDto | null;
  open: boolean;
  onClose: () => void;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({
  mode,
  product,
  open,
  onClose,
}) => {
  const [fileName, setFileName] = useState("hinhanh.png");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");

  useEffect(() => {
    if (mode === "update" && product) {
      setProductName(product.name || "");
      setProductCode(product.code || "");
      setFileName(product.image || "hinhanh.png");
    } else {
      setProductName("");
      setProductCode("");
      setFileName("hinhanh.png");
    }
  }, [mode, product, open]);

  const handleImageUpload = (file: File) => {
    console.log("Ảnh đã chọn:", file);
  };

  //THÊM NHÓM
  const [sizeGroups, setSizeGroups] = useState<number[]>([1]); // ban đầu 1 nhóm

  const addSizeGroup = () => {
    setSizeGroups((prev) => [...prev, prev.length + 1]);
  };

  const removeSizeGroup = (index: number) => {
    setSizeGroups((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* TITLE */}
      <Typography
        sx={{
          display: "flex",
          color: "black",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {mode === "update" ? "SỬA SẢN PHẨM" : "THÊM SẢN PHẨM"}
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* INPUT TÊN SẢN PHẨM */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Typography sx={{ color: "black", mr: 2 }}>Tên sản phẩm</Typography>
          <TextField
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            size="small"
            sx={{
              width: "400px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        </Box>

        <Box
          sx={{
            mb: 3,
          }}
        >
          <Typography sx={{ color: "black", mr: 2 }}>Mã sản phẩm</Typography>
          <TextField
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            type="text"
            size="small"
            sx={{
              width: "400px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        </Box>

        {/* INPUT HÌNH ẢNH */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: "black", mb: 1 }}>
            Hình ảnh đại diện
          </Typography>
          <UploadImage onFileSelect={handleImageUpload} />
        </Box>

        {/* SIZE OPTIONS */}
        {sizeGroups.map((groupIndex, idx) => (
          <Box
            key={groupIndex}
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            {/* Field: Inches */}
            <TextField
              type="text"
              placeholder="Inches"
              size="small"
              sx={{
                width: 100,
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />

            {/* Các field: Weight, Length, Width, Height */}
            {["Weight", "Length", "Width", "Height"].map((label) => (
              <Box
                key={label}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <TextField
                  type="text"
                  size="small"
                  sx={{
                    width: 100,
                    backgroundColor: "white",
                    borderRadius: 1,
                  }}
                />
                <Typography sx={{ color: "black", whiteSpace: "nowrap" }}>
                  {label}
                </Typography>
              </Box>
            ))}

            {/* Nút hành động bên phải */}
            <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                color="error"
                onClick={() => removeSizeGroup(idx)}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              {idx === sizeGroups.length - 1 && (
                <IconButton size="small" color="primary" onClick={addSizeGroup}>
                  <AddIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>
        ))}

        {/* BUTTON LƯU */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <button>Lưu</button>
        </Box>
      </Box>
    </>
  );
};

export default UpdateProduct;
