// import {
//   Box,
//   Button,
//   InputAdornment,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Paper,
//   Link,
// } from "@mui/material";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import { Popover } from "@mui/material";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AttachFile } from "@mui/icons-material";
// import { SKUDesignData } from "../../../data";
// import type { SKUDesign } from "../../../types/OrderTable";

// const orders: SKUDesign[] = SKUDesignData;

// const MainSKUDesign = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [previewImg] = useState<string>("");

//   const open = Boolean(anchorEl);
//   const navigate = useNavigate();
//   const handleClick = () => {
//     navigate("add-skudesign");
//   };

//   return (
//     <>
//       <TextField
//         type="text"
//         placeholder="Tìm kiếm SKU Design"
//         variant="outlined"
//         sx={{
//           width: "100%",
//           marginBottom: "20px",
//           marginTop: "30px",
//           backgroundColor: "white",
//           borderRadius: "10px",
//         }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <SearchOutlinedIcon sx={{ color: "#888" }} />
//             </InputAdornment>
//           ),
//         }}
//       />

//       <Box
//         sx={{
//           backgroundColor: "white",
//           padding: 3,
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//           textAlign: "left",
//         }}
//       >
//         <Typography color="black" variant="h6" fontWeight="bold" gutterBottom>
//           SKU Design
//         </Typography>

//         <TableContainer component={Paper} elevation={0}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
//                 <TableCell>SKU</TableCell>
//                 <TableCell>Hình Ảnh</TableCell>
//                 <TableCell>Loại SP</TableCell>
//                 <TableCell>File gốc</TableCell>
//                 <TableCell>Fulfillment</TableCell>
//                 <TableCell>Số lượng</TableCell>
//                 {/* <TableCell>Người Làm</TableCell> */}
//                 <TableCell>Tùy chỉnh</TableCell>
//                 {/* <TableCell>Mã</TableCell>
//                 <TableCell>Tên</TableCell>
//                 <TableCell>Hình ảnh</TableCell>
//                 <TableCell>Sản phẩm</TableCell>
//                 <TableCell>Kho</TableCell>
//                 <TableCell>Số lượng</TableCell>
//                 <TableCell>Tùy chỉnh</TableCell> */}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {orders.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{row.sku}</TableCell>
//                   <TableCell sx={{ position: "relative" }}>
//                     <Box
//                       sx={{
//                         position: "relative",
//                         display: "inline-block",
//                         "&:hover .zoom-preview": {
//                           display: "block",
//                         },
//                       }}
//                     >
//                       {/* Ảnh nhỏ */}
//                       <img
//                         src={row.img}
//                         alt="sku"
//                         style={{ width: 40, height: 40, cursor: "zoom-in" }}
//                       />

//                       {/* Ảnh phóng to */}
//                       <Box
//                         className="zoom-preview"
//                         sx={{
//                           display: "none",
//                           position: "absolute",
//                           top: "-50px",
//                           left: "50px",
//                           zIndex: 10,
//                           width: "200px",
//                           backgroundColor: "#fff",
//                           border: "2px solid #f44336",
//                           borderRadius: "8px",
//                           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//                           padding: "4px",
//                         }}
//                       >
//                         <img
//                           src={row.img}
//                           alt="preview"
//                           style={{
//                             width: "100%",
//                             height: "auto",
//                             display: "block",
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                   </TableCell>

//                   <TableCell>{row.type}</TableCell>

