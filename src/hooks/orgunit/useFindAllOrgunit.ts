import {orgUnitAPI} from "api/orgunit";
import {PagingDataDto} from "dto/common";
import {FindAllOrgunitDto} from "dto/orgunit/find-all-orgunit.dto";
import {OrgunitDto} from "dto/orgunit/orgunit.dto";
import { useQuery } from "react-query";


export const useFindAllOrgunit = (params: FindAllOrgunitDto) => {
  return useQuery<PagingDataDto<OrgunitDto>, Error>(
    ["FIND_ALL_ORGUNIT", params],
    () => orgUnitAPI.findAll(params),
    {
      keepPreviousData: true,
      // staleTime: 5 * 60 * 1000,
      staleTime: 0,
    }
  );
};
