import { locales } from 'utils/constants';

export function getStatus(status?: boolean): string {
  return status ? locales.active : locales.inactive;
}
