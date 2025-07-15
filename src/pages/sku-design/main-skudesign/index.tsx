import {
  Box,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Pagination,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { Popover } from "@mui/material";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const mockData = [
  {
    sku: "PAT-D020824-1-4",
    img: "/logo.png",
    type: "Áo thêu",
    file: "Link File",
    fulfillment: "Sản xuất tại VN",
    quantity: "1 tỷ",
    worker: "Hồng Nhung",
  },
  {
    sku: "PAT-D020924-1-4",
    img: "/react.svg",
    type: "Patches",
    file: "Link File",
    fulfillment: "Kho USA",
    quantity: "50",
    worker: "Thùy Vân",
  },
  {
    sku: "PAT-D020824-1-4",
    img: "/logo.png",
    type: "Áo thêu",
    file: "Link File",
    fulfillment: "Sản xuất tại VN",
    quantity: "1 tỷ",
    worker: "Hồng Nhung",
  },
  {
    sku: "PAT-D020924-1-4",
    img: "/react.svg",
    type: "Patches",
    file: "Link File",
    fulfillment: "Kho USA",
    quantity: "50",
    worker: "Thùy Vân",
  },
  {
    sku: "PAT-D020824-1-4",
    img: "/logo.png",
    type: "Áo thêu",
    file: "Link File",
    fulfillment: "Sản xuất tại VN",
    quantity: "1 tỷ",
    worker: "Hồng Nhung",
  },
  {
    sku: "PAT-D020924-1-4",
    img: "/react.svg",
    type: "Patches",
    file: "Link File",
    fulfillment: "Kho USA",
    quantity: "50",
    worker: "Thùy Vân",
  },
];

const MainSKUDesign = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [previewImg] = useState<string>("");

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-skudesign");
  };
  return (
    <>
      <TextField
        type="text"
        placeholder="Tìm kiếm SKU Design"
        variant="outlined"
        sx={{
          width: "100%",
          marginBottom: "20px",
          marginTop: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchOutlinedIcon sx={{ color: "#888" }} />
            </InputAdornment>
          ),
        }}
      />

      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          SKU Design
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell>Hình Ảnh</TableCell>
                <TableCell>Loại SP</TableCell>
                <TableCell>File gốc</TableCell>
                <TableCell>Fulfillment</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Người Làm</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.sku}</TableCell>
                  <TableCell sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "relative",
                        display: "inline-block",
                        "&:hover .zoom-preview": {
                          display: "block",
                        },
                      }}
                    >
                      {/* Ảnh nhỏ */}
                      <img
                        src={row.img}
                        alt="sku"
                        style={{ width: 40, height: 40, cursor: "zoom-in" }}
                      />

                      {/* Ảnh phóng to */}
                      <Box
                        className="zoom-preview"
                        sx={{
                          display: "none",
                          position: "absolute",
                          top: "-50px",
                          left: "50px",
                          zIndex: 10,
                          width: "200px",
                          backgroundColor: "#fff",
                          border: "2px solid #f44336",
                          borderRadius: "8px",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          padding: "4px",
                        }}
                      >
                        <img
                          src={row.img}
                          alt="preview"
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                          }}
                        />
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <InsertDriveFileOutlinedIcon />
                    {` ${row.file}`}
                  </TableCell>
                  <TableCell>{row.fulfillment}</TableCell>
                  <TableCell>{row.quantity}</TableCell>
                  <TableCell>{row.worker}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          disableRestoreFocus
          PaperProps={{
            sx: {
              padding: 1,
              borderRadius: 2,
            },
          }}
        >
          <img
            src={previewImg}
            alt="preview"
            style={{ width: 200, height: "auto" }}
          />
        </Popover>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 2,
          }}
        >
          <Typography variant="body2">Showing 1 to 3 of 6 entries</Typography>
          <Pagination count={3} page={1} variant="outlined" shape="rounded" />
        </Box>
      </Box>

      {/* Thêm SKU Button */}
      <Box display="flex" justifyContent="flex-start" mt={3}>
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            backgroundColor: "#333",
            borderRadius: "8px",
            paddingX: 3,
            paddingY: 1,
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "#555",
            },
          }}
        >
          THÊM SKU DESIGN
        </Button>
      </Box>
    </>
  );
};

export default MainSKUDesign;
