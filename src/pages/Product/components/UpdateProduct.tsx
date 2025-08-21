import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import UploadImage from "components/common/UploadImage";
import { OptionDto } from "dto/option/option.dto";
import { useRef, useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import CreateSize from "./CreateSize";
import { useDeleteOption } from "hooks/option/useDeleteOption";
import ConfirmDeleteDialog from "components/common/ConfirmDeleteDialog";
import { useUpdateOption } from "hooks/option/useUpdateOption";
import EditSize from "./EditSize";

interface UpdateProductProps {
  mode: "create" | "update";
  product?: OptionDto | null;
  open: boolean;
  onClose: () => void;
  onDelete?: (id: string, version: number) => void; // Thêm prop onDelete
}

const UpdateProduct: React.FC<UpdateProductProps> = ({
  mode,
  product,
  open,
  onDelete,
}) => {
  const [fileName, setFileName] = useState("hinhanh.png");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [initialProduct, setInitialProduct] = useState({
    name: "",
    code: "",
    image: "hinhanh.png",
  });

  //STATE-TEST

  const { mutateAsync: updateOption } = useUpdateOption();

  useEffect(() => {
    if (mode === "update" && product) {
      setProductName(product.name || "");
      setProductCode(product.code || "");
      setFileName(product.image || "hinhanh.png");

      // lưu state ban đầu để so sánh
      setInitialProduct({
        name: product.name || "",
        code: product.code || "",
        image: product.image || "hinhanh.png",
      });
    } else {
      setProductName("");
      setProductCode("");
      setFileName("hinhanh.png");
      setInitialProduct({
        name: "",
        code: "",
        image: "hinhanh.png",
      });
    }
  }, [mode, product, open]);

  const isChanged =
    productName !== initialProduct.name ||
    productCode !== initialProduct.code ||
    fileName !== initialProduct.image;

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // reader.result sẽ là chuỗi base64
      setFileName(reader.result as string);
    };
    reader.readAsDataURL(file); // Chuyển ảnh sang Base64
  };

  const handleSave = async () => {
    if (!product) return;

    await updateOption({
      id: product.id,
      version: product.version,
      name: productName,
      code: productCode,
      image: fileName,
      note: product.note,
      orderNo: product.orderNo,
      optionGroup: { id: product.optionGroup?.id ?? "" },
      parentOpt: product.parentOpt ? { id: product.parentOpt.id } : undefined,
      att1: product.att1,
      att2: product.att2,
      att3: product.att3,
      att4: product.att4,
      att5: product.att5,
    });
  };

  const [openCreateSize, setOpenCreateSize] = useState(false);

  const { data: stateTestOptions, isLoading: isStateTestLoading } =
    useFindOptionsByGroup("state-test", 0, 50);

  const childOptions =
    stateTestOptions?.content?.filter(
      (opt) => opt.parentOpt?.id === product?.id
    ) || [];

  // Hàm xử lý xóa sản phẩm
  const handleDeleteClick = () => {
    if (product && onDelete) {
      onDelete(product.id, product.version ?? 0);
    }
  };

  //DELETE SIZE
  const [deleteState, setDeleteState] = useState<{
    open: boolean;
    id?: string;
    version?: number;
  }>({ open: false });
  const { mutateAsync: deleteOption } = useDeleteOption();

  const handleOpenDelete = (id: string, version: number) => {
    setDeleteState({ open: true, id, version });
  };

  //EDIT SIZE
  const [openEditSize, setOpenEditSize] = useState(false);
  const [selectedSize, setSelectedSize] = useState<OptionDto | null>(null);

  return (
    <>
      {/* TITLE */}
      <Typography
        sx={{
          display: "flex",
          color: "black",
          fontWeight: "bold",
          mb: 2,
        }}
      >
        {mode === "update" ? "SỬA SẢN PHẨM" : "THÊM SẢN PHẨM"}
      </Typography>
      <Box
        sx={{
          width: "flex",
          backgroundColor: "white",
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* INPUT TÊN SẢN PHẨM */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: 3,
          }}
        >
          <Typography sx={{ color: "black", mr: 2 }}>Tên sản phẩm</Typography>
          <TextField
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            size="small"
            sx={{
              width: "400px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        </Box>

        <Box
          sx={{
            mb: 3,
          }}
        >
          <Typography sx={{ color: "black", mr: 2 }}>Mã sản phẩm</Typography>
          <TextField
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            type="text"
            size="small"
            sx={{
              width: "400px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        </Box>

        {/* INPUT HÌNH ẢNH */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ color: "black", mb: 1 }}>
            Hình ảnh đại diện
          </Typography>
          <UploadImage onFileSelect={handleImageUpload} />
          {fileName && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="textSecondary">
                {"Ảnh hiện tại"}
              </Typography>
              <Box sx={{ mt: 1, maxWidth: 200 }}>
                <img
                  src={fileName}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>

        {/* BUTTON LƯU VÀ XÓA */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
        >
          {mode === "update" && (
            <Button
              variant="contained"
              color="error"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "10px",
                px: 3,
                py: 1.5,
                boxShadow: 2,
                "&:hover": { backgroundColor: "red" },
              }}
              onClick={handleDeleteClick}
            >
              Xóa
            </Button>
          )}

          <Button
            variant="contained"
            sx={{
              backgroundColor: isChanged ? "green" : "gray",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.5,
              boxShadow: 2,
              cursor: isChanged ? "pointer" : "not-allowed",
              "&:hover": isChanged ? { backgroundColor: "lightgreen" } : {},
            }}
            disabled={!isChanged}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </Box>
      </Box>

      {/* BẢNG HIỂN THỊ STATE-TEST (SIZE) */}
      {open && product && (
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ color: "black", fontWeight: "bold", mb: 2 }}>
            Danh sách Size của sản phẩm
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>STT</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tên</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Mã</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Tùy chỉnh</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {childOptions.length > 0 ? (
                  childOptions.map((opt, index) => (
                    <TableRow key={opt.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{opt.name}</TableCell>
                      <TableCell>{opt.code}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() =>
                            setDeleteState({
                              open: true,
                              id: opt.id,
                              version: opt.version ?? 0,
                            })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>

                        <IconButton
                          color="primary"
                          onClick={() => {
                            setSelectedSize(opt);
                            setOpenEditSize(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Sản phẩm này chưa có size
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "10px",
            px: 2,
            py: 1.5,
            boxShadow: 2,
            backgroundColor: "orange",
            "&:hover": { backgroundColor: "lightsalmon" },
          }}
          onClick={() => setOpenCreateSize(true)}
        >
          Thêm size
        </Button>
      </Box>

      {/* DIALOG CREATE SIZE */}
      <CreateSize
        open={openCreateSize}
        onClose={() => setOpenCreateSize(false)}
        parentProduct={product}
      />

      {/* DIALOG CONFIRM DELETE SIZE */}
      <ConfirmDeleteDialog
        open={deleteState.open}
        title="Xóa option"
        description="Bạn có chắc muốn xóa?"
        onClose={() => setDeleteState({ open: false })}
        onConfirm={async () => {
          if (!deleteState.id || deleteState.version === undefined) return;
          await deleteOption({
            id: deleteState.id,
            version: deleteState.version,
          });
        }}
      />

      <EditSize
        open={openEditSize}
        onClose={() => setOpenEditSize(false)}
        sizeData={selectedSize}
      />
    </>
  );
};

export default UpdateProduct;
