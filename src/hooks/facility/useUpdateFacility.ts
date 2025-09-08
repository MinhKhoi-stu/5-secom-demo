// hooks/facility/useUpdateFacility.ts
import { useMutation, useQueryClient } from "react-query";
import { UpdateFacilityDto } from "dto/facility/update-facility.dto";
import { FacilityDto } from "dto/facility/facility.dto";
import { facilityAPI } from "api/facility";

export const FACILITY_KEYS = {
  all: ["FIND_ALL_FACILITY"] as const,
  byId: (id: string) => [...FACILITY_KEYS.all, id] as const,
};

export function useUpdateFacility() {
  const queryClient = useQueryClient();

  return useMutation<
    FacilityDto,
    Error,
    { id: string; data: UpdateFacilityDto }
  >(({ id, data }) => facilityAPI.updateFacility(id, data), {
    onSuccess: (updatedFacility) => {
      queryClient.invalidateQueries(FACILITY_KEYS.all);
      if (updatedFacility?.id) {
        queryClient.invalidateQueries(FACILITY_KEYS.byId(updatedFacility.id));
      }
    },
  });
}

