import { useMutation, useQueryClient } from "react-query";
import { optionAPI } from "api/option";
import { CreateOptionDto } from "dto/option/create-option.dto";
import { OptionDto } from "dto/option/option.dto";
import { toast } from "react-toastify";
import { locales } from "utils/constants";

// export const useCreateOption = (
//   optionGroupId: string,
//   page: number,
//   size: number
// ) => {
//   const queryClient = useQueryClient();

//   return useMutation<OptionDto, unknown, CreateOptionDto>(
//     async (data: CreateOptionDto) => {
//       if (!data.optionGroup) {
//         data.optionGroup = { id: optionGroupId };
//       }

//       const res = await optionAPI.createOption(data);
//       return res;
//     },
//     {
//       onSuccess: () => {
//         toast(locales.createSuccess, { type: "success" });
//         queryClient.invalidateQueries([
//           "FIND_ALL_OPTION",
//           optionGroupId,
//           page,
//           size,
//         ]);
//       },
//     }
//   );
// };

export const useCreateOption = (
  optionGroupId: string,
  page: number,
  size: number
) => {
  const queryClient = useQueryClient();

  return useMutation<OptionDto | void, unknown, CreateOptionDto>(
    async (data: CreateOptionDto) => {
      if (!data.optionGroup) data.optionGroup = { id: optionGroupId };
      const res = await optionAPI.createOption(data);
      // res có thể undefined, nên return res hoặc undefined
      return res;
    },
    {
      onSuccess: (res) => {
        // res có thể undefined, nên check trước khi dùng
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
