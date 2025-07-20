import { PagingDto } from 'dto/common/paging.dto';
import { ADMIN_USER_STATUS } from 'utils/enums';

export type FindAllAdminUserDto = PagingDto & {
  status?: ADMIN_USER_STATUS[] | ADMIN_USER_STATUS;
};
