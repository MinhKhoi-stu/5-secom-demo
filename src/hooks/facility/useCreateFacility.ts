import { useMutation, useQueryClient } from "react-query";
import {toast} from "react-toastify";
import {locales} from "utils/constants";
import {CreateFacilityDto} from "dto/facility/create-facility.dto";
import {facilityAPI} from "api/facility";

export function useCreateFacility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFacilityDto) => facilityAPI.createFacility(data),
    onSuccess: () => {
      toast(locales.createSuccess, { type: "success" });
      queryClient.invalidateQueries({ queryKey: ["FIND_ALL_FACILITY"] });
    },
  });
}
