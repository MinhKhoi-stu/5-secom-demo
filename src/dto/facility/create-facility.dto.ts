export interface CreateFacilityDto {
  page: number;
  size: number;
  sort?: string;
  code: string;
  name: string;
  idNumber: string;
  issuePlace: string;
  isException: boolean;
  orgUnit: {
    id: string;
  };
  facilityType: {
    id: string;
  };
  address?: string;
  phone?: string;
  email?: string;
  area?: number;
  areaAdmin?: number;
  lat?: string;
  lon?: string;
  issueDate?: string;
  note?: string;
  establishmentDate?: string;
  idIssueDate?: string;
  livestockCrops?: string;
  sampleSource?: string;
  labelingStandard?: string;
  ownerName?: string;
  ownerPhoneNumber?: string;
  attr1?: string;
  attr2?: string;
  attr3?: string;
  attr4?: string;
  attr5?: string;
  skuOpt?: {
    id: string;
  };
  stateOpt?: {
    id: string;
  };
}
