import { Box, Button, TextField } from "@mui/material";
import { useRef, useState } from "react";

interface UploadImageProps {
  label?: string;
  onFileSelect: (file: File) => void;
  accept?: string;
  width?: string;
}

const UploadImage = ({
  label = "Chọn tệp",
  onFileSelect,
  accept = "image/*",
    // width = "315px",
    //   width = "100%"
}: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <Box mt={2} display="flex" flexDirection="row" gap={1} width="100%">
      <Box display="flex" alignItems="flex-start" gap={0}>
        <Button
          onClick={handleButtonClick}
          sx={{ color: "white", backgroundColor: "gray" }}
        >
          {label}
        </Button>
        <input
          type="file"
          accept={accept}
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleFileChange}
        />
        <TextField
          value={fileName}
          variant="outlined"
          size="small"
          sx={{ flex: 1, backgroundColor: "white" }}
          InputProps={{ readOnly: true }}
        />
      </Box>
    </Box>
  );
};

export default UploadImage;
