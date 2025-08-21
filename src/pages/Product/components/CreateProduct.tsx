import { Box, Button, Typography } from "@mui/material";
import UploadImage from "components/common/UploadImage";
import { useRef, useState } from "react";
import { FormField } from "pages/User/components/FormField";
import { useCreateOption } from "hooks/option/useCreateOption";
import { processImageUpload } from "utils/convert-img";
import { OptionDto } from "dto/option/option.dto";
import {toast} from "react-toastify";

const CreateProduct = ({
  onClose,
  onSuccess,
}: {
  onClose?: () => void;
  onSuccess?: () => void;
}) => {
  const [fileName, setFileName] = useState("hinhanh.png");
  // const inputRef = useRef<HTMLInputElement | null>(null);
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");

  const [formData, setFormData] = useState<OptionDto>({
    version: 0,
    id: "",
    code: "",
    name: "",
    note: null,
    //
    image: "",
    orderNo: 0,
    parentOpt: null,
    att1: null,
    att2: "",
    att3: "",
    att4: null,
    att5: null,
  });

  //UPLOAD ẢNH MÒ
  const handleImageUpload = async (file: File) => {
    try {
      console.log("Ảnh đã chọn:", file);

      // Sử dụng utility function để xử lý upload
      const result = await processImageUpload(
        file,
        {
          maxSizeInMB: 5,
          allowedTypes: [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
          ],
        },
        false
      );

      if (!result.success) {
        alert(result.error);
        return;
      }

      if (!result.data) {
        throw new Error("Không có dữ liệu trả về");
      }

      const { data } = result;

      // Cập nhật formData với base64 string
      setFormData((prev) => ({
        ...prev,
        image: data.base64,
      }));

      // Cập nhật tên file
      setFileName(data.fileName);
    } catch (error) {
      console.error("Lỗi khi xử lý ảnh:", error);
      alert("Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại.");
    }
  };
  //BUTTON ADD

  const createOptionMutation = useCreateOption(
    "5r2izQqBvjb6w6N59Lce4g==",
    0,
    50
  );

  //CREATE
  const handleAddProduct = async () => {
    try {
      // Kiểm tra dữ liệu đầu vào
      if (!productName || !productCode) {
        toast.error("Tên sản phẩm và mã sản phẩm không được để trống");
        return;
      }

      const productPayload = {
        name: productName,
        code: productCode,
        optionGroup: { id: "5r2izQqBvjb6w6N59Lce4g==" }, // ID này của group "products"
        image: formData.image || "",
        att1: "",
        att2: "",
        att3: "",
        att4: "",
        att5: "",
      };

      const createdProduct = await createOptionMutation.mutateAsync(
        productPayload
      );
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Lỗi khi tạo product option:", error);
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
            flexDirection: "column",
          }}
        >
          <FormField
            label="Tên sản phẩm"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          {/* INPUT MÃ SẢN PHẨM */}
          <FormField
            label="Mã sản phẩm"
            name="productCode"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
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

          {/* NÚT CHỌN TỆP */}
          <UploadImage onFileSelect={handleImageUpload} />
          {formData.image && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="textSecondary">
                Đã chọn: {fileName}
              </Typography>
              <Box sx={{ mt: 1, maxWidth: 200 }}>
                <img
                  src={formData.image}
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
        </div>

        {/* NÚT THÊM SẢN PHẨM */}
        <div
          style={{
            display: "flex",
            marginTop: "30px",
          }}
        >
          <Button
            sx={{
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.5,
              boxShadow: 2,
              "&:hover": { backgroundColor: "#ffa07a" },
            }}
            onClick={handleAddProduct}
          >
            Thêm sản phẩm
          </Button>
        </div>
      </Box>
    </>
  );
};

export default CreateProduct;
