import { optionAPI } from "api/option";
import { OptionGroupDto } from "dto/option-group/option-group.dto";
import { useQuery } from "react-query";

export const useFindOptionGroupByCodeOrName = (codeOrName: string, page: number,
  size: number) => {
  return useQuery<OptionGroupDto | undefined>({
    queryKey: ["FIND_OPTION_GROUP_BY_CODE_OR_NAME", codeOrName, page, size],
    queryFn: () => optionAPI.findOptionGroupByCodeOrName(codeOrName, page, size),
    enabled: !!codeOrName,
  });
};