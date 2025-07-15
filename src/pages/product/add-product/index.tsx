import { Box, Button, TextField, Typography } from "@mui/material";

const AddProduct = () => {
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
        QUẢN LÝ SẢN PHẨM
      </Typography>

      {/* THÊM SẢN PHẨM*/}
      <Box
        sx={{
          width: "1180px",
          height: "80vh",
          backgroundColor: "white",
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          // marginTop: 2,
        }}
      >
        {/* TITLE */}
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "black",
          }}
        >
          Thêm sản phẩm
        </Typography>

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
            display: "flex",
            marginTop: "20px",
          }}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            Hình ảnh (100px)
          </Typography>

          <div
            style={{
              display: "flex",
              marginLeft: "-130px",
            }}
          >
            {/* NÚT CHỌN HÌNH ẢNH */}
            <Button
              sx={{
                color: "black",
                backgroundColor: "gray",
                marginTop: "30px",
                height: "55px",
              }}
            >
              Chọn tệp
            </Button>

            <TextField
              type="img"
              id="addproduct"
              variant="outlined"
              sx={{
                width: "315px",
                // marginLeft: '-120px',
                marginTop: "30px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        {/* THẺ PHÂN LOẠI SIZE SẢN PHẨM */}
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
              marginBottom: "10px",
              alignItems: "flex-start",
            }}
          >
            Phân loại Size sản phẩm
          </Typography>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {/* INCHES */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />

            {/* WEIGHTS */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Weights
            </Typography>

            {/* LENGTH */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Length
            </Typography>

            {/* WIDTH */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Width
            </Typography>

            {/* HEIGHT */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Height
            </Typography>
          </div>
        </div>
        {/* THẺ PHÂN LOẠI SIZE SẢN PHẨM */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {/* INCHES */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />

            {/* WEIGHTS */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Weights
            </Typography>

            {/* LENGTH */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Length
            </Typography>

            {/* WIDTH */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Width
            </Typography>

            {/* HEIGHT */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Height
            </Typography>
          </div>
        </div>
        {/* THẺ PHÂN LOẠI SIZE SẢN PHẨM */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            {/* INCHES */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />

            {/* WEIGHTS */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Weights
            </Typography>

            {/* LENGTH */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Length
            </Typography>

            {/* WIDTH */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Width
            </Typography>

            {/* HEIGHT */}
            <TextField
              type="text"
              variant="outlined"
              sx={{
                width: "100px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            />
            <Typography
              sx={{
                marginTop: "15px",
                color: "black",
              }}
            >
              Height
            </Typography>
          </div>
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
          >
            Thêm sản phẩm
          </button>
        </div>
      </Box>
    </>
  );
};

export default AddProduct;
