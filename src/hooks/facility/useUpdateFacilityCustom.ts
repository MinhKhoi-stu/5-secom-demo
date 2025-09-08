// import { useMutation, useQueryClient } from "react-query";
// import { facilityAPI } from "api/facility";
// import { UpdateFacilityDto } from "dto/facility/update-facility.dto";
// import { FacilityDto } from "dto/facility/facility.dto";

// /**
//  * Input we accept when updating:
//  * - client chỉ cần gửi các field muốn thay đổi (partial),
//  * - nhưng **bắt buộc** phải có id + version để backend kiểm tra optimistic lock.
//  */
// export type UpdatePayload = Partial<
//   Omit<UpdateFacilityDto, "id" | "version">
// > & {
//   id: string;
//   version: number;
// };

// export const FACILITY_KEYS = {
//   all: ["FIND_ALL_FACILITY"] as const,
//   byId: (id: string) => [...FACILITY_KEYS.all, id] as const,
// };

// export function useUpdateFacilityCustom() {
//   const queryClient = useQueryClient();

//   return useMutation<FacilityDto, Error, UpdatePayload>(
//     async (payload) => {
//       // facilityAPI.updateFacility sẽ gọi PATCH /facility/{id}
//       const res = await facilityAPI.updateFacility(payload.id, payload as UpdateFacilityDto);
//       return res;
//     },
//     {
//       onSuccess: (updatedFacility) => {
//         // invalidate list + byId
//         queryClient.invalidateQueries(FACILITY_KEYS.all);
//         if (updatedFacility?.id) {
//           queryClient.invalidateQueries(FACILITY_KEYS.byId(updatedFacility.id));
//         }
//       },
//     }
//   );
// }

// hooks/facility/useUpdateFacilityCustom.ts
import { useMutation, useQueryClient } from "react-query";
import { facilityAPI } from "api/facility";
import { UpdateFacilityDto } from "dto/facility/update-facility.dto";
import { FacilityDto } from "dto/facility/facility.dto";

export type UpdatePayload = Partial<
  Omit<UpdateFacilityDto, "id" | "version">
> & {
  id: string;
  version: number;
  /** convenience: cho phép truyền facilityTypeId thay vì facilityType:{id} */
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
      // Tạo bản sao mutable của payload để chuẩn hóa trước khi gửi
      const dtoPayload: any = { ...payload };

      // Nếu caller gửi facilityTypeId -> chuyển thành facilityType: { id: ... }
      if (payload.facilityTypeId) {
        dtoPayload.facilityType = { id: payload.facilityTypeId };
        // xóa field tạm nếu muốn (không bắt buộc nhưng để payload match UpdateFacilityDto)
        delete dtoPayload.facilityTypeId;
      }

      // Một số caller có thể đã truyền facilityType: { id } trực tiếp -> dtoPayload giữ nguyên
      // Bảo đảm id + version vẫn có mặt (UpdateFacilityDto yêu cầu)
      dtoPayload.id = payload.id;
      dtoPayload.version = payload.version;

      // Cast an toàn sang UpdateFacilityDto (thực tế chúng ta đã chuẩn hóa các field cần thiết)
      const updateDto = dtoPayload as UpdateFacilityDto;

      // Gọi API update (facilityAPI.updateFacility signature: (id, UpdateFacilityDto))
      const res = await facilityAPI.updateFacility(payload.id, updateDto);
      return res;
    },
    {
      onSuccess: (updatedFacility) => {
        // invalidate list + byId
        queryClient.invalidateQueries(FACILITY_KEYS.all);
        if (updatedFacility?.id) {
          queryClient.invalidateQueries(FACILITY_KEYS.byId(updatedFacility.id));
        }
      },
    }
  );
}
