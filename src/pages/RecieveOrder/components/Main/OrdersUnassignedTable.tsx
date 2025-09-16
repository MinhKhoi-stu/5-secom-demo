import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import PaginationWrapper from "components/common/PaginationWrapper";
import { useLocation, useNavigate } from "react-router-dom";

// KEEP original custom hook
import useFindAllFacilityCustom from "hooks/facility/useFindAllFacilityCustom";
// NEW: generic search hook (the one you asked to add)
import { useFindAllFacility } from "hooks/facility/useFindAllFacility";

import {
  UpdatePayload,
  useUpdateFacilityCustom,
} from "hooks/facility/useUpdateFacilityCustom";
import RecieveOrderForm from "./RecieveOrderForm";

const FACILITY_BASE = "/facility";

const getTypeCodeFromPath = (pathname: string | undefined | null) => {
  const p = (pathname ?? "").toString();
  const parts = p.split("/").filter(Boolean);
  const base = FACILITY_BASE.replace(/^\//, "").toLowerCase();
  if (parts.length >= 2 && parts[0].toLowerCase() === base) {
    try {
      return decodeURIComponent(parts[1]);
    } catch {
      return parts[1];
    }
  }
  return null;
};

interface Props {
  facilityTypeId?: string;
  facilityTypeName?: string;
  typeCode?: string;
  pageSize?: number;
  issuePlace?: string;
  onAccept?: (facility: any) => void;
  // from MainPage search field
  searchKeyword?: string;
}

const OrdersUnassignedTable: React.FC<Props> = ({
  facilityTypeId: facilityTypeIdProp,
  facilityTypeName: facilityTypeNameProp,
  typeCode: typeCodeProp,
  pageSize = 5,
  issuePlace = "unassigned",
  onAccept,
  searchKeyword,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const size = pageSize;

  const typeCodeFromPath = getTypeCodeFromPath(location.pathname);
  const typeCode = typeCodeProp ?? typeCodeFromPath ?? undefined;

  const locationStateAny: any = (location as any).state ?? {};
  const facilityTypeIdFromState: string | undefined =
    locationStateAny?.facilityTypeId;

  const resolvedFacilityTypeId = useMemo(() => {
    if (facilityTypeIdProp) return facilityTypeIdProp;
    if (facilityTypeIdFromState) return facilityTypeIdFromState;
    return undefined;
  }, [facilityTypeIdProp, facilityTypeIdFromState]);

  const facilityTypeDisplayName = useMemo(() => {
    return facilityTypeNameProp ?? (typeCode ? typeCode : undefined);
  }, [facilityTypeNameProp, typeCode]);

  // ------------------- debounce search -------------------
  const [debouncedSearch, setDebouncedSearch] = useState<string>(
    (searchKeyword ?? "").trim()
  );
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch((searchKeyword ?? "").trim());
    }, 350);
    return () => clearTimeout(t);
  }, [searchKeyword]);

  // whenever search changes, go back to page 1
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, resolvedFacilityTypeId, issuePlace]);

  // ------------------- original (custom) query (keep it!) -------------------
  const facilityQueryCustom = useFindAllFacilityCustom({
    page: page - 1,
    size,
    codeOrName: typeCode ?? "",
    facilityTypeId: resolvedFacilityTypeId,
    issuePlace,
    sort: ["createdDate,desc", "isException,desc"],
  }) as any;

  // ------------------- new: search query (using useFindAllFacility) -------------------
  const facilityQuerySearch = useFindAllFacility({
    page: page - 1,
    size,
    codeOrName: debouncedSearch ?? "",
    facilityTypeId: resolvedFacilityTypeId,
    issuePlace,
    // sort: "",
  }) as any;

  // If there's a search term, prefer search results; otherwise fallback to custom hook
  const activeQuery = debouncedSearch
    ? facilityQuerySearch
    : facilityQueryCustom;
  const facilityData = activeQuery?.data;
  const facilityLoading = activeQuery?.isLoading || activeQuery?.isFetching;

  const facilities: any[] = useMemo(() => {
    if (!facilityData) return [];
    return (
      facilityData?.content ??
      facilityData?.data?.content ??
      facilityData?.data ??
      facilityData?.items ??
      facilityData?.content?.items ??
      []
    );
  }, [facilityData]);

  const totalItems: number = useMemo(() => {
    return (
      facilityData?.totalElements ??
      facilityData?.data?.totalElements ??
      facilityData?.total ??
      facilityData?.data?.total ??
      facilities.length
    );
  }, [facilityData, facilities]);

  // image helper (unchanged)
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

  const rows = useMemo(
    () =>
      facilities.map((f: any, idx: number) => {
        return {
          id: f?.id ?? f?.code ?? `f-${idx}`,
          sku: f?.skuOpt?.name,
          orderId:
            f?.idNumber ??
            f?.externalOrderId ??
            f?.order?.orderId ??
            f?.orderCode ??
            f?.code ??
            "",
          date: f?.createdDate
            ? new Date(f.createdDate).toLocaleString("vi-VN")
            : f?.date ?? "",
          demoImage: getFirstImage(
            f?.sampleSource ?? f?.sampleSources ?? f?.samples
          ),
          product:
            f?.product?.name ??
            f?.option?.name ??
            f?.productName ??
            f?.skuName ??
            "",
          size: f?.stateOpt?.name ?? f?.stateOptName ?? f?.size ?? "",
          quantity: f?.area ?? f?.quantity ?? f?.amount ?? 0,
          status: f?.facilityType?.name ?? facilityTypeDisplayName ?? "",
          raw: f,
        };
      }),
    [facilities, facilityTypeDisplayName]
  );

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  // --- Receive flow (kept) ---
  const [openRecieve, setOpenRecieve] = useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<any | null>(null);

  const updateFacilityMutation = useUpdateFacilityCustom();

  const openReceiveModalForRow = useCallback((row: any) => {
    setSelectedFacility(row.raw);
    setOpenRecieve(true);
  }, []);

  const handleRecieveSubmit = useCallback(
    async (formData: { status: string; image?: File }) => {
      if (!selectedFacility) return;
      const id = String(
        selectedFacility?.id ??
          selectedFacility?.code ??
          selectedFacility?._id ??
          ""
      );
      if (!id) {
        console.error("Không tìm được id của facility để cập nhật");
        return;
      }

      const versionFromSelected =
        selectedFacility?.version ??
        selectedFacility?.ver ??
        selectedFacility?.data?.version ??
        1;

      const payload: UpdatePayload = {
        id,
        version: versionFromSelected,
        issuePlace: formData.status,
      };

      try {
        const updatedFacility = await updateFacilityMutation.mutateAsync(
          payload
        );

        if (typeof onAccept === "function") {
          try {
            onAccept(updatedFacility);
          } catch (err) {
            console.warn("onAccept handler threw:", err);
          }
        } else {
          if (typeCode) {
            navigate(
              `${FACILITY_BASE}/${encodeURIComponent(typeCode)}/detail/${id}`
            );
          }
        }

        setOpenRecieve(false);
        setSelectedFacility(null);
      } catch (err) {
        console.error("Lỗi khi cập nhật facility:", err);
      }
    },
    [selectedFacility, updateFacilityMutation, onAccept, navigate, typeCode]
  );

  const isLoading = facilityLoading;

  const modalOrder = useMemo(() => {
    if (!selectedFacility) return null;
    return {
      orderId:
        selectedFacility?.idNumber ??
        selectedFacility?.externalOrderId ??
        selectedFacility?.order?.orderId ??
        selectedFacility?.orderCode ??
        selectedFacility?.code ??
        "",
      demoImage:
        getFirstImage(
          selectedFacility?.sampleSource ??
            selectedFacility?.sampleSources ??
            selectedFacility?.samples
        ) ?? "",
      note: selectedFacility?.note ?? selectedFacility?.description ?? "",
    };
  }, [selectedFacility]);

  // robust image resolver (kept)
  const resolveImage = (value: any): string | undefined => {
    if (!value) return undefined;

    if (typeof value === "string") {
      const s = value.trim();
      if (!s) return undefined;
      return s;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        const r = resolveImage(item);
        if (r) return r;
      }
      return undefined;
    }

    if (typeof value === "object") {
      const candidates = ["url", "path", "src", "imageUrl", "fileUrl", "data"];
      for (const c of candidates) {
        if (value[c] && typeof value[c] === "string" && value[c].trim()) {
          return value[c].trim();
        }
      }

      for (const key of Object.keys(value)) {
        try {
          const maybe = (value as any)[key];
          if (
            maybe &&
            (typeof maybe === "string" || typeof maybe === "object")
          ) {
            const r = resolveImage(maybe);
            if (r) return r;
          }
        } catch {
          // ignore
        }
      }
    }

    return undefined;
  };

  const getImageForRow = (
    raw: any,
    rowDemoImage?: string
  ): string | undefined => {
    if (!raw && !rowDemoImage) return undefined;

    const fieldsToCheck = [
      raw?.demoImage,
      raw?.sampleSource,
      raw?.sampleSources,
      raw?.samples,
      raw?.imageUrl,
      raw?.image,
      raw?.images,
      raw?.files,
      raw?.attachments,
      raw?.picture,
      raw?.preview,
    ];

    for (const field of fieldsToCheck) {
      const resolved = resolveImage(field);
      if (resolved) return resolved;
    }

    if (
      rowDemoImage &&
      typeof rowDemoImage === "string" &&
      rowDemoImage.trim()
    ) {
      return rowDemoImage.trim();
    }

    return undefined;
  };

  return (
    <Box
      sx={{
        width: "96%",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        mt: 2,
        textAlign: "left",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        {isLoading && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={18} />
            <Typography variant="body2">Đang tải...</Typography>
          </Box>
        )}
      </Box>

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
              <TableCell>SKU</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Ngày</TableCell>
              <TableCell>Hình Demo</TableCell>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Kích thước</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.sku}</TableCell>
                <TableCell>{row.orderId}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      position: "relative",
                      "&:hover .zoom-preview": {
                        display: "block",
                      },
                    }}
                  >
                    {(() => {
                      const imgSrc = getImageForRow(row.raw, row.demoImage);
                      return imgSrc ? (
                        <img
                          src={imgSrc}
                          alt="demo"
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          -
                        </Typography>
                      );
                    })()}
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
                      {(() => {
                        const imgSrc = getImageForRow(row.raw, row.demoImage);
                        return imgSrc ? (
                          <img
                            src={imgSrc}
                            alt="preview-demo"
                            style={{
                              width: "100%",
                              height: "auto",
                              display: "block",
                            }}
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            -
                          </Typography>
                        );
                      })()}
                    </Box>
                  </Box>
                  {/* </Box> */}
                </TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.size}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => openReceiveModalForRow(row)}
                    sx={{ backgroundColor: "lightsalmon", color: "black" }}
                  >
                    Nhận đơn
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {!isLoading && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Không có đơn hàng nào cần xử lý
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <PaginationWrapper
          page={page}
          totalPages={Math.max(1, Math.ceil((totalItems ?? 0) / size))}
          totalItems={totalItems ?? rows.length}
          itemsPerPage={size}
          onChange={handlePageChange}
        />
      </TableContainer>

      {/* Recieve modal */}
      <RecieveOrderForm
        open={openRecieve}
        order={modalOrder}
        onClose={() => {
          setOpenRecieve(false);
          setSelectedFacility(null);
        }}
        onSubmit={handleRecieveSubmit}
      />
    </Box>
  );
};

export default OrdersUnassignedTable;
