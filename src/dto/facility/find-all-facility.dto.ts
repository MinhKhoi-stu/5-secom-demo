import {PagingDto} from "dto/common";

export type FindAllFacilityDto = PagingDto & {
  facilityTypeId?: string;
  codeOrName?: string;
  page?: number;
  size?: number;
  sort?: string;
  issuePlace?: string;
};