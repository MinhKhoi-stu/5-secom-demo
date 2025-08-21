import { PagingDataDto } from "dto/common";
import { FindAllOrgunitDto } from "dto/orgunit/find-all-orgunit.dto";
import { OrgunitDto } from "dto/orgunit/orgunit.dto";
import { SearchOrgunitDto } from "dto/orgunit/search-orgunit.dto";
import axiosClient from "utils/axios-client";

export const orgUnitAPI = {
  findAll(
    findAllOrgunitDto: FindAllOrgunitDto
  ): Promise<PagingDataDto<OrgunitDto>> {
    return axiosClient.get(`org-unit/find`, { params: findAllOrgunitDto });
  },
  search(params: Partial<SearchOrgunitDto>): Promise<any> {
    return axiosClient.get(`org-unit/search`, { params });
  },
};
