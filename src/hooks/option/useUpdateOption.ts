import { UpdateOptionDto } from "dto/option/update-option.dto";
import { OptionDto } from "dto/option/option.dto";
import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { optionAPI } from "api/option";
import { QUERY_KEY } from "utils/enums";
import { toast } from "react-toastify";
import { locales } from "utils/constants";

export const useUpdateOption = (): UseMutationResult<
  OptionDto,
  unknown,
  UpdateOptionDto
> => {
  const queryClient = useQueryClient();
  return useMutation<OptionDto, unknown, UpdateOptionDto>({
    mutationFn: (data: UpdateOptionDto) => optionAPI.updateOption(data),
    onSuccess: (data) => {
      // console.log("Update option success:", data);
      toast(locales.updateSuccess, { type: "success" });
      queryClient.invalidateQueries(QUERY_KEY.FIND_ALL_OPTION);
    },
    onError: (error) => {
      console.error("Update option error:", error);
      // Ví dụ: hiển thị toast lỗi
    },
  });
};
