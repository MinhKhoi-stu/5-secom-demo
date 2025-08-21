// hooks/orgunit/useSearchOrgunit.ts
import { useQuery } from "react-query";
import { orgUnitAPI } from "api/orgunit";
import { SearchOrgunitDto } from "dto/orgunit/search-orgunit.dto";

export const useSearchOrgunit = (params: Partial<SearchOrgunitDto>) => {
  return useQuery(
    ["searchOrgunit", params],
    () => orgUnitAPI.search(params as unknown as SearchOrgunitDto),
    {
      enabled: !!params && Object.keys(params).length > 0,
    }
  );
};
