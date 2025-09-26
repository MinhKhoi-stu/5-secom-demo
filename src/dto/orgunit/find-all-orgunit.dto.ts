import { PagingDto } from "dto/common";

export type FindAllOrgunitDto = PagingDto & {
  orgUnitId: string;
};
