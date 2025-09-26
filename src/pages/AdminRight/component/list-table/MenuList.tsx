// import React from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   TableContainer,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   CircularProgress,
//   IconButton,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";

// interface MenuListProps {
//   selectedRightId: string | null;
//   selectedRightLoading: boolean;
//   selectedRightError: boolean;
//   effectiveMenuNames: string[];
// }

// const MenuList: React.FC<MenuListProps> = ({
//   selectedRightId,
//   selectedRightLoading,
//   selectedRightError,
//   effectiveMenuNames,

// }) => {
//   return (
//     <Box
//       sx={{
//         bgcolor: "white",
//         p: 1,
//         height: "100%",
//         borderRadius: 2,
//         display: "flex",
//         flexDirection: "column",
//         gap: 2,
//         maxWidth: "220px",
//       }}
//     >
//       <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
//         <Typography variant="h6" color="black">
//           Quyền menu
//         </Typography>
//         <Button sx={{ backgroundColor: "lightsalmon", color: "black", fontSize: "15px" }}>
//           <AddIcon />
//         </Button>
//       </Box>

//       <TableContainer
//         component={Paper}
//         sx={{
//           maxHeight: 420,
//           minWidth: 0,
//           overflowX: "hidden",
//           overflowY: "auto",
//           scrollbarWidth: "none",
//           "&::-webkit-scrollbar": { display: "none" },
//         }}
//       >
//         <Table size="small" stickyHeader sx={{ tableLayout: "fixed", minWidth: 0 }}>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ width: "8%" }}>
//                 <b>STT</b>
//               </TableCell>
//               <TableCell sx={{ width: "50%", whiteSpace: "nowrap", overflow: "hidden" }}>
//                 <b>TÊN MENU</b>
//               </TableCell>
//               <TableCell align="center" sx={{ width: "12%" }}></TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {selectedRightLoading && (
//               <TableRow>
//                 <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
//                   <CircularProgress size={24} />
//                 </TableCell>
//               </TableRow>
//             )}

//             {!selectedRightLoading && !selectedRightError && effectiveMenuNames.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
//                   <Typography color="text.secondary">Không có menu để hiển thị</Typography>
//                 </TableCell>
//               </TableRow>
//             )}

//             {!selectedRightLoading &&
//               !selectedRightError &&
//               effectiveMenuNames.map((mName: string, idx: number) => (
//                 <TableRow key={`${String(selectedRightId ?? "all")}-menu-${idx}`} hover>
//                   <TableCell>{idx + 1}</TableCell>
//                   <TableCell sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
//                     <Typography variant="body1">{mName}</Typography>
//                   </TableCell>
//                   <TableCell align="center">
//                     <IconButton
//                       size="small"
//                       onClick={() => {
//                         console.log("Menu action for", mName);
//                       }}
//                     >
//                       <DeleteIcon fontSize="small" color="error" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default MenuList;

import React, { useMemo } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";


interface MenuListProps {
  selectedRightId: string | null;
  selectedRightData: any;
  resourceItems: any[];
}

const MenuList: React.FC<MenuListProps> = ({
  selectedRightId,
  selectedRightData,
  resourceItems,
}) => {
  const menuNames: string[] = useMemo(() => {
    if (!selectedRightData) return [];
    const menusCandidate = selectedRightData.menus || [];
    if (!Array.isArray(menusCandidate)) return [];
    const seen = new Set<string>();
    const result: string[] = [];
    menusCandidate.forEach((m: any) => {
      let val: string | null = null;
      if (typeof m === "string") val = m;
      else if (m) val = m.name ?? m.menuName ?? m.label ?? m.title ?? null;
      if (val && !seen.has(val)) {
        seen.add(val);
        result.push(val);
      }
    });
    return result;
  }, [selectedRightData]);

  const effectiveMenuNames: string[] = useMemo(() => {
    if (selectedRightId) return menuNames;
    const seen = new Set<string>();
    const result: string[] = [];
    resourceItems.forEach((res: any) => {
      const val = res.name ?? res.ten ?? res.code ?? "";
      if (val && !seen.has(val)) {
        seen.add(val);
        result.push(val);
      }
    });
    return result;
  }, [selectedRightId, menuNames, resourceItems]);

  return (
    // <Box>
    //   <Typography variant="h6" gutterBottom>
    //     Danh sách menu
    //   </Typography>
    //   <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
    //     <Table stickyHeader size="small">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>#</TableCell>
    //           <TableCell>Tên menu</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {effectiveMenuNames.map((menuName, idx) => (
    //           <TableRow key={menuName}>
    //             <TableCell>{idx + 1}</TableCell>
    //             <TableCell>{menuName}</TableCell>
    //           </TableRow>
    //         ))}
    //         {effectiveMenuNames.length === 0 && (
    //           <TableRow>
    //             <TableCell colSpan={2} align="center">
    //               Không có menu nào
    //             </TableCell>
    //           </TableRow>
    //         )}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </Box>
    <Box
      sx={{
        bgcolor: "white",
        p: 1,
        height: "100%",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "220px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <Typography variant="h6" color="black">
          Quyền menu
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

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 420,
          minWidth: 0,
          overflowX: "hidden",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Table
          size="small"
          stickyHeader
          sx={{ tableLayout: "fixed", minWidth: 0 }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "8%" }}>
                <b>STT</b>
              </TableCell>
              <TableCell
                sx={{ width: "50%", whiteSpace: "nowrap", overflow: "hidden" }}
              >
                <b>TÊN MENU</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "12%" }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {effectiveMenuNames.map((menuName, idx) => (
              <TableRow key={menuName} hover>
                <TableCell>{idx + 1}</TableCell>
                <TableCell
                  sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                >
                  <Typography variant="body1">{menuName}</Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => console.log("Xóa menu:", menuName)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {effectiveMenuNames.length === 0 && (
              <TableRow>
                <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    Không có menu nào
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MenuList;
