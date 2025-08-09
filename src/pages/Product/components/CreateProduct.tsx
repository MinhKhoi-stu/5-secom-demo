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
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { useCreateOption } from "hooks/option/useCreateOption";
import { CreateOptionDto } from "dto/option/create-option.dto";

const CreateProduct = ({ onClose }: { onClose?: () => void }) => {
  const [fileName, setFileName] = useState("hinhanh.png");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  // const { data: productOptionGroup, isLoading } =
  //   useFindOptionGroupByCodeOrName("products");

  const { data: productOption, isLoading } = useFindOptionsByGroup(
    "products",
    0,
    50
  );

  //UPLOAD ẢNH MÒ
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

  //THÊM NHÓM SIZE
  const [sizeGroups, setSizeGroups] = useState([{ sizeCode: "" }]);
  // ADD
  const addSizeGroup = () => {
    setSizeGroups((prev) => [...prev, { sizeCode: "" }]);
  };

  //DELETE
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
  const { mutateAsync: createOption } = useCreateOption(
    "5r2izQqBvjb6w6N59Lce4g==",
    0,
    50
  );
  const { data: stateTestOptionGroup } = useFindOptionsByGroup(
    "state-test",
    0,
    50
  );

  const createOptionMutation = useCreateOption(
    "5r2izQqBvjb6w6N59Lce4g==",
    0,
    50
  );
  const handleAddProduct = async () => {
    try {
      if (!productOption || !stateTestOptions) return;

      const optionGroupId = "5r2izQqBvjb6w6N59Lce4g==";

      const productPayload = {
        id: "",
        name: productName,
        code: productCode,
        optionGroup: {
          id: optionGroupId,
        },
        parentOpt: {
          id: productOption.id,
        },
        image: "",
        att1: "",
        att2: "",
        att3: "",
        att4: "",
        att5: "",
      };

      const createdProduct = await createOptionMutation.mutateAsync(
        productPayload
      );

      console.log(createdProduct);

      const parentOpt = {
        id: createdProduct!.id,
      };

      for (const group of sizeGroups) {
        if (!group.sizeCode) continue;

        const sizePayload: CreateOptionDto = {
          code: group.sizeCode,
          name: group.sizeCode,
          optionGroup: { id: optionGroupId },
          parentOpt,
        };

        await createOptionMutation.mutateAsync(sizePayload);
      }

      console.log("Thành công.");
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };

  //LOAD STATE-TEST

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

export default CreateProduct;
