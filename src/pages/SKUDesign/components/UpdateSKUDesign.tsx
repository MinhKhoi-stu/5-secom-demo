import { Typography } from "@mui/material";
import { OptionDto } from "dto/option/option.dto";

type UpdateSKUDesignProps = {
  data: OptionDto;
  onClose: () => void;
};

export const UpdateSKUDesign: React.FC<UpdateSKUDesignProps> = ({
  data,
  onClose,
}) => {
  return (
    <>
      <Typography
        sx={{
          color: "black",
          textAlign: "left",
          fontWeight: "bold",
        }}
      >
        CHỈNH SỬA SKU DESIGN {data.name}
      </Typography>
    </>
  );
};

export default UpdateSKUDesign;
