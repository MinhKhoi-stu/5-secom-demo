import { PagingDto } from "dto/common";

export type FindAllOrgunitDto = PagingDto & {
  // searchKey?: string;  //tìm kiếm
  // username?: string; //lọc, request đến BE ko dùng cache
  //   roleId?: string;
  //   status?: ADMIN_USER_STATUS[] | ADMIN_USER_STATUS;
  orgUnitId: string;
};
