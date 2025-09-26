import { AdminRightDto } from "dto/admin-rights/admin-rights.dto";
import { CreateAdminRightDto } from "dto/admin-rights/create-admin-right.dto";
import { FindAllAdminRightDto } from "dto/admin-rights/find-all-admin-right.dto";
import { FindOneAdminRightByIdDto } from "dto/admin-rights/find-one-admin-right-by-id.dto";
import {UpdateRightMenuDto} from "dto/admin-rights/update-right-menu.dto";
import { UpdateRightPermissionDto } from "dto/admin-rights/update-right-permission.dto";
import { DefaultResponseDto, PagingDataDto } from "dto/common";
import axiosClient from "utils/axios-client";

export const adminRightsAPI = {
  create(createAdminRightDto: CreateAdminRightDto): Promise<AdminRightDto> {
    return axiosClient.post("right", createAdminRightDto);
  },
  findAll(
    findAllAdminRightDto: FindAllAdminRightDto
  ): Promise<PagingDataDto<AdminRightDto>> {
    return axiosClient.get("right/find", { params: findAllAdminRightDto });
  },
  findOne(roleId: string): Promise<AdminRightDto> {
    return axiosClient.get("right/find", { params: { roleId } });
  },
  findOneById(id: string): Promise<FindOneAdminRightByIdDto> {
    return axiosClient.get(`right/${id}`);
  },
  delete(id: string, version: number): Promise<DefaultResponseDto> {
    return axiosClient.delete("right", {
      params: { id, version },
    });
  },
  updateRightPermission(
    id: string,
    updateRightPermissionDto: UpdateRightPermissionDto
  ): Promise<AdminRightDto> {
    return axiosClient.put("right/permission", updateRightPermissionDto);
  },
  updateRightMenu(
    id: string,
    updateRightMenuDto: UpdateRightMenuDto
  ): Promise<AdminRightDto> {
    return axiosClient.put("right/menu", updateRightMenuDto);
  },
};
