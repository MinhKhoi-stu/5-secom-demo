import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import UploadImage from "components/common/UploadImage";
import { productData } from "../../../data";
import { useRef, useState } from "react";
import { FormField } from "pages/User/components/FormField";

const AddSKUDesign = () => {
  const [value, setValue] = useState("");
  const [fileName, setFileName] = useState("hinhanh.png");
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    quantity: "",
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (file: File) => {
    console.log("Ảnh đã chọn:", file);
    // Xử lý upload file tại đây
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <Typography sx={{ color: "black", fontWeight: "bold", mb: 2 }}>
          THÊM SKU DESIGN
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {/* TÊN SKU */}
          <Grid item xs={12} sm={6}>
            <FormField
              label="Tên SKU"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* LOẠI SẢN PHẨM */}

            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
              <InputLabel id="type-label">Loại sản phẩm</InputLabel>
              <Select
                labelId="type-label"
                value={value}
                label="Loại sản phẩm"
                onChange={(e) => setValue(e.target.value)}
              >
                {productData.map((item, index) => (
                  <MenuItem key={index} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* HÌNH ẢNH ĐẠI DIỆN */}
          <Box
            sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
          >
            <Typography sx={{ color: "black", mt: 3 }}>
              Hình ảnh đại diện
            </Typography>
            <UploadImage onFileSelect={handleImageUpload} />
          </Box>

          {/* LINK FILE GỐC */}

          <FormField
            label="Link File gốc"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />

          {/* FULFILLMENT */}

          <FormControl fullWidth size="small" sx={{ mt: 2 }}>
            <InputLabel id="fulfill-label">Fulfillment tại</InputLabel>
            <Select
              labelId="fulfill-label"
              value={value}
              label="Fulfillment tại"
              onChange={(e) => setValue(e.target.value)}
            >
              <MenuItem value="vietnam">Tại Việt Nam</MenuItem>
              <MenuItem value="usa">Tại kho USA</MenuItem>
            </Select>
          </FormControl>

          {/* SỐ LƯỢNG */}

          <FormField
            label="Số lượng"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          {/* NGƯỜI LÀM */}

          <FormControl fullWidth size="small" sx={{ mt: 2 }}>
            <InputLabel id="maker-label">Người làm</InputLabel>
            <Select
              labelId="maker-label"
              value={value}
              label="Người làm"
              onChange={(e) => setValue(e.target.value)}
            >
              <MenuItem value="person1">Người 1</MenuItem>
              <MenuItem value="person2">Người 2</MenuItem>
              <MenuItem value="person3">Người 3</MenuItem>
            </Select>
          </FormControl>

          {/* NÚT THÊM */}

          <Box
            mt={3}
            display="flex"
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <button
              style={{
                backgroundColor: "rgba(232, 67, 12, 0.88)",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Thêm SKU Design
            </button>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default AddSKUDesign;
