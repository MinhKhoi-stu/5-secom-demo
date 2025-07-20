import { locales } from 'utils/constants';

export const GENDER = {
  MALE: {
    value: true,
    label: locales.male,
  },
  FEMALE: {
    value: false,
    label: locales.female,
  },
};

export function getGenderLabel(gender?: boolean): string {
  return gender ? GENDER.MALE.label : GENDER.FEMALE.label;
}
