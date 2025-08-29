// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Typography,
// } from "@mui/material";
// import { useRef, useState, useMemo } from "react";
// import { useGetMyProfile } from "hooks/admin-users";

// interface RecieveOrderModalProps {
//   open: boolean;
//   order: { orderId: string; demoImage: string } | null;
//   onClose: () => void;
//   onSubmit: (data: { status: string; image?: File }) => void;
// }

// const getUserNameFromProfile = (profile: any): string => {
//   if (!profile) return "Không xác định";
//   const p = profile?.data ?? profile;

//   return (
//     p?.fullName ||
//     p?.name ||
//     p?.displayName ||
//     p?.username ||
//     p?.email ||
//     (p?.firstName && p?.lastName ? `${p.firstName} ${p.lastName}` : "") ||
//     "Không xác định"
//   );
// };

// const RecieveOrderForm = ({
//   open,
//   order,
//   onClose,
//   onSubmit,
// }: RecieveOrderModalProps) => {
//   const [value, setValue] = useState("");
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   // gọi API khi modal mở
//   const {
//     data: profileData,
//     isLoading,
//     error,
//   } = useGetMyProfile({
//     enabled: open,
//   });

//   const userName = useMemo(
//     () => getUserNameFromProfile(profileData),
//     [profileData]
//   );

//   const handleSubmit = () => {
//     if (!order) return;
//     onSubmit({
//       status: value,
//       image: undefined,
//     });
//   };

//   if (!order) return null;

//   return (
//     <Dialog open={open} onClose={onClose} sx={{ width: "flex" }}>
//       <DialogTitle fontWeight="bold">Xác nhận nhận đơn hàng</DialogTitle>
//       <DialogContent dividers>
//         <Box
//           sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
//         >
//           <Typography
//             color="black"
//             variant="h6"
//             fontWeight={"bold"}
//             gutterBottom
//           >
//             ĐƠN HÀNG CẦN VẼ 2D - {order.orderId}
//           </Typography>

//           <Box
//             sx={{
//               width: "100%",
//               display: "flex",
//               flexDirection: "row",
//               gap: "10px",
//               mb: 2,
//               mt: 2,
//             }}
//           >
//             {/* THÔNG TIN YÊU CẦU */}
//             <Box>
//               <Typography color="black" fontWeight="bold">
//                 Thông tin yêu cầu
//               </Typography>
//               <Card
//                 variant="outlined"
//                 sx={{ borderRadius: "10px", height: "20vh" }}
//               >
//                 <CardContent>
//                   <Typography color="text.secondary">
//                     Chưa có thông tin yêu cầu.
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Box>

//             {/* HÌNH ẢNH KHÁCH GỬI */}
//             <Box>
//               <Typography color="black" fontWeight="bold">
//                 Hình ảnh khách gửi
//               </Typography>
//               <Card variant="outlined" sx={{ borderRadius: "10px" }}>
//                 <CardContent>
//                   <Box width={250}>
//                     <Box
//                       sx={{
//                         width: 100,
//                         height: 100,
//                         borderRadius: 2,
//                         overflow: "hidden",
//                         border: "1px solid #ccc",
//                       }}
//                     >
//                       <img
//                         src={order.demoImage}
//                         alt="Demo"
//                         width={100}
//                         height={100}
//                         style={{ objectFit: "cover" }}
//                       />
//                       </Box>
//                     </Box>
//                 </CardContent>
//               </Card>
//               <Box sx={{
//                 display: "flex",
//                 justifyContent: "flex-end"
//               }}>
//                 <Typography variant="body2" sx={{ mt: 1 }}>
//                   <strong>Người nhận: </strong>{" "}
//                   {isLoading ? "Đang tải..." : userName}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>

//           {/* FORM TRẠNG THÁI */}
//           <Box
//             mt={1}
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//             }}
//           >
//             <Button onClick={onClose}>Hủy</Button>
//             <Button
//               variant="contained"
//               sx={{ backgroundColor: "red" }}
//               onClick={handleSubmit}
//               disabled={isLoading}
//             >
//               Nhận đơn
//             </Button>
//           </Box>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default RecieveOrderForm;

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { useGetMyProfile } from "hooks/admin-users";

interface RecieveOrderModalProps {
  open: boolean;
  order: {
    orderId: string;
    demoImage: string;
    note?: string;
  } | null;
  onClose: () => void;
  onSubmit: (data: { status: string; image?: File }) => void; // status sẽ là tên user hiện tại
}

const getUserNameFromProfile = (profile: any): string => {
  if (!profile) return "Không xác định";
  const p = profile?.data ?? profile;

  return (
    p?.fullName ||
    p?.name ||
    p?.displayName ||
    p?.username ||
    p?.email ||
    (p?.firstName && p?.lastName ? `${p.firstName} ${p.lastName}` : "") ||
    "Không xác định"
  );
};

const RecieveOrderForm: React.FC<RecieveOrderModalProps> = ({
  open,
  order,
  onClose,
  onSubmit,
}) => {
  // giữ nguyên state/refs để không thay đổi giao diện/flow UI
  const [value] = useState(""); // trạng thái text (không dùng tới, để giữ nguyên interface)
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Gọi API lấy profile khi modal mở
  const { data: profileData, isLoading } = useGetMyProfile({ enabled: open });
  const userName = useMemo(
    () => getUserNameFromProfile(profileData),
    [profileData]
  );

  const handleSubmit = () => {
    if (!order) return;
    // Trả về status = tên user hiện tại => parent sẽ dùng làm issuePlace
    onSubmit({
      status: userName,
      image: undefined,
    });
  };

  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} sx={{ width: "flex" }}>
      <DialogTitle fontWeight="bold">Xác nhận nhận đơn hàng</DialogTitle>
      <DialogContent dividers>
        {/* --- PHẦN HIỂN THỊ NỘI DUNG --- */}
        <Box
          sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}
        >
          <Typography
            color="black"
            variant="h6"
            fontWeight={"bold"}
            gutterBottom
          >
            ĐƠN HÀNG CẦN VẼ 2D - {order.orderId}
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              mb: 2,
              mt: 2,
            }}
          >
            {/* THÔNG TIN YÊU CẦU */}
            <Box>
              <Typography color="black" fontWeight="bold">
                Thông tin yêu cầu
              </Typography>
              <Card
                variant="outlined"
                sx={{ borderRadius: "10px", height: "20vh" }}
              >
                <CardContent>
                  <Typography color="text.secondary">
                    {order.note ?? "Chưa có thông tin yêu cầu."}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* HÌNH ẢNH KHÁCH GỬI */}
            <Box>
              <Typography color="black" fontWeight="bold">
                Hình ảnh khách gửi
              </Typography>
              <Card variant="outlined" sx={{ borderRadius: "10px" }}>
                <CardContent>
                  <Box width={250}>
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "1px solid #ccc",
                      }}
                    >
                      <img
                        src={order.demoImage}
                        alt="Demo"
                        width={100}
                        height={100}
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Người nhận:</strong>{" "}
                  {isLoading ? "Đang tải..." : userName}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* FORM TRẠNG THÁI */}
          <Box
            mt={1}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={onClose}>Hủy</Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "red" }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Nhận đơn
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RecieveOrderForm;
