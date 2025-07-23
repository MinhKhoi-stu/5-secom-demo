import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";
import UploadImage from "components/common/UploadImage";
import {useNavigate} from "react-router-dom";

interface Props {
  fileName: string;
  setFileName: (name: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
  handleButtonAdd: () => void;
}

const AddOrderDetails = (
//   {
//   fileName,
//   setFileName,
//   inputRef,
//   handleFileChange,
//   handleButtonClick,
//   handleButtonAdd,
// }: Props
) => {
  const [customOption, setCustomOption] = useState("");
  const [value, setValue] = useState("");

  const handleImageUpload = (file: File) => {
    console.log("Ảnh đã chọn:", file);
  };

  const navigate = useNavigate();
  const handleAdd = () => {
    navigate("/Page2D");
  };

  return (
    <Box mt={4} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography color="black" fontWeight="bold">
        THÔNG TIN ĐƠN HÀNG
      </Typography>

      <TextField placeholder="Nhập thông tin đơn hàng" fullWidth multiline rows={3} />

      {/* Các nút radio*/}
      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl>
          <RadioGroup
            row
            value={customOption}
            onChange={(e) => setCustomOption(e.target.value)}
            sx={{
                color: "black",
            }}
          >
            <FormControlLabel value="none" control={<Radio size="small" />} label="Không Custom" />
            <FormControlLabel value="text" control={<Radio size="small" />} label="Custom Text" />
            <FormControlLabel value="logo" control={<Radio size="small" />} label="Custom Logo" />
            <FormControlLabel value="image" control={<Radio size="small" />} label="Custom hình ảnh" />
          </RadioGroup>

          {/* Upload hình */}
          <UploadImage onFileSelect={handleImageUpload}/>

        </FormControl>
      </Box>

      {/* Chọn thiết kế */}
      <FormControl size="small" fullWidth>
        <InputLabel id="combo-label">Yêu cầu thiết kế cho đơn hàng</InputLabel>
        <Select
          labelId="combo-label"
          value={value}
          label="Loại sản phẩm"
          onChange={(e) => setValue(e.target.value)}
        >
          <MenuItem value="">Này nọ</MenuItem>
          <MenuItem value="">Nọ kia</MenuItem>
          <MenuItem value="">Đây đó</MenuItem>
        </Select>
      </FormControl>

      {/* Nhập SKU khác */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField placeholder="Nhập SKU Design khác" size="small" />
        <FormControl size="small" sx={{ width: "120px" }}>
          <Select value="1">
            <MenuItem value="">1</MenuItem>
            <MenuItem value="">2</MenuItem>
            <MenuItem value="">4</MenuItem>
          </Select>
        </FormControl>

        <Button sx={{ color: "black", border: "2px solid rgba(0, 0, 0, 0.1)", borderRadius: "5px" }}>
          Check
        </Button>
        <Button sx={{ backgroundColor: "#f5f5f5", color: "red", fontWeight: "bold" }}>+</Button>
        <IconButton sx={{ color: "red", backgroundColor: "#f5f5f5" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <TextField
        size="small"
        placeholder="Giá trị đơn hàng"
        fullWidth
        InputProps={{ endAdornment: <Typography sx={{ ml: 1 }}>$</Typography> }}
      />

      <Button
        // onClick={handleButtonAdd}
        onClick={handleAdd}
        sx={{
          width: "50%",
          backgroundColor: "orangered",
          color: "white",
          ":hover": { backgroundColor: "tomato" },
        }}
      >
        THÊM ĐƠN HÀNG
      </Button>
    </Box>
  );
};

export default AddOrderDetails;
