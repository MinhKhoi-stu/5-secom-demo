import { PagingDto } from 'dto/common/paging.dto';
import { ADMIN_USER_STATUS } from 'utils/enums';

export type FindAllAdminUserDto = PagingDto & {
  codeOrName?: string;  //tìm kiếm
  // username?: string; //lọc, request đến BE ko dùng cache
  roleId?: string;
  status?: ADMIN_USER_STATUS[] | ADMIN_USER_STATUS;
  page?: number;
  size?: number;
};
