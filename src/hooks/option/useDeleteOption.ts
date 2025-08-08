import { optionAPI } from "api/option";
import { useMutation, useQueryClient } from "react-query";
import {toast} from "react-toastify";
import {locales} from "utils/constants";

export const useDeleteOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, version }: { id: string; version: number }) =>
      optionAPI.deleteOption(id, version),
    onSuccess: () => {
      toast(locales.deleteSuccess, { type: "success" });
      queryClient.invalidateQueries({ queryKey: ["FIND_ALL_OPTION"] });
    },
    onError: () => {},
  });
};