//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <Link
//                         href={row.fileUrl}
//                         target="_blank"
//                         underline="hover"
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 1,
//                           color: "black",
//                           fontWeight: 500,
//                           transition: "all 0.2s ease-in-out",
//                           "&:hover": {
//                             color: "red",
//                             transform: "translateY(-1px)",
//                             textDecoration: "underline",
//                           },
//                           cursor: "pointer",
//                         }}
//                       >
//                         {row.file}
//                         <AttachFile fontSize="small" />
//                       </Link>
//                     </Box>
//                   </TableCell>
//                   <TableCell>{row.fulfillment}</TableCell>
//                   <TableCell>{row.quantity}</TableCell>
//                   <TableCell>{row.worker}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Popover
//           open={open}
//           anchorEl={anchorEl}
//           onClose={() => setAnchorEl(null)}
//           anchorOrigin={{
//             vertical: "center",
//             horizontal: "right",
//           }}
//           transformOrigin={{
//             vertical: "center",
//             horizontal: "left",
//           }}
//           disableRestoreFocus
//           PaperProps={{
//             sx: {
//               padding: 1,
//               borderRadius: 2,
//             },
//           }}
//         >
//           <img
//             src={previewImg}
//             alt="preview"
//             style={{ width: 200, height: "auto" }}
//           />
//         </Popover>
//       </Box>

//       {/* Thêm SKU Button */}
//       <Box display="flex" justifyContent="flex-start" mt={3}>
//         <Button
//           onClick={handleClick}
//           variant="contained"
//           sx={{
//             backgroundColor: "#333",
//             borderRadius: "8px",
//             paddingX: 3,
//             paddingY: 1,
//             fontWeight: "bold",
//             ":hover": {
//               backgroundColor: "#555",
//             },
//           }}
//         >
//           THÊM SKU DESIGN
//         </Button>
//       </Box>
//     </>
//   );
// };

// export default MainSKUDesign;

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
  Popover,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFindOptionGroup } from "hooks/option-group/useFindAllOptionGroup";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";

const MainSKUDesign = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [previewImg, setPreviewImg] = useState<string>("");
  const navigate = useNavigate();

  // Ví dụ: nhóm optionGroupCode = "sku-design"
  const optionGroupCode = "skudesigns";
  const page = 0;
  const size = 50;

  // Gọi API lấy option group (nếu cần dynamic groupCode)
  const { data: optionGroups } = useFindOptionGroup();

  // Gọi API lấy danh sách option theo groupCode
  const { data, isLoading } = useFindOptionsByGroup(
    optionGroupCode,
    page,
    size
  );
  const options = data?.content || [];

  const handleClickAdd = () => {
    navigate("add-skudesign");
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    img: string
  ) => {
    setAnchorEl(event.currentTarget);
    setPreviewImg(img);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPreviewImg("");
  };

  const open = Boolean(anchorEl);

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
          textAlign: "left",
        }}
      >
        <Typography color="black" variant="h6" fontWeight="bold" gutterBottom>
          SKU Design
        </Typography>

        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
                <TableCell>SKU</TableCell>
                <TableCell>Hình Ảnh</TableCell>
                <TableCell>Loại SP</TableCell>
                <TableCell>File gốc</TableCell>
                <TableCell>Fulfillment</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Tùy chỉnh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7}>Đang tải...</TableCell>
                </TableRow>
              ) : (
                options.map((row) => (
                  <TableRow key={row.id}>
                    {/* SKU */}
                    <TableCell>{row.code}</TableCell>

                    {/* Hình ảnh + Hover phóng to */}
                    <TableCell sx={{ position: "relative" }}>
                      {row.image ? (
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-block",
                            "&:hover .zoom-preview": {
                              display: "block",
                            },
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.code}
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
                              src={row.image}
                              alt="preview"
                              style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                              }}
                            />
                          </Box>
                        </Box>
                      ) : (
                        "-"
                      )}
                    </TableCell>

                    {/* Loại SP */}
                    <TableCell>{row.parentOpt?.name || "-"}</TableCell>

                    {/* File gốc */}
                    <TableCell>-</TableCell>

                    {/* Fulfillment */}
                    <TableCell>{row.att4 || "-"}</TableCell>

                    {/* Số lượng */}
                    <TableCell>{row.att2 || "-"}</TableCell>

                    {/* Tùy chỉnh */}
                    <TableCell>-</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
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
          {previewImg && (
            <img
              src={previewImg}
              alt="preview"
              style={{ width: 200, height: "auto" }}
            />
          )}
        </Popover>
      </Box>

      {/* Thêm SKU Button */}
      <Box display="flex" justifyContent="flex-start" mt={3}>
        <Button
          onClick={handleClickAdd}
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
