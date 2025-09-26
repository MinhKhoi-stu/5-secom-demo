import { StatisticAllFacilityDto } from "dto/dashboard/facility-statistic.dto";
import axiosClient from "utils/axios-client";

export const dashboardAPI = {
  statisticAll(
    orgUnitId: string,
    params?: Partial<StatisticAllFacilityDto>
  ): Promise<any> {
    return axiosClient.post(`dashboard/facility-statistic/${orgUnitId}`, {
      params,
    });
  },
};
