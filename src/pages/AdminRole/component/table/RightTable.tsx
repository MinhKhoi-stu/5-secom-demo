import React from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SaveIcon from "@mui/icons-material/Save";

type PermissionItem = {
  id: string | number;
  label: string;
  checked: boolean;
};

type RightTableProps = {
  rightsLoading: boolean;
  rightsError: boolean;
  state: PermissionItem[];
  handleChange: (id: string | number) => void;
  onSave?: () => void; // new: callback when clicking Lưu
  saving?: boolean; // new: mutation loading flag
  selectedRoleId?: string | number | null; // new: to disable save when no role selected
};

const RightTable: React.FC<RightTableProps> = ({
  rightsLoading,
  rightsError,
  state,
  handleChange,
  onSave,
  saving = false,
  selectedRoleId = null,
}) => {
  return (
    <Box sx={{ flex: 1, minWidth: 200 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          p: { xs: 2, sm: 3 },
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          mt: 2,
          width: "80%",
          maxHeight: "80vh",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" color="black">
            Danh sách quyền của nhóm quyền
          </Typography>
            <Button
              sx={{
                backgroundColor: "lightblue",
                color: "black",
                fontSize: "15px",
              }}
              onClick={() => onSave && onSave()}
              disabled={saving || !selectedRoleId}
            >
              {saving ? (
                <CircularProgress size={16} sx={{ mr: 1 }} />
              ) : (
                <SaveIcon sx={{ mr: 0.5 }} />
              )}
              Lưu
            </Button>
        </Box>

        {/* Tìm kiếm */}
        
        {/* <TextField
          type="text"
          size="small"
          placeholder="Tìm kiếm..."
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlinedIcon sx={{ color: "#888" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            width: "50%",
          }}
          fullWidth
        /> */}

        <Box
          sx={{
            maxHeight: 510,
            minWidth: 0,
            color: "black",
            overflowX: "hidden",
            overflowY: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {rightsLoading && state.length === 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={24} />
            </Box>
          ) : rightsError ? (
            <Typography color="error">Lỗi khi tải danh sách quyền</Typography>
          ) : (
            <FormGroup>
              {state.map((perm) => (
                <FormControlLabel
                  key={perm.id}
                  control={
                    <Checkbox
                      checked={perm.checked}
                      onChange={() => handleChange(perm.id)}
                    />
                  }
                  label={perm.label}
                />
              ))}
            </FormGroup>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RightTable;
