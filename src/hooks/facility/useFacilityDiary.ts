import {facilityAPI} from "api/facility";
import {FacilityDiaryDto} from "dto/facility/facility-diary.dto";
import {useMutation} from "react-query";


// Hook gọi facility-diary bằng POST
export const useFacilityDiary = () => {
  return useMutation({
    mutationFn: (body: FacilityDiaryDto) => facilityAPI.facilityDiary(body),
  });
};
