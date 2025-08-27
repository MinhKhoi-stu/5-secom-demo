import { optionAPI } from "api/option";
import { useQuery } from "react-query";

export const useFindOptionsByGroup = (
  optionGroupCode: string,
  page?: number,
  size?: number,
  codeOrName?: string,
  sort?: string,
  parentId?: string, 
) => {
  return useQuery(
    ["FIND_ALL_OPTION", optionGroupCode, page, size, codeOrName, sort, parentId],
    () =>
      optionAPI.findOptionsByGroup({
        optionGroupCode,
        page: page || 0,
        size: size || 10,
        codeOrName: codeOrName || "",
        sort: sort || "",
        parentId: parentId || "",
      }),
    { keepPreviousData: true }
  );
};
