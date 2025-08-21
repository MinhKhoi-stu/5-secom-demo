import { facilityAPI } from "api/facility";
import { PagingDataDto } from "dto/common";
import { FacilityDto } from "dto/facility/facility.dto";
import { FindAllFacilityDto } from "dto/facility/find-all-facility.dto";
import { useQuery } from "react-query";

export const useFindAllFacility = (params: FindAllFacilityDto) => {
  const { page = 0, size = 10, codeOrName = "", facilityTypeId, sort } = params;

  return useQuery<PagingDataDto<FacilityDto>>({
    queryKey: ["FIND_ALL_FACILITY", page, size, codeOrName, facilityTypeId],
    queryFn: () =>
      facilityAPI.findAll({ page, size, codeOrName, facilityTypeId, sort: sort || "" }),
    keepPreviousData: true,
    staleTime: 0,
    onError: (error) => {
      console.error("Find all facility error:", error);
    },
  });
};
