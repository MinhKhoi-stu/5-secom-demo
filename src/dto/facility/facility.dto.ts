// dto/facility.dto.ts
import { OrgunitDto } from "dto/orgunit/orgunit.dto";
import { FacilityTypeDto } from "./facility-type.dto";
import { SkuOptDto } from "./sku-opt.dto";
import { StateOptDto } from "./state-opt.dto";

export interface FacilityDto {

  version: number;
  createdBy: string;
  updatedBy?: string | null;
  createdDate: string;
  updatedDate?: string | null;

  id: string;
  code: string;
  name: string;

  address: string;
  phone: string;
  email?: string | null;

  lat?: number | null;
  lon?: number | null;

  area: number;
  areaAdmin?: string | null;

  idNumber: string;
  issueDate?: string | null;
  issuePlace: string;

  ownerName?: string | null;
  ownerPhoneNumber?: string | null;

  facilityType: FacilityTypeDto;

  attr1?: string | null;
  attr2?: string | null;
  attr3?: string | null;
  attr4?: string | null;
  attr5?: string | null;

  skuOpt: SkuOptDto;
  stateOpt?: StateOptDto | null;
  isException: boolean;

  orgUnit?: OrgunitDto | null;
  note?: string | null;

  establishmentDate?: string | null;
  idIssueDate?: string | null;

  livestockCrops?: string | null;
  sampleSource?: string | null;
  labelingStandard?: string | null;
  cattle?: string | null;
}
