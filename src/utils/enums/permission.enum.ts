import { locales } from 'utils/constants';

export enum PERMISSION {
  CREATE_ADMIN_USER = 'CREATE_ADMIN_USER',
  READ_ADMIN_USER = 'READ_ADMIN_USER',
  UPDATE_ADMIN_USER = 'UPDATE_ADMIN_USER',
  DELETE_ADMIN_USER = 'DELETE_ADMIN_USER',

  CREATE_ADMIN_ROLE = 'CREATE_ADMIN_ROLE',
  READ_ADMIN_ROLE = 'READ_ADMIN_ROLE',
  UPDATE_ADMIN_ROLE = 'UPDATE_ADMIN_ROLE',
  DELETE_ADMIN_ROLE = 'DELETE_ADMIN_ROLE',

  CREATE_USER = 'CREATE_USER',
  READ_USER = 'READ_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',

  CREATE_PROGRAM = 'CREATE_PROGRAM',
  READ_PROGRAM = 'READ_PROGRAM',
  UPDATE_PROGRAM = 'UPDATE_PROGRAM',
  DELETE_PROGRAM = 'DELETE_PROGRAM',

  CREATE_PERSON = 'CREATE_PERSON',
  READ_PERSON = 'READ_PERSON',
  UPDATE_PERSON = 'UPDATE_PERSON',
  DELETE_PERSON = 'DELETE_PERSON',

  CREATE_PERIOD = 'CREATE_PERIOD',
  READ_PERIOD = 'READ_PERIOD',
  UPDATE_PERIOD = 'UPDATE_PERIOD',
  DELETE_PERIOD = 'DELETE_PERIOD',

  CREATE_ORGUNIT = 'CREATE_ORGUNIT',
  READ_ORGUNIT = 'READ_ORGUNIT',
  UPDATE_ORGUNIT = 'UPDATE_ORGUNIT',
  DELETE_ORGUNIT = 'DELETE_ORGUNIT',

  CREATE_DATAELEMENT = 'CREATE_DATAELEMENT',
  READ_DATAELEMENT = 'READ_DATAELEMENT',
  UPDATE_DATAELEMENT = 'UPDATE_DATAELEMENT',
  DELETE_DATAELEMENT = 'DELETE_DATAELEMENT',

  CREATE_DATASET = 'CREATE_DATASET',
  READ_DATASET = 'READ_DATASET',
  UPDATE_DATASET = 'UPDATE_DATASET',
  DELETE_DATASET = 'DELETE_DATASET',

  CREATE_FORM = 'CREATE_FORM',
  READ_FORM = 'READ_FORM',
  UPDATE_FORM = 'UPDATE_FORM',
  DELETE_FORM = 'DELETE_FORM',

  CREATE_FORM_INSTANCE = 'CREATE_FORM_INSTANCE',
  READ_FORM_INSTANCE = 'READ_FORM_INSTANCE',
  UPDATE_FORM_INSTANCE = 'UPDATE_FORM_INSTANCE',
  DELETE_FORM_INSTANCE = 'DELETE_FORM_INSTANCE',

  CONFIG_FORM = 'CONFIG_FORM',
}

export const permissionOptions = Object.values(PERMISSION).map((value) => {
  return {
    value: value,
    label: value
      .replace('CREATE', locales.create)
      .replace('READ', locales.read)
      .replace('UPDATE', locales.update)
      .replace('DELETE', locales.delete)
      .replace('_', ' ')
      .replace('CONFIG_FORM', locales.configForm)
      .replace('ADMIN_USER', locales.adminUser)
      .replace('ADMIN_ROLE', locales.adminRole)
      .replace('FORM_INSTANCE', locales.formInstance)
      .replace('USER', locales.user)
      .replace('PROGRAM', locales.program)
      .replace('PERSON', locales.person)
      .replace('PERIOD', locales.period)
      .replace('ORGUNIT', locales.orgunit)
      .replace('DATAELEMENT', locales.dataelement)
      .replace('DATASET', locales.dataset)
      .replace('FORM', locales.form)
      .replace('CONFIG', locales.config),
  };
});

export function getPermissionLabel(permission: PERMISSION): string {
  return permissionOptions.find((o) => o.value === permission)?.label ?? '';
}

export function getPermissionLabels(permissions: PERMISSION[]): string[] {
  return permissions
    .map((e) => permissionOptions.find((o) => o.value === e)?.label ?? '')
    .filter((e) => e);
}
