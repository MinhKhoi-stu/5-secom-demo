import {
  AdminRoleCompactDto,
  AdminRoleDto,
  CreateAdminRoleDto,
  FindAllAdminRoleDto,
  UpdateAdminRoleDto,
} from "dto/admin-roles";
import {UpdateRightOfRoleDto} from "dto/admin-roles/update-right-of-role.dto";
import { DefaultResponseDto, PagingDataDto } from "dto/common";
import axiosClient from "utils/axios-client";

export const adminRolesAPI = {
  create(createAdminRoleDto: CreateAdminRoleDto): Promise<AdminRoleDto> {
    return axiosClient.post("role", createAdminRoleDto);
  },
  findAll(
    findAllAdminRoleDto: FindAllAdminRoleDto
  ): Promise<PagingDataDto<AdminRoleDto>> {
    return axiosClient.get("role/find", { params: findAllAdminRoleDto });
  },
  findAllCompact(
    findAllAdminRoleDto: FindAllAdminRoleDto
  ): Promise<PagingDataDto<AdminRoleCompactDto>> {
    return axiosClient.get("admin-roles/compact", {
      params: findAllAdminRoleDto,
    });
  },
  findOne(id: number): Promise<AdminRoleDto> {
    return axiosClient.get(`role/${id}`);
  },
  update(
    id: string,
    updateAdminRoleDto: UpdateAdminRoleDto
  ): Promise<AdminRoleDto> {
    return axiosClient.patch("role", updateAdminRoleDto);
  },

  updateRightOfRole(
    id: string,
    updateRightOfRoleDto: UpdateRightOfRoleDto
  ): Promise<AdminRoleDto> {
    return axiosClient.put("role/right", updateRightOfRoleDto);
  },

  delete(id: string, version: number): Promise<DefaultResponseDto> {
    return axiosClient.delete("role", {
      params: { id, version },
    });
  },
};
