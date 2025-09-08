// hooks/orgunit/useOrgunitTree.ts
import {orgUnitAPI} from "api/orgunit";
import {TreeOrgunitDto} from "dto/orgunit/tree-orgunit.dto";
import { useQuery } from "react-query";

export const ORGUNIT_TREE_QUERY_KEY = "orgunit-tree";

export function useOrgunitTree(params?: Partial<TreeOrgunitDto>) {
  return useQuery<TreeOrgunitDto[], Error>(
    [ORGUNIT_TREE_QUERY_KEY, params],
    async () => {
      const res = await orgUnitAPI.tree(params ?? {});
      return res.data;
    },
    {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
    }
  );
}
