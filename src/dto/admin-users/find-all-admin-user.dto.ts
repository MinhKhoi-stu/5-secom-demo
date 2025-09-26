import { PagingDto } from 'dto/common/paging.dto';
import { ADMIN_USER_STATUS } from 'utils/enums';

export type FindAllAdminUserDto = PagingDto & {
  codeOrName?: string;
  roleId?: string;
  status?: ADMIN_USER_STATUS[] | ADMIN_USER_STATUS;
  page?: number;
  size?: number;
};
