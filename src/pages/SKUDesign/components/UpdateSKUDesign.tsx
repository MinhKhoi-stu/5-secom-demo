import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import UploadImage from "components/common/UploadImage";
import { FormField } from "pages/User/components/FormField";
import { OptionDto, ParentOptDto } from "dto/option/option.dto";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { useFindAllOrgunit } from "hooks/orgunit/useFindAllOrgunit";
import { useUpdateOption } from "hooks/option/useUpdateOption";
import { UpdateOptionDto } from "dto/option/update-option.dto";
// Import utility functions
import { processImageUpload, formatFileSize } from "utils/convert-img";

const UpdateSKUDesign = ({
  onClose,
  data,
  onUpdated,
  onDelete,
}: {
  onClose?: () => void;
  data?: OptionDto | null;
  onUpdated?: () => void;
  onDelete?: (id: string, version: number) => void;
}) => {
  const [formData, setFormData] = useState<OptionDto>({
    version: 0,
    id: "",
    code: "",
    name: "",
    note: null,
    image: null,
    orderNo: 0,
    parentOpt: null,
    optionGroup: { id: "" },
    att1: null,
    att2: null,
    att3: "",
    att4: null,
    att5: null,
  });

  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [skuName, setSkuName] = useState("");
  // const [skuCode, setSkuCode] = useState("");
  const [initialSKU, setInitialSKU] = useState({
    name: "",
    code: "",
    image: "hinhanh.png",
  });
  const updateOption = useUpdateOption();

  // Khi nhận props data => set formData
  // useEffect(() => {
  //   if (data) {
  //     setFormData({
  //       version: data.version ?? 0,
  //       id: data.id ?? "",
  //       code: data.code ?? "",
  //       name: data.name ?? "",
  //       note: data.note ?? null,
  //       image: data.image ?? null,
  //       orderNo: data.orderNo ?? 0,
  //       parentOpt: data.parentOpt
  //         ? {
  //             id: data.parentOpt.id,
  //             code: data.parentOpt.code,
  //             name: data.parentOpt.name,
  //             note: data.parentOpt.note ?? null,
  //             orderNo: data.parentOpt.orderNo ?? 0,
  //           }
  //         : null,
  //       optionGroup: data.optionGroup ?? { id: "" },
  //       att1: data.att1 ?? null,
  //       att2: data.att2 ?? null,
  //       att3: data.att3 ?? "",
  //       att4: data.att4 ?? null,
  //       att5: data.att5 ?? null,
  //     });

  //     // Set file name từ data nếu có
  //     if (data.image) {
  //       setFileName("Ảnh hiện tại");
  //     }
  //   }
  // }, [data]);

  useEffect(() => {
    if (data) {
      setFormData({
        version: data.version ?? 0,
        id: data.id ?? "",
        code: data.code ?? "",
        name: data.name ?? "",
        note: data.note ?? null,
        image: data.image ?? null,
        orderNo: data.orderNo ?? 0,
        parentOpt: data.parentOpt
          ? {
              id: data.parentOpt.id,
              code: data.parentOpt.code,
              name: data.parentOpt.name,
              note: data.parentOpt.note ?? null,
              orderNo: data.parentOpt.orderNo ?? 0,
            }
          : null,
        optionGroup: data.optionGroup ?? { id: "" },
        att1: data.att1 ?? null,
        att2: data.att2 ?? null,
        att3: data.att3 ?? "",
        att4: data.att4 ?? null,
        att5: data.att5 ?? null,
      });

      // Set file name từ data
      if (data.image) {
        setFileName("Ảnh hiện tại");
      } else {
        setFileName("");
      }

      setInitialSKU({
        name: data.name ?? "",
        code: data.code ?? "",
        image: data.image ? "Ảnh hiện tại" : "",
      });
    }
  }, [data]);

  const isChanged = React.useMemo(() => {
    if (!data) return false;

    // So sánh từng trường của formData với data ban đầu
    const hasDifferentFields =
      formData.name !== (data.name ?? "") ||
      formData.code !== (data.code ?? "") ||
      formData.note !== (data.note ?? null) ||
      formData.orderNo !== (data.orderNo ?? 0) ||
      formData.att1 !== (data.att1 ?? null) ||
      formData.att2 !== (data.att2 ?? null) ||
      formData.att3 !== (data.att3 ?? "") ||
      formData.att4 !== (data.att4 ?? null) ||
      formData.att5 !== (data.att5 ?? null) ||
      // So sánh parentOpt
      (formData.parentOpt?.id ?? "") !== (data.parentOpt?.id ?? "") ||
      // So sánh image (có thể so base64 hoặc chỉ so tên file)
      (formData.image || null) !== (data.image || null);

    return hasDifferentFields;
  }, [formData, data]);

  // LOAD PRODUCTS
  const { data: productOptions, isLoading: loadingProducts } =
    useFindOptionsByGroup("products", 0, 50);

  // LOAD ORGUNIT
  const { data: orgUnitData, isLoading: loadingOrgUnits } = useFindAllOrgunit({
    orgUnitId: "",
    page: 0,
    size: 50,
  });
  const orgUnits = orgUnitData?.content || [];

  // UPLOAD ảnh
  const handleImageUpload = async (file: File) => {
    try {
      console.log("Ảnh đã chọn để cập nhật:", file);

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
        false // Không cần pure base64, sử dụng base64 có prefix
      );

      if (!result.success) {
        alert(result.error);
        return;
      }

      if (!result.data) {
        throw new Error("Không có dữ liệu trả về");
      }

      const { data: uploadData } = result;

      // Cập nhật formData với base64 string
      setFormData((prev) => ({ ...prev, image: uploadData.base64 }));

      // Cập nhật tên file
      setFileName(uploadData.fileName);

      console.log("Ảnh đã được xử lý thành công:");
      console.log("- Tên file:", uploadData.fileName);
      console.log("- Kích thước:", formatFileSize(uploadData.fileSize));
      console.log("- Loại file:", uploadData.fileType);
      console.log(
        "- Base64 preview:",
        uploadData.base64.substring(0, 100) + "..."
      );
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

  const handleChangeProduct = (event: any) => {
    const selectedId = event.target.value;
    const selectedOption =
      productOptions?.content.find((opt) => opt.id === selectedId) || null;

    setFormData((prev) => ({
      ...prev,
      parentOpt: selectedOption
        ? {
            id: selectedOption.id,
            code: selectedOption.code,
            name: selectedOption.name,
            note: selectedOption.note ?? null,
            orderNo: selectedOption.orderNo ?? 0,
          }
        : null,
    }));
  };

  // UPDATE API
  const handleUpdate = () => {
    const updateData: UpdateOptionDto = {
      version: formData.version,
      id: formData.id,
      code: formData.code,
      name: formData.name,
      note: formData.note || null,
      orderNo: formData.orderNo,
      optionGroup: { id: "vzE4PbdcCjdktHVGxO2TWw==" },
      image: formData.image || null,
      att1: formData.att1 || null,
      att2: formData.att2 || null,
      att3: formData.att3 || null,
      att4: formData.att4 || null,
      att5: formData.att5 || null,
      ...(formData.parentOpt
        ? { parentOpt: { id: formData.parentOpt.id } }
        : {}),
    };

    console.log("Update payload:", {
      ...updateData,
      image: updateData.image
        ? updateData.image.substring(0, 100) + "..."
        : null,
    });

    updateOption.mutate(updateData, {
      onSuccess: () => {
        console.log("Cập nhật thành công");
        if (onUpdated) onUpdated();
        if (onClose) onClose();
      },
      onError: (error) => {
        console.error("Lỗi khi cập nhật SKU Design:", error);
        alert("Có lỗi xảy ra khi cập nhật SKU Design. Vui lòng thử lại.");
      },
    });
  };

  // DELETE HANDLER
  const handleDeleteClick = () => {
    if (onDelete && data) {
      onDelete(data.id, data.version ?? 0);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <Typography sx={{ color: "black", fontWeight: "bold", mb: 2 }}>
          CẬP NHẬT SKU DESIGN
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
          <Grid item xs={12} sm={6}>
            <FormField
              label="Tên SKU"
              name="name"
              value={formData.name ?? ""}
              onChange={handleChange}
            />

            <FormField
              label="Mã SKU"
              name="code"
              value={formData.code ?? ""}
              onChange={handleChange}
            />

            <FormControl fullWidth size="small" sx={{ mt: 4 }}>
              <InputLabel id="type-label">Loại sản phẩm</InputLabel>
              <Select
                labelId="type-label"
                value={formData.parentOpt?.id ?? ""}
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
                  {fileName || "Ảnh hiện tại"}
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

          <FormField
            label="Kho"
            name="att4"
            value={formData.att4 ?? ""}
            onChange={handleChange}
          />

          <FormField
            label="Số lượng"
            name="att2"
            value={formData.att2 ?? ""}
            onChange={handleChange}
          />

          <Box
            mt={3}
            display="flex"
            gap={2}
            justifyContent={{ xs: "center", sm: "flex-end" }}
          >
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
              onClick={handleUpdate}
            >
              Lưu
            </Button>

            <Button
              sx={{
                backgroundColor: "#dc3545",
                color: "white",
                fontWeight: "bold",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "red" },
              }}
              onClick={handleDeleteClick}
            >
              Xóa
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default UpdateSKUDesign;
