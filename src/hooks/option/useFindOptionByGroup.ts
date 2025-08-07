import { optionAPI } from "api/option";
import { OptionDto } from "dto/option/option.dto";
import { PagingDataDto } from "dto/common";
import { useQuery } from "react-query";

export const useFindOptionsByGroup = (
  optionGroupCode: string,
  // codeOrName: string,
  // page = 1,
  // limit = 50
  page: number,
  size: number
) => {
  return useQuery<PagingDataDto<OptionDto>>({
    queryKey: ["FIND_ALL_OPTION", optionGroupCode, page, size],
    // queryKey: ["FIND_ALL_OPTION", codeOrName, page, size],
    queryFn: () =>
      optionAPI.findOptionsByGroup({ optionGroupCode, page, size }),
      // optionAPI.findOptionsByGroup({ codeOrName, page, size }),

    enabled: !!optionGroupCode,
    // enabled: !!codeOrName,
    keepPreviousData: true,
  });
};
