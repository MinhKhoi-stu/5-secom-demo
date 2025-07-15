import {Box, Typography} from "@mui/material";

const MainProduct = () => {
    return(
        <>
            <Typography
            sx={{
                color: 'black',
                fontWeight: 'bold'
            }}>
                QUẢN LÝ SẢN PHẨM
            </Typography>

            {/* SẢN PHẨM HIỆN CÓ*/}
            <Box
            sx={{
                width: '1180px',
                height: '60vh',
                backgroundColor: "white",
                padding: 3,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                // marginTop: 2,
            }}
            >
            <Typography 
            variant="h5" 
            fontWeight="bold" 
            gutterBottom
            sx={{
                color: 'black',
            }}>
                Sản phẩm hiện có
            </Typography>
            <Typography 
            sx={{
                color: 'black'
            }}>
                Đây là nội dung của trang admin. Có thể thêm bảng, biểu đồ, v.v.
            </Typography>
            </Box>
        </>
    )
}

export default MainProduct;