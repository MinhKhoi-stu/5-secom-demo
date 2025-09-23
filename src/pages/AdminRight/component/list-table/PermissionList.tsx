import React from "react";
import {
  Box,
  Button,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

interface PermissionListProps {
  selectedRightLoading: boolean;
  selectedRightError: boolean;
  resourceItems: any[];
  getPermissionsForResource: (res: any) => any;
  isChecked: (resourceId: string, field: any, defaultValue: boolean) => boolean;
  handleCheckboxChange: (resourceId: string, field: any) => void;
}

const PermissionList: React.FC<PermissionListProps> = ({
  selectedRightLoading,
  selectedRightError,
  resourceItems,
  getPermissionsForResource,
  isChecked,
  handleCheckboxChange,
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "white",
        p: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant="h6" color="black">
            Quyền đối tượng
          </Typography>
          <Button
            sx={{
              backgroundColor: "lightsalmon",
              color: "black",
              fontSize: "15px",
            }}
          >
            <AddIcon />
          </Button>
        </Box>
        <Button
          sx={{
            backgroundColor: "lightblue",
            color: "black",
            fontSize: "15px",
          }}
        >
          <SaveIcon />
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 420,
          overflowX: "hidden",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Table size="small" stickyHeader sx={{ tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "10px" }}>
                <b>STT</b>
              </TableCell>
              <TableCell>
                <b>TÊN ĐỐI TƯỢNG</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "20px" }}>
                <b>XEM</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "25px" }}>
                <b>THÊM</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "20px" }}>
                <b>XÓA</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "20px" }}>
                <b>SỬA</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "25px" }}>
                <b>EXCE</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedRightLoading && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}

            {!selectedRightError &&
              resourceItems
                .filter((res: any) => {
                  const perms = getPermissionsForResource(res);
                  return (
                    perms.create ||
                    perms.read ||
                    perms.update ||
                    perms.delete ||
                    perms.exec
                  );
                })
                .map((res: any, idx: number) => {
                  const id = String(res.id ?? res.code ?? idx);
                  const name = res.name ?? res.ten ?? res.code ?? "";
                  const perms = getPermissionsForResource(res);

                  return (
                    <TableRow key={id} hover>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                        >
                          {name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: "0.8rem",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                          }}
                        >
                          {res.code}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ p: 0 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked(id, "read", !!perms.read)}
                          onChange={() => handleCheckboxChange(id, "read")}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked(id, "create", !!perms.create)}
                          onChange={() => handleCheckboxChange(id, "create")}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked(id, "delete", !!perms.delete)}
                          onChange={() => handleCheckboxChange(id, "delete")}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked(id, "update", !!perms.update)}
                          onChange={() => handleCheckboxChange(id, "update")}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ p: 0 }}>
                        <Checkbox
                          size="small"
                          checked={isChecked(id, "exec", !!perms.exec)}
                          onChange={() => handleCheckboxChange(id, "exec")}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PermissionList;
