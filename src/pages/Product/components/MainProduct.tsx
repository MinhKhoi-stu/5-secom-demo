import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Grid,
  DialogContent,
  Dialog,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { useEffect, useState } from "react";
import PaginationWrapper from "components/common/PaginationWrapper";
import { OptionDto } from "dto/option/option.dto";
import UpdateProduct from "./UpdateProduct";
import CreateProduct from "./CreateProduct";
import { useDeleteOption } from "hooks/option/useDeleteOption";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const MainProduct = () => {
  //MỞ DIALOG ADD PRODUCT
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [selectedProduct, setSelectedProduct] = useState<OptionDto | null>(
    null
  );

  // Thay đổi: Click vào thẻ sản phẩm sẽ mở dialog update
  const handleProductClick = (product: OptionDto) => {
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

  const { data, isLoading, isError, refetch } = useFindOptionsByGroup(
    "products",
    page - 1,
    itemsPerPage,
    searchKeyword
  );

  const totalItems = data?.totalElements ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleCreateSuccess = () => {
    setOpenDialog(false);
    refetch();
  };

  //DELETE
  const { mutate: deleteOption } = useDeleteOption();
  const handleDelete = (id: string, version: number) => {
    if (window.confirm("Bạn có chắc muốn xóa SKU Design này không?")) {
      deleteOption(
        { id, version },
        {
          onSuccess: () => {
            const remainingItems = totalItems - 1;
            const maxPage = Math.ceil(remainingItems / itemsPerPage);

            if (page > maxPage) {
              setPage(maxPage);
            }
            handleCloseUpdate();
            refetch();
          },
        }
      );
    }
  };

  //FIND codeOrName
  // const { data: productOptionGroup } = useFindOptionGroupByCodeOrName(
  //   "products",
  //   0,
  //   50
  // );

  // const handleSubmit = (formValues: any) => {
  //   if (!productOptionGroup) return;

  //   const payload = {
  //     ...formValues,
  //     optionGroup: { id: productOptionGroup.id },
  //   };
  // };

  //TÌM KIẾM

  const optionGroupCode = "products";
  // const page = 0;
  const size = 50;

  // Gọi API tìm kiếm theo codeOrName trực tiếp
  const { data: optionData, isLoading: isLoadingOptions } =
    useFindOptionsByGroup(optionGroupCode, page, size, searchKeyword);

  const options = optionData?.content || [];

  useEffect(() => {
    setPage(1);
  }, [searchKeyword]);

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

        {/* Tìm kiếm */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            placeholder="Tìm kiếm SKU Design theo mã SKU hoặc tên sản phẩm"
            variant="outlined"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchOutlinedIcon sx={{ color: "#888" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: "20px",
            }}
          />
        </Grid>

        <Box
          sx={{
            backgroundColor: "white",
            p: { xs: 2, sm: 3 },
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            mt: 2,
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
              <Grid container columnSpacing={12} rowSpacing={2}>
                {data.content.map((product) => (
                  <Grid
                    key={product.id}
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      flexBasis: { xs: "100%", sm: "40%" },
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
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        },
                      }}
                      onClick={() => handleProductClick(product)}
                    >
                      <img
                        src={product.image ?? "/img/flag/VietNamflag.jpg"}
                        // alt={product.code ?? ""}
                        style={{
                          width: 40,
                          height: 40,
                          cursor: "zoom-in",
                        }}
                      />
                      <Typography
                        sx={{ color: "black", fontWeight: "500", flex: 1 }}
                      >
                        {product.name}
                      </Typography>
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
            onSuccess={handleCreateSuccess}
          />
        </DialogContent>
      </Dialog>

      {/* POPUP UPDATE PRODUCT */}
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
            onDelete={handleDelete}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MainProduct;
