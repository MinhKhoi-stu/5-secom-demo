import { facilityAPI } from "api/facility";
import { PagingDataDto } from "dto/common";
import { FacilityDto } from "dto/facility/facility.dto";
import { FindAllFacilityDto } from "dto/facility/find-all-facility.dto";
import { useQuery } from "react-query";

export const useFindAllFacility = (params: FindAllFacilityDto) => {
  const {
    page = 0,
    size = 10,
    codeOrName = "",
    facilityTypeId,
    sort,
    issuePlace,
  } = params;

  return useQuery<PagingDataDto<FacilityDto>>({
    queryKey: [
      "FIND_ALL_FACILITY",
      page,
      size,
      codeOrName,
      facilityTypeId,
      issuePlace,
    ],
    queryFn: () =>
      facilityAPI.findAll({
        page,
        size,
        codeOrName,
        facilityTypeId,
        sort: sort || "",
        issuePlace,
      }),
    keepPreviousData: true,
    staleTime: 0,
    onError: (error) => {
      console.error("Find all facility error:", error);
    },
  });
};

// import { facilityAPI } from "api/facility";
// import { PagingDataDto } from "dto/common";
// import { FacilityDto } from "dto/facility/facility.dto";
// import { FindAllFacilityDto } from "dto/facility/find-all-facility.dto";
// import { useQuery } from "react-query";

// type UseFindAllFacilityOptions = {
//   enabled?: boolean;
// };

// export const useFindAllFacility = (
//   params: FindAllFacilityDto,
//   options?: UseFindAllFacilityOptions
// ) => {
//   const {
//     page = 0,
//     size = 10,
//     codeOrName = "",
//     facilityTypeId,
//     sort,
//     issuePlace,
//   } = params;

//   // Nếu caller không truyền explicit options.enabled, mặc định chỉ enable khi facilityTypeId hợp lệ.
//   const enabled =
//     typeof options?.enabled === "boolean"
//       ? options!.enabled
//       : facilityTypeId !== undefined &&
//         facilityTypeId !== null &&
//         facilityTypeId !== "";

//   return useQuery<PagingDataDto<FacilityDto>>({
//     queryKey: [
//       "FIND_ALL_FACILITY",
//       page,
//       size,
//       codeOrName,
//       facilityTypeId,
//       issuePlace,
//     ],
//     queryFn: () =>
//       facilityAPI.findAll({
//         page,
//         size,
//         codeOrName,
//         facilityTypeId,
//         sort,
//         issuePlace,
//       }),
//     keepPreviousData: true,
//     staleTime: 0,
//     enabled,
//     onError: (error) => {
//       console.error("Find all facility error:", error);
//     },
//   });
// };

// export default useFindAllFacility;
