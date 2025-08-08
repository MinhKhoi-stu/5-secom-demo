import {
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
  Grid,
  DialogContent,
  Dialog,
  IconButton,
} from "@mui/material";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { useEffect, useState } from "react";
import AddProduct from "./CreateProduct";
import PaginationWrapper from "components/common/PaginationWrapper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { OptionDto } from "dto/option/option.dto";
import UpdateProduct from "./UpdateProduct";
import { useFindOptionGroupByCodeOrName } from "hooks/option-group/useFindOptionGroupByCodeOrName";
import CreateProduct from "./CreateProduct";

const MainProduct = () => {
  //MỞ DIALOG ADD PRODUCT
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OptionDto | null>(
    null
  );

  const handleOpenUpdate = (product: OptionDto) => {
    setSelectedProduct(product);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdate = () => {
    setSelectedProduct(null);
    setOpenUpdateDialog(false);
  };

  //PAGINATION
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const { data, isLoading, isError } = useFindOptionsByGroup(
    "products",
    page - 1,
    itemsPerPage
  );

  const totalItems = data?.totalElements ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  //FIND codeOrName
  // Tìm optionGroup có codeOrName = 'products'
  const { data: productOptionGroup } =
    useFindOptionGroupByCodeOrName("products");

  const handleSubmit = (formValues: any) => {
    if (!productOptionGroup) return;

    const payload = {
      ...formValues,
      optionGroup: { id: productOptionGroup.id },
    };

    // Gọi API tạo Option/Product
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            mb: 2,
            display: "flex",
            color: "black",
          }}
        >
          QUẢN LÝ SẢN PHẨM
        </Typography>

        <Box
          sx={{
            backgroundColor: "white",
            p: { xs: 2, sm: 3 },
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{
              display: "flex",
              color: "black",
              mb: 3,
              alignItems: "flex-start",
            }}
          >
            Sản phẩm hiện có
          </Typography>

          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Typography color="error">Lỗi khi tải sản phẩm</Typography>
          )}

          {data && (
            <>
              {/* <Grid container spacing={2}> */}
              <Grid container columnSpacing={12} rowSpacing={2}>
                {data.content.map((product) => (
                  <Grid
                    key={product.id}
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      flexBasis: { xs: "100%", sm: "40%" }, //để 50 là tràn đó ba
                      maxWidth: { xs: "100%", sm: "40%" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        padding: 2,
                        borderRadius: 2,
                        border: "1px solid #eee",
                        justifyContent: "space-between",
                      }}
                    >
                      <Avatar
                        src={product.image || ""}
                        alt={product.name}
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                      />
                      <Typography sx={{ color: "black", fontWeight: "500" }}>
                        {product.name}
                      </Typography>

                      {/* BÊN PHẢI: ICON HÀNH ĐỘNG */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          size="small"
                          color="primary"
                          sx={{
                            "&:focus": {
                              outline: "none",
                            },
                          }}
                          onClick={() => handleOpenUpdate(product)}
                        >
                          {/* <i className="fas fa-edit" /> */}
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          sx={{
                            "&:focus": {
                              outline: "none",
                            },
                          }}
                          onClick={() => {
                            /* handle delete */
                          }}
                        >
                          {/* <i className="fas fa-trash" /> */}
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {/* PAGINATION */}
          <PaginationWrapper
            page={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onChange={handlePageChange}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 5 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.5,
              boxShadow: 2,
              // "&:hover": { backgroundColor: "#ffa07a" },
            }}
            onClick={handleOpenDialog}
          >
            THÊM SẢN PHẨM
          </Button>
        </Box>
      </Box>

      {/* POPUP ADD PRODUCT */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        scroll="body"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 2,
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <DialogContent>
          <CreateProduct 
          onClose={handleCloseDialog} 
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openUpdateDialog}
        onClose={handleCloseUpdate}
        maxWidth="md"
        fullWidth
        scroll="body"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 2,
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        <DialogContent>
          <UpdateProduct
            open={openUpdateDialog}
            onClose={handleCloseUpdate}
            product={selectedProduct}
            mode={"update"}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MainProduct;
