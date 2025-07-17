import {Box, Typography} from "@mui/material";

interface OriginLabelProps {
  label: string;
  icon: string;
}

const OriginLabel = ({ label, icon }: OriginLabelProps) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <img
      src={icon}
      alt={label}
      style={{ width: 20, height: 20, objectFit: "cover" }}
    />
    <Typography>{label}</Typography>
  </Box>
);

export default OriginLabel;