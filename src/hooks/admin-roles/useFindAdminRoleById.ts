import {adminRolesAPI} from "api/admin-roles";
import {AdminRoleDto} from "dto/admin-roles";
import { useQuery } from "react-query";


export const useFindAdminRoleById = (id: number, enabled: boolean = true) => {
  return useQuery<AdminRoleDto, Error>(
    ["FIND_ALL_ADMIN_ROLE", id], 
    () => adminRolesAPI.findOne(id),
    {
      enabled: !!id && enabled, 
    }
  );
};
