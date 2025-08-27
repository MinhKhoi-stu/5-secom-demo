import { facilityAPI } from "api/facility";
import { PagingDataDto } from "dto/common";
import { FacilityDto } from "dto/facility/facility.dto";
import { FindAllFacilityDto } from "dto/facility/find-all-facility.dto";
import { useQuery } from "react-query";

type UseFindAllFacilityOptions = {
  enabled?: boolean;
};

export const useFindAllFacility = (
  params: any,
  options?: UseFindAllFacilityOptions
) => {
  const {
    page = 0,
    size = 10,
    codeOrName = "",
    facilityTypeId,
    sort,
    issuePlace,
  } = params;

  // Nếu caller không truyền explicit options.enabled, mặc định chỉ enable khi facilityTypeId hợp lệ.
  const enabled =
    typeof options?.enabled === "boolean"
      ? options!.enabled
      : facilityTypeId !== undefined &&
        facilityTypeId !== null &&
        facilityTypeId !== "";

  const sortParams = Array.isArray(sort)
    ? sort.map((s) => `sort=${encodeURIComponent(s)}`).join("&")
    : sort
    ? `sort=${encodeURIComponent(sort)}`
    : "";

  const queryString = `page=${page}&size=${size}&${sortParams}&facilityTypeId=${facilityTypeId}&issuePlace=${issuePlace}`;
  return useQuery<any>({
    queryKey: [
      "FIND_ALL_FACILITY",
      page,
      size,
      codeOrName,
      facilityTypeId,
      issuePlace,
    ],
    queryFn: () => facilityAPI.findAllCustom(queryString),
    keepPreviousData: true,
    // staleTime: 0,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled,
    onError: (error) => {
      console.error("Find all facility error:", error);
    },
  });
};

export default useFindAllFacility;
