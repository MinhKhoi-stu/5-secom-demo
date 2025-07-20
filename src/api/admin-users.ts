import {
  AdminUserDto,
  UpdateMyProfileDto,
  UpdateMyPasswordDto,
  CreateAdminUserDto,
  FindAllAdminUserDto,
  UpdateAdminUserDto,
} from "dto/admin-users";
import { DefaultResponseDto, PagingDataDto } from "dto/common";
import axiosClient from "utils/axios-client";

export const adminUsersAPI = {
  getMyProfile(): Promise<AdminUserDto> {
    return axiosClient.get("admin-users/me");
  },
  updateMyProfile(
    updateMyProfileDto: UpdateMyProfileDto
  ): Promise<AdminUserDto> {
    return axiosClient.put("admin-users/me", updateMyProfileDto);
  },
  updateMyPassword(
    updateMyPasswordDto: UpdateMyPasswordDto
  ): Promise<DefaultResponseDto> {
    return axiosClient.put("admin-users/me/password", updateMyPasswordDto);
  },
  create(createAdminUserDto: CreateAdminUserDto): Promise<AdminUserDto> {
    return axiosClient.post("admin-users", createAdminUserDto);
  },
  findAll(
    findAllAdminUserDto: FindAllAdminUserDto
  ): Promise<PagingDataDto<AdminUserDto>> {
    return axiosClient.get("admin-users", { params: findAllAdminUserDto });
  },
  findOne(id: number): Promise<AdminUserDto> {
    return axiosClient.get(`admin-users/${id}`);
  },
  update(
    id: number,
    updateAdminUserDto: UpdateAdminUserDto
  ): Promise<AdminUserDto> {
    return axiosClient.put(`admin-users/${id}`, updateAdminUserDto);
  },
  delete(id: number): Promise<DefaultResponseDto> {
    return axiosClient.delete(`admin-users/${id}`);
  },
};
