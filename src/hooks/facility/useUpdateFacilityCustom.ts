import { useMutation, useQueryClient } from "react-query";
import { facilityAPI } from "api/facility";
import { UpdateFacilityDto } from "dto/facility/update-facility.dto";
import { FacilityDto } from "dto/facility/facility.dto";

export type UpdatePayload = Partial<
  Omit<UpdateFacilityDto, "id" | "version">
> & {
  id: string;
  version: number;
  facilityTypeId?: string;
};

export const FACILITY_KEYS = {
  all: ["FIND_ALL_FACILITY"] as const,
  byId: (id: string) => [...FACILITY_KEYS.all, id] as const,
};

export function useUpdateFacilityCustom() {
  const queryClient = useQueryClient();

  return useMutation<FacilityDto, Error, UpdatePayload>(
    async (payload) => {
      const dtoPayload: any = { ...payload };

      if (payload.facilityTypeId) {
        dtoPayload.facilityType = { id: payload.facilityTypeId };
        delete dtoPayload.facilityTypeId;
      }

      dtoPayload.id = payload.id;
      dtoPayload.version = payload.version;

      const updateDto = dtoPayload as UpdateFacilityDto;

      const res = await facilityAPI.updateFacility(payload.id, updateDto);
      return res;
    },
    {
      onSuccess: (updatedFacility) => {
        queryClient.invalidateQueries(FACILITY_KEYS.all);
        if (updatedFacility?.id) {
          queryClient.invalidateQueries(FACILITY_KEYS.byId(updatedFacility.id));
        }
      },
    }
  );
}
