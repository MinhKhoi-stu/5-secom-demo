import axiosClient from "utils/axios-client";
import { DefaultResponseDto, PagingDataDto } from "dto/common";
import { OptionGroupDto } from "dto/option-group/option-group.dto";
import { FindAllOptionDto } from "dto/option/find-all-option.dto";
import { OptionDto } from "dto/option/option.dto";
import { CreateOptionDto } from "dto/option/create-option.dto";
import { UpdateOptionDto } from "dto/option/update-option.dto";
import axios from "axios";

export const optionAPI = {
  findOptionGroups(): Promise<OptionGroupDto[]> {
    return axiosClient.get("option-group/find");
  },
  findOptionsByGroup(
    params: FindAllOptionDto
  ): Promise<PagingDataDto<OptionDto>> {
    return axiosClient.get("option/find", { params });
  },
  findOptionGroupByCodeOrName(
    codeOrName: string,
    page?: number,
    size?: number
  ): Promise<OptionGroupDto> {
    return axiosClient.get("option-group/find", {
      params: { codeOrName, page, size },
    });
  },
  createOption(data: CreateOptionDto): Promise<OptionDto> {
    return axiosClient.post<OptionDto>("option", data).then((res) => res.data);
  },
  // createOption: async (data: CreateOptionDto) => {
  //   const response = await axiosClient.post("option", data);
  //   console.log("📦 Full response từ axiosClient:", response);
  //   return response.data;
  // },

  updateOption(data: UpdateOptionDto): Promise<OptionDto> {
    return axiosClient.patch<OptionDto>("option", data).then((res) => res.data);
  },
  deleteOption(id: string, version: number): Promise<DefaultResponseDto> {
    // return axiosClient.delete(`option/${id}`);
    return axiosClient.delete("option", {
      params: { id, version },
    });
  },
};
