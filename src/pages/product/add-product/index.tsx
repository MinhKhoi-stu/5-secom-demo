import { Box, Button, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";

const AddProduct = () => {
  const [fileName, setFileName] = useState("hinhanh.png"); // ban đầu
  const inputRef = useRef<HTMLInputElement | null>(null);

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
          }}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            Tên sản phẩm
          </Typography>

          <TextField
            type="text"
            id="addproduct"
            variant="outlined"
            size="small"
            sx={{
              width: "400px",
              marginLeft: "-100px",
              marginTop: "30px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
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

          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {/* NÚT CHỌN TỆP */}
            <Button
              onClick={handleButtonClick}
              sx={{
                color: "black",
                backgroundColor: "gray",
                marginTop: "30px",
                height: "40px",
              }}
            >
              Chọn tệp
            </Button>

            {/* Input ẩn để chọn file */}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={inputRef}
              onChange={handleFileChange}
            />

            {/* FILE ĐÃ CHỌN */}
            <TextField
              value={fileName}
              variant="outlined"
              size="small"
              sx={{
                width: "315px",
                marginTop: "30px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </div>

        {/* THẺ PHÂN LOẠI SIZE SẢN PHẨM */}
        {/* Lặp lại 3 lần */}
        {[1, 2, 3].map((groupIndex) => (
          <Box
            key={groupIndex}
            sx={{
              mt: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            {/* Field: Inches (không có nhãn) */}
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

            {/* Các field có nhãn bên phải */}
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
          </Box>
        ))}

        {/* NÚT THÊM SẢN PHẨM */}
        <div
          style={{
            display: "flex",
            marginTop: "30px",
          }}
        >
          <button
          // onClick={handleClick}
          >
            Thêm sản phẩm
          </button>
        </div>
      </Box>
    </>
  );
};

export default AddProduct;
