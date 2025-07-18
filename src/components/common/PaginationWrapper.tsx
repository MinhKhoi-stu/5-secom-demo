// components/common/TablePaginationWrapper.tsx
import { Box, Pagination, Typography } from "@mui/material";

interface Props {
  page: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationWrapper = ({
  page,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onChange,
}: Props) => {
  const start = (page - 1) * itemsPerPage + 1;
  const end = Math.min(page * itemsPerPage, totalItems ?? 0);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "black",
        margin: 2,
        mt: 2,
        mx: 2,
      }}
    >
      <Typography variant="body2">
        Đang hiển thị {start} - {end} / {totalItems ?? "?"} mục
      </Typography>
      <Pagination
        count={totalPages}
        page={page}
        onChange={onChange}
        shape="rounded"
        variant="outlined"
        color="primary"
      />
    </Box>
  );
};

export default PaginationWrapper;
