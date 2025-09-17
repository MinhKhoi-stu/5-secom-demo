import {AdminRightDto} from "dto/admin-rights/admin-rights.dto";
import {FindAllAdminRightDto} from "dto/admin-rights/find-all-admin-right.dto";
import {PagingDataDto} from "dto/common";
import axiosClient from "utils/axios-client";

export const adminRightsAPI = {
//   create(createAdminRoleDto: CreateAdminRoleDto): Promise<AdminRoleDto> {
//     return axiosClient.post("admin-roles", createAdminRoleDto);
//   },
  findAll(
    findAllAdminRightDto: FindAllAdminRightDto
  ): Promise<PagingDataDto<AdminRightDto>> {
    return axiosClient.get("right/find", { params: findAllAdminRightDto });
  },
  findOne(roleId: string): Promise<AdminRightDto> {
    return axiosClient.get("right/find", {params: {roleId}});
  },
}