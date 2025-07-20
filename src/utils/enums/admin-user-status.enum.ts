import { locales } from 'utils/constants';

export enum ADMIN_USER_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const adminUserStatusOptions = [
  {
    value: ADMIN_USER_STATUS.ACTIVE,
    label: locales.active,
  },
  {
    value: ADMIN_USER_STATUS.INACTIVE,
    label: locales.inactive,
  },
];

export function getAdminUserStatusLabel(status: ADMIN_USER_STATUS): string {
  return adminUserStatusOptions.find((o) => o.value === status)?.label ?? '';
}

export function getAdminUserStatusLabels(
  status: ADMIN_USER_STATUS[]
): string[] {
  return status
    .map((e) => adminUserStatusOptions.find((o) => o.value === e)?.label ?? '')
    .filter((e) => e);
}
