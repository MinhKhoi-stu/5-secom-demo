import {PagingDto} from "dto/common";
import {FacilityDto} from "./facility.dto";

export type FindAllFacilityDto = PagingDto & {
  facilityTypeId?: string;
  codeOrName?: string;
  page?: number;
  size?: number;
  sort?: string;
  // sort?: string[];
  // sort?: Array<string>;
  issuePlace?: string;
};