import { TextField, Typography } from "@mui/material";
import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: object;
  placeholder?: string;
}

export function FormField({
  label,
  type = "text",
  value,
  onChange,
  name,
  sx = {},
}: FormFieldProps) {
  return (
    <div style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
      <Typography sx={{ color: "black", alignItems: "flex-start", textAlign: "left" }}>
        {label}
      </Typography>
      <TextField
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        size="small"
        variant="outlined"
        sx={{
          // width: "400px",
          width: "flex",
          mt: 2,
          backgroundColor: "white",
          borderRadius: "10px",
          ...sx,
        }}
      />
    </div>
  );
}
