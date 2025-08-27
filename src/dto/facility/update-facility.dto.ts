export interface UpdateFacilityDto {
  version: number;
  id: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  area: number;
  areaAdmin?: number;
  lat?: string;
  lon?: string;
  facilityType: {
    id: string;
  };
  orgUnit: {
    id: string;
  };
  idNumber: string;
  issueDate?: string;
  issuePlace: string;
  note: string;
  establishmentDate?: string;
  idIssueDate?: string;
  livestockCrops?: string;
  sampleSource: string;
  labelingStandard: string;
  ownerName?: string;
  ownerPhoneNumber?: string;
  attr1?: string;
  attr2?: string;
  attr3?: string;
  attr4?: string;
  attr5?: string;
  skuOpt: {
    id: string;
  };
  stateOpt: {
    id: string;
  };
  isException: boolean;
}
