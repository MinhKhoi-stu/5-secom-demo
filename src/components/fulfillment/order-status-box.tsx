import { Box, Typography } from "@mui/material";

interface Props {
  color: string;
  count: number;
  label: string;
}

const OrderStatusBox = ({ color, count, label }: Props) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        color: "#fff",
        borderRadius: 2,
        padding: 2,
        minWidth: 80,
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {count}
      </Typography>
      <Typography variant="body2">{label}</Typography>
    </Box>
  );
};

export default OrderStatusBox;
