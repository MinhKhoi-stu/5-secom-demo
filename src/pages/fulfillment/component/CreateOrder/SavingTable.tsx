import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FacilityDto } from "dto/facility/facility.dto";
import { useFindOptionsByGroup } from "hooks/option/useFindOptionByGroup";
import { OptionDto } from "dto/option/option.dto";

interface SavingTableProps {
  items: FacilityDto[]; // rows passed from parent (CreateOrder)
  onRemove?: (index: number) => void; // optional: remove handler
  rowsPerPageOptions?: number[];
}

const SavingTable: React.FC<SavingTableProps> = ({
  items,
  onRemove,
  rowsPerPageOptions = [5, 10, 25],
}) => {
  // Fetch state-test options (used to resolve code/name if row only contains id)
  const {
    data: stateTestData,
    isLoading: isLoadingStateTest,
    isError: isErrorStateTest,
  } = useFindOptionsByGroup("state-test", 0, 1000, "");

  const stateTestOptions: OptionDto[] = stateTestData?.content || [];

  // Fetch facility-type options (used to resolve facilityType name if missing)
  const {
    data: facilityTypeData,
    isLoading: isLoadingFacilityType,
    isError: isErrorFacilityType,
  } = useFindOptionsByGroup("facility-type", 0, 200, "", "orderNo,asc");

  const facilityTypeOptions: OptionDto[] = facilityTypeData?.content || [];

  // pagination state
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    rowsPerPageOptions[0] ?? 5
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Helper: resolve state-test code (prefer row.stateOpt.code, fallback lookup by id)
  const resolveStateCode = (row: FacilityDto) => {
    if (row?.stateOpt?.code) return row.stateOpt.code;
    const id = row?.stateOpt?.id;
    if (id) {
      const found = stateTestOptions.find((o) => o.id === id);
      if (found) return (found.code as string) || (found.name as string) || "-";
    }
    return "-";
  };

  // Helper: resolve facility-type name
  const resolveFacilityTypeName = (row: FacilityDto) => {
    if (row?.facilityType?.name) return row.facilityType.name;
    const id = row?.facilityType?.id;
    if (id) {
      const found = facilityTypeOptions.find((o) => o.id === id);
      if (found) return found.name ?? "-";
    }
    return "-";
  };

  // Helper: resolve "Cửa hàng" / level3 from orgUnit or fallback fields
  const resolveOrgUnitLevel3 = (row: FacilityDto) => {
    // best-effort: try common shapes we've seen in your code
    // e.g. row.orgUnit?.name OR custom field orgUnitLevel3 / orgUnitName etc.
    // We'll check a few possibilities.
    const anyRow = row as any;
    if (row?.orgUnit?.name) return row.orgUnit.name;
    if (anyRow.orgUnitLevel3) return anyRow.orgUnitLevel3;
    if (anyRow.orgUnitName) return anyRow.orgUnitName;
    if (anyRow.orgUnit?.level3Name) return anyRow.orgUnit.level3Name;
    // fallback to empty
    return "-";
  };

  // Prepare display rows with resolved fields (memoized)
  const displayRows = useMemo(() => {
    return items.map((row, idx) => ({
      key: row.id || `${row.code || "sku"}-${row.idNumber || idx}`,
      store: resolveOrgUnitLevel3(row),
      skuFulfill: row.skuOpt.code || "-",
      customer: row.name || "-",
      orderId: row.idNumber || "-",
      sizeCode: resolveStateCode(row),
      qty: row.area ?? 0,
      statusName: resolveFacilityTypeName(row),
      raw: row,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, stateTestOptions, facilityTypeOptions]);

  // rows for current page
  const pagedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return displayRows.slice(start, start + rowsPerPage);
  }, [displayRows, page, rowsPerPage]);

  return (
    <Box>
      <Typography variant="h6" fontWeight={"bold"} sx={{ mb: 2 }}>
        Danh sách đơn đã lưu
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="saving-table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Cửa hàng</TableCell>
              <TableCell align="left">SKU fulfill</TableCell>
              <TableCell align="left">Khách hàng</TableCell>
              <TableCell align="left">Order ID</TableCell>
              <TableCell align="left">Kích thước</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              {onRemove ? (
                <TableCell align="center">Hành động</TableCell>
              ) : null}
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={onRemove ? 8 : 7} align="center">
                  <Typography variant="body2" color="text.secondary">
                    Không có đơn hàng đã lưu
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              pagedRows.map((r, idx) => (
                <TableRow key={r.key}>
                  <TableCell align="left">{r.store}</TableCell>
                  <TableCell align="left">{r.skuFulfill}</TableCell>
                  <TableCell align="left">{r.customer}</TableCell>
                  <TableCell align="left">{r.orderId}</TableCell>
                  <TableCell align="left">{r.sizeCode}</TableCell>
                  <TableCell align="right">
                    {typeof r.qty === "number" ? r.qty : "-"}
                  </TableCell>
                  <TableCell align="left">{r.statusName}</TableCell>
                  {onRemove ? (
                    <TableCell align="center">
                      <Tooltip title="Xóa">
                        <IconButton
                          size="small"
                          onClick={() => onRemove(page * rowsPerPage + idx)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                colSpan={onRemove ? 8 : 7}
                count={displayRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: false,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Số hàng"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} trên ${count}`
                }
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SavingTable;
