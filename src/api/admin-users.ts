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
    return axiosClient.get("user/login-info");
  },
  updateMyProfile(
    updateMyProfileDto: UpdateMyProfileDto
  ): Promise<AdminUserDto> {
    return axiosClient.put("admin-users/me", updateMyProfileDto);
  },
  //
  updateMyPassword(
    updateMyPasswordDto: UpdateMyPasswordDto
  ): Promise<DefaultResponseDto> {
    return axiosClient.put("user/change-password", updateMyPasswordDto);
  },
  create(createAdminUserDto: CreateAdminUserDto): Promise<AdminUserDto> {
    return axiosClient.post("user", createAdminUserDto);
  },
  findAll(
    findAllAdminUserDto: FindAllAdminUserDto
  ): Promise<PagingDataDto<AdminUserDto>> {
    return axiosClient.get("user/find", { params: findAllAdminUserDto });
  },
  findOne(id: number): Promise<AdminUserDto> {
    return axiosClient.get(`user/find/${id}`);
  },
  update(
    // id: number,
    id: string,
    updateAdminUserDto: UpdateAdminUserDto
  ): Promise<AdminUserDto> {
    // return axiosClient.patch(`user/${id}`, updateAdminUserDto);
    return axiosClient.patch(`user`, updateAdminUserDto);
  },
  delete(id: string, version: number): Promise<DefaultResponseDto> {
    // return axiosClient.delete(`user/${id}`);
    return axiosClient.delete("user", {
      params: { id, version },
    });
  },
};
