import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import UploadImage from "components/common/UploadImage";
import { useRef, useState } from "react";
import { FormField } from "pages/User/components/FormField";
import { OptionDto } from "dto/option/option.dto";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { useFindAllOrgunit } from "hooks/orgunit/useFindAllOrgunit";
import { useCreateOption } from "hooks/option/useCreateOption";
import { useQueryClient } from "react-query";
import { processImageUpload, formatFileSize } from "utils/convert-img";

const CreateSKUDesign = ({ onClose }: { onClose?: () => void }) => {
  const [fileName, setFileName] = useState("hinhanh.png");
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

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

  // const inputRef = useRef<HTMLInputElement | null>(null);

  // Gọi API lấy danh sách sản phẩm (optionGroupCode = "products")
  const { data: productOptions, isLoading: loadingProducts } =
    useFindOptionsByGroup("products", 0, 50);

  //ẢNH MÒ
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // LOẠI SẢN PHẨM
  const handleChangeProduct = (event: any) => {
    const selectedId = event.target.value;
    const selectedOption =
      productOptions?.content.find((opt) => opt.id === selectedId) || null;
    setFormData((prev) => ({
      ...prev,
      parentOpt: selectedOption,
    }));
  };

  //FULFILLMENT
  const { data: orgUnitData, isLoading: loadingOrgUnits } = useFindAllOrgunit({
    orgUnitId: "",
    page: 0,
    size: 50,
  });

  // Nếu API trả ra content như PagingDataDto thì truy cập .content
  const orgUnits = orgUnitData?.content || [];

  //SUBMIT
  const optionGroupIdSkudesigns = "vzE4PbdcCjdktHVGxO2TWw==";

  const createOptionMutation = useCreateOption(optionGroupIdSkudesigns, 0, 50);

  const handleSubmit = () => {
    if (!formData.name || !formData.code) {
      alert("Vui lòng nhập tên và mã SKU");
      return;
    }
    if (!formData.parentOpt?.id) {
      alert("Vui lòng chọn loại sản phẩm");
      return;
    }

    const payload = {
      code: formData.code,
      name: formData.name,
      note: formData.note || "",
      orderNo: formData.orderNo,
      optionGroup: { id: optionGroupIdSkudesigns },
      parentOpt: { id: formData.parentOpt.id },
      image: formData.image || "",
      att1: formData.att1 || "",
      att2: formData.att2 || "",
      att3: formData.att3 || "",
      att4: formData.att4 || "",
      att5: formData.att5 || "",
    };

    console.log("Payload gửi lên BE:", {
      ...payload,
      image: payload.image ? payload.image.substring(0, 100) + "..." : "",
    });

    createOptionMutation.mutate(payload, {
      onSuccess: () => {
        if (onClose) onClose();
        queryClient.invalidateQueries(["FIND_ALL_OPTION", "skudesigns", 0, 50]);
      },
      onError: (error) => {
        console.error("Lỗi khi tạo SKU Design:", error);
        alert("Có lỗi xảy ra khi tạo SKU Design. Vui lòng thử lại.");
      },
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <Typography sx={{ color: "black", fontWeight: "bold", mb: 2 }}>
          THÊM SKU DESIGN
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {/* TÊN SKU */}
          <Grid item xs={12} sm={6}>
            <FormField
              label="Tên SKU"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <FormField
              label="Mã SKU"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />

            {/* LOẠI SẢN PHẨM */}
            <FormControl fullWidth size="small" sx={{ mt: 4 }}>
              <InputLabel id="type-label">Loại sản phẩm</InputLabel>
              <Select
                labelId="type-label"
                value={formData.parentOpt?.id || ""}
                onChange={handleChangeProduct}
              >
                {loadingProducts ? (
                  <MenuItem disabled>Đang tải...</MenuItem>
                ) : (
                  productOptions?.content.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* HÌNH ẢNH ĐẠI DIỆN */}
          <Box
            sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
          >
            <Typography sx={{ color: "black", mt: 3 }}>
              Hình ảnh đại diện
            </Typography>
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
          </Box>

          {/* FULFILLMENT */}
          {/* <FormControl fullWidth size="small" sx={{ mt: 2 }}>
            <InputLabel id="fulfill-label">Fulfillment tại</InputLabel>
            <Select
              labelId="fulfill-label"
              value={formData.att4 || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, att4: e.target.value }))
              }
            >
              {loadingOrgUnits ? (
                <MenuItem disabled>Đang tải...</MenuItem>
              ) : (
                orgUnits.map((unit) => (
                  <MenuItem key={unit.id} value={unit.id}>
                    {unit.namePath?.join(" / ") || unit.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl> */}

          <FormField
            label="Kho"
            name="att4"
            value={formData.att4}
            onChange={handleChange}
          />

          {/* SỐ LƯỢNG */}
          <FormField
            label="Số lượng"
            name="att2"
            value={formData.att2 || ""}
            onChange={handleChange}
          />

          {/* NÚT THÊM */}
          <Box
            mt={3}
            display="flex"
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <button
              style={{
                backgroundColor: createOptionMutation.isLoading
                  ? "gray"
                  : "rgba(232, 67, 12, 0.88)",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: createOptionMutation.isLoading
                  ? "not-allowed"
                  : "pointer",
              }}
              onClick={handleSubmit}
              disabled={createOptionMutation.isLoading}
            >
              {createOptionMutation.isLoading
                ? "Đang tạo..."
                : "Thêm SKU Design"}
            </button>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default CreateSKUDesign;
