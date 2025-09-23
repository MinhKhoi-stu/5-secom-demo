import { useQuery, UseQueryOptions } from "react-query";
import { PagingDataDto } from "dto/common";
import { ResourceDto } from "dto/resource/resource.dto";
import { FindAllResourceDto } from "dto/resource/find-all-resource.dto";
import { resourceAPI } from "api/resource";

export const QUERY_KEY = {
  FIND_ALL: "FIND_ALL_RESOURCE",
};

export function useFindAllResource(
  params: FindAllResourceDto = { page: 0, size: 0 },
  options?: UseQueryOptions<PagingDataDto<ResourceDto>>
) {
  return useQuery<PagingDataDto<ResourceDto>>({
    queryKey: [QUERY_KEY.FIND_ALL, params],
    queryFn: () => resourceAPI.findAll(params),
    cacheTime: 0,
    staleTime: 0,
    ...options,
  });
}
