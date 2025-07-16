import { Box, Typography, Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const productList = [
  { name: "Patches Thêu", img: "/logo.png" },
  { name: "Áo Thêu", img: "/logo.png" },
  { name: "Nón thêu", img: "/logo.png" },
  { name: "Lịch 2026", img: "/logo.png" },
  { name: "Led Mica", img: "/logo.png" },
  { name: "Gỗ Handmade", img: "/logo.png" },
];

const MainProduct = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add-product");
  };

  return (
    <>
      <Typography
        sx={{
          display: "flex",
          color: "black",
          fontWeight: "bold",
          fontSize: "20px",
          mb: 2,
        }}
      >
        QUẢN LÝ SẢN PHẨM
      </Typography>

      {/* BOC CHỨA SẢN PHẨM */}
      <Box
        sx={{
          width: 'flex',
          height: 'flex',
          // width: "1180px",
          backgroundColor: "white",
          padding: 3,
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ 
            display: 'flex',
            color: "black", 
            mb: 3,
            alignItems:'flex-start' 
          }}
        >
          Sản Phẩm hiện có
        </Typography>

        {/* DANH SÁCH SẢN PHẨM*/}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {productList.map((product, index) => (
            <Box
              key={index}
              sx={{
                width: "calc(50% - 8px)",
                display: "flex",
                alignItems: "center",
                gap: 2,
                color: "black",
              }}
            >
              <Avatar
                src={product.img}
                alt={product.name}
                variant="rounded"
                sx={{ width: 40, height: 40 }}
              />
              <Typography>{product.name}</Typography>
            </Box>
          ))}
        </Box>

        {/* NÚT THÊM SẢN PHẨM */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 5 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "lightsalmon",
              color: "black",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "10px",
              paddingX: 3,
              paddingY: 1.5,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                backgroundColor: "#ffa07a",
              },
            }}
            onClick={handleClick}
          >
            THÊM SẢN PHẨM
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default MainProduct;
