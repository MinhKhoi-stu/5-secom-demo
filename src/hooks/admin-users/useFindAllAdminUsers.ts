// import { AdminUserDto } from "dto/admin-users";
// import { PagingDataDto } from "dto/common";
// import axiosClient from "utils/axios-client";
import { ADMIN_USER_STATUS } from "utils/enums";

// import {adminUsersAPI} from "api/admin-users";
// import {useQuery} from "react-query";
import axiosClient from "utils/axios-client";
import { PagingDataDto } from "dto/common";
import { AdminUserDto } from "dto/admin-users";

export type FindAllAdminUserDto = {
  pageIndex?: number;
  pageSize?: number;
  keyword?: string;
  status?: ADMIN_USER_STATUS[] | ADMIN_USER_STATUS;
};

export const useAllAdminUsers = async (
  params: FindAllAdminUserDto
): Promise<PagingDataDto<AdminUserDto>> => {
  const response = await axiosClient.get("user/find", { params });
  // console.log("ccccccccccccccccccccccccccccccccccccccccccccccccccc", response);
  return response.content;
  // return response.data;
  // return response.data?.content || [];
};

// export const useAllAdminUsers = (params: FindAllAdminUserDto) => {
//   return useQuery({
//     queryKey: ["FIND_ALL_ADMIN_USERS", params],
//     queryFn: async (): Promise<PagingDataDto<AdminUserDto>> => {
//       const response = await axiosClient.get("user/find", { params });
//       return response.data;
//     },
//   });
// };
