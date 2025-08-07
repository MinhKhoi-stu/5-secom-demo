import axiosClient from "utils/axios-client";
import { PagingDataDto } from "dto/common";
import {OptionGroupDto} from "dto/option-group/option-group.dto";
import {FindAllOptionDto} from "dto/option/find-all-option.dto";
import {OptionDto} from "dto/option/option.dto";

export const optionAPI = {
  findOptionGroups(): Promise<OptionGroupDto[]> {
    return axiosClient.get("option-group/find");
  },
  findOptionsByGroup(
    params: FindAllOptionDto
  ): Promise<PagingDataDto<OptionDto>> {
    return axiosClient.get("option/find", { params });
  },
};
