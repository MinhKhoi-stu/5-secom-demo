import { PagingDataDto } from "dto/common";
import { StatisticAllFacilityDto } from "dto/dashboard/facility-statistic.dto";
import { FacilityDto } from "dto/facility/facility.dto";
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
