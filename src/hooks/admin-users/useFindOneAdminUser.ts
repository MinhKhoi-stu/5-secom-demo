import {adminUsersAPI} from "api/admin-users";
import {AdminUserDto} from "dto/admin-users";
import {useQuery} from "react-query";

export const QUERY_KEY = {
  FIND_ONE: "FIND_ONE_ADMIN_USER",
};

export function useFindOneAdminUser(id: number) {
  return useQuery<AdminUserDto>({
    queryKey: [QUERY_KEY.FIND_ONE, id],
    queryFn: () => adminUsersAPI.findOne(id),
    enabled: !!id,
    staleTime: 1000 * 30,
  });
}
