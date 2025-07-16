import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AddSKUDesign = () => {
  const [value, setValue] = useState("");
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
        THÊM SKU DESIGN
      </Typography>

      {/* THÊM SẢN PHẨM*/}
      <Box
        sx={{
          width: "1180px",
          height: "flex",
          backgroundColor: "white",
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* THẺ INPUT TÊN SKU */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              color: "black",
              alignItems: "flex-start",
            }}
          >
            Tên SKU
          </Typography>

          <TextField
            type="text"
            id="addproduct"
            variant="outlined"
            size="small"
            sx={{
              width: "400px",
              marginTop: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* THẺ INPUT LOẠI SẢN PHẨM */}
        <div
          style={{
            width: "400px",
            marginTop: "20px",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            Loại sản phẩm
          </Typography>

          <FormControl
            size="small"
            sx={{
              marginTop: "20px",
              width: "400px",
            }}
          >
            <InputLabel id="combo-label">Chọn</InputLabel>
            <Select
              labelId="combo-label"
              value={value}
              label="Loại sản phẩm"
              onChange={(e) => setValue(e.target.value)}
            >
              <MenuItem value="shirt">SKU 1</MenuItem>
              <MenuItem value="patch">SKU 2</MenuItem>
              <MenuItem value="mug">SKU 3</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* HÌNH ẢNH DEMO */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              color: "black",
              alignItems: "flex-start",
            }}
          >
            Hình ảnh demo (1200px)
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Button
              sx={{
                color: "black",
                backgroundColor: "gray",
                marginTop: "30px",
                height: "40px",
              }}
            >
              Chọn tệp
            </Button>

            <TextField
              type="img"
              id="addproduct"
              variant="outlined"
              size="small"
              sx={{
                width: "315px",
                marginTop: "30px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        {/* LINK FILE GỐC */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              color: "black",
              alignItems: "flex-start",
            }}
          >
            Link File gốc
          </Typography>

          <TextField
            type="text"
            id="addproduct"
            variant="outlined"
            size="small"
            sx={{
              width: "400px",
              marginTop: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        </div>

        {/*FULFILLMENT TẠI*/}
        <div
          style={{
            width: "400px",
            marginTop: "20px",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            Fulfillment tại
          </Typography>

          <FormControl
            size="small"
            sx={{
              marginTop: "20px",
              width: "400px",
            }}
          >
            <InputLabel id="combo-label">Chọn</InputLabel>
            <Select
              labelId="combo-label"
              value={value}
              label="Loại sản phẩm"
              onChange={(e) => setValue(e.target.value)}
            >
              <MenuItem value="shirt">Tại 1</MenuItem>
              <MenuItem value="patch">Tại 2</MenuItem>
              <MenuItem value="mug">Tại 3</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* SỐ LƯỢNG */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              display: "flex",
              color: "black",
              alignItems: "flex-start",
            }}
          >
            Số lượng
          </Typography>

          <TextField
            type="text"
            id="addproduct"
            variant="outlined"
            size="small"
            sx={{
              width: "400px",
              marginTop: "20px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        </div>

        {/*NGƯỜI LÀM*/}
        <div
          style={{
            width: "400px",
            marginTop: "20px",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            Người làm
          </Typography>

          <FormControl
            size="small"
            sx={{
              marginTop: "20px",
              width: "400px",
            }}
          >
            <InputLabel id="combo-label">Chọn</InputLabel>
            <Select
              labelId="combo-label"
              value={value}
              label="Loại sản phẩm"
              onChange={(e) => setValue(e.target.value)}
            >
              <MenuItem value="shirt">Người 1</MenuItem>
              <MenuItem value="patch">Người 2</MenuItem>
              <MenuItem value="mug">Người 3</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* NÚT THÊM SẢN PHẨM */}
        <div
          style={{
            display: "flex",
            marginTop: "30px",
          }}
        >
          <button
            // onClick={handleClick}
            style={{
              backgroundColor: "rgba(232, 67, 12, 0.88)",
            }}
          >
            Thêm SKU Design
          </button>
        </div>
      </Box>
    </>
  );
};

export default AddSKUDesign;
