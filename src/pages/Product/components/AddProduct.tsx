import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import UploadImage from "components/common/UploadImage";
import { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { FormField } from "pages/User/components/FormField";
import { useFindOptionGroupByCodeOrName } from "hooks/option-group/useFindOptionGroupByCodeOrName";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { useCreateOption } from "hooks/option/useCreateOption";

const AddProduct = () => {
  const [fileName, setFileName] = useState("hinhanh.png");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  // const { data: productOptionGroup, isLoading } =
  //   useFindOptionGroupByCodeOrName("products");

  const { data: productOptionGroup, isLoading } =
    useFindOptionGroupByCodeOrName("products");
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleImageUpload = (file: File) => {
    console.log("Ảnh đã chọn:", file);
  };

  //THÊM NHÓM
  const [sizeGroups, setSizeGroups] = useState([{ sizeCode: "" }]);
  // THÊM
  const addSizeGroup = () => {
    setSizeGroups((prev) => [...prev, { sizeCode: "" }]);
  };

  //XÓA
  const removeSizeGroup = (index: number) => {
    setSizeGroups((prev) => prev.filter((_, i) => i !== index));
  };

  // SELECT
  const handleSizeChange = (value: string, index: number) => {
    setSizeGroups((prev) => {
      const newGroups = [...prev];
      newGroups[index].sizeCode = value;
      return newGroups;
    });
  };

  //BUTTON ADD
  // const handleAddProduct = () => {
  //   if (!productOptionGroup) return;

  //   const payload = {
  //     name: productName,
  //     code: productCode,
  //     optionGroup: { id: productOptionGroup.id },
  //     // thêm các trường khác (image, sizes...) nếu có
  //   };

  //   console.log("Payload gửi lên BE:", payload);
  //   // Gọi API tạo sản phẩm ở đây
  // };

  const { mutateAsync: createOption } = useCreateOption();
  const { data: stateTestOptionGroup } =
    useFindOptionGroupByCodeOrName("state-test");

  const handleAddProduct = async () => {
    try {
      if (!productOptionGroup || !stateTestOptionGroup) return;

      const productPayload = {
        name: productName,
        code: productCode,
        optionGroup: {
          id: productOptionGroup.id,
        },
      };

      const createdProduct = await createOption(productPayload);
      const parentOpt = {
        id: createdProduct.id,
        code: createdProduct.code,
        name: createdProduct.name,
        note: createdProduct.note,
        config: createdProduct.config,
        orderNo: createdProduct.orderNo,
      };

      for (const group of sizeGroups) {
        if (!group.sizeCode) continue;

        const sizePayload = {
          name: group.sizeCode,
          code: group.sizeCode,
          optionGroup: {
            id: stateTestOptionGroup.id,
          },
          parentOpt,
        };

        await createOption(sizePayload);
      }

      console.log("Đã tạo sản phẩm và các size thành công.");
      // TODO: Reset form hoặc hiện thông báo
    } catch (err) {
      console.error("Lỗi khi tạo sản phẩm:", err);
    }
  };

  //STATE-TEST

  const { data: stateTestOptions, isLoading: isStateTestLoading } =
    useFindOptionsByGroup("state-test", 0, 50);

  const [selectedOption, setSelectedOption] = useState("");

  return (
    <>
      {/* TITLE */}
      <Typography
        sx={{
          display: "flex",
          color: "black",
          fontWeight: "bold",
        }}
      >
        THÊM SẢN PHẨM
      </Typography>

      {/* THÊM SẢN PHẨM*/}
      <Box
        sx={{
          // width: "1180px",
          width: "flex",
          height: "flex",
          backgroundColor: "white",
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* THẺ INPUT TÊN SẢN PHẨM */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormField
            label="Tên sản phẩm"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          {/* INPUT MÃ SẢN PHẨM */}
          <FormField
            label="Mã sản phẩm"
            name="productCode"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>

        {/* THẺ INPUT HÌNH ẢNH SẢN PHẨM */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{ display: "flex", color: "black", alignItems: "flex-start" }}
          >
            Hình ảnh đại diện
          </Typography>

          {/* NÚT CHỌN TỆP */}
          <UploadImage onFileSelect={handleImageUpload} />
        </div>

        {/* SIZE OPTIONS */}
        {sizeGroups.map((groupIndex, idx) => (
          <Box
            // key={groupIndex}
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
            <FormControl
              size="small"
              sx={{
                width: 100,
                backgroundColor: "white",
                borderRadius: 1,
                mr: 2,
              }}
            >
              <InputLabel id="inches-select-label">Inches</InputLabel>
              <Select
                size="small"
                value={sizeGroups[idx].sizeCode}
                onChange={(e) => handleSizeChange(e.target.value, idx)}
                sx={{ width: 120, backgroundColor: "white", borderRadius: 1 }}
              >
                {stateTestOptions?.content?.map((option) => (
                  <MenuItem key={option.id} value={option.code}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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

        {/* NÚT THÊM SẢN PHẨM */}
        <div
          style={{
            display: "flex",
            marginTop: "30px",
          }}
        >
          <Button
            sx={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.5,
              boxShadow: 2,
              "&:hover": { backgroundColor: "#ffa07a" },
            }}
            onClick={handleAddProduct}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </Box>
    </>
  );
};

export default AddProduct;
