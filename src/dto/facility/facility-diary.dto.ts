export interface FacilityDiaryDto {
  facility: {
    id: string;
  };
  diaryType: {
    id: string;
  };
  datetime: string;
  position: string;
  cattleType: {
    id: string;
  };
  cattleAge: {
    id: string;
  };
  quantity: 0;
  material: {
    id: string;
  };
  materialQuantity: 0;
  symptom: string;
  disease: {
    id: string;
  };
  treatment: string;
  result: string;
  employee: string;
  isAccepted: 0;
  acceptedNote: string;
  itemDetail: string;
  reason: {
    id: string;
  };
  weight: 0;
  document: string;
  source: string;
  unit: string;
  cage: {
    id: string;
  };
  orgUnit: {
    id: string;
  };
  code: string;
  name: string;
  issueDate: string;
  receiver: string;
  delivery: string;
  dest: string;
  violation: string;
  attr1: string;
  attr2: string;
  attr3: string;
  attr4: string;
}
