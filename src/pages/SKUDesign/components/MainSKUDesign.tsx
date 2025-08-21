import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { useDeleteOption } from "hooks/option/useDeleteOption";
import UpdateSKUDesign from "./UpdateSKUDesign";
import { OptionDto } from "dto/option/option.dto";
import CreateSKUDesign from "./CreateSKUDesign";
import { useFindAllOrgunit } from "hooks/orgunit/useFindAllOrgunit";
import PaginationWrapper from "components/common/PaginationWrapper";

const MainSKUDesign = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [previewImg, setPreviewImg] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);

  const optionGroupCode = "skudesigns";
  const page = 0;
  const size = 50;

  // const { data: optionGroups } = useFindOptionGroup();
  const { data, isLoading } = useFindOptionsByGroup(
    optionGroupCode,
    page,
    size
  );

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

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

  //EDIT DIALOG
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState<OptionDto | null>(null);

  const handleOpenDialogEdit = (row: OptionDto) => {
    setSelectedRow(row);
    setOpenDialogEdit(true);
  };

  const handleCloseDialogEdit = () => {
    setSelectedRow(null);
    setOpenDialogEdit(false);
  };

  //DELETE
  const { mutate: deleteOption } = useDeleteOption();
  const { refetch } = useFindOptionsByGroup(optionGroupCode, page, size);

  const handleDelete = (id: string, version: number) => {
    if (window.confirm("Bạn có chắc muốn xóa SKU Design này không?")) {
      deleteOption(
        { id, version },
        {
          onSuccess: () => {
            refetch();
            handleCloseDialogEdit(); // Đóng dialog sau khi xóa thành công
          },
          onError: (error) => {
            alert("Xóa không thành công, vui lòng thử lại.");
            console.error(error);
          },
        }
      );
    }
  };

  //LẤY name ORGUNIT BẰNG id
  const { data: orgUnitData, isLoading: loadingOrgUnits } = useFindAllOrgunit({
    orgUnitId: "",
    page: 0,
    size: 50,
  });
  const orgUnits = orgUnitData?.content || [];

  const getOrgUnitNameById = (id: string) => {
    const unit = orgUnits.find((ou) => ou.id === id);
    return unit ? unit.namePath?.join(" / ") || unit.name : id || "-";
  };

  //TÌM KIẾM
  const [searchKeyword, setSearchKeyword] = useState("");

  // Gọi API tìm kiếm theo codeOrName trực tiếp
  const { data: optionData, isLoading: isLoadingOptions } =
    useFindOptionsByGroup(optionGroupCode, page, size, searchKeyword);

  const options = optionData?.content || [];

  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalItems = options.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedOptions = options.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ mt: 3, display: "flex", flexDirection: "column" }}
    >
      {/* Tìm kiếm */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          type="text"
          placeholder="Tìm kiếm SKU Design theo mã SKU"
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
            borderRadius: "10px",
          }}
        />
      </Grid>

      {/* Bảng SKU */}
      <Grid item xs={12}>
        <Paper
          sx={{
            padding: 3,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography color="black" variant="h6" fontWeight="bold" gutterBottom>
            SKU Design
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
                  <TableCell>SKU</TableCell>
                  <TableCell>Hình Ảnh</TableCell>
                  <TableCell>Loại SP</TableCell>
                  <TableCell>File gốc</TableCell>
                  <TableCell>Fulfillment</TableCell>
                  <TableCell>Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6}>Đang tải...</TableCell>
                  </TableRow>
                ) : (
                  paginatedOptions.map((row) => (
                    <TableRow
                      key={row.id}
                      onClick={() => handleOpenDialogEdit(row)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      <TableCell>{row.code}</TableCell>

                      {/* Hình ảnh + Hover */}
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
                          <img
                            src={row.image ?? "/placeholder.png"}
                            alt={row.code ?? ""}
                            style={{
                              width: 40,
                              height: 40,
                              cursor: "zoom-in",
                            }}
                          />
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
                              src={row.image ?? "/placeholder.png"}
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

                      <TableCell>{row.parentOpt?.name || "-"}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        {getOrgUnitNameById(row.att4 || "")}
                      </TableCell>
                      <TableCell>{row.att2}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Popover hiển thị ảnh to */}
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
          <PaginationWrapper
            page={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onChange={handlePageChange}
          />
        </Paper>
      </Grid>

      {/* Button mở Dialog */}
      <Box display="flex" justifyContent={{ xs: "center", sm: "flex-start" }}>
        <Button
          onClick={handleOpenDialog}
          variant="contained"
          sx={{
            backgroundColor: "#333",
            borderRadius: "8px",
            px: 3,
            py: 1,
            fontWeight: "bold",
            ":hover": {
              backgroundColor: "#555",
            },
          }}
        >
          THÊM SKU DESIGN
        </Button>
      </Box>

      {/* Dialog chứa AddSKUDesign */}
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
        <DialogContent dividers>
          <CreateSKUDesign onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>

      {/* Dialog chứa UpdateSKUDesign */}
      <Dialog
        open={openDialogEdit}
        onClose={handleCloseDialogEdit}
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
        <DialogContent dividers>
          {selectedRow && (
            <UpdateSKUDesign
              data={selectedRow}
              onClose={handleCloseDialogEdit}
              onUpdated={refetch}
              onDelete={handleDelete}
            />
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default MainSKUDesign;

