
import { optionAPI } from "api/option";
import { OptionGroupDto } from "dto/option-group/option-group.dto";
import {useQuery} from "react-query";

export const useFindOptionGroup = () => {
  return useQuery<OptionGroupDto[]>({
    queryKey: ["FIND_ALL_OPTION_GROUP"],
    queryFn: () => optionAPI.findOptionGroups(),
  });
};
