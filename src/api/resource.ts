import {PagingDataDto} from "dto/common";
import {FindAllResourceDto} from "dto/resource/find-all-resource.dto";
import {ResourceDto} from "dto/resource/resource.dto";
import axiosClient from "utils/axios-client";

export const resourceAPI = {
  findAll(
    findAllResourceDto: FindAllResourceDto
  ): Promise<PagingDataDto<ResourceDto>> {
    return axiosClient.get("resource/find", { params: findAllResourceDto });
  },
}