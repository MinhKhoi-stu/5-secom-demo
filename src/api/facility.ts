import { PagingDataDto } from "dto/common";
import { CreateFacilityDto } from "dto/facility/create-facility.dto";
import { FacilityDto } from "dto/facility/facility.dto";
import { FindAllFacilityDto } from "dto/facility/find-all-facility.dto";
import {UpdateFacilityDto} from "dto/facility/update-facility.dto";
import axiosClient from "utils/axios-client";

export const facilityAPI = {
  findAll(
    findAllFacilityDto: FindAllFacilityDto
  ): Promise<PagingDataDto<FacilityDto>> {
    return axiosClient.get("facility/find", { params: findAllFacilityDto });
  },
  findAllCustom(
    // findAllFacilityDto: FindAllFacilityDto
    queryString: string,
  ): Promise<PagingDataDto<FacilityDto>> {
    return axiosClient.get(`facility/find?${queryString}`);
  },
  // createFacility(
  //   createFacilityDto: CreateFacilityDto
  // ): Promise<PagingDataDto<FacilityDto>> {
  //   return axiosClient.post("facility", { params: createFacilityDto });
  // },
  createFacility(createFacilityDto: CreateFacilityDto) {
    return axiosClient
      .post("facility", createFacilityDto)
      .then((res) => res.data);
  },
  updateFacility(id: string, data: UpdateFacilityDto) : Promise<FacilityDto>{
    return axiosClient.patch<FacilityDto>("facility", data).then((res) => res.data);
  },
};
