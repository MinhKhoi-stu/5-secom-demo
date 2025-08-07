import {
  AdminRoleCompactDto,
  AdminRoleDto,
  CreateAdminRoleDto,
  FindAllAdminRoleDto,
  UpdateAdminRoleDto,
} from "dto/admin-roles";
import { DefaultResponseDto, PagingDataDto } from "dto/common";
import axiosClient from "utils/axios-client";

export const adminRolesAPI = {
  create(createAdminRoleDto: CreateAdminRoleDto): Promise<AdminRoleDto> {
    return axiosClient.post("admin-roles", createAdminRoleDto);
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
    return axiosClient.get(`admin-roles/${id}`);
  },
  update(
    id: number,
    updateAdminRoleDto: UpdateAdminRoleDto
  ): Promise<AdminRoleDto> {
    return axiosClient.put(`admin-roles/${id}`, updateAdminRoleDto);
  },
  delete(id: number): Promise<DefaultResponseDto> {
    return axiosClient.delete(`admin-roles/${id}`);
  },
};
