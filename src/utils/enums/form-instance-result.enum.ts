import { locales } from 'utils/constants';

export const FORM_INSTANCE_RESULT = {
  PASS: {
    value: true,
    label: locales.pass,
  },
  NOT_PASS: {
    value: false,
    label: locales.notPass,
  },
};

export function getFormInstanceResult(ispasses?: boolean): string {
  return ispasses
    ? FORM_INSTANCE_RESULT.PASS.label
    : FORM_INSTANCE_RESULT.NOT_PASS.label;
}
