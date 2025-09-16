import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  TextField,
} from "@mui/material";
import UploadImage from "components/common/UploadImage";
import { FacilityDto } from "dto/facility/facility.dto";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { useUpdateFacilityCustom } from "hooks/facility/useUpdateFacilityCustom";
import { useGetMyProfile } from "hooks/admin-users";
import { useFacilityDiary } from "hooks/facility/useFacilityDiary";
import { FacilityDiaryDto } from "dto/facility/facility-diary.dto";

interface UpdateOrderFormProps {
  order?: FacilityDto | null;
  orderId?: string;
  demoImage?: string;
  onSubmit?: (data: {
    status: string;
    facilityTypeId?: string;
    image?: File;
  }) => void;
  onClose?: () => void;
}

export const ReturnOrderForm: React.FC<UpdateOrderFormProps> = ({
  order: orderProp,
  orderId,
  demoImage,
  onSubmit,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<FacilityDto | null>(orderProp ?? null);
  const [value, setValue] = useState<string>("");
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [fileName, setFileName] = useState<string | null>(null);

  // Ghi chú / note (tách khỏi order object để tránh controlled/uncontrolled)
  const [noteText, setNoteText] = useState<string>(
    (orderProp?.note ?? "").toString()
  );

  // Khi parent truyền order prop -> trực tiếp set
  useEffect(() => {
    setOrder(orderProp ?? null);
    setNoteText((orderProp?.note ?? "").toString());
  }, [orderProp]);

  // --- use options hook: facility-type, sort orderNo,asc ---
  const { data: optionsResp, isLoading: optionsLoading } =
    useFindOptionsByGroup("facility-type", 0, 200, "", "orderNo,asc", "");

  // Normalize options payload from many possible shapes (không giả sử .data)
  type OptionItem = { id?: string; code?: string; name?: string };
  const options: OptionItem[] =
    (optionsResp as any)?.content ??
    (optionsResp as any)?.items ??
    (optionsResp as any)?.data ??
    (optionsResp as any)?.results ??
    (optionsResp as any) ??
    [];

  useEffect(() => {
    if (!order) return;

    // Ưu tiên facilityType
    if (order.facilityType) {
      const codeOrId = order.facilityType.code ?? order.facilityType.id ?? "";
      setValue(codeOrId);

      if (order.facilityType.id) {
        setSelectedOptionId(order.facilityType.id);
      } else {
        // fallback: nếu options đã load thì tìm trong options
        if (options && Array.isArray(options) && options.length > 0) {
          const found = options.find(
            (opt: OptionItem) =>
              opt.code === order.facilityType.code ||
              opt.id === order.facilityType.code ||
              opt.id === order.facilityType.id
          );
          if (found?.id) {
            setSelectedOptionId(found.id);
          }
        }
      }
      return;
    }

    // Nếu không có facilityType, fallback sang stateOpt
    if (order.stateOpt?.code) {
      setValue(order.stateOpt.code);
      if (options && Array.isArray(options) && options.length > 0) {
        const found = options.find(
          (opt: OptionItem) =>
            opt.code === order.stateOpt?.code || opt.id === order.stateOpt?.code
        );
        if (found?.id) {
          setSelectedOptionId(found.id);
        }
      }
    }
  }, [order, options]);

  const handleImageUpload = (file: File) => {
    setFileName(file.name);
    setSelectedFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  // original onSubmit handler (if parent provided)
  const handleSubmit = () => {
    if (typeof onSubmit === "function") {
      onSubmit({
        status: value,
        facilityTypeId: order?.facilityType.id,
        image: selectedFile,
      });
    } else {
      console.log("Submit (no handler):", {
        status: value,
        facilityTypeId: order?.facilityType.id,
        image: selectedFile,
      });
    }
  };

  // --- update facility hook ---
  const updateFacilityMutation = useUpdateFacilityCustom();

  // --- facility diary mutation (POST-based) ---
  const facilityDiaryMutation = useFacilityDiary();

  // helper lấy 1 ảnh demo từ mọi dạng sampleSource
  const getFirstImage = (sampleSource: any): string | undefined => {
    if (!sampleSource) return undefined;
    if (typeof sampleSource === "string") return sampleSource;
    if (Array.isArray(sampleSource)) {
      const first = sampleSource[0];
      if (!first) return undefined;
      if (typeof first === "string") return first;
      return first.url ?? first.path ?? undefined;
    }
    return sampleSource.url ?? sampleSource.path ?? undefined;
  };

  const displayImage = demoImage ?? getFirstImage(order?.sampleSource);

  const profileQuery = useGetMyProfile({ enabled: Boolean(orderProp) });

  useEffect(() => {
    if (profileQuery.isLoading) return;
    if (profileQuery.data) {
      const username =
        (profileQuery.data as any)?.username ??
        (profileQuery.data as any)?.userName ??
        (profileQuery.data as any)?.login ??
        (profileQuery.data as any)?.email ??
        null;
      console.log("Current logged-in username:", username);
    }
  }, [profileQuery.data, profileQuery.isLoading, profileQuery.error]);

  const handleConfirmUpdate = () => {
    if (!order) {
      console.warn("Không có facility để cập nhật.");
      return;
    }
    if (!selectedOptionId) {
      console.warn("Chưa chọn facility-type (selectedOptionId trống).");
      return;
    }
    if (order.version === undefined || order.version === null) {
      console.warn(
        "Facility.version missing; mutation yêu cầu phiên bản để optimistic lock. Sử dụng version = 0."
      );
    }

    const payload: any = {
      id: order.id,
      version: order.version ?? 0,
      facilityTypeId: selectedOptionId,
      issuePlace: "unassigned",
      note: noteText,
    };

    console.log("Gửi cập nhật facility payload:", payload);

    updateFacilityMutation.mutate(payload, {
      onSuccess: async (updated) => {
        console.log("Cập nhật facility thành công:", updated);

        const username =
          (profileQuery.data as any)?.username ??
          (profileQuery.data as any)?.userName ??
          (profileQuery.data as any)?.login ??
          (profileQuery.data as any)?.email ??
          "";

        const diaryPayload: Partial<FacilityDiaryDto> = {
          facility: { id: order.id },
          diaryType: { id: order?.facilityType.id },
          datetime: new Date().toISOString(),
          employee: username || "",
          isAccepted: 0,
          result: "",
          source: "",
        };

        try {
          await facilityDiaryMutation.mutateAsync(
            diaryPayload as FacilityDiaryDto
          );
          console.log("Created facility diary (payload):", diaryPayload);
        } catch (e) {
          console.error("Lỗi khi tạo facility diary:", e);
        }

        onClose && onClose();
      },
      onError: (err) => {
        console.error("Lỗi khi cập nhật facility:", err);
      },
    });
  };

  return (
    <>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: 200 }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* TIÊU ĐỀ */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "left",
              mb: 1,
            }}
          >
            <Typography
              color="black"
              variant="h6"
              fontWeight={"bold"}
              gutterBottom
            >
              XÁC NHẬN TRẢ ĐƠN - {order?.idNumber ?? orderId ?? "-"}
            </Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          >
            {/* THÔNG TIN + HÌNH ẢNH */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                textAlign: "left",
                gap: 2,
              }}
            >
              {/* CỘT THÔNG TIN YÊU CẦU */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography color="black" fontWeight="bold">
                  Thông tin đơn hàng
                </Typography>

                <Card
                  variant="outlined"
                  sx={{ width: "100%", borderRadius: "10px", mt: 0 }}
                >
                  <CardContent>
                    <TextField
                      placeholder="Ghi chú..."
                      fullWidth
                      multiline
                      rows={3}
                      value={noteText}
                      onChange={(e) => {
                        const v = e.target.value;
                        setNoteText(v);
                      }}
                    />
                  </CardContent>
                </Card>
              </Box>

              {/* CỘT HÌNH ẢNH KHÁCH GỬI */}
              <Box sx={{ width: { xs: "100%", md: 250 } }}>
                <Typography color="black" fontWeight="bold">
                  Hình ảnh khách gửi
                </Typography>

                <Card
                  variant="outlined"
                  sx={{ width: "100%", borderRadius: "10px", mt: 1 }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      gap={1}
                      flexWrap="wrap"
                      justifyContent="center"
                    >
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: 2,
                          overflow: "hidden",
                          border: "1px solid #ccc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {displayImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={displayImage}
                            alt="Demo"
                            width={100}
                            height={100}
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            -
                          </Typography>
                        )}
                      </Box>

                      {/* Hiển thị thêm ảnh nếu có */}
                      {Array.isArray(order?.sampleSource) &&
                        (order?.sampleSource as any[])
                          .slice(1, 5)
                          .map((s: any, idx: number) => {
                            const url =
                              typeof s === "string" ? s : s?.url ?? s?.path;
                            if (!url) return null;
                            return (
                              <Box
                                key={idx}
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: 1,
                                  overflow: "hidden",
                                  border: "1px solid #eee",
                                }}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={url}
                                  alt={`img-${idx}`}
                                  width={60}
                                  height={60}
                                  style={{ objectFit: "cover" }}
                                />
                              </Box>
                            );
                          })}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>

            {/* TRẠNG THÁI + UPLOAD */}
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ color: "black" }} fontWeight="bold">
                Trạng thái đơn hàng
              </Typography>

              <Card variant="outlined" sx={{ mt: 1, borderRadius: "20px" }}>
                <CardContent>
                  <Box mt={2} display="flex" flexDirection="column" gap={2}>
                    <UploadImage onFileSelect={handleImageUpload} />

                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />

                    <FormControl
                      size="small"
                      sx={{ width: { xs: "100%", md: 315 } }}
                    >
                      <InputLabel id="combo-label">Trạng thái</InputLabel>
                      <Select
                        labelId="combo-label"
                        value={value}
                        label="Trạng thái"
                        onChange={(e: SelectChangeEvent<string>) => {
                          const selectedCode = e.target.value as string;
                          setValue(selectedCode);

                          const found = (options as OptionItem[]).find(
                            (opt) =>
                              opt.code === selectedCode ||
                              opt.id === selectedCode
                          );
                          if (found?.id) {
                            setSelectedOptionId(found.id);
                            console.log(
                              "👉 Selected facilityTypeId:",
                              found.id
                            );
                          } else {
                            setSelectedOptionId("");
                            console.log(
                              "⚠️ Không tìm thấy facilityTypeId cho:",
                              selectedCode
                            );
                          }
                        }}
                      >
                        {optionsLoading && (
                          <MenuItem value="" disabled>
                            Đang tải...
                          </MenuItem>
                        )}

                        {!optionsLoading &&
                          (options as OptionItem[]).length === 0 && (
                            <MenuItem value="" disabled>
                              - Không có trạng thái -
                            </MenuItem>
                          )}

                        {!optionsLoading &&
                          (options as OptionItem[]).map(
                            (opt: OptionItem, idx: number) => {
                              const val = opt.code ?? opt.id ?? String(idx);
                              const label =
                                opt.name ??
                                opt.code ??
                                opt.id ??
                                `Option ${idx}`;
                              return (
                                <MenuItem key={val} value={val}>
                                  {label}
                                </MenuItem>
                              );
                            }
                          )}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box
                    mt={3}
                    display="flex"
                    justifyContent="flex-end"
                    flexDirection="row"
                    gap={1}
                  >
                    <Box>
                      <Button onClick={onClose}>Hủy</Button>
                    </Box>

                    <Box sx={{ width: "25%" }}>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "red" }}
                        onClick={handleConfirmUpdate}
                        disabled={
                          !selectedOptionId ||
                          !order ||
                          updateFacilityMutation?.isLoading
                        }
                      >
                        {updateFacilityMutation?.isLoading
                          ? "Đang xử lý..."
                          : "XÁC NHẬN"}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
