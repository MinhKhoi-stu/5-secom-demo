import { dashboardAPI } from "api/dashboard";
import { StatisticAllFacilityDto } from "dto/dashboard/facility-statistic.dto";
import { useQuery } from "react-query";

export const useStatisticAllFacility = (
  orgUnitId: string,
  params?: Partial<StatisticAllFacilityDto>
) => {
  return useQuery<StatisticAllFacilityDto[]>({
    queryKey: ["STATISTIC_ALL_FACILITY", orgUnitId, params],
    queryFn: () => dashboardAPI.statisticAll(orgUnitId, params),
    keepPreviousData: true,
    staleTime: 0,
    onError: (error) => {
      console.error("Statistic all facility error:", error);
    },
    enabled: !!orgUnitId,
  });
};
