import { AdminRoleDto } from './admin-role.dto';

export type AdminRoleCompactDto = Pick<AdminRoleDto, 'id' | 'code' | 'name'>;
