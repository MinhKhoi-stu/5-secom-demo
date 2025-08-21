import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { themeStyles } from "themes/styles";
import PaginationWrapper from "components/common/PaginationWrapper";
import { useFindAllFacility } from "hooks/facility/useFindAllFacility";
import { FacilityDto } from "dto/facility/facility.dto";
import UpdateOrder from "../UpdateOrder/UpdateOrder";

interface OrderTableProps {
  search: string;
  facilityTypeId?: string;
}

const OrderTable = ({ search, facilityTypeId }: OrderTableProps) => {
  const [selectedFacility, setSelectedFacility] = useState<FacilityDto | null>(
    null
  );
  const [openUpdate, setOpenUpdate] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setPage(1);
  }, [search, facilityTypeId]);

  const { data, isLoading, isError } = useFindAllFacility({
    page: page - 1,
    size: itemsPerPage,
    codeOrName: search,
    facilityTypeId: facilityTypeId,
    sort: "createdDate,desc",
  });

  const facilities: FacilityDto[] = data?.content ?? [];
  const totalItems = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  //OPEN DIALOG
  const handleRowClick = (facility: FacilityDto) => {
    setSelectedFacility(facility);
    setOpenUpdate(true);
  };

  if (isLoading) return <Typography>Đang tải dữ liệu...</Typography>;
  if (isError) return <Typography>Lỗi khi tải dữ liệu</Typography>;

  return (
    <Box
      sx={{
        width: "96%",
        backgroundColor: "white",
        borderRadius: "20px",
        padding: 3,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        textAlign: "left",
      }}
    >
      <Typography color="black" variant="h6" fontWeight="bold" gutterBottom>
        Thông tin đơn hàng
      </Typography>

      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow sx={{ "& th": { fontWeight: "bold" } }}>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Sản phẩm</TableCell>
              {/* <TableCell>Loại</TableCell> */}
              <TableCell>Số lượng</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilities.map((facility: FacilityDto) => (
              <TableRow
                key={facility.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => handleRowClick(facility)}
              >
                <TableCell>
                  {facility.createdDate
                    ? new Date(facility.createdDate).toLocaleDateString("vi-VN")
                    : "-"}
                </TableCell>
                <TableCell>{facility.skuOpt?.name || "-"}</TableCell>
                <TableCell>{facility.idNumber || "-"}</TableCell>
                <TableCell>{facility.name || "-"}</TableCell>
                <TableCell>{facility.labelingStandard || "-"}</TableCell>
                {/* <TableCell>
                  <Chip
                    label={facility.isException ? "Ngoại lệ" : "Bình thường"}
                    sx={{
                      backgroundColor: facility.isException
                        ? themeStyles.warning
                        : themeStyles.success,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                    size="small"
                  />
                </TableCell> */}
                <TableCell>{facility.area ?? "-"}</TableCell>
                <TableCell>{facility.facilityType?.name || "-"}</TableCell>
              </TableRow>
            ))}

            {facilities.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          {selectedFacility && (
            <UpdateOrder
              facility={selectedFacility}
              onClose={() => setOpenUpdate(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <PaginationWrapper
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default OrderTable;
