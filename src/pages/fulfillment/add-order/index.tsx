import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import OriginLabel from "../../../components/OriginLabel";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddOrderDetails from "../component/AddOrder/AddOrderDetails";

const AddOrder = () => {
  const [fileName, setFileName] = useState("hinhanh.png");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState("");
  const [showStepTwo, setShowStepTwo] = useState(false);
  const [customOption, setCustomOption] = useState("");

  const handleButtonClick = () => {
    inputRef.current?.click(); // trigger input ẩn
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name); // lưu tên file để hiển thị
      // Sau này upload file
    }
  };

  const navigate = useNavigate();
  const handleButtonAdd = () => {
    navigate("/2D");
  };
  return (
    <>
      {/* TIÊU ĐỀ */}
      <Typography
        sx={{
          display: "flex",
          color: "black",
          fontWeight: "bold",
          fontSize: "20px",
          mb: 2,
        }}
      >
        THÊM ORDER MỚI
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
        }}
      >
        {/* TRÁI */}
        <Box
          sx={{
            //   width: "1180px",
            width: "flex",
            height: "30vh",
            backgroundColor: "white",
            padding: 3,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/*CHỌN SHOP SELECT*/}
          <div
            style={{
              width: "400px",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <FormControl
              size="small"
              sx={{
                width: "400px",
              }}
            >
              <InputLabel id="combo-label">Chọn Shop</InputLabel>
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
          </div>

          {/* SKU DESIGN SAU NÀY LẤY TỪ DATABASE */}
          <TextField placeholder="SKU Fulfill" size="small" fullWidth />
          {/* BẤM KẾ TIẾP LÒI RA / CHƯA LÀM ĐƯỢC */}
          {/* NHẬP ORDER ID */}
          <TextField placeholder="Nhập Order ID" size="small" fullWidth />

          {/*CHECK BOX ƯU TIÊN ĐƠN */}
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography
                sx={{ fontSize: 16, fontWeight: "bold", color: "black" }}
              >
                Ưu tiên làm đơn này
              </Typography>
            }
          />
        </Box>

        {/* PHẢI */}
        <Box
          sx={{
            //   width: "1180px",
            width: "flex",
            height: "flex",
            backgroundColor: "white",
            padding: 3,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* THẺ BỌC NHẬP + SỐ LƯỢNG + CHECK BUTTON */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            {/* INPUT SKU DESIGN */}
            <TextField placeholder="Nhập SKU Design" size="small" sx={{}} />
            {/* SELECT SỐ LƯỢNG */}
            <FormControl
              size="small"
              sx={{
                width: "200px",
              }}
            >
              <InputLabel id="combo-label">Số lượng</InputLabel>
              <Select
                labelId="combo-label"
                value={value}
                label="Loại sản phẩm"
                onChange={(e) => setValue(e.target.value)}
              >
                <MenuItem value="">1</MenuItem>
                <MenuItem value="">2</MenuItem>
                <MenuItem value="">4</MenuItem>
              </Select>
            </FormControl>

            {/* BUTTON CHECK */}
            <div
              style={{
                backgroundColor: "transparent",
                border: "2px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
              }}
            >
              <Button
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#ffa07a",
                  },
                }}
              >
                Check
              </Button>
            </div>
          </div>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 2 }}>
            <Link
              target="_blank"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "black",
                fontWeight: 500,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  color: "red",
                  transform: "translateY(-1px)",
                  textDecoration: "underline",
                },
                cursor: "pointer",
              }}
            >
              <OriginLabel
                label="Hàng sản xuất tại Việt Nam"
                icon="/img/flag/VietNamflag.jpg"
              />
            </Link>
          </Box>
          <Divider sx={{ backgroundColor: "#ccc", my: 1 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                color: "black",
                fontWeight: "bold",
              }}
            >
              THÔNG TIN SHIP HÀNG
            </Typography>

            <TextField placeholder="Name" size="small" />

            <TextField
              placeholder="Address"
              size="medium"
              sx={{
                "& .MuiInputBase-input": {
                  height: "60px",
                },
              }}
            />

            <TextField placeholder="Phone" size="small" />

            <div>
              <Button
                sx={{
                  width: "200px",
                  backgroundColor: "red",
                  color: "white",
                  ":hover": {
                    backgroundColor: "lightsalmon",
                  },
                }}
                onClick={() => setShowStepTwo(true)}
              >
                KẾ TIẾP
              </Button>
            </div>

            {/* PHẦN BỔ SUNG */}
            {showStepTwo && (
              // <Box
              //   mt={4}
              //   sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              // >
              //   <Typography color="black" fontWeight="bold">
              //     THÔNG TIN ĐƠN HÀNG
              //   </Typography>

              //   <TextField
              //     placeholder="Nhập thông tin đơn hàng"
              //     fullWidth
              //     multiline
              //     rows={3}
              //   />

              //   {/* Các nút radio*/}
              //   <Box sx={{ display: "flex", gap: 2 }}>
              //     <FormControl>
              //       <RadioGroup
              //         row
              //         value={customOption}
              //         onChange={(e) => setCustomOption(e.target.value)}
              //       >
              //         <FormControlLabel
              //           value="none"
              //           control={<Radio size="small" />}
              //           label={
              //             <Typography sx={{ fontSize: 12, color: "black" }}>
              //               Không Custom
              //             </Typography>
              //           }
              //         />
              //         <FormControlLabel
              //           value="text"
              //           control={<Radio size="small" />}
              //           label={
              //             <Typography sx={{ fontSize: 12, color: "black" }}>
              //               Custom Text
              //             </Typography>
              //           }
              //         />
              //         <FormControlLabel
              //           value="logo"
              //           control={<Radio size="small" />}
              //           label={
              //             <Typography sx={{ fontSize: 12, color: "black" }}>
              //               Custom Logo
              //             </Typography>
              //           }
              //         />
              //         <FormControlLabel
              //           value="image"
              //           control={<Radio size="small" />}
              //           label={
              //             <Typography sx={{ fontSize: 12, color: "black" }}>
              //               Custom hình ảnh
              //             </Typography>
              //           }
              //         />
              //       </RadioGroup>
              //       {/* THẺ INPUT HÌNH ẢNH SẢN PHẨM */}
              //       <div
              //         style={{
              //           marginTop: "20px",
              //           display: "flex",
              //           flexDirection: "column",
              //         }}
              //       >
              //         <div
              //           style={{ display: "flex", alignItems: "flex-start" }}
              //         >
              //           {/* NÚT CHỌN TỆP */}
              //           <Button
              //             onClick={handleButtonClick}
              //             sx={{
              //               color: "white",
              //               backgroundColor: "gray",
              //               // marginTop: "30px",
              //               height: "40x",
              //             }}
              //           >
              //             Chọn tệp
              //           </Button>

              //           {/* Input ẩn để chọn file */}
              //           <input
              //             type="file"
              //             accept="image/*"
              //             style={{ display: "none" }}
              //             ref={inputRef}
              //             onChange={handleFileChange}
              //           />

              //           {/* FILE ĐÃ CHỌN */}
              //           <TextField
              //             value={fileName}
              //             variant="outlined"
              //             size="small"
              //             sx={{
              //               width: "512px",
              //               backgroundColor: "white",
              //             }}
              //             InputProps={{
              //               readOnly: true,
              //             }}
              //           />
              //         </div>
              //       </div>
              //     </FormControl>
              //   </Box>

              //   {/* YÊU CẦU THIẾT KẾ CHO ĐƠN HÀNG */}
              //   <FormControl
              //     size="small"
              //     fullWidth
              //     // sx={{
              //     //   width: "523px",
              //     // }}
              //   >
              //     <InputLabel id="combo-label">
              //       Yêu cầu thiết kế cho đơn hàng
              //     </InputLabel>
              //     <Select
              //       labelId="combo-label"
              //       value={value}
              //       label="Loại sản phẩm"
              //       onChange={(e) => setValue(e.target.value)}
              //     >
              //       <MenuItem value="">Này nọ</MenuItem>
              //       <MenuItem value="">Nọ kia</MenuItem>
              //       <MenuItem value="">Đây đó</MenuItem>
              //     </Select>
              //   </FormControl>

              //   {/* Thêm SKU khác */}
              //   <Box sx={{ display: "flex", gap: 2 }}>
              //     <TextField placeholder="Nhập SKU Design khác" size="small" />
              //     <FormControl size="small" sx={{ width: "120px" }}>
              //       {/* SỐ LƯỢNG */}
              //       <Select value="1">
              //         <MenuItem value="">1</MenuItem>
              //         <MenuItem value="">2</MenuItem>
              //         <MenuItem value="">4</MenuItem>
              //       </Select>
              //     </FormControl>

              //     {/* BUTTON CHECK */}
              //     <div
              //       style={{
              //         backgroundColor: "transparent",
              //         border: "2px solid rgba(0, 0, 0, 0.1)",
              //         borderRadius: "5px",
              //       }}
              //     >
              //       <Button
              //         sx={{
              //           color: "black",
              //           "&:hover": {
              //             backgroundColor: "#ffa07a",
              //           },
              //         }}
              //       >
              //         Check
              //       </Button>
              //     </div>
              //     <Button
              //       sx={{
              //         backgroundColor: "#f5f5f5",
              //         color: "red",
              //         fontWeight: "bold",
              //         fontSize: "15px",
              //         "&:hover": {
              //           backgroundColor: "#e0e0e0",
              //         },
              //       }}
              //       // variant="outlined"
              //     >
              //       +
              //     </Button>

              //     <IconButton
              //       onClick={() => {}}
              //       sx={{
              //         color: "red",
              //         width: 32,
              //         height: 32,
              //         borderRadius: "50%",
              //         backgroundColor: "#f5f5f5",
              //         "&:hover": {
              //           backgroundColor: "#e0e0e0",
              //         },
              //       }}
              //     >
              //       <CloseIcon fontSize="small" />
              //     </IconButton>
              //   </Box>

              //   <TextField
              //     size="small"
              //     placeholder="Giá trị đơn hàng"
              //     fullWidth
              //     InputProps={{
              //       endAdornment: <Typography sx={{ ml: 1 }}>$</Typography>,
              //     }}
              //   />
              //   <Button
              //     onClick={handleButtonAdd}
              //     sx={{
              //       width: "50%",
              //       backgroundColor: "orangered",
              //       color: "white",
              //       ":hover": { backgroundColor: "tomato" },
              //     }}
              //   >
              //     THÊM ĐƠN HÀNG
              //   </Button>
              // </Box>
              <AddOrderDetails
                fileName={fileName}
                setFileName={setFileName}
                inputRef={inputRef}
                handleFileChange={handleFileChange}
                handleButtonClick={handleButtonClick}
                handleButtonAdd={handleButtonAdd}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddOrder;
