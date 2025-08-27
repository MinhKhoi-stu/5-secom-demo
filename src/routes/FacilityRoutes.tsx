// // src/routes/FacilityRoute.tsx
// import React, { Suspense } from "react";
// import { useParams } from "react-router-dom";
// import MainFulfillment from "pages/Fulfillment/component/Main/MainFulfillment";
// // MainPage (RecieveOrder) có thể lazy load để giữ behaviour cũ
// const MainPage = React.lazy(() => import("pages/RecieveOrder"));

// const MAIN_FULFILLMENT_TYPECODE = "facility-add-multiple-row";

// const FacilityRoute: React.FC = () => {
//   const params = useParams<{ typeCode?: string }>();
//   const raw = params.typeCode ?? "";

//   let typeCode = "";
//   try {
//     typeCode = raw ? decodeURIComponent(raw) : "";
//   } catch {
//     typeCode = raw;
//   }

//   // nếu không có typeCode -> giữ behavior cũ: render MainFulfillment
//   if (!typeCode) return <MainFulfillment />;

//   if (typeCode === MAIN_FULFILLMENT_TYPECODE) {
//     return <MainFulfillment />;
//   }

//   // các typeCode khác (ví dụ facility-cutting, facility-drawing, ...) -> MainPage (ReceiveOrder)
//   return (
//     <Suspense fallback={<div>Đang tải...</div>}>
//       <MainPage />
//     </Suspense>
//   );
// };

// export default FacilityRoute;
