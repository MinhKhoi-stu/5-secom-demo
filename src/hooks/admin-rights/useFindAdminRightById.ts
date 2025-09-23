import {adminRightsAPI} from "api/admin-rights";
import {FindOneAdminRightByIdDto} from "dto/admin-rights/find-one-admin-right-by-id.dto";
import {useQuery} from "react-query";


export const useFindAdminRightById = (id: string, enabled: boolean = true) => {
  return useQuery<FindOneAdminRightByIdDto>({
    queryKey: ["FIND_ONE_ADMIN_RIGHT", id],
    queryFn: () => adminRightsAPI.findOneById(id),
    enabled: !!id && enabled,
  });
};
