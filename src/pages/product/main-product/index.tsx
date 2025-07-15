import {Box, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MainProduct = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/add-product');
    }
    return(
        <>
            <Typography
            sx={{
                display: 'flex',
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
                Đây là nội dung
            </Typography>

            {/* NÚT THÊM SẢN PHẨM */}
            <div style={{
                display: 'flex',
                marginTop: '300px'
            }}>
                <button
                style={{
                    backgroundColor: 'lightsalmon'
                }}
                onClick={handleClick}
                >
                    Thêm sản phẩm 
                </button>
            </div>
            </Box>
        </>
    )
}

export default MainProduct;