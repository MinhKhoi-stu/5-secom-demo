import { useMutation, useQueryClient } from "react-query";
import { optionAPI } from "api/option";
import { CreateOptionDto } from "dto/option/create-option.dto";
import { OptionDto } from "dto/option/option.dto";
import { toast } from "react-toastify";
import { locales } from "utils/constants";

export const useCreateOption = (
  optionGroupId: string,
  page: number,
  size: number
) => {
  const queryClient = useQueryClient();

  return useMutation<OptionDto | void, unknown, CreateOptionDto>(
    async (data: CreateOptionDto) => {
      if (!data.optionGroup) data.optionGroup = { id: optionGroupId };
      return await optionAPI.createOption(data);
    },
    {
      onSuccess: (res) => {
        console.log("onSuccess res:", res);
        toast(locales.createSuccess, { type: "success" });
        queryClient.invalidateQueries([
          "FIND_ALL_OPTION",
          optionGroupId,
          page,
          size,
        ]);
      },
      onError: (error) => {
        console.error("CreateOption failed:", error);
      },
    }
  );
};
